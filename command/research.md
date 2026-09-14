---
description: READ ONLY. Research a topic and verify against official documentation. Records version assumptions and confidence levels. Modifies nothing.
agent: researcher
---

Research: $ARGUMENTS

Follow the research skill method:

1. Prefer primary sources: official docs, upstream repos, papers, vendor release notes.
2. Anchor on the workstation: PyTorch 2.11.0+cu128, CUDA 12.9 runtime, driver 576.88, RTX 5000 (sm_75), Ubuntu 24.04. Check sm_75/Turing support explicitly for kernel libraries.
3. For compatibility questions ("does X work with Y"), find the official compatibility matrix before concluding.
4. Record every version assumption explicitly.
5. Never hallucinate APIs — if a claim cannot be verified, mark it UNKNOWN.

Report:
- Summary of findings
- Sources (primary first) with links
- Confidence per claim: FACT / INFERENCE / UNKNOWN
- Version assumptions
- A verification plan the user can run (commands, minimal code)

If the user wants findings persisted, propose the doc (e.g. docs/RESEARCH-<topic>.md) for approval.