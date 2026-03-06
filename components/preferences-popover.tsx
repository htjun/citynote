"use client"

import * as React from "react"
import { Popover } from "@base-ui/react/popover"
import { RiUser3Line } from "@remixicon/react"
import { useTranslations } from "next-intl"

import { usePreferences } from "@/lib/stores/preferences"
import { cn } from "@/lib/utils"
import { PreferencesControls } from "@/components/preferences-controls"

const REOPEN_AFTER_LOCALE_SWITCH_KEY = "citynote:reopen-preferences-popover"

function markPopoverForReopenAfterLocaleSwitch() {
  if (typeof window === "undefined") {
    return
  }
  window.sessionStorage.setItem(REOPEN_AFTER_LOCALE_SWITCH_KEY, "1")
}

export function PreferencesPopover() {
  const t = useTranslations("common")
  const { nationality, travelType } = usePreferences()
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

  return (
    <Popover.Root open={open} onOpenChange={setOpen}>
      <Popover.Trigger
        className={cn(
          "relative inline-flex size-9 cursor-pointer items-center justify-center rounded-lg border border-transparent text-quiet transition-[background-color,border-color,color,box-shadow] duration-normal ease-fluid hover:bg-subtle hover:text-foreground focus-visible:border-super/40 focus-visible:ring-2 focus-visible:ring-super/30 focus-visible:outline-none"
        )}
        aria-label={t("preferences.trigger")}
      >
        <RiUser3Line className="size-4" />
        {hasPreferences && (
          <span
            aria-hidden
            className="bg-super absolute top-1.5 right-1.5 size-1.5 rounded-full"
          />
        )}
      </Popover.Trigger>

      <Popover.Portal>
        <Popover.Positioner
          side="bottom"
          align="end"
          sideOffset={6}
          className="z-50 outline-none"
        >
          <Popover.Popup className="bg-base text-foreground border-subtlest w-72 origin-(--transform-origin) rounded-2xl border p-0 shadow-[var(--shadow-raised)] data-ending-style:scale-95 data-ending-style:opacity-0 data-starting-style:scale-95 data-starting-style:opacity-0 transition-[transform,opacity,scale] duration-normal ease-fluid">
            <PreferencesControls
              className="p-4"
              onBeforeLocaleChange={() => {
                markPopoverForReopenAfterLocaleSwitch()
              }}
            />
          </Popover.Popup>
        </Popover.Positioner>
      </Popover.Portal>
    </Popover.Root>
  )
}
