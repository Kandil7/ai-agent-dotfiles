---
name: wayfinder
description: "Plan a huge chunk of work too big for one session. Charts a shared map of decision tickets, resolves them one at a time until the way to the destination is clear."
---

# Wayfinder (for huge efforts)

For work too big for one agent session. Charts a **shared map** and resolves it incrementally, one ticket at a time.

## When to use

- The effort spans multiple sessions (e.g., building Athar RAG from scratch, migrating a data pipeline)
- The destination is clear but the path is foggy
- You need to make many decisions before you can implement anything

## How it works

### The map

The map is a single document (issue, markdown file, or project board) that tracks:

- **Destination**: what we're building toward (one sentence)
- **Notes**: anything useful for navigation
- **Decisions so far**: ADRs or short summaries of decisions already resolved
- **Tickets**: the individual work items, each sized to one session

### Ticket types

- **Decision tickets**: questions to resolve (e.g., "Which vector DB for the Athar index?"). Research + user decision = done.
- **Task tickets**: concrete work to do (e.g., "Implement chunking pipeline for Quran text"). Code + tests + documentation = done.

### Fog of war

The map is **deliberately incomplete**. You don't need to know every ticket before you start. Tickets emerge from the fog as the frontier advances. This is a feature, not a defect.

### Resolution rules

- Never resolve more than one ticket per session (except research tickets, which are cheap).
- Each ticket produces an artifact: an ADR (for decisions) or code + docs (for tasks).
- After resolving a ticket, update the map: mark it done, note what new tickets emerged.

## Creating a wayfinder map

1. Confirm the destination with the user.
2. Identify the first few tickets (what's at the frontier of what you know?).
3. Create the map document.
4. Resolve the first ticket.
5. Report what opened up.

## Rules

- The map is a living document. Update it as you go.
- If a ticket turns out to be bigger than one session, split it.
- If you get lost (the map doesn't help anymore), stop and re-chart with the user.
