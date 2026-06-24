---
execution: subagent
agent: squads/carrossel-vitaegold/agents/designer
inputFile: squads/carrossel-vitaegold/output/copy_aprovada.json
outputFile: squads/carrossel-vitaegold/output/design.json
model_tier: powerful
---

# Step 05: Design — Brief Visual para Canva

## Context Loading

Load these files before executing:
- `squads/carrossel-vitaegold/output/copy_aprovada.json` — copy revisada e aprovada pelo Compliance (Comporta 1)
- `squads/carrossel-vitaegold/output/briefing.json` — persona, tom visual, tendências de formato
- `squads/carrossel-vitaegold/knowledge/brand_guidelines.md` — identidade visual da Vitae Gold (paleta, tipografia, estilo)

## Instructions

### Process
1. Ler a copy aprovada para entender o conteúdo de cada slide e o texto-na-imagem que deve ser especificado.
2. Definir o conceito visual geral do carrossel (abordagem: tipografia pura, foto de produto, flat lay, elemento gráfico, ou combinação).
3. Para cada slide, criar o brief visual especificando: fundo, paleta com hex codes, tipografia com fonte/tamanho/cor, disposição dos elementos, elementos do Canva, e o campo `texto_na_imagem` com o texto exato que aparece dentro da arte.
4. O campo `texto_na_imagem` deve conter apenas texto que já está na `copy_aprovada.json` — nunca criar headline ou claim nova dentro do design.
5. Verificar consistência visual entre todos os slides.
6. Salvar em `squads/carrossel-vitaegold/output/design.json`.

### Important: texto_na_imagem
O campo `texto_na_imagem` de cada slide é o insumo obrigatório da Comporta 2 (Compliance Arte). Deve conter TODO o texto que aparece dentro da imagem — headlines, subtítulos, bullets, selos, CTAs visuais. Nunca omitir este campo.

### Output Format
```json
{
  "produto_sku": "string",
  "tema": "string",
  "conceito_visual": "string",
  "slides": [
    {
      "slide": "number",
      "papel": "string",
      "conceito_visual": "string",
      "especificacoes": {
        "fundo": "hex | url",
        "texto_principal": {"conteudo": "string", "fonte": "string", "tamanho": "string", "cor": "hex"},
        "texto_secundario": {"conteudo": "string", "fonte": "string", "tamanho": "string", "cor": "hex"},
        "logo": {"posicao": "string", "tamanho": "string"},
        "elemento_visual": "string",
        "seta_proximo_slide": "boolean"
      },
      "texto_na_imagem": "string",
      "canva_elementos": ["string"]
    }
  ]
}
```

## Quality Criteria

- [ ] Todos os slides têm campo `texto_na_imagem` (pode ser string vazia para slides sem texto)
- [ ] Todo texto em `texto_na_imagem` está presente na `copy_aprovada.json`
- [ ] Fontes especificadas estão disponíveis no Canva
- [ ] Cores especificadas com hex code
- [ ] Consistência de paleta e tipografia entre todos os slides

## Veto Conditions

Reject and redo if ANY are true:
1. Qualquer slide está faltando o campo `texto_na_imagem`
2. O `texto_na_imagem` contém texto que não existe na `copy_aprovada.json` (nova claim criada no design)
