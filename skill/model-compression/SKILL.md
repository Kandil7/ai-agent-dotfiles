---
name: model-compression
description: Model compression and optimization. Quantization (GPTQ, AWQ, GGUF, BitsAndBytes), pruning, distillation, ONNX export, TensorRT. Use when the user says "quantize", "compress", "optimize model", "ONNX", "TensorRT", "prune", "distill", "GGUF", "GPTQ", or "AWQ".
---

# Model Compression

## Quantization methods

- **GPTQ:** post-training quantization, good for GPU inference
- **AWQ:** activation-aware, preserves quality better
- **GGUF:** CPU+GPU hybrid, good for llama.cpp/Ollama
- **BitsAndBytes:** INT4/INT8 for training and inference

## VRAM savings (7B model)

- FP16: ~14 GB
- INT8: ~7 GB
- INT4: ~4 GB

## Export formats

- **ONNX:** cross-platform, good for CPU inference
- **TensorRT:** NVIDIA-optimized, best GPU performance (sm_75 supported)
- **TorchScript:** PyTorch native, limited optimization

## Quality validation

- Benchmark perplexity before/after quantization
- Test on representative tasks
- Measure inference speed improvement
- Check VRAM usage reduction

## sm_75 constraints (Turing)

- bf16 has no native tensor-core path; use fp16/FP32
- TensorRT supports sm_75; verify kernel compatibility
- torch.compile works but has limits on Turing

## Rules

- Always validate quality after compression
- Record quantization config and quality metrics
- Test on actual hardware before deploying
- Keep original model for comparison
- Benchmark before and after — never assume quantization is free
