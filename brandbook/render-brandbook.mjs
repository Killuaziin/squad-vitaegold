import { readFileSync, writeFileSync } from 'node:fs';
import { chromium } from 'playwright';

const DIR = 'brandbook';
const OUT = `${DIR}/pages`;
const b64 = (p, m) => `data:${m};base64,` + readFileSync(`${DIR}/assets/${p}`).toString('base64');
const LOGO = b64('logo.png', 'image/png');
const ICON = b64('logo-nova.png', 'image/png'); // arvore sem texto, para chips pequenos
const PRODUTO = b64('produto.png', 'image/png');
const CURCUMA = b64('curcuma.jpg', 'image/jpeg');
const LIFESTYLE = b64('lifestyle.jpg', 'image/jpeg');

// tokens
const GOLD='#d4a017', INK='#1a1a1a', CREAM='#f6f1e6', WHITE='#ffffff',
      GREEN='#33402a', GREENACT='#25d366', SUB='#5b564c', DARK='#17150f', GOLDSOFT='#c79a2e';

const css = (dark)=>`
*{margin:0;padding:0;box-sizing:border-box}
html,body{width:1600px;height:1000px}
.page{width:1600px;height:1000px;position:relative;overflow:hidden;
  font-family:'Inter';color:${dark?'#f3eede':INK};background:${dark?DARK:CREAM}}
.hd{position:absolute;top:54px;left:80px;right:80px;display:flex;justify-content:space-between;align-items:center;
  font-family:'Inter';font-weight:700;font-size:18px;letter-spacing:3px;text-transform:uppercase;color:${dark?'#b9a familiar':GOLDSOFT};color:${dark?'#caa84e':GOLDSOFT}}
.ft{position:absolute;bottom:48px;left:80px;right:80px;display:flex;justify-content:space-between;align-items:center;
  font-family:'Inter';font-weight:600;font-size:15px;letter-spacing:2px;text-transform:uppercase;color:${dark?'#8d8straight':SUB};color:${dark?'#8f8straight':''}}
.ft{color:${dark?'#8f8a78':SUB}}
.body{position:absolute;top:120px;left:80px;right:80px;bottom:110px}
h1{font-family:'Fraunces';font-weight:600;font-size:64px;line-height:1.02;letter-spacing:-1px;color:${dark?'#fff':INK}}
.lead{font-family:'Fraunces';font-weight:500;font-size:34px;line-height:1.3;color:${dark?'#efe9d8':INK};font-style:italic}
.rule{height:4px;width:90px;background:${GOLD};border-radius:2px;margin:24px 0}
.p{font-family:'Inter';font-weight:400;font-size:23px;line-height:1.55;color:${dark?'#d9d2c0':SUB}}
.chip{display:inline-flex;background:#fff;border-radius:16px;padding:14px 20px;box-shadow:0 6px 22px rgba(0,0,0,.12)}
.chip img{height:42px;display:block}
.tag{font-family:'Inter';font-weight:700;font-size:16px;letter-spacing:3px;text-transform:uppercase;color:${GOLDSOFT}}
`;

function frame({label, n, dark, inner}){
  return `<!doctype html><html><head><meta charset="utf-8">
<link href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,500;0,9..144,600;0,9..144,700;1,9..144,500;1,9..144,600&family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">
<style>${css(dark)}</style></head><body><div class="page">
  <div class="hd"><span>${label}</span><span>${n} / 12</span></div>
  <div class="body">${inner}</div>
  <div class="ft"><span>Vitae Gold · Brandbook v1.0</span><span>Guia de Identidade Visual</span></div>
</div></body></html>`;
}

const swatch = (hex,name,note,textDark=true)=>`
  <div style="flex:1">
    <div style="height:150px;border-radius:16px;background:${hex};border:1px solid rgba(0,0,0,.08);box-shadow:0 8px 24px rgba(0,0,0,.08)"></div>
    <div style="margin-top:14px;font-family:'Inter';font-weight:700;font-size:20px;color:${INK}">${name}</div>
    <div style="font-family:'Inter';font-weight:600;font-size:17px;color:${GOLDSOFT};letter-spacing:1px">${hex.toUpperCase()}</div>
    <div style="font-family:'Inter';font-size:15px;color:${SUB};margin-top:4px">${note}</div>
  </div>`;

