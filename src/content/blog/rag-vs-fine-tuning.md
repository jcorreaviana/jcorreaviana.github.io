---
title: 'RAG não é sobre o modelo saber mais coisa'
description: 'A diferença real entre RAG e fine-tuning, e por que na prática os dois costumam se combinar.'
pubDate: 'Aug 12 2026'
category: 'rag-agentes'
tags: ['RAG', 'fine-tuning', 'LLM']
---

Uma confusão comum: tratar RAG como "uma forma mais barata de dar mais conhecimento pro modelo", equivalente a fine-tuning. Não é. São soluções para problemas diferentes.

## O que cada um resolve

**Fine-tuning** muda os pesos do modelo. Ele aprende um novo comportamento, estilo, ou padrão de resposta. É caro, precisa de dados de treino específicos, e o conhecimento fica "cozido" dentro do modelo — pra atualizar, você precisa re-treinar.

**RAG (Retrieval-Augmented Generation)** não toca nos pesos do modelo. Ele busca informação relevante numa base externa — documentos, banco vetorial, o que for — e injeta isso no prompt antes do modelo responder. O modelo continua o mesmo; o que muda é o contexto que ele recebe.

## Por que a diferença importa na prática

Três consequências diretas de separar conhecimento (RAG) de comportamento (fine-tuning):

1. **Custo de atualização.** Se a informação muda toda semana, RAG atualiza na hora — você só troca o documento na base. Fine-tuning exigiria re-treinar.
2. **Auditabilidade.** RAG permite citar a fonte exata que embasou a resposta. Em contexto regulado, isso não é opcional.
3. **Eles se combinam.** Fine-tuning para ajustar comportamento e estilo, RAG para manter o conhecimento atualizado e rastreável. Não é "ou", é frequentemente "e".

## O detalhe que costuma passar batido: chunking

RAG depende de quebrar documentos em pedaços (chunks) antes de indexar. O tamanho do chunk é um trade-off real:

- **Chunk pequeno**: busca mais precisa, mas perde contexto ao redor.
- **Chunk grande**: mais contexto, mas a busca fica mais diluída — mistura assuntos.
- **Overlap** entre chunks ajuda a não cortar uma ideia no meio.

Um erro comum é confundir tamanho do chunk (o texto de entrada) com dimensão do embedding (o vetor de saída, que é fixo pelo modelo de embedding escolhido). São coisas independentes.

## E o threshold de similaridade?

Todo sistema de retrieval sempre retorna *alguma coisa* — mesmo quando nada na base é realmente relevante para a pergunta. Por isso existe o threshold: um corte de distância/similaridade abaixo do qual você descarta o resultado em vez de forçar uma resposta com contexto ruim.

Calibrar esse número exige medir com dados reais. No meu caso, rodando testes com perguntas relevantes e irrelevantes contra a mesma base, o padrão que encontrei foi: distância de perguntas relevantes ficando na faixa de 13 a 19, e perguntas irrelevantes na faixa de 26 a 30. Um threshold em 22 separou bem os dois grupos — mas esse número é specific da minha base e do modelo de embedding usado, não é uma constante universal.

---

*Este post é parte de uma série sobre RAG, agentes e harness que venho documentando durante meu estudo aplicado de arquiteturas de IA. Os próximos vão cobrir o loop ReAct e por que "agente = modelo + harness".*
