# Code Intelligence — Usage Guide

5 MCP servers, 75+ tools. Here's how to use them in practice.

## Quick Start (do this once)

### 1. Index a project
```
/cbm-init alim          → full setup + diagram + badge
/cbm-init athar         → for Athar
/cbm-init               → current directory
```

### 2. Install CI hook (auto-re-index on commit)
```cmd
D:\AI\tools\codebase-memory-mcp\hooks\install-hook.cmd
```

### 3. Open graph visualization
Open `http://localhost:9749` in browser (auto-starts with sessions)

---

## Natural Language — just ask me

| You say | I use |
|---------|-------|
| "What calls ProcessOrder?" | `trace_path` |
| "Find all auth handlers" | `search_graph` |
| "Show me the architecture" | `get_architecture` |
| "What would this PR break?" | `detect_changes` |
| "Is there dead code?" | `search_graph(max_degree=0)` |
| "Read the UserService class" | `get_code_snippet` |
| "Show the DB schema flow" | `query_graph` (Cypher) |
| "Find the most connected files" | `graphify_god_nodes` |
| "Pack this repo for an LLM" | `repomix_pack_codebase` |
| "What's the shortest path between A and B?" | `graphify_shortest_path` |
| "Show me recent PR impact" | `graphify_list_prs` + `graphify_get_pr_impact` |

---

## Tool Reference by Server

### codebase-memory-mcp (15 tools) — Structural Graph

**Find code:**
- `search_graph(name_pattern=".*Handler.*")` — find by name
- `search_graph(label="Function", min_degree=5)` — find hot functions
- `search_graph(max_degree=0, exclude_entry_points=true)` — dead code
- `search_code(pattern="TODO")` — text search in code

**Trace relationships:**
- `trace_path(function_name="X", direction="inbound")` — who calls X
- `trace_path(function_name="X", direction="outbound")` — what X calls
- `trace_path(function_name="X", direction="both", depth=5)` — full chain
- `trace_path(risk_labels=true)` — risk-classified trace

**Architecture:**
- `get_architecture(aspects=["all"])` — full overview
- `get_graph_schema()` — node/edge types
- `list_projects()` — what's indexed
- `index_status(project="X")` — stats + coverage

**Advanced:**
- `query_graph(query="MATCH (a)-[r:CALLS]->(b) RETURN a.name, b.name LIMIT 20")` — Cypher
- `check_index_coverage(paths=["src/auth.py"])` — verify coverage
- `detect_changes(scope="impact")` — blast radius of your diff
- `manage_adr(project="X", mode="get")` — architecture decisions

### graphify (10 tools) — Multimodal Graph

**Graph analysis:**
- `god_nodes()` — most-connected symbols (architectural hotspots)
- `shortest_path(from="A", to="B")` — path between any two nodes
- `get_community()` — detect functional modules
- `graph_stats()` — node/edge counts
- `get_node(id="X")` — node details
- `get_neighbors(id="X", depth=2)` — connected nodes

**PR review:**
- `list_prs()` — recent PR activity
- `get_pr_impact(pr_number=42)` — what a PR affects
- `triage_prs()` — prioritize review

### repomix (6 tools) — Context Packing

**Pack for LLM:**
- `pack_codebase(path="src/", format="markdown", compress=true)` — pack entire dir
- `pack_remote_repository(url="https://github.com/...")` — pack remote repo

**Search packed output:**
- `grep_repomix_output(pattern="auth", path="repo-output.md")` — search packed file
- `read_repomix_output(path="repo-output.md", offset=0, limit=100)` — read packed content

**Other:**
- `generate_skill(path="src/")` — generate agent skill from codebase
- `attach_packed_output(path="repo-output.md")` — attach existing pack

### code-review-graph (34 tools) — PR Review

**Change analysis:**
- `detect_changes(scope="impact")` — blast radius of uncommitted changes
- `get_impact_radius(changed_files=["src/auth.py"])` — transitive impact
- `get_affected_flows(changed_files=["src/auth.py"])` — affected execution flows

**Architecture:**
- `get_hub_nodes()` — architectural chokepoints
- `get_bridge_nodes()` — bottleneck nodes
- `get_architecture_overview()` — high-level structure
- `get_knowledge_gaps()` — structural weaknesses
- `get_surprising_connections()` — unexpected coupling

**Review:**
- `get_review_context(changed_files=["src/auth.py"])` — focused review context
- `get_suggested_questions()` — auto-generated review questions

**Graph:**
- `search_graph(name_pattern=".*X.*")` — search nodes
- `query_graph(pattern="callers_of", target="X")` — predefined queries
- `trace_path(function_name="X")` — call chains

---

## Workflows

### Explore a new codebase
```
1. list_projects → check if indexed
2. get_architecture → understand structure
3. graphify_god_nodes → find hotspots
4. search_graph(name_pattern=".*main.*") → entry points
5. get_code_snippet → read key files
6. repomix_pack_codebase → pack for LLM context
```

### Review a PR
```
1. detect_changes(scope="impact") → blast radius
2. get_affected_flows → which flows break
3. graphify_get_pr_impact → PR-specific impact
4. check_index_coverage → verify coverage
5. get_review_context → focused review data
```

### Debug an issue
```
1. search_code(pattern="error message") → find error source
2. trace_path(function_name="errorSource", direction="inbound") → who calls it
3. query_graph(query="MATCH (f:Function)-[:CALLS]->(e) WHERE e.name CONTAINS 'error' RETURN f.name") 
4. get_code_snippet → read the code
5. graphify_shortest_path(from="entry", to="error") → connection path
```

### Refactor safely
```
1. search_graph(name_pattern=".*OldName.*") → find all references
2. trace_path(direction="both") → full dependency chain
3. get_impact_radius → what breaks
4. graphify_get_community → module boundaries
5. refactor_tool(mode="rename", old_name="X", new_name="Y") → preview rename
```

### Onboard new team member
```
1. get_architecture(aspects=["all"]) → overview
2. graphify_god_nodes → must-know files
3. repomix_pack_codebase → give them a packed summary
4. graphify_get_community → module structure
5. manage_adr(mode="get") → architecture decisions
```

---

## Agent Tiers (for subagent delegation)

| Tier | When | Tools | Calls |
|------|------|-------|-------|
| **Scout** | Quick lookup | 7 graph + 6 repomix | 3-4 max |
| **Verify** | Task evidence | 15 graph + 10 graphify | Unlimited |
| **Auditor** | Full verification | All 75+ tools | Complete pagination |

---

## Commands

| Command | What it does |
|---------|-------------|
| `/cbm-init [project]` | Full setup: index + diagram + docs + badge |
| `/cbm-viz [project]` | Refresh Mermaid diagram from graph data |
| `/document-project` | Full docs sweep (includes CBM data) |

---

## Tips

1. **Ask in natural language** — I pick the right tools automatically
2. **Start with `get_architecture`** for any new project
3. **Use `graphify_god_nodes()`** to find what matters most
4. **`repomix_pack_codebase`** before pasting code to an LLM
5. **`detect_changes()`** before committing to see blast radius
6. **Check `index_status`** if graph queries return empty results
7. **Graph UI** at `localhost:9749` for visual exploration
