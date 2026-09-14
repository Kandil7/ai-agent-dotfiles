---
description: >-
  Record a performance investigation: docs/learning/performance/profiling-<area>.md —
  measurements, bottlenecks, fixes tried, results. Use when profiling,
  optimizing, or debugging slowness. $ARGUMENTS = area name (e.g. "queries").
agent: learning
---

Log the performance investigation.

Instructions:

1. Load the `profiling-notes` skill and follow its workflow.
2. Scope: $ARGUMENTS (e.g. "queries", "startup", "rendering") or ask what is
   slow. Establish a baseline measurement BEFORE changes if possible.
3. Write the notes via `learning-log` →
   `performance/profiling-<area>.md`:
   - Baseline: measurements with the tool/command used (numbers, not vibes)
   - Bottlenecks: what profiling found, ranked
   - Fixes: what was tried (or is planned) and the measured effect
   - Open questions: what is still unexplained
4. Reply with a 3-line summary: baseline, top bottleneck, next step.
5. Update `00-INDEX.md` if the performance folder is listed there.

Tone: measurement-first — every claim needs a number or a date.
