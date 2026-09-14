---
name: threat-model
description: >-
  Build a security threat model for a subsystem or the whole app:
  assets, trust boundaries, data flows, attack paths, mitigations, residual
  risk. Produces docs/learning/security/threat-model-<area>.md. Use when asked
  for a security review, "how could this be attacked", or before exposing
  endpoints/APIs. Pairs with review-teacher.
---

# Skill: threat-model

## Purpose

Find the **attack paths** before attackers do. A threat model turns a security
question into a structured document: what matters, where trust ends, how data
flows, and which mitigations exist.

---

## When to Use

Use this skill when:

- The user asks "how could this be attacked?" or wants a security review.
- Building/opening a new endpoint, webhook, auth flow, or data pipeline.
- `review-teacher` finds security concerns and the user wants them documented.
- Preparing an audit or onboarding a security-minded reviewer.

---

## Inputs

- The scope: whole app or one subsystem (e.g. auth, RAG pipeline, API layer).
- Optional: known attack surface (public endpoints, file uploads, LLM prompts).

---

## Outputs

`docs/learning/security/threat-model-<area>.md` via `learning-log`:

1. **Scope & assets** — what is protected: data, tokens, secrets, compute,
   model outputs. (Names only — never secret values.)
2. **Trust boundaries** — user ↔ API ↔ services ↔ DB ↔ external APIs/LLMs;
   where authentication/authorization happens (or should).
3. **Data flows** — request lifecycle with data sensitivity labels
   (public / PII / secret / internal).
4. **Attack paths** — for each boundary: threats (spoofing, tampering,
   repudiation, info disclosure, DoS, elevation — STRIDE), entry points,
   existing controls, gaps.
5. **AI-specific threats** (if applicable) — prompt injection, jailbreaks,
   data leakage through prompts, hallucination in security-critical outputs,
   embedding/vector-store poisoning.
6. **Mitigations** — ordered: what exists, what should be added (with severity).
7. **Residual risk** — what remains accepted, and the review date.

---

## Step-by-Step Workflow

1. **Read the surface** — entry points (routes, workers, cron, CLI), auth
   middleware, secret handling, LLM/API calls.
2. **Draw trust boundaries** — identify where untrusted input first enters.
3. **Apply STRIDE per boundary** — keep it concrete: cite code/config where
   controls exist or are missing.
4. **Check the AI layer** — review prompt assembly, output validation, tool
   access control if the app uses LLMs.
5. **Write the model** — `learning-log` → `security/threat-model-<area>.md`.
6. **Prioritize** — rank findings by severity × likelihood; list top 3 to fix
   first; offer to log a `decision-rationale` for the fixes.

---

## Notes

- NEVER paste secrets, tokens, `.env` content, or real user data.
- This is analysis, not a penetration test: mark assumptions as assumptions.
- Pair with `review-teacher` for code-level findings; the threat model gives
  the document-level picture.
