import { act, render, screen } from "@testing-library/react"
import {
  Outlet,
  RouterProvider,
  createMemoryHistory,
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router"
import { describe, expect, it } from "vitest"

import { LanguageSwitcher } from "@/components/language-switcher"
import { isLocale } from "@/content"

// A small stand-in for the site's routes: a locale layout holding the
// switcher, with a home page and a deeper page below it.
function renderAt(path: string) {
  const rootRoute = createRootRoute({ component: Outlet })
  const localeRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: "$locale",
    component: function Layout() {
      const { locale } = localeRoute.useParams()
      return (
        <>
          {isLocale(locale) && (
            <LanguageSwitcher
              locale={locale}
              label={locale === "en" ? "Čeština" : "English"}
            />
          )}
          <Outlet />
        </>
      )
    },
  })
  const homeRoute = createRoute({
    getParentRoute: () => localeRoute,
    path: "/",
  })
  const projectRoute = createRoute({
    getParentRoute: () => localeRoute,
    path: "projects/$slug",
  })
  const router = createRouter({
    routeTree: rootRoute.addChildren([
      localeRoute.addChildren([homeRoute, projectRoute]),
    ]),
    history: createMemoryHistory({ initialEntries: [path] }),
  })
  render(<RouterProvider router={router} />)
}

describe("language switcher", () => {
  it("links from the English home page to the Czech one", async () => {
    await act(async () => renderAt("/en"))

    const link = await screen.findByRole("link", { name: "Čeština" })
    expect(link.getAttribute("href")).toBe("/cs")
    expect(link.getAttribute("hreflang")).toBe("cs")
  })

  it("links from the Czech home page to the English one", async () => {
    await act(async () => renderAt("/cs"))

    const link = await screen.findByRole("link", { name: "English" })
    expect(link.getAttribute("href")).toBe("/en")
  })

  it("keeps the visitor on the equivalent page", async () => {
    await act(async () => renderAt("/cs/projects/foo"))

    const link = await screen.findByRole("link", { name: "English" })
    expect(link.getAttribute("href")).toBe("/en/projects/foo")
  })
})
