import { describe, expect, it } from "vitest"

import { getContent, locales } from "@/content"

// Guards the real content in the repo: a missing translation fails CI here,
// with the same message the build would give.
describe("site content", () => {
  it.each(locales)("is complete in %s", (locale) => {
    expect(() => getContent(locale)).not.toThrow()
  })
})
