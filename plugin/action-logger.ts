import type { Plugin } from "@opencode-ai/plugin"
import { appendFileSync, mkdirSync, existsSync } from "fs"
import { join } from "path"

// ACTION-LOGGER
// Logs agent actions, tool calls, and session metadata for debugging
// and auditing agent behavior. Writes to ~/.config/opencode/memory/sessions/.

const LOG_DIR = join(
  process.env.HOME || process.env.USERPROFILE || ".",
  ".config",
  "opencode",
  "memory",
  "sessions",
)

interface LogEntry {
  timestamp: string
  sessionID: string
  type: "tool" | "message" | "error"
  tool?: string
  agent?: string
  summary: string
}

function ensureLogDir(): void {
  if (!existsSync(LOG_DIR)) {
    mkdirSync(LOG_DIR, { recursive: true })
  }
}

function getLogFile(): string {
  const now = new Date()
  const date = now.toISOString().split("T")[0]
  return join(LOG_DIR, `${date}.log`)
}

function writeEntry(entry: LogEntry): void {
  try {
    ensureLogDir()
    const line = `[${entry.timestamp}] [${entry.sessionID}] [${entry.type}] ${entry.tool ? `tool=${entry.tool} ` : ""}${entry.agent ? `agent=${entry.agent} ` : ""}${entry.summary}\n`
    appendFileSync(getLogFile(), line, "utf-8")
  } catch {
    // Silently fail — logging should never break the session
  }
}

function truncate(str: string, maxLen: number): string {
  if (str.length <= maxLen) return str
  return str.slice(0, maxLen - 3) + "..."
}

export default (async () => {
  return {
    async "tool.execute.after"(
      input: { tool: string; args: Record<string, unknown> },
      output: { args: Record<string, unknown>; error?: string },
    ): Promise<void> {
      const sessionID = String(input.args?.sessionID ?? "unknown")
      const tool = input.tool
      const error = output.error

      let summary: string
      if (tool === "bash") {
        const cmd = String(input.args?.command ?? "")
        summary = error
          ? `FAIL: ${truncate(cmd, 120)}`
          : `OK: ${truncate(cmd, 120)}`
      } else if (tool === "edit") {
        const filePath = String(input.args?.filePath ?? "")
        summary = error
          ? `FAIL: edit ${filePath}`
          : `OK: edit ${filePath}`
      } else if (tool === "write") {
        const filePath = String(input.args?.filePath ?? "")
        summary = error
          ? `FAIL: write ${filePath}`
          : `OK: write ${filePath}`
      } else {
        summary = error ? `FAIL: ${tool}` : `OK: ${tool}`
      }

      writeEntry({
        timestamp: new Date().toISOString(),
        sessionID,
        type: error ? "error" : "tool",
        tool,
        summary,
      })
    },

    async "chat.message"(
      input: { sessionID: string },
      output: {
        message: { role?: string }
        parts?: Array<{ type: string; text?: string }>
      },
    ): Promise<void> {
      // Only log assistant messages with substance
      if (output.message?.role !== "assistant") return

      const text = (output.parts ?? [])
        .filter((p) => p.type === "text")
        .map((p) => p.text ?? "")
        .join("\n")
        .trim()

      if (!text || text.length < 10) return

      writeEntry({
        timestamp: new Date().toISOString(),
        sessionID: input.sessionID,
        type: "message",
        summary: `assistant: ${truncate(text, 200)}`,
      })
    },
  }
}) satisfies Plugin
