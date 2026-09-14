---
description: Implement the approved plan. Executes the plan step by step, tests after each change, reports what was done and verified.
---

Implement the approved plan for: $ARGUMENTS

If no plan exists in the conversation or in docs/, produce a short plan first and get approval before touching anything.

Execution rules:

1. Follow the plan step by step; do not skip verification steps.
2. Inspect before changing; prefer minimal changes; match existing conventions.
3. Never install a dependency without explaining why it is needed.
4. After each meaningful change: run the relevant tests and lint (pytest / uv / npm test — whatever the project uses).
5. GPU-related changes: verify VRAM usage and device placement; never assume it fits.
6. VRAM budget enforcement (if touching model code):
   - Before writing: estimate VRAM needed (weights + KV cache + activations + overhead)
   - After writing: run a quick smoke test that loads the model and runs a forward pass
   - If VRAM exceeds 14 GB (safe margin on 16 GB), STOP and report with alternatives
7. Keep large AI assets out of Git (D:\AI\ policy).
7. Report at the end:
   - What was changed (files, with purpose)
   - How each change was verified (commands run, results)
   - What was NOT done and why
   - Remaining risks

Stop after reporting; do not commit unless the user explicitly asks.