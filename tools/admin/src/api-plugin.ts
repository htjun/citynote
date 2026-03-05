import path from "node:path"
import type { IncomingMessage, ServerResponse } from "node:http"
import { loadEnv } from "vite"
import type { Plugin } from "vite"

function json(res: ServerResponse, data: unknown, status = 200) {
  res.writeHead(status, { "Content-Type": "application/json" })
  res.end(JSON.stringify(data))
}

function parseBody(req: IncomingMessage): Promise<Record<string, unknown>> {
  return new Promise((resolve, reject) => {
    const chunks: Buffer[] = []
    req.on("data", (chunk: Buffer) => chunks.push(chunk))
    req.on("end", () => {
      const raw = Buffer.concat(chunks).toString()
      try {
        resolve(raw ? JSON.parse(raw) : {})
      } catch {
        reject(new Error("Invalid JSON body"))
      }
    })
    req.on("error", reject)
  })
}

export function adminApiPlugin(): Plugin {
  return {
    name: "citynote-admin-api",

    configureServer(server) {
      const projectRoot = path.resolve(server.config.root, "../..")
      const env = loadEnv(server.config.mode, projectRoot, "")
      for (const [key, value] of Object.entries(env)) {
        if (process.env[key] === undefined) {
          process.env[key] = value
        }
      }

      server.middlewares.use(async (req, res, next) => {
        const { url } = req
        if (!url?.startsWith("/api/")) {
          return next()
        }

        const path = url.split("?")[0]
        const method = req.method?.toUpperCase()

        try {
          if (method === "GET" && path === "/api/status") {
            const mod = await server.ssrLoadModule("@/lib/research/client")
            json(res, {
              apiConfigured: mod.isApiKeyConfigured(),
            })
            return
          }

          if (method === "GET" && path === "/api/cities") {
            const mod = await server.ssrLoadModule("@/data/cities/index")
            const cities = mod.getCityList("en")
            json(res, { cities })
            return
          }

          const cityMatch = path.match(/^\/api\/cities\/([a-z-]+)$/)
          if (method === "GET" && cityMatch) {
            const slug = cityMatch[1]
            const mod = await server.ssrLoadModule("@/data/cities/index")
            const city = mod.getCity("en", slug)
            if (!city) {
              return json(res, { error: "City not found" }, 404)
            }
            json(res, { city })
            return
          }

          const validateMatch = path.match(
            /^\/api\/cities\/([a-z-]+)\/validate$/
          )
          if (method === "POST" && validateMatch) {
            const slug = validateMatch[1]
            const body = await parseBody(req)
            const section = body.section as string | undefined

            if (!section) {
              return json(
                res,
                { error: 'Missing "section" in request body' },
                400
              )
            }

            const citiesMod = await server.ssrLoadModule("@/data/cities/index")
            const city = citiesMod.getCity("en", slug)
            if (!city) {
              return json(res, { error: "City not found" }, 404)
            }

            const validateMod = await server.ssrLoadModule(
              "@/lib/research/validate-section"
            )

            if (!validateMod.isValidatableSection(section)) {
              return json(res, { error: `Invalid section: ${section}` }, 400)
            }

            const sectionData = city[section as keyof typeof city]
            const result = await validateMod.validateCitySection({
              cityName: city.name,
              country: city.country,
              section,
              sectionLabel:
                validateMod.SECTION_LABELS[
                  section as keyof typeof validateMod.SECTION_LABELS
                ],
              currentData: sectionData,
            })

            result.citySlug = slug
            json(res, { result })
            return
          }

          const newsMatch = path.match(
            /^\/api\/cities\/([a-z-]+)\/search-news$/
          )
          if (method === "POST" && newsMatch) {
            const slug = newsMatch[1]
            const body = await parseBody(req)

            const citiesMod = await server.ssrLoadModule("@/data/cities/index")
            const city = citiesMod.getCity("en", slug)
            if (!city) {
              return json(res, { error: "City not found" }, 404)
            }

            const newsMod = await server.ssrLoadModule(
              "@/lib/research/search-news"
            )
            const result = await newsMod.searchCityNews(
              city.name,
              city.country,
              { maxResults: (body.maxResults as number) ?? 5 }
            )

            json(res, result)
            return
          }

          json(res, { error: "Not found" }, 404)
        } catch (error) {
          console.error("[admin-api]", error)
          const message =
            error instanceof Error ? error.message : "Internal server error"
          json(res, { error: message }, 500)
        }
      })
    },
  }
}
