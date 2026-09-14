---
name: api-reference
description: >-
  Generate docs/learning/api/reference.md from the repo's API surface: OpenAPI
  spec (openapi.json/yaml), FastAPI/DRF route decorators, or Express/Next
  route handlers. Produces an endpoint table (method, path, auth, summary) and
  per-endpoint details (params, request/response, error codes). Use when asked
  for API docs, endpoint reference, or "what endpoints exist".
---

# Skill: api-reference

## Purpose

Turn the repo's **declared API surface** into a deterministic reference
document under `docs/learning/api/reference.md`. Unlike the cookbook
(hand-written examples), the reference mirrors what the code actually declares,
so it stays accurate.

---

## When to Use

Use this skill when:

- The user asks "what endpoints does this app expose?" or "document the API".
- The repo has an OpenAPI spec, FastAPI/DRF routers, or Express/Next routes.
- `project-type-docs` detects a web app and the API reference is requested.

---

## Inputs

- The API declaration source:
  - `openapi.json` / `openapi.yaml` / `swagger.json` (best — declarative),
  - or route declarations: FastAPI `@app.get(...)`, DRF `urlpatterns`,
    Express `app.get(...)`, Next route files.
- Optional: base URL, auth scheme, and a list of "focus endpoints".

---

## Outputs

`docs/learning/api/reference.md` via `learning-log`:

1. **Overview** — base URL, auth scheme, version, link to the spec file.
2. **Endpoint table** — method, path, auth required, one-line summary.
3. **Per-endpoint details** — path/query/body params (name, type, required),
   request example, response shape, error codes (4xx/5xx) the code declares.
4. **Groups** — organize by router/controller/module.
5. **Drift notes** — anything the code implies but the spec omits.

---

## Step-by-Step Workflow

1. **Find the source** — glob for `openapi*.{json,yaml,yml}`, `swagger*`,
   read router files (`routers/`, `urls.py`, `routes/`, `app/api/`).
2. **Extract endpoints** — from the spec: iterate `paths`; from code: collect
   decorators/route registrations (method + path + handler).
3. **Build the table** — sort by path; include auth flags (from
   dependencies/`requiresAuth`).
4. **Detail each endpoint** — read the handler/schema for params and responses;
   quote only signatures and schema names, not whole bodies.
5. **Write** — `learning-log` → `api/reference.md` (overwrite if exists).
6. **Link** — add to `00-INDEX.md`; cross-link the cookbook if present.
7. **Report** — endpoint count, any endpoints found in code but missing from
   the spec (spec drift — worth flagging to the team).

---

## Notes

- Read-only for code; writes only to `docs/learning/`.
- If the spec is huge (>200 endpoints), document by router group in separate
  files (`api/reference-<group>.md`) and index them.
- Values only — never copy tokens/secrets from config into examples unless the
  user explicitly provides a safe sample.
