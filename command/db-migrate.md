---
description: Create/review database migrations, check for data loss, verify rollback path.
agent: backend-developer
---

Migrate database for: $ARGUMENTS

1. Check current migration status (Django: `showmigrations`, Alembic: `history`).
2. Generate new migration if model changes exist.
3. Review migration for: data loss potential, index changes, column renames (not drop+add).
4. Test rollback path: can we go back safely?
5. For data migrations: verify forwards AND backwards functions.

Report: migration file path, changes summary, data loss risk (HIGH/MEDIUM/NONE), rollback steps.
Rules: never apply migrations in production without approval. Always test on sample data first.
