---
name: guided-tour
description: >-
  Produce a "Guided Tour" section for docs/learning/00-INDEX.md: an ordered
  reading path (5-10 stops) through the project for a specific reader persona
  (new dev, frontend dev, backend dev, data engineer, interview prep), each
  stop with a link, time estimate, and why it matters. Use when onboarding
  someone or asking "where should I start reading".
---

# Skill: guided-tour

## Purpose

A pile of docs is still a pile. The **Guided Tour** turns `00-INDEX.md` into a
**path**: an ordered, time-boxed reading route that takes a specific person
from zero to productive in the right order.

---

## When to Use

Use this skill when:

- Onboarding a new developer to the repo.
- The user asks "منين أبدأ أقرأ المشروع؟" / "where should I start reading?".
- A session produced many docs and the user wants a study plan through them.
- Preparing for an interview or a code review that needs system-level context.

---

## Inputs

- The persona: new dev / frontend / backend / data engineer / interview prep /
  security reviewer (ask if unknown).
- The time budget (e.g. 2 hours) — optional, defaults to "as much as useful".

---

## Outputs

A `## Guided Tour` section added to `docs/learning/00-INDEX.md`:

```markdown
## Guided Tour — <persona> (~<time>)

| # | Stop | Doc/File | Why | Est. |
|---|---|---|---|---|
| 1 | Purpose & stack | architecture.md | What the system does | 5 min |
| 2 | Entry point | walkthroughs/src/main.py.md | Where execution starts | 15 min |
| 3 | Core module | walkthroughs/src/rag.py.md | The heart of the app | 30 min |
| ... |
| 8 | Try it | exercises in walkthroughs | Verify understanding | 20 min |
```

---

## Step-by-Step Workflow

1. **Pick the persona** — ask or infer from the request; adjust stops per persona:
   - New dev: purpose → entry → core flow → config → tests → one exercise.
   - Frontend dev: API cookbook → UI catalog → state → key backend module.
   - Backend dev: architecture → routes/endpoints → data layer → services.
   - Data engineer: data dictionary → lineage → pipelines → schema evolution.
   - Interview prep: architecture-qa → decisions (ADR log) → design alternatives.
2. **Select 5–10 stops** — each stop must have an existing doc link; if a stop
   lacks a doc, note "needs: <artifact>" instead of inventing content.
3. **Order by dependency** — entry points before internals, foundations before
   advanced topics; end with a verification stop (exercises or Q&A).
4. **Add time estimates** — 5–30 min per stop, total ≈ budget.
5. **Write the section** — append to `00-INDEX.md` (use `learning-log` with
   `filePath: 00-INDEX.md` and `mode: append` — the tour section lands under
   its own dated entry) OR edit the index directly if you have edit permission.
6. **Offer follow-up** — ask which stop to dive into next (`code-walkthrough`
   or `teach-mode` on it).

---

## Notes

- One tour per persona, dated; keep old tours (readers can compare paths).
- A tour is only as good as the docs it links — missing docs should be listed
  as "needs" so the next `/document-project` pass fills them.
- Keep stops actionable: every stop ends with "you can now explain X".
