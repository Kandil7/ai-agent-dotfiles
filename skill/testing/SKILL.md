---
name: testing
description: Testing discipline: TDD red-green-refactor, pytest, fixtures, coverage, CI integration. Use when the user says "test", "pytest", "write tests", "unit test", "coverage", "TDD", or when the /test command is invoked.
---

# Testing Discipline

## TDD: the red-green loop

TDD is the red-green loop. This skill makes that loop produce tests worth keeping: what a good test is, where tests go, the anti-patterns, and the rules of the loop.

When exploring the codebase, read `CONTEXT.md` (if it exists) so test names and interface vocabulary match the project's domain language.

## What a good test is

Tests verify behavior through public interfaces, not implementation details. Code can change entirely; tests shouldn't. A good test reads like a specification: "user can checkout with valid cart" tells you exactly what capability exists, and it survives refactors because it doesn't care about internal structure.

## Seams: where tests go

A **seam** is the public boundary you test at: the interface where you observe behavior without reaching inside. Tests live at seams, never against internals.

**Test only at pre-agreed seams.** Before writing any test, write down the seams under test and confirm them with the user. No test is written at an unconfirmed seam. You can't test everything, so agreeing the seams up front is how testing effort lands on the critical paths and complex logic instead of every edge case.

Ask: "What's the public interface, and which seams should we test?"

## Anti-patterns

- **Implementation-coupled**: mocks internal collaborators, tests private methods, or verifies through a side channel. The tell: the test breaks when you refactor but behavior hasn't changed.
- **Tautological**: the assertion recomputes the expected value the way the code does (`expect(add(a, b)).toBe(a + b)`), so it passes by construction and can never disagree with the code. Expected values must come from an independent source of truth: a known-good literal, a worked example, the spec.
- **Horizontal slicing**: writing all tests first, then all implementation. Bulk tests verify _imagined_ behavior. Work in **vertical slices** instead: one test, one implementation, repeat — each test a **tracer bullet** that responds to what the last cycle taught you.

## Rules of the loop

- **Red before green.** Write the failing test first, then only enough code to pass it. Don't anticipate future tests or add speculative features.
- **One slice at a time.** One seam, one test, one minimal implementation per cycle.
- **Refactoring is not part of the loop.** It belongs to the review stage, not the red-green implementation cycle.

## Defaults for this workstation

- pytest for Python; match the project's existing test layout (`tests/` mirroring `src/`).
- Each test independent: fixtures for setup/teardown; no shared mutable state.
- GPU tests: mark them (`@pytest.mark.gpu`) and keep them out of the default CI path — this box has a GPU, CI does not.

## Coverage

- Aim for coverage on the paths that matter (data pipeline, inference loop, API), not a global percentage.
- Use `pytest --cov` if configured; report uncovered critical paths, not just the number.

## When testing ML code

- Determinism: seed fixtures; tests assert ranges/behavior, not exact float equality.
- Tiny synthetic data for unit tests (2-4 samples) — never the full dataset.
- For training: assert shapes, dtype, device placement, and that loss decreases on a toy overfit test (1 batch repeated).
- For RAG/serving: test chunking, retrieval correctness (known query -> known doc), and the API contract with a small local model.

## Verify

- Run the full suite (`pytest -q`) after every change that touches code; never claim "tests pass" without running them.
