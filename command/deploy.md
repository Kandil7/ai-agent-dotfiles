---
description: Build and deploy: containerize, health checks, deploy to target, verify health. Requires approval for push/deploy steps.
agent: mlops
---

Deploy: $ARGUMENTS

Follow the docker-gpu, mlops, and deployment skills.

## Mode

- `build`: build the container image, verify it runs with GPU.
- `push`: push to container registry.
- `deploy`: deploy to target (local docker-compose, remote server, cloud).
- `status`: check deployment health.
- `rollback`: revert to previous version.

## Build

1. Verify Dockerfile exists and is correct (pinned base image, CUDA version, .dockerignore).
2. Build the image with a version tag (git SHA or semantic version).
3. Verify: `docker run --gpus all <image>` - confirm GPU access inside container.
4. Run smoke test inside container (if health endpoint exists).

## Push

1. Verify registry credentials.
2. Tag and push. Record the image URI.
3. Requires approval (network/registry operation).

## Deploy

1. Identify target: local docker-compose, SSH remote, or cloud service.
2. Deploy with the new image tag.
3. Verify health endpoint responds.
4. Check GPU is available in the deployed container.

## Rules

- Never deploy without tests passing (`/test` must have passed).
- Never deploy without `/ship` having passed (or equivalent checks).
- Always support rollback: keep the previous image tag.
- Container images and deployment configs go in the project, not in `D:\AI\`.
- Record deployment time, version, and changes.
