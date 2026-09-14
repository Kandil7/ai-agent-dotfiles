#!/usr/bin/env node
// validate-config.mjs — mechanical integrity check for this opencode setup.
// Run after ANY config change (see ops-core.md §7):
//   node ~/.config/opencode/scripts/validate-config.mjs
// Exit 0 = all good, exit 1 = failures listed below.

import { readFileSync, readdirSync, statSync, existsSync } from "node:fs"
import { join, basename, dirname } from "node:path"
import { fileURLToPath } from "node:url"

const ROOT = dirname(dirname(fileURLToPath(import.meta.url)))
let pass = 0
let fail = 0
const problems = []

const ok = (m) => { pass++; console.log(`PASS  ${m}`) }
const bad = (m) => { fail++; problems.push(m); console.log(`FAIL  ${m}`) }

// Strip // and /* */ comments outside of strings (JSONC -> JSON).
function stripJsonComments(text) {
  let out = ""
  let inStr = false
  let esc = false
  for (let i = 0; i < text.length; i++) {
    const c = text[i]
    const n = text[i + 1]
    if (inStr) {
      out += c
      if (esc) esc = false
      else if (c === "\\") esc = true
      else if (c === '"') inStr = false
      continue
    }
    if (c === '"') { inStr = true; out += c; continue }
    if (c === "/" && n === "/") {
      while (i < text.length && text[i] !== "\n") i++
      out += "\n"
      continue
    }
    if (c === "/" && n === "*") {
      i += 2
      while (i < text.length && !(text[i] === "*" && text[i + 1] === "/")) i++
      i++
      continue
    }
    out += c
  }
  return out
}

function frontmatter(file) {
  const t = readFileSync(file, "utf8")
  const m = t.match(/^---\r?\n([\s\S]*?)\r?\n---/)
  return m ? m[1] : null
}

function hasKey(fmText, key) {
  return new RegExp(`^\\s*${key}\\s*:`, "m").test(fmText)
}

// ---------- opencode.jsonc ----------
const cfgPath = join(ROOT, "opencode.jsonc")
try {
  const cfg = JSON.parse(stripJsonComments(readFileSync(cfgPath, "utf8")))
  ok("opencode.jsonc parses as valid JSON(C)")

  const bash = cfg.permission?.bash ?? {}
  const requiredDenies = [
    "git push --force*", "git reset --hard*", "rm -rf*",
    "Remove-Item -Recurse -Force*", "diskpart*", "format*", "mkfs*",
    "bcdedit*", "bootrec*", "reg delete*", "Remove-Partition*", "Clear-Disk*",
    "docker system prune -a --volumes*", "wsl --uninstall*", "takeown*",
  ]
  for (const d of requiredDenies) {
    bash[d] === "deny" ? ok(`deny rule present: ${d}`) : bad(`missing deny rule: ${d}`)
  }

  const ext = cfg.permission?.external_directory ?? {}
  for (const s of ["~/.ssh/**", "~/.aws/**", "~/.gnupg/**", "C:\\Users\\Kandil\\.ssh\\**"]) {
    ext[s] === "deny" ? ok(`sensitive path denied: ${s}`) : bad(`sensitive path not denied: ${s}`)
  }

  cfg.small_model
    ? ok(`small_model set: ${cfg.small_model}`)
    : bad("small_model missing")
} catch (e) {
  bad(`opencode.jsonc does not parse: ${e.message}`)
}

// ---------- agents ----------
const agentDir = join(ROOT, "agent")
if (existsSync(agentDir)) {
  for (const f of readdirSync(agentDir).filter((x) => x.endsWith(".md"))) {
    const p = join(agentDir, f)
    const name = basename(f, ".md")
    const fmText = frontmatter(p)
    if (!fmText) { bad(`agent '${name}': no frontmatter`); continue }
    let good = true
    if (!hasKey(fmText, "description")) { bad(`agent '${name}': missing description`); good = false }
    if (!hasKey(fmText, "mode")) { bad(`agent '${name}': missing mode`); good = false }
    if (good) ok(`agent '${name}'`)
  }
} else bad("agent/ directory missing")

// ---------- commands ----------
const cmdDir = join(ROOT, "command")
if (existsSync(cmdDir)) {
  for (const f of readdirSync(cmdDir).filter((x) => x.endsWith(".md"))) {
    const p = join(cmdDir, f)
    const name = basename(f, ".md")
    const fmText = frontmatter(p)
    if (!fmText) { bad(`command '/${name}': no frontmatter`); continue }
    hasKey(fmText, "description")
      ? ok(`command '/${name}'`)
      : bad(`command '/${name}': missing description`)
  }
} else bad("command/ directory missing")

// ---------- skills ----------
const skillDir = join(ROOT, "skill")
const nameRe = /^name:\s*([a-z0-9]+(?:-[a-z0-9]+)*)\s*$/m
if (existsSync(skillDir)) {
  for (const d of readdirSync(skillDir)) {
    const dir = join(skillDir, d)
    if (!statSync(dir).isDirectory()) continue
    const sk = join(dir, "SKILL.md")
    if (!existsSync(sk)) { bad(`skill '${d}': SKILL.md missing`); continue }
    const fmText = frontmatter(sk)
    if (!fmText) { bad(`skill '${d}': no frontmatter`); continue }
    const nm = fmText.match(nameRe)
    if (!nm) { bad(`skill '${d}': invalid or missing 'name' field`); continue }
    if (nm[1] !== d) { bad(`skill '${d}': name '${nm[1]}' != folder name`); continue }
    hasKey(fmText, "description")
      ? ok(`skill '${d}'`)
      : bad(`skill '${d}': missing description`)
  }
} else bad("skill/ directory missing")

// ---------- summary ----------
console.log(`\n${pass} passed, ${fail} failed`)
for (const p of problems) console.log(`  ! ${p}`)
process.exit(fail > 0 ? 1 : 0)
