import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"

import { Intro } from "@/components/intro"

describe("Intro", () => {
  it("tells a recruiter who the owner is and how to reach them", () => {
    render(<Intro />)

    expect(
      screen.getByRole("heading", { level: 1, name: "Stanislav Svoboda" })
    ).toBeDefined()
    expect(screen.getByText(/frontend developer .* AI agents/i)).toBeDefined()
    expect(
      screen.getByRole("link", { name: /contact/i }).getAttribute("href")
    ).toBe("#contact")
  })
})
