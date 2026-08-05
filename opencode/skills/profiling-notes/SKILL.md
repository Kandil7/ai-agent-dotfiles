---
name: profiling-notes
description: >-
  Document performance work: hot paths, benchmarks with dates and commands,
  bottlenecks, and recommendations in docs/learning/performance/profiling-<area>.md.
  Use when optimizing, when asked "why is this slow", or to keep a benchmark
  history so regressions are visible.
---

# Skill: profiling-notes

## Purpose

Performance work only pays off if it is **measured and remembered**. This
skill captures where time goes, what the numbers were, and what to do next —
so future sessions see the history instead of re-profiling from scratch.

---

## When to Use

Use this skill when:

- The user says "the app is slow" or "why does X take so long".
- Running a profiler/benchmark (cProfile, py-spy, pytest-benchmark, k6,
  `time`, browser DevTools).
- Optimizing a hot path and wanting before/after numbers.
- Keeping a benchmark history for regression detection.

---

## Inputs

- The area under investigation (module, endpoint, pipeline stage).
- Benchmark/profiler output (commands used + results).
- Optional: target metric (latency, throughput, memory, tokens).

---

## Outputs

`docs/learning/performance/profiling-<area>.md` via `learning-log`:

1. **Goal & metric** — what is being measured and why.
2. **How to reproduce** — exact commands (profiler flags, load tool, dataset
   size) so the benchmark is repeatable.
3. **Baseline** — measured numbers with date and environment.
4. **Hot paths** — top time consumers with file:line and share of total.
5. **Findings** — why they are hot (N+1, sync I/O, re-computation, token bloat).
6. **Changes & results** — each optimization: what changed, before → after,
   date (append over time).
7. **Recommendations** — next candidates with expected impact and effort.

---

## Step-by-Step Workflow

1. **Establish the metric** — ask what "slow" means; pick a measurable target.
2. **Measure first** — run the profiler/benchmark (bash with user confirmation
   where needed); record the exact command + environment.
3. **Identify hot paths** — from the output; locate them in code.
4. **Explain why** — connect hotspots to causes (read the code paths).
5. **Write the doc** — `learning-log` → `performance/profiling-<area>.md`
   (append new entries for later benchmark runs — the file becomes a history).
6. **Suggest next steps** — propose 1–2 optimizations; offer `impact-analysis`
   before changing anything, and `decision-rationale` if trade-offs exist.

---

## Notes

- Never benchmark without recording the command: numbers without reproduction
  are noise.
- Note environment (CPU, data size, concurrency) — it changes conclusions.
- When a change lands, re-run the same command and append the before/after —
  this is how the doc proves value.
