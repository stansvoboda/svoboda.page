import { expect, test } from "@playwright/test"

test("a Project card opens its Case Study", async ({ page }) => {
  await page.goto("/en")

  const featured = page.getByRole("region", { name: "Featured projects" })
  await featured.getByRole("link", { name: "svoboda.page" }).click()

  await expect(page).toHaveURL("/en/projects/svoboda-page")
  await expect(
    page.getByRole("heading", { level: 1, name: "svoboda.page" })
  ).toBeVisible()
})

test("the language switcher changes the language and keeps the page", async ({
  page,
}) => {
  await page.goto("/en/projects/park-hriste")

  await page.getByRole("link", { name: "Čeština" }).click()

  await expect(page).toHaveURL("/cs/projects/park-hriste")
  await expect(page.locator("html")).toHaveAttribute("lang", "cs")
  await expect(page.getByRole("link", { name: "English" })).toBeVisible()
})
