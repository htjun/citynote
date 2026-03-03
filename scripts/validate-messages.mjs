import { readFileSync } from "node:fs"
import path from "node:path"

const locales = ["en", "ko"]
const defaultLocale = "en"
const namespaces = ["common", "home", "city"]

function flattenKeys(value, prefix = "") {
  if (Array.isArray(value) || value === null || typeof value !== "object") {
    return prefix ? [prefix] : []
  }

  const entries = Object.entries(value)

  return entries.flatMap(([key, nested]) => {
    const nextPrefix = prefix ? `${prefix}.${key}` : key

    if (
      nested !== null &&
      typeof nested === "object" &&
      !Array.isArray(nested)
    ) {
      return flattenKeys(nested, nextPrefix)
    }

    return [nextPrefix]
  })
}

function readNamespace(locale, namespace) {
  const filePath = path.join(
    process.cwd(),
    "messages",
    locale,
    `${namespace}.json`
  )

  return JSON.parse(readFileSync(filePath, "utf8"))
}

let hasError = false

for (const namespace of namespaces) {
  const base = readNamespace(defaultLocale, namespace)
  const baseKeys = new Set(flattenKeys(base))

  for (const locale of locales) {
    if (locale === defaultLocale) {
      continue
    }

    const target = readNamespace(locale, namespace)
    const targetKeys = new Set(flattenKeys(target))

    const missing = [...baseKeys].filter((key) => !targetKeys.has(key))
    const extra = [...targetKeys].filter((key) => !baseKeys.has(key))

    if (missing.length > 0 || extra.length > 0) {
      hasError = true
      console.error(`\n[${locale}] ${namespace} key mismatch:`)

      if (missing.length > 0) {
        console.error("  Missing keys:")
        for (const key of missing) {
          console.error(`    - ${key}`)
        }
      }

      if (extra.length > 0) {
        console.error("  Extra keys:")
        for (const key of extra) {
          console.error(`    - ${key}`)
        }
      }
    }
  }
}

if (hasError) {
  process.exit(1)
}

console.log("Message dictionaries are in sync.")
