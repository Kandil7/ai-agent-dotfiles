---
description: Migrate models between formats: quantize, convert (PyTorch to ONNX to TensorRT), optimize. Benchmarks before and after. Reports quality impact.
agent: ai-engineer
---

Migrate: $ARGUMENTS

Follow the ai-engineering, cuda-pytorch, and model-compression skills.

## Mode

- `quantize <model>`: quantize to target precision (INT8, INT4, GPTQ, AWQ).
- `convert <model> to <format>`: convert between formats (ONNX, TensorRT, GGUF).
- `optimize <model>`: apply optimizations (torch.compile, operator fusion).
- `profile <model>`: profile model for optimization opportunities.

## Pre-flight

1. Identify source model: path, format, current precision.
2. Check VRAM: will the conversion process fit in 16 GB?
3. Benchmark the source model first (baseline).

## Execute

1. Run the conversion with appropriate library (optimum, onnxruntime, tensorrt).
2. Verify the converted model loads and produces valid output.
3. Benchmark the converted model.
4. Compare: metrics, VRAM usage, inference speed, model size.

## Report

- Source vs target: format, precision, size, speed, quality metrics.
- Quality impact: accuracy loss from quantization (if applicable).
- RECOMMENDATION: is the migration worth the quality tradeoff?

## Rules

- Always benchmark before and after - never assume quantization is free.
- Keep the original model until the converted version is verified.
- Large models: convert on CPU if VRAM is insufficient for the conversion process.
- sm_75 (Turing): verify kernel compatibility before adopting new compression libraries.
