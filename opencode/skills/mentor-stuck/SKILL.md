---
name: mentor-stuck
description: >-
  On-demand rescue mode for when the learner is stuck: on a bug, a design
  decision, or motivation. Drops the plan, diagnoses the gap (knowledge /
  skill / confidence), and coaches the METHOD — debugging method, decision
  journal, or re-scope — never just hands the fix. Use when the user says
  "I'm stuck", "محتاج مساعدة", a bug won't resolve, or design paralysis.
---

# Skill: mentor-stuck

## Purpose

Being stuck is data, not failure. `mentor-stuck` is the emergency lane: pause
the roadmap, diagnose what kind of stuck this is, and coach the **method** so
the learner can get unstuck on their own next time.

---

## When to Use

Use this skill when:

- The learner says "I'm stuck" / "مش عارف أكمل" / "this bug won't die".
- A bug has resisted multiple attempts.
- Design or career decision paralysis (options, but no choice).
- Motivation collapsed mid-task (escalate to `mentor-motivation`).

Do NOT use for normal sessions — this replaces the plan temporarily.

---

## Step-by-Step Workflow

1. **Acknowledge & normalize** — "Stuck is the most normal part of learning."
   Ask what they tried (never assume they tried nothing).
2. **Diagnose the gap** (2–3 `grill-me` questions):
   - Knowledge gap: never learned this concept?
   - Skill gap: understands the theory but can't apply it here?
   - Confidence gap: knows it, doubts it, afraid to commit?
3. **Coach by gap type:**

### 3a. Bug / debugging stuck → coach the method
1. **Reproduce** — exact steps, minimal case; if it can't be reproduced, the
   first problem is the reproduction.
2. **Isolate** — binary search the code path: comment out / trace / log
   halfway points; find the *smallest* failing slice.
3. **Hypothesize** — one testable hypothesis, not five guesses.
4. **Verify** — prove the hypothesis with the smallest possible check.
5. **Fix & guard** — fix, then add a regression test so it can't return.
- Mentor rule: **guide, don't fix.** Give the *next diagnostic step*, not the
  answer. After two guided attempts, reveal one hint at a time. If the
  learner is exhausted, demonstrate the method on this bug — then have them
  re-do it on a related bug alone.

### 3b. Design / decision stuck → decision journal
1. **Write the decision** — constraints, 2–3 options, one-line pros/cons.
2. **Make it testable** — "try option A for 2 weeks; what would prove it
   wrong?" An experiment beats an opinion.
3. **Log it** — append to `docs/learning/mentor/decisions.md` with a revisit
   date; the check-in will revisit it ("would you still choose that?").

### 3c. Motivation stuck → escalate
- Hand off to `mentor-motivation`: blockers interview, smallest next step,
  streak protection, wins log. Re-scope the plan, never guilt.

4. **Un-stuck handoff** — end with: the method used, the one next action,
  and a `diary.md` entry ("what confused me" + "what I'll try next").
5. **Log** — session to `sessions/`; update `challenges.md` status if a
  challenge was re-scoped; update `mastery.md` evidence (a conquered stuck
  moment is real evidence).

---

## Notes

- The goal is the **method**, not the fix: "next time you'll do this alone."
- Two guided attempts, then hints; hints, then demonstration — in that order.
- Stuck moments are the best learning material: they often reveal the
  plateau `mentor-mastery` is looking for.
