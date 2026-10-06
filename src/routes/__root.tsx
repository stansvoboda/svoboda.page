import type { ReactNode } from "react"
import {
  HeadContent,
  Outlet,
  Scripts,
  createRootRoute,
  useParams,
} from "@tanstack/react-router"

import { ThemeProvider } from "@/components/theme-provider"
import { defaultLocale, isLocale } from "@/content"
import appCss from "@/index.css?url"
import { themeScript } from "@/lib/theme-script"

// Title and description come from content, per locale, in routes/$locale.tsx.
export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
    ],
    links: [{ rel: "stylesheet", href: appCss }],
  }),
  component: RootComponent,
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
