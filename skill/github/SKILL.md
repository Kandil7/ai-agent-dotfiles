---
name: github
description: Git and GitHub workflow: commits, branches, PRs, gh CLI, GitHub Actions, conventional commits. Use when the user says "github", "git", "commit", "push", "pull request", "PR", "gh", "clone", "branch", "fork", or "CI".
---

# Git & GitHub Workflow

## Commit discipline

- Commit only when the user asks.
- Before committing: `git status`, `git diff`, `git log --oneline -10`; stage only intended files; never commit secrets, `.env`, `D:\AI\` paths, checkpoints, or models.
- Message style: short imperative summary line, optional body explaining why. Match repo conventions (check `git log` first).
- Never amend failed commits — fix and make a new commit. Never force push. Never `git reset --hard`.

## Branching

- Feature branches off `main`; PRs squash-merge by default; keep PRs small and reviewable.

## GitHub CLI (`gh`)

- Prefer `gh` for repo ops: `gh pr create`, `gh pr view`, `gh pr checks`, `gh issue list`.
- PRs: review status, diff from base branch, and all commits in the PR before creating/merging.

## GitHub Actions

- CI: lint + typecheck + tests on PRs; GPU workloads stay out of default CI (no GPU runners).
- Pin action versions; keep secrets in repo secrets, never in YAML.

## Local AI assets

- `D:\AI\**`, checkpoints, datasets, model weights: NEVER in Git. Add to `.gitignore` at project setup (see the project template).
- Use Git LFS only if the repo owner explicitly uses it.