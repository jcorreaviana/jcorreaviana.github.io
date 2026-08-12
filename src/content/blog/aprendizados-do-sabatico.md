---
title: 'O que aprendi parando de trabalhar por um tempo para estudar IA a fundo'
description: 'Por que decidi tirar um sabático, como estruturei o estudo do zero até transformers, e o que vem a seguir.'
pubDate: 'Aug 12 2026'
category: 'sabatico'
tags: ['sabático', 'carreira', 'estudo']
---

Nos últimos meses eu tirei um tempo fora do mercado para estudar IA de um jeito que eu nunca tinha me permitido fazer com calma: do zero.

Não do zero no sentido de "nunca vi isso antes" — eu já vinha de anos como engenheiro de software, boa parte liderando times técnicos. Do zero no sentido de reconstruir o entendimento matemático e arquitetural por baixo dos modelos que hoje uso no dia a dia: derivada, gradiente descendente, álgebra linear, até chegar em attention, transformers, RAG e agentes.

## Por que fazer isso do jeito difícil

Dava pra aprender só o suficiente pra "usar bem" essas ferramentas. Decidi não fazer assim. Implementei bloco de attention na mão antes de usar biblioteca, treinei rede neural com backpropagation escrito por mim, construí um pipeline de RAG local antes de confiar em qualquer abstração pronta.

O motivo é simples: quando a arquitetura falha, entender por que ela falha depende de saber o que está por baixo — não só qual parâmetro ajustar.

## O que ficou mais claro

Alguns pontos que vou desenvolver em posts separados, mais técnicos, aqui no blog:

- **Por que transformer domina texto mas ainda disputa espaço com XGBoost em dados tabulares** — não é hype, é uma questão de estrutura dos dados.
- **RAG não é sobre o modelo saber mais coisa** — é sobre separar conhecimento de raciocínio, e isso muda completamente como você desenha um sistema em produção.
- **O que faz de uma chamada de LLM um agente** — não é ter acesso a ferramentas, é decisão iterativa.

## O que vem a seguir

A ideia é usar este espaço para registrar esse aprendizado de forma mais completa do que cabe num post de LinkedIn — com código, exemplos e os erros que cometi pelo caminho (alguns bem instrutivos). O plano é voltar ao mercado em outubro, e esse processo de estudo aplicado é parte de como estou me preparando para essa volta.

Se você também estuda essa área ou está pensando em fazer uma pausa parecida, fico à vontade pra trocar ideia — é só chamar.
