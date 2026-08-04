---
name: understand-anything
description: >-
  Build a high-level map of any codebase: modules, services, endpoints, data
  stores, agents, and pipelines. Produces learning/overview-<repo>.md used as a
  navigation map for all deeper learning sessions.
---

# Skill: understand-anything

## Purpose

Build a **high-level map of any repository** — modules, services, endpoints, data
stores, agents/pipelines — so deeper learning sessions have a navigation map.

This skill is **orientation-first**: see the forest before the trees.

---

## When to Use

Use this skill when:

- Opening a project for the first time ("ارسم لي overview للمشروع ده").
- Starting a new learning arc and needing context.
- Preparing a `code-walkthrough` or `design-alternatives` session.
- Onboarding to someone else's repo.

---

## Inputs

- The repository (current working directory).
- Optional: focus depth (quick scan vs thorough map).

---

## Outputs

An overview document saved under `learning/` via the `learning-log` tool:

- `learning/overview-<repo>.md`

Sections:

1. Repo purpose (from README/docs)
2. Top-level structure (directories and their roles)
3. Modules / packages
4. Services and their responsibilities
5. Entry points & endpoints (CLI, API routes)
6. Data stores (databases, vector stores, caches)
7. Agents / pipelines (if any)
8. Tech stack summary
9. Where to start learning (recommended reading order)

---

## Step-by-Step Workflow

1. **Read the docs**
   - Start with README, docs/, and package manifests (requirements.txt, pyproject.toml,
     package.json, Dockerfile) to identify intent and stack.

2. **Scan the structure**
   - List top-level directories and their purpose (config, src, tests, data, scripts).

3. **Map modules → services → endpoints**
   - Read entry points (main, app factories, routers, CLI) to trace how modules connect.
   - Identify API endpoints and their handlers.

4. **Find data stores**
   - Look for DB connections, ORM models, vector store clients, cache configs.

5. **Identify agents/pipelines**
   - Locate agent definitions, RAG pipelines, background jobs.

6. **Write the map**
   - Call `learning-log` with `filePath: overview-<repo>.md`.

7. **Recommend reading order**
   - Suggest which files to study first, based on the user's goal.

---

## Notes

- The overview is the entry point for all other skills — keep it accurate and updated.
- If the repo is huge, produce the map incrementally (per subsystem) and append.
