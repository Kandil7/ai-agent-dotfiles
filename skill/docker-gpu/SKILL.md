---
name: docker-gpu
description: Docker with GPU on Docker Desktop + WSL2. Use when the user says "docker", "container", "Dockerfile", "GPU container", "docker compose", "nvidia container toolkit", or running training/inference in containers.
---

# Docker + GPU on Docker Desktop / WSL2

## Facts

- Docker Desktop with WSL2 back-end; GPU passthrough works through the Windows NVIDIA driver (576.88) — verify with `nvidia-smi` inside the container before assuming.
- WSL2 containers see the Windows GPU directly; no separate Linux driver needed.
- Container runtime: use images based on CUDA 12.x (e.g. `nvidia/cuda:12.9.x-base` or PyTorch official images).

## Patterns

```yaml
# compose with GPU
services:
  train:
    image: my-train:latest
    deploy:
      resources:
        reservations:
          devices:
            - driver: nvidia
              count: all
              capabilities: [gpu]
    volumes:
      - D:/AI:/data        # mount large assets, keep out of the container layer
```

- `docker run --gpus all` for ad-hoc runs.
- Verify inside: `docker run --rm --gpus all <image> nvidia-smi`.
- Mount `D:\AI\` for models/datasets/checkpoints — never COPY gigabytes into an image.

## Rules

- Docker commands require user approval (permission system).
- NEVER run `docker system prune -a --volumes` (forbidden).
- Never move or resize the Docker VHDX.
- Pin base image tags (`12.9.0-base`, not `latest`) for reproducibility.
- Keep the WSL VHDX lean: volumes on Windows mounts (`D:\`) or WSL filesystem as the user directs.