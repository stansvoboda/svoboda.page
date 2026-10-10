import type { ReactNode } from "react"
import {
  HeadContent,
  Outlet,
  Scripts,
  createRootRoute,
  useParams,
} from "@tanstack/react-router"

import { NotFoundPage } from "@/components/not-found-page"
import { ThemeProvider } from "@/components/theme-provider"
import { defaultLocale, getContent, isLocale } from "@/content"
import appCss from "@/index.css?url"
import { themeScript } from "@/lib/theme-script"
import { webAnalyticsScripts } from "@/lib/web-analytics"

// Each page sets its own title, description and link preview (lib/page-head).
// The deepest route's title wins, so the one here only shows on a page
// outside any locale, like the 404 for /xx.
export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: getContent(defaultLocale).meta.title },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", href: "/favicon.svg", type: "image/svg+xml" },
    ],
    scripts: webAnalyticsScripts(import.meta.env.VITE_CF_WEB_ANALYTICS_TOKEN),
  }),
  component: RootComponent,
  // A URL outside any locale, like /xx: the 404 in the default locale.
  notFoundComponent: RootNotFound,
})

function RootComponent() {
  return (
    <RootDocument>
      <ThemeProvider>
        <Outlet />
      </ThemeProvider>
    </RootDocument>
  )
}

function RootNotFound() {
  return (
    <div className="mx-auto flex min-h-svh max-w-3xl flex-col px-6 py-8">
      <NotFoundPage
        notFound={getContent(defaultLocale).ui.notFound}
        locale={defaultLocale}
      />
    </div>
  )
}

function RootDocument({ children }: Readonly<{ children: ReactNode }>) {
  const { locale } = useParams({ strict: false })

  return (
    // The theme script adds a class to <html> before React hydrates, so the
    // class differs from the prerendered HTML on purpose.
    <html
      lang={locale && isLocale(locale) ? locale : defaultLocale}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  )
}
