---
name: docs-mcp
description: >-
  Expose docs/learning/ to other tools and agents through an MCP filesystem
  server: config snippet for opencode.json, security notes (read-only), and
  how to point external assistants at the docs. Use when the user asks to make
  the docs available to other AI tools, IDEs, or team agents.
---

# Skill: docs-mcp

## Purpose

Let **other agents and tools** (not just the learning system) consult the
project's docs. The simplest robust way: a filesystem MCP server pointed at
`docs/learning/` with read-only access.

---

## When to Use

Use this skill when:

- The user wants Copilot/other agents/IDEs to use the project docs.
- Multiple tools should share the same knowledge base.
- The user asks "خلّي التوثيق متاح لأدوات تانية" / "make the docs available
  to other tools".

---

## Step-by-Step Workflow

1. **Verify the docs exist** — `docs/learning/00-INDEX.md` present.
2. **Add an MCP server** — in the project's `opencode.json` (or the global
   config if the path is stable):

```json
{
  "mcp": {
    "project-docs": {
      "type": "local",
      "command": ["npx", "-y", "@modelcontextprotocol/server-filesystem", "./docs/learning"],
      "enabled": true
    }
  }
}
```

   - `./docs/learning` is relative to where opencode runs; use an absolute
     path if the tool is invoked from elsewhere.
   - Restart opencode after adding it.

3. **Security notes** (important):
   - Grant the server **only** `docs/learning` — never the whole repo root
     (that would expose source + secrets).
   - Consider a read-only wrapper if the tool supports it; the filesystem
     server allows reads by default — restrict write permissions in the
     client's permission rules:
     ```json
     "permission": { "mcp.project-docs.edit": "deny" }
     ```
   - `docs/learning/` is designed to be secret-free (rules forbid logging
     secrets) — but still treat it as internal until reviewed.

4. **Test** — ask the other agent "read the docs index and summarize the
   architecture" — it should answer from docs without reading source.

5. **Document it** — add a `docs/learning/ops/mcp-setup.md` note with the
   exact command so teammates can connect.

---

## Notes

- One server per repo (path differs); a monorepo could point at
  `packages/*/docs/learning` if you want cross-package access.
- This complements `context-load`: the skill works inside the learning agent;
  MCP exposes the same docs to everything else.
- If the team uses a remote MCP gateway, the same principle applies — expose
  the `docs/learning` folder read-only.
