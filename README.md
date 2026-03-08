# citynote

Citynote is a public source repository for a locale-aware city guide app and a small supporting admin workspace. The repository is public for transparency and collaboration, but it is currently unlicensed and all rights are reserved. Do not reuse or redistribute the code outside normal GitHub viewing and contribution workflows.

## Workspaces

- App: Next.js city guide UI in the repo root
- Admin: internal/support workspace under `tools/admin`

## Setup

```bash
pnpm install
pnpm dev
```

Run the admin workspace locally with:

```bash
pnpm run admin
```

## Environment

Copy `.env.example` to `.env.local` for local development. `.env.local` stays untracked.

- `NEXT_PUBLIC_APP_NAME`: browser-facing app name
- `NEXT_PUBLIC_APP_URL`: canonical local or deployed app URL
- `WEATHERAPI_KEY`: enables live weather cards; without it, weather falls back to unavailable or cached data
- `RESEARCH_API_KEY`: enables admin validation and research-backed news search
- `RESEARCH_API_BASE`: optional override for the research API endpoint
- `CURRENCY_BASES`: optional comma-separated base currencies for the runtime rail
- `NEWS_HEADLINE_LIMIT`: optional headline cap for city news cards

## Code quality

```bash
pnpm run lint
pnpm run typecheck
pnpm run format
```

## Testing

```bash
pnpm run test:run
```

## Public Release Check

Run the full pre-publish verification suite with:

```bash
pnpm run check:public
```

## i18n

```bash
pnpm run validate:messages
```

- Locale routes: `/en/...`, `/ko/...`
- Message files: `messages/{locale}/{common,home,city}.json`
- Localized city data: `data/cities/{locale}/`

## Storybook

```bash
pnpm run storybook
```

Build the static Storybook bundle with:

```bash
pnpm run build-storybook
```

## Publishing Notes

- Rotate any locally used API keys before pushing a public branch.
- Keep `.env.local` ignored and commit only `.env.example`.
- This repository intentionally has no open-source license in this pass.
