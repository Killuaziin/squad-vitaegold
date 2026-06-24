import { readFileSync, writeFileSync } from 'node:fs';
import { chromium } from 'playwright';

const A = 'squads/carrossel-vitaegold/output/_build/produto-vitae71/assets';
const OUT = 'squads/carrossel-vitaegold/output/produto-vitae71/images';
const b64 = (p, m) => `data:${m};base64,` + readFileSync(`${A}/${p}`).toString('base64');
const LOGO = b64('logo-nova.png', 'image/png');
const PRODUTO = b64('produto.png', 'image/png');

const GOLD = '#c79a2e', INK = '#211f1a', SUB = '#5b564c', CREAM = '#f6f1e6', GOLDD = '#9c7415';
const swipe = (c = GOLD) => `<svg width="46" height="20" viewBox="0 0 46 20"><path d="M2 10 H38 M30 3 L40 10 L30 17" stroke="${c}" stroke-width="3.5" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
const esc = s => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const nl = s => esc(s).replace(/\n/g, '<br>');
const TOTAL = 5;
function dots(active) { let d = ''; for (let i = 1; i <= TOTAL; i++) d += `<span class="dot${i === active ? ' on' : ''}"></span>`; return `<div class="dots">${d}</div>`; }

const slides = [
  { n: 1, mode: 'product', bg: '#fefefe',
    headline: 'Sete nutrientes. Uma cápsula só.',
    body: 'O Vitae 7.1 reúne 7 ativos numa fórmula prática, pra cuidar da saúde sem complicação.' },
  { n: 2, mode: 'photo', bg: CREAM, photo: b64('vitc.jpg', 'image/jpeg'), pos: 'center 50%', pill: 'Imunidade',
    headline: 'Apoio para o seu sistema imune.',
    body: 'A vitamina C auxilia no funcionamento do sistema imune e na formação do colágeno. A cúrcuma contribui com ação antioxidante.' },
  { n: 3, mode: 'photo', bg: CREAM, photo: b64('senior.jpg', 'image/jpeg'), pos: 'center 35%', pill: 'Corpo ativo',
    headline: 'Disposição para o seu dia a dia.',
    body: 'O magnésio auxilia no funcionamento muscular e neuromuscular, pra você manter o ritmo com quem ama.' },
  { n: 4, mode: 'photo', bg: CREAM, photo: b64('capsula.jpg', 'image/jpeg'), pos: 'center 45%', pill: '7 em 1',
    headline: 'Tudo isso em uma fórmula.',
    body: 'Vitamina C, magnésio, creatina, cúrcuma, chlorella, MSM e colágeno tipo II, numa só cápsula.' },
  { n: 5, mode: 'product', bg: '#fefefe', cta: 'Saiba mais no site',
    legal: 'Este produto não é um medicamento. Indicado para maiores de 18 anos. Consulte um profissional de saúde.',
    headline: 'Conheça o Vitae 7.1.',
    body: 'Pra cuidar de você com praticidade, do seu jeito.' },
];

function render(s) {
  const isLast = s.n === TOTAL;
  const css = `
