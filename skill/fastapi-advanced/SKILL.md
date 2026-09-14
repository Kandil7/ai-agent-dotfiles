---
name: fastapi-advanced
description: "Advanced FastAPI patterns. Use when the user says 'fastapi', 'dependency injection', 'background tasks', 'websocket', 'middleware', 'lifespan', or 'OpenAPI'."
---

# FastAPI Advanced

## Dependency injection

```python
from fastapi import Depends


async def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@app.get("/users/")
async def list_users(db: Session = Depends(get_db)):
    return db.query(User).all()
```

- `Depends()`: reusable logic, DB sessions, auth checks
- Nested dependencies: dependencies can depend on other dependencies
- `yield` dependencies: setup/teardown pattern (DB connections)

## Background tasks

```python
from fastapi import BackgroundTasks


@app.post("/send-email/")
async def send_email(email: EmailSchema, bg: BackgroundTasks):
    bg.add_task(send_email_task, email)
    return {"status": "queued"}
```

- For heavy tasks: use Celery or dramatiq instead of BackgroundTasks
- BackgroundTasks runs after response is sent (non-blocking)

## WebSockets

```python
@app.websocket("/ws/{client_id}")
async def websocket_endpoint(websocket: WebSocket, client_id: str):
    await websocket.accept()
    while True:
        data = await websocket.receive_text()
        await websocket.send_text(f"Echo: {data}")
```

- Connection manager: track connected clients
- Auth: authenticate on connect, not per-message
- Heartbeat: detect stale connections

## Middleware

```python
@app.middleware("http")
async def timing_middleware(request: Request, call_next):
    start = time.time()
    response = await call_next(request)
    response.headers["X-Process-Time"] = str(time.time() - start)
    return response
```

## Lifespan (startup/shutdown)

```python
from contextlib import asynccontextmanager


@asynccontextmanager
async def lifespan(app: FastAPI):
    # startup
    await init_db()
    yield
    # shutdown
    await close_db()


app = FastAPI(lifespan=lifespan)
```

## Error handling

```python
class AppException(Exception):
    def __init__(self, status_code: int, detail: str):
        self.status_code = status_code
        self.detail = detail


@app.exception_handler(AppException)
async def app_exception_handler(request, exc):
    return JSONResponse(status_code=exc.status_code, content={"detail": exc.detail})
```

## Pitfalls

- Not using `yield` in dependencies (resource leaks)
- Blocking I/O in async endpoints (use `run_in_executor` or sync endpoints)
- Not validating input (use Pydantic models for all request bodies)
- Missing error handlers (default 500 is not user-friendly)
