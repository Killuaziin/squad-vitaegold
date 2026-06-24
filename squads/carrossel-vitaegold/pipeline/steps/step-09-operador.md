---
execution: inline
agent: squads/carrossel-vitaegold/agents/operador
inputFile: squads/carrossel-vitaegold/output/copy_aprovada.json
outputFile: squads/carrossel-vitaegold/output/publicacao.json
---

# Step 09: Publicação no Instagram

## Context Loading

Load these files before executing:
- `squads/carrossel-vitaegold/output/copy_aprovada.json` — copy final aprovada (textos e legenda)
- `squads/carrossel-vitaegold/output/design.json` — brief visual com URLs das imagens (após execução no Canva)
- `squads/carrossel-vitaegold/output/compliance_copy.json` — status do compliance da copy
- `squads/carrossel-vitaegold/output/compliance_arte.json` — status do compliance da arte
- `squads/carrossel-vitaegold/_memory/published.md` — histórico de publicações anteriores

## Instructions

### Pre-conditions Check (OBRIGATÓRIO antes de qualquer chamada de API)
Verificar:
1. Aprovação humana explícita recebida no Step 08
2. `compliance_copy.json` → `status == "APROVADO"`
3. `compliance_arte.json` → `status == "APROVADO"`

Se qualquer pré-condição falhar: parar, registrar em `publicacao.json` com `status: BLOQUEADO` e informar ao usuário.

### Process
1. Verificar as 3 pré-condições acima. Se alguma falhar, parar imediatamente.
2. Usar a skill `instagram-publisher` para publicar o carrossel:
   a. Para cada slide: criar item container com a imagem e legenda alternativa
   b. Criar carousel container com todos os item container IDs
   c. Publicar com a legenda da `copy_aprovada.json`
3. Registrar resultado em `squads/carrossel-vitaegold/output/publicacao.json`.
4. Atualizar `squads/carrossel-vitaegold/_memory/published.md` com o registro da publicação.

### Output Format — publicacao.json
```json
{
  "status": "PUBLICADO | BLOQUEADO | ERRO",
  "post_id": "string",
  "url": "string",
  "publicado_em": "ISO timestamp",
  "produto_sku": "string",
  "tema": "string",
  "slides_publicados": "number",
  "motivo_bloqueio": "string (se BLOQUEADO)",
  "erro_api": "string (se ERRO)"
}
```

### Memory Update — published.md
Após publicação bem-sucedida, adicionar entrada em `_memory/published.md`:
```markdown
## {data} — {produto_sku} — {tema}
- **Post ID**: {post_id}
- **URL**: {url}
- **Slides**: {n}
- **Tema**: {tema}
```

## Quality Criteria

- [ ] Pré-condições verificadas e documentadas antes de qualquer chamada de API
- [ ] `publicacao.json` gerado (sucesso, bloqueio ou erro)
- [ ] `_memory/published.md` atualizado após publicação bem-sucedida
- [ ] Nenhum token ou credencial nos outputs

## Veto Conditions

Reject and redo if ANY are true:
1. Publicação iniciada sem verificar as 3 pré-condições
2. `publicacao.json` não foi gerado (independente do resultado)
