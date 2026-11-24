// Post "normal" (sem Black Friday): foto da Lucinha Lins com o Cúrcuma White PRO+ (foto enviada pelo cliente).
// Uso (da raiz do projeto): node squads/carrossel-vitaegold/output/_build/especiais/lucinha-curcuma-pro/render.mjs
// Gera queue/posts/lucinha-curcuma-pro/slide-01.jpg em 1440x1800 (4:5). Usa os assets da arte de Black Friday.
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { pathToFileURL } from 'node:url';
import { resolve } from 'node:path';
import { chromium } from 'playwright';

const ASSETS = 'squads/carrossel-vitaegold/output/_build/especiais/bf-lucinha-curcuma-pro/assets';
const DIR = 'squads/carrossel-vitaegold/output/_build/especiais/lucinha-curcuma-pro';
const OUT = 'queue/posts/lucinha-curcuma-pro';
mkdirSync(OUT, { recursive: true });
const b64 = (f, m) => `data:${m};base64,` + readFileSync(`${ASSETS}/${f}`).toString('base64');

const AVISO = 'Suplemento alimentar em cápsulas. Este produto não é um medicamento. Não deve ser consumido por gestantes, lactantes, crianças, pessoas com doenças hepáticas, biliares ou com úlceras gástricas. Indicado para maiores de 19 anos. Mantenha fora do alcance de crianças. Não exceder a recomendação diária indicada na embalagem.';
const WA = `<svg width="34" height="34" viewBox="0 0 32 32" fill="#fff"><path d="M16 3C9.4 3 4 8.4 4 15c0 2.1.6 4.1 1.6 5.9L4 29l8.3-1.6c1.7.9 3.6 1.4 5.7 1.4 6.6 0 12-5.4 12-12S22.6 3 16 3zm0 21.8c-1.8 0-3.5-.5-5-1.4l-.4-.2-4.9 1 1-4.8-.3-.4c-1-1.6-1.5-3.4-1.5-5.3C4.9 9.5 9.9 4.9 16 4.9c5.6 0 10.1 4.5 10.1 10.1S21.6 24.8 16 24.8zm5.8-7.6c-.3-.2-1.9-.9-2.1-1-.3-.1-.5-.2-.7.2-.2.3-.8 1-1 1.2-.2.2-.4.2-.7.1-.3-.2-1.3-.5-2.5-1.5-.9-.8-1.5-1.8-1.7-2.1-.2-.3 0-.5.1-.6l.5-.6c.2-.2.2-.3.3-.5.1-.2 0-.4 0-.5l-1-2.3c-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.5s1.1 2.9 1.2 3.1c.2.2 2.1 3.2 5.1 4.5.7.3 1.3.5 1.7.6.7.2 1.4.2 1.9.1.6-.1 1.9-.8 2.1-1.5.3-.7.3-1.4.2-1.5-.1-.2-.3-.3-.6-.4z"/></svg>`;

const html = `<!doctype html><html><head><meta charset="utf-8">
<link href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,ital,wght@9..144,0,600;9..144,0,700;9..144,1,500&family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">
<style>
*{margin:0;padding:0;box-sizing:border-box}html,body{width:1080px;height:1350px}
.stage{width:1080px;height:1350px;background:#F6F1E6;position:relative;overflow:hidden;color:#211f1a;font-family:Inter}
.photo{position:absolute;top:0;left:0;width:1080px;height:780px;background:url('${b64('foto.png', 'image/png')}') 42% 30%/cover no-repeat}
.fade{position:absolute;top:0;left:0;width:1080px;height:790px;background:linear-gradient(180deg,rgba(246,241,230,0) 0%,rgba(246,241,230,0) 62%,rgba(246,241,230,.8) 85%,#F6F1E6 100%)}
.chip{position:absolute;top:50px;left:60px;background:#fff;border-radius:18px;padding:14px 20px;box-shadow:0 6px 22px rgba(0,0,0,.18);z-index:5}.chip img{height:46px;display:block}
.credit{position:absolute;top:712px;left:80px;font-family:Fraunces;font-style:italic;font-weight:500;font-size:26px;color:#5b564c;z-index:4}
.content{position:absolute;top:772px;left:80px;right:80px;bottom:56px;display:flex;flex-direction:column}
.rule{height:4px;width:120px;background:#D4A017;border-radius:2px}
.tag{font-weight:700;font-size:22px;letter-spacing:5px;text-transform:uppercase;color:#9c7415;margin-top:24px}
h1{font-family:Fraunces;font-weight:700;font-size:86px;line-height:1.02;letter-spacing:-1px;margin-top:14px}
h1 b{color:#c79a2e;font-weight:700}
.sub{font-size:30px;line-height:1.42;color:#5b564c;margin-top:18px;max-width:900px}
.cta{display:flex;align-items:center;gap:26px;margin-top:30px}
.btn{display:inline-flex;align-items:center;gap:14px;background:#1faf54;color:#fff;font-weight:700;font-size:30px;padding:20px 36px;border-radius:50px;box-shadow:0 12px 26px rgba(31,175,84,.28)}
.phone{font-size:24px;line-height:1.4;color:#5b564c}.phone b{color:#211f1a;font-weight:600}
.aviso{font-size:15px;line-height:1.45;color:#8a8478;margin-top:auto;border-top:1px solid rgba(0,0,0,.1);padding-top:16px}
</style></head><body><div class="stage">
<div class="photo"></div><div class="fade"></div>
<div class="chip"><img src="${b64('logo-nova.png', 'image/png')}"></div>
<div class="credit">Lucinha Lins, parceira Vitae Gold</div>
<div class="content">
  <div class="rule"></div>
  <div class="tag">Novidade Vitae Gold</div>
  <h1>Cúrcuma White <b>PRO+</b></h1>
  <p class="sub">Cúrcuma, colágeno tipo II, magnésio, vitamina C, MSM e glutamina em uma só fórmula.</p>
  <div class="cta"><div class="btn">${WA} Pedir no WhatsApp</div><div class="phone">ou ligue <b>0800 888 0032</b><br>condições especiais em kits</div></div>
  <div class="aviso">${AVISO}</div>
</div></div></body></html>`;

const tmp = `${DIR}/_arte.html`;
mkdirSync(DIR, { recursive: true });
writeFileSync(tmp, html);
const browser = await chromium.launch({ channel: 'chrome' });
const page = await browser.newPage({ viewport: { width: 1080, height: 1350 }, deviceScaleFactor: 4 / 3 });
await page.goto(pathToFileURL(resolve(tmp)).href);
await page.evaluate(() => document.fonts.ready); await page.waitForTimeout(500);
await page.screenshot({ path: `${OUT}/slide-01.jpg`, type: 'jpeg', quality: 92, clip: { x: 0, y: 0, width: 1080, height: 1350 } });
await browser.close();
console.log('ok', `${OUT}/slide-01.jpg`);
