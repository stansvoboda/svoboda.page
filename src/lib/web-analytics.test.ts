import { describe, expect, it } from "vitest"

import { webAnalyticsScripts } from "@/lib/web-analytics"

describe("webAnalyticsScripts", () => {
  it("loads Cloudflare's beacon with the site's token", () => {
    expect(webAnalyticsScripts("abc123")).toEqual([
      {
        src: "https://static.cloudflareinsights.com/beacon.min.js",
        type: "module",
        "data-cf-beacon": '{"token":"abc123"}',
      },
    ])
  })

  it("loads nothing without a token, as in development", () => {
    expect(webAnalyticsScripts(undefined)).toEqual([])
    expect(webAnalyticsScripts("")).toEqual([])
  })
})
