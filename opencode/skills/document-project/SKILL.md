---
name: document-project
description: >-
  Full-project documentation sweep: inventory every source file, write deep
  walkthroughs for each into docs/learning/walkthroughs/, produce
  architecture.md and modules/*.md, and keep a resumable coverage tracker at
  docs/learning/00-INDEX.md. Use when the user says "explain the whole project",
  "document everything", "/document-project", or wants complete coverage of a
  codebase in Markdown files.
---

# Skill: document-project

## Purpose

Turn an entire repository into a **living textbook** under
`<repo>/docs/learning/`:

- every source file gets a **deep walkthrough** (deep-detail standard),
- the system gets an **architecture map** with mermaid diagrams,
- a **coverage tracker** (`00-INDEX.md`) shows what is documented, what is
  stale, and what still needs a walkthrough.

The sweep is **resumable**: run it once, and any later run continues from the
first `pending` file instead of redoing everything.

---

## When to Use

Use this skill when:

- The user says "explain the whole project in Markdown", "وثّق المشروع كامل",
  "document everything", or invokes `/document-project`.
- Onboarding to a new or unfamiliar repo and wanting complete coverage.
- A repo has grown and the existing docs are incomplete or scattered.
- Preparing for a big refactor and needing a complete map first.

---

## Folder Structure (target)

```
docs/learning/
  00-INDEX.md                     # navigation hub + coverage tracker (created first)
  architecture.md                 # full-project architecture + mermaid diagrams
  modules/<module>.md             # per-module summaries
  walkthroughs/<repo-path>.md     # one deep walkthrough per source file
  decisions/  design/  reviews/  sessions/  curricula/  diffs/  legacy/
```

---

## Step-by-Step Workflow

### 1. Inventory the repo

- Use `glob` to list all source files. Categories to include:
  - Code: `**/*.{py,js,ts,tsx,jsx,go,rs,java,kt,rb,php}` etc.
  - Config: `*.{json,yaml,yml,toml,ini,cfg,toml}`, `Dockerfile`, `docker-compose*`
  - Tests: `test*`, `*_test.*`, `spec*` (document these too — they teach intent)
  - Scripts: `scripts/**`, `Makefile`, `*.sh`, `*.ps1`
  - Infra: `*.tf`, `*.k8s.yaml`, `*.nix`, CI files under `.github/`, `.gitlab-ci.yml`
- **Exclude** (never document these):
  - `.git/`, `node_modules/`, `.venv/`, `venv/`, `dist/`, `build/`, `target/`,
    `__pycache__/`, `*.min.js`, lock files (`package-lock.json`, `poetry.lock`),
    `docs/learning/` itself, and any generated/third-party folder.
- Sort the inventory by directory so batches are coherent.
- **Detect project type** (AI/ML, web, data, infra, notebooks, monorepo) using
  the signal table in the `project-type-docs` skill; note it for step 3.5.
- **Monorepo**: if `packages/*`, `apps/*`, or `modules/*` each have their own
  manifest, treat each as a package — see step 3.5.
- If the repo is huge, ask the user which directories to prioritize, or document
  top-level dirs first and leave the rest `pending`.

### 2. Bootstrap `docs/learning/`

- Create the folder structure (the `learning-log` tool creates subfolders on demand).
- Create `docs/learning/00-INDEX.md` with:

```markdown
# Learning Index — <repo-name>
Updated: <YYYY-MM-DD> | Coverage: <done>/<total> files (<percent>%)
<!-- Badge: ![docs](https://img.shields.io/badge/docs-<percent>%25-<color>) -->

## Map
- [architecture.md](architecture.md)
- [modules/](modules/)

## Walkthroughs
| File | Doc | Status | Last updated |
|---|---|---|---|
| src/main.py | [walkthroughs/src/main.py.md](walkthroughs/src/main.py.md) | new | 2026-08-05 |
| src/api/routes.py | ... | pending | — |

## Other docs
- [sessions/](sessions/) · [decisions/](decisions/) · [design/](design/) ·
  [reviews/](reviews/) · [curricula/](curricula/) · [diffs/](diffs/) ·
  [api/](api/) · [ops/](ops/) · [security/](security/) · [legacy/](legacy/)

## Pending
- [ ] src/api/routes.py
- [ ] tests/test_rag.py
```

- Coverage % = files with a walkthrough / total inventory files.
- Update this file **after every batch** — it is the resumability checkpoint.
- The badge comment is used by `docs-publish` (coverage badge in README).

### 3. Architecture pass

- Read README, `docs/`, manifests (`pyproject.toml`, `package.json`,
  `requirements.txt`, `Cargo.toml`, `go.mod`), and entry points.
- Write `docs/learning/architecture.md` (use `understand-anything` skill):
  repo purpose, top-level structure, modules, services, entry points & endpoints,
  data stores, agents/pipelines, tech stack, recommended reading order.
- Include **mermaid diagrams**: module dependency graph, main data flow,
  request lifecycle (sequence diagram).
- Write `docs/learning/modules/<module>.md` per major module: responsibility,
  key files, entry points, dependencies, open questions.

### 3.5 Specialized docs (by project type)

- Load the `project-type-docs` skill with the detected type(s) and generate the
  matching artifact set: AI → `ai/` (model cards, prompts, eval, vector index);
  web → `api/`, `ui/`, `config/`; data → `data/`; infra → `ops/`; notebooks →
  `notebooks/`; monorepo → per-package `packages/<pkg>/00-INDEX.md` + a
  `## Packages` map in the root index and a cross-package dependency diagram in
  `architecture.md`.
- Confirm the artifact list with the user first (they may skip runbooks, etc.).

### 3.6 Deprecation marking

- After re-inventorying, any file that used to have a walkthrough but is no
  longer in the repo gets its index row moved to an `## Archived` section
  (mark `archived <date>` instead of deleting the walkthrough — history stays).

### 4. Batch pass (deep walkthroughs)

- Process **one directory per batch** (e.g. `src/`, then `tests/`, then `config/`).
- For each file in the batch, produce a walkthrough following the
  `code-walkthrough` **deep-detail standard**:
  TL;DR → Overview & Role → Imports & Dependencies → Structure (signatures) →
  Execution Flow (line refs) → Responsibilities → Patterns → Edge Cases &
  Failure Modes → Performance Notes → Exercises → Next Steps.
- Output path: `docs/learning/walkthroughs/<relative-repo-path>.md`
  (e.g. `src/api/routes.py` → `walkthroughs/src/api/routes.py.md`).
- Write via the `learning-log` tool (`mode: overwrite` if the doc exists).
- **Parallelize**: delegate batches to the `documenter` subagent
  (`@documenter "Process this batch: <files>"`) so multiple batches can run
  concurrently. Collect each batch's results.
- Small files (config, one-liners) get a compact walkthrough: overview,
  keys/structure, purpose, pitfalls. No need for 10 sections on a 20-line file.

### 5. After each batch — checkpoint

- Update `00-INDEX.md`: mark processed files `new`/`updated <date>`, remove them
  from Pending, recompute coverage %.
- If interrupted, the next run resumes from the first `pending` entry.

### 6. Update mode (`/document-project update`)

- Re-inventory the repo and compare against the index.
- For each file whose source changed after its walkthrough date (use git
  `git log -1 --format=%ci -- <file>` or file mtime), mark it `stale`, then
  re-walk it and mark `updated <date>`.
- Never touch files whose docs are current.

### 7. Finish

- Final `00-INDEX.md` refresh with coverage summary.
- **Guided tour** (optional, recommended for onboarding): load the
  `guided-tour` skill and append a `## Guided Tour — <persona>` section to the
  index.
- Report to the user:
  - files documented, files pending, coverage %,
  - specialized artifacts produced (ai/, api/, ops/, ...),
  - where to start reading (guided tour or `architecture.md`),
  - what is excluded and why,
  - offer `/document-project update` after future changes,
  - offer `docs-publish` if they want a README badge or a browsable site.

---

## Quality Gates

- Every walkthrough follows the deep-detail standard (compact variant allowed
  for tiny files).
- `00-INDEX.md` exists and its coverage % is honest (recomputed each batch).
- No secrets: never copy `.env`, credentials, or tokens into docs.
- English only for generated docs (per global rules).
- No source edits: this skill is read-only for code; it only writes
  `docs/learning/` via `learning-log`.

---

## Notes

- Huge repos: document in waves (core dirs first), leaving the rest `pending` —
  the index makes this safe.
- If a walkthrough gets long (> 400 lines), split the file into sections or
  split the file's doc (e.g. `walkthroughs/src/big.py.part1.md`).
- Keep `architecture.md` and module docs updated when the batch pass reveals
  something the overview missed.
