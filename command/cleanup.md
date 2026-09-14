---
description: Clean up old checkpoints, clear GPU cache, prune containers, free disk space. Reports what was removed and space reclaimed.
---

Cleanup: $ARGUMENTS

## Mode

- `gpu`: clear GPU memory (kill zombie processes, release VRAM).
- `checkpoints`: remove old checkpoints (keep last N, archive or delete).
- `containers`: prune stopped containers, dangling images (NEVER `docker system prune -a --volumes`).
- `disk`: find and report large files, suggest what to remove.
- `all`: run all cleanup steps interactively.

## GPU Cleanup

1. Run `nvidia-smi` to identify processes holding VRAM.
2. Report what is using VRAM and whether it should be killed.
3. Kill only with approval. Never kill a process the user is running.

## Checkpoint Cleanup

1. Find all checkpoint files in `D:\AI\` and project directories.
2. Group by project and age.
3. Propose keeping the last N per project (default: keep best + last 2).
4. Archive or delete only with approval.

## Container Cleanup

1. List stopped containers and dangling images.
2. Report sizes.
3. Remove only with approval. NEVER run `docker system prune -a --volumes`.

## Disk

1. Scan `D:\AI\` and project directories for large files (>100MB).
2. Report: file, size, age, last accessed.
3. Suggest what to remove (checkpoints, datasets, logs).

## Rules

- NEVER delete without approval. Report first, act only after approval.
- Report space reclaimed after cleanup.
