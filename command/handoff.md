---
description: Compact the current conversation into a handoff document for another agent/session. Saves to OS temp directory.
argument-hint: "What will the next session be used for?"
---

Write a handoff document summarising the current conversation so a fresh agent can continue the work.

Include:
1. **Goal** — what the user was trying to accomplish
2. **Progress** — what has been done, what decisions have been made
3. **Current state** — what is pending, what was last said
4. **Blockers** — anything preventing progress
5. **Artifacts** — paths to specs, plans, ADRs, session logs (reference by path, don't duplicate)
6. **Suggested skills** — which skills the next agent should load
7. **Suggested next step** — the concrete first action

Save to `$env:TEMP\HANDOFF-<topic>-<date>.md` (Windows) or `/tmp/HANDOFF-<topic>-<date>.md` (WSL).

Redact secrets. Keep under 500 words. This is a pointer, not a transcript.