const pill=(t)=>`<span style="display:inline-block;font-family:'Inter';font-weight:600;font-size:19px;color:#3a2f12;background:linear-gradient(135deg,#edcb6a,#cf9f2c);padding:11px 22px;border-radius:34px">${t}</span>`;

const pillarCard=(t,d)=>`
  <div style="background:#fff;border-radius:20px;padding:34px 30px;box-shadow:0 10px 30px rgba(0,0,0,.06);flex:1">
    <div style="width:46px;height:4px;background:${GOLD};border-radius:2px;margin-bottom:20px"></div>
    <div style="font-family:'Fraunces';font-weight:600;font-size:30px;color:${INK};margin-bottom:12px">${t}</div>
    <div style="font-family:'Inter';font-size:18px;line-height:1.5;color:${SUB}">${d}</div>
  </div>`;

const pages = [];

// 1 — COVER
pages.push({label:'Vitae Gold', n:'01', dark:true, inner:`
  <img src="${LOGO}" style="position:absolute;right:-60px;bottom:-120px;width:760px;opacity:.05">
  <div style="position:absolute;top:0;left:0">
    <div class="chip"><img src="${ICON}"></div>
  </div>
  <div style="position:absolute;top:53%;left:0;transform:translateY(-50%)">
    <div class="tag" style="color:#caa84e">Identidade Visual & Verbal</div>
    <h1 style="font-size:120px;margin-top:18px;color:#fff">Brandbook</h1>
    <div class="rule" style="width:140px;margin:34px 0"></div>
    <div class="lead" style="color:#efe9d8;max-width:780px">Cuidado premium e natural para viver bem — o guia que mantém a marca forte e consistente em cada ponto de contato.</div>
    <div style="font-family:'Inter';font-weight:600;font-size:18px;letter-spacing:2px;color:#8f8a78;margin-top:40px;text-transform:uppercase">Versão 1.0 — Junho 2026</div>
  </div>`});

// 2 — ESSÊNCIA
pages.push({label:'01 — Essência', n:'02', dark:false, inner:`
  <h1>A essência da marca.</h1>
  <div class="rule"></div>
  <div class="lead" style="max-width:1180px;font-size:30px">Vitae Gold não é "mais uma marca de produtos naturais". É uma marca <span style="color:${GOLDSOFT};font-style:italic">premium</span> que fabrica seus próprios produtos, com cuidado e carinho, para entregar um tratamento completo e exclusivo.</div>
  <div style="display:flex;gap:24px;margin-top:54px">
    ${pillarCard('Cuidado','Atenção genuína com quem confia na marca — do processo de fabricação à comunicação.')}
    ${pillarCard('Exclusividade','Produto premium, de maior valor, com experiência diferenciada.')}
    ${pillarCard('Confiança','Fabricação própria, transparência e respaldo regulatório.')}
    ${pillarCard('Natureza','Ativos de origem natural, com respaldo científico.')}
  </div>`});

// 3 — PÚBLICO & POSICIONAMENTO
pages.push({label:'02 — Público & Posicionamento', n:'03', dark:true, inner:`
  <div style="display:flex;gap:70px;height:100%">
    <div style="flex:1">
      <div class="tag" style="color:#caa84e">Para quem falamos</div>
      <h1 style="font-size:54px;margin-top:16px;color:#fff">Público-alvo</h1>
      <div class="rule"></div>
      <div style="display:flex;flex-direction:column;gap:18px;margin-top:10px">
        <div style="font-family:'Inter';font-size:22px;color:#e7e1cf"><b style="color:#caa84e">Quem ·</b> Homens e mulheres</div>
        <div style="font-family:'Inter';font-size:22px;color:#e7e1cf"><b style="color:#caa84e">Idade ·</b> 60+</div>
        <div style="font-family:'Inter';font-size:22px;color:#e7e1cf"><b style="color:#caa84e">Classe ·</b> B / B+</div>
        <div style="font-family:'Inter';font-size:22px;color:#e7e1cf"><b style="color:#caa84e">Região ·</b> São Paulo</div>
        <div style="font-family:'Inter';font-size:22px;color:#e7e1cf;line-height:1.5"><b style="color:#caa84e">Dores ·</b> público maduro, convive com dores no corpo e dificuldade de locomoção</div>
      </div>
      <div style="margin-top:30px;font-family:'Inter';font-size:18px;color:#b3ad9b;line-height:1.55;max-width:520px">Implicação no design: <b style="color:#e7e1cf">legibilidade alta, linguagem clara e respeitosa, imagens dignas</b> — nunca infantilizar.</div>
    </div>
    <div style="flex:1;display:flex;flex-direction:column;justify-content:center">
      <div style="font-family:'Inter';font-weight:700;font-size:16px;letter-spacing:3px;text-transform:uppercase;color:#caa84e;margin-bottom:20px">Posicionamento</div>
      <div class="lead" style="color:#fff;font-size:38px">"Cuidado premium e natural para viver bem — com qualidade e exclusividade que se sente em cada detalhe."</div>
      <div style="margin-top:40px;font-family:'Fraunces';font-style:italic;font-size:24px;color:#caa84e">Vitae Gold — sua fonte de saúde, com o cuidado que você merece.</div>
    </div>
  </div>`});

