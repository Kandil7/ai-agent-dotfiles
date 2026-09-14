# Ollama GPU detection crash on RTX 5000 + driver 580.92

### Context

User wanted to use Ollama qwen2.5-coder:7b as local model in opencode coding agent. Windows Ollama 0.32.15 installed, model loads and runs on CPU (~9.5 tok/s). GPU inference broken.

### Explanation

FACT: Ollama 0.32.15 crashes 0xc0000005 (access violation) when running `llama-server --list-devices` for ALL backends: cuda_v12, cuda_v13, rocm_v7_1, vulkan. Confirmed via `%LOCALAPPDATA%\Ollama\server.log`. Removing OLLAMA_LLM_LIBRARY and OLLAMA_VULKAN env vars (set by user earlier) did not fix it. Ollama 0.32.15 IS the latest release (verified via GitHub API and winget). WSL-side Ollama: binary was corrupted (missing ELF section headers), reinstall times out on Egyptian bandwidth. `nvidia-smi` works fine in both Windows and WSL; Docker GPU passthrough works in WSL. The crash is in Ollama's llama-server binary GPU enumeration, not in the CUDA driver or GPU hardware itself. Additionally: qwen2.5-coder:7b does NOT support structured tool_calls via Ollama — it outputs them as plain text in the content field, breaking opencode's agent loop. Config set tool_call: false; model works for text/code generation only.

### Alternatives

1. Update Ollama — 0.32.15 is latest, no fix available. 2. WSL Ollama — corrupted install, bandwidth blocks reinstall. 3. Download llama3.1:8b or qwen3:8b — proper tool calling but ~4.7GB download slow on Egyptian bandwidth. 4. Use as small_model only — practical fallback. 5. Direct llama.cpp with CUDA — bypasses Ollama entirely, worth trying when bandwidth allows.

### Rationale (Why this?)

The GPU crash is an Ollama 0.32.15 + RTX 5000 + driver 580.92 incompatibility. The binary-level crash (0xc0000005) across ALL backends including Vulkan (which doesn't depend on CUDA) suggests a bug in Ollama's GPU enumeration code, not a driver issue. Wait for Ollama update or try llama.cpp directly.

### Exercises

1. When Ollama updates (check `ollama --version` periodically), retest GPU detection. 2. Try `llama.cpp` with CUDA directly — smaller download, bypasses Ollama's broken enumeration. 3. Download llama3.1:8b when bandwidth allows — proper tool calling support. 4. Monitor nvidia-smi during Ollama inference to confirm GPU placement when fixed.

### Next Steps

GPU fix deferred until Ollama releases a fix or bandwidth allows WSL reinstall. Local model usable for text/code generation only (no agent tool calls). Hosted model remains primary for agent work.

---
