---
description: >-
  Generate or refresh full-project documentation under docs/learning/:
  deep walkthroughs for every source file, architecture.md with mermaid
  diagrams, modules/*.md summaries, and a resumable coverage tracker at
  00-INDEX.md. Optional argument "update" refreshes only stale entries.
---

Execute the full-project documentation sweep for the current repository.

## Sweep

1. Inventory the repo (exclude `.git`, `node_modules`, `.venv`, `dist`,
   `build`, lock files, generated folders, and `docs/learning` itself).
2. Bootstrap `docs/learning/` with `00-INDEX.md` (coverage tracker:
   file -> status new/updated/stale/archived -> link).
3. Architecture pass: `architecture.md` (with mermaid diagrams) +
   `modules/*.md`, written via `project-log`.
4. Batch pass: one directory per batch; delegate batches to the `documenter`
   subagent; each source file gets a deep walkthrough at
   `docs/learning/walkthroughs/<repo-path>.md` via `project-log` (Context,
   Explanation, Alternatives, Rationale, Exercises, Next Steps).
5. After every batch, update `00-INDEX.md` (statuses + coverage %).
6. Finish with a summary: files documented, pending, coverage %, reading
   order, and exclusions.

## Modes

- No arguments: run the sweep from scratch, resuming from the first `pending`
  entry in `00-INDEX.md` if one exists (resumable — safe to stop anytime).
- `update`: re-inventory, mark entries stale when the source changed after the
  doc date, re-walk only stale files, report the refresh.
- `node scripts/check-docs-drift.js` in the repo can drive `update` from CI.

## Safety

Read-only for source code. Write only under `docs/learning/` via `project-log`.
Never copy secrets. Do not commit anything.