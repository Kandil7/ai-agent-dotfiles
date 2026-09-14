# OPS-CORE — Global Operating Contract

Loaded into every session via `instructions` in `opencode.jsonc`. Companion to
`AGENTS.md` (operational rules, workstation facts, safety). This file defines
the **knowledge system, handoff contracts, and acceptance criteria** that make
sessions durable and measurable. If a project defines its own rules, project
rules win for that repo.

---

## 1. The Pipeline (unchanged, enforced everywhere)

```
READ -> PLAN -> APPROVE -> EXECUTE -> TEST -> REVIEW -> REPORT
```

FACT / INFERENCE / RECOMMENDATION / ACTION labels are mandatory in analysis.

---

## 2. Agent Handoff Contract

Delegation is explicit; no agent works outside its lane:

| From | To | Trigger |
|---|---|---|
| architect | builder | Plan approved. Architect never implements. |
| builder | reviewer | Implementation done, tests pass. Hand findings back to builder. |
| builder | security | Change touches secrets, network, infra, containers, or AI weights. |
| reviewer / security | builder | Findings to fix; reviewer/security never edit. |
| any agent | teacher | User asks "teach me", "explain", or a concept/decision walkthrough. |
| main agent | documenter | `/document-project` sweep — batch walkthroughs only. |
| flutter-developer | backend-developer | API contract finalized, hand off backend implementation. |
| fullstack-developer | backend-developer | API contract finalized, hand off backend implementation. |
| automation-engineer | ai-engineer | Model serving needed, hand off to MLOps. |
| any agent | main agent | Escalation, user approval, or anything outside lane. |

Rules:

- Handoffs are logged: the receiving agent gets a summary, the sender reports
  what it verified (tests run, facts established).
- Logging artifacts (`project-log` / `memory-log`) never count as "editing
  source" — read-only agents may still write knowledge docs.
- If a handoff target is missing or busy, the sending agent does the minimum
  safe work and reports the gap — never silently expands scope.

---

## 3. Durable Knowledge: `<repo>/docs/learning/`

Every meaningful session leaves at least one artifact. This is the mechanism
that survives session compaction — it is the project's long-term memory.

### The `project-log` tool (path-locked)

Writes Markdown under `docs/learning/` only; refuses anything outside. Format
contract — every entry uses this section order (empty sections allowed):

1. Context
2. Explanation
3. Alternatives
4. Rationale (Why this?)
5. Exercises
6. Next Steps

### The `context-store` tool (compound intelligence)

Persistent, ID-addressed knowledge store under `.opencode/context-store/`.
Agents write named artifacts after completing work; orchestrators read and
inject them into future subagent tasks. Creates compound intelligence where
each action builds on previous discoveries.

**Write:** `context-store write --id "auth_flow" --content "..." --reported_by "explorer"`
**Read:** `context-store read --id "auth_flow"`
**List:** `context-store list`
**Task-grouped:** `context-store read-task --task_filter "task_001"`

Artifact IDs: `snake_case`, versioned when updating (`auth_flow_v2`).
What belongs: architecture, data flow, verified facts, decisions, benchmarks.
What does NOT belong: transient state, secrets, binary data.

### Tree and naming conventions

```
docs/learning/
  00-INDEX.md                        # navigation hub + coverage tracker — update after EVERY write
  architecture.md                    # whole-project map (mermaid)
  modules/<module>.md                # per-module summaries
  walkthroughs/<repo-path>.md        # deep per-file explanations, mirroring the repo tree
  decisions/decision-<change>.md     # decision rationales — written BEFORE the code change
  design/design-alternatives-<topic>.md
  reviews/review-<file-or-topic>.md
  sessions/YYYY-MM-DD-session-<topic>.md
  diffs/diff-<commit>.md
  mentor/                            # profile.md, roadmap.md, checkins/, wins.md (see /mentor-lite)
```

### Index hygiene (mandatory)

- After EVERY `project-log` write, update `00-INDEX.md`: status, date, coverage %.
- Files touched in a coding session get their walkthrough refreshed or marked
  `stale` so the next `/document-project update` pass picks them up.
- Never end a session without at least one `docs/learning/` artifact.

---

## 4. Cross-Project Memory: `~/.config/opencode/memory/`

### The `memory-log` tool (path-locked)

Writes Markdown under the global memory dir only. Same 6-section format.

### Belongs in memory/ (cross-project)

- Hardware/model learnings: VRAM budgets, quantization results, driver quirks
  (`hardware/rtx5000-vram-budget.md`)
- Recurring gotchas and patterns: debugging lessons, toolchain fixes
  (`lessons/`, `patterns/`)
- User preferences that apply everywhere: workflow, style, tone
  (`user-preferences.md`)