*{margin:0;padding:0;box-sizing:border-box}
html,body{width:1080px;height:1350px}
.stage{width:1080px;height:1350px;background:${s.bg};position:relative;overflow:hidden;color:${INK};font-family:'Inter'}
.chip{position:absolute;top:54px;left:70px;background:#fff;border-radius:18px;padding:14px 20px;box-shadow:0 6px 22px rgba(0,0,0,.14);z-index:6}
.chip img{height:46px;display:block}
.rule{height:4px;width:120px;background:${GOLD};border-radius:2px}
.dots{display:flex;gap:9px}
.dot{width:9px;height:9px;border-radius:50%;background:rgba(0,0,0,.16)}
.dot.on{background:${GOLD};width:26px;border-radius:6px}
.pill{align-self:flex-start;font-family:'Inter';font-weight:600;font-size:22px;color:#3a2f12;background:linear-gradient(135deg,#edcb6a,#cf9f2c);padding:13px 26px;border-radius:40px;margin:18px 0 4px}
h1{font-family:'Fraunces';font-weight:600;font-size:50px;line-height:1.1;letter-spacing:-.5px}
.body{font-family:'Inter';font-weight:400;font-size:28px;line-height:1.5;color:${SUB};margin-top:24px}
.num{font-family:'Inter';font-weight:600;font-size:22px;color:${GOLDD};letter-spacing:1px}
.sw{font-family:'Inter';font-weight:500;font-size:20px;color:${SUB};display:inline-flex;align-items:center;gap:10px;text-transform:uppercase;letter-spacing:1px}
/* photo mode */
.photoband{position:absolute;top:0;left:0;width:1080px;height:660px;background-size:cover;background-position:${s.pos || 'center'};background-image:url('${s.photo || ''}')}
.photoscrim{position:absolute;top:0;left:0;width:1080px;height:660px;background:linear-gradient(180deg,rgba(35,25,8,.18) 0%,rgba(35,25,8,0) 30%,rgba(35,25,8,0) 66%,rgba(20,14,4,.24) 100%),rgba(212,160,23,.06)}
.sheet{position:absolute;left:0;bottom:0;width:1080px;height:760px;background:${s.bg};border-radius:46px 46px 0 0;padding:54px 80px 70px;display:flex;flex-direction:column;box-shadow:0 -18px 44px rgba(0,0,0,.12)}
.row{display:flex;align-items:center;justify-content:space-between;width:100%}
.foot{display:flex;align-items:center;justify-content:space-between;margin-top:auto}
/* product mode */
.bottle{position:absolute;right:-10px;top:50%;transform:translateY(-50%);height:900px;object-fit:contain}
.prow{position:absolute;top:74px;right:70px}
.pcontent{position:absolute;left:80px;top:50%;transform:translateY(-50%);width:400px;display:flex;flex-direction:column}
.pfoot{position:absolute;left:80px;bottom:74px;display:flex;align-items:center;gap:26px}
.cta{align-self:flex-start;display:inline-flex;align-items:center;gap:12px;font-family:'Inter';font-weight:700;font-size:30px;color:#fff;background:#25d366;padding:22px 46px;border-radius:14px;margin-top:34px;box-shadow:0 14px 34px rgba(37,211,102,.32)}
.legal{margin-top:30px;background:${CREAM};border:2px solid ${GOLD};border-radius:14px;padding:20px 22px;font-family:'Inter';font-size:20px;color:#4a4538;line-height:1.4;max-width:560px}
`;

  let inner;
  if (s.mode === 'product') {
    const ctaHtml = s.cta ? `<div class="cta"><svg width="24" height="24" viewBox="0 0 24 24"><path d="M12 19 V6 M6 12 L12 6 L18 12" stroke="#fff" stroke-width="3" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>${esc(s.cta)}</div>` : '';
    const legalHtml = s.legal ? `<div class="legal">${esc(s.legal)}</div>` : '';
    const footHtml = `<div class="pfoot"><span class="num">0${s.n} / 0${TOTAL}</span>${isLast ? '' : `<span class="sw">arraste ${swipe()}</span>`}</div>`;
    inner = `
      <img class="bottle" src="${PRODUTO}">
      <div class="chip"><img src="${LOGO}"></div>
      <div class="prow">${dots(s.n)}</div>
      <div class="pcontent">
        <div class="rule" style="margin-bottom:26px"></div>
        <h1>${nl(s.headline)}</h1>
        <p class="body">${nl(s.body)}</p>
        ${ctaHtml}${legalHtml}
      </div>
      ${footHtml}`;
  } else {
    const pill = s.pill ? `<div class="pill">${esc(s.pill)}</div>` : '';
    inner = `
      <div class="photoband"></div><div class="photoscrim"></div>
      <div class="chip"><img src="${LOGO}"></div>
      <div class="sheet">
        <div class="row"><div class="rule"></div>${dots(s.n)}</div>
        ${pill}
        <h1 style="margin-top:22px">${nl(s.headline)}</h1>
        <p class="body">${nl(s.body)}</p>
        <div class="foot"><span class="num">0${s.n} / 0${TOTAL}</span>${isLast ? '' : `<span class="sw">arraste ${swipe()}</span>`}</div>
      </div>`;
  }

  return `<!doctype html><html><head><meta charset="utf-8">
<link href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,500;0,9..144,600;0,9..144,700&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
<style>${css}</style></head><body><div class="stage">${inner}</div></body></html>`;
}

const browser = await chromium.launch({ channel: 'chrome' });
const page = await browser.newPage({ viewport: { width: 1080, height: 1350 }, deviceScaleFactor: 2 });
for (const s of slides) {
  writeFileSync(`${A}/_slide-0${s.n}.html`, render(s));
  await page.goto('file:///' + process.cwd().replace(/\\/g, '/') + `/${A}/_slide-0${s.n}.html`);
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(380);
  await page.screenshot({ path: `${OUT}/slide-0${s.n}.jpg`, type: 'jpeg', quality: 92, clip: { x: 0, y: 0, width: 1080, height: 1350 } });
  console.log('  ok slide-0' + s.n + '.jpg');
}
await browser.close();
console.log('DONE produto-vitae71');
