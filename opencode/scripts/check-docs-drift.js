// scripts/check-docs-drift.js
// CI-friendly drift checker: compares source files (git-tracked) against their
// walkthroughs in docs/learning/. Reports missing and stale docs; exit code 1
// when the stale count exceeds the threshold.
//
// Usage:
//   node check-docs-drift.js [--root <dir>] [--ext <py,js,ts,...>]
//                            [--threshold <n>] [--json]
// Defaults: root = cwd, ext = common source types, threshold = 0.
// Staleness: a walkthrough is stale if the source file's last-commit date is
// newer than the walkthrough's mtime (fallback: mtime of source).
import { execFileSync } from "node:child_process"
import fs from "node:fs"
import path from "node:path"

const DEFAULT_EXTS = ["py", "js", "ts", "tsx", "jsx", "go", "rs", "java", "kt", "rb", "php", "sh", "tf", "sql", "ipynb"]
const SKIP_DIRS = new Set(["node_modules", ".venv", "venv", "dist", "build", "target", "__pycache__", ".git", ".next", ".nuxt"])
const LEARNING_DIR = ["docs", "learning"]

function parseArgs(argv) {
  const args = { root: process.cwd(), exts: DEFAULT_EXTS, threshold: 0, json: false }
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i]
    if (a === "--root") args.root = argv[++i]
    else if (a === "--ext") args.exts = argv[++i].split(",").map((s) => s.trim().replace(/^\./, ""))
    else if (a === "--threshold") args.threshold = parseInt(argv[++i], 10)
    else if (a === "--json") args.json = true
  }
  return args
}

function gitFiles(root) {
  try {
    const out = execFileSync("git", ["ls-files"], { cwd: root, encoding: "utf8", stdio: ["ignore", "pipe", "ignore"] })
    return out.split(/\r?\n/).filter(Boolean)
  } catch {
    return null // not a git repo
  }
}

function lastCommitDate(root, file) {
  try {
    const out = execFileSync("git", ["log", "-1", "--format=%cI", "--", file], {
      cwd: root,
      encoding: "utf8",
      stdio: ["ignore", "pipe", "ignore"],
    })
    return out.trim() ? new Date(out.trim()) : null
  } catch {
    return null
  }
}

function walkDir(root, dir, exts, acc) {
  let entries
  try {
    entries = fs.readdirSync(dir, { withFileTypes: true })
  } catch {
    return
  }
  for (const e of entries) {
    if (e.name.startsWith(".")) continue
    const full = path.join(dir, e.name)
    if (e.isDirectory()) {
      if (SKIP_DIRS.has(e.name)) continue
      walkDir(root, full, exts, acc)
    } else if (e.isFile()) {
      const ext = path.extname(e.name).slice(1).toLowerCase()
      if (exts.includes(ext)) acc.push(path.relative(root, full))
    }
  }
}

function docPathFor(src) {
  return path.join(LEARNING_DIR[0], LEARNING_DIR[1], "walkthroughs", src + ".md")
}

function main() {
  const args = parseArgs(process.argv.slice(2))
  const root = path.resolve(args.root)
  if (!fs.existsSync(path.join(root, LEARNING_DIR[0], LEARNING_DIR[1]))) {
    console.log("No docs/learning folder — nothing to check.")
    return 0
  }

  // 1. Collect source files (git-tracked when possible, else filesystem walk)
  const git = gitFiles(root)
  const sources = git !== null ? git.filter((f) => args.exts.includes(path.extname(f).slice(1).toLowerCase())) : []
  if (git === null) {
    // not a git repo: walk the tree
    const acc = []
    walkDir(root, root, args.exts, acc)
    sources.push(...acc)
  }

  // 2. Compare against walkthroughs
  const missing = []
  const stale = []
  const ok = []
  for (const src of sources) {
    const doc = docPathFor(src)
    const docAbs = path.join(root, doc)
    if (!fs.existsSync(docAbs)) {
      missing.push(src)
      continue
    }
    const docMtime = fs.statSync(docAbs).mtime
    let srcDate = lastCommitDate(root, src)
    if (!srcDate) srcDate = fs.statSync(path.join(root, src)).mtime
    if (srcDate > docMtime) stale.push({ src, doc, changed: srcDate.toISOString().slice(0, 10) })
    else ok.push(src)
  }

  const coverage = sources.length ? Math.round((ok.length / sources.length) * 100) : 0
  const report = { total: sources.length, ok: ok.length, missing: missing.length, stale: stale.length, coverage, staleFiles: stale, missingFiles: missing }

  if (args.json) {
    console.log(JSON.stringify(report, null, 2))
  } else {
    console.log(`Coverage: ${ok.length}/${sources.length} files (${coverage}%)`)
    console.log(`Missing walkthroughs: ${missing.length}`)
    missing.slice(0, 20).forEach((f) => console.log(`  MISSING  ${f}`))
    console.log(`Stale walkthroughs: ${stale.length}`)
    stale.slice(0, 20).forEach((s) => console.log(`  STALE    ${s.src} (changed ${s.changed})`))
    if (missing.length > 20) console.log(`  ... and ${missing.length - 20} more`)
    if (stale.length > 20) console.log(`  ... and ${stale.length - 20} more`)
    console.log(`Suggested: /document-project update (stale) then /document-project (missing)`)
  }

  return stale.length > args.threshold ? 1 : 0
}

try {
  process.exit(main())
} catch (err) {
  console.error("check-docs-drift failed:", err.message)
  process.exit(2)
}
