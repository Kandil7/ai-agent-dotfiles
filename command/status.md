---
description: READ ONLY. Report the current state: git status, recent changes, tests, hardware health (GPU, disk, temperature), active processes. Modifies nothing.
agent: architect
---

Report the current state of this project and workstation:

1. **Project state**
   - Git: current branch, uncommitted changes summary (`git status`), recent commits (`git log --oneline -10`)
   - Recent changes: what was modified and why (from git diff, not guesses)
   - Test status: last known run results
   - Open TODOs / pending work (docs/ROADMAP.md, docs/PROJECT-CHECKPOINT.md if present)
   - Experiment tracking (if MLflow configured): active experiments, last 3 with key metrics, any failures

2. **Workstation health** (FACT, measured)
   - GPU: `nvidia-smi` — processes, VRAM used/free, temperature, power draw
   - Storage: system drive and D:\AI free space
   - Memory: available RAM
   - Any anomalies worth flagging (high temp, low disk, VRAM exhaustion)

3. **Summary** — is the project healthy? What needs attention next?

Format: concise structured report. Distinguish FACT (measured) from INFERENCE. End with recommended next steps.