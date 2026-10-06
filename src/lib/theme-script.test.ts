import { describe, expect, it, vi } from "vitest"

import { THEME_STORAGE_KEY, themeScript } from "@/lib/theme-script"

function mockSystemTheme(theme: "dark" | "light") {
  vi.stubGlobal("matchMedia", (query: string) => ({
    matches: query === "(prefers-color-scheme: dark)" && theme === "dark",
  }))
}

function runInHead() {
  new Function(themeScript)()
}

describe("theme script in the document head", () => {
  it("applies the system theme when the visitor has not chosen", () => {
    mockSystemTheme("dark")

    runInHead()

    expect(document.documentElement.classList.contains("dark")).toBe(true)
  })

  it("applies the stored choice over the system theme", () => {
    mockSystemTheme("dark")
    localStorage.setItem(THEME_STORAGE_KEY, "light")

    runInHead()

    expect(document.documentElement.classList.contains("dark")).toBe(false)
    expect(document.documentElement.classList.contains("light")).toBe(true)
  })
})
