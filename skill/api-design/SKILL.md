---
name: api-design
description: "REST API design patterns. Use when the user says 'REST API', 'endpoint', 'OpenAPI', 'Swagger', 'pagination', 'versioning', 'HATEOAS', or 'API contract'."
---

# REST API Design

## Resource naming

```
/users              # collection
/users/123          # specific resource
/users/123/orders   # nested resource
/orders?user_id=123 # filtered collection
```

- Use nouns, not verbs: `/users` not `/getUsers`
- Plural: `/users` not `/user`
- Lowercase with hyphens: `/user-profiles` not `/userProfiles`

## HTTP methods

| Method | Purpose | Idempotent | Safe |
|--------|---------|------------|------|
| GET | Read resource | Yes | Yes |
| POST | Create resource | No | No |
| PUT | Replace resource | Yes | No |
| PATCH | Partial update | No* | No |
| DELETE | Remove resource | Yes | No |

## Status codes

```
200 OK           — success
201 Created      — resource created (return Location header)
204 No Content   — success, no body (DELETE)
400 Bad Request  — validation error
401 Unauthorized — not authenticated
403 Forbidden    — not authorized
404 Not Found    — resource doesn't exist
409 Conflict     — duplicate, state conflict
422 Unprocessable — business logic error
429 Too Many Requests — rate limited
500 Internal Server Error — unexpected failure
```

## Pagination

```json
{
  "data": [...],
  "pagination": {
    "page": 1,
    "per_page": 20,
    "total": 156,
    "total_pages": 8
  }
}
```

- Cursor-based: better for real-time data (`?cursor=abc123`)
- Offset-based: simpler, good for admin UIs (`?page=2&per_page=20`)

## Error format

```json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid input",
    "details": [
      {"field": "email", "message": "Must be a valid email"},
      {"field": "name", "message": "Required"}
    ]
  }
}
```

## Versioning

- URL path: `/api/v1/users` (recommended, explicit)
- Header: `Accept: application/vnd.api.v1+json`
- Query param: `/users?version=1` (avoid)

## Filtering and sorting

```
/users?status=active&sort=-created_at&fields=id,name,email
```

## Pitfalls

- Using GET for mutations
- Not versioning APIs (breaking changes break clients)
- Inconsistent error formats
- Missing rate limiting
- Not documenting with OpenAPI/Swagger
