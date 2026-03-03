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

export type SectionNavItemId =
  | "at-a-glance"
  | "live-pulse"
  | "weather-now"
  | "currency-watch"
  | "city-news"
  | "rule-traps"
  | "climate"
  | "cost-of-living"
  | "getting-around"
  | "connectivity"
  | "neighborhoods"
  | "neighborhood-fit"
  | "accessibility"
  | "food-drink"
  | "language-culture"
  | "safety"
  | "practical"

export interface SectionNavChildItem {
  id: SectionNavItemId
  label: string
}

export interface SectionNavItem {
  id: SectionNavItemId
  label: string
  children?: SectionNavChildItem[]
}

interface SectionNavProps {
  items: SectionNavItem[]
}

const navItemIcons: Record<SectionNavItemId, RemixiconComponentType> = {
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

export function SectionNav({ items }: SectionNavProps) {
  return (
    <nav className="bg-card border-border rounded-lg border p-2">
      <ul className="flex flex-col gap-1">
        {items.map((item) => {
          const Icon = navItemIcons[item.id]

          return (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                className="text-muted-foreground hover:text-foreground hover:bg-muted inline-flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm transition-colors"
              >
                <Icon aria-hidden="true" className="size-4 shrink-0" />
                <span className="min-w-0 flex-1">{item.label}</span>
              </a>
              {item.children?.length ? (
                <ul className="mt-1 space-y-0.5 pl-7">
                  {item.children.map((child) => (
                    <li key={`${item.id}-${child.id}`}>
                      <a
                        href={`#${child.id}`}
                        className="text-muted-foreground/90 hover:text-foreground hover:bg-muted inline-flex w-full items-center rounded-md px-2 py-1 text-xs transition-colors"
                      >
                        <span className="min-w-0 flex-1">{child.label}</span>
                      </a>
                    </li>
                  ))}
                </ul>
              ) : null}
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
