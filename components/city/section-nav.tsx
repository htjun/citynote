import type { RemixiconComponentType } from "@remixicon/react"
import {
  RiAlertLine,
  RiCompass3Line,
  RiExchangeDollarLine,
  RiFootprintLine,
  RiGlobalLine,
  RiMapPinLine,
  RiPulseLine,
  RiRestaurant2Line,
  RiShieldCheckLine,
  RiSuitcaseLine,
  RiSunLine,
  RiTrainLine,
  RiTranslate,
  RiWalletLine,
  RiWheelchairLine,
  RiWifiLine,
} from "@remixicon/react"
import type { CitySectionId, SectionGroupId } from "@/lib/ia/types"

export interface SectionNavItem {
  id: CitySectionId
  label: string
}

export interface SectionNavGroup {
  id: SectionGroupId
  label: string
  items: SectionNavItem[]
}

interface SectionNavProps {
  groups: SectionNavGroup[]
}

const navItemIcons: Record<CitySectionId, RemixiconComponentType> = {
  "at-a-glance": RiCompass3Line,
  "live-pulse": RiPulseLine,
  "weather-now": RiSunLine,
  "currency-watch": RiExchangeDollarLine,
  "city-news": RiGlobalLine,
  "rule-traps": RiAlertLine,
  climate: RiSunLine,
  "cost-of-living": RiWalletLine,
  "getting-around": RiTrainLine,
  connectivity: RiWifiLine,
  neighborhoods: RiMapPinLine,
  "neighborhood-fit": RiFootprintLine,
  accessibility: RiWheelchairLine,
  "food-drink": RiRestaurant2Line,
  "language-culture": RiTranslate,
  safety: RiShieldCheckLine,
  practical: RiSuitcaseLine,
}

function toItemLink(item: SectionNavItem) {
  const Icon = navItemIcons[item.id]

  return (
    <a
      key={item.id}
      href={`#${item.id}`}
      className="text-muted-foreground hover:text-foreground hover:bg-muted inline-flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm transition-colors"
    >
      <Icon aria-hidden="true" className="size-4 shrink-0" />
      <span className="min-w-0 flex-1">{item.label}</span>
    </a>
  )
}

function toGroup(group: SectionNavGroup) {
  if (group.items.length === 0) {
    return null
  }

  return (
    <li key={group.id} className="space-y-1">
      <h3 className="text-muted-foreground px-3 pt-2 text-xs font-semibold uppercase tracking-wide">
        {group.label}
      </h3>
      <ul className="space-y-1">
        {group.items.map((item) => (
          <li key={item.id}>{toItemLink(item)}</li>
        ))}
      </ul>
    </li>
  )
}

export function SectionNav({ groups }: SectionNavProps) {
  return (
    <nav className="bg-card border-border rounded-lg border p-2">
      <ul className="flex flex-col gap-2">
        {groups.map((group) => toGroup(group))}
      </ul>
    </nav>
  )
}

export type { CitySectionId as SectionNavItemId }
