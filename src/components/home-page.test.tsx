import { render, screen, within } from "@testing-library/react"
import { describe, expect, it, vi } from "vitest"

import { HomePage } from "@/components/home-page"
import { assembleContent } from "@/content"
import type { Locale } from "@/content"
import { validContent } from "@/test/content-fixture"

// The home page with the test content. These tests don't send the contact
// form; contact.test.tsx does.
function homePage(locale: Locale) {
  return (
    <HomePage
      locale={locale}
      content={assembleContent(validContent(), locale)}
      sendContactMessage={vi.fn()}
    />
  )
}

describe("home page", () => {
  it("introduces the owner in the visitor's language", () => {
    render(homePage("cs"))

    expect(
      screen.getByRole("heading", { level: 1, name: "Jane Doe" })
    ).toBeDefined()
    expect(screen.getByText("Staví věci.")).toBeDefined()
    expect(
      screen.getByRole("link", { name: "Napište mi" }).getAttribute("href")
    ).toBe("#contact")
  })

  it.each(["cs", "en"] as const)(
    "shows the Featured Projects right after the Intro (%s)",
    (locale) => {
      render(homePage(locale))

      const heading = locale === "cs" ? "Vybrané projekty" : "Featured projects"
      const strip = screen.getByRole("region", { name: heading })
      const intro = screen.getByRole("heading", { level: 1 }).closest("section")
      expect(intro?.nextElementSibling).toBe(strip)
    }
  )

  it("shows exactly the Featured Projects as cards, in content order", () => {
    const raw = validContent()
    raw.timeline.projects.reverse()
    raw.timeline.projects[0].featured = true
    raw.timeline.projects.push({
      ...raw.timeline.projects[1],
      slug: "blog",
      name: { en: "Blog", cs: "Blog" },
      featured: false,
    })
    render(
      <HomePage
        locale="en"
        content={assembleContent(raw, "en")}
        sendContactMessage={vi.fn()}
      />
    )

    const strip = screen.getByRole("region", { name: "Featured projects" })
    expect(within(strip).getAllByRole("article")).toHaveLength(2)
    expect(
      within(strip)
        .getAllByRole("heading", { level: 3 })
        .map((h) => h.textContent)
    ).toEqual(["Shop", "Todo app"])
    expect(
      within(strip)
        .getAllByRole("link")
        .map((a) => [a.textContent, a.getAttribute("href")])
    ).toEqual([
      ["Shop", "/en/projects/shop"],
      ["Todo app", "/en/projects/todo-app"],
    ])
  })

  it("lays the Featured Projects out in a row on wide screens, stacked on narrow ones", () => {
    render(homePage("en"))

    const strip = screen.getByRole("region", { name: "Featured projects" })
    // Tailwind's classes, since jsdom has no layout to measure.
    const [list] = within(strip).getAllByRole("list")
    expect(list.className).toContain("grid")
    expect(list.className).toContain("sm:grid-cols-3")
  })

  it("leaves the Featured Projects out when no Project is featured", () => {
    const raw = validContent()
    raw.timeline.projects[0].featured = false
    render(
      <HomePage
        locale="en"
        content={assembleContent(raw, "en")}
        sendContactMessage={vi.fn()}
      />
    )

    expect(
      screen.queryByRole("region", { name: "Featured projects" })
    ).toBeNull()
  })

  it("tells the owner's story in the About section", () => {
    render(homePage("en"))

    expect(
      screen.getByRole("heading", { level: 2, name: "About" })
    ).toBeDefined()
    expect(screen.getByText("I like code.")).toBeDefined()
  })

  it("reserves an empty slot for the future Intro Video", () => {
    const { container } = render(homePage("en"))

    const slot = container.querySelector("[data-slot='intro-video']")
    expect(slot).not.toBeNull()
    expect(slot?.childNodes).toHaveLength(0)
  })

  it("shows the Timeline, Milestones oldest first, in the visitor's language", () => {
    render(homePage("cs"))

    const timeline = screen.getByRole("region", { name: "Moje cesta" })
    const milestones = within(timeline).getAllByRole("heading", { level: 3 })
    expect(milestones.map((h) => h.textContent)).toEqual([
      "Pekařka",
      "Frontendový kurz",
      "Na volné noze",
    ])
    expect(within(timeline).getByText("Code School")).toBeDefined()
    expect(within(timeline).getByText("září 2023 – únor 2024")).toBeDefined()
    expect(within(timeline).getByText("březen 2024 – dosud")).toBeDefined()
  })

  it("renders a Milestone with no Projects without an empty Project list", () => {
    render(homePage("en"))

    const timeline = screen.getByRole("region", { name: "My path" })
    const bakery = within(timeline).getByRole("listitem", { name: "Baker" })
    expect(within(bakery).getByText("January 2015 – August 2023")).toBeDefined()
    expect(within(bakery).getByText("Baked bread.")).toBeDefined()
    expect(within(bakery).queryByRole("list")).toBeNull()
  })

  it("shows a Milestone dated by years only as plain years", () => {
    const raw = validContent()
    raw.timeline.milestones[2].start = "2015"
    raw.timeline.milestones[2].end = "2023"
    render(
      <HomePage
        locale="cs"
        content={assembleContent(raw, "cs")}
        sendContactMessage={vi.fn()}
      />
    )

    const timeline = screen.getByRole("region", { name: "Moje cesta" })
    const bakery = within(timeline).getByRole("listitem", { name: "Pekařka" })
    expect(within(bakery).getByText("2015 – 2023")).toBeDefined()
  })

  it("shows a Milestone that started and ended in the same month once", () => {
    const raw = validContent()
    raw.timeline.milestones[0].start = "2024-02"
    render(
      <HomePage
        locale="en"
        content={assembleContent(raw, "en")}
        sendContactMessage={vi.fn()}
      />
    )

    const timeline = screen.getByRole("region", { name: "My path" })
    const course = within(timeline).getByRole("listitem", {
      name: "Frontend course",
    })
    expect(within(course).getByText("February 2024")).toBeDefined()
  })

  it("shows Skills grouped by level in the visitor's language", () => {
    render(homePage("cs"))

    const skills = screen.getByRole("region", { name: "Dovednosti" })
    expect(
      within(skills)
        .getAllByRole("heading", { level: 3 })
        .map((h) => h.textContent)
    ).toEqual(["Používám denně", "Mám zkušenost", "Učím se"])
  })

  it("shows how many and which Projects use each Skill, linking to them", () => {
    render(homePage("cs"))

    const skills = screen.getByRole("region", { name: "Dovednosti" })
    const react = within(skills).getByRole("listitem", { name: "React" })
    expect(within(react).getByText("Projekty: 2")).toBeDefined()
    expect(
      within(react)
        .getAllByRole("link")
        .map((a) => [a.textContent, a.getAttribute("href")])
    ).toEqual([
      ["Úkolníček", "/cs/projects/todo-app"],
      ["Obchod", "/cs/projects/shop"],
    ])
  })

  it("still shows a Skill no Project uses yet", () => {
    render(homePage("en"))

    const skills = screen.getByRole("region", { name: "Skills" })
    const rust = within(skills).getByRole("listitem", { name: "Rust" })
    expect(within(rust).getByText("No Project yet")).toBeDefined()
    expect(within(rust).queryByRole("link")).toBeNull()
  })

  it("shows each Project as a card linking to its Case Study", () => {
    render(homePage("cs"))

    const timeline = screen.getByRole("region", { name: "Moje cesta" })
    const card = within(timeline).getByRole("article", { name: "Úkolníček" })
    expect(within(card).getByText("Drží úkoly.")).toBeDefined()
    expect(
      within(card)
        .getAllByRole("listitem")
        .map((li) => li.textContent)
    ).toEqual(["React", "CSS"])
    expect(
      within(card).getByRole("link", { name: "Úkolníček" }).getAttribute("href")
    ).toBe("/cs/projects/todo-app")
    expect(card.querySelector("img")?.getAttribute("src")).toBe(
      "/projects/todo-app.svg"
    )
  })
})
