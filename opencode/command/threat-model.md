---
description: >-
  Build a security threat model for an area of the project:
  docs/learning/security/threat-model-<area>.md — assets, trust boundaries,
  threats, mitigations. Use for auth, payments, uploads, APIs, or before a
  security review. $ARGUMENTS = area name.
agent: learning
---

Build a threat model for the area.

Instructions:

1. Load the `threat-model` skill and follow its workflow.
2. Scope: $ARGUMENTS (e.g. "auth", "file-upload", "api") or ask. Identify
   assets, trust boundaries, and entry points in the actual repo.
3. Write the threat model via `learning-log` →
   `security/threat-model-<area>.md`:
   - Assets: what an attacker would want
   - Trust boundaries: where trust changes (auth checks, public endpoints)
   - Threats: STRIDE-style list ranked by likelihood x impact
   - Mitigations: concrete, mapped to the repo's code where possible
4. Flag the top 2 risks in the reply and suggest either fixes or a
   `review-teacher` security pass.
5. Update `00-INDEX.md` if the security folder is listed there.

Tone: rigorous but practical — every threat must map to this repo, not to
textbook abstractions.
