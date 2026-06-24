import { readFileSync, writeFileSync } from 'node:fs';
import { chromium } from 'playwright';

const DIR = 'squads/carrossel-vitaegold/output/_build/produto-vitae71/assets';
const webp = 'data:image/webp;base64,' + readFileSync(`${DIR}/produto.webp`).toString('base64');

const browser = await chromium.launch({ channel: 'chrome' });
const page = await browser.newPage();
const r = await page.evaluate(async (src) => {
  const img = new Image(); img.src = src; await img.decode();
  const c = document.createElement('canvas'); c.width = img.naturalWidth; c.height = img.naturalHeight;
  const x = c.getContext('2d'); x.drawImage(img, 0, 0);
  const corners = [[2, 2], [img.naturalWidth - 3, 2], [2, img.naturalHeight - 3], [img.naturalWidth - 3, img.naturalHeight - 3]];
  const alphas = corners.map(([px, py]) => x.getImageData(px, py, 1, 1).data[3]);
  return { w: img.naturalWidth, h: img.naturalHeight, png: c.toDataURL('image/png'), transparent: alphas.every(a => a === 0) };
}, webp);
writeFileSync(`${DIR}/produto.png`, Buffer.from(r.png.split(',')[1], 'base64'));
console.log('Produto:', r.w + 'x' + r.h, '| transparente:', r.transparent ? 'SIM' : 'NAO (fundo solido)');
await browser.close();
