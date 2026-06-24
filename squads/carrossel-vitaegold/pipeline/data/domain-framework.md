# Domain Framework — Produção de Carrossel com Compliance ANVISA

## Fluxo Obrigatório

```
Input (produto + tema + público)
  ↓
Pesquisa de mercado → briefing.json
  ↓
Copy → copy.json
  ↓
COMPLIANCE COPY (Comporta 1) → copy_aprovada.json
  ↓
Design → design.json
  ↓
Diretor de Arte → aprovacao_arte.json
  ↓
COMPLIANCE ARTE (Comporta 2) → compliance_arte.json
  ↓
APROVAÇÃO HUMANA (gate obrigatório)
  ↓
Publicação → publicacao.json
```

## Regra de Ouro

Um suplemento alimentar **só pode comunicar as alegações que (a) constam na lista autorizada da IN 28/2018 e (b) correspondem aos nutrientes/bioativos realmente presentes no produto, nas quantidades exigidas.**

## Hierarquia de Decisão

1. **Bloqueio total**: qualquer termo da blocklist → REPROVADO, sem reformulação
2. **Claim sem autorização**: benefício de saúde sem claim correspondente → REPROVADO
3. **Redação arriscada**: ideia ok, redação inadequada → REVISAR com sugestão
4. **Aprovado**: tudo dentro dos limites → APROVADO

## Estrutura de Carrossel que Funciona

1. **Slide gancho**: pergunta identificável ou dado surpreendente. Para o scroll.
2. **Slides educação (2-4)**: contexto, nutriente, papel na alimentação. Sem claim de benefício direta.
3. **Slide produto**: apresenta o produto como solução prática. Claims autorizadas.
4. **Slide CTA**: link na bio / WhatsApp + logo + aviso obrigatório.

## Limites de Iteração

- Compliance Copy: máximo 3 iterações antes de escalar para humano
- Compliance Arte: máximo 3 iterações antes de escalar para humano
- Diretor de Arte: máximo 2 iterações antes de apresentar solução direta
