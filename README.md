# AI Agent Dotfiles

Backup of every AI coding agent's skills, agents, workflows, and configuration
installed on this machine. Private repo — restore any agent setup on a new
device by copying the corresponding folder to its config location.

## Inventory

| Agent | Repo folder | Contains | Restore target |
|---|---|---|---|
| OpenCode | `opencode/` | 4 custom agents (`learning`, `code-teacher`, `design-teacher`, `review-teacher`), 10 custom skills, 1 custom tool (`learning-log`), 2 specs, global `AGENTS.md` | `~\.config\opencode\` |
| Claude Code | `claude-code/` | slash commands, 6 skills, hooks, prompts, `settings.json` | `~\.claude\` + `~\.config\claude\` |
| OpenAI Codex | `codex/` | `config.toml`, permission rules, hooks | `~\.codex\` |
| Cursor | `cursor/` | 20 agent skills, MCP servers (`mcp.json`) | `~\.cursor\` |
| Continue | `continue/` | `config.yaml` (qwen2.5-coder via Ollama), `config.ts`, types | `~\.continue\` |
| Gemini CLI | `gemini-cli/` | skills, commands, prompts, `config.yml` | `~\.config\gemini\` |
| Qwen Code | `qwen/` | skills, commands, prompts, settings | `~\.config\qwen\` |
| Mimocode | `mimocode/` | `mimocode.jsonc` | `~\.config\mimocode\` |

## Restore instructions

1. Clone this repo: `git clone https://github.com/Kandil7/ai-agent-dotfiles.git`
2. For each agent you want, copy its folder into the restore target from the
   table above (overwrite existing files).
3. Restart the agent's CLI to pick up the new skills/commands.

## Security

- Credentials (`auth.json`, `.credentials.json`, `oauth_creds.json`, tokens,
  etc.) are **never** committed — enforced by `.gitignore` and a pre-push scan.
- `codex/rules/default.rules` contains permission rules with machine-specific
  absolute paths (Windows); they are illustrative and should be re-created per
  machine, or scrubbed before use elsewhere.
- Hooks reference local binaries (e.g. `jcode.exe`); adjust paths on the target
  machine.

## Note

The device also had Copilot, Windsurf, and cagent installed, but they contained
no user-authored skills/agents/workflows, so they are not included here.
