import { expect, test } from "@playwright/test"

const sections = [
  "Featured projects",
  "About me",
  "How I work with AI",
  "My path",
  "Skills",
  "Contact",
]

test("the home page shows the owner and every section", async ({ page }) => {
  await page.goto("/en")

  await expect(
    page.getByRole("heading", { level: 1, name: "Stanislav Svoboda" })
  ).toBeVisible()
  for (const name of sections) {
    await expect(page.getByRole("heading", { level: 2, name })).toBeVisible()
  }
})

test.describe("at mobile width", () => {
  test.use({ viewport: { width: 375, height: 812 } })

  test("the home page fits the screen without scrolling sideways", async ({
    page,
  }) => {
    await page.goto("/en")

    await expect(
      page.getByRole("heading", { level: 1, name: "Stanislav Svoboda" })
    ).toBeVisible()
    await expect(
      page.getByRole("heading", { level: 2, name: "Contact" })
    ).toBeVisible()
    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth - window.innerWidth
    )
    expect(overflow).toBe(0)
  })
})
