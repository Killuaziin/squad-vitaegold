import { readFileSync, writeFileSync } from 'node:fs';
import { chromium } from 'playwright';

const BUILD = 'squads/carrossel-vitaegold/output/_build';
const A = `${BUILD}/assets`;
const OUT = 'squads/carrossel-vitaegold/output/images';

const b64 = (p, mime) => `data:${mime};base64,` + readFileSync(p).toString('base64');
const LOGO = b64(`${A}/logo-nova.png`, 'image/png'); // icone (arvore) para chips pequenos
const PRODUTO = b64(`${A}/curcuma-white-sem.png`, 'image/png');
const CURCUMA = b64(`${A}/curcuma.jpg`, 'image/jpeg');
const LIFESTYLE = b64(`${A}/contexto.jpg`, 'image/jpeg'); // casal 60+
const MUSCULO = b64(`${A}/ativo.jpg`, 'image/jpeg');       // senhora ativa
const COLAGENO = b64(`${A}/colageno.jpg`, 'image/jpeg');   // mobilidade (yoga mat)
const CALCIO = b64(`${A}/calcio.jpg`, 'image/jpeg');       // copo de leite
const CTAFOTO = b64(`${A}/cta.jpg`, 'image/jpeg');         // casal senior em casa

const GOLD = '#c79a2e';
const GOLDD = '#9c7415';
const INK = '#211f1a';
const SUB = '#5b564c';
const CREAM = '#f6f1e6';

// seta para a DIREITA (carrossel = swipe horizontal)
const swipe = (c = GOLD) => `<svg width="46" height="20" viewBox="0 0 46 20"><path d="M2 10 H38 M30 3 L40 10 L30 17" stroke="${c}" stroke-width="3.5" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>`;

