import { render, screen, within } from "@testing-library/react"
import { describe, expect, it } from "vitest"

import { CaseStudyPage } from "@/components/case-study-page"
import { assembleContent, findCaseStudy } from "@/content"
import type { Locale } from "@/content"
import { validContent } from "@/test/content-fixture"

function renderCaseStudy(locale: Locale, slug: string) {
  const content = assembleContent(validContent(), locale)
  const caseStudy = findCaseStudy(content, slug)
  if (!caseStudy) {
    throw new Error(`no Case Study "${slug}" in the fixture`)
  }
  return render(
    <CaseStudyPage caseStudy={caseStudy} ui={content.ui} locale={locale} />
  )
}

describe("Case Study page", () => {
  it("tells the Project's story section by section, in the visitor's language", () => {
    renderCaseStudy("cs", "todo-app")

    expect(
      screen.getByRole("heading", { level: 1, name: "Úkolníček" })
    ).toBeDefined()
    expect(screen.getByText("Drží úkoly.")).toBeDefined()
    const sections = [
      ["Kontext", "Zapomínala jsem úkoly."],
      ["Role", "Všechno, v Reactu."],
      ["Rozhodnutí", "Jen lokálně."],
      ["Výzva", "Po obnovení zmizela data; ukládám je."],
      ["Výsledek", "Používám ho denně."],
      ["AI", "AI psala testy."],
      ["Příště", "Přidat synchronizaci."],
    ]
    for (const [heading, text] of sections) {
      const section = screen.getByRole("region", { name: heading })
      expect(within(section).getByText(text)).toBeDefined()
    }
  })

  it("links only to the demo or code a Project has, never a dead link", () => {
    renderCaseStudy("en", "todo-app")

    expect(
      screen.getByRole("link", { name: "Code" }).getAttribute("href")
    ).toBe("https://github.com/example/todo-app")
    expect(screen.queryByRole("link", { name: "Demo" })).toBeNull()
  })

  it("links to the live demo when there is one", () => {
    renderCaseStudy("en", "shop")

    expect(
      screen.getByRole("link", { name: "Demo" }).getAttribute("href")
    ).toBe("https://shop.example.com")
    expect(screen.queryByRole("link", { name: "Code" })).toBeNull()
  })

  it("names the Milestone the Project belongs to and leads back to the Timeline", () => {
    renderCaseStudy("cs", "todo-app")

    expect(screen.getByText("Součást:").parentElement?.textContent).toBe(
      "Součást: Frontendový kurz · Code School"
    )
    expect(
      screen.getByRole("link", { name: "Zpět na cestu" }).getAttribute("href")
    ).toBe("/cs#timeline")
  })

  it("shows the screenshots with descriptions in the visitor's language", () => {
    renderCaseStudy("cs", "todo-app")

    const screenshots = screen.getByRole("region", { name: "Snímky" })
    expect(
      within(screenshots)
        .getByRole("img", { name: "Seznam úkolů" })
        .getAttribute("src")
    ).toBe("/projects/todo-app-list.png")
  })

  it("leaves out the screenshots section when there are none", () => {
    renderCaseStudy("en", "shop")

    expect(screen.queryByRole("region", { name: "Screenshots" })).toBeNull()
  })
})
