import { render, screen, within } from "@testing-library/react"
import { describe, expect, it, vi } from "vitest"

import { HomePage } from "@/components/home-page"
import { assembleContent } from "@/content"
import { validContent } from "@/test/content-fixture"

// These tests don't send the contact form.
const neverSent = vi.fn()

describe("home page", () => {
  it("introduces the owner in the visitor's language", () => {
    render(
      <HomePage
        locale="cs"
        content={assembleContent(validContent(), "cs")}
        sendContactMessage={neverSent}
      />
    )

    expect(
      screen.getByRole("heading", { level: 1, name: "Jane Doe" })
    ).toBeDefined()
    expect(screen.getByText("Staví věci.")).toBeDefined()
    expect(
      screen.getByRole("link", { name: "Napište mi" }).getAttribute("href")
    ).toBe("#contact")
  })

  it("tells the owner's story in the About section", () => {
    render(
      <HomePage
        locale="en"
        content={assembleContent(validContent(), "en")}
        sendContactMessage={neverSent}
      />
    )

    expect(
      screen.getByRole("heading", { level: 2, name: "About" })
    ).toBeDefined()
    expect(screen.getByText("I like code.")).toBeDefined()
  })

  it("reserves an empty slot for the future Intro Video", () => {
    const { container } = render(
      <HomePage
        locale="en"
        content={assembleContent(validContent(), "en")}
        sendContactMessage={neverSent}
      />
    )

    const slot = container.querySelector("[data-slot='intro-video']")
    expect(slot).not.toBeNull()
    expect(slot?.childNodes).toHaveLength(0)
  })

  it("shows the Timeline, Milestones oldest first, in the visitor's language", () => {
    render(
      <HomePage
        locale="cs"
        content={assembleContent(validContent(), "cs")}
        sendContactMessage={neverSent}
      />
    )

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
    render(
      <HomePage
        locale="en"
        content={assembleContent(validContent(), "en")}
        sendContactMessage={neverSent}
      />
    )

    const timeline = screen.getByRole("region", { name: "My path" })
    const bakery = within(timeline).getByRole("listitem", { name: "Baker" })
    expect(within(bakery).getByText("January 2015 – August 2023")).toBeDefined()
    expect(within(bakery).getByText("Baked bread.")).toBeDefined()
    expect(within(bakery).queryByRole("list")).toBeNull()
  })

  it("shows Skills grouped by level in the visitor's language", () => {
    render(
      <HomePage
        locale="cs"
        content={assembleContent(validContent(), "cs")}
        sendContactMessage={neverSent}
      />
    )

    const skills = screen.getByRole("region", { name: "Dovednosti" })
    expect(
      within(skills)
        .getAllByRole("heading", { level: 3 })
        .map((h) => h.textContent)
    ).toEqual(["Používám denně", "Mám zkušenost", "Učím se"])
  })

  it("shows how many and which Projects use each Skill, linking to them", () => {
    render(
      <HomePage
        locale="cs"
        content={assembleContent(validContent(), "cs")}
        sendContactMessage={neverSent}
      />
    )

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
    render(
      <HomePage
        locale="en"
        content={assembleContent(validContent(), "en")}
        sendContactMessage={neverSent}
      />
    )

    const skills = screen.getByRole("region", { name: "Skills" })
    const rust = within(skills).getByRole("listitem", { name: "Rust" })
    expect(within(rust).getByText("No Project yet")).toBeDefined()
    expect(within(rust).queryByRole("link")).toBeNull()
  })

  it("shows each Project as a card linking to its Case Study", () => {
    const { container } = render(
      <HomePage
        locale="cs"
        content={assembleContent(validContent(), "cs")}
        sendContactMessage={neverSent}
      />
    )

    const card = screen.getByRole("article", { name: "Úkolníček" })
    expect(within(card).getByText("Drží úkoly.")).toBeDefined()
    expect(
      within(card)
        .getAllByRole("listitem")
        .map((li) => li.textContent)
    ).toEqual(["React", "CSS"])
    expect(
      within(card).getByRole("link", { name: "Úkolníček" }).getAttribute("href")
    ).toBe("/cs/projects/todo-app")
    const thumbnail = container.querySelector(
      "img[src='/projects/todo-app.svg']"
    )
    expect(card.contains(thumbnail)).toBe(true)
  })
})
