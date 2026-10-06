import { Outlet, createFileRoute, notFound } from "@tanstack/react-router"

import { LanguageSwitcher } from "@/components/language-switcher"
import { ThemeToggle } from "@/components/theme-toggle"
import { getContent, isLocale } from "@/content"

// Every page lives under a locale: /en/... or /cs/...
export const Route = createFileRoute("/$locale")({
  loader: ({ params }) => {
    if (!isLocale(params.locale)) {
      throw notFound()
    }
    return { locale: params.locale, content: getContent(params.locale) }
  },
  head: ({ loaderData }) => ({
    meta: loaderData && [
      { title: loaderData.content.meta.title },
      // The positioning line already says who the owner is in one sentence.
      { name: "description", content: loaderData.content.intro.positioning },
    ],
  }),
  component: LocaleLayout,
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
