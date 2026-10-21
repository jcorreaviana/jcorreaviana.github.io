---
title: 'Sobre mim: de liderança de engenharia em escala a IA aplicada'
description: 'Minha trajetória de mais de 15 anos em tecnologia, do desenvolvimento ao BaaS e à StackSpot no ecossistema Zup/Itaú, e o que construí durante o sabático estudando IA a fundo.'
pubDate: 'Oct 21 2026'
category: 'carreira'
tags: ['carreira', 'liderança', 'fraude', 'IA aplicada', 'sabático']
---

Sou José Corrêa Viana, líder de engenharia com mais de 15 anos de experiência em desenvolvimento e gestão de tecnologia. Moro em Patos de Minas (MG) e passei a maior parte da carreira no ecossistema Zup/Itaú, liderando tecnologia em operações financeiras de grande escala. Desde abril de 2026 estou em sabático, estudando IA aplicada a fraude e construindo projetos próprios para consolidar o que já fazia na prática.

Esta página resume o que fiz, o que aprendi e onde quero chegar.

## Trajetória

**Desenvolvedor e professor (até 2020).** Comecei como desenvolvedor e analista de sistemas, dando aulas no UNIPAM em paralelo. Depois fui analista de desenvolvimento sênior no Grupo A, no SaaS Avalia (plataforma de avaliações), com C#, SQL Server e AWS, além de levantamento de requisitos e gestão de backlog.

**Zup Innovation, grupo Itaú (2020 a 2026).** Entrei como Tech Lead e cresci por Chapter Lead e Software Engineering Manager até Head of Technology. Foram cerca de 4 anos à frente da operação de BaaS (Banking as a Service) do grupo, que atendia uma carteira digital do Itaú com mais de 20 milhões de clientes. Minha responsabilidade cobria onboarding, gestão de conta, conformidade regulatória (Open Finance, KYC) e detecção de fraude e PLD. Liderei diretamente de 15 a 20 pessoas e, indiretamente, uma tribo que chegou a cerca de 150, com representação executiva junto à diretoria e à superintendência do banco.

**StackSpot (2024 a 2026).** Nos últimos dois anos migrei para a StackSpot, produto da Zup/Itaú voltado à jornada de desenvolvimento de software. Primeiro como Head do Time de Adoção, levando StackSpot EDP e StackSpot AI para dentro do Itaú, com crescimento forte de usuários ativos em AI e metas de adoção cumpridas. Depois como Head de Produto (GPM), liderando a jornada agêntica integrada aos gates de segurança e governança do banco e o realinhamento do produto ao foco do Itaú.

## O que essa trajetória me ensinou

- Em banco, fraude e conformidade não são um módulo à parte. Atravessam onboarding, conta e transação, e o desenho do dado importa tanto quanto o modelo.
- Escala muda o problema. Com milhões de clientes, o que decide é observabilidade, resiliência e a clareza de quem responde por quê.
- Adotar tecnologia dentro de uma empresa grande é mais produto e gente do que ferramenta. Agentes de IA só entram em produção quando respeitam os controles de segurança que já existem.

## O sabático: estudar de baixo para cima

Tirei esse tempo por três motivos: estar mais presente na família, cuidar da qualidade de vida e reinventar a atuação profissional com mais intenção. Usei a pausa para reconstruir, com código, o que está por baixo dos sistemas de IA que hoje usamos no dia a dia.

**Transformers e Large Data Models em dados financeiros.** Implementei arquiteturas transformer para dados tabulares em PyTorch e comparei com XGBoost em fraude. A conclusão que mais me marcou: o dataset define a arquitetura. Num dataset sintético de teste de cartão, com sinal sequencial real, o transformer chegou a 100% de recall preventivo contra 0% do baseline XGBoost. No PaySim, sem esse sinal, o XGBoost dominou. Sequência só ajuda quando existe sequência nos dados.

**Fine-tuning com LoRA.** Treinei o Qwen2.5-0.5B-Instruct localmente para extrair dados estruturados de anúncios de carros usados. No conjunto de teste, o acerto exato em `preco_anunciado` foi de 0% para 100%. Também aprendi o que não funciona: mais épocas em corpus sintético pequeno pioram o resultado em dados novos.

**RAG e agentes.** Construí um pipeline de RAG local (Ollama, ChromaDB, sentence-transformers) e o evoluí para um agente ReAct com harness de avaliação, versionamento canário e detecção de loops. Num dos testes, um falso positivo na minha própria métrica me ensinou a corrigir o teste em vez de ajustar o agente.

**bank-of-decoy.** Meu projeto principal: uma simulação de domínio PIX com quatro microsserviços (FastAPI, PostgreSQL, Kafka, Prometheus e Grafana). Serve para gerar dataset sintético de fraude, testar engenharia do caos e operar um pipeline de DevOps com agentes. Um agente preditivo local classifica sinais e abre issues, e outro implementa correções com decisão de merge por score de risco determinístico. Toda correção é validada contra sistemas reais antes de fechar.

Os estudos viram posts aqui no blog e o código fica no [GitHub](https://github.com/jcorreaviana), com a série organizada no repositório `jornada-ia`.

## Formação

Cursei todas as disciplinas dos mestrados em Engenharia Biomédica e em Engenharia de Software na UFU, sem concluir as dissertações. Inglês em nível intermediário (B1), em evolução constante pela leitura técnica.

## Onde quero chegar

Quero atuar onde liderança técnica e IA aplicada se encontram: produtos e plataformas financeiras, fraude e risco, agentes em ambientes regulados. Estou aberto a papéis de liderança, a funções de produto técnico e a modelos de atuação como consultoria.

Se algum desses temas faz sentido para o seu contexto, escreva para joscorvi@gmail.com.
