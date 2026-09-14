---
name: vector-db
description: Vector databases for RAG. Qdrant, Chroma, FAISS, pgvector selection and operations. Use when the user says "vector database", "vector db", "qdrant", "chroma", "faiss", "pgvector", "embeddings store", or "index embeddings".
---

# Vector DBs on this workstation

## Selection matrix

| Engine | When to pick |
|---|---|
| FAISS | In-process, fastest to prototype, single-machine, no server needed |
| Chroma | Simple persistence + metadata filters, embedded, great default for local RAG |
| Qdrant | Self-host via Docker (ask-gated), scalable, rich filtering + payload indexes |
| pgvector | A Postgres instance already exists in the stack |

## Persistence policy

- Indexes/collections persist under `D:\AI\VectorDB\<project>\` — never in Git, never bloating the WSL VHDX.
- Store BESIDE the index: embedding model name+revision, dimension, distance metric, chunking params, build date.
- Dimension mismatch between embedder and collection fails silently at worst / errors cryptically at best — assert dim at startup.

## Operational rules

- Metadata filters beat post-filtering: design payloads (source, section, date, acl) at ingestion time.
- Hybrid search (BM25 + dense) measurably improves RAG recall — consider it before tuning chunk sizes.
- Index binaries are disposable IF the rebuild is scripted: document the exact rebuild command next to the data.
- Scale check: FAISS flat is fine up to ~1M vectors; beyond that use IVF/HNSW (FAISS) or move to Qdrant.

## Rules

- Every index records provenance: which embedder, which chunker, which source snapshot.
- Benchmark recall@k on a small golden set BEFORE trusting any index migration.