### Does NOT belong in memory/

- Per-repo facts, decisions, walkthroughs → `docs/learning/` of that repo.
- Anything secret (never log keys, tokens, `.env` content, anywhere).

Rule of thumb: if it helps future sessions in *any* project, it is memory; if
it helps only this repo, it is project-log.

---

## 5. Shared Language: CONTEXT.md and ADRs

### CONTEXT.md — Project Glossary

Every meaningful project maintains a `CONTEXT.md` at the root (or per bounded context for multi-context repos). It is a **pure glossary** — no implementation details, no specs.

Format:

```markdown
# {Context Name}
One or two sentence description.

## Language
**Term**: Definition
_Avoid_: Alternative term
```

Rules:
- Be opinionated — pick the best word, list others under `_Avoid_`.
- Definitions are one or two sentences max.
- Only terms specific to this project's context (not general programming concepts).
- Created lazily — only when the first term is resolved during a grilling session or domain modeling.
- Multi-context repos: root `CONTEXT.md` for top-level, plus per-directory `CONTEXT.md` files with a `CONTEXT-MAP.md` listing all contexts and their relationships.

### ADRs — Architecture Decision Records

Ultra-lean format:

```markdown
# {Short title}
{1-3 sentences: context, decision, why.}
```

Optional sections only when they add value: Status, Considered Options, Consequences.

ADRs are offered only when **all three** are true:
1. Hard to reverse
2. Surprising without context
3. Result of a real trade-off

ADRs live in `docs/learning/decisions/` (via `project-log`) or `docs/adr/` in the repo root.

---

## 6. Commands

Lifecycle map (full inventory: `~/.config/opencode/docs/SYSTEM-MAP.md`):

- **Day loop:** `/quickstart` -> work -> `/test` -> `/wrapup`; recovery anytime:
  `/checkpoint` `/resume` `/status` `/gpu`
- **AI loop:** `/dataset` `/experiment` `/evaluate` `/diff` `/benchmark` `/migrate`
- **Build & ship:** `/plan` `/implement` `/inspect` `/review` `/security` `/ship` `/deploy` `/serve` `/new-project`
- **Ops & cleanup:** `/debug` `/cleanup` `/research` `/prompt`
- **Interview & routing:** `/grill` `/handoff` `/wayfinder` `/domain-model` `/ask`

Knowledge system:

- `/session-log [topic]` — 2-minute capture of the session just finished →
  `sessions/<today>-session-<topic>.md`. Run before closing opencode.
- `/project-digest` — weekly consolidation → `sessions/digest-<YYYY-Www>.md`.
- `/document-project [update]` — full sweep: bootstrap `docs/learning/`,
  `00-INDEX.md` coverage tracker, `architecture.md` + `modules/`, batch
  walkthroughs via the `documenter` subagent. `update` refreshes only stale.
- `/mentor-lite [start|checkin|adapt]` — lightweight personal mentoring:
  `mentor/profile.md` + `roadmap.md` on start, dated check-ins after that.

---

## 6. Acceptance Criteria

A **session** is successful only if:

- [ ] At least one `docs/learning/` artifact was created/updated via `project-log`.
- [ ] File name follows the naming convention (category folder + name).
- [ ] All 6 sections present (empty sections allowed).
- [ ] Critical decisions were logged BEFORE the code change, not after.
- [ ] `00-INDEX.md` updated.

A **document-project sweep** is successful only if:

- [ ] `00-INDEX.md` exists with a coverage table (file -> status -> link).
- [ ] `architecture.md` (mermaid) and `modules/*.md` produced.
- [ ] Every source file has a walkthrough or is listed `pending` (resumable).
- [ ] Coverage % reported at the end.

A **check-in** (mentor-lite) is successful only if:

- [ ] Progress scored against the roadmap (done / stuck / skipped).
- [ ] Mastery claims carry evidence links (no link, no level-up).
- [ ] Next goals are concrete and logged.

---

## 7. Discipline Rules

- Log before you leave: a session without an artifact did not happen.
- Never log secrets; flag security/performance/cost implications of suggestions.
- Cross-project facts go to memory-log, repo facts go to project-log — no
  duplication, single source of truth per fact.
- Staleness is checked mechanically: `node scripts/check-docs-drift.js` in a
  repo (exit 1 = stale/missing walkthroughs) and `scripts/check-overdue.ps1`
  for check-in/checkpoint nudges (Task Scheduler ready).
- Config integrity is checked mechanically after ANY opencode config change:
  `node ~/.config/opencode/scripts/validate-config.mjs`
  (JSONC parse, deny-rules present, agent/command/skill frontmatter).
- Keep this spec and AGENTS.md consistent when either changes; restart
  opencode after editing config files (config loads once at startup).