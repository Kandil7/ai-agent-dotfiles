---
description: Run the project's tests and diagnostics. Finds the test setup, runs tests and lint, reports failures and coverage gaps.
---

Run tests and diagnostics for the project (focus: $ARGUMENTS).

1. Discover the test setup: pytest config, uv/npm scripts, CI workflow. Do not invent a test command — use what exists.
2. Run the test suite and lint/typecheck the project defines:
   - `pytest -q` (Python/uv), `npm test`, `npm run lint`, `npm run typecheck` — whichever apply.
3. Run only the relevant subset first if the full suite is slow; then attempt the full suite.
4. Report:
   - Commands run and their results (pass/fail counts)
   - Failed tests with the actual error (first failing frame)
   - Coverage gaps relevant to recent changes
   - GPU tests marked but not run in CI (run them locally if the change touches GPU code)

Do not modify any code while testing. If tests fail, diagnose the root cause and propose a fix for approval.