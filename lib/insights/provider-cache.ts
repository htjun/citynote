interface RuntimeCacheEntry<T> {
  cachedAt: number
  value: T
}

type RuntimeCacheStore = Map<string, RuntimeCacheEntry<unknown>>

const GLOBAL_RUNTIME_CACHE_KEY = "__citynote_runtime_cache__"

function getStore(): RuntimeCacheStore {
  const globalScope = globalThis as typeof globalThis & {
    [GLOBAL_RUNTIME_CACHE_KEY]?: RuntimeCacheStore
  }

  if (!globalScope[GLOBAL_RUNTIME_CACHE_KEY]) {
    globalScope[GLOBAL_RUNTIME_CACHE_KEY] = new Map()
  }

  return globalScope[GLOBAL_RUNTIME_CACHE_KEY]
}

export function readRuntimeCache<T>(
  key: string,
  maxAgeSeconds: number
): T | null {
  const entry = getStore().get(key) as RuntimeCacheEntry<T> | undefined

  if (!entry) {
    return null
  }

  const maxAgeMs = maxAgeSeconds * 1000

  if (Date.now() - entry.cachedAt > maxAgeMs) {
    getStore().delete(key)

    return null
  }

  return entry.value
}

export function writeRuntimeCache<T>(key: string, value: T): void {
  getStore().set(key, {
    cachedAt: Date.now(),
    value,
  })
}

export function clearRuntimeCache(): void {
  getStore().clear()
}
