import { parseCurrentsPayload } from "@/lib/insights/providers/currents"

describe("currents parser", () => {
  it("parses and deduplicates headlines", () => {
    const parsed = parseCurrentsPayload(
      {
        status: "ok",
        news: [
          {
            id: "1",
            title: "Headline A",
            url: "https://example.com/a",
            author: "Source A",
            published: "2026-03-03T10:00:00.000Z",
            language: "en",
          },
          {
            id: "1b",
            title: "Headline A",
            url: "https://example.com/a",
            author: "Source A",
            published: "2026-03-03T10:00:00.000Z",
            language: "en",
          },
          {
            id: "2",
            title: "Headline B",
            url: "https://example.com/b",
            author: "Source B",
            published: "2026-03-03T09:30:00.000Z",
            language: "en",
          },
        ],
      },
      5
    )

    expect(parsed?.length).toBe(2)
    expect(parsed?.[0].title).toBe("Headline A")
    expect(parsed?.[1].title).toBe("Headline B")
  })

  it("returns null for malformed payload", () => {
    expect(parseCurrentsPayload({ news: "invalid" }, 5)).toBeNull()
  })
})
