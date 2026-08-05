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
| `learning` (primary) | Orchestrates teaching + logging | `primary` | `edit: ask`, `bash: ask`, `learning-log: allow`, `memory-log: allow` |
| `code-teacher` | Explains code (walkthroughs) | `subagent` | `edit: deny`, `bash: deny`, `learning-log: allow` |
| `design-teacher` | Compares designs | `subagent` | `edit: deny`, `bash: deny`, `learning-log: allow` |
| `review-teacher` | Code quality/security review | `subagent` | `edit: deny`, `bash: ask`, `learning-log: allow` |
| `documenter` | Batch walkthroughs for full-project sweeps | `subagent` | `edit: deny`, `bash: ask`, `learning-log: allow` |
| `learning-log` tool | Writes `docs/learning/*.md` | custom tool | Path-locked to `docs/learning/` |
| `memory-log` tool | Writes `~/.config/opencode/memory/*.md` | custom tool | Path-locked to global memory/ |

Skills: 24 SKILL.md files (see `global-learning-agent-skills.md`): the 11 core
(learning/teaching) skills, 5 project-type/persona doc generators, 5 lifecycle
and visibility skills (`docs-drift-check`, `weekly-digest`, `docs-publish`,
`docs-mcp`, `context-load`), plus `project-type-docs` and `api-reference`.
Mentor Mode adds 5 more skills and the `mentor` primary agent
(see `mentor-agent-spec.md`). Commands: `/document-project`,
`/migrate-learning`, `/mentor-intake`, `/mentor-checkin`. Scripts:
`scripts/check-docs-drift.js` (CI drift gate).

---

## 3. Session Lifecycle (per task)

0. **Load context** — `context-load`: read the index + architecture + relevant
   walkthroughs before deep work; state what is already known.
1. **Clarify** — project, goal, user's level (use `grill-me`).
2. **Explain** — `understand-anything` (overview) then `code-walkthrough` (detail).
3. **Compare** — `design-alternatives` with pros/cons and recommendation.
4. **Decide** — `decision-rationale` (ADR) written **before** touching code.
5. **Log** — `learning-log` tool, correct folder + file name, all applicable sections;
   keep `00-INDEX.md` in sync. Cross-project facts → `memory-log`.
6. **Exercise** — 3–5 repo-grounded tasks.
7. **Verify** — `grill-me` follow-up questions (especially in weekly reviews).

### Full-Project Sweep (on demand, via `/document-project`)

1. Load the `document-project` skill.
2. Inventory source files; detect project type (`project-type-docs`); bootstrap
   `docs/learning/` structure + `00-INDEX.md`.
3. Architecture pass → `architecture.md` + `modules/*.md`.
4. Specialized pass → type-specific artifacts (`ai/`, `api/`, `data/`, `ops/`, ...).
5. Batch pass → `walkthroughs/<repo-path>.md` per file (deep-detail standard),
   one directory per batch, via the `documenter` subagent.
6. After each batch: update `00-INDEX.md` (coverage %, remaining files) — resumable;
   mark deleted files `archived`.
7. Finish: coverage summary + guided tour (optional) + reading order.
8. Update mode (`/document-project update`): refresh only `stale` entries.

---

## 4. Format Contract (learning-log standard)

Every artifact under `docs/learning/` uses this section order:

1. Context
2. Explanation
3. Alternatives (if applicable)
4. Rationale (Why this?)
5. Exercises
6. Next Steps

Folder structure and file naming conventions (full list in the `learning-log` skill):

- Walkthroughs: `docs/learning/walkthroughs/<repo-path>.md` (mirrors the repo tree)
- Architecture: `docs/learning/architecture.md` + `docs/learning/modules/<module>.md`
- Design: `docs/learning/design/design-alternatives-<topic>.md`, `project-plan-<project>.md`
- Decisions: `docs/learning/decisions/decision-<change>.md`, `adr-<n>-<slug>.md` + `README.md` log
- Reviews: `docs/learning/reviews/review-<file-or-topic>.md`, `postmortem-<incident>.md`
- Sessions: `docs/learning/sessions/YYYY-MM-DD-session-<topic>.md`, `digest-<YYYY-Www>.md`
- Curricula: `docs/learning/curricula/curriculum-<topic>.md`, `session-<id>-lesson.md`
- Diffs: `docs/learning/diffs/diff-<commit>.md`
- Specialized: `ai/`, `api/`, `ui/`, `config/`, `data/`, `ops/`, `notebooks/`,
  `security/`, `performance/`, `packages/` (see `project-type-docs`)
- Q&A: `docs/learning/architecture-qa.md`
- Hub: `docs/learning/00-INDEX.md` (coverage tracker, updated after every write)

---

## 5. Acceptance Criteria (how you know it works)

A session is **successful** only if:

- [ ] At least one file was created/updated under `docs/learning/`.
- [ ] The file name follows the naming convention for its type (category folder + name).
- [ ] All 6 sections present (empty sections allowed).
- [ ] Any decision critical to a code change was logged **before** the change.
- [ ] Exercises are grounded in the actual repo (no generic "hello world" tasks).
- [ ] `00-INDEX.md` was updated if it exists.

A **full-project sweep** is **successful** only if:

- [ ] `00-INDEX.md` exists with a coverage table (file → status → link).
- [ ] `architecture.md` (with mermaid diagrams) and `modules/*.md` were produced.
- [ ] Every source file has a `walkthroughs/<repo-path>.md` entry following the
      deep-detail standard, or is listed `pending` in the index (resumable).
- [ ] Coverage percentage is reported at the end.

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