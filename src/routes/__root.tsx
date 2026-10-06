import type { ReactNode } from "react"
import {
  HeadContent,
  Outlet,
  Scripts,
  createRootRoute,
} from "@tanstack/react-router"

import { ThemeProvider } from "@/components/theme-provider"
import appCss from "@/index.css?url"
import { themeScript } from "@/lib/theme-script"

// English-only metadata for the walking skeleton; the /en and /cs routes from
// ADR 0002 replace it when the site becomes bilingual.
export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Stanislav Svoboda · Frontend developer" },
      {
        name: "description",
        content:
          "Frontend developer (React, TypeScript) who works effectively with AI agents.",
      },
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
  return (
    // The theme script adds a class to <html> before React hydrates, so the
    // class differs from the prerendered HTML on purpose.
    <html lang="en" suppressHydrationWarning>
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
