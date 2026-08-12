// Acrescenta os 18 posts do lote de agosto/setembro 2026 ao manifest da fila (sem data fixa:
// o publicador escolhe pelo tipo do dia da semana, na ordem em que aparecem aqui).
import { readFileSync, writeFileSync } from 'node:fs';

const MANIFEST = 'queue/manifest.json';
const m = JSON.parse(readFileSync(MANIFEST, 'utf8'));

const novos = [
  // mitos (quintas): 13/08, 20/08, 27/08, 03/09, 10/09
  { id: 'mitos-articulacoes',    type: 'mitos',   title: 'Mitos articulações' },
  { id: 'mitos-imunidade',       type: 'mitos',   title: 'Mitos imunidade' },
  { id: 'mitos-vitamina-d',      type: 'mitos',   title: 'Mitos vitamina D' },
  { id: 'mitos-envelhecimento',  type: 'mitos',   title: 'Mitos envelhecer bem' },
  { id: 'mitos-ossos',           type: 'mitos',   title: 'Mitos ossos fortes' },
  // blog (quartas e sextas): 14/08, 19/08, 21/08, 26/08, 28/08, 02/09, 04/09, 09/09, 11/09
  { id: 'blog-forca-muscular',   type: 'blog',    title: 'Força muscular' },
  { id: 'blog-conexoes-sociais', type: 'blog',    title: 'Conexões sociais' },
  { id: 'blog-ritmo-circadiano', type: 'blog',    title: 'Ritmo circadiano' },
  { id: 'blog-ferro',            type: 'blog',    title: 'Ferro na alimentação' },
  { id: 'blog-sinais-corpo',     type: 'blog',    title: 'Sinais do corpo' },
  { id: 'blog-lanches',          type: 'blog',    title: 'Lanches saudáveis' },
  { id: 'blog-foco',             type: 'blog',    title: 'Foco e concentração' },
  { id: 'blog-pele',             type: 'blog',    title: 'Pele de dentro pra fora' },
  { id: 'blog-movimento',        type: 'blog',    title: 'Movimentar-se mais' },
  // produto (segundas): 17/08, 24/08, 31/08, 07/09
  { id: 'produto-curcuma-white', type: 'produto', title: 'CúrcumaWhite' },
  { id: 'produto-omega3',        type: 'produto', title: 'Ômega 3' },
  { id: 'produto-luteina',       type: 'produto', title: 'Luteína + Zeaxantina' },
  { id: 'produto-sereno',        type: 'produto', title: 'Sereno' },
];

const existentes = new Set(m.posts.map(p => p.id));
let add = 0;
for (const n of novos) {
  if (existentes.has(n.id)) { console.log(`JA EXISTE: ${n.id} (pulado)`); continue; }
  m.posts.push({ id: n.id, type: n.type, title: n.title, published: false, url: null });
  add++;
}
writeFileSync(MANIFEST, JSON.stringify(m, null, 2) + '\n');
console.log(`adicionados: ${add} | total agora: ${m.posts.length} | nao publicados: ${m.posts.filter(p => !p.published).length}`);
