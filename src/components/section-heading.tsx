import type { ReactNode } from "react"

import { cn } from "@/lib/utils"

// The heading every section of the home page starts with: the condensed
// capitals of a timetable header. It slides in from the left as it scrolls
// into view, the content below it from the right; see `.slide-from-left` in
// index.css.
export function SectionHeading({
  id,
  className,
  children,
}: Readonly<{ id?: string; className?: string; children: ReactNode }>) {
  return (
    <h2
      id={id}
      className={cn(
        "slide-from-left font-heading text-5xl leading-[0.95] font-extrabold tracking-tight uppercase sm:text-6xl",
        className
      )}
    >
      {children}
    </h2>
  )
}
