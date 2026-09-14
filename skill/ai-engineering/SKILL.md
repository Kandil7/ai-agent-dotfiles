---
name: ai-engineering
description: General AI engineering workflow for this workstation. Use when building AI/ML systems with PyTorch, Transformers, PEFT, RAG, or agents — planning memory budgets, choosing model sizes, structuring training/inference code on the RTX 5000 16GB.
---

# AI Engineering on the RTX 5000 (16 GB VRAM)

## Memory budgeting (never guess from file size)

Budget = weights + optimizer states + gradients + KV cache + activations + runtime overhead.

Rough numbers for a 7B model:
- FP16 weights: ~14 GB — does not fit with anything else.
- 4-bit (QLoRA): ~4 GB weights; leaves room for adapters, KV cache, activations.
- 3B FP16: ~6 GB; usable for inference with a moderate context.
- 1-2B / 8B quantized: comfortable for embeddings + RAG + local experiments.

Rule of thumb: leave 1.5-2 GB headroom for CUDA context and PyTorch overhead.

## Toolkit (already installed, do not reinstall)

- Python via `uv` (prefer `uv run`, `uv add`, `uv sync`).
- PyTorch 2.11.0+cu128, CUDA 12.9 runtime, driver 576.88.
- Turing sm_75: bf16 has no native tensor-core path on this GPU; fp16/FP32 are the safe default. Verify claims about bf16 speedups before relying on them.

## Structure for every AI project

```
project/
├── data/               # small/sample data only; real data in D:\AI\Datasets
├── src/ or model/      # code
├── experiments/        # run configs, logs, results
├── docs/
│   ├── ARCHITECTURE.md
│   ├── DECISIONS.md
│   ├── CURRENT-STATE.md
│   ├── PROJECT-CHECKPOINT.md
│   └── ROADMAP.md
└── .gitignore          # excludes D:\AI paths, checkpoints, .env
```

## Golden rules

- Reproducibility: set seeds, record dtypes/device/library versions in every experiment.
- Device placement: build on `device = "cuda" if torch.cuda.is_available() else "cpu"`, never hardcode.
- Move large tensors to CPU before `torch.cuda.empty_cache()`; never call it per-iteration.
- Prefer existing working infrastructure; benchmark before optimizing.