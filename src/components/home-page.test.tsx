import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"

import { HomePage } from "@/components/home-page"
import { assembleContent } from "@/content"
import { validContent } from "@/test/content-fixture"

describe("home page", () => {
  it("introduces the owner in the visitor's language", () => {
    render(<HomePage content={assembleContent(validContent(), "cs")} />)

    expect(
      screen.getByRole("heading", { level: 1, name: "Jane Doe" })
    ).toBeDefined()
    expect(screen.getByText("Staví věci.")).toBeDefined()
    expect(
      screen.getByRole("link", { name: "Napište mi" }).getAttribute("href")
    ).toBe("#contact")
  })

  it("tells the owner's story in the About section", () => {
    render(<HomePage content={assembleContent(validContent(), "en")} />)

    expect(
      screen.getByRole("heading", { level: 2, name: "About" })
    ).toBeDefined()
    expect(screen.getByText("I like code.")).toBeDefined()
  })

  it("reserves an empty slot for the future Intro Video", () => {
    const { container } = render(
      <HomePage content={assembleContent(validContent(), "en")} />
    )

    const slot = container.querySelector("[data-slot='intro-video']")
    expect(slot).not.toBeNull()
    expect(slot?.childNodes).toHaveLength(0)
  })
})
