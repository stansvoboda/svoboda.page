import { env } from "cloudflare:workers"

import type { ContactServices } from "@/contact/submit"

// The address the form's emails come from. Cloudflare only sends from an
// address on the site's own domain; nobody reads this one.
const from = { name: "svoboda.page", email: "formular@svoboda.page" }

// The real outside services, on the Worker. Only the server function loads
// this file, so the secrets it reads never reach the browser.
export function cloudflareContactServices(visitorIp?: string): ContactServices {
  return {
    // https://developers.cloudflare.com/turnstile/get-started/server-side-validation/
    verify: async (token) => {
      const body = new FormData()
      body.append("secret", env.TURNSTILE_SECRET_KEY)
      body.append("response", token)
      if (visitorIp) {
        body.append("remoteip", visitorIp)
      }
      const response = await fetch(
        "https://challenges.cloudflare.com/turnstile/v0/siteverify",
        { method: "POST", body }
      )
      if (!response.ok) {
        throw new Error(`Turnstile answered ${response.status}`)
      }
      const outcome: { success: boolean } = await response.json()
      return outcome.success
    },
    // https://developers.cloudflare.com/email-routing/email-workers/send-email-workers/
    send: async ({ subject, text, replyTo }) => {
      await env.EMAIL.send({ from, to: env.CONTACT_TO, subject, text, replyTo })
    },
  }
}
