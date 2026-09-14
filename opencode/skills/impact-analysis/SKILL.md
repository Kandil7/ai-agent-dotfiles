---
name: impact-analysis
description: >-
  Analyze the blast radius of a proposed change BEFORE refactoring: who imports
  the file, which tests cover it, where its symbols are used, config/DB
  references, and risk ranking. Produces docs/learning/design/impact-<change>.md
  and pairs with decision-rationale. Use when asked "what breaks if I change X"
  or before any non-trivial refactor.
---

# Skill: impact-analysis

## Purpose

Before touching code, know **what breaks if this changes**. Impact analysis
produces a written map of dependents, coverage, and risk so the refactor is a
decision, not a gamble.

---

## When to Use

Use this skill when:

- Planning a refactor, rename, signature change, or schema migration.
- The user asks "إيه اللي هيتكسر لو غيّرنا X؟" / "what breaks if I change X?".
- A `decision-rationale` needs a factual blast-radius before choosing options.
- A `code-walkthrough` revealed a widely-used module.

---

## Inputs

- The target: file(s), module, function, API, or schema element.
- Optional: the proposed change (to assess risk per option).

---

## Outputs

`docs/learning/design/impact-<change>.md` via `learning-log`:

1. **Change under analysis** — what exactly would change.
2. **Direct importers** — every file importing the target (grep results).
3. **Symbol usage map** — which functions/classes/types are used where
   (signatures, call sites with file:line).
4. **Test coverage** — which tests touch it (unit/integration/E2E) and gaps.
5. **Config / data references** — env vars, DB columns, message schemas,
   API contracts that reference it.
6. **Risk ranking** — each dependent scored (high/medium/low) with the reason.
7. **Mitigations** — deprecation shims, compatibility layers, phased rollout.

---

## Step-by-Step Workflow

1. **Define the target** — confirm the exact scope with the user.
2. **Find dependents** — grep for imports/usages:
   - `grep -rn "from <module> import" src` / use the Grep tool.
   - Track usage across tests, scripts, configs, and docs.
3. **Assess test coverage** — check which test files import the target and
   what behaviors they lock down.
4. **Check non-code references** — configs, env vars, DB schema, API clients,
   other repos if known.
5. **Rank risk** — high = core path/contract/schema; medium = used in several
   places; low = internal usage only.
6. **Write the doc** — `learning-log` → `design/impact-<change>.md`.
7. **Hand to decision** — summarize the top risks in chat and suggest running
   `decision-rationale` next if the change is still desirable.

---

## Notes

- Read-only for source; writes only to `docs/learning/`.
- Coverage data is from static analysis + tests you can run (bash `ask`):
  a real `pytest`/`npm test` run beats guessing.
- Keep the doc factual (file:line everywhere) so it stays useful as the
  refactor proceeds.
