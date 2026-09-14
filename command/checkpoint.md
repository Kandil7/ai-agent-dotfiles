---
description: Generate or refresh docs/PROJECT-CHECKPOINT.md — durable project state for recovery after session compaction.
---

Generate `docs/PROJECT-CHECKPOINT.md` for this project. Create the docs/ directory first if it does not exist.

Inspect the project and write the checkpoint containing:

- **Project**: name, purpose, root path, last checkpoint date
- **Current architecture**: components and how they connect (concise; reference docs/ARCHITECTURE.md if it exists)
- **Current implementation**: what is working right now
- **Completed tasks**: what was finished (recent, with dates)
- **Pending tasks**: what is next, in priority order
- **Known bugs / issues**: open problems with symptoms and suspected cause
- **Decisions made**: key decisions and rationale (reference docs/DECISIONS.md)
- **Dependencies**: core deps with pinned versions, and any version assumptions (CUDA 12.9, PyTorch 2.11.0+cu128, sm_75)
- **Commands used**: the exact commands that work for this project (test, lint, run, train, serve)
- **Next steps**: the immediate next actions

Verification: the document must be complete enough that a fresh session could continue the project from it without the conversation history. If anything is unclear, mark it UNKNOWN rather than guessing. Do not commit unless asked.