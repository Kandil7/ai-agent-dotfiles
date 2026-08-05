---
description: >-
  Generate or refresh full-project documentation under docs/learning/:
  deep walkthroughs for every source file, architecture.md with mermaid
  diagrams, modules/*.md summaries, and a resumable coverage tracker at
  00-INDEX.md. Optional argument "update" refreshes only stale entries.
agent: learning
---

Activate the `document-project` skill and execute the full-project documentation
sweep for the current repository.

Instructions:

1. Load the `document-project` skill via the `skill` tool and follow its workflow.
2. Inventory the repo (exclude `.git`, `node_modules`, `.venv`, `dist`, `build`,
   lock files, generated folders, and `docs/learning` itself).
3. Bootstrap `docs/learning/` with `00-INDEX.md` (coverage tracker).
4. Architecture pass: `architecture.md` (with mermaid diagrams) + `modules/*.md`.
5. Batch pass: one directory per batch; delegate batches to the `documenter`
   subagent for parallelism; each file gets a deep walkthrough at
   `docs/learning/walkthroughs/<repo-path>.md` following the code-walkthrough
   deep-detail standard.
6. After every batch, update `00-INDEX.md` (statuses + coverage %).
7. Finish with a summary: files documented, pending, coverage %, reading order,
   and exclusions.

Mode:

- No arguments or a directory name: run the sweep from scratch, resuming from
  the first `pending` entry in `00-INDEX.md` if one exists.
- `update`: re-inventory, mark stale entries (source changed after the doc
  date), re-walk only stale files, and report the refresh.

Safety: read-only for source code. Write only under `docs/learning/` via the
`learning-log` tool. Never copy secrets. English only.
