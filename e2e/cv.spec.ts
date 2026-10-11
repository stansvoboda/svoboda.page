import { expect, test } from "@playwright/test"

import {
  cvFingerprint,
  locales,
  readStoredCvFingerprint,
} from "./cv-fingerprint.ts"

for (const locale of locales) {
  test(`the CV PDF in ${locale} is up to date with the CV page`, async ({
    page,
  }) => {
    await page.goto(`/${locale}/cv`)

    expect(
      await cvFingerprint(page),
      "The CV changed since its PDFs were made: run npm run cv:pdf and commit the PDFs."
    ).toBe(await readStoredCvFingerprint(locale))
  })
}

test("the CV page downloads the PDF in its language", async ({ page }) => {
  await page.goto("/cs/cv")

  const download = page.waitForEvent("download")
  await page.getByRole("link", { name: "Stáhnout PDF" }).click()

  expect((await download).suggestedFilename()).toBe("cv-cs.pdf")
})
