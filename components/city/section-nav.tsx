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
import { cn } from "@/lib/utils"

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
  mode?: "card" | "sidebar"
  className?: string
  onNavigate?: () => void
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

interface ItemLinkOptions {
  dense: boolean
  onNavigate?: () => void
}

function toItemLink(item: SectionNavItem, options: ItemLinkOptions) {
  const Icon = navItemIcons[item.id]

  return (
    <a
      key={item.id}
      href={`#${item.id}`}
      onClick={options.onNavigate}
      className={cn(
        "group inline-flex w-full items-center gap-2.5 transition-[background-color,color,transform] duration-normal ease-fluid",
        "focus-visible:ring-super/35 focus-visible:outline-none focus-visible:ring-2",
        options.dense
          ? "text-quiet hover:text-foreground hover:bg-subtle rounded-lg px-2 py-2 text-[13px]"
          : "text-quiet hover:text-foreground hover:bg-subtle rounded-[14px] px-3 py-2.5 text-sm"
      )}
    >
      <Icon
        aria-hidden="true"
        className={cn(
          "shrink-0",
          options.dense ? "size-4 opacity-85" : "size-4 opacity-75"
        )}
      />
      <span className="min-w-0 flex-1">{item.label}</span>
    </a>
  )
}

interface GroupOptions {
  dense: boolean
  onNavigate?: () => void
}

function toGroup(group: SectionNavGroup, options: GroupOptions) {
  if (group.items.length === 0) {
    return null
  }

  return (
    <li
      key={group.id}
      className={cn("space-y-1", options.dense && "space-y-1")}
    >
      <h3
        className={cn(
          "text-quieter px-3 pt-2 text-[11px] font-semibold uppercase tracking-[0.18em]",
          options.dense && "px-2 pt-3 text-[10px]"
        )}
      >
        {group.label}
      </h3>
      <ul className={cn("space-y-1", options.dense && "space-y-0.5")}>
        {group.items.map((item) => (
          <li key={item.id}>{toItemLink(item, options)}</li>
        ))}
      </ul>
    </li>
  )
}

export function SectionNav({
  groups,
  mode = "card",
  className,
  onNavigate,
}: SectionNavProps) {
  const dense = mode === "sidebar"

  return (
    <nav
      className={cn(
        dense
          ? "bg-transparent p-0"
          : "border-subtlest bg-raised rounded-[20px] border p-2 shadow-[var(--shadow-subtle)]",
        className
      )}
    >
      <ul className={cn("flex flex-col gap-2.5", dense && "gap-3")}>
        {groups.map((group) => toGroup(group, { dense, onNavigate }))}
      </ul>
    </nav>
  )
}

export type { CitySectionId as SectionNavItemId }
