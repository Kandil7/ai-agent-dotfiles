# D:\AI\ Disk Cleanup — 2026-09-08

### Context

Full audit of D:\AI\ revealed 107 GB across Projects (67 GB), Datasets (43 GB), Docker (33 GB), Models (31 GB). Found data duplication, dead venvs, incomplete HF blobs, and exposed API keys.

### Explanation

Executed Tier 1 cleanup:
- Removed 14 GB Shamela duplicate from Athar (symlinked to Datasets/Custom/database)
- Deleted 2.6 GB PyTorch wheel cache
- Cleaned 9 HuggingFace incomplete blobs (bge-m3: 7, Qwen2.5: 2)
- Deleted Baligh dead venvs (.venv-gpu, .venv311)
- Deleted alim .venv-gpu (4.4 GB)
- Deleted Projects/.ruff_cache, 4 empty top-level dirs

Remaining issues:
- alim/.venv311 has Windows file locks, needs manual deletion
- Docker VHDX (33 GB) needs investigation
- 4 Groq API keys + 1 HF token exposed in plaintext .env files

### Alternatives

["Docker system prune (up to 20 GB more savings)", "Archive old meter/diac checkpoints", "Compress raw_audio in transcribe-engine"]

### Rationale (Why this?)

Verified data identity with MD5 checksums before deletion. Symlink preserves backward compatibility for Athar project. Dead venvs had proper pyproject.toml + uv.lock so they can be recreated.

### Exercises

["Run 'wsl --shutdown' then delete alim/.venv311 from Windows Explorer", "Check 'docker images -a' and prune unused images (docker system prune -a)", "Rotate Groq API keys at console.groq.com", "Rotate HF token at huggingface.co/settings/tokens"]

### Next Steps

["Set up .secrets.baseline in all projects to prevent future key exposure", "Consider using age/sops for encrypted .env files", "Monitor Docker VHDX growth"]

---
