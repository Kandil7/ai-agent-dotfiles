# AI Agent Dotfiles

Backup of every AI coding agent's skills, agents, workflows, and configuration
installed on this machine. Private repo — restore any agent setup on a new
device by copying the corresponding folder to its config location.

## Inventory

| Agent | Repo folder | Contains | Restore target |
|---|---|---|---|
| OpenCode | `opencode/` | 6 custom agents (`learning`, `mentor`, `code-teacher`, `design-teacher`, `review-teacher`, `documenter`), 34 custom skills, 18 slash commands, 2 custom tools (`learning-log`, `memory-log`), 4 specs, 4 maintenance scripts, global `AGENTS.md` | `~\.config\opencode\` |
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

For OpenCode specifically:

```powershell
git clone https://github.com/Kandil7/ai-agent-dotfiles.git
Copy-Item -Recurse -Force ai-agent-dotfiles\opencode\* "$HOME\.config\opencode\"
# tool dependencies (learning-log.js / memory-log.js):
cd "$HOME\.config\opencode"; npm install
```

## Keeping this repo up to date

`scripts/sync-opencode.ps1` mirrors the LIVE `~\.config\opencode\` into this
repo (one command, safe — never touches credentials/sessions/node_modules):

```powershell
powershell -NoProfile -ExecutionPolicy Bypass -File scripts\sync-opencode.ps1 -Push
```

Schedule it with Windows Task Scheduler for automatic weekly backups if you
want. `-DryRun` previews changes first.

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
