---
name: understand-anything
description: >-
  Build a high-level map of any codebase: modules, services, endpoints, data
  stores, agents, and pipelines. Produces docs/learning/architecture.md with
  mermaid diagrams, docs/learning/modules/*.md summaries, and the
  docs/learning/00-INDEX.md coverage tracker used as navigation map for all
  deeper learning sessions.
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

Documents saved under `docs/learning/` via the `learning-log` tool:

1. **`docs/learning/architecture.md`** — the full-project architecture map:
   1. Repo purpose (from README/docs)
   2. Top-level structure (directories and their roles)
   3. Modules / packages
   4. Services and their responsibilities
   5. Entry points & endpoints (CLI, API routes)
   6. Data stores (databases, vector stores, caches)
   7. Agents / pipelines (if any)
   8. Tech stack summary
   9. Where to start learning (recommended reading order)
   - Include **mermaid diagrams**: module dependency graph, main data flow,
     and request lifecycle when the system is non-trivial.

2. **`docs/learning/modules/<module>.md`** — one summary per major module/subsystem:
   responsibility, key files, entry points, dependencies, open questions.

3. **`docs/learning/00-INDEX.md`** — the coverage tracker (see `document-project`):
   a table of documented files with status (new / updated / stale / pending),
   plus links to all docs. This becomes the navigation hub for the whole
   `docs/learning/` tree.

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
   - Call `learning-log` with `filePath: architecture.md` (overwrite mode if it exists)
     and one `modules/<module>.md` per major module.
7. **Bootstrap the index**
   - Create/refresh `docs/learning/00-INDEX.md` listing everything produced and the
     documented files with status `new`.
8. **Recommend reading order**
   - Suggest which files to study first, based on the user's goal.

---

## Notes

- The overview is the entry point for all other skills — keep it accurate and updated.
- If the repo is huge, produce the map incrementally (per subsystem) and append.
