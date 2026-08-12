# Blog técnico — José Correa Viana

Site construído com [Astro](https://astro.build), gratuito e publicado no GitHub Pages.

## Como colocar no ar (passo a passo)

1. **Crie o repositório novo no GitHub** (público, sem README/gitignore automáticos).
   - Se quiser o site na raiz `https://SEU_USUARIO.github.io`, o repositório precisa se chamar exatamente `SEU_USUARIO.github.io`.
   - Se preferir um nome próprio (ex: `blog-ia`), o site fica em `https://SEU_USUARIO.github.io/blog-ia`.

2. **Ajuste `astro.config.mjs`:**
   - Troque `SEU_USUARIO` pelo seu usuário do GitHub.
   - Se o repo for `SEU_USUARIO.github.io`, **remova a linha `base:`** inteira.
   - Se o repo tiver outro nome, troque `NOME_DO_REPO` pelo nome real.

3. **Suba o código:**
   ```bash
   git init
   git add .
   git commit -m "primeiro commit do blog"
   git branch -M main
   git remote add origin https://github.com/SEU_USUARIO/NOME_DO_REPO.git
   git push -u origin main
   ```

4. **Ative o GitHub Pages:**
   - No repositório, vá em **Settings → Pages**.
   - Em "Build and deployment" → **Source**, selecione **GitHub Actions**.
   - Pronto. O workflow em `.github/workflows/deploy.yml` já builda e publica automaticamente a cada push na branch `main`.

5. Depois do primeiro deploy (leva 1-2 min), o site estará no ar na URL configurada no passo 2.

## Como escrever um novo post

Crie um arquivo `.md` em `src/content/blog/`, seguindo o padrão:

```markdown
---
title: 'Título do post'
description: 'Uma frase resumindo o post (aparece na listagem e no SEO)'
pubDate: 'Aug 20 2026'
category: 'rag-agentes'   # opções: sabatico | rag-agentes | transformer-ldm | carreira
tags: ['tag1', 'tag2']
---

Conteúdo do post em markdown normal.
```

Dê `git add`, `commit`, `push` — o site atualiza sozinho.

## Rodar localmente

```bash
npm install
npm run dev      # abre em http://localhost:4321
npm run build    # gera versão de produção em dist/
npm run preview  # serve a versão de produção localmente
```

## Estrutura de categorias sugerida

- `sabatico` — reflexões sobre o processo de estudo e a transição de carreira
- `rag-agentes` — RAG, agentes, ReAct, harness, LLMOps
- `transformer-ldm` — transformers, attention, LDM, fine-tuning
- `carreira` — plano de retorno ao mercado, aprendizados profissionais

## Posts já incluídos como ponto de partida

- `aprendizados-do-sabatico.md` — post de abertura
- `rag-vs-fine-tuning.md` — exemplo de post técnico da categoria RAG/Agentes

Use esses dois como referência de tom e estrutura para os próximos.
