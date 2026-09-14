---
name: evaluation
description: Model evaluation methodology. Metric selection, evaluation design, error analysis, model comparison, benchmark execution. Use when the user says "evaluate", "metrics", "accuracy", "F1", "BLEU", "error analysis", "benchmark model", "eval script", or "model quality".
---

# Model Evaluation

## Metric selection by task

- **Classification:** accuracy, F1 (macro/micro/weighted), precision, recall, confusion matrix
- **Generation:** perplexity, BLEU, ROUGE, BERTScore
- **RAG:** recall@k, MRR, faithfulness, answer relevance
- **Inference:** tokens/sec, TTFT, p50/p95 latency, VRAM usage

## Evaluation design

- Held-out test set (never used for training or validation decisions)
- Multiple runs for statistical significance
- Stratified sampling for balanced evaluation
- Edge cases: empty inputs, very long inputs, adversarial inputs

## Error analysis

- Confusion matrix breakdown
- Failure mode categorization
- Sample-level analysis (show actual failures)
- Bias detection across subgroups

## Model comparison

- Side-by-side metrics table
- Cost vs quality tradeoff
- Inference speed vs accuracy tradeoff
- VRAM footprint comparison

## Rules

- Record eval config + dataset + model version
- Save evaluation artifacts for future comparison
