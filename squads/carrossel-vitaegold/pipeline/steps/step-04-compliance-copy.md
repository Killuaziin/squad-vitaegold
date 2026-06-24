---
execution: inline
agent: squads/carrossel-vitaegold/agents/compliance
inputFile: squads/carrossel-vitaegold/output/copy.json
outputFile: squads/carrossel-vitaegold/output/copy_aprovada.json
---

# Step 04: Compliance ANVISA — Comporta 1 (Copy)

## Context Loading

Load these files before executing:
- `squads/carrossel-vitaegold/output/copy.json` — copy produzida pelo Copywriter
- `squads/carrossel-vitaegold/knowledge/blocklist_anvisa.json` — termos e categorias proibidos pela ANVISA
- `squads/carrossel-vitaegold/knowledge/claims_autorizadas.json` — alegações funcionais autorizadas por SKU

## Instructions

### Process
1. Operar no modo `copy` (Comporta 1).
2. Para cada slide, legenda e hashtag, verificar contra a blocklist ANVISA. Qualquer ocorrência = REPROVADO para aquele item.
3. Para cada benefício de saúde mencionado, verificar se existe claim correspondente em `claims_autorizadas.json` para o SKU do produto. Se não existe → REPROVADO.
4. Verificar presença dos alertas obrigatórios.
5. Para itens marcados como REVISAR: gerar versão corrigida com redação segura e substituir no JSON.
6. Para itens marcados como REPROVADO (violação irremediável): registrar violação e pedir reescrita ao Copywriter. Se for a 3ª iteração, escalar para humano.
7. Salvar resultado da auditoria em `squads/carrossel-vitaegold/output/compliance_copy.json`.
8. Se status final for APROVADO ou REVISAR (com correções aplicadas): salvar copy corrigida em `squads/carrossel-vitaegold/output/copy_aprovada.json`.

### Loop Control
- Rastrear número da iteração no campo `iteracao` do JSON de saída.
- Se `iteracao >= 3` e ainda há violações REPROVADO: parar o pipeline e apresentar ao usuário com explicação detalhada das violações não resolvidas.

### Output — compliance_copy.json
```json
{
  "modo": "copy",
  "status": "APROVADO | REVISAR | REPROVADO",
  "iteracao": "number",
  "violacoes": [
    {
      "slide": "number | legenda | hashtags",
      "campo": "texto | legenda | hashtag",
      "trecho": "string",
      "motivo": "string",
      "norma": "string",
      "status_item": "REVISAR | REPROVADO",
      "sugestao": "string"
    }
  ],
  "versao_corrigida": {}
}
```

## Quality Criteria

- [ ] Cada violação tem campo `norma` com legislação específica (IN 28/2018, RDC 243/2018, RDC 259/2002)
- [ ] Itens REVISAR têm `sugestao` preenchida
- [ ] Status geral reflete o pior caso individual
- [ ] `copy_aprovada.json` gerado quando status é APROVADO ou REVISAR (após correções)

## Veto Conditions

Reject and redo if ANY are true:
1. O status é APROVADO mas há termos da blocklist não detectados na copy
2. Copy com violação REPROVADO foi passada adiante sem reescrita ou escalonamento para humano
