import { readFileSync } from 'node:fs';
import { chromium } from 'playwright';

const DIR = 'brandbook';
const imgs = [];
for (let i = 1; i <= 12; i++) {
  const f = `${DIR}/pages/page-${String(i).padStart(2, '0')}.jpg`;
  imgs.push('data:image/jpeg;base64,' + readFileSync(f).toString('base64'));
}

const html = `<!doctype html><html><head><meta charset="utf-8"><style>
  *{margin:0;padding:0}
  .pg{width:1600px;height:1000px;page-break-after:always;overflow:hidden}
  .pg:last-child{page-break-after:auto}
  img{width:1600px;height:1000px;display:block}
</style></head><body>
  ${imgs.map(s => `<div class="pg"><img src="${s}"></div>`).join('')}
</body></html>`;

const browser = await chromium.launch();  // headless para suportar page.pdf()
const page = await browser.newPage();
await page.setContent(html, { waitUntil: 'load' });
await page.pdf({
  path: `${DIR}/brandbook-vitae-gold.pdf`,
  width: '1600px',
  height: '1000px',
  printBackground: true,
  pageRanges: '1-12',
});
await browser.close();
console.log('PDF gerado: brandbook/brandbook-vitae-gold.pdf');
