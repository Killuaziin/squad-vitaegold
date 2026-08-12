// Converte produto.webp -> produto.png via canvas do Chrome (sem dependencias de imagem).
// Uso (da raiz do projeto): node squads/carrossel-vitaegold/output/_build/convert-webp.mjs <dir1> <dir2> ...
import { readFileSync, writeFileSync } from 'node:fs';
import { chromium } from 'playwright';

const dirs = process.argv.slice(2);
const browser = await chromium.launch({ channel: 'chrome' });
const page = await browser.newPage();
for (const dir of dirs) {
  const webp = readFileSync(`${dir}/produto.webp`).toString('base64');
  const dataUrl = await page.evaluate(async (b64) => {
    const img = new Image();
    img.src = 'data:image/webp;base64,' + b64;
    await img.decode();
    const c = document.createElement('canvas');
    c.width = img.naturalWidth; c.height = img.naturalHeight;
    c.getContext('2d').drawImage(img, 0, 0);
    return c.toDataURL('image/png');
  }, webp);
  writeFileSync(`${dir}/produto.png`, Buffer.from(dataUrl.split(',')[1], 'base64'));
  console.log('OK', dir);
}
await browser.close();
