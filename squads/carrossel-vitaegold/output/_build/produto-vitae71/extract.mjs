import { writeFileSync } from 'node:fs';
const UA = { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/120 Safari/537.36' };
const DIR = 'squads/carrossel-vitaegold/output/_build/produto-vitae71/assets';

const img = await (await fetch('https://vitaegold.com.br/images/produtos/vitae7.1.webp', { headers: UA })).arrayBuffer();
writeFileSync(`${DIR}/produto.webp`, Buffer.from(img));
console.log('Imagem do produto baixada:', Math.round(img.byteLength / 1024) + 'KB');

const html = await (await fetch('https://vitaegold.com.br/suplementos-naturais-vitae7-1/', { headers: UA })).text();
const txt = [...html.matchAll(/<(h1|h2|h3|h4|p|li)[^>]*>([\s\S]*?)<\/\1>/gi)]
  .map(m => m[2].replace(/<[^>]+>/g, ' ').replace(/&[a-z]+;/gi, ' ').replace(/\s+/g, ' ').trim())
  .filter(t => t.length > 20);
console.log('--- CONTEUDO DA PAGINA ---');
[...new Set(txt)].slice(0, 45).forEach(t => console.log('•', t));
