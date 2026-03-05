# CityNote Baseline IA Audit (2026-03)

## Scope

- Home page: `/[locale]`
- Global navigation: `components/top-nav.tsx`, `components/preferences-popover.tsx`
- City page shell: `app/[locale]/[citySlug]/page.tsx`
- City section nav: `components/city/section-nav.tsx`
- Section components under `components/city/sections/*`
- Content schema: `data/types.ts`, `data/cities/*`
- i18n copy: `messages/{en,ko}/{home,city,common}.json`

## Scoring rubric

- `1` poor, `3` acceptable, `5` strong
- Dimensions: `readability`, `usefulness`, `clarity`, `relevance`
- Verdict action: `keep`, `merge`, `split`, `demote`, `remove`

## Executive findings

1. The city page is information-dense but structurally flat. Time-sensitive and evergreen content are interleaved, so scanability degrades on long pages.
2. Navigation and content composition are not generated from one source of truth. `climate` renders in the body but is omitted from page-level nav generation.
3. Personalization signals exist (`purpose`, `nationality`) but are not used in ordering or depth decisions.
4. `At a Glance` over-summarizes and duplicates details repeated later, reducing clarity.
5. Runtime sections have good freshness metadata, but freshness does not influence prominence.

## Current-state IA issues

### Structural

- Flat section flow increases context switching.
- No grouped hierarchy in sidebar nav.
- Section order is static and not profile-aware.

### Content quality

- Summary/detail duplication across `at-a-glance`, `getting-around`, `practical`, and `safety`.
- Several sections have high value but low actionability at current placement (`climate` near top).
- Some nav labels are compressed and ambiguous (`Cost`, `Transport`).

### Consistency

- Body section order and nav order are composed in different places.
- Optional sections are conditionally rendered correctly, but ordering logic is not centralized.

## Section scorecard and decisions

| Section            | Readability | Usefulness | Clarity | Relevance | Decision | Rationale                                                        |
| ------------------ | ----------: | ---------: | ------: | --------: | -------- | ---------------------------------------------------------------- |
| `at-a-glance`      |           3 |          5 |       3 |         5 | `split`  | Keep as compact summary only; remove duplicate detail lines.     |
| `live-pulse`       |           4 |          4 |       4 |         4 | `keep`   | Strong real-time signal card pattern.                            |
| `weather-now`      |           4 |          5 |       4 |         5 | `keep`   | High actionability; keep freshness badge/source.                 |
| `currency-watch`   |           4 |          3 |       4 |         3 | `demote` | Useful for international users, low value for domestic profiles. |
| `city-news`        |           3 |          3 |       3 |         3 | `demote` | Keep but lower by default due uneven immediate actionability.    |
| `rule-traps`       |           4 |          5 |       4 |         5 | `keep`   | High-risk avoidance content; prioritize for international users. |
| `climate`          |           4 |          3 |       4 |         2 | `demote` | Baseline planning content, low immediate actionability.          |
| `cost-of-living`   |           3 |          5 |       3 |         5 | `keep`   | Core decision factor; move to Plan group.                        |
| `getting-around`   |           4 |          5 |       4 |         5 | `keep`   | One of the most actionable sections.                             |
| `connectivity`     |           4 |          4 |       4 |         4 | `keep`   | Valuable for study/live profiles.                                |
| `neighborhoods`    |           4 |          5 |       4 |         5 | `keep`   | Strong fit signal for stay decisions.                            |
| `neighborhood-fit` |           3 |          4 |       4 |         4 | `keep`   | Valuable segmentation layer; optional.                           |
| `accessibility`    |           4 |          4 |       4 |         4 | `keep`   | Important trust and inclusivity signal.                          |
| `food-drink`       |           4 |          3 |       4 |         3 | `demote` | Useful context, generally lower priority than logistics/safety.  |
| `language-culture` |           4 |          4 |       4 |         4 | `keep`   | High value for study/international profiles.                     |
| `safety`           |           4 |          5 |       4 |         5 | `keep`   | Must stay prominent.                                             |
| `practical`        |           4 |          4 |       4 |         4 | `keep`   | Setup-critical content for medium/long stays.                    |

## Contradictions and mismatches

1. `climate` is rendered in page body but excluded from generated nav in `app/[locale]/[citySlug]/page.tsx`.
2. The nav and body section composition are maintained separately, creating drift risk.
3. Personalization preferences are collected in UI but not reflected in city-page ordering/content depth.

## Canonical target IA (non-personalized baseline)

1. `Essentials`: at-a-glance, getting-around, safety, rule-traps
2. `Right Now`: live-pulse, weather-now, currency-watch, city-news
3. `Plan Your Stay`: cost-of-living, neighborhoods, neighborhood-fit, connectivity, practical, accessibility
4. `Local Context`: language-culture, food-drink, climate

## Content ownership map

- Summary layer: `at-a-glance` only.
- Operational layer: `getting-around`, `safety`, `rule-traps`, runtime sections.
- Planning layer: `cost-of-living`, `neighborhoods`, `connectivity`, `practical`, `accessibility`.
- Context layer: `language-culture`, `food-drink`, `climate`.

## Baseline recommendations before personalization

1. Introduce a single section registry used by both nav and body.
2. Group nav by IA domain, not a flat list.
3. Cap `at-a-glance` to 8-10 non-redundant fields.
4. Keep runtime freshness and source visibility in all live sections.
5. Use canonical grouped order as fallback when profile data is missing.