function esc(s){return s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');}
function nl(s){return esc(s).replace(/\n/g,'<br>');}

// progress dots
function dots(active){
  let d='';
  for(let i=1;i<=8;i++) d+=`<span class="dot${i===active?' on':''}"></span>`;
  return `<div class="dots">${d}</div>`;
}

const slides = [
  { // 1 HERO
    n:1, mode:'product', bg:CREAM, hero:true,
    headline:'4 nutrientes.\n1 cápsula.', accent:'Veja o que cada um faz.',
    body:'Cúrcuma, colágeno tipo II, magnésio e cálcio — saiba por que eles estão juntos no CúrcumaWhite.',
    product:PRODUTO,
  },
  { // 2 CONTEXTO
    n:2, mode:'photo', bg:CREAM, photo:LIFESTYLE, photoPos:'center 30%',
    headline:'O dia a dia cobra um preço do seu corpo.',
    body:'Rotina intensa, alimentação corrida. Complementar a dieta com os nutrientes certos é uma escolha inteligente — não um luxo.',
  },
  { // 3 COLÁGENO (photo)
    n:3, mode:'photo', bg:CREAM, photo:COLAGENO, photoPos:'center 30%',
    pill:'Colágeno Tipo II Não Desnaturado',
    headline:'Suas articulações precisam de atenção contínua.',
    body:'O colágeno tipo II não desnaturado auxilia na manutenção da função articular — um apoio diário para quem não quer sentir o tempo passar nas juntas.',
  },
  { // 4 CÚRCUMA (photo)
    n:4, mode:'photo', bg:CREAM, photo:CURCUMA, photoPos:'center 55%',
    pill:'Extrato de Cúrcuma (Curcuma longa)',
    headline:'A cúrcuma tem alegação funcional reconhecida no Brasil.',
    body:'O extrato de cúrcuma possui ação antioxidante — contribuindo para o equilíbrio do organismo frente ao estresse oxidativo do cotidiano.',
  },
  { // 5 MAGNÉSIO (photo)
    n:5, mode:'photo', bg:CREAM, photo:MUSCULO, photoPos:'center 28%',
    pill:'Magnésio',
    headline:'Músculos em dia, rendimento de verdade.',
    body:'O magnésio auxilia no funcionamento muscular e neuromuscular — um mineral essencial que muitas pessoas não ingerem em quantidade suficiente só pela alimentação.',
  },
  { // 6 CÁLCIO (photo)
    n:6, mode:'photo', bg:CREAM, photo:CALCIO, photoPos:'center 45%',
    pill:'Cálcio',
    headline:'Ossos fortes são construídos todos os dias.',
    body:'O cálcio auxilia na formação e manutenção de ossos e dentes — e manter o aporte adequado desse mineral é um compromisso de longo prazo com a sua saúde.',
  },
  { // 7 PRODUTO
    n:7, mode:'product', bg:'#17150f', dark:true,
    headline:'CúrcumaWhite:\nos 4 bioativos em uma fórmula prática.',
    bullets:['Colágeno Tipo II','Cúrcuma','Magnésio','Cálcio'],
    body:'Um complemento alimentar desenvolvido para quem cuida do corpo com consistência.',
    product:PRODUTO,
  },
  { // 8 CTA (photo)
    n:8, mode:'cta', bg:CREAM, photo:CTAFOTO, photoPos:'center 30%',
    headline:'Salve este post e conheça o CúrcumaWhite.',
    body:'Acesse o link na bio para saber mais sobre a fórmula completa.',
    cta:'Link na bio',
    legal:'Este produto não é um medicamento. Consulte um nutricionista.',
  },
];

function logoChip(){
  return `<div class="chip"><img src="${LOGO}"></div>`;
}

function render(s){
  const dark = s.dark;
  const ink = dark ? '#ffffff' : INK;
  const sub = dark ? '#d9d2c4' : SUB;
  const pill = s.pill ? `<div class="pill">${esc(s.pill)}</div>` : '';
  const tag = s.tag ? `<div class="tag">${esc(s.tag)}</div>` : '';
  const bullets = s.bullets ? `<div class="bul">${s.bullets.map(x=>`<span>${esc(x)}</span>`).join('')}</div>` : '';

  let stage = '';

  if(s.mode==='photo'){
    stage = `
      <div class="photoband" style="background-image:url('${s.photo}');background-position:${s.photoPos}"></div>
      <div class="photoscrim"></div>
      <div class="sheet">
        <div class="row top"><div class="rule"></div>${dots(s.n)}</div>
        ${pill}
        <h1>${nl(s.headline)}</h1>
        <p class="body">${nl(s.body)}</p>
        <div class="foot"><span class="num">0${s.n} / 08</span><span class="sw">arraste ${swipe()}</span></div>
      </div>
      <div class="chip onphoto"><img src="${LOGO}"></div>`;
  }
  else if(s.mode==='clean'){
    const bignum = s.big ? `<div class="bignum">${s.big}</div>` : '';
    stage = `
      <div class="pad">
        ${bignum}
        <div class="row top">${logoChip()}${dots(s.n)}</div>
        <div class="center">
          ${tag}
          ${pill}
          <h1>${nl(s.headline)}</h1>
          <div class="gline"></div>
          <p class="body">${nl(s.body)}</p>
        </div>
        <div class="foot"><span class="num">0${s.n} / 08</span><span class="sw">arraste ${swipe()}</span></div>
      </div>`;
  }
  else if(s.mode==='product'){
    const heroExtra = s.hero ? `<p class="body">${nl(s.body)}</p>` : `${bullets}<p class="body">${nl(s.body)}</p>`;
    const accent = s.accent ? `<span class="accent">${esc(s.accent)}</span>` : '';
    stage = `
      <div class="pad ${dark?'':'oncream'}">
        <div class="row top">${logoChip()}${dots(s.n)}</div>
        <div class="prodwrap">
          <div class="prodtext">
            <h1>${nl(s.headline)} ${accent}</h1>
            ${heroExtra}
          </div>
          <img class="bottle" src="${s.product}">
        </div>
        <div class="foot"><span class="num">0${s.n} / 08</span>${s.hero?`<span class="sw">arraste ${swipe()}</span>`:`<span class="sw">arraste ${swipe()}</span>`}</div>
      </div>`;
  }
  else if(s.mode==='cta'){
    stage = `
      <div class="photoband" style="background-image:url('${s.photo}');background-position:${s.photoPos}"></div>
      <div class="photoscrim"></div>
      <div class="sheet" style="padding:50px 80px 60px">
        <div class="row top"><div class="rule"></div>${dots(s.n)}</div>
        <h1 style="font-size:48px;margin-top:6px">${nl(s.headline)}</h1>
        <p class="body" style="margin-top:16px">${nl(s.body)}</p>
        <div class="cta" style="margin-top:28px"><svg width="26" height="26" viewBox="0 0 24 24"><path d="M12 19 V6 M6 12 L12 6 L18 12" stroke="#fff" stroke-width="3" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>${esc(s.cta)}</div>
        <div class="legal-inline">${esc(s.legal)}</div>
      </div>
      <div class="chip onphoto"><img src="${LOGO}"></div>`;
  }

  return `<!doctype html><html><head><meta charset="utf-8">
<link href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,600;9..144,700&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
<style>
*{margin:0;padding:0;box-sizing:border-box}
html,body{width:1080px;height:1350px}
.stage{width:1080px;height:1350px;background:${s.bg};position:relative;overflow:hidden;color:${ink}}
.chip{background:#fff;border-radius:18px;padding:14px 20px;box-shadow:0 6px 22px rgba(0,0,0,.10);display:inline-flex}
.chip img{height:46px;display:block}
.chip.onphoto{position:absolute;top:54px;left:70px;z-index:5}
.row{display:flex;align-items:center;justify-content:space-between}
.row.top{width:100%}
.dots{display:flex;gap:9px}
.dot{width:9px;height:9px;border-radius:50%;background:rgba(0,0,0,.16)}
.dot.on{background:${GOLD};width:26px;border-radius:6px}
${s.dark?'.dot{background:rgba(255,255,255,.22)}':''}
.rule{height:3px;width:120px;background:${GOLD};border-radius:2px}
.photoband{position:absolute;top:0;left:0;width:1080px;height:660px;background-size:cover;background-repeat:no-repeat}
.photoscrim{position:absolute;top:0;left:0;width:1080px;height:660px;pointer-events:none;
  background:linear-gradient(180deg, rgba(35,25,8,.18) 0%, rgba(35,25,8,0) 30%, rgba(35,25,8,0) 66%, rgba(20,14,4,.24) 100%), rgba(212,160,23,.06)}
.sheet{position:absolute;left:0;bottom:0;width:1080px;height:760px;background:${s.bg};border-radius:46px 46px 0 0;
       padding:54px 80px 70px;display:flex;flex-direction:column;box-shadow:0 -18px 44px rgba(0,0,0,.12)}
.pad{position:absolute;inset:0;padding:64px 80px 72px;display:flex;flex-direction:column}
.center{flex:1;display:flex;flex-direction:column;justify-content:center;position:relative;z-index:2}
.bignum{position:absolute;top:120px;right:46px;font-family:'Fraunces';font-weight:600;font-size:400px;line-height:.8;
        color:${GOLD};opacity:.07;z-index:1;pointer-events:none}
.tag{font-family:'Inter';font-weight:700;font-size:20px;letter-spacing:3px;text-transform:uppercase;color:${GOLD};margin-bottom:26px}
.pill{align-self:flex-start;font-family:'Inter';font-weight:600;font-size:22px;color:#3a2f12;
      background:linear-gradient(135deg,#edcb6a,#cf9f2c);
      padding:13px 26px;border-radius:40px;margin:18px 0 30px}
h1{font-family:'Fraunces';font-weight:600;line-height:1.07;letter-spacing:-.5px;font-size:64px}
.sheet h1{font-size:56px}
.body{font-family:'Inter';font-weight:400;font-size:29px;line-height:1.52;color:${sub};margin-top:30px;max-width:880px}
.gline{width:90px;height:5px;background:${GOLD};border-radius:3px;margin:34px 0 2px}
.accent{font-family:'Fraunces';font-style:italic;font-weight:500;color:${GOLD};display:inline}
.foot{display:flex;align-items:center;justify-content:space-between;margin-top:auto}
.num{font-family:'Inter';font-weight:600;font-size:22px;color:${dark?'#bda969':GOLDD};letter-spacing:1px}
.sw{font-family:'Inter';font-weight:500;font-size:20px;color:${sub};display:inline-flex;align-items:center;gap:10px;text-transform:uppercase;letter-spacing:1px}
.prodwrap{flex:1;display:flex;align-items:center;gap:20px}
.prodtext{flex:1}
.bottle{height:760px;width:auto;object-fit:contain;filter:drop-shadow(0 30px 50px rgba(0,0,0,.35));margin-right:-20px}
.bul{display:flex;flex-wrap:wrap;gap:12px;margin-top:30px}
.bul span{font-family:'Inter';font-weight:600;font-size:22px;color:${dark?'#1a1a1a':'#3a2f12'};background:${GOLD};padding:9px 18px;border-radius:30px}
.bm{margin-bottom:18px}
.cta{align-self:flex-start;display:inline-flex;align-items:center;gap:14px;font-family:'Inter';font-weight:700;font-size:32px;color:#fff;
     background:#25d366;padding:24px 52px;border-radius:16px;margin-top:46px;box-shadow:0 14px 34px rgba(37,211,102,.34)}
.legal{position:absolute;left:80px;right:80px;bottom:70px;background:rgba(255,255,255,.7);border:2px solid ${GOLD};
       border-radius:14px;padding:24px;font-family:'Inter';font-size:22px;color:#4a4538;text-align:center;line-height:1.4}
.legal-inline{margin-top:34px;background:#fff;border:2px solid ${GOLD};border-radius:14px;
       padding:22px 26px;font-family:'Inter';font-size:21px;color:#4a4538;text-align:center;line-height:1.4}
</style></head><body><div class="stage">${stage}</div></body></html>`;
}

const browser = await chromium.launch({ channel:'chrome' });
const page = await browser.newPage({ viewport:{width:1080,height:1350}, deviceScaleFactor:2 });
for(const s of slides){
  writeFileSync(`${BUILD}/v2-slide-0${s.n}.html`, render(s));
  await page.goto('file:///' + process.cwd().replace(/\\/g,'/') + `/${BUILD}/v2-slide-0${s.n}.html`);
  await page.evaluate(()=>document.fonts.ready);
  await page.waitForTimeout(400);
  await page.screenshot({ path:`${OUT}/slide-0${s.n}.jpg`, type:'jpeg', quality:92, clip:{x:0,y:0,width:1080,height:1350} });
  console.log('  ok slide-0'+s.n+'.jpg');
}
await browser.close();
console.log('DONE v2');
