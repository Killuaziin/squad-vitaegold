import { readFileSync, writeFileSync } from 'node:fs';
import { chromium } from 'playwright';

const A = 'squads/carrossel-vitaegold/output/_build/blog-sono/assets';
const OUT = 'squads/carrossel-vitaegold/output/blog-sono/images';
const b64 = (p, m) => `data:${m};base64,` + readFileSync(`${A}/${p}`).toString('base64');
const LOGO = b64('logo-nova.png', 'image/png');

const GOLD = '#c79a2e', INK = '#211f1a', SUB = '#5b564c', CREAM = '#f6f1e6', GOLDD = '#9c7415';
const swipe = (c = GOLD) => `<svg width="46" height="20" viewBox="0 0 46 20"><path d="M2 10 H38 M30 3 L40 10 L30 17" stroke="${c}" stroke-width="3.5" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
const esc = s => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const nl = s => esc(s).replace(/\n/g, '<br>');
const TOTAL = 5;
function dots(active) { let d = ''; for (let i = 1; i <= TOTAL; i++) d += `<span class="dot${i === active ? ' on' : ''}"></span>`; return `<div class="dots">${d}</div>`; }

const slides = [
  { n: 1, photo: b64('s1.jpg', 'image/jpeg'), pos: 'center 40%',
    headline: 'Uma boa noite de sono muda o seu dia inteiro.',
    body: 'Dormir bem não é luxo — é o que devolve sua disposição pra aproveitar quem você ama.' },
  { n: 2, photo: b64('s2.jpg', 'image/jpeg'), pos: 'center 40%', pill: 'Regularidade',
    headline: 'Seu corpo gosta de horários.',
    body: 'Deitar e acordar em horários parecidos, até no fim de semana, ajuda o relógio interno a entender que é hora de descansar.' },
  { n: 3, photo: b64('s3.jpg', 'image/jpeg'), pos: 'center 50%', pill: 'Ambiente',
    headline: 'O quarto certo convida ao sono.',
    body: 'Escuridão, um ambiente levemente fresco e silêncio (ou um som suave e constante) sinalizam ao corpo que é hora de relaxar.' },
  { n: 4, photo: b64('s4.jpg', 'image/jpeg'), pos: 'center 35%', pill: 'Hábitos',
    headline: 'Desacelere antes de deitar.',
    body: 'Diminua as telas na última hora do dia e reduza as luzes da casa à noite. O corpo entende esses sinais e relaxa mais fácil.' },
  { n: 5, photo: b64('s5.jpg', 'image/jpeg'), pos: 'center 40%',
    headline: 'Pequenos ajustes, noites melhores.',
    body: 'Não precisa mudar tudo de uma vez. Comece por um hábito hoje — seu sono agradece amanhã.' },
];

function render(s) {
  const pill = s.pill ? `<div class="pill">${esc(s.pill)}</div>` : '';
  const isLast = s.n === TOTAL;
  const sheetExtra = `<div class="foot"><span class="num">0${s.n} / 0${TOTAL}</span>${isLast ? '' : `<span class="sw">arraste ${swipe()}</span>`}</div>`;
  return `<!doctype html><html><head><meta charset="utf-8">
<link href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,500;0,9..144,600;0,9..144,700;1,9..144,500&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
<style>
*{margin:0;padding:0;box-sizing:border-box}
html,body{width:1080px;height:1350px}
.stage{width:1080px;height:1350px;background:${CREAM};position:relative;overflow:hidden;color:${INK}}
.photoband{position:absolute;top:0;left:0;width:1080px;height:660px;background-size:cover;background-position:${s.pos};background-image:url('${s.photo}')}
.photoscrim{position:absolute;top:0;left:0;width:1080px;height:660px;background:linear-gradient(180deg,rgba(35,25,8,.18) 0%,rgba(35,25,8,0) 30%,rgba(35,25,8,0) 66%,rgba(20,14,4,.24) 100%),rgba(212,160,23,.06)}
.sheet{position:absolute;left:0;bottom:0;width:1080px;height:760px;background:${CREAM};border-radius:46px 46px 0 0;padding:54px 80px 70px;display:flex;flex-direction:column;box-shadow:0 -18px 44px rgba(0,0,0,.12)}
.chip{position:absolute;top:54px;left:70px;background:#fff;border-radius:18px;padding:14px 20px;box-shadow:0 6px 22px rgba(0,0,0,.16);z-index:5}
.chip img{height:46px;display:block}
.row{display:flex;align-items:center;justify-content:space-between;width:100%}
.rule{height:4px;width:120px;background:${GOLD};border-radius:2px}
.dots{display:flex;gap:9px}
.dot{width:9px;height:9px;border-radius:50%;background:rgba(0,0,0,.16)}
.dot.on{background:${GOLD};width:26px;border-radius:6px}
.pill{align-self:flex-start;font-family:'Inter';font-weight:600;font-size:22px;color:#3a2f12;background:linear-gradient(135deg,#edcb6a,#cf9f2c);padding:13px 26px;border-radius:40px;margin:18px 0 4px}
h1{font-family:'Fraunces';font-weight:600;font-size:52px;line-height:1.1;letter-spacing:-.5px;margin-top:22px}
.body{font-family:'Inter';font-weight:400;font-size:29px;line-height:1.5;color:${SUB};margin-top:26px;max-width:880px}
.foot{display:flex;align-items:center;justify-content:space-between;margin-top:auto}
.num{font-family:'Inter';font-weight:600;font-size:22px;color:${GOLDD};letter-spacing:1px}
.sw{font-family:'Inter';font-weight:500;font-size:20px;color:${SUB};display:inline-flex;align-items:center;gap:10px;text-transform:uppercase;letter-spacing:1px}
</style></head><body><div class="stage">
  <div class="photoband"></div><div class="photoscrim"></div>
  <div class="chip"><img src="${LOGO}"></div>
  <div class="sheet">
    <div class="row"><div class="rule"></div>${dots(s.n)}</div>
    ${pill}
    <h1>${nl(s.headline)}</h1>
    <p class="body">${nl(s.body)}</p>
    ${sheetExtra}
  </div>
</div></body></html>`;
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
console.log('DONE blog-sono');
