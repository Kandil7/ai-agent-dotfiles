---
description: >-
  Run a timed mock interview (technical + behavioral), score answers on
  structure/accuracy/depth/communication, give model answers linked to the
  repo docs, and log the session to docs/learning/mentor/mock-interviews.md.
  Use before job applications or interview milestones.
agent: mentor
---

Run a mock interview practice session.

Instructions:

1. Load the `mentor-mock-interview` skill and follow its workflow.
2. Setup: target role (from profile goals or ask), duration (default 30
   minutes), topic mix (e.g. 4 technical + 2 behavioral). $ARGUMENTS may
   specify role/duration/topics (e.g. "backend, 45 min, FastAPI + SQL").
3. Run the interview: one question at a time, no hints during answers
   (clarifying questions allowed), one follow-up max per question. Silently
   score each answer (structure, accuracy, depth, communication — 1–5).
4. Feedback round: strengths first, then gaps, then one model answer per weak
   question linked to the repo's real docs (walkthroughs/architecture/
   decisions).
5. Log to `docs/learning/mentor/mock-interviews.md` (append): questions,
   scores, strengths, gaps, model-answer links, next round's focus.
6. Update `mastery.md` evidence and the roadmap's interview milestone.
7. Schedule the next round (+1 week default) and name the ONE thing to
   improve before it.

Tone: kind but honest — inflated scores help no one at the real interview.
