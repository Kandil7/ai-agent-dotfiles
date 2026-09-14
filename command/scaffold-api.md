---
description: Scaffold a new full-stack project: Django/FastAPI + Next.js + Docker Compose + CI.
agent: fullstack-developer
---

Scaffold full-stack project: $ARGUMENTS

1. Ask user: backend framework (Django or FastAPI), database (PostgreSQL/SQLite), frontend needs auth?
2. Create project structure:
   ```
   project/
     backend/        # Django or FastAPI
     frontend/       # Next.js
     docker-compose.yml
     .github/workflows/ci.yml
     .gitignore
     README.md
   ```
3. Backend: setup with proper structure (models/views or routes), DB config, health endpoint.
4. Frontend: `npx create-next-app@latest` with TypeScript, App Router, Tailwind.
5. Docker Compose: backend + frontend services, volumes for dev.
6. CI: typecheck + lint + test + build for both.

Report: created files, how to run locally, recommended next steps.
