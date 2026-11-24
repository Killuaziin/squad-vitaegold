#!/usr/bin/env node
// Publicador da fila — roda no GitHub Actions nos dias agendados.
// Le queue/manifest.json, escolhe o proximo post NAO publicado do tipo do dia,
// publica no Instagram (carrossel, imagem unica ou Reels, conforme a pasta do post),
// marca como publicado e salva o manifest.
// Sem dependencias externas (usa fetch/FormData/Blob nativos do Node 18+).

import { readFileSync, writeFileSync, readdirSync } from 'node:fs';
import { createHash } from 'node:crypto';

const MANIFEST = 'queue/manifest.json';
const IG_VERSION = 'v21.0';
const IG_BASE = `https://graph.facebook.com/${IG_VERSION}`;

// ---- hospedagem de imagem: raw.githubusercontent.com (repositorio PUBLICO) ----
// O Instagram busca cada imagem por URL publica. Como as imagens ja estao
// commitadas no repositorio, servimos direto pelo CDN do GitHub (raw), sem
// upload e sem host de terceiros (catbox/tmpfiles/0x0 quebraram — 2026-07).
// Requisito: o repositorio precisa estar PUBLICO.
const REPO = process.env.GITHUB_REPOSITORY || 'Killuaziin/squad-vitaegold';
const REF = process.env.GITHUB_SHA || process.env.RAW_REF || 'main';
function rawUrl(imagePath) {
  const clean = String(imagePath).replace(/\\/g, '/').replace(/^\.?\/+/, '');
  return `https://raw.githubusercontent.com/${REPO}/${REF}/${clean}`;
}
// Falha cedo, com mensagem clara, se o repo nao estiver publico ou a imagem sumir.
async function checkPublic(url) {
  const r = await fetch(url);
  const ct = r.headers.get('content-type') || '';
  if (r.status !== 200) {
    throw new Error(`imagem nao acessivel no raw (HTTP ${r.status}). O repositorio ${REPO} precisa estar PUBLICO e a imagem commitada no ref "${REF}". URL: ${url}`);
  }
  if (!/^image\//i.test(ct)) {
    throw new Error(`raw retornou content-type "${ct}" (esperado image/*). URL: ${url}`);
  }
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
// Post de imagem unica (pasta com so slide-01.jpg).
async function createImage(userId, imageUrl, caption, token) {
  const p = new URLSearchParams({ image_url: imageUrl, caption, access_token: token });
  const r = await fetch(`${IG_BASE}/${userId}/media?${p}`, { method: 'POST' });
  if (!r.ok) throw new Error(`createImage ${r.status}: ${await r.text()}`);
  return (await r.json()).id;
}
// Reels (pasta com video.mp4): upload "resumable" direto para o Instagram, sem depender de URL publica.
// thumbOffset = milissegundo do video usado como capa (opcional, campo thumb_offset no manifest).
async function createReel(userId, file, caption, token, thumbOffset) {
  const p = new URLSearchParams({ media_type: 'REELS', upload_type: 'resumable', share_to_feed: 'true', caption, access_token: token });
  if (thumbOffset != null) p.set('thumb_offset', String(thumbOffset));
  const r = await fetch(`${IG_BASE}/${userId}/media?${p}`, { method: 'POST' });
  if (!r.ok) throw new Error(`createReel ${r.status}: ${await r.text()}`);
  const { id } = await r.json();
  const video = readFileSync(file);
  const up = await fetch(`https://rupload.facebook.com/ig-api-upload/${IG_VERSION}/${id}`, {
    method: 'POST',
    headers: { Authorization: `OAuth ${token}`, offset: '0', file_size: String(video.length) },
    body: video,
  });
  if (!up.ok) throw new Error(`upload do video ${up.status}: ${await up.text()}`);
  return id;
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
const DRY = process.env.DRY_RUN === '1';
const NOW = process.env.NOW ? new Date(process.env.NOW) : new Date(); // NOW so para testes (simular horario)
// MODE=daily (cron diario ou manual): horario marcado vencido > data do dia > tipo do dia da semana.
// MODE=timed (cron a cada 30 min): so posts com horario marcado ("at") que ja venceram.
const MODE = process.env.MODE || 'daily';
const FORCED = process.env.FORCE_DATE || process.env.FORCE_TYPE;
// FORCE_DATE (YYYY-MM-DD) permite forcar um dia especifico (testes ou repostar atrasados)
const today = process.env.FORCE_DATE || NOW.toISOString().slice(0, 10); // YYYY-MM-DD (UTC)
const weekday = (process.env.FORCE_DATE ? new Date(process.env.FORCE_DATE + 'T12:00:00Z') : NOW).getUTCDay(); // 0=Dom..6=Sab

let post, type;
if (process.env.FORCE_ID) {
  // 0) Post especifico pelo id (publicacao manual)
  post = m.posts.find(p => p.id === process.env.FORCE_ID);
  if (!post) { console.error(`::error::FORCE_ID "${process.env.FORCE_ID}" nao existe no manifest.`); process.exit(1); }
  if (post.published) { console.log(`"${post.id}" ja foi publicado (${post.url}). Nada a fazer.`); process.exit(0); }
  type = post.type;
} else {
  // 1) Horario marcado: campo "at" (ISO com fuso, ex. 2026-11-27T09:00:00-03:00) ja vencido; o mais antigo primeiro
  if (!FORCED) post = m.posts.filter(p => !p.published && p.at && new Date(p.at) <= NOW).sort((a, b) => new Date(a.at) - new Date(b.at))[0];
  if (post) type = post.type;
  else if (MODE === 'timed') { console.log('Nenhum post com horario marcado vencido. Nada a fazer.'); process.exit(0); }
  else {
    // 2) Post com DATA explicita marcada para hoje (one-off, ex.: sabado)
    post = m.posts.find(p => !p.published && !p.at && p.date === today);
    if (post) type = post.type;
    else {
      // 3) Pelo TIPO do dia da semana (posts sem data nem horario)
      type = process.env.FORCE_TYPE || m.schedule[String(weekday)];
      if (!type) { console.log(`Hoje (dia ${weekday}) nao tem post agendado. Nada a fazer.`); process.exit(0); }
      post = m.posts.find(p => !p.published && p.type === type && !p.date && !p.at);
      if (!post) {
        // Sai com ERRO de proposito: o run fica vermelho e o GitHub manda e-mail de falha.
        // Antes saia com 0 (verde) e a fila ficou vazia por ~2 meses sem ninguem perceber (2026-09 a 2026-11).
        console.error(`::error::Fila vazia para tipo "${type}" — nenhum post publicado hoje. Gere um novo lote e reabasteca queue/manifest.json.`);
        process.exit(1);
      }
    }
  }
}

// Formato pelo conteudo da pasta: video.mp4 = Reels; 1 slide = imagem unica; 2+ slides = carrossel.
const dir = `queue/posts/${post.id}`;
const files = readdirSync(dir);
const isReel = files.includes('video.mp4');
const images = files.filter(f => /^slide-\d+\.jpe?g$/i.test(f)).sort().map(f => `${dir}/${f}`);
if (!isReel && images.length < 1) { console.error(`ERRO: post ${post.id} sem video.mp4 nem slide-NN.jpg`); process.exit(1); }
const caption = readFileSync(`${dir}/caption.txt`, 'utf8').trim();

// Impressao digital do token (hash curto, nao revela o token): permite comparar o secret do
// GitHub com o token do .env sem expor nenhum dos dois.
const tokenFp = createHash('sha256').update(TOKEN).digest('hex').slice(0, 10);

try {
  let creation;
  if (isReel) {
    console.log(`Publicando "${post.id}" (${type}) como Reels...`);
    creation = await createReel(USER, `${dir}/video.mp4`, caption, TOKEN, post.thumb_offset);
    await waitFinished(creation, TOKEN, 10 * 60 * 1000); // o Instagram processa o video antes de liberar
  } else {
    console.log(`Publicando "${post.id}" (${type}) com ${images.length} imagem(ns)...`);
    const urls = images.map(rawUrl);
    await checkPublic(urls[0]); // valida acesso publico antes de chamar o Instagram
    console.log(`  imagens servidas via raw.githubusercontent.com (${REPO} @ ${REF})`);
    if (urls.length === 1) {
      creation = await createImage(USER, urls[0], caption, TOKEN);
    } else {
      const children = [];
      for (const u of urls) children.push(await createChild(USER, u, TOKEN));
      for (const c of children) await waitFinished(c, TOKEN);
      creation = await createCarousel(USER, children, caption, TOKEN);
    }
    await waitFinished(creation, TOKEN);
  }

  if (DRY) { console.log(`::notice::DRY RUN OK: tudo pronto, NAO publicado (post "${post.id}" segue na fila). token ${tokenFp}`); process.exit(0); }

  const id = await publishMedia(USER, creation, TOKEN);
  const link = await permalink(id, TOKEN);

  post.published = true;
  post.post_id = id;
  post.url = link;
  post.publishedAt = new Date().toISOString();
  writeFileSync(MANIFEST, JSON.stringify(m, null, 2) + '\n');
  console.log(`::notice::PUBLICADO "${post.id}" (${type}): ${link || id}`);
} catch (e) {
  // O log completo do Actions so abre para admin do repo; a anotacao ::error:: aparece no resumo
  // publico do run (e na API de check-runs), entao o motivo fica visivel para quem for investigar.
  const msg = String(e.message || e).replace(/\s+/g, ' ').slice(0, 600);
  const hint = /"code":190/.test(msg) ? ' DICA: token invalido/expirado, atualize o secret INSTAGRAM_ACCESS_TOKEN.'
    : /"code":25\b/.test(msg) ? ' DICA: conta ou usuario do token restrito pelo Instagram/Meta.' : '';
  console.error(`::error::Falha ao publicar "${post.id}" (token ${tokenFp}, user ${USER}): ${msg}${hint}`);
  process.exit(1);
}
