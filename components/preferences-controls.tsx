"use client"

import * as React from "react"
import { Link, usePathname } from "@/i18n/navigation"
import { routing } from "@/i18n/routing"
import { useLocale, useTranslations } from "next-intl"

import { countries } from "@/data/countries"
import { usePreferences, TRAVEL_TYPES } from "@/lib/stores/preferences"
import type { TravelType } from "@/lib/stores/preferences"
import { cn } from "@/lib/utils"
import { ChipGroup } from "@/components/ui/segmented-control"

interface RegionDisplayNames {
  of: (regionCode: string) => string | undefined
}

interface IntlWithDisplayNames {
  DisplayNames?: new (
    locales?: string | readonly string[],
    options?: { type: "region" }
  ) => RegionDisplayNames
}

export interface PreferencesControlsProps {
  className?: string
  onBeforeLocaleChange?: (nextLocale: string) => void
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

export function PreferencesControls({
  className,
  onBeforeLocaleChange,
}: PreferencesControlsProps) {
  const t = useTranslations("common")
  const locale = useLocale()
  const pathname = usePathname()
  const { nationality, travelType, setNationality, setTravelType } =
    usePreferences()

  const localeOptions = routing.locales.map((value) => ({
    value,
    label: t(`nav.locales.${value}`),
  }))

  const travelOptions = TRAVEL_TYPES.map((type) => ({
    value: type,
    label: t(`preferences.types.${type}`),
  }))

  return (
    <div className={cn("space-y-4", className)}>
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
                    onBeforeLocaleChange?.(opt.value)
                  }
                }}
                className={cn(
                  "inline-flex cursor-pointer items-center justify-center rounded-lg border px-3 py-1.5 text-xs font-medium transition-[background-color,border-color,color,opacity] duration-normal ease-fluid",
                  active
                    ? "border-super/30 bg-super/12 text-super"
                    : "border-subtle bg-raised text-quiet hover:bg-subtle hover:text-foreground"
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
      <p className="text-quiet text-xs font-medium">{label}</p>
      {children}
    </div>
  )
}

function Divider() {
  return <div className="bg-subtlest h-px" />
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
      (country) =>
        country.localizedName.toLowerCase().includes(q) ||
        country.name.toLowerCase().includes(q) ||
        country.code.toLowerCase() === q
    )
  }, [localizedCountries, search])

  const selected = value
    ? (localizedCountries.find((country) => country.code === value) ?? null)
    : null

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className={cn(
          "border-subtle bg-raised text-foreground focus-visible:border-super/45 focus-visible:ring-super/30 flex w-full cursor-pointer items-center justify-between rounded-lg border px-3 py-2 text-xs transition-[background-color,border-color,color,box-shadow] duration-normal ease-fluid hover:bg-subtle focus-visible:ring-2 focus-visible:outline-none",
          !selected && "text-quiet"
        )}
      >
        <span className="truncate">
          {selected ? selected.localizedName : placeholder}
        </span>
        {selected ? (
          <span
            role="button"
            tabIndex={0}
            className="text-quieter hover:text-foreground ml-1 shrink-0 cursor-pointer"
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

      {open ? (
        <div className="bg-base border-subtlest absolute top-full left-0 z-10 mt-1.5 w-full overflow-hidden rounded-xl border shadow-[var(--shadow-raised)]">
          <div className="border-subtlest border-b p-2">
            <input
              autoFocus
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={placeholder}
              className="text-foreground placeholder:text-quieter w-full bg-transparent text-xs outline-none"
            />
          </div>
          <div className="max-h-44 overflow-y-auto py-1">
            {filtered.length === 0 ? (
              <p className="text-quieter px-2 py-2 text-center text-xs">
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
                    "flex w-full cursor-pointer items-center rounded-md px-2.5 py-1.5 text-xs transition-[background-color,color] duration-normal ease-fluid hover:bg-subtle hover:text-foreground",
                    country.code === value &&
                      "bg-super/10 text-super font-medium"
                  )}
                >
                  {country.localizedName}
                </button>
              ))
            )}
          </div>
        </div>
      ) : null}
    </div>
  )
}

function ChevronDown() {
  return (
    <svg
      className="text-quiet ml-1 size-3 shrink-0"
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
