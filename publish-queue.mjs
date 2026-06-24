#!/usr/bin/env node
// Publicador da fila — roda no GitHub Actions nos dias agendados.
// Le queue/manifest.json, escolhe o proximo post NAO publicado do tipo do dia,
// publica no Instagram (hospedagem catbox), marca como publicado e salva o manifest.
// Sem dependencias externas (usa fetch/FormData/Blob nativos do Node 18+).

import { readFileSync, writeFileSync, readdirSync } from 'node:fs';
import { resolve, basename } from 'node:path';

const MANIFEST = 'queue/manifest.json';
const IG_BASE = 'https://graph.facebook.com/v21.0';

// ---- upload catbox (sem chave) ----
async function uploadToCatbox(imagePath) {
  const buf = readFileSync(resolve(imagePath));
  const form = new FormData();
  form.append('reqtype', 'fileupload');
  form.append('fileToUpload', new Blob([buf]), basename(imagePath));
  const res = await fetch('https://catbox.moe/user/api.php', { method: 'POST', body: form });
  if (!res.ok) throw new Error(`catbox ${res.status}: ${await res.text()}`);
  const url = (await res.text()).trim();
  if (!url.startsWith('http')) throw new Error(`catbox falhou: ${url}`);
  return url;
}

// ---- Instagram Graph API ----
async function createChild(userId, imageUrl, token) {
  const p = new URLSearchParams({ image_url: imageUrl, is_carousel_item: 'true', access_token: token });
  const r = await fetch(`${IG_BASE}/${userId}/media?${p}`, { method: 'POST' });
  if (!r.ok) throw new Error(`createChild ${r.status}: ${await r.text()}`);
  return (await r.json()).id;
}
async function status(id, token) {
  const p = new URLSearchParams({ fields: 'status_code', access_token: token });
  const r = await fetch(`${IG_BASE}/${id}?${p}`);
  if (!r.ok) throw new Error(`status ${r.status}: ${await r.text()}`);
  return (await r.json()).status_code;
}
async function waitFinished(id, token, timeout = 90000) {
  const end = Date.now() + timeout;
  while (Date.now() < end) {
    const s = await status(id, token);
    if (s === 'FINISHED') return;
    if (s === 'ERROR') throw new Error(`container ${id} em ERROR`);
    await new Promise(r => setTimeout(r, 3000));
  }
  throw new Error(`container ${id} timeout`);
}
async function createCarousel(userId, children, caption, token) {
  const p = new URLSearchParams({ media_type: 'CAROUSEL', children: children.join(','), caption, access_token: token });
  const r = await fetch(`${IG_BASE}/${userId}/media?${p}`, { method: 'POST' });
  if (!r.ok) throw new Error(`createCarousel ${r.status}: ${await r.text()}`);
  return (await r.json()).id;
}
async function publishMedia(userId, creationId, token) {
  const p = new URLSearchParams({ creation_id: creationId, access_token: token });
  const r = await fetch(`${IG_BASE}/${userId}/media_publish?${p}`, { method: 'POST' });
  if (!r.ok) throw new Error(`publish ${r.status}: ${await r.text()}`);
  return (await r.json()).id;
}
async function permalink(mediaId, token) {
  const p = new URLSearchParams({ fields: 'permalink', access_token: token });
  const r = await fetch(`${IG_BASE}/${mediaId}?${p}`);
  if (!r.ok) return null;
  return (await r.json()).permalink ?? null;
}

// ---- main ----
const TOKEN = process.env.INSTAGRAM_ACCESS_TOKEN;
const USER = process.env.INSTAGRAM_USER_ID;
if (!TOKEN || !USER) { console.error('ERRO: faltam secrets INSTAGRAM_ACCESS_TOKEN / INSTAGRAM_USER_ID'); process.exit(1); }

const m = JSON.parse(readFileSync(MANIFEST, 'utf8'));
const weekday = new Date().getUTCDay(); // 0=Dom..6=Sab
const type = m.schedule[String(weekday)];
if (!type) { console.log(`Hoje (dia ${weekday}) nao tem post agendado. Nada a fazer.`); process.exit(0); }

const post = m.posts.find(p => !p.published && p.type === type);
if (!post) { console.log(`Fila vazia para tipo "${type}". Reabasteca a fila. Nada publicado.`); process.exit(0); }

const dir = `queue/posts/${post.id}`;
const images = readdirSync(dir).filter(f => /^slide-\d+\.jpe?g$/i.test(f)).sort().map(f => `${dir}/${f}`);
if (images.length < 2) { console.error(`ERRO: post ${post.id} tem menos de 2 imagens`); process.exit(1); }
const caption = readFileSync(`${dir}/caption.txt`, 'utf8').trim();

console.log(`Publicando "${post.id}" (${type}) com ${images.length} imagens...`);
const urls = [];
for (const img of images) { urls.push(await uploadToCatbox(img)); console.log('  upload', img); }
const children = [];
for (const u of urls) children.push(await createChild(USER, u, TOKEN));
for (const c of children) await waitFinished(c, TOKEN);
const carousel = await createCarousel(USER, children, caption, TOKEN);
await waitFinished(carousel, TOKEN);
const id = await publishMedia(USER, carousel, TOKEN);
const link = await permalink(id, TOKEN);

post.published = true;
post.post_id = id;
post.url = link;
post.publishedAt = new Date().toISOString();
writeFileSync(MANIFEST, JSON.stringify(m, null, 2) + '\n');
console.log(`PUBLICADO: ${link || id}`);
