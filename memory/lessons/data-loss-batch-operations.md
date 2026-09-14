# Batch rename+remove caused data loss on D: reorganization

### Context

D: drive reorganization project, Phase 1, moving AI projects into consolidated structure

### Explanation

During batch PowerShell operations, a Rename-Item followed by Remove-Item -Recurse -Force in the same command block caused the RestaurantAutomation project data to be permanently deleted. The -Force flag bypasses the recycle bin. The rename may not have persisted before the remove executed.

### Alternatives

1. Execute rename and remove in separate command calls, verifying each before proceeding. 2. Never use -Force with Remove-Item on directories containing user data. 3. Use robocopy to move, then verify, then delete source separately.

### Rationale (Why this?)

Batch operations in PowerShell can have unexpected ordering. Each destructive operation should be isolated and verified before the next. The -Force flag on Remove-Item is dangerous because it bypasses recycle bin.

### Exercises

1. Always verify a rename succeeded (Test-Path new name) before removing the source. 2. Never combine Rename-Item and Remove-Item in the same command block. 3. Prefer robocopy /MOVE for moves, which is atomic per-file. 4. Create a backup before any batch directory operations.

### Next Steps

Resume D: reorganization after user recovers RestaurantAutomation data. Apply lessons: one operation per command, verify before delete, never use -Force on user data.

---
