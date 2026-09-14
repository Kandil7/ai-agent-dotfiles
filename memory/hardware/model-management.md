# Centralized Model Hub — D:\AI\Models

### Context

Workstation model storage was scattered across 5+ locations (WSL HF cache, D:\AI HF cache, Ollama blobs, WSL ~/.ollama stub). Projects were downloading duplicate models because WSL and Windows couldn't see each other's caches.

### Explanation

Unified all AI models under D:\AI\Models\ with env vars in ~/.ai-env:
- HF_HOME=/mnt/d/AI/Models/HuggingFace (HF cache: bge-m3, bge-reranker, Qwen2.5)
- OLLAMA_MODELS=/mnt/d/AI/Models/Ollama (5 models: qwen3.5:9b, qwen2.5-coder:7b, qwen2.5:1.5b, nomic-embed-text, ALLaM:7b)
- TORCH_HOME=/mnt/d/AI/Models/torch
- Registry: D:\AI\Models\registry.json
- Template: D:\AI\Models\.env.template
Freed 4.2 GB from old WSL HF cache. WSL Ollama now sees the same blob storage as Windows.

### Alternatives

["Symlinks from WSL cache to D:\\AI (fragile, breaks on WSL updates)", "Docker volume mounts for model sharing (adds complexity, GPU passthrough overhead)", "Network share (SMB) for multi-machine access (latency, not needed for single workstation)"]

### Rationale (Why this?)

D:\AI\ is NTFS, accessible from both WSL (/mnt/d/) and Windows. Env vars in ~/.ai-env are sourced by bashrc for interactive shells and by .profile for login shells. All HF-compatible tools (transformers, sentence-transformers, PEFT) respect HF_HOME. Ollama respects OLLAMA_MODELS.

### Exercises

["Run 'source ~/.ai-env && python -c \"from huggingface_hub import hf_hub_download; print(hf_hub_download\\\"BAAI/bge-m3\\\", \\\"config.json\\\")\"' to verify HF cache path", "Check 'ollama list' after starting Ollama daemon to verify it sees all 5 models", "Download a new model with 'huggingface-cli download' and verify it lands in D:\\AI\\Models\\HuggingFace\\hub\\'", "Update registry.json after adding/removing models"]

### Next Steps

["Consider adding TORCH_HOME to actual usage (currently just created, empty)", "Re-download Falcon-H1-7B GGUF properly (~4 GB, current is 8 MB stub)", "Add 'uv tool install huggingface_hub' for CLI model management", "Set up automatic registry.json updates via a script"]

---
