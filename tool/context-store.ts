import { tool } from "@opencode-ai/plugin"
import fs from "node:fs"
import path from "node:path"

// CONTEXT-STORE
// Custom OpenCode tool: persistent, ID-addressed knowledge store for multi-agent
// coordination. Inspired by Danau5tin/multi-agent-coding-system's Orchestrator
// Context Store pattern. Filesystem-backed (survives compaction, inspectable).
//
// Agents write named knowledge artifacts; the orchestrator (or any agent) reads
// and injects them into future subagent tasks. This creates compound intelligence
// where each action builds on previous discoveries.
//
// Storage: <repo>/.opencode/context-store/ (per-project, inspectable)
// Each artifact is a Markdown file: <id>.md with YAML frontmatter.

const STORE_DIR = ".opencode/context-store"

interface ContextArtifact {
  id: string
  content: string
  reported_by: string
  task_id?: string
  created_at: string
}

function getStoreRoot(context: { worktree?: string; directory?: string }): string {
  const root = context.worktree || context.directory
  if (!root) throw new Error("No working directory available for context-store.")
  return path.join(root, STORE_DIR)
}

function ensureStore(storeDir: string): void {
  fs.mkdirSync(storeDir, { recursive: true })
}

function parseArtifact(filePath: string): ContextArtifact | null {
  try {
    const raw = fs.readFileSync(filePath, "utf8")
    const match = raw.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/)
    if (!match) return null
    const frontmatter = match[1]
    const content = match[2].trim()
    const meta: Record<string, string> = {}
    for (const line of frontmatter.split("\n")) {
      const idx = line.indexOf(":")
      if (idx > 0) {
        meta[line.slice(0, idx).trim()] = line.slice(idx + 1).trim()
      }
    }
    return {
      id: meta.id || path.basename(filePath, ".md"),
      content,
      reported_by: meta.reported_by || "unknown",
      task_id: meta.task_id || undefined,
      created_at: meta.created_at || "",
    }
  } catch {
    return null
  }
}

function writeArtifact(storeDir: string, artifact: ContextArtifact): void {
  const frontmatter = [
    `id: ${artifact.id}`,
    `reported_by: ${artifact.reported_by}`,
    artifact.task_id ? `task_id: ${artifact.task_id}` : null,
    `created_at: ${artifact.created_at}`,
  ]
    .filter(Boolean)
    .join("\n")
  const raw = `---\n${frontmatter}\n---\n\n${artifact.content}\n`
  fs.writeFileSync(path.join(storeDir, `${artifact.id}.md`), raw, "utf8")
}

export default tool({
  description:
    "Persistent, ID-addressed knowledge store for multi-agent coordination. " +
    "Store and retrieve named knowledge artifacts that persist across agent invocations. " +
    "Agents write artifacts after completing work; orchestrators read and inject them " +
    "into future subagent tasks. This creates compound intelligence where each action " +
    "builds on previous discoveries. Filesystem-backed under .opencode/context-store/.",
  args: {
    action: tool.schema
      .enum(["write", "read", "list", "delete", "read-task"] as const)
      .describe(
        "write: store a new artifact. read: retrieve by ID. list: show all artifacts. " +
          "delete: remove an artifact. read-task: get all artifacts from a specific task."
      ),
    id: tool.schema
      .string()
      .optional()
      .describe(
        "Snake_case identifier for the artifact (e.g., 'auth_flow', 'db_schema_v2'). " +
          "Required for write and read actions."
      ),
    content: tool.schema
      .string()
      .optional()
      .describe("Knowledge artifact content. Required for write action."),
    reported_by: tool.schema
      .string()
      .optional()
      .describe("Agent or session that produced this artifact (e.g., 'architect', 'task_001')."),
    task_id: tool.schema
      .string()
      .optional()
      .describe("Optional task ID to group artifacts (e.g., 'task_003'). Enables task-grouped lookup."),
    task_filter: tool.schema
      .string()
      .optional()
      .describe("Task ID to filter by. Required for read-task action."),
  },
  async execute(args, context) {
    const storeDir = getStoreRoot(context)
    ensureStore(storeDir)

    switch (args.action) {
      case "write": {
        if (!args.id) throw new Error("id is required for write action.")
        if (!args.content) throw new Error("content is required for write action.")

        const id = args.id.replace(/[^a-z0-9_]/g, "_")
        const existingPath = path.join(storeDir, `${id}.md`)
        if (fs.existsSync(existingPath)) {
          return `Artifact '${id}' already exists. Use a versioned ID (e.g., '${id}_v2') or delete first.`
        }

        const artifact: ContextArtifact = {
          id,
          content: args.content,
          reported_by: args.reported_by || "unknown",
          task_id: args.task_id || undefined,
          created_at: new Date().toISOString(),
        }
        writeArtifact(storeDir, artifact)
        return `Stored artifact '${id}' in context store.`
      }

      case "read": {
        if (!args.id) throw new Error("id is required for read action.")
        const filePath = path.join(storeDir, `${args.id}.md`)
        if (!fs.existsSync(filePath)) {
          // Try to list available IDs for helpful error
          const files = fs
            .readdirSync(storeDir)
            .filter((f) => f.endsWith(".md"))
            .map((f) => f.replace(".md", ""))
          return `Artifact '${args.id}' not found. Available: ${files.join(", ") || "(empty)"}`
        }
        const artifact = parseArtifact(filePath)
        if (!artifact) return `Artifact '${args.id}' exists but could not be parsed.`
        return `## ${artifact.id}\n**reported_by:** ${artifact.reported_by}${artifact.task_id ? ` | **task_id:** ${artifact.task_id}` : ""} | **created:** ${artifact.created_at}\n\n${artifact.content}`
      }

      case "list": {
        if (!fs.existsSync(storeDir)) return "Context store is empty."
        const files = fs.readdirSync(storeDir).filter((f) => f.endsWith(".md"))
        if (files.length === 0) return "Context store is empty."

        const artifacts = files
          .map((f) => parseArtifact(path.join(storeDir, f)))
          .filter(Boolean) as ContextArtifact[]

        const lines = artifacts.map(
          (a) => `- **${a.id}** (by ${a.reported_by}${a.task_id ? `, task ${a.task_id}` : ""}, ${a.created_at.slice(0, 10)})`
        )
        return `## Context Store (${artifacts.length} artifacts)\n\n${lines.join("\n")}`
      }

      case "delete": {
        if (!args.id) throw new Error("id is required for delete action.")
        const delPath = path.join(storeDir, `${args.id}.md`)
        if (!fs.existsSync(delPath)) return `Artifact '${args.id}' not found.`
        fs.unlinkSync(delPath)
        return `Deleted artifact '${args.id}' from context store.`
      }

      case "read-task": {
        if (!args.task_filter) throw new Error("task_filter is required for read-task action.")
        if (!fs.existsSync(storeDir)) return "Context store is empty."
        const files = fs.readdirSync(storeDir).filter((f) => f.endsWith(".md"))
        const matching = files
          .map((f) => parseArtifact(path.join(storeDir, f)))
          .filter((a): a is ContextArtifact => a !== null && a.task_id === args.task_filter)

        if (matching.length === 0) return `No artifacts found for task '${args.task_filter}'.`

        const output = matching.map(
          (a) => `## ${a.id}\n**reported_by:** ${a.reported_by} | **created:** ${a.created_at.slice(0, 10)}\n\n${a.content}`
        )
        return output.join("\n\n---\n\n")
      }

      default:
        throw new Error(`Unknown action: ${args.action}`)
    }
  },
})