// 4 — TOM DE VOZ
pages.push({label:'03 — Tom de voz', n:'04', dark:false, inner:`
  <h1>Como a marca fala.</h1>
  <div class="rule"></div>
  <div class="p" style="max-width:1100px;font-size:24px">Um especialista de confiança que respeita o cliente: <b style="color:${INK}">acolhedor, claro e seguro</b> — nunca sensacionalista, nunca condescendente com a idade.</div>
  <div style="display:flex;gap:30px;margin-top:46px">
    <div style="flex:1;background:#fff;border-radius:20px;padding:34px;box-shadow:0 10px 30px rgba(0,0,0,.06)">
      <div style="font-family:'Inter';font-weight:700;color:${GREEN};font-size:22px;margin-bottom:22px">✓ Faça</div>
      ${['"Apoio diário para o seu corpo."','"Qualidade que você sente."','"Cuidar de você é o nosso compromisso."','Frases curtas, verbos no presente.'].map(t=>`<div style="font-family:'Inter';font-size:20px;color:${INK};padding:12px 0;border-bottom:1px solid #eee">${t}</div>`).join('')}
    </div>
    <div style="flex:1;background:#fff;border-radius:20px;padding:34px;box-shadow:0 10px 30px rgba(0,0,0,.06)">
      <div style="font-family:'Inter';font-weight:700;color:#b23b3b;font-size:22px;margin-bottom:22px">✕ Evite</div>
      ${['"Solução milagrosa!"','"Imbatível, o melhor do mercado!"','"Para os vovôs e vovós."','Jargão técnico e promessas de cura.'].map(t=>`<div style="font-family:'Inter';font-size:20px;color:${SUB};padding:12px 0;border-bottom:1px solid #eee">${t}</div>`).join('')}
    </div>
  </div>`});

// 5 — LOGO
pages.push({label:'04 — Logo', n:'05', dark:false, inner:`
  <h1>O logo.</h1>
  <div class="rule"></div>
  <div style="display:flex;gap:40px;margin-top:10px">
    <div style="flex:1.2;background:#fff;border-radius:20px;padding:40px;box-shadow:0 10px 30px rgba(0,0,0,.06);display:flex;align-items:center;justify-content:center">
      <img src="${LOGO}" style="width:380px">
    </div>
    <div style="flex:1;display:flex;flex-direction:column;gap:16px">
      <div style="display:flex;gap:14px">
        <div style="flex:1;background:${DARK};border-radius:16px;padding:22px;display:flex;align-items:center;justify-content:center"><img src="${LOGO}" style="height:48px"></div>
        <div style="flex:1;background:${CREAM};border:1px solid #e6dfcd;border-radius:16px;padding:22px;display:flex;align-items:center;justify-content:center"><img src="${LOGO}" style="height:48px"></div>
      </div>
      <div style="display:flex;gap:14px">
        <div style="flex:1;background:${DARK};border-radius:16px;padding:22px;display:flex;align-items:center;justify-content:center"><img src="${ICON}" style="height:70px"></div>
        <div style="flex:1;background:${CREAM};border:1px solid #e6dfcd;border-radius:16px;padding:22px;display:flex;align-items:center;justify-content:center"><img src="${ICON}" style="height:70px"></div>
      </div>
      <div style="display:flex;gap:14px">
        <div style="flex:1;font-family:'Inter';font-size:14px;color:${SUB};text-align:center">Completo · escuro / claro</div>
        <div style="flex:1;font-family:'Inter';font-size:14px;color:${SUB};text-align:center">Ícone · espaços reduzidos</div>
      </div>
    </div>
  </div>
  <div style="display:flex;gap:40px;margin-top:30px">
    <div class="p" style="flex:1;font-size:19px"><b style="color:${INK}">Área de proteção:</b> espaço livre = altura da letra "V" ao redor do logo.</div>
    <div class="p" style="flex:1;font-size:19px"><b style="color:${INK}">Tamanho mínimo:</b> 120 px (completo) · 40 px (ícone) · 25 mm impresso.</div>
    <div class="p" style="flex:1;font-size:19px"><b style="color:#b23b3b">Nunca:</b> distorcer, recolorir, rotacionar, contornar ou recriar com outra fonte.</div>
  </div>`});

