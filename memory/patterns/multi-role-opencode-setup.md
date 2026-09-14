# Multi-role opencode configuration: 5 developer roles

### Context

Expanded opencode from AI-engineering-only to support 5 developer roles: AI Engineer, AI Automation, Flutter Developer, Full Stack Developer, Backend Developer.

### Explanation

Added 4 new role-based agents (flutter-developer, backend-developer, fullstack-developer, automation-engineer), 27 new skills across 5 domains, and 11 new role-specific commands. Total config now: 20 agents, 56 skills, 47 commands, 144 validation checks.

### Alternatives

Could have used overlay model (shared agents + role skills) instead of role-based agents. Chose role-based agents because the user wanted separate permission sets per role (e.g., flutter-developer needs flutter/dart/adb bash permissions, backend-developer needs python/django/pytest).

### Rationale (Why this?)

Role-based agents give the cleanest permission boundaries. Each agent loads only the skills relevant to its domain, has role-appropriate bash permissions, and stays within its lane per the overlap boundaries table.

### Exercises

1. Test each role agent by delegating a task to it (e.g., /flutter-test, /api-design, /automate)2. Verify that agent overlap boundaries work (mobile handoff: flutter-developer -> backend-developer)3. Check that /ask router correctly routes to role-specific commands4. Try /wayfinder for a multi-role project (e.g., Flutter frontend + Django backend + AI automation)

### Next Steps

Monitor which role agents get used most. Some skills (flutter-offline, flutter-performance, workflow-automation) may need refinement after first real use. The /ask router should be updated as new commands are added.

---
