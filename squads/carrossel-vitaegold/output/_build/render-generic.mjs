// Renderizador generico de carrossel (blog e mitos). Uso: node render-generic.mjs <config.json>
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { chromium } from 'playwright';

const cfg = JSON.parse(readFileSync(process.argv[2], 'utf8'));
const A = cfg.assetDir, OUT = cfg.outDir;
mkdirSync(OUT, { recursive: true });
const b64 = (p, m) => `data:${m};base64,` + readFileSync(`${A}/${p}`).toString('base64');
const LOGO = b64('logo-nova.png', 'image/png');

const GOLD = '#c79a2e', INK = '#211f1a', SUB = '#5b564c', CREAM = '#f6f1e6', GOLDD = '#9c7415', MITO = '#b5462f', VERD = '#3c4a2e';
const swipe = () => `<svg width="46" height="20" viewBox="0 0 46 20"><path d="M2 10 H38 M30 3 L40 10 L30 17" stroke="${GOLD}" stroke-width="3.5" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const nl = s => esc(s).replace(/\n/g, '<br>');
const xS = `<svg width="20" height="20" viewBox="0 0 24 24"><path d="M6 6 L18 18 M18 6 L6 18" stroke="#fff" stroke-width="3.2" fill="none" stroke-linecap="round"/></svg>`;
const ckS = `<svg width="22" height="22" viewBox="0 0 24 24"><path d="M5 13 L10 18 L19 6" stroke="#fff" stroke-width="3.2" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
const TOTAL = cfg.slides.length;
const dots = a => `<div class="dots">${Array.from({length:TOTAL},(_,i)=>`<span class="dot${i+1===a?' on':''}"></span>`).join('')}</div>`;

function render(s, n) {
  const isLast = n === TOTAL;
  let top = '';
  if (s.tag) top = `<div class="tag">${esc(s.tag)}</div>`;
  else if (s.badge === 'mito') top = `<div class="badge bm">${xS}MITO</div>`;
  else if (s.badge === 'verdade') top = `<div class="badge bv">${ckS}VERDADE</div>`;
  else if (s.pill) top = `<div class="pill">${esc(s.pill)}</div>`;
  return `<!doctype html><html><head><meta charset="utf-8">
<link href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,600;9..144,700&family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">
<style>
*{margin:0;padding:0;box-sizing:border-box}html,body{width:1080px;height:1350px}
.stage{width:1080px;height:1350px;background:${CREAM};position:relative;overflow:hidden;color:${INK}}
.photoband{position:absolute;top:0;left:0;width:1080px;height:660px;background-size:cover;background-position:${s.pos||'center'};background-image:url('${b64(s.img,'image/jpeg')}')}
.photoscrim{position:absolute;top:0;left:0;width:1080px;height:660px;background:linear-gradient(180deg,rgba(35,25,8,.18) 0%,rgba(35,25,8,0) 30%,rgba(35,25,8,0) 66%,rgba(20,14,4,.24) 100%),rgba(212,160,23,.06)}
.sheet{position:absolute;left:0;bottom:0;width:1080px;height:760px;background:${CREAM};border-radius:46px 46px 0 0;padding:54px 80px 70px;display:flex;flex-direction:column;box-shadow:0 -18px 44px rgba(0,0,0,.12)}
.chip{position:absolute;top:54px;left:70px;background:#fff;border-radius:18px;padding:14px 20px;box-shadow:0 6px 22px rgba(0,0,0,.16);z-index:5}.chip img{height:46px;display:block}
.row{display:flex;align-items:center;justify-content:space-between;width:100%}.rule{height:4px;width:120px;background:${GOLD};border-radius:2px}
.dots{display:flex;gap:9px}.dot{width:9px;height:9px;border-radius:50%;background:rgba(0,0,0,.16)}.dot.on{background:${GOLD};width:26px;border-radius:6px}
.pill{align-self:flex-start;font-family:'Inter';font-weight:600;font-size:22px;color:#3a2f12;background:linear-gradient(135deg,#edcb6a,#cf9f2c);padding:13px 26px;border-radius:40px;margin:18px 0 4px}
.tag{align-self:flex-start;font-family:'Inter';font-weight:700;font-size:20px;letter-spacing:3px;text-transform:uppercase;color:${GOLDD};margin:20px 0 2px}
.badge{align-self:flex-start;display:inline-flex;align-items:center;gap:10px;font-family:'Inter';font-weight:800;font-size:24px;color:#fff;padding:12px 26px;border-radius:40px;margin:18px 0 6px}.bm{background:${MITO}}.bv{background:${VERD}}
h1{font-family:'Fraunces';font-weight:600;font-size:48px;line-height:1.1;letter-spacing:-.5px;margin-top:22px}
.body{font-family:'Inter';font-weight:400;font-size:28px;line-height:1.5;color:${SUB};margin-top:24px;max-width:880px}
.foot{display:flex;align-items:center;justify-content:space-between;margin-top:auto}
.num{font-family:'Inter';font-weight:600;font-size:22px;color:${GOLDD};letter-spacing:1px}
.sw{font-family:'Inter';font-weight:500;font-size:20px;color:${SUB};display:inline-flex;align-items:center;gap:10px;text-transform:uppercase;letter-spacing:1px}
</style></head><body><div class="stage">
  <div class="photoband"></div><div class="photoscrim"></div><div class="chip"><img src="${LOGO}"></div>
  <div class="sheet"><div class="row"><div class="rule"></div>${dots(n)}</div>${top}
  <h1>${nl(s.headline)}</h1><p class="body">${nl(s.body)}</p>
  <div class="foot"><span class="num">0${n} / 0${TOTAL}</span>${isLast?'':`<span class="sw">arraste ${swipe()}</span>`}</div></div>
</div></body></html>`;
}

const browser = await chromium.launch({ channel: 'chrome' });
const page = await browser.newPage({ viewport: { width: 1080, height: 1350 }, deviceScaleFactor: 2 });
let n = 0;
for (const s of cfg.slides) {
  n++;
  writeFileSync(`${A}/_s${n}.html`, render(s, n));
  await page.goto('file:///' + process.cwd().replace(/\\/g, '/') + `/${A}/_s${n}.html`);
  await page.evaluate(() => document.fonts.ready); await page.waitForTimeout(360);
  await page.screenshot({ path: `${OUT}/slide-0${n}.jpg`, type: 'jpeg', quality: 92, clip: { x: 0, y: 0, width: 1080, height: 1350 } });
  console.log('ok', n);
}
await browser.close(); console.log('DONE', cfg.outDir);
