"use client"

import * as React from "react"
import { Popover } from "@base-ui/react/popover"
import { RiUser3Line } from "@remixicon/react"
import { Link, usePathname } from "@/i18n/navigation"
import { routing } from "@/i18n/routing"
import { useLocale, useTranslations } from "next-intl"

import { cn } from "@/lib/utils"
import { usePreferences, TRAVEL_TYPES } from "@/lib/stores/preferences"
import type { TravelType } from "@/lib/stores/preferences"
import { countries } from "@/data/countries"
import { ChipGroup } from "@/components/ui/segmented-control"

const REOPEN_AFTER_LOCALE_SWITCH_KEY = "citynote:reopen-preferences-popover"

interface RegionDisplayNames {
  of: (regionCode: string) => string | undefined
}

interface IntlWithDisplayNames {
  DisplayNames?: new (
    locales?: string | readonly string[],
    options?: { type: "region" }
  ) => RegionDisplayNames
}

function markPopoverForReopenAfterLocaleSwitch() {
  if (typeof window === "undefined") {
    return
  }
  window.sessionStorage.setItem(REOPEN_AFTER_LOCALE_SWITCH_KEY, "1")
}

function createRegionDisplayNames(locale: string): RegionDisplayNames | null {
  const { DisplayNames } = Intl as unknown as IntlWithDisplayNames
  if (!DisplayNames) {
    return null
  }
  try {
    return new DisplayNames([locale], { type: "region" })
  } catch {
    return null
  }
}

export function PreferencesPopover() {
  const t = useTranslations("common")
  const locale = useLocale()
  const pathname = usePathname()
  const { nationality, travelType, setNationality, setTravelType } =
    usePreferences()
  const [open, setOpen] = React.useState(false)

  React.useEffect(() => {
    if (typeof window === "undefined") {
      return
    }
    const shouldReopen =
      window.sessionStorage.getItem(REOPEN_AFTER_LOCALE_SWITCH_KEY) === "1"
    if (!shouldReopen) {
      return
    }
    window.sessionStorage.removeItem(REOPEN_AFTER_LOCALE_SWITCH_KEY)
    setOpen(true)
  }, [])

  const hasPreferences = nationality !== null || travelType !== null

  const localeOptions = routing.locales.map((l) => ({
    value: l,
    label: t(`nav.locales.${l}`),
  }))

  const travelOptions = TRAVEL_TYPES.map((type) => ({
    value: type,
    label: t(`preferences.types.${type}`),
  }))

  return (
    <Popover.Root open={open} onOpenChange={setOpen}>
      <Popover.Trigger
        className={cn(
          "hover:bg-muted relative inline-flex size-8 cursor-pointer items-center justify-center rounded-md transition-colors",
          "text-muted-foreground hover:text-foreground"
        )}
        aria-label={t("preferences.trigger")}
      >
        <RiUser3Line className="size-4" />
        {hasPreferences && (
          <span
            aria-hidden
            className="bg-primary absolute top-1 right-1 size-1.5 rounded-full"
          />
        )}
      </Popover.Trigger>

      <Popover.Portal>
        <Popover.Positioner
          side="bottom"
          align="end"
          sideOffset={4}
          className="z-50 outline-none"
        >
          <Popover.Popup className="bg-popover text-popover-foreground ring-foreground/10 w-72 origin-(--transform-origin) rounded-md shadow-lg ring-1 data-ending-style:scale-95 data-ending-style:opacity-0 data-starting-style:scale-95 data-starting-style:opacity-0 transition-[transform,opacity,scale] duration-150">
            <div className="space-y-4 p-4">
              <PreferenceSection label={t("preferences.language")}>
                <div className="flex flex-wrap gap-1.5">
                  {localeOptions.map((opt) => {
                    const active = opt.value === locale
                    return (
                      <Link
                        key={opt.value}
                        href={pathname}
                        locale={opt.value}
                        onClick={() => {
                          if (opt.value !== locale) {
                            markPopoverForReopenAfterLocaleSwitch()
                          }
                        }}
                        className={cn(
                          "inline-flex cursor-pointer items-center justify-center rounded-md border px-3 py-1.5 text-xs font-medium transition-colors",
                          active
                            ? "bg-foreground border-foreground text-background"
                            : "border-input bg-background text-muted-foreground hover:bg-muted hover:text-foreground"
                        )}
                      >
                        {opt.label}
                      </Link>
                    )
                  })}
                </div>
              </PreferenceSection>

              <PreferenceSection label={t("preferences.nationality")}>
                <NationalitySelect
                  locale={locale}
                  value={nationality}
                  onChange={setNationality}
                  placeholder={t("preferences.nationalityPlaceholder")}
                  emptyLabel={t("preferences.nationalityEmpty")}
                />
              </PreferenceSection>

              <Divider />

              <PreferenceSection label={t("preferences.travelType")}>
                <ChipGroup<TravelType>
                  options={travelOptions}
                  value={travelType}
                  onValueChange={setTravelType}
                />
              </PreferenceSection>
            </div>
          </Popover.Popup>
        </Popover.Positioner>
      </Popover.Portal>
    </Popover.Root>
  )
}

