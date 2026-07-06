// Monta um contact sheet (grid) de imagens candidatas p/ revisao rapida.
// Uso: node contact.mjs <out.png> <label1=path1> <label2=path2> ...
import { readFileSync, writeFileSync } from 'node:fs';
import { chromium } from 'playwright';
const out = process.argv[2];
const items = process.argv.slice(3).map(a => { const i = a.indexOf('='); return { label: a.slice(0, i), path: a.slice(i + 1) }; });
const cell = items.map(it => {
  let src = '';
  try { src = 'data:image/jpeg;base64,' + readFileSync(it.path).toString('base64'); } catch { src = ''; }
  return `<div class="c"><div class="lb">${it.label}</div>${src ? `<img src="${src}">` : '<div class="x">sem imagem</div>'}</div>`;
}).join('');
const COLS = 4;
const html = `<!doctype html><meta charset=utf-8><style>
*{margin:0;box-sizing:border-box}body{background:#222;font-family:Arial}
.grid{display:grid;grid-template-columns:repeat(${COLS},1fr);gap:6px;padding:6px;width:${COLS*380}px}
.c{position:relative;background:#000;height:250px;overflow:hidden;border-radius:6px}
.c img{width:100%;height:100%;object-fit:cover}
.lb{position:absolute;top:0;left:0;z-index:2;background:#000c;color:#ffd23f;font-size:20px;font-weight:bold;padding:4px 10px}
.x{color:#f66;padding:40px;text-align:center}
</style><div class="grid">${cell}</div>`;
const br = await chromium.launch({ channel: 'chrome' });
const pg = await br.newPage({ viewport: { width: COLS * 380 + 12, height: Math.ceil(items.length / COLS) * 256 + 12 }, deviceScaleFactor: 1 });
await pg.setContent(html); await pg.waitForTimeout(200);
await pg.screenshot({ path: out, fullPage: true });
await br.close(); console.log('contact sheet:', out);
