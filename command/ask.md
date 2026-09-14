---
description: "Router — ask which command or flow fits your situation. One entry point instead of remembering all commands."
---

# Ask

Not sure which command to use? Describe your situation and I'll route you to the right one.

## Available commands

### Planning & Design
- `/grill <topic>` — relentlessly interview about a plan until every decision is resolved
- `/plan <topic>` — design a solution and produce an implementation plan (read-only)
- `/inspect` — survey the current project: architecture, deps, risks, TODOs (read-only)
- `/wayfinder <destination>` — chart a map for a huge multi-session effort

### Implementation
- `/implement <plan>` — execute an approved plan step by step
- `/test` — run the project's test suite
- `/debug <issue>` — gated diagnosis loop for hard bugs

### Quality
- `/review` — two-axis code review (Standards + Spec), parallel sub-agents
- `/security` — security review: secrets, deps, OWASP, AI-specific (read-only)

### Knowledge & Docs
- `/handoff` — compact conversation into a handoff document for another agent
- `/session-log <topic>` — 2-minute capture of the session
- `/document-project` — sweep docs/learning/ for stale walkthroughs
- `/domain-model <topic>` — sharpen the project glossary and CONTEXT.md

### Operations
- `/quickstart` — morning briefing: git, hardware, yesterday, priorities (read-only)
- `/status` — current state: git, tests, hardware (read-only)
- `/gpu` — one-shot GPU/hardware snapshot (read-only)
- `/resume` — recover context from last session (read-only)
- `/wrapup` — end-of-day: checkpoint, session log, next steps
- `/checkpoint` — regenerate PROJECT-CHECKPOINT.md

### AI/ML
- `/experiment <config>` — run a training/eval experiment
- `/evaluate <model>` — run evaluation metrics
- `/dataset <name>` — manage datasets
- `/benchmark <model>` — benchmark inference speed and VRAM
- `/diff` — compare two experiment runs
- `/migrate` — migrate models/configs between environments

### Cleanup & Ship
- `/cleanup <mode>` — clear GPU cache, old checkpoints, containers, disk
- `/deploy` — deploy to production
- `/serve` — start inference server

### Flutter
- `/flutter-test` — run Flutter tests (unit, widget, integration)
- `/flutter-build` — build for platform (apk/ios/web)
- `/flutter-analyze` — dart analyze + flutter analyze

### Backend
- `/api-design` — design REST API endpoints and schemas
- `/db-migrate` — create/review database migrations
- `/schema-review` — review database schema design

### Full Stack
- `/scaffold-api` — scaffold new API + frontend project
- `/frontend-build` — build and test frontend (typecheck, lint, test, bundle)

### AI Automation
- `/automate` — design automation workflow (n8n/Make.com)
- `/agent-build` — build an AI agent (tools, prompts, memory, guardrails)
- `/rag-pipeline` — build/evaluate a RAG pipeline

## How to use

Just describe what you're trying to do, and I'll tell you which command fits. Or if you already know the command, run it directly.
