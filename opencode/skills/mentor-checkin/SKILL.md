---
name: mentor-checkin
description: >-
  The weekly mentor review ritual: load profile/roadmap/mastery + the week's
  sessions, ask what was learned/built/stuck on, score progress, update the
  mastery ledger with evidence, celebrate wins, follow up on open challenges,
  re-plan the roadmap, and set concrete next-week goals. Logs to
  docs/learning/mentor/checkins/YYYY-MM-DD-checkin.md. Use via /mentor-checkin
  or when the user asks for a review.
---

# Skill: mentor-checkin

## Purpose

The check-in is where mentoring actually happens: **progress is reviewed
honestly, wins are celebrated, the plan is adjusted to reality, and the next
week gets concrete goals.** Without it, sessions drift and motivation leaks.

---

## When to Use

Use this skill when:

- The learner invokes `/mentor-checkin` (default weekly).
- The learner asks "راجعني" / "review my week".
- A long absence ended (re-onboarding check-in).
- A milestone boundary or a roadmap divergence needs handling.

---

## Outputs

`docs/learning/mentor/checkins/YYYY-MM-DD-checkin.md` via `learning-log`:

1. **Week summary** — what was studied/built, from sessions/, diffs/,
   diary.md, and challenges.
2. **Progress vs roadmap** — per milestone: done / in progress / stuck /
   skipped (with reasons).
3. **Wins** — completions, level-ups, brave questions (celebrate explicitly).
4. **Struggles** — what was hard; diagnose (knowledge / skill / confidence
   gap) and log the intervention chosen.
5. **Mastery updates** — level changes with evidence links
   (also written to `mentor/mastery.md`).
6. **Open items** — open challenges, unfinished exercises, stale docs.
7. **Next week goals** — 2–4 concrete, time-budget-sized goals.
8. **Roadmap adjustments** — what changed and why.
9. **Mentor feedback** — written separately to `mentor/feedback.md`:
   strengths (evidence-linked), the top gap to work on, and one concrete
   suggestion for the next period.

---

## Step-by-Step Workflow

1. **Load** — profile, roadmap, mastery, challenges, diary, the review queue,
   and the week's logs (use `weekly-digest` data if a digest exists).
2. **Ask (5–7 questions, conversational):**
   - What did you learn this week?
   - What did you build or fix?
   - What was the hardest moment — and what did you do?
   - Did you finish the exercises/challenges from last week?
   - What confused you that we should revisit?
   - Is the goal still the same?
3. **Review queue first** — run the due reviews (1–2 questions per due
   topic from `mentor/review-queue.md`), then advance or reset intervals.
4. **Revisit the decision journal** — for entries past their revisit date:
   "you chose X — would you still choose it today? What did you learn?"
5. **Score progress** — against the roadmap; be honest, kind, concrete.
6. **Update the ledgers** — mastery table (`mentor-mastery`), review queue,
   challenges statuses (`mentor-challenge`), roadmap (`mentor-roadmap` if
   diverged), wins (`mentor-motivation` wins log), streak dashboard.
7. **Write the feedback** — `learning-log` → `mentor/feedback.md` (append):
   evidence-linked strengths, the top gap, one concrete suggestion.
8. **Write the check-in** — `learning-log` → `mentor/checkins/<date>-checkin.md`.
9. **Close with goals** — agree on 2–4 next-week goals and one review slot
   (spaced repetition of an older topic); end by naming a win from this week
   and showing the one-line streak dashboard
   ("4 sessions, 6h, streak 12 days — from `mentor/streak.md`").

### Bootcamp variant (daily, when rhythm = bootcamp)

Keep it to 10 minutes: **done / blocked / tomorrow's target** (+ one due
review from the queue). Log a compact entry under
`mentor/checkins/<date>-checkin.md` (same file pattern, one section per day).
No full scoring — the weekly full check-in still happens.

---

## Notes

- Tone: supportive first, honest always; never guilt about missed goals —
  re-plan instead.
- If the learner skipped everything, the check-in still counts: log reality,
  ask what blocked them, and shrink the plan to fit the true time budget.
- Check-in frequency is stored in the profile; adjust if life changed.
- Consistency signal: note the gap since the last check-in in the summary —
  it feeds the "good to see you after X days" greeting in future sessions.
