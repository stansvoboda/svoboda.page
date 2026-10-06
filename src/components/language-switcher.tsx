import { Link } from "@tanstack/react-router"

import { buttonVariants } from "@/components/ui/button"
import type { Locale } from "@/content"

const otherLocale: Record<Locale, Locale> = { en: "cs", cs: "en" }

// Links to the current page in the other language: only the locale part of
// the URL changes, so a visitor on a Case Study stays on that Case Study.
export function LanguageSwitcher({
  locale,
  label,
}: Readonly<{ locale: Locale; label: string }>) {
  const target = otherLocale[locale]

  return (
    <Link
      to="."
      params={(prev) => ({ ...prev, locale: target })}
      hrefLang={target}
      lang={target}
      className={buttonVariants({ variant: "ghost" })}
    >
      {label}
    </Link>
  )
}
