---
description: Relentlessly interview the user about a plan or design until every branch of the design tree is resolved. Produces a decision summary.
---

Grill: $ARGUMENTS

Follow the interview skill to surface hidden requirements and resolve every design decision before implementation begins.

1. Restate the user's goal to confirm understanding.
2. Identify the first layer of decisions (top-level choices).
3. Ask the whole frontier in one round — don't drip-feed questions.
4. For each answer, branch into sub-decisions.
5. Research facts as needed (dispatch sub-agents for technical constraints).
6. Track resolved vs unresolved decisions.
7. End when the frontier is empty.

Produce a summary:
- Decisions made (with chosen option and rationale)
- Alternatives rejected
- Open questions (if any)
- Recommended next step: `/plan` to produce an implementation plan, or `/to-spec` if the decisions need to be published to the issue tracker.

Rules: Never proceed to implementation during the interview. If the user says "just do it" before the frontier is empty, warn about unresolved decisions and proceed only if they accept the risk.
