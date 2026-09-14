---
name: codebase-memory
description: "Multi-layered code intelligence: structural graph (codebase-memory-mcp), multimodal graph (graphify), context packing (repomix), and PR review (code-review-graph). Triggers on: explore the codebase, architecture, functions, structure, who calls, trace, dependencies, impact, dead code, fan-out, refactor, audit, graph, Cypher, pack, context, PR review, blast radius."
---

# Code Intelligence — Multi-Layered Code Graph

5 MCP servers, 75+ tools, ~500 tokens per answer vs ~80K for grep.

## MCP Server Map

| Server | Tools | Best for |
|--------|-------|----------|
| `codebase-memory-mcp` | 15 | Structural graph (155 langs, tree-sitter + Hybrid LSP) |
| `code-review-graph` | 34 | PR blast-radius, community detection |
| `graphify` | 10 | Multimodal graph (code + docs), god nodes, PR triage |
| `repomix` | 6 | One-shot context packing |
| `context7` | — | Fresh library docs |

## Quick Decision Matrix

| Question | Tool call |
|----------|----------|
| Who calls X? | `trace_path(direction="inbound")` |
| What does X call? | `trace_path(direction="outbound")` |
| Full call context | `trace_path(direction="both")` |
| Find by name pattern | `search_graph(name_pattern="...")` |
| Dead code | `search_graph(max_degree=0, exclude_entry_points=true)` |
| Cross-service edges | `query_graph` with Cypher |
| Impact of changes | `detect_changes()` |
| Risk-classified trace | `trace_path(risk_labels=true)` |
| God nodes (hotspots) | `graphify_god_nodes()` |
| Shortest path between X and Y | `graphify_shortest_path(from="...", to="...")` |
| Community structure | `graphify_get_community()` |
| Pack repo for LLM | `repomix_pack_codebase(path="...")` |
| Search packed output | `repomix_grep_repomix_output(pattern="...")` |
| PR blast radius | `detect_changes(scope="impact")` |
| Impact analysis | `get_impact_radius(changed_files=[...])` |
| Text search | `search_code` or Grep |

## Exploration Workflow
1. `list_projects` — check if project is indexed
2. `get_graph_schema` — understand node/edge types
3. `search_graph(label="Function", name_pattern=".*Pattern.*")` — find code
4. `get_code_snippet(qualified_name="project.path.FuncName")` — read source
5. `graphify_god_nodes()` — find architectural hotspots
6. `repomix_pack_codebase(path="src/")` — pack for LLM consumption

## Tracing Workflow
1. `search_graph(name_pattern=".*FuncName.*")` — discover exact name
2. `trace_path(function_name="FuncName", direction="both", depth=3)` — trace
3. `detect_changes()` — map git diff to affected symbols
4. `graphify_shortest_path(from="A", to="B")` — find connection

## Review Workflow
1. `detect_changes(scope="impact")` — blast radius of uncommitted changes
2. `get_impact_radius(changed_files=[...])` — transitive impact
3. `get_hub_nodes()` — architectural chokepoints
4. `graphify_list_prs()` — recent PR activity
5. `graphify_triage_prs()` — prioritize review

## Evidence Tiers
- **Scout (Tier 1):** fast positive lookup with few graph calls and targeted source checks. Treat results as provisional; never make absence, exhaustive, dead-code, or complete-impact claims.
- **Verify (Tier 2, default):** task-directed searches, relevant trace directions, exact snippets for material claims, and all relevant result pages.
- **Auditor (Tier 3):** bounded-scope full verification with a current graph generation, complete relevant pagination, both call directions and broader relationships when material, plus explicit unresolved limitations.
- **Every tier:** after candidate paths are known, call `check_index_coverage` once with every evidence path. For negative or exhaustive claims also include the relevant scopes.

## Sessions and Subagents
- At session start or after compaction, call `list_projects`/`index_status` before structural exploration, then choose Scout, Verify, or Auditor for the task.
- Before delegating, query the graph and coverage in the parent. Pass the tier, exact project, generation/freshness, bounded scope, queries and pagination state, qualified symbols, paths, call-chain findings, coverage ranges/reasons, source fallback already performed, and unresolved questions to the child.
- A child without MCP tools must not call or claim MCP access. It should work from the supplied evidence and use read/grep on exact source.

## Quality Analysis
- Dead code: `search_graph(max_degree=0, exclude_entry_points=true)`
- High fan-out: `search_graph(min_degree=10, relationship="CALLS", direction="outbound")`
- High fan-in: `search_graph(min_degree=10, relationship="CALLS", direction="inbound")`
- God nodes: `graphify_god_nodes()`
- Communities: `graphify_get_community()`

## All MCP Tools

### codebase-memory-mcp (15)
`index_repository`, `index_status`, `list_projects`, `delete_project`,
`search_graph`, `search_code`, `trace_path`, `detect_changes`,
`query_graph`, `get_graph_schema`, `get_code_snippet`, `get_architecture`,
`check_index_coverage`, `manage_adr`, `ingest_traces`

### graphify (10)
`query_graph`, `get_node`, `get_neighbors`, `get_community`,
`god_nodes`, `graph_stats`, `shortest_path`,
`list_prs`, `get_pr_impact`, `triage_prs`

### repomix (6)
`pack_codebase`, `read_repomix_output`, `grep_repomix_output`,
`pack_remote_repository`, `generate_skill`, `attach_packed_output`

### code-review-graph (34)
`detect_changes`, `get_impact_radius`, `get_hub_nodes`,
`get_bridge_nodes`, `get_architecture_overview`, `get_review_context`,
`get_affected_flows`, `get_flow`, `list_flows`, `list_communities`,
`get_community`, `get_knowledge_gaps`, `get_surprising_connections`,
`get_suggested_questions`, `search_graph`, `query_graph`, `trace_path`,
`get_code_snippet`, `refactor_tool`, `build_or_update_graph_tool`,
`embed_graph_tool`, `run_postprocess_tool`, `generate_wiki_tool`,
`get_wiki_page`, `find_large_functions`, `cross_repo_search_tool`,
`traverse_graph_tool`, `semantic_search_nodes_tool`, `list_graph_stats_tool`,
`list_repos_tool`, `get_docs_section_tool`, `get_minimal_context_tool`,
`apply_refactor_tool`

## Cypher Examples (for query_graph)
```
MATCH (a)-[r:HTTP_CALLS]->(b) RETURN a.name, b.name, r.url_path, r.confidence LIMIT 20
MATCH (f:Function) WHERE f.name =~ '.*Handler.*' RETURN f.name, f.file_path
MATCH (a)-[r:CALLS]->(b) WHERE a.name = 'main' RETURN b.name
```

## Gotchas
1. `search_graph(relationship="HTTP_CALLS")` filters nodes by degree — use `query_graph` with Cypher to see actual edges.
2. `query_graph` has a 100k row ceiling — add a Cypher `LIMIT` for broad queries or use `search_graph` pagination.
3. `trace_path` needs exact names — use `search_graph(name_pattern=...)` first.
4. `direction="outbound"` misses cross-service callers — use `direction="both"`.
5. `search_graph` results default to 50 per page — check `has_more` and use `offset`.
6. `graphify_god_nodes()` returns global hotspots across all projects — not project-scoped.
7. `repomix_pack_codebase` creates a file — use `repomix_grep_repomix_output` to search it.
