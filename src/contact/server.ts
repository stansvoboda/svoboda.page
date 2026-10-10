import { createServerFn } from "@tanstack/react-start"
import { getRequestHeader } from "@tanstack/react-start/server"
import { z } from "zod"

import { submitContactMessage } from "@/contact/submit"

// Only the shape; the operation checks the content and answers with field
// errors the form can show.
const contactInput = z.object({
  name: z.string(),
  email: z.string(),
  message: z.string(),
  token: z.string(),
})

// The contact form calls this like a function. It runs on the Worker: the
// browser only gets a stub that sends the input there and waits for the
// result.
export const sendContactMessage = createServerFn({ method: "POST" })
  .validator(contactInput)
  .handler(async ({ data }) => {
    const { cloudflareContactServices } = await import("@/contact/cloudflare")
    return submitContactMessage(
      data,
      cloudflareContactServices(getRequestHeader("CF-Connecting-IP"))
    )
  })
