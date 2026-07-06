// Renderizador generico de post de PRODUTO. Uso: node render-produto.mjs <cfg.json>
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { chromium } from 'playwright';
const cfg = JSON.parse(readFileSync(process.argv[2], 'utf8'));
const A = cfg.assetDir, OUT = cfg.outDir;
mkdirSync(OUT, { recursive: true });
const b64 = (p, m) => `data:${m};base64,` + readFileSync(`${A}/${p}`).toString('base64');
const LOGO = b64('logo-nova.png', 'image/png');
const PROD = b64(cfg.prodImage, 'image/png');
const PHONE = cfg.waPhone || '0800 888 0032';
const GOLD = '#c79a2e', INK = '#211f1a', SUB = '#5b564c', CREAM = '#f6f1e6', GOLDD = '#9c7415';
const swipe = () => `<svg width="46" height="20" viewBox="0 0 46 20"><path d="M2 10 H38 M30 3 L40 10 L30 17" stroke="${GOLD}" stroke-width="3.5" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
const wa = () => `<svg width="30" height="30" viewBox="0 0 32 32" fill="#fff"><path d="M16 3C9.4 3 4 8.4 4 15c0 2.1.6 4.1 1.6 5.9L4 29l8.3-1.6c1.7.9 3.6 1.4 5.7 1.4 6.6 0 12-5.4 12-12S22.6 3 16 3zm0 21.8c-1.8 0-3.5-.5-5-1.4l-.4-.2-4.9 1 1-4.8-.3-.4c-1-1.6-1.5-3.4-1.5-5.3C4.9 9.5 9.9 4.9 16 4.9c5.6 0 10.1 4.5 10.1 10.1S21.6 24.8 16 24.8zm5.8-7.6c-.3-.2-1.9-.9-2.1-1-.3-.1-.5-.2-.7.2-.2.3-.8 1-1 1.2-.2.2-.4.2-.7.1-1.8-.9-3-1.6-4.2-3.6-.3-.5.3-.5.9-1.6.1-.2 0-.4 0-.5 0-.2-.7-1.7-1-2.3-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.5s1.1 2.9 1.2 3.1c.2.2 2.1 3.3 5.2 4.6 1.9.8 2.7.9 3.6.8.6-.1 1.9-.8 2.1-1.5.3-.7.3-1.4.2-1.5-.1-.2-.3-.3-.6-.4z"/></svg>`;
const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const nl = s => esc(s).replace(/\n/g, '<br>');
const TOTAL = cfg.slides.length;
const dots = a => `<div class="dots">${Array.from({length:TOTAL},(_,i)=>`<span class="dot${i+1===a?' on':''}"></span>`).join('')}</div>`;
const CSS = `
*{margin:0;padding:0;box-sizing:border-box}html,body{width:1080px;height:1350px}
.stage{width:1080px;height:1350px;background:${CREAM};position:relative;overflow:hidden;color:${INK}}
.chip{position:absolute;top:54px;left:70px;background:#fff;border-radius:18px;padding:14px 20px;box-shadow:0 6px 22px rgba(0,0,0,.16);z-index:6}.chip img{height:46px;display:block}
.photoband{position:absolute;top:0;left:0;width:1080px;height:660px;background-size:cover}
.photoscrim{position:absolute;top:0;left:0;width:1080px;height:660px;background:linear-gradient(180deg,rgba(35,25,8,.18) 0%,rgba(35,25,8,0) 30%,rgba(35,25,8,0) 66%,rgba(20,14,4,.24) 100%),rgba(212,160,23,.06)}
.prodband{position:absolute;top:0;left:0;width:1080px;height:700px;display:flex;align-items:center;justify-content:center;background:radial-gradient(70% 60% at 50% 44%, #fbf6ea 0%, #efe7d4 100%)}
.prodcard{position:relative;z-index:2;background:#fff;border-radius:38px;padding:24px 78px;display:flex;align-items:center;justify-content:center;box-shadow:0 28px 56px rgba(60,40,5,.20)}
.prodcard img{height:506px;display:block}
.sheet{position:absolute;left:0;bottom:0;width:1080px;background:${CREAM};border-radius:46px 46px 0 0;padding:50px 80px 70px;display:flex;flex-direction:column;box-shadow:0 -18px 44px rgba(0,0,0,.12)}
.h650{top:700px;height:650px}.h760{height:760px}
.row{display:flex;align-items:center;justify-content:space-between;width:100%}.rule{height:4px;width:120px;background:${GOLD};border-radius:2px}
.dots{display:flex;gap:9px}.dot{width:9px;height:9px;border-radius:50%;background:rgba(0,0,0,.16)}.dot.on{background:${GOLD};width:26px;border-radius:6px}
.pill{align-self:flex-start;font-family:'Inter';font-weight:600;font-size:22px;color:#3a2f12;background:linear-gradient(135deg,#edcb6a,#cf9f2c);padding:13px 26px;border-radius:40px;margin:18px 0 4px}
.tag{align-self:flex-start;font-family:'Inter';font-weight:700;font-size:20px;letter-spacing:3px;text-transform:uppercase;color:${GOLDD};margin:18px 0 2px}
h1{font-family:'Fraunces';font-weight:600;font-size:50px;line-height:1.08;letter-spacing:-.5px;margin-top:18px}
h1.brand{font-size:70px;margin-top:14px}
.sub{font-family:'Inter';font-weight:500;font-size:27px;color:${GOLDD};margin-top:14px}
.body{font-family:'Inter';font-weight:400;font-size:28px;line-height:1.5;color:${SUB};margin-top:22px;max-width:880px}
.quote{font-family:'Fraunces';font-weight:500;font-style:italic;font-size:44px;line-height:1.2;color:${INK};margin-top:18px}
.qfrom{font-family:'Inter';font-weight:600;font-size:23px;color:${GOLDD};margin-top:18px}
.foot{display:flex;align-items:center;justify-content:space-between;margin-top:34px}
.num{font-family:'Inter';font-weight:600;font-size:22px;color:${GOLDD};letter-spacing:1px}
.sw{font-family:'Inter';font-weight:500;font-size:20px;color:${SUB};display:inline-flex;align-items:center;gap:10px;text-transform:uppercase;letter-spacing:1px}
.btn{align-self:flex-start;display:inline-flex;align-items:center;gap:14px;background:#1faf54;color:#fff;font-family:'Inter';font-weight:700;font-size:30px;padding:22px 40px;border-radius:50px;margin-top:30px;box-shadow:0 12px 26px rgba(31,175,84,.32)}
.phone{font-family:'Inter';font-weight:600;font-size:25px;color:${INK};margin-top:22px}
.aviso{font-family:'Inter';font-weight:400;font-size:16px;line-height:1.42;color:#8a8478;margin-top:auto;border-top:1px solid rgba(0,0,0,.1);padding-top:18px}`;
const heroSlide = (n) => `<div class="stage"><div class="prodband"><div class="prodcard"><img src="${PROD}"></div></div>
  <div class="chip"><img src="${LOGO}"></div>
  <div class="sheet h650"><div class="row"><div class="rule"></div>${dots(n)}</div>
  <div class="tag">${esc(cfg.hero.tag)}</div><h1 class="brand">${nl(cfg.hero.title)}</h1><div class="sub">${esc(cfg.hero.sub)}</div>
  <div class="foot"><span class="num">0${n} / 0${TOTAL}</span><span class="sw">arraste ${swipe()}</span></div></div></div>`;
const photoSlide = (n,s) => `<div class="stage"><div class="photoband" style="background-image:url('${b64(s.img,'image/jpeg')}');background-position:${s.pos}"></div>
  <div class="photoscrim"></div><div class="chip"><img src="${LOGO}"></div>
  <div class="sheet h760"><div class="row"><div class="rule"></div>${dots(n)}</div>
  <div class="pill">${esc(s.pill)}</div><h1>${nl(s.headline)}</h1><p class="body">${nl(s.body)}</p>
  <div class="foot"><span class="num">0${n} / 0${TOTAL}</span>${n===TOTAL?'':`<span class="sw">arraste ${swipe()}</span>`}</div></div></div>`;
const quoteSlide = (n,s) => `<div class="stage"><div class="prodband"><div class="prodcard"><img src="${PROD}"></div></div>
  <div class="chip"><img src="${LOGO}"></div>
  <div class="sheet h650"><div class="row"><div class="rule"></div>${dots(n)}</div>
  <div class="pill">Quem usa</div><p class="quote">${nl(s.quote)}</p><div class="qfrom">${esc(s.from)}</div>
  <div class="foot"><span class="num">0${n} / 0${TOTAL}</span><span class="sw">arraste ${swipe()}</span></div></div></div>`;
const ctaSlide = (n,s) => `<div class="stage"><div class="chip"><img src="${LOGO}"></div>
  <div class="sheet h760" style="height:1350px;border-radius:0;justify-content:flex-start;padding-top:230px">
  <div class="row"><div class="rule"></div>${dots(n)}</div><div class="tag">Comece hoje</div>
  <h1>${nl(s.headline)}</h1><p class="body">${nl(s.body)}</p>
  <div class="btn">${wa()} Pedir no WhatsApp</div><div class="phone">ou ligue ${esc(PHONE)}</div>
  <div class="aviso">${esc(s.aviso)}</div></div></div>`;
const wrap = inner => `<!doctype html><html><head><meta charset="utf-8">
<link href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,ital,wght@9..144,0,500;9..144,0,600;9..144,0,700;9..144,1,500&family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">
<style>${CSS}</style></head><body>${inner}</body></html>`;
const browser = await chromium.launch({ channel: 'chrome' });
const page = await browser.newPage({ viewport: { width: 1080, height: 1350 }, deviceScaleFactor: 2 });
let n = 0;
for (const s of cfg.slides) {
  n++;
  const inner = s.type==='hero'?heroSlide(n):s.type==='photo'?photoSlide(n,s):s.type==='quote'?quoteSlide(n,s):ctaSlide(n,s);
  writeFileSync(`${A}/_s${n}.html`, wrap(inner));
  await page.goto('file:///' + process.cwd().replace(/\\/g, '/') + `/${A}/_s${n}.html`);
  await page.evaluate(() => document.fonts.ready); await page.waitForTimeout(380);
  await page.screenshot({ path: `${OUT}/slide-0${n}.jpg`, type: 'jpeg', quality: 92, clip: { x: 0, y: 0, width: 1080, height: 1350 } });
  console.log('ok', n);
}
await browser.close(); console.log('DONE', OUT);
