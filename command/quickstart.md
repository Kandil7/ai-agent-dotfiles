---
description: Morning quickstart: git status, hardware health, yesterday's session, today's priorities. One command to start the day.
agent: architect
---

Morning startup sequence:

1. **Git status** — branch, uncommitted changes, recent commits (`git status`, `git log --oneline -5`)
2. **Hardware check** — GPU health, VRAM tenants, disk space (`nvidia-smi`, `Get-Volume`)
3. **Yesterday** — read the last session log from `docs/learning/sessions/` (most recent file)
4. **Project state** — read `docs/PROJECT-CHECKPOINT.md` if it exists (pending tasks, known issues)
5. **Today's priorities** — synthesize: what needs attention first?

Report: concise morning briefing. 5 lines max. End with "Recommended first action."

Format: concise structured report. Distinguish FACT (measured) from INFERENCE.
