import { describe, expect, it } from "vitest"

import { getContent, locales } from "@/content"

// Guards the real content in the repo: a missing translation fails CI here,
// with the same message the build would give.
describe("site content", () => {
  it.each(locales)("is complete in %s", (locale) => {
    expect(() => getContent(locale)).not.toThrow()
  })

  // The CV is public. The schema has no field for a phone number or an
  // address; this catches one written into a text instead.
  it.each(locales)("holds no phone number in %s", (locale) => {
    const text = JSON.stringify(getContent(locale))

    expect(text).not.toMatch(/\+?\d{3}[ -]?\d{3}[ -]?\d{3}/)
  })
})
