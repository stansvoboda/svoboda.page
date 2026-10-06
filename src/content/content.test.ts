import { describe, expect, it } from "vitest"

import { ContentError, assembleContent } from "@/content"
import { validContent } from "@/test/content-fixture"

describe("assembleContent", () => {
  it("returns the content in the requested locale", () => {
    const content = assembleContent(validContent(), "cs")

    expect(content.intro.positioning).toBe("Staví věci.")
    expect(content.about.heading).toBe("O mně")
    expect(content.ui.toggleTheme).toBe("Přepnout motiv")
  })

  it("keeps values that are not localised, like the owner's name", () => {
    expect(assembleContent(validContent(), "en").intro.name).toBe("Jane Doe")
    expect(assembleContent(validContent(), "cs").intro.name).toBe("Jane Doe")
  })

  it("rejects content missing a Czech translation, naming the field", () => {
    const raw = validContent()
    // @ts-expect-error simulating an author forgetting a translation
    delete raw.about.text.cs

    expect(() => assembleContent(raw, "en")).toThrow(ContentError)
    expect(() => assembleContent(raw, "en")).toThrow(
      "about.text.cs: missing Czech (cs) text"
    )
  })

  it("rejects a missing English translation of a UI string", () => {
    const raw = validContent()
    // @ts-expect-error simulating an author forgetting a translation
    delete raw.ui.toggleTheme.en

    expect(() => assembleContent(raw, "cs")).toThrow(
      "ui.toggleTheme.en: missing English (en) text"
    )
  })

  it("rejects a translation left blank", () => {
    const raw = validContent()
    raw.intro.positioning.cs = "  "

    expect(() => assembleContent(raw, "en")).toThrow(
      "intro.positioning.cs: missing Czech (cs) text"
    )
  })

  it("rejects a misspelled locale instead of ignoring it", () => {
    const raw = validContent()
    raw.intro.contactCta = { en: "Contact me", cz: "Napište mi" } as never

    expect(() => assembleContent(raw, "en")).toThrow(
      /intro\.contactCta\.cs: missing Czech/
    )
  })
})
