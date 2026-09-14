---
description: Debug an issue systematically using the gated diagnosis loop. Reproduce, build feedback loop, hypothesize, instrument, fix, verify.
---

Debug: $ARGUMENTS

Follow the debugging skill diagnosis loop:

1. **Build a feedback loop** — the critical phase. Get a tight, red-capable signal for the bug before anything else. 10 ways to construct one: failing test, curl script, CLI invocation, headless browser, trace replay, throwaway harness, fuzz loop, bisection, differential, HITL script.
2. **Reproduce + minimise** — shrink to smallest scenario that still goes red. Every remaining element must be load-bearing.
3. **Hypothesise** — 3-5 ranked, falsifiable hypotheses. Show to user before testing.
4. **Instrument** — change one variable at a time, tag logs with `[DEBUG-xxxx]`. GPU: `CUDA_LAUNCH_BLOCKING=1`, `torch.cuda.memory_summary()`, check `nvidia-smi` for VRAM tenants.
5. **Fix + regression test** — write regression test before fix (if correct seam exists). Smallest possible change.
6. **Cleanup** — remove all `[DEBUG-...]` instrumentation, delete throwaway prototypes, state the correct hypothesis in commit message.

Rules: never random-fix; never reinstall a working dependency; if no root cause after ~15 minutes, stop and re-read the failing code end-to-end. Report: root cause (FACT vs INFERENCE), fix applied, how it was verified.
