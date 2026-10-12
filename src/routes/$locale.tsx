import {
  Outlet,
  createFileRoute,
  notFound,
  rootRouteId,
  useRouterState,
} from "@tanstack/react-router"

import { LocaleNotFoundPage } from "@/components/not-found-page"
import { SiteNav } from "@/components/site-nav"
import { getContent, isLocale } from "@/content"

// Every page lives under a locale: /en/... or /cs/...
export const Route = createFileRoute("/$locale")({
  loader: ({ params }) => {
    if (!isLocale(params.locale)) {
      // Without a locale there is no layout to show; the root's 404 takes it.
      throw notFound({ routeId: rootRouteId })
    }
    return { locale: params.locale, content: getContent(params.locale) }
  },
  head: ({ loaderData }) => ({
    // Only shows on a 404 under the locale, like /en/whatever: each page
    // replaces it with its own title, description and link preview.
    meta: loaderData && [{ title: loaderData.content.meta.title }],
  }),
  component: LocaleLayout,
  // A path under a locale that matches no page, like /en/whatever, shown
  // inside the layout.
  notFoundComponent: LocaleNotFoundPage,
})

function LocaleLayout() {
  const { locale, content } = Route.useLoaderData()
  // The home page is /en or /cs: its bands run edge to edge. Every other page
  // keeps the narrow column.
  const home = useRouterState({
    select: (state) => /^\/[^/]+\/?$/.test(state.location.pathname),
  })

  return (
    <div className="flex min-h-svh flex-col print:block print:min-h-0">
      <SiteNav locale={locale} content={content} home={home} />
      {home ? (
        <Outlet />
      ) : (
        // On paper only the page itself shows, edge to edge of the print margins.
        <div className="mx-auto flex w-full max-w-3xl flex-1 flex-col gap-24 px-6 py-12 print:block print:max-w-none print:p-0">
          <Outlet />
        </div>
      )}
    </div>
  )
}
