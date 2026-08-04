---
name: session-to-curriculum
description: >-
  Convert a raw Q&A or debugging session into a structured lesson: summary, key
  concepts, common mistakes, and exercises. Logs to
  learning/session-<id>-lesson.md so every session becomes reusable material.
---

# Skill: session-to-curriculum

## Purpose

Convert a raw Q&A, debugging, or exploration session into a **structured lesson**
that can be reused later as study material or shared with others.

This skill is **consolidation-first**: session noise becomes durable knowledge.

---

## When to Use

Use this skill when:

- A long Q&A or debugging session just ended and the user asks to save it.
- The user says "حوّل الجلسة دي لدرس منظم مع تمارين".
- The user wants to review what was learned this week.

---

## Inputs

- The session content (from conversation history or session logs).
- Optional:
  - Target level for the lesson (beginner / intermediate / advanced).

---

## Outputs

A lesson document saved under `learning/` via the `learning-log` tool:

- `learning/session-<id>-lesson.md`

Sections:

1. Summary (3–5 sentences)
2. Key questions asked
3. Key concepts explained
4. Common mistakes / gaps that appeared
5. Worked example (from the session, trimmed)
6. Exercises (3–5)
7. Related material (files, docs, skills)

---

## Step-by-Step Workflow

1. **Collect the session**
   - Gather the main questions, answers, and dead ends from the conversation.

2. **Summarize**
   - Write a 3–5 sentence summary of what the session actually achieved.

3. **Extract concepts**
   - List the key concepts, each with a one-paragraph explanation.

4. **Capture mistakes**
   - Document errors/gaps encountered and the corrected understanding.

5. **Build exercises**
   - 3–5 exercises that test the concepts from this session, grounded in the repo.

6. **Log the lesson**
   - Call `learning-log` with `filePath: session-<id>-lesson.md`.

7. **Offer expansion**
   - Suggest turning this into a full `teach-mode` curriculum if the topic is big.

---

## Notes

- Do this **right after** the session while details are fresh.
- Keep the worked example short; link to the full log instead of duplicating it.
