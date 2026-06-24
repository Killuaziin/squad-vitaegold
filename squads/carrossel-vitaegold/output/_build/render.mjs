import { readFileSync, writeFileSync } from 'node:fs';
import { chromium } from 'playwright';

const BUILD = 'squads/carrossel-vitaegold/output/_build';
const OUT = 'squads/carrossel-vitaegold/output/images';

const logoB64 = readFileSync(`${BUILD}/logo.jpg`).toString('base64');
const LOGO = `data:image/jpeg;base64,${logoB64}`;

const GOLD = '#d4a017';
const DARK = '#1a1a1a';

const chevron = (color) => `<svg width="46" height="26" viewBox="0 0 46 26" fill="none"><path d="M3 3 L23 23 L43 3" stroke="${color}" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/></svg>`;

// ── Slide definitions (textos exatos do brief aprovado) ───────
const slides = [
  {
    n: 1, bg: GOLD, logo: 'dark',
    headline: { t: '4 nutrientes.\n1 cápsula.\nVeja o que cada um faz.', size: 58, color: DARK },
    divider: DARK,
    body: { t: 'Cúrcuma, colágeno tipo II, magnésio e cálcio — saiba por que eles estão juntos no CúrcumaWhite.', size: 29, color: DARK },
    chevron: DARK, align: 'center',
  },
  {
    n: 2, bg: '#ffffff', logo: 'dark', leftbar: GOLD, number: '2',
    headline: { t: 'O dia a dia cobra um preço do seu corpo.', size: 46, color: DARK },
    body: { t: 'Rotina intensa, alimentação corrida. Complementar a dieta com os nutrientes certos é uma escolha inteligente — não um luxo.', size: 29, color: '#333333' },
    chevron: DARK, align: 'left',
  },
  {
    n: 3, bg: '#ffffff', logo: 'dark', number: '3',
    pill: { t: 'Colágeno Tipo II Não Desnaturado', bg: GOLD, color: '#ffffff' },
    headline: { t: 'Suas articulações precisam de atenção contínua.', size: 44, color: DARK },
    body: { t: 'O colágeno tipo II não desnaturado auxilia na manutenção da função articular — um apoio diário para quem não quer sentir o tempo passar nas juntas.', size: 29, color: '#333333' },
    chevron: GOLD, align: 'left',
  },
  {
    n: 4, bg: GOLD, logo: 'dark', number: '4', numberColor: DARK,
    pill: { t: 'Extrato de Cúrcuma (Curcuma longa)', bg: DARK, color: GOLD },
    headline: { t: 'A cúrcuma tem alegação funcional reconhecida no Brasil.', size: 44, color: DARK },
    body: { t: 'O extrato de cúrcuma possui ação antioxidante — contribuindo para o equilíbrio do organismo frente ao estresse oxidativo do cotidiano.', size: 29, color: DARK },
    chevron: DARK, align: 'left',
  },
  {
    n: 5, bg: DARK, logo: 'gold', number: '5',
    pill: { t: 'Magnésio', bg: GOLD, color: DARK },
    headline: { t: 'Músculos em dia, rendimento de verdade.', size: 46, color: '#ffffff' },
    underline: GOLD,
    body: { t: 'O magnésio auxilia no funcionamento muscular e neuromuscular — um mineral essencial que muitas pessoas não ingerem em quantidade suficiente só pela alimentação.', size: 29, color: '#f5f5f5' },
    chevron: GOLD, align: 'left',
  },
  {
    n: 6, bg: '#f5f5f5', logo: 'dark', number: '6', card: true,
    pill: { t: 'Cálcio', bg: GOLD, color: '#ffffff' },
    headline: { t: 'Ossos fortes são construídos todos os dias.', size: 46, color: DARK },
    body: { t: 'O cálcio auxilia na formação e manutenção de ossos e dentes — e manter o aporte adequado desse mineral é um compromisso de longo prazo com a sua saúde.', size: 29, color: '#333333' },
    chevron: GOLD, align: 'left',
  },
  {
    n: 7, bg: DARK, logo: 'gold', topbar: GOLD,
    headline: { t: 'CúrcumaWhite: os 4 bioativos em uma fórmula prática.', size: 46, color: '#ffffff' },
    bullets: ['Colágeno Tipo II', 'Cúrcuma', 'Magnésio', 'Cálcio'],
    body: { t: 'Colágeno tipo II não desnaturado, extrato de cúrcuma, magnésio e cálcio — um complemento alimentar desenvolvido para quem cuida do corpo com consistência.', size: 29, color: '#f5f5f5' },
    glow: true, chevron: GOLD, align: 'left',
  },
  {
    n: 8, bg: '#ffffff', logo: 'dark', align: 'center',
    bookmark: true,
    headline: { t: 'Salve este post e conheça o CúrcumaWhite.', size: 46, color: DARK },
    body: { t: 'Acesse o link na bio para saber mais sobre a fórmula completa.', size: 31, color: '#333333', weight: 600 },
    cta: { t: 'Link na bio', bg: '#25d366', color: '#ffffff' },
    legal: 'Este produto não é um medicamento. Consulte um nutricionista.',
  },
];