// 6 — CORES
pages.push({label:'05 — Cores', n:'06', dark:false, inner:`
  <h1>Paleta de cores.</h1>
  <div class="rule"></div>
  <div class="tag" style="margin-bottom:18px">Primárias</div>
  <div style="display:flex;gap:24px">
    ${swatch(GOLD,'Dourado Vitae','Cor-assinatura · acentos')}
    ${swatch(INK,'Preto Premium','Tipografia · fundos')}
    ${swatch(CREAM,'Pergaminho','Fundo claro padrão')}
    ${swatch(WHITE,'Branco','Respiro · chips')}
  </div>
  <div class="tag" style="margin:34px 0 18px">Secundárias / apoio</div>
  <div style="display:flex;gap:24px;align-items:flex-start">
    ${swatch(GREEN,'Verde Raiz','Território natural')}
    ${swatch(SUB,'Cinza Texto','Texto de apoio')}
    ${swatch(GREENACT,'Verde Ação','Exclusivo p/ CTA')}
    <div style="flex:1">
      <div style="height:150px;border-radius:16px;overflow:hidden;display:flex;box-shadow:0 8px 24px rgba(0,0,0,.08)">
        <div style="flex:6;background:${CREAM}"></div><div style="flex:3;background:${GOLD}"></div><div style="flex:1;background:${GREEN}"></div>
      </div>
      <div style="margin-top:14px;font-family:'Inter';font-weight:700;font-size:20px;color:${INK}">Proporção</div>
      <div style="font-family:'Inter';font-size:15px;color:${SUB};margin-top:4px">60% neutro · 30% dourado · 10% apoio</div>
    </div>
  </div>`});

// 7 — TIPOGRAFIA
pages.push({label:'06 — Tipografia', n:'07', dark:false, inner:`
  <h1>Tipografia.</h1>
  <div class="rule"></div>
  <div style="display:flex;gap:40px;margin-top:6px">
    <div style="flex:1;background:#fff;border-radius:20px;padding:38px;box-shadow:0 10px 30px rgba(0,0,0,.06)">
      <div style="font-family:'Fraunces';font-weight:600;font-size:130px;line-height:1;color:${INK}">Aa</div>
      <div style="font-family:'Inter';font-weight:700;font-size:24px;color:${GOLDSOFT};margin-top:12px">Fraunces</div>
      <div class="p" style="font-size:18px;margin-top:8px">Display · serifada editorial. Títulos, frases de impacto, numerais. Pesos 500–700 + itálico.</div>
      <div style="font-family:'Fraunces';font-size:30px;color:${INK};margin-top:18px">Cuidado <span style="font-style:italic;color:${GOLDSOFT}">premium</span> e natural</div>
    </div>
    <div style="flex:1;background:#fff;border-radius:20px;padding:38px;box-shadow:0 10px 30px rgba(0,0,0,.06)">
      <div style="font-family:'Inter';font-weight:700;font-size:130px;line-height:1;color:${INK}">Aa</div>
      <div style="font-family:'Inter';font-weight:700;font-size:24px;color:${GOLDSOFT};margin-top:12px">Inter</div>
      <div class="p" style="font-size:18px;margin-top:8px">Texto/interface · legibilidade altíssima (essencial 60+). Corpo, rótulos, botões. Pesos 400–700.</div>
      <div style="font-family:'Inter';font-size:21px;color:${SUB};margin-top:18px;line-height:1.5">O cálcio auxilia na formação e manutenção de ossos e dentes.</div>
    </div>
  </div>
  <div style="display:flex;gap:30px;margin-top:26px;font-family:'Inter';font-size:18px;color:${SUB}">
    <div><b style="color:${INK}">Display</b> 56–72px</div><div><b style="color:${INK}">Título</b> 40–48px</div><div><b style="color:${INK}">Subtítulo</b> 28–32px</div><div><b style="color:${INK}">Corpo</b> 24–29px</div><div><b style="color:${INK}">Caption</b> 18–22px</div>
    <div style="color:${GOLDSOFT};font-weight:700">Regra 60+: corpo nunca &lt; 24px</div>
  </div>`});

