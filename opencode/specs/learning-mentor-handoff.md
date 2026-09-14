# Learning ↔ Mentor Handoff Spec

Defines who does what across the Global Learning system, when agents should
delegate to each other, and how artifacts flow between them. Companion spec
to `learning-agent-spec.md` (teacher), `mentor-agent-spec.md` (mentor), and
`global-learning-agent-skills.md` (skills index).

---

## 1. Division of Labor

| Agent | Owns | Delegates to | Never does |
|---|---|---|---|
| `learning` (teacher) | Content: walkthroughs, curricula, architecture docs, session teaching | `code-teacher`, `design-teacher`, `review-teacher`, `documenter` for content depth | Personal plans, accountability, mastery ledgers |
| `mentor` | The person: profile, roadmap, mastery, check-ins, challenges, rescue, interviews, graduation | `learning` for deep teaching of a topic; `review-teacher` for code-quality reviews in upskilling mode | Full-project documentation sweeps |
| `documenter` | Batch sweeps: `/document-project`, `/migrate-learning`, drift repairs | — | Anything outside `docs/learning/` writes |
| teacher subagents | Single-file explanations, design comparisons, reviews | — | Roadmap changes, mastery updates |

## 2. Triggers for Handoff

- **Mentor → learning**: during an adaptive session, when a topic needs deep
  teaching ("teach me X properly"), the mentor delegates a teaching task via
  `task` to `learning` (or a teacher subagent) and stays in charge of
  verification and mastery.
- **Mentor → review-teacher**: in upskilling mode, when the learner must
  practice review culture, the mentor requests a review of the learner's code;
  review findings become check-in material and mastery evidence.
- **learning → mentor**: when a session reveals persistent struggle, repeated
  confusion, or the learner asks for goals/plans, the teacher suggests
  `/mentor-intake` or hands the diary/streak context over.
- **documenter ↔ mentor**: the mentor's roadmap links to walkthroughs
  (`docs/learning/walkthroughs/`); if a topic has no doc, the mentor asks the
  documenter for it (or schedules `/document-project`) before teaching it.

## 3. Artifact Flow (single source of truth)

```
documenter ──walkthroughs/architecture──► learning (teaches from them)
learning ──session logs, curricula──► mentor (reads at sessions/check-ins)
mentor ──roadmap links──► documenter (docs to create/refresh)
review-teacher ──review-*.md──► mentor (check-in material)
all agents ──learning-log──► docs/learning/  (one shared tree, no duplication)
all agents ──memory-log──► ~/.config/opencode/memory/  (cross-project facts)
```

Rules:

- The **repo's `docs/learning/` tree is the single source of truth** for both
  teaching and mentoring artifacts; never duplicate content across trees.
- The mentor's `mastery.md` evidence links MUST point into the shared tree
  (sessions, walkthroughs, checkins) — no evidence, no level-up.
- Cross-project facts (career goals, learning style, rollup) live only in
  `memory/` via `memory-log`.
- If two agents would write the same artifact (e.g. a session log), the agent
  that ran the session writes it; the other only reads.

## 4. When Both Agents Are Active

- Mentor mode subsumes teaching: the mentor performs teaching itself using
  teacher skills (`teach-mode`, `code-walkthrough`, ...) rather than spawning
  parallel sessions — the profile/mastery context must not be lost.
- If the user invokes `@learning` mid-mentor-session for a pure content
  question, the teacher answers standalone; the mentor picks up the
  outcome at the next session (it is logged to the shared tree anyway).
- Handoffs are logged in the session file or diary ("asked learning to teach
  X; result: <link>"), so the shared tree stays self-describing.

## 5. Acceptance Criteria

- [ ] Every delegated teaching task returns a loggable artifact in the shared tree.
- [ ] Mastery evidence links resolve to existing files in the shared tree.
- [ ] No artifact exists in two places (except the optional `docs/learning/skills/` template mirror).
- [ ] A learner moving between `@learning` and `@mentor` keeps full context
      from the shared tree without repeating intake.
