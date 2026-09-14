---
description: Run benchmarks (GPU, model, inference, storage). Measures real numbers, records results to C:\AI-Workstation\reports\ or docs/. Never fabricates results.
agent: ai-engineer
---

Benchmark: $ARGUMENTS

Follow the cuda-pytorch and hardware skills.

1. Clarify the target: model inference (tokens/s, TTFT), PyTorch kernel/microbench, storage, or thermal.
2. Establish a baseline before optimizing: current numbers, then the change.
3. Measure, never estimate:
   - GPU: `nvidia-smi --query-gpu=temperature.gpu,power.draw,utilization.gpu,memory.used --format=csv -l 5` during the run; `nvidia-smi -q -d MEMORY` for capacity.
   - PyTorch: warm up 2-3 iterations, time N iterations, report mean/std; compare fp32/fp16/TF32 and batch sizes; `torch.compile` on/off.
   - Storage: `Get-Volume` for capacity; a real file I/O test for throughput.
4. Check VRAM tenants first (Windows apps may hold VRAM on this box).
5. VRAM timeline: record memory allocated at each phase (load, forward, backward, optimizer, eval). Use `torch.cuda.memory_allocated()`, `torch.cuda.max_memory_allocated()`. Report the peak and which phase consumed the most.
6. Record results:
   - Infra/hardware benchmarks -> `C:\AI-Workstation\reports\` (or docs/ if project-related)
   - Model benchmarks -> project `docs/` and `D:\AI\Experiments\` if applicable
   - Include: date, hardware state (temps, other tenants), versions, methodology, raw numbers, conclusions.
6. Report: methodology, results table, comparison, recommendation (FACT/INFERENCE/RECOMMENDATION).