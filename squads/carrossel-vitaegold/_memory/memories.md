# Squad Memory: Carrossel Instagram

## Persona (referência obrigatória)
- **Roberto & Maria — "os que conquistaram e merecem o melhor"**: 60–75 anos, classe B/B+, cristãos praticantes, família/netos no centro, SP prioritário. Perfil completo em `knowledge/persona.md`.

## Estilo de Escrita
- Tom: **acolhedor, respeitoso, simples e direto**, nunca condescendente. "Conversa entre iguais".
- Sem jargão técnico (público 60–75); frases curtas e claras.
- Apelo emocional central: **"continuar presente e ativo para quem você ama"** (família, netos). Referências cristãs/familiares quando oportuno, com bom senso.
- **NUNCA usar travessão (—)** nos textos dos slides nem na legenda (preferência do cliente, 2026-06-15). Usar vírgula, dois-pontos, ponto ou reescrever a frase.

## Estrutura de Conteúdo
- **Máximo de 5 slides por carrossel** (preferência do cliente, definida em 2026-06-11) — não deixar muita imagem. Priorizar gancho + 3 desenvolvimentos + CTA.
- Todos os slides devem ter imagem (foto premium ou produto), nenhum slide só com texto.

## Fonte de Conteúdo (a partir de 2026-06-11)
- **Posts baseados nos artigos do blog** vitaegold.com.br/blog (categorias: Alimentação, Sono e descanso, Movimento e exercício, Saúde/bem-estar).
- Blog é **público** — ler via HTML do site. **NÃO usar o banco de dados** (credenciais de produção; risco). 
- Fluxo: ler artigo → resumir em até 5 slides → CTA "Leia o artigo completo no blog (link na bio)". O cliente gerencia o Linktree.

## Compliance — Aviso legal (condicional)
- Post **educativo de blog** (sem citar produto, sem alegação de suplemento) → **SEM aviso legal**.
- Post que **promove produto ou faz alegação funcional de suplemento** → aviso legal ANVISA + 2 portões de compliance obrigatórios.

## Design Visual
- Estilo editorial premium: serifa Fraunces (títulos) + Inter (corpo), fundo pergaminho/escuro, dourado de acento.
- Foto em faixa superior + cartão de texto; chip do logo (ícone árvore); indicador de progresso; seta "ARRASTE →" horizontal.
- Imagens via Pexels (automático, grátis) — pessoas **60–75 anos**, dignas e ativas, momentos em família/com netos. Evitar estética "fitness jovem".

## Temas já usados (não repetir)
- **Blog:** respiração, fibras, alongamento, rotina matinal, caminhada, hidratação, antioxidantes, café da manhã, mobilidade, açúcar, atenção plena, autocuidado, força muscular, conexões sociais, ritmo circadiano, ferro, sinais do corpo, lanches, foco, pele de dentro pra fora, movimentar-se mais, equilíbrio corporal, temperos/menos sal, tempo ao ar livre, ritual noturno, postura, refeições que saciam, escrever pra organizar a mente, cafeína e sono, ler rótulos.
- **Mitos:** saúde 60+, sono, alimentação, exercício, suplementos, memória, articulações, imunidade, vitamina D, envelhecer bem, ossos, proteção solar, proteína, saúde bucal, aprender depois dos 60, intestino.
- **Produto:** Colágeno C2, M5X, Magnésium+D3, Vitae 7.1, CúrcumaWhite, Ômega 3, Luteína+Zeaxantina, Sereno, PolyVit A-Z, Colágeno Hidrolisado, Vitae Flora, Coenzima Q10.
- Produtos ainda não usados: Vita Liv, NAC, Creatina, ThermoVit, FeminiFit, Blue Man (os 3 últimos têm alto risco de compliance: emagrecimento, hormonal, sexual; evitar ou passar por revisão regulatória).
- Artigos do blog ainda não usados (reserva): coordenação motora (repete a dica do equilíbrio, espaçar), prato colorido, como acordar mais disposto, limites saudáveis, autocompaixão, momentos de relaxamento, pausas conscientes, trabalho e descanso, sono e recuperação, comer com atenção plena (parcial). Lista completa e datas: `https://vitaegold.com.br/blog/wp-json/wp/v2/posts?per_page=100&_fields=slug,date` (o HTML do blog bloqueia curl sem User-Agent de navegador: Mod_Security).
- Evitar mitos sobre visão, pressão, colesterol, glicemia, gripe: são termos da blocklist (doenças específicas) e soam como alegação ligada aos produtos.