// 8 — GRAFISMOS
pages.push({label:'07 — Grafismos', n:'08', dark:false, inner:`
  <h1>Elementos gráficos.</h1>
  <div class="rule"></div>
  <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:24px;margin-top:6px">
    <div style="background:#fff;border-radius:18px;padding:30px;box-shadow:0 8px 24px rgba(0,0,0,.06)">
      <div style="height:4px;width:90px;background:${GOLD};border-radius:2px"></div>
      <div style="font-family:'Inter';font-weight:700;font-size:20px;margin-top:18px;color:${INK}">Fio dourado</div>
      <div class="p" style="font-size:16px">Separa título de texto.</div>
    </div>
    <div style="background:#fff;border-radius:18px;padding:30px;box-shadow:0 8px 24px rgba(0,0,0,.06);position:relative;overflow:hidden">
      <div style="position:absolute;right:10px;top:-30px;font-family:'Fraunces';font-weight:600;font-size:160px;color:${GOLD};opacity:.12">04</div>
      <div style="font-family:'Inter';font-weight:700;font-size:20px;margin-top:90px;color:${INK};position:relative">Numeral editorial</div>
      <div class="p" style="font-size:16px;position:relative">Indexa e preenche com propósito.</div>
    </div>
    <div style="background:#fff;border-radius:18px;padding:30px;box-shadow:0 8px 24px rgba(0,0,0,.06)">
      ${pill('Extrato de Cúrcuma')}
      <div style="font-family:'Inter';font-weight:700;font-size:20px;margin-top:18px;color:${INK}">Pill / tag</div>
      <div class="p" style="font-size:16px">Nomeia ingredientes e temas.</div>
    </div>
    <div style="background:#fff;border-radius:18px;padding:30px;box-shadow:0 8px 24px rgba(0,0,0,.06)">
      <div class="chip" style="box-shadow:0 6px 18px rgba(0,0,0,.12)"><img src="${ICON}" style="height:38px"></div>
      <div style="font-family:'Inter';font-weight:700;font-size:20px;margin-top:18px;color:${INK}">Chip do logo</div>
      <div class="p" style="font-size:16px">Logo legível sobre fotos.</div>
    </div>
    <div style="background:#fff;border-radius:18px;padding:30px;box-shadow:0 8px 24px rgba(0,0,0,.06)">
      <div style="display:flex;gap:8px;align-items:center">${[0,1,2,3,4].map(i=>`<span style="width:${i===1?'26px':'10px'};height:10px;border-radius:6px;background:${i===1?GOLD:'#ddd'}"></span>`).join('')}</div>
      <div style="font-family:'Inter';font-weight:700;font-size:20px;margin-top:18px;color:${INK}">Indicador de progresso</div>
      <div class="p" style="font-size:16px">Avanço no carrossel.</div>
    </div>
    <div style="background:#fff;border-radius:18px;padding:30px;box-shadow:0 8px 24px rgba(0,0,0,.06)">
      <div style="display:inline-flex;align-items:center;gap:12px;font-family:'Inter';font-weight:700;color:${SUB};font-size:18px">ARRASTE
        <svg width="46" height="20" viewBox="0 0 46 20"><path d="M2 10 H38 M30 3 L40 10 L30 17" stroke="${GOLD}" stroke-width="3.5" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg></div>
      <div style="font-family:'Inter';font-weight:700;font-size:20px;margin-top:18px;color:${INK}">Seta de avanço</div>
      <div class="p" style="font-size:16px">Sempre horizontal, à direita.</div>
    </div>
  </div>`});

