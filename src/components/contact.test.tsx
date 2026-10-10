import { render, screen, within } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest"

import { HomePage } from "@/components/home-page"
import type { ContactInput, ContactResult } from "@/contact/submit"
import { assembleContent } from "@/content"
import type { Locale } from "@/content"
import { validContent } from "@/test/content-fixture"

// Stands in for Cloudflare's Turnstile script: the widget decides at once
// that the visitor is human and hands over the token "human".
beforeEach(() => {
  window.turnstile = {
    render: (_element, options) => {
      options.callback("human")
      return "widget"
    },
    reset: () => {},
    remove: () => {},
  }
})

afterEach(() => {
  delete window.turnstile
})

function renderHome(
  locale: Locale,
  send: (input: ContactInput) => Promise<ContactResult>
) {
  render(
    <HomePage
      locale={locale}
      content={assembleContent(validContent(), locale)}
      sendContactMessage={send}
    />
  )
  return screen.getByRole("region", {
    name: locale === "cs" ? "Kontakt" : "Contact",
  })
}

describe("contact section", () => {
  it("shows the owner's email, LinkedIn and GitHub", () => {
    const contact = renderHome("en", vi.fn())

    expect(
      within(contact)
        .getByRole("link", { name: "LinkedIn" })
        .getAttribute("href")
    ).toBe("https://www.linkedin.com/in/jane-doe")
    expect(
      within(contact).getByRole("link", { name: "GitHub" }).getAttribute("href")
    ).toBe("https://github.com/jane-doe")
    expect(
      within(contact)
        .getByRole("link", { name: "jane@example.com" })
        .getAttribute("href")
    ).toBe("mailto:jane@example.com")
  })

  it("shows inline errors in the visitor's language and sends nothing", async () => {
    const send = vi.fn()
    const contact = renderHome("cs", send)
    const user = userEvent.setup()

    await user.type(within(contact).getByLabelText("Váš e-mail"), "nope")
    await user.click(within(contact).getByRole("button", { name: "Odeslat" }))

    expect(
      within(contact).getByLabelText("Vaše jméno").getAttribute("aria-invalid")
    ).toBe("true")
    expect(within(contact).getAllByText("Povinné.")).toHaveLength(2)
    expect(within(contact).getByText("Není e-mail.")).toBeDefined()
    expect(send).not.toHaveBeenCalled()
  })

  it("sends the message with the Turnstile token and confirms it", async () => {
    const send = vi.fn(async () => ({ status: "sent" }) as const)
    const contact = renderHome("en", send)
    const user = userEvent.setup()

    await user.type(within(contact).getByLabelText("Your name"), "Ann")
    await user.type(
      within(contact).getByLabelText("Your email"),
      "ann@example.com"
    )
    await user.type(within(contact).getByLabelText("Your message"), "Hello!")
    await user.click(within(contact).getByRole("button", { name: "Send" }))

    expect(send).toHaveBeenCalledExactlyOnceWith({
      name: "Ann",
      email: "ann@example.com",
      message: "Hello!",
      token: "human",
    })
    expect(within(contact).getByRole("status").textContent).toBe(
      "Sent, thanks."
    )
  })

  it("explains a failure and offers the direct contact links", async () => {
    const contact = renderHome("cs", async () => ({ status: "failed" }))
    const user = userEvent.setup()

    await user.type(within(contact).getByLabelText("Vaše jméno"), "Ann")
    await user.type(
      within(contact).getByLabelText("Váš e-mail"),
      "ann@example.com"
    )
    await user.type(within(contact).getByLabelText("Vaše zpráva"), "Ahoj!")
    await user.click(within(contact).getByRole("button", { name: "Odeslat" }))

    const alert = within(contact).getByRole("alert")
    expect(alert.textContent).toContain("Odeslání selhalo.")
    expect(alert.textContent).toContain("Najdete mě tu:")
    expect(
      within(alert)
        .getAllByRole("link")
        .map((a) => a.getAttribute("href"))
    ).toEqual([
      "mailto:jane@example.com",
      "https://www.linkedin.com/in/jane-doe",
      "https://github.com/jane-doe",
    ])
  })
})
