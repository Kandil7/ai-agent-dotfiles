---
description: >-
  Turn a raw session (Q&A or debugging) into a structured lesson at
  docs/learning/curricula/session-<id>-lesson.md: summary, key concepts,
  common mistakes, exercises. Use after a rich session or via /session-log
  suggestion.
agent: learning
---

Convert a session into a structured lesson.

Instructions:

1. Load the `session-to-curriculum` skill and follow its workflow.
2. Identify the source: the most recent session log in
   `docs/learning/sessions/` (or the session $ARGUMENTS refers to, e.g.
   "2026-08-05-session-fastapi-routes").
3. Write the lesson via `learning-log` →
   `curricula/session-<id>-lesson.md`:
   - Summary: what the session was about in 3-4 sentences
   - Key concepts: 3-6 concepts with 1-2 line explanations grounded in the
     repo (link walkthroughs where they exist)
   - Common mistakes: the mistakes made in the session, stated as lessons
   - Exercises: 3-5 tasks in the repo that practice the concepts
4. Update `00-INDEX.md` if the curricula folder is listed there.
5. Reply with the file path and the single most important takeaway.

Tone: teaching-first — this lesson should be readable by a stranger.
