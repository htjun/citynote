# CityNote Canonical IA Specification

## Purpose

Define the baseline, non-personalized information architecture used when profile signals are unavailable. Personalization layers on top of this baseline.

## IA principles

1. Keep structure stable and predictable.
2. Keep summaries concise and remove duplication.
3. Prioritize actionable content before contextual depth.
4. Use one registry as source of truth for nav + body composition.

## Home IA

1. Value proposition
2. City selector
3. Purpose and optional nationality setup
4. Runtime freshness/source trust note

## City IA group order

1. `Essentials`
2. `Right Now`
3. `Plan Your Stay`
4. `Local Context`

## City sections by group

### Essentials

1. `at-a-glance`
2. `getting-around`
3. `safety`
4. `rule-traps`

### Right Now

1. `live-pulse`
2. `weather-now`
3. `currency-watch`
4. `city-news`

### Plan Your Stay

1. `cost-of-living`
2. `neighborhoods`
3. `neighborhood-fit`
4. `connectivity`
5. `practical`
6. `accessibility`

### Local Context

1. `language-culture`
2. `food-drink`
3. `climate`

## Content ownership

1. `at-a-glance`: compact high-signal orientation only.
2. Runtime sections: freshness/source/bounded cadence signals.
3. Logistics and planning: transport, safety, rules, cost, neighborhoods, connectivity, practical setup.
4. Context enrichment: language/culture, food, climate.

## Baseline content rules

1. `at-a-glance` must remain 8-10 items.
2. Avoid repeating detailed values already owned by deeper sections.
3. Runtime cards must include freshness label + source link.
4. Lower-actionability content stays later by default.

## Personalization compatibility requirements

1. Group order stays fixed.
2. Sections can reorder only within groups unless guardrail overrides apply.
3. If profile is unavailable, render canonical order exactly.
4. Section anchors remain stable for deep-link compatibility.

## Canonical IA implementation requirements

1. Single section registry generates nav and body.
2. Registry controls canonical order, optional visibility, and metadata.
3. Ranking engine consumes registry entries and profile context.
4. Integration tests assert nav/body order parity.
