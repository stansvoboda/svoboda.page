// Prints the CV page of every locale to public/cv-<locale>.pdf, with a
// fingerprint of the page next to it (e2e/cv-fingerprint.ts), for the CV
// page's download link. Run it with `npm run cv:pdf`, which builds the site
// first, and commit the files it writes.
import { chromium } from "@playwright/test"
import { preview } from "vite"

import {
  cvFingerprint,
  cvPdfPath,
  locales,
  storeCvFingerprint,
} from "../e2e/cv-fingerprint.ts"

// Not Playwright's 4173, so a preview running for the e2e tests can stay.
const port = 4174

const server = await preview({ preview: { port, strictPort: true } })
const browser = await chromium.launch()
try {
  const page = await browser.newPage()
  for (const locale of locales) {
    await page.goto(`http://localhost:${port}/${locale}/cv`)
    // The page's load doesn't wait for the web fonts; the PDF needs them.
    await page.evaluate(() => document.fonts.ready)
    // The print stylesheet (index.css) sets the A4 page and its margins.
    await page.pdf({
      path: cvPdfPath(locale),
      preferCSSPageSize: true,
      printBackground: true,
    })
    await storeCvFingerprint(locale, await cvFingerprint(page))
    console.log(`Wrote ${cvPdfPath(locale)}`)
  }
} finally {
  await browser.close()
  await server.close()
}