// 9 — FOTOGRAFIA
pages.push({label:'08 — Fotografia', n:'09', dark:false, inner:`
  <h1>Direção de fotografia.</h1>
  <div class="rule"></div>
  <div style="display:flex;gap:24px;margin-top:6px">
    ${[[PRODUTO,'Produto','Frasco sobre neutro, luz suave, protagonismo do produto.','contain','#fff'],
       [CURCUMA,'Ingrediente','Matéria-prima natural, luz quente, foco macro.','cover',''],
       [LIFESTYLE,'Estilo de vida','Ativo e sereno em ambiente natural — luz suave e tons quentes (usar modelo 60+ real em produção).','cover','']]
      .map(([img,t,d,fit,bg])=>`
      <div style="flex:1">
        <div style="height:380px;border-radius:18px;overflow:hidden;background:${bg||'#eee'};box-shadow:0 10px 30px rgba(0,0,0,.08);display:flex;align-items:center;justify-content:center">
          <img src="${img}" style="${fit==='cover'?'width:100%;height:100%;object-fit:cover':'height:340px;object-fit:contain'}">
        </div>
        <div style="font-family:'Inter';font-weight:700;font-size:21px;color:${INK};margin-top:16px">${t}</div>
        <div class="p" style="font-size:17px;margin-top:4px">${d}</div>
      </div>`).join('')}
  </div>
  <div style="margin-top:30px;background:#fbeaea;border-left:5px solid #b23b3b;border-radius:10px;padding:20px 26px;font-family:'Inter';font-size:18px;color:#7a2e2e">
    <b>Evite:</b> "antes e depois", contexto clínico, gesto de dor focado, clichê de "idoso frágil", bancos de imagem frios.</div>`});

// 10 — LAYOUTS
const frameMock=(ratioW,ratioH,label,inner)=>`
  <div style="display:flex;flex-direction:column;align-items:center;gap:14px">
    <div style="width:${ratioW}px;height:${ratioH}px;background:#fff;border-radius:14px;box-shadow:0 12px 34px rgba(0,0,0,.12);overflow:hidden;position:relative">${inner}</div>
    <div style="font-family:'Inter';font-weight:600;font-size:16px;color:${SUB}">${label}</div>
  </div>`;
const mockChrome=`<div style="position:absolute;top:14px;left:14px;width:42px;height:18px;background:#fff;border-radius:6px;box-shadow:0 2px 8px rgba(0,0,0,.15);border:1px solid #eee"></div>`;
pages.push({label:'09 — Layouts por canal', n:'10', dark:true, inner:`
  <h1 style="color:#fff">Layouts por canal.</h1>
  <div class="rule"></div>
  <div class="p" style="color:#cfc8b6;max-width:1100px;font-size:21px">Estrutura comum: chip do logo no topo · título Fraunces → fio dourado → corpo Inter · rodapé com numeração. Margens generosas.</div>
  <div style="display:flex;gap:40px;align-items:flex-end;margin-top:40px;justify-content:center">
    ${frameMock(230,288,'Carrossel · 4:5', `${mockChrome}
      <div style="position:absolute;top:54px;left:18px;right:18px"><div style="height:4px;width:40px;background:${GOLD};border-radius:2px"></div>
      <div style="font-family:'Fraunces';font-weight:600;font-size:26px;color:${INK};margin-top:12px;line-height:1.05">4 nutrientes. 1 cápsula.</div>
      <div style="height:8px;width:80px;background:#eee;border-radius:4px;margin-top:14px"></div><div style="height:8px;width:120px;background:#eee;border-radius:4px;margin-top:8px"></div></div>
      <div style="position:absolute;bottom:16px;left:18px;font-family:'Inter';font-weight:700;font-size:12px;color:${GOLDSOFT}">01 / 08 →</div>`)}
    ${frameMock(180,320,'Story · 9:16', `${mockChrome}
      <div style="position:absolute;top:90px;left:18px;right:18px"><div style="font-family:'Fraunces';font-weight:600;font-size:26px;color:${INK};line-height:1.05">Cuidado que você sente.</div></div>
      <div style="position:absolute;bottom:50px;left:18px;right:18px;height:42px;background:${GREENACT};border-radius:10px"></div>`)}
    ${frameMock(380,214,'Outdoor · 16:9', `
      <div style="position:absolute;inset:0;background:${DARK}"></div>
      <div style="position:absolute;top:24px;left:24px" class="chip"><img src="${ICON}" style="height:30px"></div>
      <div style="position:absolute;top:50%;left:24px;transform:translateY(-50%);font-family:'Fraunces';font-weight:600;font-size:34px;color:#fff;line-height:1.05;max-width:200px">Sua fonte de saúde.</div>
      <img src="${PRODUTO}" style="position:absolute;right:18px;bottom:-10px;height:200px">`)}
  </div>
  <div class="p" style="color:#a9a punkt;color:#a9a392;font-size:17px;margin-top:36px;text-align:center">Mídia digital (anúncios): produto + benefício claro + CTA, em 1:1, 4:5 e 9:16 · Outdoor: uma mensagem lida em 3 segundos, alto contraste.</div>`});

