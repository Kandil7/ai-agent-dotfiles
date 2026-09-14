---
name: huggingface
description: Hugging Face ecosystem. Transformers, datasets library, HF Hub, from_pretrained, model cards. Use when the user says "huggingface", "transformers", "HF hub", "datasets library", "from_pretrained", or mentions pulling/pushing models.
---

# Hugging Face on this workstation

## Cache and storage policy

- Model/dataset caches are LARGE. Point them at D:\ per the storage policy:
  - Windows: set `HF_HOME=D:\AI\HuggingFace` before running Python.
  - WSL: `export HF_HOME=/mnt/d/AI/HuggingFace`.
- Audit cache size: `huggingface-cli scan-cache` (or `uv run huggingface-cli scan-cache`).

## Loading models (RTX 5000 16 GB, sm_75)

- Always pass explicit `torch_dtype=torch.float16` — bf16 has no tensor-core path on Turing.
- Big models: `device_map="auto"` + `max_memory={0: "12GiB"}` to reserve headroom for KV cache.
- Offline/reproducible runs: `local_files_only=True` after first download.
- Verify what actually loaded: `model.hf_device_map`, `torch.cuda.memory_allocated()`.

## Datasets

- Large datasets: use streaming (`load_dataset(..., streaming=True)`) instead of full download when possible.
- Record dataset version/revision hash with experiment configs.
- Processed datasets live in `D:\AI\Datasets\`; keep only samples in the repo.

## Hub etiquette

- Auth via `huggingface-cli login` token store — never put tokens in code or env files in repos.
- Publishing a fine-tune requires a model card: intended use, training data summary, eval numbers, hardware notes.
- Pin versions in experiments: `transformers.__version__`, model revision hash.

## Rules

- Never assume a checkpoint fits 16 GB from file size alone — budget weights + KV cache + activations.
- Gated models: confirm access exists BEFORE planning a pipeline around them.
