---
description: Run dart analyze + flutter analyze, report issues with severity. Uses the flutter skill.
agent: flutter-developer
---

Analyze Flutter project for: $ARGUMENTS

1. Run `dart analyze` — report all issues.
2. Run `flutter analyze` — framework-specific checks.
3. Categorize issues: error (blocks build) / warning (potential issue) / info (style).
4. For each error: file:line, issue, suggested fix.
5. If `analysis_options.yaml` exists, note which rules are enabled.

Report: issue count by severity, top 3 issues to fix first, overall code health verdict.
