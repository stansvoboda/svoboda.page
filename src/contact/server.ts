import { createServerFn } from "@tanstack/react-start"
import { getRequestHeader } from "@tanstack/react-start/server"

import { contactInputSchema } from "@/contact/schema"
import { submitContactMessage } from "@/contact/submit"

// The contact form calls this like a function. It runs on the Worker: the
// browser only gets a stub that sends the input there and waits for the
// result.
export const sendContactMessage = createServerFn({ method: "POST" })
  .validator(contactInputSchema)
  .handler(async ({ data }) => {
    const { cloudflareContactServices } = await import("@/contact/cloudflare")
    return submitContactMessage(
      data,
      cloudflareContactServices(getRequestHeader("CF-Connecting-IP"))
    )
  })
