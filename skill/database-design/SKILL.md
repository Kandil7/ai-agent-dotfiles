---
name: database-design
description: "Database design and optimization. Use when the user says 'schema', 'database design', 'indexing', 'normalization', 'migration', 'query optimization', 'connection pooling', or 'ORM'."
---

# Database Design

## Schema design principles

1. **Normalize to 3NF** (third normal form) by default
2. **Denormalize strategically** for read-heavy paths (document store pattern)
3. **Every table needs**: primary key, created_at, updated_at
4. **Foreign keys**: always, with proper ON DELETE behavior (CASCADE, SET NULL, RESTRICT)

## Indexing

- Index columns used in WHERE, JOIN, ORDER BY
- Composite indexes: column order matters (most selective first)
- Partial indexes: index a subset of rows (WHERE condition)
- Covering index: includes all columns needed (no table lookup)

```sql
-- Good: composite index for common query
CREATE INDEX idx_orders_user_status ON orders(user_id, status);

-- Good: partial index
CREATE INDEX idx_active_users ON users(email) WHERE is_active = true;
```

## Normalization

| Form | Rule | Example violation |
|------|------|-------------------|
| 1NF | No repeating groups | Storing comma-separated tags in a column |
| 2NF | No partial dependencies | Non-key column depends on part of composite key |
| 3NF | No transitive dependencies | Zip -> City stored in same table as Order |

## Denormalization patterns

- **Materialized views**: pre-computed query results, refreshed periodically
- **Counter cache**: store `post_count` on User instead of COUNT(*) on Post
- **Event sourcing**: append-only event log, reconstruct state on read

## Migrations

- Forward-only in production (no down migrations in prod)
- Data migrations: separate from schema migrations
- Backward compatible: old code must work with new schema during deploy
- Test rollback path before deploying

## Connection pooling

- Django: `DATABASES['default']['CONN_MAX_AGE']` or `django-db-connection-pool`
- FastAPI: `asyncpg` pool, SQLAlchemy `pool_size`/`max_overflow`
- Never: create new connection per request (too slow, hits limits)

## Query optimization

- `EXPLAIN ANALYZE`: see query plan, find sequential scans
- Avoid `SELECT *`: fetch only needed columns
- Batch updates: `UPDATE ... WHERE id IN (...)` instead of N individual updates
- Use `bulk_create()` for inserting many rows

## Pitfalls

- No indexes on foreign keys (some ORMs don't auto-create them)
- Using ORM for complex queries (write raw SQL when ORM is awkward)
- Not analyzing slow queries (use EXPLAIN, not guessing)
- Implicit type casting causing index skips (match column types exactly)
