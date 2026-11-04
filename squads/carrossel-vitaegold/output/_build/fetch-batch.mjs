// Busca em lote de fotos no Pexels para os posts do mes. Uso (da raiz do projeto):
//   node squads/carrossel-vitaegold/output/_build/fetch-batch.mjs
// Le photo-plan.json, cria _build/<post>/assets/ e baixa a melhor foto de cada query.
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs';

const KEY = process.env.PEXELS_API_KEY;
if (!KEY) { console.error('PEXELS_API_KEY nao definido'); process.exit(1); }

const BUILD = 'squads/carrossel-vitaegold/output/_build';
const plan = JSON.parse(readFileSync(`${BUILD}/photo-plan.json`, 'utf8'));

async function search(q) {
  const url = `https://api.pexels.com/v1/search?query=${encodeURIComponent(q)}&per_page=15&orientation=landscape`;
  const res = await fetch(url, { headers: { Authorization: KEY } });
  if (!res.ok) throw new Error(`Pexels ${res.status}: ${await res.text()}`);
  return (await res.json()).photos || [];
}

// Evita a mesma foto em dois slides do lote. "pick" (opcional no plano) pula as N primeiras
// candidatas validas: use pick 1, 2... para trocar uma foto reprovada na revisao (apague o arquivo antes).
// photo-ids.json guarda o id Pexels de tudo que ja foi baixado no lote (em uso ou reprovado),
// para que rodadas seguintes (trocas pontuais) nao repitam fotos. Apague o arquivo ao comecar um lote novo.
const IDS = `${BUILD}/photo-ids.json`;
const ids = existsSync(IDS) ? JSON.parse(readFileSync(IDS, 'utf8')) : {};
const used = new Set(Object.values(ids));
for (const [post, jobs] of Object.entries(plan)) {
  const dir = `${BUILD}/${post}/assets`;
  mkdirSync(dir, { recursive: true });
  for (const job of jobs) {
    const dest = `${dir}/${job.file}`;
    if (existsSync(dest)) { console.log(`SKIP ${post}/${job.file} (ja existe)`); continue; }
    try {
      const photos = await search(job.q);
      // prefere foto grande o suficiente para a faixa 1080x660
      const ok = photos.filter(x => !used.has(x.id));
      const big = ok.filter(x => x.width >= 1600);
      const pool = big.length ? big : ok;
      const p = pool[Math.min(job.pick || 0, pool.length - 1)];
      if (!p) { console.log(`VAZIO ${post}/${job.file}  q="${job.q}"`); continue; }
      used.add(p.id);
      const src = p.src.large2x || p.src.original || p.src.large;
      const buf = Buffer.from(await (await fetch(src)).arrayBuffer());
      writeFileSync(dest, buf);
      ids[`${post}/${job.file}`] = p.id;
      writeFileSync(IDS, JSON.stringify(ids, null, 2) + '\n');
      console.log(`OK ${post}/${job.file}  ${Math.round(buf.length / 1024)}KB  ${p.width}x${p.height}  id=${p.id}  alt="${(p.alt || '').slice(0, 80)}"  por ${p.photographer}`);
    } catch (e) {
      console.log(`FALHA ${post}/${job.file}: ${e.message}`);
    }
  }
}
console.log('--- fim do lote ---');
