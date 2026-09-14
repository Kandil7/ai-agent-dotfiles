---
description: Build or evaluate a RAG pipeline: ingestion, chunking, retrieval, generation, eval. Uses rag-as-service skill.
agent: automation-engineer
---

Build/evaluate RAG pipeline for: $ARGUMENTS

Follow the rag-as-service skill:

1. Define document sources and formats.
2. Choose chunking strategy: fixed-size, semantic, recursive, document-aware.
3. Choose embedding model and vector store.
4. Design retrieval: vector-only or hybrid (vector + BM25).
5. Add reranking if needed.
6. Design API endpoint: query processing, retrieval, generation, citation.
7. Set up evaluation: recall@k, faithfulness, answer relevance.
8. Set up monitoring: latency, costs, quality scores.

Report: architecture diagram (text), chunk config, retrieval strategy, API spec, eval metrics, monitoring plan.
