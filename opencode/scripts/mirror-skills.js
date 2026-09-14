// scripts/mirror-skills.js
// Copies the global skill library (~/.config/opencode/skills/) into a repo's
// docs/learning/skills/<skill-name>/ as a template library, so learners can
// browse skill formats locally or copy them into project-level .opencode/.
//
// Usage:
//   node mirror-skills.js [--root <dir>] [--dry-run]
// Defaults: root = cwd.
import fs from "node:fs"
import path from "node:path"
import { fileURLToPath } from "node:url"

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const GLOBAL_SKILLS = path.resolve(__dirname, "..", "skills")
const TARGET = ["docs", "learning", "skills"]

function main() {
  const argv = process.argv.slice(2)
  let root = process.cwd()
  let dryRun = false
  for (let i = 0; i < argv.length; i++) {
    if (argv[i] === "--root") root = argv[++i]
    else if (argv[i] === "--dry-run") dryRun = true
  }
  root = path.resolve(root)

  if (!fs.existsSync(GLOBAL_SKILLS)) {
    console.error(`Global skills not found at ${GLOBAL_SKILLS}`)
    process.exit(2)
  }
  const skills = fs.readdirSync(GLOBAL_SKILLS, { withFileTypes: true }).filter((e) => e.isDirectory())
  const targetRoot = path.join(root, ...TARGET)
  if (dryRun) {
    console.log(`[dry-run] would mirror ${skills.length} skills into ${targetRoot}`)
    return 0
  }

  let copied = 0
  for (const s of skills) {
    const src = path.join(GLOBAL_SKILLS, s.name, "SKILL.md")
    if (!fs.existsSync(src)) continue
    const dest = path.join(targetRoot, s.name, "SKILL.md")
    fs.mkdirSync(path.dirname(dest), { recursive: true })
    fs.copyFileSync(src, dest)
    copied++
  }
  console.log(`Mirrored ${copied}/${skills.length} skills into ${targetRoot}`)
  return 0
}

try {
  process.exit(main())
} catch (err) {
  console.error("mirror-skills failed:", err.message)
  process.exit(2)
}
