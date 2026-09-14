---
description: End-of-day wrapup: checkpoint project state, log session, show what was accomplished. One command to close the day cleanly.
---

Wrap up this session: $ARGUMENTS

1. **Session log** — capture what was done, learned, and what's next (same as `/session-log` but automated)
2. **Project checkpoint** — refresh `docs/PROJECT-CHECKPOINT.md` (same as `/checkpoint`)
3. **Retrospective** — read `.opencode/RETRO-METRICS.md` if it exists, then answer:
   - What approach worked best this session?
   - What would you do differently?
   - Any new patterns or lessons to remember?
   Store the retrospective in context-store: `context-store write --id "retro_<date>_<topic>" --content "<lessons learned>" --reported_by "wrapup"`
4. **Summary** — show: files changed, tests passed, experiments logged, space used
5. **Tomorrow's first step** — based on pending tasks, what should be done first tomorrow?

Do not commit or push. Report the summary and next step.

Rules: distinguish FACT (measured) from INFERENCE. Modify nothing except session log and checkpoint files.
