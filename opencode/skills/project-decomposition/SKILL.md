---
name: project-decomposition
description: >-
  Break any project or feature into logical phases: spec, architecture,
  implementation, testing, deployment — with deliverables, dependencies, and a
  weekly/sprint mapping. Logs to learning/project-plan-<project>.md.
---

# Skill: project-decomposition

## Purpose

Break any project or feature into **logical phases with clear deliverables**:
Spec → Architecture → Implementation → Testing → Deployment, mapped to sprints.

This skill is **planning-first**: a roadmap you can execute week by week.

---

## When to Use

Use this skill when:

- The user describes a project or feature and asks "how do I start?".
- The user wants a study + build plan (e.g., "RAG microservice in 4 weeks").
- A learning session should produce an actionable plan rather than an explanation.
- The user needs to break down an existing backlog item.

---

## Inputs

- The project or feature (goal, scope, constraints).
- Optional:
  - Time budget (weeks/sprints).
  - Current skill levels per area.
  - Existing code that must be integrated.

---

## Outputs

A plan document saved under `learning/` via the `learning-log` tool:

- `learning/project-plan-<project>.md`

Sections:

1. Goal & success criteria
2. Phase 0 – Spec (requirements, acceptance criteria)
3. Phase 1 – Architecture (components, data flow, ADR pointers)
4. Phase 2 – Implementation (steps, per-module)
5. Phase 3 – Testing (unit, integration, evaluation)
6. Phase 4 – Deployment (Docker, CI/CD, monitoring)
7. Sprint mapping (what ships each week)
8. Risks & open questions

---

## Step-by-Step Workflow

1. **Clarify the goal**
   - What is the project/feature? What does "done" look like? What is out of scope?

2. **Define phases and deliverables**
   - For each phase: outcome, artifacts, and how to verify it is complete.

3. **Order dependencies**
   - Which phases/features depend on others? What can be parallelized?

4. **Map to sprints**
   - Assign phases (or sub-tasks) to weeks; keep each week ship-able.

5. **Identify risks**
   - Unknowns (libraries, data, model behavior) and how to de-risk (spikes, prototypes).

6. **Log the plan**
   - Call `learning-log` with `filePath: project-plan-<project>.md`.

7. **Track progress**
   - After each sprint, append a status update to the same file (what shipped,
     what changed, lessons learned).

---

## Notes

- Plans are living documents: append updates, don't rewrite history.
- If the plan grows beyond 2–3 weeks, review the sprint mapping with the user
  before starting.
