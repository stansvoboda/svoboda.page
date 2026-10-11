import { createHash } from "node:crypto"
import { readFile, writeFile } from "node:fs/promises"
import type { Page } from "@playwright/test"

// The site's locales (src/content/schema.ts), repeated: the CV PDF script
// runs in plain Node, which can't load the app's modules.
export const locales = ["en", "cs"] as const
type Locale = (typeof locales)[number]

// The PDFs of the CV, in public/ so the CV page can link to them.
export function cvPdfPath(locale: Locale) {
  return `public/cv-${locale}.pdf`
}

// What the PDF of a locale was made from, stored next to it: a hash of the
// CV page's markup. Any change to the CV's content, or to how the page lays
// it out, changes the hash, so a PDF that no longer matches the page shows.
function fingerprintPath(locale: Locale) {
  return `public/cv-${locale}.fingerprint`
}

// The fingerprint of the CV page open in `page`.
export async function cvFingerprint(page: Page) {
  const markup = await page.locator("main").evaluate((main) => main.outerHTML)
  return createHash("sha256").update(markup).digest("hex")
}

export async function readStoredCvFingerprint(locale: Locale) {
  return (await readFile(fingerprintPath(locale), "utf8")).trim()
}

export async function storeCvFingerprint(locale: Locale, fingerprint: string) {
  await writeFile(fingerprintPath(locale), `${fingerprint}\n`)
}
