import { readFileSync } from 'node:fs';
import { chromium } from 'playwright';

const md = readFileSync('_opensquad/_memory/company.md', 'utf8');
const LOGO = 'data:image/png;base64,' + readFileSync('brandbook/assets/logo.png').toString('base64');

const esc = s => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const inline = s => esc(s)
  .replace(/`([^`]+)`/g, '<code>$1</code>')
  .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
  .replace(/\*([^*]+)\*/g, '<em>$1</em>');

// markdown -> html (suficiente para company.md)
function toHtml(src) {
  const lines = src.split('\n');
  let html = '', inList = false;
  const closeList = () => { if (inList) { html += '</ul>'; inList = false; } };
  for (let raw of lines) {
    const line = raw.replace(/\s+$/, '');
    if (/^# /.test(line)) { closeList(); html += `<h1>${inline(line.slice(2))}</h1>`; }
    else if (/^## /.test(line)) { closeList(); html += `<h2>${inline(line.slice(3))}</h2>`; }
    else if (/^### /.test(line)) { closeList(); html += `<h3>${inline(line.slice(4))}</h3>`; }
    else if (/^> /.test(line)) { closeList(); html += `<blockquote>${inline(line.slice(2))}</blockquote>`; }
    else if (/^- /.test(line)) { if (!inList) { html += '<ul>'; inList = true; } html += `<li>${inline(line.slice(2))}</li>`; }
    else if (line.trim() === '') { closeList(); }
    else { closeList(); html += `<p>${inline(line)}</p>`; }
  }
  closeList();
  return html;
}

const body = toHtml(md);

const doc = `<!doctype html><html><head><meta charset="utf-8">
<link href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,600;9..144,700&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
<style>
  *{box-sizing:border-box}
  body{font-family:'Inter';color:#211f1a;line-height:1.6;font-size:14px;margin:0}
  .head{display:flex;align-items:center;gap:16px;border-bottom:3px solid #d4a017;padding-bottom:18px;margin-bottom:8px}
  .head img{height:54px}
  .head .k{font-family:'Inter';font-weight:700;letter-spacing:3px;text-transform:uppercase;color:#9c7415;font-size:12px}
  h1{font-family:'Fraunces';font-weight:600;font-size:30px;color:#1a1a1a;margin:4px 0 2px}
  h2{font-family:'Fraunces';font-weight:600;font-size:20px;color:#1a1a1a;margin:26px 0 8px;padding-left:12px;border-left:4px solid #d4a017}
  h3{font-family:'Inter';font-weight:700;font-size:15px;color:#9c7415;margin:18px 0 6px;text-transform:uppercase;letter-spacing:1px}
  p{margin:7px 0}
  ul{margin:8px 0 8px 4px;padding-left:22px}
  li{margin:5px 0}
  strong{color:#1a1a1a;font-weight:700}
  em{color:#9c7415;font-style:italic}
  code{font-family:'Courier New',monospace;background:#f6f1e6;color:#9c7415;padding:1px 6px;border-radius:5px;font-size:13px}
  blockquote{margin:12px 0;padding:12px 18px;background:#f6f1e6;border-left:4px solid #d4a017;border-radius:0 8px 8px 0;color:#5b564c;font-style:italic}
  a{color:#9c7415}
</style></head><body>
  <div class="head"><img src="${LOGO}"><span class="k">Perfil da Empresa · Documento Interno</span></div>
  ${body}
</body></html>`;

const browser = await chromium.launch();
const page = await browser.newPage();
await page.setContent(doc, { waitUntil: 'load' });
await page.evaluate(() => document.fonts.ready);
await page.pdf({
  path: '_opensquad/_memory/company.pdf',
  format: 'A4',
  printBackground: true,
  margin: { top: '16mm', bottom: '16mm', left: '16mm', right: '16mm' },
});
await browser.close();
console.log('PDF gerado: _opensquad/_memory/company.pdf');
