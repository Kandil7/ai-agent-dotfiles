import { tool } from "@opencode-ai/plugin"
import fs from "node:fs"
import path from "node:path"

// PROJECT-LOG
// Custom OpenCode tool: persists structured knowledge entries under <repo>/docs/learning/.
// Path-locked: refuses any write outside docs/learning/. The filename becomes the
// tool name, so this registers the `project-log` tool.
// Ported from Kandil7/ai-agent-dotfiles learning-log, adapted to this command center.

export default tool({
  description:
    "Persist a structured project-knowledge entry into a Markdown file under docs/learning/, " +
    "following the format (Context, Explanation, Alternatives, Rationale, Exercises, Next Steps). " +
    "Use for code walkthroughs, design alternatives, decision rationales, session logs, and lessons. " +
    "Appends a new dated entry by default; supports overwrite. " +
    "This is the ONLY allowed way to write under docs/learning/ for read-only agents.",
  args: {
    filePath: tool.schema
      .string()
      .describe(
        "Relative path inside docs/learning/ (never absolute, no leading ../). Use subfolders to " +
          "mirror the repo or categorize: walkthroughs/src/rag_pipeline.py.md, modules/core.md, " +
          "design/design-alternatives-rag.md, decisions/decision-vector-db-switch.md, " +
          "sessions/2026-08-17-session-agents.md"
      ),
    title: tool.schema.string().describe("Concise title for this entry, e.g. 'RAG Pipeline Walkthrough'."),
    context: tool.schema
      .string()
      .describe(
        "What project/repo, which file/module/subsystem, and what was the goal of the session."
      ),
    explanation: tool.schema
      .string()
      .describe(
        "The explanation itself: structure, flow, responsibilities, patterns (for code) or " +
          "components, interactions, constraints (for design)."
      ),
    alternatives: tool.schema
      .string()
      .optional()
      .describe("Alternative designs/tools/approaches considered, with pros and cons for each."),
    rationale: tool.schema
      .string()
      .optional()
      .describe("Why the current approach was chosen, and under what conditions it should be revisited."),
    exercises: tool.schema
      .string()
      .optional()
      .describe("3-5 concrete hands-on tasks grounded in the actual repo (tests, refactors, extensions, diagrams)."),
    nextSteps: tool.schema
      .string()
      .optional()
      .describe("Where to go next: deeper dives, refactors, readings, related skills to apply."),
    mode: tool.schema
      .enum(["append", "overwrite"] as const)
      .optional()
      .describe("append: add a new dated entry to the file (default). overwrite: replace the entire file with this entry."),
  },
  async execute(args, context) {
    const root = context.worktree || context.directory
    if (!root) throw new Error("No working directory available for project-log.")
    const learningDir = path.join(root, "docs", "learning")
    const target = path.resolve(learningDir, args.filePath)
    const rel = path.relative(learningDir, target)
    if (rel.startsWith("..") || path.isAbsolute(rel)) {
      throw new Error(`Refusing to write outside docs/learning/: ${args.filePath}`)
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
      return `Created docs/learning/${args.filePath}`
    }
    const entry = `\n## ${args.title} (${today})\n\n${body}\n\n---\n`
    fs.appendFileSync(target, entry, "utf8")
    return `Appended entry "${args.title}" to docs/learning/${args.filePath}`
  },
})