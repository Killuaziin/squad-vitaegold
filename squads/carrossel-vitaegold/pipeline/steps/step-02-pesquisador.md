---
execution: subagent
agent: squads/carrossel-vitaegold/agents/pesquisador
format: instagram-feed
inputFile: squads/carrossel-vitaegold/output/input.md
outputFile: squads/carrossel-vitaegold/output/briefing.json
model_tier: powerful
---

# Step 02: Pesquisa de Mercado

## Context Loading

Load these files before executing:
- `squads/carrossel-vitaegold/output/input.md` — produto-alvo, tema, público-alvo e observações definidos no checkpoint
- `squads/carrossel-vitaegold/knowledge/claims_autorizadas.json` — alegações funcionais autorizadas por SKU
- `squads/carrossel-vitaegold/knowledge/blocklist_anvisa.json` — termos e categorias proibidos pela ANVISA
- `_opensquad/_memory/company.md` — perfil da Vitae Gold, produtos, público, tom de voz
- `squads/carrossel-vitaegold/_memory/memories.md` — aprendizados de runs anteriores

## Instructions

### Process
1. Ler o arquivo de input para identificar produto (SKU), tema e público-alvo.
2. Verificar se já existe um `briefing.json` salvo para este mesmo produto+tema em runs anteriores. Se existir, apresentar ao usuário e perguntar se quer reutilizar ou refazer.
3. Pesquisar tendências de formato de carrossel para suplementos no Instagram brasileiro (web_search): estrutura de slides, tipos de gancho, CTAs que performam.
4. Pesquisar o perfil do consumidor para o público-alvo informado.
5. Com base nas claims autorizadas do SKU, identificar os ângulos de comunicação regulatoriamente seguros.
6. Compilar o briefing em JSON com todos os campos obrigatórios.
7. Salvar em `squads/carrossel-vitaegold/output/briefing.json`.

### Output Format
```json
{
  "produto_sku": "string",
  "tema": "string",
  "persona": {
    "perfil": "string",
    "contexto_de_vida": "string",
    "relacao_com_suplementos": "string"
  },
  "dores_legitimas": ["string"],
  "angulos_permitidos": ["string"],
  "tendencias_formato": {
    "slides_ideais": "number",
    "estrutura": "string",
    "ganchos_performando": ["string"],
    "cta_recorrente": "string"
  },
  "concorrentes": [{"marca": "string", "angulo": "string", "risco_regulatorio": "string"}],
  "tom_de_voz": "string",
  "palavras_a_evitar": ["string"]
}
```

## Quality Criteria

- [ ] Todos os 8 campos do JSON estão presentes
- [ ] `angulos_permitidos` contém apenas ângulos compatíveis com claims autorizadas do SKU
- [ ] `palavras_a_evitar` está presente (pode ser lista vazia, mas deve existir)
- [ ] Nenhuma dor em `dores_legitimas` foi redigida como promessa de resultado

## Veto Conditions

Reject and redo if ANY are true:
1. O briefing contém ângulos de comunicação que usam termos da blocklist ANVISA
2. `claims_autorizadas.json` não foi consultado e os ângulos não têm base nas alegações autorizadas do SKU
