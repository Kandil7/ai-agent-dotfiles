---
description: Run Flutter tests (unit, widget, integration), report coverage and failures. Uses the flutter-testing skill.
agent: flutter-developer
---

Run Flutter tests for: $ARGUMENTS

1. Run `dart analyze` first — report all issues before testing.
2. Run `flutter test --coverage` — unit and widget tests.
3. If integration tests exist in `integration_test/`, run `flutter test integration_test/`.
4. Report: tests passed/failed, coverage %, uncovered lines.
5. If any test fails: show the failure, trace to the broken code, suggest fix.

Format: concise structured report. Label FACT (verified) vs INFERENCE (suspected). End with verdict: all green or specific failures to fix.
