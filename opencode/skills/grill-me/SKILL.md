---
name: grill-me
description: >-
  Socratic-style questioning: ask 3-5 probing questions before deep work to
  calibrate the user's level and goals, and verification questions after
  explanations to confirm understanding. Logs questions into session files.
---

# Skill: grill-me

## Purpose

Use **Socratic questioning** to calibrate and verify understanding:

- Before deep work: questions that reveal the user's level, goals, and constraints.
- After explanations: questions that prove the user actually understood.

This skill is **verification-first**: it prevents teaching past the user's actual level.

---

## When to Use

Use this skill when:

- Starting a learning session ("what do you already know about X?").
- The user claims understanding but hasn't demonstrated it.
- Before executing a plan — confirm shared understanding and constraints.
- After a `code-walkthrough` or `teach-mode` level — check comprehension.

---

## Inputs

- The topic or plan under discussion.
- The user's stated level (to be verified, not trusted blindly).

---

## Outputs

Questions only — plus optional logging of the Q&A into a session file:

- Questions list inside `learning/YYYY-MM-DD-session-<topic>.md`
- Comprehension verdict (strengths, gaps) at the end

---

## Step-by-Step Workflow

1. **Pre-questions (calibration)**
   - Ask 3–5 questions, e.g.:
     - "What happens in this function when X is empty?"
     - "Why would you choose A over B here?"
     - "What is the output of this pipeline for input Y?"
   - Keep questions concrete and repo-grounded, not theoretical.

2. **Listen for gaps**
   - Do NOT fill gaps immediately; let the user reason first.
   - Note which concepts need explanation.

3. **Teach the gaps**
   - Explain only the weak areas (linked to `code-walkthrough` / `teach-mode`).

4. **Post-questions (verification)**
   - Ask 2–3 follow-ups that require applying the new knowledge.

5. **Log the exchange**
   - Call `learning-log` with the questions, answers, and verdict in
     `YYYY-MM-DD-session-<topic>.md` (or append to an existing session file).

---

## Notes

- Never turn this into an interrogation: max 5 questions per round.
- If the user answers correctly, move on — do not teach what they already know.
