import { useEffect, useRef, useState } from "react"

import { LanguageSwitcher } from "@/components/language-switcher"
import { ThemeToggle } from "@/components/theme-toggle"
import type { Content, Locale } from "@/content"
import { cn, shellClass } from "@/lib/utils"

// The stops of the home page, in order. A stop without a section on the page
// (no Featured Projects) is left out.
function stationsOf(content: Content) {
  return [
    { id: "projects", label: content.featuredProjects.heading },
    { id: "about", label: content.about.heading },
    { id: "ai", label: content.aiWorkflow.heading },
    { id: "timeline", label: content.timeline.heading },
    { id: "skills", label: content.skills.heading },
    { id: "contact", label: content.contact.heading },
  ]
}

// The strip across the top, like the information display in a carriage: on
// the home page it lists the stops and lights the one the visitor is at; on
// every page it holds the language and theme switches. A thin bar along its
// foot grows with the scroll.
export function SiteNav({
  locale,
  content,
  home,
}: Readonly<{ locale: Locale; content: Content; home: boolean }>) {
  const stations = home ? stationsOf(content) : []
  const [current, setCurrent] = useState<string>()
  const navRef = useRef<HTMLElement>(null)

  useEffect(() => {
    if (!home) {
      return
    }
    const sections = stationsOf(content)
      .map(({ id }) => document.getElementById(id))
      .filter((section) => section !== null)
    // A band counts as current while it crosses the middle of the screen.
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setCurrent(entry.target.id)
          }
        }
      },
      { rootMargin: "-45% 0px -50% 0px" }
    )
    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [home, content])

  // On a phone only a stop or two fit, so the strip slides to keep the lit
  // one in the middle. Only the strip moves, never the page.
  useEffect(() => {
    const nav = navRef.current
    const link = nav?.querySelector<HTMLElement>("[aria-current]")
    if (!nav || !link) {
      return
    }
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    const navBox = nav.getBoundingClientRect()
    const linkBox = link.getBoundingClientRect()
    nav.scrollTo({
      left:
        nav.scrollLeft +
        linkBox.left -
        navBox.left -
        (navBox.width - linkBox.width) / 2,
      behavior: reduce ? "auto" : "smooth",
    })
  }, [current])

  return (
    <header className="band-ink sticky top-0 z-50 print:hidden">
      <div className={cn(shellClass, "flex h-12 items-center gap-3")}>
        <a
          href={`/${locale}`}
          className={cn(
            "font-heading text-lg font-extrabold tracking-wide whitespace-nowrap uppercase",
            home && "hidden lg:block"
          )}
        >
          {content.intro.name}
        </a>
        {home && (
          <nav
            ref={navRef}
            // The edges fade out, so a clipped stop reads as "more this way",
            // not as a typo.
            className="min-w-0 flex-1 [scrollbar-width:none] overflow-x-auto mask-x-from-90% lg:ml-6 lg:mask-none"
          >
            <ul className="flex w-max gap-1">
              {stations.map(({ id, label }) => (
                <li key={id}>
                  <a
                    href={`#${id}`}
                    aria-current={current === id ? "location" : undefined}
                    className={cn(
                      "block px-3 py-1 font-heading text-base font-semibold tracking-wider whitespace-nowrap uppercase transition-colors",
                      current === id
                        ? "bg-signal text-on-signal"
                        : "hover:bg-foreground/15"
                    )}
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        )}
        <div className="ml-auto flex items-center gap-1">
          <LanguageSwitcher locale={locale} label={content.ui.switchLanguage} />
          <ThemeToggle label={content.ui.toggleTheme} />
        </div>
      </div>
      <div
        aria-hidden
        className="nav-progress absolute bottom-0 left-0 h-[3px] w-full bg-signal"
      />
    </header>
  )
}
