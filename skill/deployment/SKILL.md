---
name: deployment
description: Production deployment. Containerization, health checks, rollback, monitoring, scaling. Use when the user says "deploy", "production", "health check", "rollback", "scale", "containerize", or "ship".
---

# Production Deployment

## Pre-deployment checklist

- Tests pass
- Lint/typecheck pass
- Security scan clean
- Dockerfile builds reproducibly (pinned tags)
- Health endpoint present
- Rollback plan documented

## Container deployment

- Multi-stage builds for small images
- Health checks (liveness + readiness)
- Resource limits (CPU, memory, GPU)
- .dockerignore excludes D:\AI, checkpoints, .env

## Health checks

- `/health`: returns 200 when service is ready
- `/ready`: returns 200 when model is loaded and warm
- `/metrics`: Prometheus-compatible metrics

## Monitoring

- Request latency (p50, p95, p99)
- Error rate
- VRAM usage
- Temperature
- Throughput

## Rollback

- Previous image tag always available
- Database migration rollback scripts
- Configuration versioning

## Rules

- Every deployment needs a rollback plan
- Health checks mandatory
- Never deploy without smoke tests
- Record deployment time, version, and changes
- Container images and deployment configs go in the project, not in D:\AI\
