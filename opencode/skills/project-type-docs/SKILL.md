---
name: project-type-docs
description: >-
  Detect the project type (AI/ML, web app, data platform, infrastructure,
  notebooks, monorepo) and generate the specialized documentation set for it:
  model cards, prompt registry, eval reports, API cookbook, component catalog,
  env vars reference, data dictionary, lineage, pipeline docs, runbooks, CI/CD
  docs, per-package indexes. Use when asked to document a project beyond plain
  walkthroughs, or when /document-project detects a specialized repo.
---

# Skill: project-type-docs

## Purpose

Plain walkthroughs explain files; **specialized docs explain the domain**.
Depending on the project type, add the artifacts below so the `docs/learning/`
tree answers the questions people actually ask about that kind of repo.

---

## 1. Detect the project type

| Signal (files/contents) | Type |
|---|---|
| `requirements.txt`/`pyproject.toml` with `langchain`, `openai`, `sentence-transformers`, `faiss`, `chromadb`, `qdrant`, `torch`, `transformers`; `*.ipynb` with model cells | **AI/ML** |
| `package.json` with `react`, `vue`, `next`, `express`, `fastapi`, `django`, `flask`, `drf`; `src/` + `templates/` | **Web** |
| `dbt_project.yml`, `airflow/`, `dagster`, `*.sql` + `migrations/`, `spark`, `kafka` | **Data** |
| `*.tf`, `Dockerfile`, `docker-compose*`, `*.k8s.yaml`, `helm/`, `*.nix`, `.github/workflows/`, `.gitlab-ci.yml` | **Infra** |
| `*.ipynb` dominating the tree | **Notebooks** |
| `packages/*`, `apps/*`, `modules/*` each with own manifest | **Monorepo** |

A repo can match several; generate the artifact set for each match.

---

## 2. Artifact catalog (folder → content)

### AI/ML projects → `docs/learning/ai/`
- **`model-cards/<model>.md`** — one per model: purpose, input/output schema,
  context window, temperature/prompts used, known limitations, when NOT to use.
- **`prompts.md`** — the prompt registry: every system/user prompt, versioned,
  with where it is used in code (file:line) and its last change date.
- **`eval-<date>.md`** — eval report: dataset, metrics (accuracy, faithfulness,
  recall@k), failure samples with analysis, regression vs previous run.
- **`vector-index.md`** — embedding model, chunking strategy, collection/table
  names, index type, current doc counts, how to rebuild.

### Web apps → `docs/learning/api/` + `docs/learning/ui/` + `docs/learning/config/`
- **`api/cookbook.md`** — realistic request/response examples per endpoint
  (auth header, params, body, sample output, error cases). Human-verified.
- **`ui/components.md`** — component catalog: each component, props, state
  managed, where used, accessibility notes.
- **`ui/state.md`** — state management: stores/contexts, what each holds,
  update flow, persistence.
- **`config/env-vars.md`** — every environment variable: name, default, where
  used (file:line), what it controls. NEVER include values — names only.

### Data platforms → `docs/learning/data/`
- **`dictionary.md`** — data dictionary: table/model → meaning, key fields,
  owner, cardinality notes.
- **`lineage.md`** — ERD + lineage diagrams (mermaid `erDiagram` /
  `flowchart`): sources → transforms → destinations.
- **`pipelines.md`** — each DAG/job: schedule, dependencies, input/output
  tables, failure behavior, how to backfill.
- **`schema-evolution.md`** — append-only log of schema changes (date, change,
  migration name, impact).

### Infrastructure → `docs/learning/ops/`
- **`runbooks/<runbook>.md`** — one per operational task: deploy, rollback,
  scale, restart service, debug incident X. Steps + expected outputs + gotchas.
- **`resources.md`** — resource graph: what is deployed where (envs, services,
  storage), how pieces connect.
- **`cicd.md`** — pipeline doc: stages, triggers, environments, artifact flow,
  where secrets are used (names only).

### Notebooks → `docs/learning/notebooks/`
- **`<notebook-name>.md`** — narrative walkthrough: question → data → steps →
  findings; map cells to sections; note reruns/parameter changes.
- **`experiments.md`** — dated experiment log: hypothesis, setup, result,
  next step. Append-only.

### Monorepo → `docs/learning/packages/<pkg>/`
- **`00-INDEX.md`** per package (same coverage format as the root index).
- **`<pkg>/overview.md`** — package purpose, entry points, its walkthroughs.
- Root `00-INDEX.md` gains a **`packages/` map**: package → purpose → link,
  plus a cross-package dependency diagram in `architecture.md`.

---

## 3. Workflow

1. **Detect type(s)** — use the signal table; confirm with the user if mixed.
2. **Propose the artifact list** — show which files will be created so the user
   can trim (e.g. skip runbooks for a toy repo).
3. **Generate each artifact** — via `learning-log` with the folder paths above;
   follow each artifact's content spec. Read the real code/specs — never invent
   endpoints, tables, or models.
4. **Link from the index** — add every artifact to `00-INDEX.md` under a
   `Specialized docs` section (or the package index for monorepos).
5. **Report** — list created artifacts; flag anything that needs human
   verification (e.g. deployment details in runbooks).

---

## Notes

- Artifacts are English-only, secret-free (names, never values).
- These docs complement — never replace — the standard `walkthroughs/`.
- Re-run for a single artifact ("update just the prompt registry") by calling
  the corresponding section; the index keeps it findable.
