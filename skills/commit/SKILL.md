---
name: commit
description: Commit current Git changes with formatting and linting, then create a clean commit message that avoids prefixes and hook bypasses. Use when Codex needs to run format/lint, review diffs, stage all current changes, and commit safely.
---

# Commit

## Overview

Create one commit from current working tree changes after code hygiene checks. Enforce message rules and let pre-commit hooks run normally.

## Workflow

1. Run hygiene scripts first.

- Prefer `pnpm run format` and `pnpm run lint` when scripts exist.
- Fix issues before continuing.

2. Inspect pending changes.

- Run `git status --short`.
- Run `git diff` to understand what will be committed.

3. Stage all current changes.

- Run `git add .` unless the user explicitly asks for partial staging.

4. Verify staged content.

- Run `git diff --cached --stat`.
- Run `git diff --cached` for final confirmation.

5. Create the commit message.

- If user provided a message argument, use it after applying rules below.
- Otherwise compose a concise message focused on what changed and why.

6. Commit normally.

- Run `git commit -m "<message>"`.
- Do not bypass hooks.
- If hooks fail, fix issues and retry.
- Report commit hash and summary.

## Guardrails

- Never use `--no-verify`.
- Never add `Co-Authored-By: Claude`.
- Never add commit type prefixes such as `feat:`, `fix:`, or `chore:`.
- Never mention phase numbers.

## Message Rules

- Keep message concise and descriptive.
- Focus on what changed and why, not implementation detail.
- Use plain subject text without conventional-commit style prefixes.
