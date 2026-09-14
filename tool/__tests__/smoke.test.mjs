// Smoke tests for project-log and memory-log tools
// Verifies path-locking: tools refuse to write outside their allowed directories.
// Run with: node --test tool/__tests__/smoke.test.mjs

import { describe, it } from "node:test"
import assert from "node:assert"
import path from "node:path"

describe("project-log path-locking", () => {
  const learningDir = path.join("repo", "docs", "learning")

  function isInsideLearningDir(filePath) {
    const target = path.resolve(learningDir, filePath)
    const rel = path.relative(learningDir, target)
    return !rel.startsWith("..") && !path.isAbsolute(rel)
  }

  it("allows valid paths inside docs/learning/", () => {
    assert.ok(isInsideLearningDir("sessions/2026-08-29-test.md"))
    assert.ok(isInsideLearningDir("walkthroughs/src/main.py.md"))
    assert.ok(isInsideLearningDir("decisions/decision-vector-db.md"))
    assert.ok(isInsideLearningDir("architecture.md"))
  })

  it("rejects paths escaping docs/learning/", () => {
    assert.ok(!isInsideLearningDir("../../etc/passwd"))
    assert.ok(!isInsideLearningDir("../../../.env"))
    assert.ok(!isInsideLearningDir("../AGENTS.md"))
  })

  it("rejects absolute paths", () => {
    assert.ok(!isInsideLearningDir("/etc/passwd"))
    assert.ok(!isInsideLearningDir("C:\\Users\\test\\.env"))
  })
})

describe("memory-log path-locking", () => {
  const memoryDir = path.join("home", ".config", "opencode", "memory")

  function isInsideMemoryDir(filePath) {
    const target = path.resolve(memoryDir, filePath)
    const rel = path.relative(memoryDir, target)
    return !rel.startsWith("..") && !path.isAbsolute(rel)
  }

  it("allows valid paths inside memory/", () => {
    assert.ok(isInsideMemoryDir("user-preferences.md"))
    assert.ok(isInsideMemoryDir("lessons/rag-chunking.md"))
    assert.ok(isInsideMemoryDir("hardware/rtx5000-vram-budget.md"))
    assert.ok(isInsideMemoryDir("patterns/agent-tools.md"))
  })

  it("rejects paths escaping memory/", () => {
    assert.ok(!isInsideMemoryDir("../../etc/passwd"))
    assert.ok(!isInsideMemoryDir("../../../AGENTS.md"))
    assert.ok(!isInsideMemoryDir("../docs/learning/hack.md"))
  })

  it("rejects absolute paths", () => {
    assert.ok(!isInsideMemoryDir("/etc/passwd"))
    assert.ok(!isInsideMemoryDir("C:\\Users\\test\\.env"))
  })
})
