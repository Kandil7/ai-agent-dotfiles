---
description: >-
  Capture the session you just had in under 2 minutes: what you did, learned,
  got confused by, and the next step. Written to
  docs/learning/sessions/YYYY-MM-DD-session-<topic>.md. Run before closing
  opencode so no learning moment dies. Optional topic via $ARGUMENTS.
---

Log this session as a knowledge artifact.

1. Ask 3-5 quick conversational questions (keep it under 2 minutes):

   - What did you work on or fix in this session?
   - What did you learn that you did not know before?
   - What confused you or is still fuzzy?
   - What is the one thing to do next time?

2. Write the entry via `project-log`:

   - filePath: `sessions/<today>-session-<topic>.md` (topic from $ARGUMENTS
     or the main theme of the session, e.g. `sessions/2026-08-17-session-rag.md`)
   - Context: repo, session goal
   - Explanation: what was done/learned, key insights
   - Next Steps: the one thing to do next time
   - Keep it honest and short — a session log is raw material, not a report.

3. If `docs/learning/00-INDEX.md` exists, update the entry for this file
   (status: new/updated, date). If the index does not exist yet, skip it —
   `/document-project` bootstraps it.

4. Mention the file path in your reply.

5. Optional: if the session produced a reusable cross-project lesson, suggest
   writing it to memory via `memory-log` (hardware lessons, recurring gotchas,
   preferences).

Tone: fast, practical — this is a 2-minute ritual, not a ceremony.
Do not commit anything.