import { createFileRoute, redirect } from "@tanstack/react-router"

import { defaultLocale } from "@/content"

// The bare domain has no content of its own; English is the default locale
// (ADR 0002). It is left out of prerendering so the Worker answers with a
// real redirect.
export const Route = createFileRoute("/")({
  beforeLoad: () => {
    throw redirect({ to: "/$locale", params: { locale: defaultLocale } })
  },
})
