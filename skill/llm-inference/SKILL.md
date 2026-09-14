---
name: llm-inference
description: LLM inference on the RTX 5000 16GB. Use when the user says "run a model", "serve an LLM", "vLLM", "Ollama", "GGUF", "quantization", "KV cache", "inference speed", or picking a model that fits in 16GB VRAM.
---

# LLM Inference on 16 GB VRAM

## Fit check before choosing a model

Compute the full budget: weights + KV cache + activations + runtime overhead.

| Model size | FP16 | 4-bit (GGUF/AWQ/GPTQ) |
|---|---|---|
| 1B | ~2 GB | ~0.7 GB |
| 3B | ~6 GB | ~2 GB |
| 7B | ~14 GB (alone) | ~4 GB + runtime |
| 13B | does not fit | ~7 GB + runtime |

KV cache: ~2 bytes per token per layer per attention head pair. For long contexts (32k+), KV cache can exceed 8 GB alone — check before promising a context length.

## Serving options on this box

- **Ollama** — fastest to start, GGUF, good for local quick tasks; check `ollama ps` for VRAM.
- **vLLM** — high-throughput serving; verify sm_75 support for the chosen backend/flash attention.
- **transformers + accelerate** — most flexible; use `device_map="auto"` with CPU offload if needed (slower).
- **llama.cpp / llama-server** — GGUF, good CPU+GPU offload control.

## Benchmarking before relying on a model

- Measure tokens/sec and time-to-first-token at the context length you actually need.
- Check VRAM with `nvidia-smi` while serving (report other tenants).
- Test a long-context prompt — memory peaks at the longest input, not the average.

## Rules

- Never assume a model fits from file size alone.
- Prefer 4-bit quantization to fit + runtime headroom on this GPU.
- Record model name, quant, context length, t/s, VRAM in the report.
- Large model files go to `D:\AI\Models\` — never into a Git repo.