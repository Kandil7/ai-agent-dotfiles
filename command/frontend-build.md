---
description: Build and test frontend: typecheck, lint, test, build, analyze bundle size.
agent: fullstack-developer
---

Build frontend for: $ARGUMENTS

1. Run TypeScript typecheck (`tsc --noEmit` or `next lint`).
2. Run linter (ESLint).
3. Run tests (Jest/Vitest).
4. Run production build.
5. Analyze bundle size if configured.
6. Report: type errors, lint warnings, test results, build output path, bundle size.

Format: structured report. End with verdict: ready to deploy or issues to fix.
