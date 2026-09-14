---
description: Resume the last session: read checkpoint, recent session logs, git state, pending experiments. Fast context recovery.
agent: architect
---

Recover context fast:

1. Read `docs/PROJECT-CHECKPOINT.md` if present (pending tasks, known issues, next step).
2. Read the most recent 1-2 files in `docs/learning/sessions/`.
3. Git state: `git status -sb` and `git log --oneline -5`.
4. Check `docs/experiments/` (if present) for the latest entries and any marked incomplete or pending.
5. Synthesize: what was being worked on, what is pending, what was blocked.

Report: 8 lines max. End with "Recommended continuation: <one concrete action>".

Format: distinguish FACT (from files/git) from INFERENCE (your synthesis).
