---
execution: inline
agent: squads/carrossel-vitaegold/agents/compliance
inputFile: squads/carrossel-vitaegold/output/design.json
outputFile: squads/carrossel-vitaegold/output/compliance_arte.json
---

# Step 07: Compliance ANVISA — Comporta 2 (Arte)

## Context Loading

Load these files before executing:
- `squads/carrossel-vitaegold/output/design.json` — brief visual com campo `texto_na_imagem` por slide
- `squads/carrossel-vitaegold/output/aprovacao_arte.json` — aprovação do Diretor de Arte
- `squads/carrossel-vitaegold/knowledge/blocklist_anvisa.json` — termos e categorias proibidos
- `squads/carrossel-vitaegold/knowledge/claims_autorizadas.json` — alegações autorizadas por SKU

## Instructions

### Process
1. Operar no modo `art` (Comporta 2).
2. Verificar que `aprovacao_arte.json` tem `status: APROVADO` — se não tiver, parar e informar ao usuário.
3. Para cada slide, extrair o campo `texto_na_imagem` e aplicar a mesma lógica de compliance da Comporta 1:
   - Varredura contra blocklist ANVISA
   - Verificação de claims: cada benefício de saúde precisa de claim autorizada
4. Atenção especial a: selos ("Comprovado", "Garantido"), antes/depois visuais, endosso de profissional de saúde, percentuais de resultado.
5. Verificar se algum texto foi adicionado na arte que não estava na `copy_aprovada.json` (nova claim não revisada).
6. Compilar resultado em `compliance_arte.json`.
7. Se REPROVADO e for a 3ª iteração: escalar para humano com relatório completo.

### Output Format
```json
{
  "modo": "art",
  "status": "APROVADO | REVISAR | REPROVADO",
  "iteracao": "number",
  "violacoes": [
    {
      "slide": "number",
      "campo": "texto_na_imagem",
      "trecho": "string",
      "motivo": "string",
      "norma": "string",
      "status_item": "REVISAR | REPROVADO",
      "sugestao": "string"
    }
  ],
  "texto_novo_nao_revisado": ["string"]
}
```

## Quality Criteria

- [ ] Campo `texto_na_imagem` de todos os slides foi auditado
- [ ] Selos e elementos visuais com texto foram verificados
- [ ] Campo `texto_novo_nao_revisado` registra qualquer texto novo encontrado na arte que não estava na copy aprovada

## Veto Conditions

Reject and redo if ANY are true:
1. Algum slide não teve o campo `texto_na_imagem` verificado
2. Status APROVADO quando há texto dentro da arte que não constava na `copy_aprovada.json`
