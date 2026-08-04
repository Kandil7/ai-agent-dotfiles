# Learning Agent Spec

Authoritative description of the Global Learning Agent system: mission,
architecture, session lifecycle, format contract, and acceptance criteria.

---

## 1. Mission

Turn any repository (Athar, Baligh, fullstack-ai-engineer-lab, or any future project)
into a **living textbook**: every session explains, compares, decides, and logs,
so learning speed multiplies without skipping understanding.

Core thesis (from the design conversation): the agent is an **accelerator of
understanding, not a substitute for it**. You read the sources; the agent extracts
reasoning and alternatives and logs everything.

---

## 2. Architecture

| Component | Definition | Mode | Key permissions |
|---|---|---|---|
| `learning` (primary) | Orchestrates teaching + logging | `primary` | `edit: ask`, `bash: ask`, `learning-log: allow` |
| `code-teacher` | Explains code (walkthroughs) | `subagent` | `edit: deny`, `bash: deny`, `learning-log: allow` |
| `design-teacher` | Compares designs | `subagent` | `edit: deny`, `bash: deny`, `learning-log: allow` |
| `review-teacher` | Code quality/security review | `subagent` | `edit: deny`, `bash: ask`, `learning-log: allow` |
| `learning-log` tool | Writes `learning/*.md` | custom tool | Path-locked to `learning/` |

Skills: 10 SKILL.md files (see `global-learning-agent-skills.md`).

---

## 3. Session Lifecycle (per task)

1. **Clarify** — project, goal, user's level (use `grill-me`).
2. **Explain** — `understand-anything` (overview) then `code-walkthrough` (detail).
3. **Compare** — `design-alternatives` with pros/cons and recommendation.
4. **Decide** — `decision-rationale` written **before** touching code.
5. **Log** — `learning-log` tool, correct file name, all applicable sections.
6. **Exercise** — 3–5 repo-grounded tasks.
7. **Verify** — `grill-me` follow-up questions (especially in weekly reviews).

---

## 4. Format Contract (learning-log standard)

Every artifact under `learning/` uses this section order:

1. Context
2. Explanation
3. Alternatives (if applicable)
4. Rationale (Why this?)
5. Exercises
6. Next Steps

File naming conventions (full list in the `learning-log` skill):

- `code-walkthrough-<file>.md` · `design-alternatives-<topic>.md` ·
  `decision-<change>.md` · `review-<file>.md` · `overview-<repo>.md` ·
  `session-<id>-lesson.md` · `curriculum-<topic>.md` · `diff-<commit>.md` ·
  `YYYY-MM-DD-session-<topic>.md`

---

## 5. Acceptance Criteria (how you know it works)

A session is **successful** only if:

- [ ] At least one file was created/updated under `learning/`.
- [ ] The file name follows the naming convention for its type.
- [ ] All 6 sections present (empty sections allowed).
- [ ] Any decision critical to a code change was logged **before** the change.
- [ ] Exercises are grounded in the actual repo (no generic "hello world" tasks).

A **week** is successful only if:

- [ ] Weekly `grill-me` was run on the week's logs.
- [ ] At least one design alternative and one decision rationale were produced.
- [ ] The weekly artifacts are reviewed for drift (names, format, sources).

---

## 6. Safety Rules

- Never log secrets or `.env` content.
- No destructive bash without explicit user confirmation.
- No commits/pushes unless explicitly requested.
- Flag security, performance, and cost implications of suggestions.