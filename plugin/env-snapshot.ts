import type { Plugin } from "@opencode-ai/plugin"
import { mkdirSync, writeFileSync, existsSync } from "node:fs"
import { join } from "node:path"
import { execSync } from "node:child_process"

// ENV-SNAPSHOT
// Writes a project environment snapshot on session creation so agents start
// with immediate awareness of the project structure instead of wasting turns
// on exploration (ls, find, git status, etc.). Inspired by the Orchestrator
// pattern where subagents receive an environment snapshot at startup.
//
// Writes to .opencode/ENV-SNAPSHOT.md in the project root.

interface SnapshotSection {
  title: string
  command: string
  fallback?: string
  maxLines?: number
}

const SECTIONS: SnapshotSection[] = [
  { title: "Working Directory", command: "pwd", fallback: "." },
  { title: "Git Status", command: "git status --short", fallback: "(not a git repo)", maxLines: 30 },
  { title: "Git Branch", command: "git branch --show-current", fallback: "(no branch)" },
  { title: "Recent Commits", command: "git log --oneline -10", fallback: "(no commits)", maxLines: 15 },
  { title: "Project Structure", command: "find . -maxdepth 2 -not -path './.git/*' -not -path './node_modules/*' -not -path './.venv/*' -not -path './__pycache__/*' | head -80", fallback: "(empty)", maxLines: 85 },
  { title: "Key Config Files", command: "ls -la package.json pyproject.toml Cargo.toml go.mod Makefile Dockerfile docker-compose.yml 2>/dev/null || echo '(none found)'", fallback: "(none)" },
]

function runCommand(command: string, cwd: string): string {
  try {
    const result = execSync(command, {
      cwd,
      encoding: "utf8",
      timeout: 5000,
      stdio: ["pipe", "pipe", "pipe"],
      windowsHide: true,
    })
    return result.trim()
  } catch {
    return ""
  }
}

function truncateLines(text: string, maxLines: number): string {
  const lines = text.split("\n")
  if (lines.length <= maxLines) return text
  return lines.slice(0, maxLines).join("\n") + `\n... (${lines.length - maxLines} more lines)`
}

export default (async ({ directory }: { directory: string }) => {
  return {
    async "session.created"(
      input: { sessionID: string },
      output: Record<string, unknown>,
    ): Promise<void> {
      try {
        const stamp = new Date().toISOString()
        const lines: string[] = [
          "# Environment Snapshot",
          "",
          `- Generated: ${stamp}`,
          `- Session: ${input.sessionID}`,
          `- Project: ${directory}`,
          "",
        ]

        for (const section of SECTIONS) {
          lines.push(`## ${section.title}`)
          let content = runCommand(section.command, directory)
          if (!content && section.fallback) {
            content = section.fallback
          }
          if (content && section.maxLines) {
            content = truncateLines(content, section.maxLines)
          }
          lines.push(content || "(empty)")
          lines.push("")
        }

        const opencodeDir = join(directory, ".opencode")
        mkdirSync(opencodeDir, { recursive: true })
        const target = join(opencodeDir, "ENV-SNAPSHOT.md")
        writeFileSync(target, lines.join("\n"), "utf8")
      } catch {
        // Snapshot write failure must never break session creation
      }
    },
  }
}) satisfies Plugin
