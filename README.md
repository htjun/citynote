# citynote

## Setup

```bash
pnpm install
pnpm dev
```

## Code quality

```bash
pnpm run lint
pnpm run format
```

## Testing

```bash
pnpm run test:run
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
