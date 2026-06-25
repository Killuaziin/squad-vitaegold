import { readFileSync, writeFileSync } from 'node:fs';
import { chromium } from 'playwright';
const A = 'squads/carrossel-vitaegold/output/_build/blog-fibras/assets';
const OUT = 'squads/carrossel-vitaegold/output/blog-fibras/images';
const b64 = (p, m) => `data:${m};base64,` + readFileSync(`${A}/${p}`).toString('base64');
const LOGO = b64('logo-nova.png', 'image/png');
const GOLD = '#c79a2e', INK = '#211f1a', SUB = '#5b564c', CREAM = '#f6f1e6', GOLDD = '#9c7415';
const swipe = (c = GOLD) => `<svg width="46" height="20" viewBox="0 0 46 20"><path d="M2 10 H38 M30 3 L40 10 L30 17" stroke="${c}" stroke-width="3.5" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
const esc = s => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const nl = s => esc(s).replace(/\n/g, '<br>');
const TOTAL = 5;
const dots = a => `<div class="dots">${Array.from({length:TOTAL},(_,i)=>`<span class="dot${i+1===a?' on':''}"></span>`).join('')}</div>`;
const slides = [
  { n:1, photo:b64('s1.jpg','image/jpeg'), pos:'center 50%',
    headline:'Cuidar do intestino começa no prato.',
    body:'As fibras fazem muito mais do que ajudar a digestão. Elas são alimento pra sua saúde como um todo.' },
  { n:2, photo:b64('s2.jpg','image/jpeg'), pos:'center 50%', pill:'Os dois tipos',
    headline:'Duas fibras, dois benefícios.',
    body:'As solúveis (aveia, feijão, maçã) dão saciedade e regulam o ritmo. As insolúveis (integrais, folhosos) facilitam o trânsito intestinal.' },
  { n:3, photo:b64('s3.jpg','image/jpeg'), pos:'center 50%', pill:'Intestino feliz',
    headline:'Suas bactérias boas se alimentam de fibra.',
    body:'A microbiota do intestino se nutre das fibras e mantém o ambiente equilibrado. Comer bem é cuidar dela também.' },
  { n:4, photo:b64('s4.jpg','image/jpeg'), pos:'center 50%', pill:'No prato',
    headline:'Onde encontrar todo dia.',
    body:'Feijão, lentilha e grão de bico, aveia e grãos integrais, frutas e verduras. Vá aumentando aos poucos, com bastante água.' },
  { n:5, photo:b64('s5.jpg','image/jpeg'), pos:'center 35%',
    headline:'Um intestino bem cuidado se sente no corpo todo.',
    body:'Pequenas trocas no prato, todo dia. Seu corpo agradece com mais disposição.' },
];
function render(s){
  const isLast=s.n===TOTAL; const pill=s.pill?`<div class="pill">${esc(s.pill)}</div>`:'';
  return `<!doctype html><html><head><meta charset="utf-8">
<link href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,600;9..144,700&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
<style>
*{margin:0;padding:0;box-sizing:border-box}html,body{width:1080px;height:1350px}
.stage{width:1080px;height:1350px;background:${CREAM};position:relative;overflow:hidden;color:${INK}}
.photoband{position:absolute;top:0;left:0;width:1080px;height:660px;background-size:cover;background-position:${s.pos};background-image:url('${s.photo}')}
.photoscrim{position:absolute;top:0;left:0;width:1080px;height:660px;background:linear-gradient(180deg,rgba(35,25,8,.18) 0%,rgba(35,25,8,0) 30%,rgba(35,25,8,0) 66%,rgba(20,14,4,.24) 100%),rgba(212,160,23,.06)}
.sheet{position:absolute;left:0;bottom:0;width:1080px;height:760px;background:${CREAM};border-radius:46px 46px 0 0;padding:54px 80px 70px;display:flex;flex-direction:column;box-shadow:0 -18px 44px rgba(0,0,0,.12)}
.chip{position:absolute;top:54px;left:70px;background:#fff;border-radius:18px;padding:14px 20px;box-shadow:0 6px 22px rgba(0,0,0,.16);z-index:5}.chip img{height:46px;display:block}
.row{display:flex;align-items:center;justify-content:space-between;width:100%}.rule{height:4px;width:120px;background:${GOLD};border-radius:2px}
.dots{display:flex;gap:9px}.dot{width:9px;height:9px;border-radius:50%;background:rgba(0,0,0,.16)}.dot.on{background:${GOLD};width:26px;border-radius:6px}
.pill{align-self:flex-start;font-family:'Inter';font-weight:600;font-size:22px;color:#3a2f12;background:linear-gradient(135deg,#edcb6a,#cf9f2c);padding:13px 26px;border-radius:40px;margin:18px 0 4px}
h1{font-family:'Fraunces';font-weight:600;font-size:48px;line-height:1.1;letter-spacing:-.5px;margin-top:22px}
.body{font-family:'Inter';font-weight:400;font-size:28px;line-height:1.5;color:${SUB};margin-top:24px;max-width:880px}
.foot{display:flex;align-items:center;justify-content:space-between;margin-top:auto}
.num{font-family:'Inter';font-weight:600;font-size:22px;color:${GOLDD};letter-spacing:1px}
.sw{font-family:'Inter';font-weight:500;font-size:20px;color:${SUB};display:inline-flex;align-items:center;gap:10px;text-transform:uppercase;letter-spacing:1px}
</style></head><body><div class="stage">
  <div class="photoband"></div><div class="photoscrim"></div><div class="chip"><img src="${LOGO}"></div>
  <div class="sheet"><div class="row"><div class="rule"></div>${dots(s.n)}</div>${pill}
  <h1>${nl(s.headline)}</h1><p class="body">${nl(s.body)}</p>
  <div class="foot"><span class="num">0${s.n} / 0${TOTAL}</span>${isLast?'':`<span class="sw">arraste ${swipe()}</span>`}</div></div>
</div></body></html>`;
}
const browser = await chromium.launch({ channel:'chrome' });
const page = await browser.newPage({ viewport:{width:1080,height:1350}, deviceScaleFactor:2 });
for(const s of slides){ writeFileSync(`${A}/_s${s.n}.html`, render(s)); await page.goto('file:///'+process.cwd().replace(/\\/g,'/')+`/${A}/_s${s.n}.html`); await page.evaluate(()=>document.fonts.ready); await page.waitForTimeout(360); await page.screenshot({path:`${OUT}/slide-0${s.n}.jpg`,type:'jpeg',quality:92,clip:{x:0,y:0,width:1080,height:1350}}); console.log('ok',s.n); }
await browser.close(); console.log('DONE fibras');