function PreferenceSection({
  label,
  children,
}: {
  label: string
  children: React.ReactNode
}) {
  return (
    <div className="space-y-2">
      <p className="text-muted-foreground text-xs font-medium">{label}</p>
      {children}
    </div>
  )
}

function Divider() {
  return <div className="bg-border h-px" />
}

function NationalitySelect({
  locale,
  value,
  onChange,
  placeholder,
  emptyLabel,
}: {
  locale: string
  value: string | null
  onChange: (code: string | null) => void
  placeholder: string
  emptyLabel: string
}) {
  const [search, setSearch] = React.useState("")
  const [open, setOpen] = React.useState(false)

  const localizedCountries = React.useMemo(() => {
    const regionDisplayNames = createRegionDisplayNames(locale)
    return countries
      .map((country) => ({
        ...country,
        localizedName: regionDisplayNames?.of(country.code) ?? country.name,
      }))
      .toSorted((a, b) =>
        a.localizedName.localeCompare(b.localizedName, locale)
      )
  }, [locale])

  const filtered = React.useMemo(() => {
    if (!search) {
      return localizedCountries
    }
    const q = search.toLowerCase()
    return localizedCountries.filter(
      (c) =>
        c.localizedName.toLowerCase().includes(q) ||
        c.name.toLowerCase().includes(q) ||
        c.code.toLowerCase() === q
    )
  }, [localizedCountries, search])

  const selected = value
    ? (localizedCountries.find((c) => c.code === value) ?? null)
    : null

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className={cn(
          "border-input bg-background flex w-full cursor-pointer items-center justify-between rounded-md border px-3 py-1.5 text-xs transition-colors",
          "hover:bg-muted hover:text-foreground focus-visible:ring-ring focus-visible:ring-1 focus-visible:outline-none",
          !selected && "text-muted-foreground"
        )}
      >
        <span className="truncate">
          {selected ? selected.localizedName : placeholder}
        </span>
        {selected ? (
          <span
            role="button"
            tabIndex={0}
            className="text-muted-foreground hover:text-foreground ml-1 shrink-0 cursor-pointer"
            onClick={(e) => {
              e.stopPropagation()
              onChange(null)
              setOpen(false)
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault()
                e.stopPropagation()
                onChange(null)
                setOpen(false)
              }
            }}
            aria-label="Clear"
          >
            &times;
          </span>
        ) : (
          <ChevronDown />
        )}
      </button>

      {open && (
        <div className="ring-foreground/10 bg-popover absolute top-full left-0 z-10 mt-1 w-full overflow-hidden rounded-sm shadow-md ring-1">
          <div className="border-border border-b p-1.5">
            <input
              autoFocus
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={placeholder}
              className="bg-transparent w-full text-xs outline-none"
            />
          </div>
          <div className="max-h-40 overflow-y-auto py-1">
            {filtered.length === 0 ? (
              <p className="text-muted-foreground px-2 py-2 text-center text-xs">
                {emptyLabel}
              </p>
            ) : (
              filtered.map((country) => (
                <button
                  key={country.code}
                  type="button"
                  onClick={() => {
                    onChange(country.code)
                    setSearch("")
                    setOpen(false)
                  }}
                  className={cn(
                    "flex w-full cursor-pointer items-center px-2 py-1.5 text-xs transition-colors",
                    "hover:bg-accent hover:text-accent-foreground",
                    country.code === value && "bg-accent/50 font-medium"
                  )}
                >
                  {country.localizedName}
                </button>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  )
}

function ChevronDown() {
  return (
    <svg
      className="text-muted-foreground ml-1 size-3 shrink-0"
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden
    >
      <path
        d="M4 6l4 4 4-4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
