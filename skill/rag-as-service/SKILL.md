---
name: rag-as-service
description: "Production RAG pipelines. Use when the user says 'RAG service', 'retrieval API', 'RAG pipeline', 'chunking strategy', 'RAG evaluation', or 'RAG production'."
---

# RAG as a Service

## Architecture

```
Client -> API Gateway -> RAG Service
  -> Query Processing (rewrite, expand)
  -> Retrieval (vector + BM25 hybrid)
  -> Reranking
  -> Context Assembly
  -> LLM Generation
  -> Response + Citations
```

## Ingestion pipeline

```
Documents -> Chunking -> Embedding -> Vector Store
                                 -> Metadata Store (chunk -> source, page, section)
```

### Chunking strategies

| Strategy | When | Size |
|----------|------|------|
| Fixed-size | Simple docs | 512 tokens, 50 overlap |
| Semantic | Structured docs | Split at topic boundaries |
| Recursive | General purpose | Split by paragraphs, then sentences |
| Document-aware | PDFs, articles | Respect headings, sections |

## API endpoint design

```python
@app.post("/rag/query")
async def query(request: RAGRequest):
    # 1. Query processing
    expanded = await expand_query(request.query)
    
    # 2. Hybrid retrieval
    vector_results = await vector_store.search(embedding, k=20)
    bm25_results = await bm25_index.search(request.query, k=20)
    merged = reciprocal_rank_fusion([vector_results, bm25_results])
    
    # 3. Rerank
    reranked = await reranker.rerank(request.query, merged[:10])
    
    # 4. Generate
    response = await llm.generate(
        prompt=build_prompt(request.query, reranked),
        stream=request.stream,
    )
    
    return RAGResponse(
        answer=response.text,
        sources=[c.source for c in reranked],
        confidence=compute_confidence(reranked),
    )
```

## Evaluation

| Metric | What it measures |
|--------|-----------------|
| `recall@k` | Are relevant docs retrieved? |
| `MRR` | How high are relevant docs ranked? |
| `faithfulness` | Does the answer match the context? |
| `answer_relevance` | Does the answer address the query? |
| `context_relevance` | Is the retrieved context useful? |

## Monitoring

- Track: query latency, retrieval latency, generation latency
- Log: queries, retrieved chunks, generated answers, user feedback
- Alert: on high latency, low confidence scores, retrieval failures
- Cost: track tokens per query, embedding calls, reranker calls

## Pitfalls

- No chunk overlap (context lost at boundaries)
- Not reranking retrieval results (hybrid needs reranking)
- Missing citation (answer without source is hallucination-prone)
- Not evaluating retrieval quality (garbage in, garbage out)
- Ignoring chunk metadata (needed for source attribution)
