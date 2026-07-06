// Converte webp -> png. Uso: node webp2png.mjs <in.webp> <out.png>
import { readFileSync } from 'node:fs';
import { chromium } from 'playwright';
const [,, inp, outp] = process.argv;
const b64 = 'data:image/webp;base64,' + readFileSync(inp).toString('base64');
const br = await chromium.launch({ channel: 'chrome' });
const pg = await br.newPage();
const dim = await pg.evaluate(async (src) => { const im = new Image(); im.src = src; await im.decode(); return { w: im.naturalWidth, h: im.naturalHeight }; }, b64);
await pg.setViewportSize({ width: dim.w, height: dim.h });
await pg.setContent(`<body style="margin:0"><img src="${b64}" style="display:block;width:${dim.w}px;height:${dim.h}px"></body>`);
await pg.waitForTimeout(150);
await pg.screenshot({ path: outp, omitBackground: true });
await br.close();
console.log('convertido', dim.w + 'x' + dim.h, '->', outp);
