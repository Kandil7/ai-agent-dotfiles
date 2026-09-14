---
name: domain-modeling
description: "Actively build and sharpen a project's domain model. Challenge terms against the glossary, stress-test with edge-case scenarios, update CONTEXT.md and ADRs inline."
---

# Domain Modeling

Actively build and sharpen a project's domain model: the shared language that makes code, conversations, and documentation precise.

## When to use

- Starting a new project (first grilling session)
- After significant design decisions (new modules, new integrations)
- When the team (human + agent) is using vague or inconsistent terms
- During code review when names don't match the domain model

## How it works

### 1. Challenge terms

For each term the user or codebase uses:
- Is it defined in `CONTEXT.md`?
- Is the definition precise enough to write code against?
- Are there competing terms for the same concept? Pick one, demote others to `_Avoid_`.
- Are there ambiguous terms (same word, different meanings in different parts)? Split the contexts.

### 2. Stress-test with scenarios

Take concrete scenarios (user stories, edge cases, integration points) and walk through the domain model:
- Does the model have precise terms for every concept in the scenario?
- Where does the model break down or require vague language?
- What terms are missing?

### 3. Update inline

As decisions land during any session:
- Update `CONTEXT.md` with new terms or refined definitions
- Create ADRs for decisions that meet the "all three must be true" gate
- Demote or remove obsolete terms

### 4. Cross-check against code

- Do function/variable/class names match the domain model?
- Where names diverge, is the divergence intentional (implementation name) or accidental (stale name)?
- Propose renames for accidental divergences.

## Rules

- The domain model is opinionated. Pick the best word; don't hedge with multiple synonyms.
- Definitions are one or two sentences. If you need more, the concept is too broad — split it.
- The model serves code and communication. If a term is precise but nobody uses it, drop it.
- Prefer terms that recruit the model's pretraining priors (leading words) over invented jargon.
