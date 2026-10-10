import { useParams } from "@tanstack/react-router"

import { buttonVariants } from "@/components/ui/button"
import { defaultLocale, getContent, isLocale } from "@/content"
import type { Content, Locale } from "@/content"

export function NotFoundPage({
  notFound,
  locale,
}: Readonly<{ notFound: Content["ui"]["notFound"]; locale: Locale }>) {
  return (
    <main className="flex flex-col items-start gap-6">
      <h1 className="font-heading text-4xl font-semibold tracking-tight">
        {notFound.title}
      </h1>
      <p className="max-w-prose text-muted-foreground">{notFound.text}</p>
      <a href={`/${locale}`} className={buttonVariants()}>
        {notFound.backHome}
      </a>
    </main>
  )
}

// The 404 in the language of the URL. It reads the locale from the URL, not
// from loader data, which is missing when a loader is what found nothing.
export function LocaleNotFoundPage() {
  const { locale: param } = useParams({ strict: false })
  const locale = param && isLocale(param) ? param : defaultLocale

  return (
    <NotFoundPage notFound={getContent(locale).ui.notFound} locale={locale} />
  )
}
