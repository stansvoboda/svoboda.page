import { describe, expect, it } from "vitest"

import { submitContactMessage } from "@/contact/submit"
import type { ContactEmail } from "@/contact/submit"

// Stands in for Cloudflare Turnstile: accepts only the token "human".
function fakeVerifier() {
  const tokens: string[] = []
  return {
    tokens,
    verify: async (token: string) => {
      tokens.push(token)
      return token === "human"
    },
  }
}

// Stands in for the email binding: remembers what it was asked to send.
function fakeSender() {
  const sent: ContactEmail[] = []
  return {
    sent,
    send: async (email: ContactEmail) => {
      sent.push(email)
    },
  }
}

const validInput = {
  name: "Jane Recruiter",
  email: "jane@example.com",
  message: "We'd like to invite you to an interview.",
  token: "human",
}

describe("submitting a contact message", () => {
  it("returns field errors for invalid input and neither verifies nor sends", async () => {
    const verifier = fakeVerifier()
    const sender = fakeSender()

    const result = await submitContactMessage(
      { name: "  ", email: "not-an-email", message: "", token: "human" },
      { verify: verifier.verify, send: sender.send }
    )

    expect(result).toEqual({
      status: "invalid",
      errors: { name: "required", email: "invalidEmail", message: "required" },
    })
    expect(verifier.tokens).toEqual([])
    expect(sender.sent).toEqual([])
  })

  it("rejects a message with an invalid Turnstile token as spam and sends nothing", async () => {
    const verifier = fakeVerifier()
    const sender = fakeSender()

    const result = await submitContactMessage(
      { ...validInput, token: "bot" },
      { verify: verifier.verify, send: sender.send }
    )

    expect(result).toEqual({ status: "spam" })
    expect(verifier.tokens).toEqual(["bot"])
    expect(sender.sent).toEqual([])
  })

  it("sends exactly one email with the visitor's name, email and message", async () => {
    const sender = fakeSender()

    const result = await submitContactMessage(validInput, {
      verify: fakeVerifier().verify,
      send: sender.send,
    })

    expect(result).toEqual({ status: "sent" })
    expect(sender.sent).toHaveLength(1)
    const [email] = sender.sent
    expect(email.subject).toContain("Jane Recruiter")
    expect(email.text).toContain("Jane Recruiter")
    expect(email.text).toContain("jane@example.com")
    expect(email.text).toContain("We'd like to invite you to an interview.")
    expect(email.replyTo).toBe("jane@example.com")
  })

  it("reports delivery failed when the email can't be sent", async () => {
    const result = await submitContactMessage(validInput, {
      verify: fakeVerifier().verify,
      send: async () => {
        throw new Error("email binding unavailable")
      },
    })

    expect(result).toEqual({ status: "failed" })
  })

  it("reports delivery failed and sends nothing when Turnstile can't be reached", async () => {
    const sender = fakeSender()

    const result = await submitContactMessage(validInput, {
      verify: async () => {
        throw new Error("network down")
      },
      send: sender.send,
    })

    expect(result).toEqual({ status: "failed" })
    expect(sender.sent).toEqual([])
  })
})
