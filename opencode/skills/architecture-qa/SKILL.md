---
name: architecture-qa
description: >-
  Generate docs/learning/architecture-qa.md: the top 10-15 questions someone
  should be able to answer about this system (how does X work, why was Y
  chosen, what happens when Z fails) with concise answers linking
  architecture.md, decisions/, design/, and walkthroughs/. Use for interview
  prep, onboarding verification, or "quiz me on this project".
---

# Skill: architecture-qa

## Purpose

The ultimate test of understanding: **can you answer the hard questions about
the system?** This skill produces a Q&A document that links every answer to
the source docs, so it doubles as a study sheet and an interview checklist.

---

## When to Use

Use this skill when:

- Preparing for an interview about this project.
- Onboarding someone and wanting to verify their understanding.
- The user says "اختبرني في المشروع" / "quiz me on the project".
- After a `document-project` sweep, to consolidate what was learned.

---

## Inputs

- Optional: focus area (backend, data, AI pipeline, security) and depth.
- The existing docs under `docs/learning/` (architecture, decisions, design,
  walkthroughs).

---

## Outputs

`docs/learning/architecture-qa.md` via `learning-log`:

1. **Question list** — 10–15 questions, ordered easy → hard, covering:
   - Entry points & request lifecycle ("what happens when a request arrives?").
   - Core data flow ("how does a document become an answer?").
   - Key decisions ("why vector DB X over Y?" — link decisions/).
   - Failure modes ("what happens if the LLM call times out?").
   - Cross-cutting ("how is auth enforced? how is config managed?").
2. **Answers** — 2–4 sentences each, with links to the exact doc/file that
   proves the answer.
3. **Open questions** — things the docs cannot yet answer (gaps to document).

---

## Step-by-Step Workflow

1. **Load context** — run `context-load` first: read `architecture.md`, the
   decision log, and design alternatives.
2. **Draft the questions** — from the system's actual hotspots: entry points,
   core flows, failure handling, choices with alternatives, data stores.
3. **Answer from docs** — every answer links to its source doc; if a doc is
   missing, answer from code and flag the gap.
4. **Write** — `learning-log` → `architecture-qa.md` (overwrite if exists).
5. **Offer the quiz** — propose running `grill-me` on 3–5 of the questions so
   the user can self-test; the doc stays as the answer key.

---

## Notes

- Answers must be **verifiable** — link, don't assert.
- Keep it current: re-run after big changes or `/document-project update`.
- Hard questions > easy ones: aim for the questions that actually separate
  understanding from memorization.
