---
description: >-
  Initialize code intelligence for a project: index the codebase,
  generate docs/CODEBASE-INTELLIGENCE.md with Mermaid architecture
  diagram, and add a README badge.
argument-hint: "[project-name-or-path]"
---

Initialize codebase-memory-mcp + graphify for the current or specified project.

## Available MCP tools (server prefixes)

- `codebase-memory-mcp_*` — structural graph (index, search, trace, architecture)
- `graphify_*` — multimodal graph (query, god_nodes, shortest_path, PR impact)
- `repomix_*` — context packing (pack_codebase, grep output)
- `code-review-graph_*` — review blast-radius (detect_changes, get_impact_radius)

## Steps

### 1. Detect project

- If `$ARGUMENTS` is provided: use it as the project path or name.
  - If it's a path (contains `/` or `\`), resolve it.
  - If it's a name, look under `D:\AI\Projects\<name>`.
- If no arguments: use the current working directory.
- Verify the path exists and contains source code.

### 2. Check index status

Call `codebase-memory-mcp_list_projects` to see if this project is already indexed.

- If indexed: call `codebase-memory-mcp_index_status` to get current stats.
- If not indexed: proceed to step 3.

### 3. Index the project (if needed)

Call `codebase-memory-mcp_index_repository` with:
- `repo_path`: the detected project root
- `project`: derived project name (lowercase, hyphens for spaces)
- `mode`: `"full"`

Report indexing progress. Wait for completion.

### 4. Get architecture data

Call `codebase-memory-mcp_get_architecture` with:
- `project`: the project name
- `aspects`: `["all"]`

This returns: languages, packages, entry points, routes, hotspots, boundaries, layers, clusters, cycles, file tree.

### 5. Generate Mermaid diagram

From the architecture data, synthesize a Mermaid `graph TD` diagram:

1. **Subgraphs** for major layers (API, Core, Data, CLI, etc.) — derived from packages/clusters.
2. **Nodes** for entry points and key hotspots — use short names.
3. **Edges** for CALLS, IMPORTS, HTTP_CALLS relationships.
4. **Styling**: highlight hotspots in red, entry points in blue.

Max 30 nodes. Group by package/cluster. Use short labels.

### 6. Build graphify graph (if docs/ exists)

If the project has a `docs/` directory with 5+ markdown files:
1. Create a graphify graph from the project root
2. Use `graphify_query_graph` to find cross-references between code and docs
3. Include graphify insights in the CODEBASE-INTELLIGENCE.md

### 7. Pack context summary

Call `repomix_pack_codebase` with:
- `path`: project root
- `format`: `"markdown"`
- `compress`: `true`

This creates a token-efficient summary useful for onboarding new agents.

### 8. Write docs/CODEBASE-INTELLIGENCE.md

Create or update `docs/CODEBASE-INTELLIGENCE.md`:

```markdown
# Code Intelligence

Multi-layered code intelligence powered by codebase-memory-mcp, graphify, and repomix.

## Status

| Layer | Status | Details |
|-------|--------|---------|
| **Structural Graph** | ✅ Indexed | `<db-name>`, `<size>`, `<nodes>` nodes, `<edges>` edges |
| **Multimodal Graph** | ✅ Built | `<graph_nodes>` nodes from code + docs |
| **Context Pack** | ✅ Ready | `<tokens>` tokens, compress mode |
| **Watcher** | ✅ Active | Auto re-indexes on git changes |

## Architecture

\`\`\`mermaid
<generated diagram>
\`\`\`

## Quick Reference

| Question | Tool call |
|----------|----------|
| Who calls X? | `codebase-memory-mcp_trace_path(direction="inbound")` |
| What does X call? | `codebase-memory-mcp_trace_path(direction="outbound")` |
| Find by pattern | `codebase-memory-mcp_search_graph(name_pattern="...")` |
| Dead code | `codebase-memory-mcp_search_graph(max_degree=0)` |
| Impact of changes | `codebase-memory-mcp_detect_changes()` |
| Cross-doc references | `graphify_query_graph(query="...")` |
| God nodes | `graphify_god_nodes()`` |
| Shortest path | `graphify_shortest_path(from="...", to="...")` |
| Pack for LLM | `repomix_pack_codebase(path="...")` |

## How to re-index

\`\`\`
codebase-memory-mcp index_repository --project <name> --repo_path <path>
\`\`\`

## What it covers

<language-specific description>

## Agent tiers

| Tier | When to use | Tools |
|------|-------------|-------|
| **Scout** | Quick lookup, provisional | 7 graph + 6 repomix tools |
| **Verify** | Task-directed evidence | 15 graph + 10 graphify + coverage checks |
| **Auditor** | Full bounded verification | All tools, complete pagination |
```

### 9. Update README badge

Check if the project's README.md already has a CBM badge (search for `CODEBASE-INTELLIGENCE` or `Code_Graph`).

- If missing: add a badge matching the existing style.
- If present: skip.

### 10. Report

Summarize:
- Project name and path
- Indexed: yes/no (with node/edge counts)
- Graphify: built/not built
- Repomix: packed (token count)
- Mermaid diagram: generated (node count)
- README badge: added/skipped
- Files created/updated

## Safety

- Read-only for source code. Write only `docs/CODEBASE-INTELLIGENCE.md` and badge in README.
- Do not commit. Do not install anything.
- If the project is already fully set up, report and skip.