## Proibições Explícitas

## Técnico (específico do squad)
- Imagens renderizadas via `output/_build/render-generic.mjs` (blog/mitos) e `render-produto.mjs` (produto), ambos Playwright + Chrome, rodando da raiz do projeto: `node render-generic.mjs <cfg.json>`.
- Fotos em lote via `_build/fetch-batch.mjs` + `photo-plan.json` (PEXELS_API_KEY no .env). Revisar o campo `alt` impresso no log: trocar fotos jovens/fora da persona.
- Fotos de produto: `https://vitaegold.com.br/images/produtos/<slug>.webp` (slugs sem hífen, ex.: omega3, luteina, sereno, q10, nac, vitaliv). Converter pra PNG via `_build/convert-webp.mjs`.
- Fila: posts SEM campo `date` no manifest são escolhidos pelo tipo do dia da semana (Seg produto, Qua/Sex blog, Qui mitos), na ordem do array. Preferir sem data: fila não trava se um dia falhar.
- Publicação: GitHub Actions `publish.yml` roda 12:00 UTC diariamente; imagens servidas via raw.githubusercontent.com (repo público).
- **Fila vazia = workflow vermelho** (desde 2026-11-04): o publicador sai com erro quando não há post do tipo do dia, e o GitHub manda e-mail. Antes saía verde e a fila ficou vazia de 12/09 a 04/11/2026 sem ninguém notar.
- **Fluxo de lote (a partir de 2026-11):** (1) `photo-plan.json` + `fetch-batch.mjs` (registra ids em `photo-ids.json` e nunca repete foto do lote; apagar `photo-ids.json` ao começar lote novo); (2) textos de todos os posts num arquivo `lote-AAAA-MM.mjs` (slides + legenda); (3) `build-lote.mjs <lote> --check` valida travessão, blocklist ANVISA, idoso/vovô, 5 slides, legenda, aviso legal; sem `--check` renderiza e copia pra `queue/posts/`; `--manifest --no-render` põe na fila; (4) `review-lote.mjs <lote> <data-inicio> <prefixo>` gera folhas `_review-*-sN.png` (slides + legenda + data prevista) pra aprovação humana.
- Depoimentos nos slides "Quem usa": usar só frases publicadas na página do produto no site (seção "O que nossos clientes dizem"), nunca inventar.
- Telefone de vendas no CTA: 0800 888 0032 ("COMPRE AQUI" no site). 0800 608 0050 é o SAC.
- **Formatos (desde 2026-11-24):** a pasta do post define o formato: `video.mp4` = Reels (upload direto pro Instagram, capa em `thumb_offset` ms), 1 `slide-01.jpg` = imagem única, 2+ slides = carrossel.
- **Horário marcado:** campo `at` no manifest (ISO com fuso, ex. `2026-11-27T09:00:00-03:00`); o workflow checa a cada 15 min e publica o que venceu. Tipos `reels` e `especial` não estão no schedule: só saem com `at`, `date` ou `FORCE_ID`. Publicação manual: `FORCE_ID=<id> node publish-queue.mjs` (com o .env).
- **Lucinha Lins (parceira, vídeos de 2026-11):** dos 12 roteiros gravados, só 2 passam na ANVISA: "Texto Curto 3" (Cúrcuma White PRO+) e "Vitae Gold Texto 1 - 20s" (institucional). Os outros citam artrite/artrose/reumatismo/fibromialgia, "desinflamar", "prevenir dores", "tratamento" ou depoimento de dor curada: não publicar. Brutos aprovados em `videos/selecionados/` (fora do git); Reels: 9:16 + legenda ASS em `_build/reels/`.
- **Cúrcuma White PRO+** (não está em claims_autorizadas.json): alegações do site = magnésio (funcionamento muscular; formação de ossos e dentes) e vitamina C (antioxidante). 2 cápsulas/dia, pote 120 = 60 dias. Aviso legal inclui doenças hepáticas, biliares e úlceras gástricas.
