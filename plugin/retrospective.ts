import type { Plugin } from "@opencode-ai/plugin"
import { mkdirSync, writeFileSync, existsSync, readFileSync } from "node:fs"
import { join } from "node:path"

// RETROSPECTIVE
// Tracks session metrics (tool calls, files edited, errors) and writes a
// retrospective summary to the context store on compaction. Provides data
// for the /wrapup command to generate human-reflected retrospectives.
//
// Metrics are accumulated in-memory during the session and flushed to:
//   .opencode/context-store/retro_<date>_<session>.md
//
// Also writes a lightweight metrics file to:
//   .opencode/RETRO-METRICS.md (latest session only, for /wrapup to read)

interface SessionMetrics {
  sessionID: string
  startTime: string
  toolCalls: number
  toolErrors: number
  filesEdited: string[]
  filesWritten: string[]
  bashCommands: number
  subagentsSpawned: number
  messagesCount: number
  topTools: Record<string, number>
}

function emptyMetrics(sessionID: string): SessionMetrics {
  return {
    sessionID,
    startTime: new Date().toISOString(),
    toolCalls: 0,
    toolErrors: 0,
    filesEdited: [],
    filesWritten: [],
    bashCommands: 0,
    subagentsSpawned: 0,
    messagesCount: 0,
    topTools: {},
  }
}

let metrics: SessionMetrics | null = null

function getStoreRoot(directory: string): string {
  return join(directory, ".opencode", "context-store")
}

function ensureDir(dir: string): void {
  mkdirSync(dir, { recursive: true })
}

function writeMetricsSummary(directory: string, m: SessionMetrics): void {
  try {
    const dir = join(directory, ".opencode")
    ensureDir(dir)
    const target = join(dir, "RETRO-METRICS.md")

    const topToolsSorted = Object.entries(m.topTools)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10)
      .map(([tool, count]) => `  - ${tool}: ${count}`)
      .join("\n")

    const durationMs = Date.now() - new Date(m.startTime).getTime()
    const durationMin = Math.round(durationMs / 60000)

    const lines = [
      "# Session Retrospective Metrics",
      "",
      `- Session: ${m.sessionID}`,
      `- Started: ${m.startTime}`,
      `- Duration: ~${durationMin} min`,
      `- Tool calls: ${m.toolCalls} (${m.toolErrors} errors)`,
      `- Files edited: ${m.filesEdited.length}`,
      `- Files written: ${m.filesWritten.length}`,
      `- Bash commands: ${m.bashCommands}`,
      `- Messages: ${m.messagesCount}`,
      "",
      "## Top tools",
      topToolsSorted || "(none)",
      "",
      "## Files edited",
      ...m.filesEdited.map((f) => `- ${f}`),
      "",
      "## Files written",
      ...m.filesWritten.map((f) => `- ${f}`),
      "",
      "> Use /wrapup to generate a human-reflected retrospective.",
    ]

    writeFileSync(target, lines.join("\n"), "utf8")
  } catch {
    // Never break the session
  }
}

function writeContextStoreArtifact(directory: string, m: SessionMetrics): void {
  try {
    const storeDir = getStoreRoot(directory)
    ensureDir(storeDir)

    const date = new Date(m.startTime).toISOString().split("T")[0]
    const id = `retro_${date}_${m.sessionID.slice(0, 8)}`
    const filePath = join(storeDir, `${id}.md`)

    if (existsSync(filePath)) return // Don't overwrite

    const durationMs = Date.now() - new Date(m.startTime).getTime()
    const durationMin = Math.round(durationMs / 60000)

    const topTools = Object.entries(m.topTools)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([t, c]) => `${t}(${c})`)
      .join(", ")

    const content = [
      `Session ${m.sessionID} retrospective.`,
      `Duration: ~${durationMin} min.`,
      `Tool calls: ${m.toolCalls} (${m.toolErrors} errors).`,
      `Files: ${m.filesEdited.length} edited, ${m.filesWritten.length} written.`,
      `Top tools: ${topTools}.`,
      `Bash commands: ${m.bashCommands}.`,
      "",
      "Review this session's trajectory to identify patterns, efficiency gains, and areas for improvement.",
    ].join("\n")

    const frontmatter = [
      `id: ${id}`,
      `reported_by: retrospective-plugin`,
      `created_at: ${new Date().toISOString()}`,
    ].join("\n")

    writeFileSync(filePath, `---\n${frontmatter}\n---\n\n${content}\n`, "utf8")
  } catch {
    // Never break the session
  }
}

export default (async ({ directory }: { directory: string }) => {
  return {
    async "session.created"(
      input: { sessionID: string },
      _output: Record<string, unknown>,
    ): Promise<void> {
      metrics = emptyMetrics(input.sessionID)
    },

    async "tool.execute.after"(
      input: { tool: string; args: Record<string, unknown> },
      output: { args: Record<string, unknown>; error?: string },
    ): Promise<void> {
      if (!metrics) return

      const tool = input.tool
      metrics.toolCalls++
      metrics.topTools[tool] = (metrics.topTools[tool] || 0) + 1

      if (output.error) {
        metrics.toolErrors++
      }

      if (tool === "bash") {
        metrics.bashCommands++
      }

      if (tool === "edit") {
        const fp = String(input.args?.filePath ?? "")
        if (fp && !metrics.filesEdited.includes(fp)) {
          metrics.filesEdited.push(fp)
        }
      }

      if (tool === "write") {
        const fp = String(input.args?.filePath ?? "")
        if (fp && !metrics.filesWritten.includes(fp)) {
          metrics.filesWritten.push(fp)
        }
      }

      if (tool === "task") {
        metrics.subagentsSpawned++
      }
    },

    async "chat.message"(
      input: { sessionID: string },
      output: { message: { role?: string }; parts: Array<{ type: string; text?: string }> },
    ): Promise<void> {
      if (!metrics) return
      if (output.message?.role === "assistant") {
        metrics.messagesCount++
      }
    },

    async "experimental.session.compacting"(
      input: { sessionID: string },
      _output: { context: string[] },
    ): Promise<void> {
      if (!metrics) return

      // Write metrics for /wrapup to read
      writeMetricsSummary(directory, metrics)

      // Write to context store for future agents
      writeContextStoreArtifact(directory, metrics)

      // Reset for next session
      metrics = null
    },
  }
}) satisfies Plugin
