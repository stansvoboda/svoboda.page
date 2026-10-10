import {
  Outlet,
  createFileRoute,
  notFound,
  rootRouteId,
} from "@tanstack/react-router"

import { LanguageSwitcher } from "@/components/language-switcher"
import { LocaleNotFoundPage } from "@/components/not-found-page"
import { ThemeToggle } from "@/components/theme-toggle"
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

  return (
    <div className="mx-auto flex min-h-svh max-w-3xl flex-col gap-24 px-6 py-8">
      <header className="flex justify-end gap-2">
        <LanguageSwitcher locale={locale} label={content.ui.switchLanguage} />
        <ThemeToggle label={content.ui.toggleTheme} />
      </header>
      <Outlet />
    </div>
  )
}
