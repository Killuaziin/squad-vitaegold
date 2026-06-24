import { readFileSync, writeFileSync } from 'node:fs';
import { chromium } from 'playwright';

const A = 'squads/carrossel-vitaegold/output/_build/blog-caminhada/assets';
const OUT = 'squads/carrossel-vitaegold/output/blog-caminhada/images';
const b64 = (p, m) => `data:${m};base64,` + readFileSync(`${A}/${p}`).toString('base64');
const LOGO = b64('logo-nova.png', 'image/png');

const GOLD = '#c79a2e', INK = '#211f1a', SUB = '#5b564c', CREAM = '#f6f1e6', GOLDD = '#9c7415';
const swipe = (c = GOLD) => `<svg width="46" height="20" viewBox="0 0 46 20"><path d="M2 10 H38 M30 3 L40 10 L30 17" stroke="${c}" stroke-width="3.5" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
const esc = s => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const nl = s => esc(s).replace(/\n/g, '<br>');
const TOTAL = 5;
function dots(active) { let d = ''; for (let i = 1; i <= TOTAL; i++) d += `<span class="dot${i === active ? ' on' : ''}"></span>`; return `<div class="dots">${d}</div>`; }

const slides = [
  { n: 1, photo: b64('s1.jpg', 'image/jpeg'), pos: 'center 42%',
    headline: 'Caminhar é o jeito mais simples de continuar acompanhando quem você ama.',
    body: 'Sem academia, sem equipamento. Só você, seus passos e mais disposição no dia a dia.' },
  { n: 2, photo: b64('s2.jpg', 'image/jpeg'), pos: 'center 52%', pill: 'Corpo',
    headline: 'Cada passo cuida das suas articulações.',
    body: 'A caminhada é de baixo impacto: estimula a circulação, aquece os músculos e lubrifica as juntas — de forma suave e no seu ritmo.' },
  { n: 3, photo: b64('s3.jpg', 'image/jpeg'), pos: 'center 28%', pill: 'Mente',
    headline: 'Faz bem pro corpo e acalma a cabeça.',
    body: 'Ao ar livre, com a luz do sol e o ritmo dos passos, vem aquela sensação de leveza e tranquilidade.' },
  { n: 4, photo: b64('s4.jpg', 'image/jpeg'), pos: 'center 42%', pill: 'Rotina',
    headline: 'Dá pra caminhar mais sem mudar sua rotina.',
    body: 'Desça um ponto antes, prefira a escada, dê uma volta no quarteirão depois do almoço. Pequenos passos somam muito no fim da semana.' },
  { n: 5, photo: b64('s5.jpg', 'image/jpeg'), pos: 'center 30%',
    headline: 'Comece com 15 minutos por dia.',
    body: 'O que importa não é a intensidade — é a constância. Dê o primeiro passo hoje, por você e por quem você ama.' },
];

function render(s) {
  const pill = s.pill ? `<div class="pill">${esc(s.pill)}</div>` : '';
  const isCta = !!s.cta;
  const isLast = s.n === TOTAL;
  const sheetExtra = isCta
    ? `<div class="cta"><svg width="26" height="26" viewBox="0 0 24 24"><path d="M12 19 V6 M6 12 L12 6 L18 12" stroke="#fff" stroke-width="3" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>${esc(s.cta)}</div>`
    : `<div class="foot"><span class="num">0${s.n} / 0${TOTAL}</span>${isLast ? '' : `<span class="sw">arraste ${swipe()}</span>`}</div>`;
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
.cta{align-self:flex-start;display:inline-flex;align-items:center;gap:14px;font-family:'Inter';font-weight:700;font-size:32px;color:#fff;background:#25d366;padding:24px 52px;border-radius:16px;margin-top:40px;box-shadow:0 14px 34px rgba(37,211,102,.34)}
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
console.log('DONE blog-caminhada');
