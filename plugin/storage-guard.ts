import type { Plugin } from "@opencode-ai/plugin"

// STORAGE-GUARD
// Enforces the global storage policy mechanically: large AI assets
// (D:\AI\ policy) and secrets never enter Git. Intercepts bash tool calls
// and neutralizes dangerous git staging commands.

const BLOCKED_PATTERNS: RegExp[] = [
  /D:\\AI\\/i,
  /D:\/AI\//i,
  /\/mnt\/d\/AI\//i,
  /\.safetensors\b/i,
  /\.gguf\b/i,
  /\.onnx\b/i,
  /\.ckpt\b/i,
  /\.(pt|pth)\b/i,
  /\.joblib\b/i,
  /\.h5\b/i,
  /\.bin\b/i,
  /\.env(\b|\.)/,
  /\.pem\b/i,
  /\.p12\b/i,
  /\.pfx\b/i,
  /id_rsa\b/i,
]

const BLIND_STAGING = /\bgit\s+add\s+(--all|-A|\.|-u)\b/i
const GIT_WRITE = /\bgit\s+(add|commit|push)\b/i

export default (async () => {
  return {
    async "tool.execute.before"(
      input: { tool: string },
      output: { args: { command?: unknown } },
    ): Promise<void> {
      if (input.tool !== "bash") return
      const command = String(output.args?.command ?? "")
      if (!GIT_WRITE.test(command)) return

      if (BLIND_STAGING.test(command)) {
        output.args.command =
          'echo "STORAGE-GUARD: refused blind staging (git add -A/. and friends) - stage files explicitly; large AI assets must stay in D:\\AI\\ and never enter Git."'
        return
      }

      const hits = BLOCKED_PATTERNS.filter((re) => re.test(command))
      if (hits.length > 0) {
        output.args.command =
          'echo "STORAGE-GUARD: blocked - command references forbidden path/pattern (' +
          hits.map((re) => re.source).join(", ") +
          '). Large AI assets stay in D:\\AI\\; secrets never enter Git. Stage explicit allowed files instead."'
      }
    },
  }
}) satisfies Plugin