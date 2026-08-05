---
name: design-alternatives
description: >-
  Compare architectural and technical alternatives for any module, feature, or
  pipeline: enumerate 2-3 options, build a pros/cons table across performance,
  complexity, reliability, cost, and ecosystem, give a recommendation with
  conditions to revisit, and log to docs/learning/design/design-alternatives-<topic>.md.
---

# Skill: design-alternatives

## Purpose

Present and compare architectural / technical alternatives for a given module,
feature, or pipeline, so the user understands **which options exist and why one
wins in this specific context**.

This skill is **comparison-first**: the goal is a decision-ready trade-off analysis,
not an implementation.

---

## When to Use

Use this skill when:

- The user wants to understand "why this design" vs "what else could we use".
- Comparing libraries/frameworks (e.g., Qdrant vs pgvector, LangGraph vs LangChain, FastAPI vs Node).
- Planning architectural changes or new features.
- A `code-walkthrough` revealed a design that might be revisited.

---

## Inputs

- The subsystem, module, or decision under discussion (e.g., "Athar retrieval layer").
- Optional:
  - Known alternatives the user wants compared.
  - Constraints: performance, cost, team skills, existing stack.

---

## Outputs

A comparison document saved under `docs/learning/` via the `learning-log` tool:

- `docs/learning/design/design-alternatives-<topic>.md`

Sections:

1. Context (the problem being solved)
2. Current / Baseline Design
3. Alternatives (2–3) with pros/cons
4. Comparison Table (performance, complexity, reliability, cost, ecosystem)
5. Recommendation + conditions to revisit
6. Sources / further reading

---

## Step-by-Step Workflow

1. **Define the decision**
   - Ask: what exactly are we choosing? What problem does it solve?
   - Record constraints (latency, cost, existing stack, team skills).

2. **Describe the current design**
   - Read the relevant code/config and summarize how it works today.

3. **Enumerate alternatives**
   - Identify 2–3 realistic options (not every option ever invented).
   - For each: one-line summary, key mechanics, ecosystem maturity.

4. **Build the pros/cons table**
   - Dimensions: performance, complexity, reliability, cost, ecosystem/community,
     fit with existing stack.
   - Be honest: mark unknowns as "needs verification".

5. **Recommend**
   - State which option fits the current context and why.
   - Explicitly state **under what conditions the recommendation changes**
     (e.g., "switch to GraphRAG if corpus grows past 1M chunks").

6. **Log the analysis**
   - Call `learning-log` with `filePath: design/design-alternatives-<topic>.md`
     and the full comparison in `explanation` / `alternatives` fields.

7. **Offer next steps**
   - Suggest a spike/experiment, a `decision-rationale`, or an ADR.

---

## Notes

- Read-only by default: this skill produces analysis, not code changes.
- If the user then wants to implement a different design, switch to
  `decision-rationale` before touching code.
