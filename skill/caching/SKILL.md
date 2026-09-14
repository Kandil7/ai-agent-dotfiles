---
name: caching
description: "Caching strategies. Use when the user says 'Redis', 'cache', 'CDN', 'HTTP caching', 'invalidation', 'memoization', or 'cache-aside'."
---

# Caching Strategies

## Cache types

| Type | Where | TTL | Use for |
|------|-------|-----|---------|
| **In-memory** | App process | Seconds | Hot data, computed results |
| **Redis** | Separate server | Minutes-hours | Session data, shared cache, pub/sub |
| **CDN** | Edge servers | Hours-days | Static assets, API responses |
| **HTTP** | Browser/client | Varies | GET responses, ETags |

## Patterns

### Cache-aside (lazy loading)
```python
def get_user(user_id):
    cached = redis.get(f"user:{user_id}")
    if cached:
        return json.loads(cached)
    user = db.query(User, user_id)
    redis.setex(f"user:{user_id}", 300, json.dumps(user))
    return user
```

### Write-through
- Write to cache AND database simultaneously
- Pros: cache is always fresh
- Cons: write latency doubled

### Write-behind (write-back)
- Write to cache, async flush to database
- Pros: fast writes
- Cons: data loss risk if cache crashes

### Read-through
- Cache layer handles DB fetch on miss
- Pros: application code is simpler
- Cons: more complex cache layer

## Redis patterns

```python
import redis
r = redis.Redis()

# Simple cache
r.setex("key", 300, "value")  # 5 min TTL

# Hash (multiple fields)
r.hset("user:1", mapping={"name": "Ahmed", "email": "a@b.com"})

# Distributed lock
lock = r.lock("my-lock", timeout=10)
if lock.acquire(blocking=False):
    try:
        # critical section
    finally:
        lock.release()

# Pub/Sub
r.publish("channel", "message")
```

## HTTP caching

```python
# FastAPI
from fastapi import Response


@app.get("/data/")
async def get_data(response: Response):
    response.headers["Cache-Control"] = "max-age=300"
    response.headers["ETag"] = '"abc123"'
    return data
```

## Cache invalidation

- **TTL-based**: simplest, accept stale data up to TTL
- **Event-driven**: invalidate on write (pub/sub, signals)
- **Versioned keys**: `user:v2:123` — new version = new key, old expires
- **Tag-based**: group related keys, invalidate by tag

## Pitfalls

- Cache stampede (many requests hit DB on expiry) — use locks or stale-while-revalidate
- Thundering herd (burst after cache expires) — jitter TTLs
- Not monitoring cache hit rate (target: >80%)
- Caching sensitive data without proper TTL and invalidation
