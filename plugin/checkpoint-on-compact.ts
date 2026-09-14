import type { Plugin } from "@opencode-ai/plugin"
import { mkdirSync, writeFileSync } from "node:fs"
import { join } from "node:path"

// CHECKPOINT-ON-COMPACT
// Writes a durable pre-compaction snapshot to docs/PROJECT-CHECKPOINT.auto.md
// and instructs the compaction prompt to preserve it, so session compaction
// never destroys project state. The curated /checkpoint file is untouched.

const MAX_TAIL = 10
const recentMessages: Array<{ role: string; content: string }> = []

export default (async ({ directory }: { directory: string }) => {
  return {
    async "chat.message"(
      input: { sessionID: string },
      output: { message: { role: string }; parts: Array<{ type: string; text?: string }> },
    ): Promise<void> {
      const text = (output.parts ?? [])
        .filter((p) => p.type === "text")
        .map((p) => p.text ?? "")
        .join("\n")
        .trim()
      if (!text) return
      recentMessages.push({ role: output.message?.role ?? "user", content: text.slice(0, 1500) })
      if (recentMessages.length > MAX_TAIL) recentMessages.shift()
    },

    async "experimental.session.compacting"(
      input: { sessionID: string },
      output: { context: string[] },
    ): Promise<void> {
      const stamp = new Date().toISOString()
      const lines = [
        "# Auto Checkpoint (pre-compaction snapshot)",
        "",
        `- Time: ${stamp}`,
        `- Session: ${input.sessionID}`,
        `- Project: ${directory}`,
        "",
        "## Recent user messages (tail)",
        ...recentMessages.map((m) => `- **${m.role}**: ${m.content}`),
        "",
        "> Regenerate a curated checkpoint with /checkpoint.",
      ]
      try {
        const docsDir = join(directory, "docs")
        mkdirSync(docsDir, { recursive: true })
        const target = join(docsDir, "PROJECT-CHECKPOINT.auto.md")
        writeFileSync(target, lines.join("\n"), "utf8")
        output.context.push(
          `Pre-compaction snapshot written to docs/PROJECT-CHECKPOINT.auto.md at ${stamp}. Read that file first and preserve the durable facts (architecture, pending tasks, known issues, decisions, next steps) in the compacted summary.`,
        )
      } catch {
        // A checkpoint write failure must never break compaction.
      }
    },
  }
}) satisfies Plugin