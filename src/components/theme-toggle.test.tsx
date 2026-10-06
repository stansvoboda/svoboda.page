import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { beforeEach, describe, expect, it, vi } from "vitest"

import { ThemeProvider } from "@/components/theme-provider"
import { ThemeToggle } from "@/components/theme-toggle"

function mockSystemTheme(theme: "dark" | "light") {
  vi.stubGlobal("matchMedia", (query: string) => ({
    matches: query === "(prefers-color-scheme: dark)" && theme === "dark",
    media: query,
    addEventListener: () => {},
    removeEventListener: () => {},
  }))
}

function renderPage() {
  return render(
    <ThemeProvider>
      <ThemeToggle label="Toggle theme" />
    </ThemeProvider>
  )
}

function isDark() {
  return document.documentElement.classList.contains("dark")
}

describe("dark mode", () => {
  beforeEach(() => {
    mockSystemTheme("light")
  })

  it("follows the system preference when the visitor has not chosen", () => {
    mockSystemTheme("dark")
    renderPage()

    expect(isDark()).toBe(true)
  })

  it("switches to the opposite of the system theme when toggled", async () => {
    renderPage()
    expect(isDark()).toBe(false)

    await userEvent.click(screen.getByRole("button", { name: /theme/i }))

    expect(isDark()).toBe(true)
  })

  it("remembers the choice across reloads", async () => {
    const page = renderPage()
    await userEvent.click(screen.getByRole("button", { name: /theme/i }))
    page.unmount()
    document.documentElement.className = ""

    renderPage()

    expect(isDark()).toBe(true)
  })
})
