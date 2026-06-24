import { writeFileSync } from 'node:fs';

const KEY = process.env.PEXELS_API_KEY;
const DIR = 'squads/carrossel-vitaegold/output/_build/assets';

if (!KEY) {
  console.log('PEXELS_API_KEY nao definido no .env. Pegue gratis em https://pexels.com/api');
  process.exit(1);
}

// queries alinhadas a marca premium 60+ — baixa candidatas para revisao
const jobs = [
  { name: 'contexto',  q: 'happy senior couple outdoors nature', orientation: 'landscape' },
  { name: 'curcuma',   q: 'turmeric powder bowl',                 orientation: 'landscape' },
  { name: 'ativo',     q: 'active senior woman exercise',         orientation: 'landscape' },
];

async function search(q, orientation) {
  const url = `https://api.pexels.com/v1/search?query=${encodeURIComponent(q)}&per_page=6&orientation=${orientation}`;
  const res = await fetch(url, { headers: { Authorization: KEY } });
  if (!res.ok) throw new Error(`Pexels ${res.status}: ${await res.text()}`);
  return (await res.json()).photos || [];
}

for (const job of jobs) {
  try {
    const photos = await search(job.q, job.orientation);
    let n = 0;
    for (const p of photos.slice(0, 3)) {
      const src = p.src.large2x || p.src.original || p.src.large;
      const buf = Buffer.from(await (await fetch(src)).arrayBuffer());
      n++;
      const f = `${DIR}/cand_px_${job.name}_${n}.jpg`;
      writeFileSync(f, buf);
      console.log(`cand_px_${job.name}_${n}.jpg  ${Math.round(buf.length / 1024)}KB  ${p.width}x${p.height}  por ${p.photographer}`);
    }
  } catch (e) {
    console.log(`falha ${job.name}:`, e.message);
  }
}
console.log('--- candidatas Pexels baixadas ---');
