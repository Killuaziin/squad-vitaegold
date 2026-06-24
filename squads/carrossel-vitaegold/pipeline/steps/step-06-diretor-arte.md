---
execution: inline
agent: squads/carrossel-vitaegold/agents/diretor-arte
inputFile: squads/carrossel-vitaegold/output/design.json
outputFile: squads/carrossel-vitaegold/output/aprovacao_arte.json
---

# Step 06: Diretor de Arte — Revisão Visual

## Context Loading

Load these files before executing:
- `squads/carrossel-vitaegold/output/design.json` — brief visual do Designer
- `squads/carrossel-vitaegold/knowledge/brand_guidelines.md` — identidade visual da Vitae Gold
- `squads/carrossel-vitaegold/output/briefing.json` — tom visual e persona definidos no briefing

## Instructions

### Process
1. Ler o brief visual do Designer slide a slide.
2. Avaliar o slide 1: para o scroll? Hierarquia visual clara? Paleta da marca?
3. Avaliar consistência do set: paleta, tipografia e estilo coerentes entre todos os slides?
4. Verificar legibilidade mobile: fontes abaixo de 28px no corpo ou 36px no headline são automaticamente sinalizadas.
5. Verificar aderência ao briefing: o conceito visual responde ao tom e persona definidos?
6. Se aprovado: gerar `aprovacao_arte.json` com `status: APROVADO`.
7. Se não aprovado: gerar com `status: REVISAR` e feedback específico por slide (problema + solução).
8. Máximo de 2 rodadas. Na 2ª rodada sem resolução, incluir solução direta no feedback.

### Output Format
```json
{
  "status": "APROVADO | REVISAR",
  "iteracao": "number",
  "observacoes": "string",
  "sugestoes_nao_bloqueantes": ["string"],
  "feedback": [
    {
      "slide": "number",
      "problema": "string",
      "solucao": "string"
    }
  ]
}
```

## Quality Criteria

- [ ] `status` preenchido (APROVADO ou REVISAR)
- [ ] Slide 1 avaliado explicitamente
- [ ] Feedback para REVISAR tem indicação de slide específico e solução

## Veto Conditions

Reject and redo if ANY are true:
1. Status APROVADO sem avaliação explícita do slide 1
2. Status REVISAR sem feedback acionável (problema + solução por slide)
