# Global Memory — cross-project facts

Everything here is written by the `memory-log` tool (path-locked, 6-section
format: Context / Explanation / Alternatives / Rationale / Exercises / Next
Steps). It is the durable memory that survives sessions AND projects.

## What belongs here

- `hardware/` — workstation learnings: VRAM budgets, quantization results,
  driver quirks, thermal behavior
- `lessons/` — recurring gotchas and debugging lessons
- `patterns/` — reusable design/engineering patterns
- `user-preferences.md` — preferences that apply everywhere
- `mentor/` — cross-project learning profile and rollups

## Rules

- Per-repo facts go to that repo's `docs/learning/` via `project-log` —
  NOT here. Single source of truth per fact, no duplication.
- Never log secrets (keys, tokens, `.env` content) anywhere.
- Rule of thumb: if it helps future sessions in ANY project, it is memory;
  if it helps only this repo, it is project-log.