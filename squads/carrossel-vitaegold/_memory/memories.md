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

## Proibições Explícitas

## Técnico (específico do squad)
- Imagens renderizadas via `output/_build/render2.mjs` (Playwright + Chrome). Fotos auto-buscadas via `fetch-pexels.mjs` (PEXELS_API_KEY no .env).
- Publicação via skill instagram-publisher (hospedagem catbox.moe, sem chave).
