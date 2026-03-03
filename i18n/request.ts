import { hasLocale } from "next-intl"
import { getRequestConfig } from "next-intl/server"

import { routing } from "@/i18n/routing"

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale
  const locale = hasLocale(routing.locales, requested)
    ? requested
    : routing.defaultLocale

  const [common, home, city] = await Promise.all([
    import(`../messages/${locale}/common.json`).then(
      (module) => module.default
    ),
    import(`../messages/${locale}/home.json`).then((module) => module.default),
    import(`../messages/${locale}/city.json`).then((module) => module.default),
  ])

  return {
    locale,
    messages: {
      common,
      home,
      city,
    },
  }
})
