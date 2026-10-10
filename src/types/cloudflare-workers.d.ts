// The Worker's bindings and secrets (wrangler.jsonc, setup wizard), typed
// by hand for just what the site uses instead of generating all of the
// Workers runtime types with `wrangler types`.
declare module "cloudflare:workers" {
  // https://developers.cloudflare.com/email-routing/email-workers/send-email-workers/
  type EmailAddress = { name: string; email: string }
  interface SendEmail {
    send(message: {
      from: string | EmailAddress
      to: string
      subject: string
      text: string
      replyTo?: string
    }): Promise<{ messageId: string }>
  }

  export const env: {
    EMAIL: SendEmail
    // The owner's inbox, a secret so it stays out of the public repo.
    CONTACT_TO: string
    TURNSTILE_SECRET_KEY: string
  }
}
