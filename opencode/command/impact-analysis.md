---
description: >-
  Blast-radius analysis before a refactor or risky change:
  docs/learning/design/impact-<change>.md — what touches what, risk ranking,
  test strategy. Run BEFORE touching code. $ARGUMENTS = change name (e.g.
  "rename-service-to-repository").
agent: learning
---

Analyze the impact of the planned change.

Instructions:

1. Load the `impact-analysis` skill and follow its workflow.
2. Identify the change: $ARGUMENTS or ask the learner ("what are you about to
   change?"). Map what touches it: imports, callers, tests, docs, config.
3. Write the analysis via `learning-log` →
   `design/impact-<change>.md`:
   - Change: what will actually be modified
   - Affected: files/modules that depend on it (search the repo for real
     references, don't guess)
   - Risks: ranked (high/med/low) with reasons
   - Test strategy: what must still pass, what new tests are needed
4. Reply with a 5-line summary: affected count, top risk, test strategy.
5. Stop there — this is analysis, not implementation. The learner decides
   whether to proceed.

Tone: precise and neutral — the goal is fewer surprises, not fewer changes.
