import { render, screen, within } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { describe, expect, it, vi } from "vitest"

import { CvPage } from "@/components/cv-page"
import { assembleContent } from "@/content"
import type { Locale } from "@/content"
import { validContent } from "@/test/content-fixture"

function cvPage(locale: Locale, raw = validContent()) {
  return <CvPage content={assembleContent(raw, locale)} locale={locale} />
}

function linksIn(element: HTMLElement) {
  return within(element)
    .getAllByRole("link")
    .map((a) => [a.textContent, a.getAttribute("href")])
}

describe("CV page", () => {
  it("names the owner, their role and a short summary", () => {
    render(cvPage("cs"))

    expect(
      screen.getByRole("heading", { level: 1, name: "Jane Doe" })
    ).toBeDefined()
    expect(screen.getByText("Staví věci.")).toBeDefined()
    expect(screen.getByText("Mám ráda kód.")).toBeDefined()
  })

  it("lists the contact: email, GitHub, LinkedIn and the website", () => {
    render(cvPage("en"))

    const contact = screen.getByRole("region", { name: "Contact" })
    expect(linksIn(contact)).toEqual([
      ["jane@example.com", "mailto:jane@example.com"],
      ["github.com/jane-doe", "https://github.com/jane-doe"],
      ["linkedin.com/in/jane-doe", "https://www.linkedin.com/in/jane-doe"],
      ["jane.example", "https://jane.example"],
    ])
  })

  it("shows the jobs, newest first, with dates and organisation", () => {
    render(cvPage("cs"))

    const jobs = screen.getByRole("region", { name: "Praxe" })
    expect(
      within(jobs)
        .getAllByRole("heading", { level: 3 })
        .map((h) => h.textContent)
    ).toEqual(["Na volné noze", "Pekařka"])
    const bakery = within(jobs).getByRole("listitem", { name: "Pekařka" })
    expect(within(bakery).getByText("leden 2015 – srpen 2023")).toBeDefined()
    expect(within(bakery).getByText("Corner Bakery")).toBeDefined()
    expect(within(bakery).getByText("Pekla jsem chleba.")).toBeDefined()
    const freelance = within(jobs).getByRole("listitem", {
      name: "Na volné noze",
    })
    expect(within(freelance).getByText("březen 2024 – dosud")).toBeDefined()
  })

  it("shows the education and courses", () => {
    render(cvPage("en"))

    const education = screen.getByRole("region", { name: "Education" })
    const course = within(education).getByRole("listitem", {
      name: "Frontend course",
    })
    expect(within(course).getByText("Code School")).toBeDefined()
    expect(
      within(course).getByText("September 2023 – February 2024")
    ).toBeDefined()
  })

  it("shows the Featured Projects with their technologies, linking to the Case Studies", () => {
    render(cvPage("en"))

    const projects = screen.getByRole("region", { name: "Featured projects" })
    const todo = within(projects).getByRole("listitem", { name: "Todo app" })
    expect(within(todo).getByText("Keeps tasks.")).toBeDefined()
    expect(within(todo).getByText("React, CSS")).toBeDefined()
    expect(linksIn(todo)).toEqual([
      ["Todo app", "https://jane.example/en/projects/todo-app"],
    ])
  })

  it("lists the Skills by level, leaving out an empty level", () => {
    const raw = validContent()
    raw.skills.items = raw.skills.items.filter((s) => s.level !== "learning")
    render(cvPage("cs", raw))

    const skills = screen.getByRole("region", { name: "Dovednosti" })
    expect(within(skills).getByText("React, TypeScript")).toBeDefined()
    expect(within(skills).getByText("CSS")).toBeDefined()
    expect(within(skills).queryByText("Učím se")).toBeNull()
  })

  it("lists the languages with their levels", () => {
    render(cvPage("cs"))

    const languages = screen.getByRole("region", { name: "Jazyky" })
    expect(
      within(languages)
        .getAllByRole("listitem")
        .map((li) => li.textContent)
    ).toEqual(["Čeština: Rodilá mluvčí", "Angličtina: Plynule"])
  })

  it("opens the print dialog from the print button", async () => {
    const print = vi.fn()
    vi.stubGlobal("print", print)
    render(cvPage("en"))

    await userEvent.click(screen.getByRole("button", { name: "Print" }))

    expect(print).toHaveBeenCalledOnce()
  })

  it("keeps the print button and the way back out of the printout", () => {
    render(cvPage("en"))

    const controls = screen.getByRole("button", { name: "Print" }).parentElement
    expect(controls?.className).toContain("print:hidden")
    expect(within(controls!).getByRole("link", { name: /Back/ })).toBeDefined()
  })
})