// 11 — ACESSIBILIDADE & COMPLIANCE
pages.push({label:'10 — Acessibilidade & Compliance', n:'11', dark:false, inner:`
  <h1>Acessibilidade & Compliance.</h1>
  <div class="rule"></div>
  <div style="display:flex;gap:40px;margin-top:6px">
    <div style="flex:1">
      <div class="tag" style="margin-bottom:18px">Leitura para o público 60+</div>
      ${['Contraste mínimo 4.5:1 (texto normal) e 3:1 (texto grande).','Corpo nunca abaixo de 24px em social; 12pt em impresso.','Não depender só de cor para informar.','Máx. ~60 caracteres por linha.','Hierarquia clara: o olho sabe onde ir primeiro.'].map(t=>`<div style="display:flex;gap:12px;align-items:flex-start;margin-bottom:14px"><span style="color:${GOLD};font-weight:800;font-size:20px">✓</span><span style="font-family:'Inter';font-size:19px;color:${SUB};line-height:1.45">${t}</span></div>`).join('')}
    </div>
    <div style="flex:1">
      <div class="tag" style="margin-bottom:18px">Compliance ANVISA</div>
      <div class="p" style="font-size:19px">Suplemento <b style="color:${INK}">não é medicamento</b>. Proibido prometer cura, tratamento, prevenção, emagrecimento ou resultado estético. Usar apenas alegações funcionais autorizadas.</div>
      <div style="margin-top:22px;background:${CREAM};border:2px solid ${GOLD};border-radius:14px;padding:22px 24px;font-family:'Inter';font-size:18px;color:#4a4538;line-height:1.45">
        <b>Aviso obrigatório em peças de produto:</b><br>"Este produto não é um medicamento. Consulte um nutricionista."</div>
    </div>
  </div>`});

// 12 — FECHAMENTO
pages.push({label:'Vitae Gold', n:'12', dark:true, inner:`
  <img src="${LOGO}" style="position:absolute;left:-80px;top:-100px;width:680px;opacity:.05">
  <div style="position:absolute;top:50%;left:0;transform:translateY(-50%)">
    <div class="chip"><img src="${ICON}" style="height:54px"></div>
    <div class="lead" style="color:#fff;font-size:44px;max-width:900px;margin-top:40px">Sua fonte de saúde, com o cuidado que você merece.</div>
    <div class="rule" style="margin-top:34px"></div>
    <div style="font-family:'Inter';font-weight:600;font-size:18px;letter-spacing:2px;color:#8f8a78;text-transform:uppercase;margin-top:14px">Brandbook v1.0 · uso interno e de parceiros</div>
  </div>`});

// render
const browser = await chromium.launch({ channel:'chrome' });
const page = await browser.newPage({ viewport:{width:1600,height:1000}, deviceScaleFactor:1.6 });
let i=0;
for(const p of pages){
  i++;
  const file = `page-${String(i).padStart(2,'0')}.jpg`;
  writeFileSync(`${DIR}/_p${i}.html`, frame(p));
  await page.goto('file:///' + process.cwd().replace(/\\/g,'/') + `/${DIR}/_p${i}.html`);
  await page.evaluate(()=>document.fonts.ready);
  await page.waitForTimeout(400);
  await page.screenshot({ path:`${OUT}/${file}`, type:'jpeg', quality:92, clip:{x:0,y:0,width:1600,height:1000} });
  console.log('  ok', file);
}
await browser.close();
console.log('DONE brandbook deck:', pages.length, 'paginas');
