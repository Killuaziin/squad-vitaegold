// Monta um lote de posts a partir de um arquivo-fonte (ex.: lote-2026-11.mjs). Rodar da raiz do projeto:
//   node squads/carrossel-vitaegold/output/_build/build-lote.mjs <lote.mjs> [--check] [--manifest] [id ...]
//   --check     so valida os textos (nao renderiza)
//   --manifest  acrescenta os posts ao fim de queue/manifest.json (sem data; pula ids que ja existem)
//   --no-render nao renderiza (ex.: so atualizar o manifest depois da revisao)
//   id ...      limita a esses posts (ex.: para re-renderizar um so)
// Validacao (falha o lote): travessao, termos da blocklist ANVISA, "idoso/vovo", mais de 5 slides,
// legenda > 2200 caracteres ou > 30 hashtags, blog sem CTA do artigo, produto sem aviso legal.
import { readFileSync, writeFileSync, mkdirSync, readdirSync, rmSync, copyFileSync, existsSync } from 'node:fs';
import { spawnSync } from 'node:child_process';
import { pathToFileURL } from 'node:url';
import { resolve } from 'node:path';

const BUILD = 'squads/carrossel-vitaegold/output/_build';
const OUTPUT = 'squads/carrossel-vitaegold/output';
const MANIFEST = 'queue/manifest.json';
const args = process.argv.slice(2);
const loteFile = args.find(a => a.endsWith('.mjs'));
if (!loteFile) { console.error('uso: build-lote.mjs <lote.mjs> [--check] [--manifest] [id ...]'); process.exit(1); }
const CHECK = args.includes('--check'), MANIF = args.includes('--manifest'), RENDER = !args.includes('--no-render');
const only = args.filter(a => !a.startsWith('--') && a !== loteFile);

const lote = (await import(pathToFileURL(resolve(loteFile)).href)).default;
const posts = only.length ? lote.filter(p => only.includes(p.id)) : lote;
if (only.length && posts.length !== only.length) { console.error('id desconhecido em:', only.join(', ')); process.exit(1); }

// ---------- validacao ----------
const block = JSON.parse(readFileSync('squads/carrossel-vitaegold/knowledge/blocklist_anvisa.json', 'utf8'));
const terms = Object.values(block.categorias_bloqueadas).flatMap(c => c.termos)
  .map(t => t.replace(/\s*\(.*?\)\s*/g, '').trim()).filter(t => t && !/\bX\b/.test(t));
const esc = s => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
const word = t => new RegExp(`(?<![\\p{L}])${esc(t)}(?![\\p{L}])`, 'iu');
const termRes = terms.map(t => [t, word(t)]);
const extra = ['idoso', 'idosa', 'idosos', 'idosas', 'vovô', 'vovó'].map(t => [t, word(t)]);

function textsOf(p) {
  const sl = p.product ? p.product.slides : p.slides;
  const parts = [];
  if (p.product) parts.push(p.product.hero.tag, p.product.hero.title, p.product.hero.sub);
  for (const s of sl) parts.push(s.tag, s.pill, s.headline, s.body, s.quote, s.from, s.aviso);
  return { slides: parts.filter(Boolean).join('\n'), caption: p.caption, n: sl.length };
}

