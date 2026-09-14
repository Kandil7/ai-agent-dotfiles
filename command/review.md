---
description: Two-axis code review: Standards (coding standards + Fowler smells) vs Spec (does it implement the originating spec?). Runs parallel sub-agents and reports side by side. Security audit included. READ ONLY.
agent: reviewer
---

READ ONLY. Do not modify anything.

Review all uncommitted changes (and the last commit if requested) using the two-axis code-review skill:

**Standards axis**: Does the code conform to repo coding standards? Does it have Fowler smells (Mysterious Name, Duplicated Code, Feature Envy, Data Clumps, Primitive Obsession, Repeated Switches, Shotgun Surgery, Divergent Change, Speculative Generality, Message Chains, Middle Man, Refused Bequest)?

**Spec axis**: Does the code faithfully implement the originating issue/spec? What's missing? What's scope creep?

**Security axis**: Does the code have security vulnerabilities?

All three axes run as **parallel sub-agents** so they don't pollute each other, then findings are reported **side by side, never merged**.

Process:
1. Pin the fixed point (commit, branch, tag — default: uncommitted changes)
2. Identify the spec source (commit refs, issue tracker, spec files, or ask user)
3. Identify standards sources (CODING_STANDARDS.md, CONTRIBUTING.md, plus Fowler baseline)
4. Spawn all three sub-agents in parallel:
   - **Standards**: coding standards + Fowler smells
   - **Spec**: requirements fidelity check
   - **Security**: secrets, injection, unsafe deserialization, path traversal, permission issues, dependency vulnerabilities
5. Aggregate: `## Standards`, `## Spec`, and `## Security` headings, verbatim. Total findings per axis, worst within each.

Also check:
- New dependencies: needed? versions pinned? known issues?

Report per finding: severity (critical/major/minor/nit), file:line, description, suggested fix. Label FACT vs INFERENCE. End with verdict: approve / approve with changes / rework. Modify nothing.
