# Design Tokens

This document defines the active token system for Citynote.

## Token Tiers

The token system has two layers:

1. Canonical design tokens (research-inspired)
2. Legacy semantic bridge tokens (shadcn-compatible)

Use canonical tokens for new UI work. The semantic bridge exists for compatibility with existing classes.

## Core Surface Tokens

- `--surface-base`: page-level background
- `--surface-raised`: default card/control background
- `--surface-subtle`: hover and soft emphasis background
- `--surface-quiet`: muted surface accents and active pills

Usage guidance:

- Use `base` for page shells and root panels.
- Use `raised` for cards, popovers, menus, and form controls.
- Use `subtle` for hover, pressed, and selected (low emphasis) states.
- Use `quiet` for micro-surfaces such as chips, badges, and inline highlights.

## Text Tokens

- `--text-foreground`: primary readable text
- `--text-quiet`: secondary text
- `--text-quieter`: tertiary/meta text
- `--text-inverse`: text on strong accent surfaces

Usage guidance:

- Headings and primary content should use foreground.
- Supporting descriptions should use quiet.
- Metadata labels and helper content should use quieter.

## Accent and Feedback Tokens

- `--accent-super`: primary accent color
- `--accent-super-contrast`: text/icon color on accent
- `--finance-positive`: positive market movement and success indicators
- `--finance-negative`: negative market movement and destructive indicators

Usage guidance:

- Use `accent-super` sparingly for key actions and active emphasis.
- Use finance tokens only for financial/value-direction semantics.

## Border and Depth Tokens

- `--border-subtle`: default border color
- `--border-subtlest`: low-emphasis separators
- `--shadow-subtle`: default card/control depth
- `--shadow-raised`: floating surfaces (menus/dialogs/popovers)

Usage guidance:

- Prefer `subtle` for component outlines.
- Prefer `subtlest` for dividers and section separators.

## Motion Tokens

- `--duration-quick`: 150ms
- `--duration-normal`: 300ms
- `--duration-slow`: 500ms
- `--ease-fluid`: primary easing curve
- `--ease-out-expo`: emphasized exit/settle easing

Usage guidance:

- Default to `duration-normal` + `ease-fluid` for UI transitions.
- Use `duration-quick` for lightweight state transitions.

## Utility Class Conventions

Preferred utility classes:

- Surfaces: `bg-base`, `bg-raised`, `bg-subtle`, `bg-quiet`
- Text: `text-foreground`, `text-quiet`, `text-quieter`, `text-super`
- Borders: `border-subtle`, `border-subtlest`
- Motion: `duration-quick`, `duration-normal`, `ease-fluid`

## Migration Rules

- Do not introduce raw color literals in components.
- Prefer semantic token classes over ad-hoc arbitrary color values.
- Keep existing shadcn semantic classes functional through bridge mappings.
- When touching legacy UI, migrate classes to canonical token utilities in the same change.

## Light-Only Mode

Current token rollout is light-only by design.

- `.dark` remains defined but mapped to the same light token values.
- Do not add dark-specific visual divergence until a dedicated dark-mode pass is planned.
