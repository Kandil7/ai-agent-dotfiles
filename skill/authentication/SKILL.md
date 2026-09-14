---
name: authentication
description: "Authentication and authorization patterns. Use when the user says 'JWT', 'OAuth2', 'session', 'RBAC', 'API key', 'login', 'permissions', 'NextAuth', or 'Django auth'."
---

# Authentication & Authorization

## Patterns

| Pattern | Best for | Tradeoff |
|---------|----------|----------|
| **JWT** | APIs, stateless services | No server-side revocation without blacklist |
| **Session cookies** | Traditional web apps | Simple, server-side state |
| **OAuth2** | Third-party login (Google, GitHub) | Complex flow, but standard |
| **API keys** | Machine-to-machine | Simple, but no user context |

## JWT implementation

```python
# Create token
from jose import jwt

token = jwt.encode(
    {"sub": user.id, "exp": datetime.utcnow() + timedelta(hours=1)},
    SECRET_KEY,
    algorithm="HS256",
)

# Verify token (FastAPI dependency)
from fastapi import Depends, HTTPException
from fastapi.security import HTTPBearer


async def get_current_user(token: str = Depends(HTTPBearer())):
    try:
        payload = jwt.decode(token.credentials, SECRET_KEY, algorithms=["HS256"])
        return payload["sub"]
    except JWTError:
        raise HTTPException(401, "Invalid token")
```

## OAuth2 flow (simplified)

```
User -> "Login with Google"
  -> Redirect to Google OAuth
  -> Google redirects back with code
  -> Exchange code for tokens
  -> Store access_token + refresh_token
  -> Use access_token for API calls
  -> Refresh when expired
```

## RBAC (Role-Based Access Control)

```python
class Permission:
    READ = "read"
    WRITE = "write"
    ADMIN = "admin"


class Role:
    VIEWER = [Permission.READ]
    EDITOR = [Permission.READ, Permission.WRITE]
    ADMIN = [Permission.READ, Permission.WRITE, Permission.ADMIN]
```

- Django: `django-guardian` for object-level permissions
- FastAPI: `casbin` for policy-based authorization

## API key management

- Generate: random 32+ byte token, hashed in DB
- Store: hashed (like passwords), never plaintext
- Rotate: support multiple active keys, revoke old ones
- Rate limit: per-key limits, not per-IP

## Password hashing

- Use `bcrypt` or `argon2` (never MD5/SHA1)
- Django: `make_password()` / `check_password()` built-in
- FastAPI: `passlib[bcrypt]` package

## Pitfalls

- Storing JWT in localStorage (XSS vulnerable) — use httpOnly cookies
- Not rotating refresh tokens
- Hardcoded secrets in source code
- Missing rate limiting on login endpoint (brute force)
- Not checking token expiration
