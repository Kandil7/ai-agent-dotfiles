---
name: rag
description: RAG system design and implementation on this workstation. Use when the user says "build a RAG system", "retrieval", "embeddings", "vector database", "chunking", "hybrid search", or "RAG evaluation".
---

# RAG on the RTX 5000 (local-first)

## Architecture checklist

1. **Ingestion**: loaders (PDF, markdown, code, web) -> cleaning -> chunking.
2. **Chunking**: semantic-aware (sections/headers) over fixed-size; sizes 256-1024 tokens with overlap 10-20%.
3. **Embeddings**: run locally on the RTX 5000 (e.g. small embedding models, 0.5-1.5 GB) for privacy-sensitive data; record the embedding model + dims.
4. **Vector store**: Chroma / Qdrant / FAISS / Milvus. FAISS is fine for static corpora; Qdrant/Chroma for CRUD + metadata filters.
5. **Retrieval**: hybrid (vector + BM25/keyword), re-ranking, metadata filters, top-k tuning.
6. **Generation**: LLM with retrieved context; strict prompt: "answer only from context".
7. **Evaluation**: recall@k, MRR, faithfulness — measure, do not eyeball.

## Local-first design (this workstation)

- Embeddings and reranking run locally on the RTX 5000 (16 GB fits embedding + reranker + small generator).
- Generation: local 7B-8B quantized for privacy; frontier model via API for quality when privacy allows.
- Documents and indexes belong in `D:\AI\` (datasets + checkpoints), not in Git.

## Common failure modes

- Chunk boundary breaks context (use overlapping semantic chunks).
- Retrieval returns wrong but similar content (add reranker, metadata filters, or both).
- Embedding model mismatch between index-time and query-time — pin the model.
- Index drift: re-embed when source documents change; version the index.
- Hallucinated citations: require the generator to quote from retrieved passages only.

## Verify

- Build a small eval set (20-50 queries with known answers) and measure recall@k + answer faithfulness before scaling.