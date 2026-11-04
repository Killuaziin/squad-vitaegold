// Gera folhas de revisao por semana (slides + legenda + data prevista) para a aprovacao humana.
// Uso (da raiz do projeto): node squads/carrossel-vitaegold/output/_build/review-lote.mjs <lote.mjs> <AAAA-MM-DD inicio> <prefixo-saida>
// Simula o publicador a partir da data de inicio (tipo do dia da semana, ordem do manifest) e
// grava <prefixo>-s1.png, -s2.png... (uma folha por semana).
import { readFileSync, writeFileSync, readdirSync } from 'node:fs';
import { pathToFileURL } from 'node:url';
import { resolve } from 'node:path';
import { chromium } from 'playwright';

const [loteFile, start, prefix] = process.argv.slice(2);
if (!prefix) { console.error('uso: review-lote.mjs <lote.mjs> <AAAA-MM-DD> <prefixo-saida>'); process.exit(1); }
const lote = (await import(pathToFileURL(resolve(loteFile)).href)).default;
const byId = Object.fromEntries(lote.map(p => [p.id, p]));
const m = JSON.parse(readFileSync('queue/manifest.json', 'utf8'));
const pend = m.posts.filter(p => !p.published && byId[p.id]);

// simula o calendario
const DIAS = ['dom', 'seg', 'ter', 'qua', 'qui', 'sex', 'sab'];
const d = new Date(start + 'T12:00:00Z'), plan = [];
const left = [...pend];
while (left.length && plan.length < 60) {
  const t = m.schedule[String(d.getUTCDay())];
  const i = t ? left.findIndex(p => p.type === t) : -1;
  if (i >= 0) plan.push({ date: new Date(d), post: byId[left.splice(i, 1)[0].id] });
  else if (t) break; // fila vazia para o tipo do dia
  d.setUTCDate(d.getUTCDate() + 1);
}

const fmt = dt => `${DIAS[dt.getUTCDay()]} ${String(dt.getUTCDate()).padStart(2, '0')}/${String(dt.getUTCMonth() + 1).padStart(2, '0')}`;
const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const weekKey = dt => { const x = new Date(dt); x.setUTCDate(x.getUTCDate() - ((x.getUTCDay() + 6) % 7)); return x.toISOString().slice(0, 10); };
const weeks = [...new Set(plan.map(x => weekKey(x.date)))];

const browser = await chromium.launch({ channel: 'chrome' });
const page = await browser.newPage({ viewport: { width: 2620, height: 800 }, deviceScaleFactor: 1 });
let n = 0;
for (const wk of weeks) {
  n++;
  const items = plan.filter(x => weekKey(x.date) === wk);
  const blocks = items.map(({ date, post }) => {
    const dir = `queue/posts/${post.id}`;
    const imgs = readdirSync(dir).filter(f => /^slide-\d+\.jpg$/.test(f)).sort()
      .map(f => `<img src="data:image/jpeg;base64,${readFileSync(`${dir}/${f}`).toString('base64')}">`).join('');
    return `<section><h2><b>${fmt(date)}</b> · ${post.type.toUpperCase()} · ${esc(post.title)} <i>${post.id}</i></h2>
      <div class="row"><div class="slides">${imgs}</div><pre>${esc(post.caption)}</pre></div></section>`;
  }).join('');
  const html = `<!doctype html><html><head><meta charset="utf-8"><style>
    body{margin:0;background:#efe9dc;font-family:Inter,Segoe UI,sans-serif;color:#211f1a;padding:28px}
    h1{font:600 34px Georgia,serif;margin:0 0 18px}
    section{background:#fff;border-radius:16px;padding:18px 22px;margin-bottom:22px;box-shadow:0 2px 10px rgba(0,0,0,.06)}
    h2{font-size:22px;font-weight:500;margin:0 0 12px}h2 b{color:#9c7415}h2 i{color:#8a8478;font-size:16px;font-style:normal;margin-left:8px}
    .row{display:flex;gap:18px;align-items:flex-start}.slides{display:flex;gap:8px;flex:none}
    .slides img{width:320px;height:400px;border-radius:6px;display:block}
    pre{white-space:pre-wrap;font:15px/1.45 Inter,Segoe UI,sans-serif;margin:0;width:860px;column-count:2;column-gap:28px;color:#3b3833}
  </style></head><body><h1>Revisão do lote · semana ${n} (${fmt(items[0].date)} a ${fmt(items.at(-1).date)})</h1>${blocks}</body></html>`;
  const tmp = `${prefix}-s${n}.html`;
  writeFileSync(tmp, html);
  await page.goto(pathToFileURL(resolve(tmp)).href);
  await page.screenshot({ path: `${prefix}-s${n}.png`, fullPage: true });
  console.log(`semana ${n}: ${items.map(x => `${fmt(x.date)} ${x.post.id}`).join(' | ')}`);
}
await browser.close();
while (!m.schedule[String(d.getUTCDay())]) d.setUTCDate(d.getUTCDate() + 1);
console.log(`\n${plan.length} posts programados. Primeiro dia agendado sem post na fila: ${fmt(d)} (${m.schedule[String(d.getUTCDay())]}).`);