let errors = 0;
const err = (p, m) => { errors++; console.log(`ERRO  ${p.id}: ${m}`); };
for (const p of lote) {
  const before = errors;
  const { slides, caption, n } = textsOf(p);
  const all = slides + '\n' + caption;
  const allow = new Set(p.allow || []);
  if (/[—–]/.test(all)) err(p, 'tem travessao (— ou –)');
  for (const [t, re] of [...termRes, ...extra]) if (!allow.has(t) && re.test(all)) err(p, `termo bloqueado: "${t}"`);
  if (n > 5) err(p, `${n} slides (maximo 5)`);
  if (caption.length > 2200) err(p, `legenda com ${caption.length} caracteres (maximo 2200)`);
  const tags = (caption.match(/#[\p{L}\d_]+/gu) || []).length;
  if (tags > 30) err(p, `${tags} hashtags (maximo 30)`);
  if (p.type === 'blog' && !caption.includes('Leia o artigo completo no blog (link na bio)')) err(p, 'blog sem CTA do artigo');
  if (p.type === 'produto') {
    if (!/não é um medicamento/i.test(caption)) err(p, 'legenda de produto sem aviso legal');
    if (!p.product.slides.some(s => s.type === 'cta' && /não é um medicamento/i.test(s.aviso || ''))) err(p, 'slide CTA sem aviso legal');
  } else if (/não é um medicamento|suplemento alimentar/i.test(all)) err(p, 'post educativo citando suplemento');
  console.log(`${errors > before ? 'FALHA' : 'ok   '} ${p.id.padEnd(30)} ${p.type.padEnd(8)} ${n} slides  legenda ${caption.length} car  ${tags} tags`);
}
const ids = lote.map(p => p.id);
if (new Set(ids).size !== ids.length) { errors++; console.log('ERRO  ids repetidos no lote'); }
if (errors) { console.log(`\n${errors} erro(s). Nada foi renderizado.`); process.exit(1); }
console.log(`\nvalidacao OK (${lote.length} posts)`);
if (CHECK) process.exit(0);

// ---------- render + fila ----------
for (const p of RENDER ? posts : []) {
  const assetDir = `${BUILD}/${p.id}/assets`, outDir = `${OUTPUT}/${p.id}/images`;
  if (!existsSync(assetDir)) { console.error(`faltam assets: ${assetDir}`); process.exit(1); }
  const cfg = p.product ? { assetDir, outDir, ...p.product } : { assetDir, outDir, slides: p.slides };
  const cfgPath = `${BUILD}/${p.id}/cfg.json`;
  writeFileSync(cfgPath, JSON.stringify(cfg, null, 2) + '\n');
  rmSync(outDir, { recursive: true, force: true });
  const renderer = `${BUILD}/${p.type === 'produto' ? 'render-produto.mjs' : 'render-generic.mjs'}`;
  console.log(`\n== ${p.id}`);
  const r = spawnSync(process.execPath, [renderer, cfgPath], { stdio: 'inherit' });
  if (r.status !== 0) { console.error(`falha ao renderizar ${p.id}`); process.exit(1); }
  const qdir = `queue/posts/${p.id}`;
  mkdirSync(qdir, { recursive: true });
  for (const f of readdirSync(qdir)) if (/^slide-\d+\.jpe?g$/i.test(f)) rmSync(`${qdir}/${f}`);
  const slides = readdirSync(outDir).filter(f => /^slide-\d+\.jpg$/.test(f)).sort();
  for (const f of slides) copyFileSync(`${outDir}/${f}`, `${qdir}/${f}`);
  writeFileSync(`${qdir}/caption.txt`, p.caption.trim() + '\n');
  console.log(`   -> ${qdir} (${slides.length} slides + caption.txt)`);
}

if (MANIF) {
  const m = JSON.parse(readFileSync(MANIFEST, 'utf8'));
  const have = new Set(m.posts.map(p => p.id));
  let add = 0;
  for (const p of posts) {
    if (have.has(p.id)) { console.log(`manifest: ${p.id} ja existe (pulado)`); continue; }
    m.posts.push({ id: p.id, type: p.type, title: p.title, published: false, url: null });
    add++;
  }
  writeFileSync(MANIFEST, JSON.stringify(m, null, 2) + '\n');
  const pend = m.posts.filter(p => !p.published);
  const by = t => pend.filter(p => p.type === t).length;
  console.log(`\nmanifest: +${add} | pendentes: ${pend.length} (blog ${by('blog')}, mitos ${by('mitos')}, produto ${by('produto')})`);
}
