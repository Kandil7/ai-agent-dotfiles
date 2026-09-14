---
name: background-tasks
description: "Background task processing. Use when the user says 'Celery', 'queue', 'background task', 'async job', 'Redis queue', 'retry', or 'idempotent'."
---

# Background Tasks

## Options

| Tool | Complexity | Best for |
|------|-----------|----------|
| **FastAPI BackgroundTasks** | Minimal | Post-response work (emails, logging) |
| **Django Q** | Low | Periodic tasks, simple queues |
| **Celery** | High | Distributed tasks, retries, scheduling |
| **Dramatiq** | Medium | Celery alternative, simpler API |

## Celery pattern

```python
from celery import Celery

app = Celery("tasks", broker="redis://localhost:6379/0")


@app.task(bind=True, max_retries=3)
def process_data(self, data_id):
    try:
        data = Data.objects.get(id=data_id)
        result = heavy_computation(data)
        return result
    except Exception as exc:
        self.retry(exc=exc, countdown=60)
```

## Idempotency

- Tasks MUST be idempotent (running twice = same result)
- Use unique task IDs or database constraints
- Check if result already exists before processing

```python
@app.task
def send_email(user_id, template):
    if EmailLog.objects.filter(user_id=user_id, template=template).exists():
        return "already sent"  # idempotent
    # ... send email
    EmailLog.objects.create(user_id=user_id, template=template)
```

## Scheduling

```python
# Celery beat
app.conf.beat_schedule = {
    "cleanup-every-hour": {
        "task": "tasks.cleanup",
        "schedule": crontab(minute=0),
    },
}
```

## Patterns

- **Fan-out**: one task spawns many parallel tasks
- **Chain**: task A -> task B -> task C (sequential)
- **Chord**: parallel tasks -> callback when all done
- **Rate limiting**: `rate_limit='10/m'` (10 per minute)

## Monitoring

- Flower: Celery web monitor (real-time task status)
- Log task start/end, duration, success/failure
- Alert on high failure rate or queue depth

## Pitfalls

- Not handling retries (tasks fail permanently on first error)
- Long-running tasks blocking the worker (use async or separate queue)
- Not monitoring queue depth (tasks pile up silently)
- Shared state between tasks (use database, not in-memory)
