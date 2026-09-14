---
description: Review database schema: indexes, constraints, normalization, query patterns.
agent: backend-developer
---

Review database schema for: $ARGUMENTS

Follow the database-design skill:

1. List all tables and their columns with types.
2. Check normalization: any 1NF/2NF/3NF violations?
3. Check indexes: missing indexes on FK, WHERE, JOIN columns?
4. Check constraints: NOT NULL, UNIQUE, CHECK, foreign keys?
5. Check query patterns: N+1 risks, missing select_related/prefetch_related?
6. Check connection pooling config.

Report: schema summary, issues by severity (critical/major/minor), suggested fixes, overall health score.
