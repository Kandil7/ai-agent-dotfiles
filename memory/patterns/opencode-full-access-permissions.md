# Full-access permission model for build mode (smart guardrails)

### Context

User requested "full access for all agents in build mode, in a smart way" after getting prompted for every bash command. Global config at ~/.config/opencode/opencode.jsonc was rewritten (backup: opencode.jsonc.bak-2026-08-18). Also fixed stale 'M Lapan' external_directory paths left over from the Windows profile migration — the real user is Kandil.

### Explanation

Permission model in global opencode.jsonc: top-level bash default is now "*": "allow" — build mode and all subagents (builder, architect, etc.) run with full access. Guardrails still apply because opencode evaluates the LAST matching rule: git commit/push/clean/branch -d, recursive deletes, docker system prune, reg, service/firewall/system changes = ask (deliberate checkpoint); git push --force, git reset --hard, rm -rf, Remove-Item -Recurse -Force, disk/partition/EFI tools (diskpart, format, fdisk, parted, mkfs, bcdedit, bootrec, reg delete, partition cmdlets) = deny (irreversible). The built-in plan agent gets an explicit conservative override: edit deny, bash ask with read-only diagnostics (git status/diff/log, Get-*, ls, where, nvidia-smi) allowed, external_directory ask-default with the standard allow-list. Per-agent permission REPLACES the top-level set for that agent (not a merge) — so the plan override must carry the full external_directory list.

### Alternatives

1) Kept old model but added per-agent build override — leaves prompt friction on every top-level command for subagents; rejected. 2) Top-level "permission": "allow" string shorthand — would flatten tool-specific guardrails; rejected. 3) Keeping the read-only allow-list in top-level bash — redundant once default is allow; moved into the plan agent's override where it is still needed.

### Rationale (Why this?)

Friction came from the old "*": "ask" default prompting on every benign command (node --version, mkdir, etc.). Flip-to-allow keeps the safety philosophy while removing noise; the ask layer is reserved for actions the user documented they want to decide (commits, system changes), and deny is reserved for irreversible operations. Plan mode keeps the old conservative model so the READ->PLAN->APPROVE workflow retains teeth. Revisit if a subagent misbehaves — read-only agents (architect/reviewer/security) are now permission-unrestricted and rely on prompt-level instructions only.

### Exercises

1) Restart opencode, run a benign bash command in build mode (e.g. Get-ChildItem) and verify no prompt. 2) Run git commit in build mode and verify it still asks. 3) Attempt rm -rf and verify it is denied without a prompt. 4) Switch to plan mode and verify edit is denied and bash still asks. 5) Read a file from D:\AI and verify no external_directory prompt.

### Next Steps

If zero-prompt commits are desired, flip 'git commit*'/'git push*' from ask to allow in the top-level bash block. If a read-only subagent ever mutates state, give that agent file (e.g. agent/reviewer.md) a permission frontmatter override with bash ask-default.

---
