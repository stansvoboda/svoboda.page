import type { Locale, Milestone } from "@/content"

// "2024-03" as "March 2024" / "březen 2024"; a year alone stays as it is.
function formatDate(date: string, locale: Locale) {
  const [year, monthNumber] = date.split("-").map(Number)
  if (monthNumber === undefined) {
    return date
  }
  return new Intl.DateTimeFormat(locale, {
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(Date.UTC(year, monthNumber - 1))
}

// "March 2024 – present". A Milestone within one month or year, like a
// workshop, shows it once.
export function formatMilestoneDates(
  { start, end }: Pick<Milestone, "start" | "end">,
  locale: Locale,
  ongoingLabel: string
) {
  const from = formatDate(start, locale)
  if (start === end) {
    return from
  }
  return `${from} – ${end ? formatDate(end, locale) : ongoingLabel}`
}
