---
name: interview
description: "Reusable interview primitive. Relentlessly grills the user about a plan, decision, or idea until every branch of the design tree is resolved. The grilling pattern behind /grill and other orchestrating commands."
---

# Interview Primitive (Grilling)

A structured interview that surfaces hidden requirements and resolves every branch of the design tree before implementation begins.

## How it works

### The design tree

Every decision branches into sub-decisions. The interview maps these as a tree and works them off systematically.

Example: "I want to add authentication" branches into:
- What kind? (JWT, session, OAuth)
- Where stored? (cookie, localStorage, memory)
- What protected? (routes, data, both)
- How expires? (sliding, fixed, never)
- Each of those branches further...

### The frontier

The **frontier** = every decision whose prerequisites are already settled but whose value is not yet determined.

Work in **rounds**: ask the whole frontier (all unblocked questions) in one round. Don't ask questions whose prerequisites aren't settled yet.

### Finding facts vs making decisions

- **Finding facts** is the agent's job. Dispatch sub-agents to research technical constraints, compatibility, performance characteristics.
- **Decisions** are the user's job. The agent presents options with tradeoffs; the user picks.

### Session ends when the frontier is empty

Nothing left silently assumed. Every design decision with more than one plausible option has been explicitly resolved.

## Interview mechanics

1. **Start with the user's stated goal.** Restate it to confirm understanding.
2. **Identify the first layer of decisions.** What are the top-level choices that need to be made?
3. **Ask the whole frontier in one round.** Don't drip-feed questions one at a time.
4. **For each answer, branch.** What sub-decisions does this answer create?
5. **Research as needed.** If a decision depends on a fact the agent doesn't have, dispatch a sub-agent to find it.
6. **Track resolved vs unresolved.** Show the user what's settled and what's still open.
7. **End when the frontier is empty.** Summarize all decisions made.

## Output

After the interview, produce a summary:
- **Decisions made**: each decision with the chosen option and rationale
- **Alternatives rejected**: what was considered and why it was declined
- **Open questions**: anything that couldn't be resolved (needs more info, user unsure)
- **Recommended next step**: what to do with the resolved decisions (spec, plan, implement)

## Rules

- Never proceed to implementation during the interview. The interview produces decisions; implementation comes after.
- If the user says "just do it" before the frontier is empty, warn them about the unresolved decisions and proceed only if they explicitly accept the risk.
- Be relentless about sub-decisions. "We'll use JWT" raises: where stored? what claims? what expiry? what refresh strategy? Don't let these stay silent.
- Label answers as FACT (verified technical constraint) vs CHOICE (user's decision) vs DEFAULT (will be used if user doesn't object).