function esc(s) { return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;'); }
function nl(s) { return esc(s).replace(/\n/g, '<br>'); }

function html(s) {
  const alignItems = s.align === 'center' ? 'center' : 'flex-start';
  const textAlign = s.align === 'center' ? 'center' : 'left';

  const logoFilter = s.logo === 'gold' ? '' : '';
  const number = s.number ? `<div class="num" style="color:${s.numberColor || GOLD}">${s.number}</div>` : '';
  const pill = s.pill ? `<div class="pill" style="background:${s.pill.bg};color:${s.pill.color}">${esc(s.pill.t)}</div>` : '';
  const divider = s.divider ? `<div class="divider" style="background:${s.divider}"></div>` : '';
  const underline = s.underline ? `<div class="underline" style="background:${s.underline}"></div>` : '';
  const bullets = s.bullets ? `<div class="bullets">${s.bullets.map(b => `<span>${esc(b)}</span>`).join('<i>•</i>')}</div>` : '';
  const topbar = s.topbar ? `<div class="topbar" style="background:${s.topbar}"></div>` : '';
  const leftbar = s.leftbar ? `<div class="leftbar" style="background:${s.leftbar}"></div>` : '';
  const glow = s.glow ? `<div class="glow"></div>` : '';
  const chev = s.chevron ? `<div class="chev">${chevron(s.chevron)}</div>` : '';
  const bookmark = s.bookmark ? `<svg class="bm" width="40" height="48" viewBox="0 0 40 48" fill="none"><path d="M6 4 H34 V44 L20 33 L6 44 Z" stroke="${GOLD}" stroke-width="4" stroke-linejoin="round" fill="none"/></svg>` : '';
  const cta = s.cta ? `<div class="cta" style="background:${s.cta.bg};color:${s.cta.color}"><svg width="26" height="26" viewBox="0 0 24 24" fill="none"><path d="M12 20 V5 M5 12 L12 5 L19 12" stroke="${s.cta.color}" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg>${esc(s.cta.t)}</div>` : '';
  const legal = s.legal ? `<div class="legal">${esc(s.legal)}</div>` : '';

  const bodyWeight = s.body && s.body.weight ? s.body.weight : 400;

  const cardOpen = s.card ? `<div class="card">` : '';
  const cardClose = s.card ? `</div>` : '';

  return `<!doctype html><html><head><meta charset="utf-8">
<link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;600;700;800&family=Inter:wght@400;600;700&display=swap" rel="stylesheet">
<style>
  * { margin:0; padding:0; box-sizing:border-box; }
  html,body { width:1080px; height:1350px; }
  .slide { width:1080px; height:1350px; background:${s.bg}; position:relative; overflow:hidden;
           padding:96px 90px 120px; display:flex; flex-direction:column; justify-content:center;
           align-items:${alignItems}; text-align:${textAlign}; }
  .logo { position:absolute; top:70px; right:70px; width:120px; height:120px; border-radius:50%;
          object-fit:cover; box-shadow:0 4px 18px rgba(0,0,0,.18); }
  .topbar { position:absolute; top:0; left:0; width:1080px; height:8px; }
  .leftbar { position:absolute; left:60px; top:50%; transform:translateY(-50%); width:8px; height:300px; border-radius:4px; }
  .num { position:absolute; left:70px; bottom:70px; font-family:'Montserrat'; font-weight:300; font-size:30px; }
  .chev { position:absolute; left:50%; bottom:62px; transform:translateX(-50%); }
  .card { background:#fff; border-radius:24px; padding:70px 64px; box-shadow:0 18px 60px rgba(0,0,0,.10);
          display:flex; flex-direction:column; align-items:flex-start; max-width:880px; }
  .pill { display:inline-block; font-family:'Montserrat'; font-weight:600; font-size:23px; line-height:1.2;
          padding:14px 28px; border-radius:40px; margin-bottom:36px; letter-spacing:.2px; }
  h1 { font-family:'Montserrat'; font-weight:800; line-height:1.12; letter-spacing:-.5px;
       display:flex; align-items:center; gap:22px; }
  .divider { width:520px; height:3px; margin:38px 0; opacity:.85; }
  .underline { width:300px; height:5px; border-radius:3px; margin:30px 0 6px; }
  .body { font-family:'Inter'; line-height:1.5; margin-top:40px; max-width:860px; }
  .bullets { display:flex; flex-wrap:wrap; align-items:center; gap:14px; margin-top:40px;
             font-family:'Inter'; font-weight:600; font-size:25px; color:${GOLD}; }
  .bullets i { color:${GOLD}; font-style:normal; opacity:.7; }
  .glow { position:absolute; left:50%; bottom:120px; transform:translateX(-50%);
          width:520px; height:520px; border-radius:50%;
          background:radial-gradient(circle, rgba(212,160,23,.18) 0%, rgba(212,160,23,0) 68%); }
  .bm { vertical-align:middle; flex:none; }
  .cta { display:inline-flex; align-items:center; gap:14px; font-family:'Montserrat'; font-weight:700;
         font-size:34px; padding:26px 56px; border-radius:14px; margin-top:54px;
         box-shadow:0 10px 30px rgba(37,211,102,.35); }
  .legal { position:absolute; left:90px; right:90px; bottom:84px; background:#f5f5f5; border:2px solid ${GOLD};
           border-radius:14px; padding:26px 30px; font-family:'Inter'; font-weight:400; font-size:23px;
           color:#333; text-align:center; line-height:1.4; }
</style></head>
<body><div class="slide">
  ${topbar}${leftbar}${glow}
  <img class="logo" src="${LOGO}">
  ${cardOpen}
  ${pill}
  <h1 style="font-size:${s.headline.size}px;color:${s.headline.color}">${bookmark}<span>${nl(s.headline.t)}</span></h1>
  ${underline}${divider}
  ${bullets}
  <div class="body" style="font-size:${s.body.size}px;color:${s.body.color};font-weight:${bodyWeight}">${nl(s.body.t)}</div>
  ${cta}
  ${cardClose}
  ${number}${chev}${legal}
</div></body></html>`;
}

const browser = await chromium.launch({ channel: 'chrome' });
const page = await browser.newPage({ viewport: { width: 1080, height: 1350 }, deviceScaleFactor: 2 });

for (const s of slides) {
  const file = `slide-0${s.n}.jpg`;
  writeFileSync(`${BUILD}/slide-0${s.n}.html`, html(s));
  await page.goto('file:///' + process.cwd().replace(/\\/g, '/') + `/${BUILD}/slide-0${s.n}.html`);
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(350);
  await page.screenshot({ path: `${OUT}/${file}`, type: 'jpeg', quality: 92, clip: { x: 0, y: 0, width: 1080, height: 1350 } });
  console.log('  ok', file);
}

await browser.close();
console.log('DONE: 8 slides em', OUT);
