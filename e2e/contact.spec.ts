import { expect, test } from "@playwright/test"

// The e2e build uses Cloudflare's Turnstile test keys, which always pass,
// and the local Worker's email binding only prints the email to the
// terminal, so nothing reaches a real inbox.
test("the contact form sends a message", async ({ page }) => {
  await page.goto("/en")

  const contact = page.getByRole("region", { name: "Contact" })
  await contact.getByLabel("Name").fill("Jane Recruiter")
  await contact.getByLabel("Email").fill("jane@example.com")
  await contact
    .getByLabel("Message")
    .fill("We'd like to invite you to an interview.")
  // The test widget hands over its token in a moment, into a hidden field.
  await expect(contact.locator('[name="cf-turnstile-response"]')).toHaveValue(
    /.+/
  )
  await contact.getByRole("button", { name: "Send message" }).click()

  await expect(contact.getByRole("status")).toHaveText(
    "Thank you, your message is on its way. I'll get back to you soon."
  )
})
