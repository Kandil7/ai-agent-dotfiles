---
name: cuda-pytorch
description: CUDA and PyTorch rules for the RTX 5000 (sm_75, 16GB) on WSL2 Ubuntu 24.04. Use when the user says "benchmark PyTorch", or for CUDA kernels, GPU memory issues, torch.compile, mixed precision, GPU diagnostics, or OOM debugging.
---

# CUDA / PyTorch on RTX 5000 + WSL2

## Facts (do not re-derive)

- GPU: Quadro RTX 5000, Turing, sm_75, 16 GB VRAM.
- Driver 576.88 (Windows), CUDA 12.9 runtime visibility, PyTorch 2.11.0+cu128.
- From WSL2, `nvidia-smi` works; the GPU is shared with Windows — report other processes' VRAM use before blaming your own run.
- WSL2 GPU memory is not capped by `.wslconfig`; VRAM is physical.

## Diagnostics (run before optimizing anything)

```bash
nvidia-smi                     # processes, VRAM, temperature
nvidia-smi -q -d MEMORY        # memory details
python -c "import torch; print(torch.cuda.get_device_name(0)); print(torch.cuda.get_device_capability(0)); print(torch.__version__)"
```

## Benchmarking pattern

- Warm up 2-3 iterations, then time N iterations; report mean and std.
- Compare: fp32 vs fp16 vs TF32; batch sizes; `torch.compile` on/off.
- Watch `nvidia-smi` during the run: utilization, power draw, temperature.
- Record results in `C:\AI-Workstation\reports\` or `docs/`; never fabricate numbers.

## Memory playbook (OOM debugging)

1. `torch.cuda.memory_summary()` — where did it go?
2. Reduce batch size / sequence length first (cheapest fix).
3. Mixed precision: `torch.autocast("cuda", dtype=torch.float16)` — on sm_75 prefer fp16 over bf16.
4. `torch.compile` — can cut memory and speed up; verify per-model (Turing has limits).
5. Gradient checkpointing for training (trade compute for memory).
6. Offload tensors to CPU when idle; `del` large intermediates; only then `torch.cuda.empty_cache()`.
7. Kernel-level: pin memory, avoid per-step host syncs, use `channels_last` for conv models.

## Debugging CUDA errors

- Read the full traceback; `CUDA out of memory` vs `illegal memory access` need different fixes (alloc vs kernel bug).
- `illegal memory access`: suspect index errors, shape mismatches, stale CUDA graphs — rerun with `CUDA_LAUNCH_BLOCKING=1` for the first failing kernel.
- Never call `nvidia-smi`-style tools from inside a GPU-bound Python loop.

## Verify claims

Check the library's docs/release notes for sm_75 support before adopting a new kernel library (e.g., flash-attention support on Turing).