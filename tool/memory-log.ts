import { tool } from "@opencode-ai/plugin"
import fs from "node:fs"
import os from "node:os"
import path from "node:path"

// MEMORY-LOG
// Custom OpenCode tool: persists cross-project memory entries under
// ~/.config/opencode/memory/. Path-locked to the global memory dir.
// Unlike project-log (per-repo docs), this stores reusable facts, lessons,
// preferences, and hardware/model learnings that apply across ALL projects.
// The filename becomes the tool name: `memory-log`.

const MEMORY_DIR = path.join(os.homedir(), ".config", "opencode", "memory")

export default tool({
  description:
    "Persist a cross-project memory entry into a Markdown file under the global memory/ " +
    "folder (~/.config/opencode/memory/), following the same format as project-log " +
    "(Context, Explanation, Alternatives, Rationale, Exercises, Next Steps). " +
    "Use for reusable facts, lessons, preferences, and patterns that apply across ALL projects " +
    "(NOT per-repo docs - use project-log for those). Appends a new dated entry by default; " +
    "supports overwrite.",
  args: {
    filePath: tool.schema
      .string()
      .describe(
        "Relative path inside the global memory/ folder (never absolute, no leading ../). " +
          "Examples: user-preferences.md, lessons/rag-chunking.md, patterns/agent-tools.md, " +
          "hardware/rtx5000-vram-budget.md"
      ),
    title: tool.schema.string().describe("Concise title for this entry, e.g. 'User prefers minimal diffs'."),
    context: tool.schema
      .string()
      .describe("What triggered this memory: project/repo, situation, and why it matters across projects."),
    explanation: tool.schema
      .string()
      .describe("The fact, lesson, or preference itself, stated clearly so future sessions can reuse it."),
    alternatives: tool.schema
      .string()
      .optional()
      .describe("Alternative approaches considered, with pros and cons."),
    rationale: tool.schema
      .string()
      .optional()
      .describe("Why this fact/approach holds, and under what conditions it should be revisited."),
    exercises: tool.schema
      .string()
      .optional()
      .describe("3-5 concrete ways to apply or verify this memory in future projects."),
    nextSteps: tool.schema
      .string()
      .optional()
      .describe("Where to go next: related memories, readings, patterns to collect."),
    mode: tool.schema
      .enum(["append", "overwrite"] as const)
      .optional()
      .describe("append: add a new dated entry to the file (default). overwrite: replace the entire file with this entry."),
  },
  async execute(args, _context) {
    const target = path.resolve(MEMORY_DIR, args.filePath)
    const rel = path.relative(MEMORY_DIR, target)
    if (rel.startsWith("..") || path.isAbsolute(rel)) {
      throw new Error(`Refusing to write outside global memory/: ${args.filePath}`)
    }
    fs.mkdirSync(path.dirname(target), { recursive: true })

    const today = new Date().toISOString().slice(0, 10)
    const sections: string[] = []
    const add = (heading: string, content?: string) => {
      if (content && content.trim()) sections.push(`### ${heading}\n\n${content.trim()}`)
    }
    add("Context", args.context)
    add("Explanation", args.explanation)
    add("Alternatives", args.alternatives)
    add("Rationale (Why this?)", args.rationale)
    add("Exercises", args.exercises)
    add("Next Steps", args.nextSteps)
    const body = sections.join("\n\n")
    if (!body) throw new Error("At least one section field must be provided (context or explanation required).")

    if (args.mode === "overwrite" || !fs.existsSync(target)) {
      fs.writeFileSync(target, `# ${args.title}\n\n${body}\n\n---\n`, "utf8")
      return `Created memory/${args.filePath}`
    }
    const entry = `\n## ${args.title} (${today})\n\n${body}\n\n---\n`
    fs.appendFileSync(target, entry, "utf8")
    return `Appended entry "${args.title}" to memory/${args.filePath}`
  },
})