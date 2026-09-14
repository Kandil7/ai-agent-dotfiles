---
description: >-
  Consolidate the week into docs/learning/sessions/digest-<YYYY-Www>.md:
  sessions, wins, patterns, open threads, next-week focus. Run on Fridays —
  feeds /mentor-lite checkin directly.
---

Build the weekly project digest.

1. Gather the week:

   - `docs/learning/sessions/` for the last 7 days (session logs, digests)
   - `docs/learning/diffs/`, `docs/learning/decisions/`, `docs/learning/design/`
   - `docs/PROJECT-CHECKPOINT.md` and `docs/CURRENT-STATE.md` if they exist
   - the mentor diary (`docs/learning/mentor/diary.md`) and check-ins if present

2. Write the digest via `project-log`:

   - filePath: `sessions/digest-<YYYY-Www>.md` (ISO week, e.g. `digest-2026-W33.md`)
   - Week summary: sessions count, wins, what shipped or was verified
   - Patterns: what repeated across sessions (good and bad)
   - Open threads: topics still fuzzy or unfinished
   - Next week focus: 2-3 items (align with the mentor roadmap if it exists)

3. Update `00-INDEX.md` if it exists (add the digest entry).

4. Reply with a 5-line summary: wins, patterns, open threads, next focus.
   If a mentor-lite check-in is due, note that `/mentor-lite checkin` can
   consume this digest directly.

Tone: honest consolidation — the digest is for your own memory, not for praise.
Do not commit anything.