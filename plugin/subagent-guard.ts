import type { Plugin } from "@opencode-ai/plugin"

// SUBAGENT-GUARD
// Tracks subagent execution time and injects forced-reporting instructions
// when agents exceed time or turn thresholds. Inspired by the Orchestrator
// pattern where subagents that hit max_turns are forced to submit a report.
//
// This prevents runaway agents and ensures the orchestrator always gets
// a result, even if partial.

interface SubagentState {
  startTime: number
  turnCount: number
  warned: boolean
  forced: boolean
}

const subagentStates = new Map<string, SubagentState>()

// Time thresholds (milliseconds)
const WARN_THRESHOLD = 10 * 60 * 1000 // 10 minutes — warn
const FORCE_THRESHOLD = 20 * 60 * 1000 // 20 minutes — force report

// Turn thresholds
const TURN_WARN = 12 // Warn at 12 turns
const TURN_FORCE = 15 // Force report at 15 turns

function getSessionKey(sessionID: string, agentName?: string): string {
  return agentName ? `${sessionID}:${agentName}` : sessionID
}

export default (async () => {
  return {
    async "chat.message"(
      input: { sessionID: string },
      output: {
        message: { role?: string }
        parts?: Array<{ type: string; text?: string }>
      },
    ): Promise<void> {
      // Track assistant messages as turns
      if (output.message?.role !== "assistant") return

      const key = getSessionKey(input.sessionID)
      let state = subagentStates.get(key)
      if (!state) {
        state = { startTime: Date.now(), turnCount: 0, warned: false, forced: false }
        subagentStates.set(key, state)
      }

      state.turnCount++

      // Clean up old states (prevent memory leak)
      if (subagentStates.size > 100) {
        const oldest = subagentStates.keys().next().value
        if (oldest) subagentStates.delete(oldest)
      }
    },

    async "tool.execute.before"(
      input: { tool: string; args: Record<string, unknown> },
      output: { args: Record<string, unknown> },
    ): Promise<void> {
      if (input.tool !== "task") return

      const sessionID = String(input.args?.sessionID ?? "")
      const agentName = String(input.args?.subagent_type ?? "")
      if (!sessionID) return

      const key = getSessionKey(sessionID, agentName)
      const state = subagentStates.get(key)
      if (!state) return

      const elapsed = Date.now() - state.startTime
      const shouldForce =
        (elapsed > FORCE_THRESHOLD || state.turnCount > TURN_FORCE) && !state.forced

      if (shouldForce) {
        state.forced = true
        // Inject forced-reporting instruction into the prompt
        const existingPrompt = String(output.args?.prompt ?? "")
        output.args.prompt =
          existingPrompt +
          "\n\n[SUBAGENT-GUARD] You have exceeded the time/turn limit. " +
          "YOU MUST SUBMIT YOUR REPORT NOW. No other actions are allowed. " +
          "Structure your report as:\n" +
          "## Report\n### Contexts Produced\n- **id**: `name`\n  **content**: [what you found]\n\n" +
          "### Comments\n[what was accomplished, what remains]"
        return
      }

      const shouldWarn =
        (elapsed > WARN_THRESHOLD || state.turnCount > TURN_WARN) && !state.warned

      if (shouldWarn) {
        state.warned = true
        const existingPrompt = String(output.args?.prompt ?? "")
        output.args.prompt =
          existingPrompt +
          "\n\n[SUBAGENT-GUARD WARNING] You are approaching the time/turn limit. " +
          "Begin wrapping up. Prepare your report with contexts produced and comments."
      }
    },

    async "tool.execute.after"(
      input: { tool: string; args: Record<string, unknown> },
      output: { args: Record<string, unknown>; error?: string },
    ): Promise<void> {
      // Clean up state when task completes
      if (input.tool !== "task") return
      const sessionID = String(input.args?.sessionID ?? "")
      const agentName = String(input.args?.subagent_type ?? "")
      if (!sessionID) return

      const key = getSessionKey(sessionID, agentName)
      subagentStates.delete(key)
    },
  }
}) satisfies Plugin
