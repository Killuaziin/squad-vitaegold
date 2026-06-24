---
execution: subagent
agent: squads/carrossel-vitaegold/agents/copywriter
format: instagram-feed
inputFile: squads/carrossel-vitaegold/output/briefing.json
outputFile: squads/carrossel-vitaegold/output/copy.json
model_tier: powerful
---

# Step 03: Redação da Copy

## Context Loading

Load these files before executing:
- `squads/carrossel-vitaegold/output/briefing.json` — briefing completo do Pesquisador (persona, ângulos permitidos, tendências de formato, palavras a evitar)
- `squads/carrossel-vitaegold/knowledge/claims_autorizadas.json` — alegações funcionais autorizadas por SKU
- `squads/carrossel-vitaegold/knowledge/blocklist_anvisa.json` — termos e categorias proibidos
- `squads/carrossel-vitaegold/pipeline/data/tone-of-voice.md` — diretrizes de tom de voz

## Instructions

### Process
1. Ler o briefing completo do Pesquisador para entender persona, ângulos permitidos e tendências de formato.
2. Definir a estrutura do carrossel: número de slides e função de cada um (gancho, educação, prova, produto, CTA) com base nas tendências de formato do briefing.
3. Escrever cada slide com texto conciso — uma ideia por slide. Para cada slide que menciona um benefício de saúde, registrar qual claim autorizada o ampara no campo `claims_usadas`.
4. Escrever a legenda (complementar, não repetitiva; até 2200 caracteres) e hashtags relevantes.
5. Incluir os alertas obrigatórios (ex: "Este produto não é medicamento").
6. Fazer uma varredura manual final contra a blocklist antes de entregar.
7. Salvar em `squads/carrossel-vitaegold/output/copy.json`.

### Output Format
```json
{
  "produto_sku": "string",
  "tema": "string",
  "slides": [
    {
      "n": "number",
      "papel": "gancho | educacao | prova | produto | cta",
      "texto": "string",
      "claims_usadas": ["string"]
    }
  ],
  "legenda": "string",
  "hashtags": ["string"],
  "alertas_obrigatorios": ["string"]
}
```

## Quality Criteria

- [ ] Todos os slides têm campo `claims_usadas` (pode ser lista vazia para slides sem claim)
- [ ] Cada benefício de saúde mencionado tem ao menos uma claim em `claims_usadas`
- [ ] `alertas_obrigatorios` está preenchido com ao menos um aviso
- [ ] Legenda tem no máximo 2200 caracteres
- [ ] Nenhum termo da blocklist está presente no texto

## Veto Conditions

Reject and redo if ANY are true:
1. Qualquer slide menciona benefício de saúde sem `claims_usadas` correspondente
2. Qualquer texto contém termos da blocklist ANVISA (emagrecimento, cura, tratamento de doença, estética corporal, função sexual, etc.)
3. `alertas_obrigatorios` está ausente ou vazio
