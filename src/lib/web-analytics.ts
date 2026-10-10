// Cloudflare Web Analytics counts visits without cookies, so the site needs
// no cookie banner. The token only identifies the site in the dashboard; it
// is public, like everything in the page's HTML. type: "module" matches
// Cloudflare's snippet; a module script waits for the page, like defer.
export function webAnalyticsScripts(token: string | undefined) {
  if (!token) {
    return []
  }
  return [
    {
      src: "https://static.cloudflareinsights.com/beacon.min.js",
      type: "module",
      "data-cf-beacon": JSON.stringify({ token }),
    },
  ]
}
