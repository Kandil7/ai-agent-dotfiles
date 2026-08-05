---
name: teach-mode
description: >-
  Turn any topic (RAG, FastAPI, agents, vector DBs, etc.) into a structured
  curriculum: introduction, 3 progressive levels, 3-5 exercises per level, and a
  check of understanding. Logs to docs/learning/curricula/curriculum-<topic>.md.
---

# Skill: teach-mode

## Purpose

Convert any topic into a **structured multi-level curriculum** with exercises,
so learning happens in steps rather than in one overwhelming dump.

This skill is **pedagogy-first**: scaffolding, progressive difficulty, and verification.

---

## When to Use

Use this skill when:

- The user wants to learn a topic from scratch ("علمني RAG من الصفر").
- The user wants a study plan for a subject (LLM APIs, Docker, MLOps...).
- A `session-to-curriculum` output should be expanded into a full course.
- The user asks for a refresher at a specific level.

---

## Inputs

- The topic (e.g., "Agentic RAG", "FastAPI streaming").
- Optional:
  - Current level (beginner / intermediate / advanced).
  - Goal (job-ready, project support, interview prep).
  - Time budget (e.g., 2 weeks).

---

## Outputs

A curriculum document saved under `docs/learning/` via the `learning-log` tool:

- `docs/learning/curricula/curriculum-<topic>.md`

Sections:

1. Overview & prerequisites
2. Level 1 – Foundations (concepts + examples + 3–5 exercises)
3. Level 2 – Application (build something in the repo + exercises)
4. Level 3 – Advanced (trade-offs, production concerns + exercises)
5. Checkpoint / quiz questions
6. Sources and next topics

---

## Step-by-Step Workflow

1. **Clarify the topic and level**
   - Ask about current level, goal, and time budget.

2. **Map the topic to the repo**
   - Find where this topic already appears in the project (modules, files, configs).
   - Ground every lesson in real project files, not generic examples.

3. **Write the outline**
   - Overview, then 3 levels with clear outcomes per level.

4. **Write lessons with exercises**
   - For each level: explanation (simple → deep), a worked example from the repo,
     3–5 hands-on exercises (tests, refactors, extensions, diagrams).

5. **Add a checkpoint**
   - 5–10 quiz questions per level to verify understanding.

6. **Log the curriculum**
   - Call `learning-log` with `filePath: curricula/curriculum-<topic>.md`.

7. **Offer to teach**
   - Ask whether to start with Level 1 in a `teach-mode` session,
     using `grill-me` to calibrate.

---

## Notes

- Always anchor to the actual repo — a curriculum about RAG should reference
  the project's retrieval pipeline.
- Exercises must be doable with the repo's existing stack.
- Update the curriculum file after each completed level (append progress).
