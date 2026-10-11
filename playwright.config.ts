import { defineConfig, devices } from "@playwright/test"

const port = 4173

// End-to-end tests in a real headless Chromium, against the built site in
// a local Worker. Only GitHub Actions runs them (ci.yml), not the Cloudflare
// build.
export default defineConfig({
  testDir: "e2e",
  // A test that passed only on a retry still shows up as flaky.
  retries: process.env.CI ? 1 : 0,
  forbidOnly: !!process.env.CI,
  reporter: process.env.CI ? [["github"], ["list"]] : "list",
  use: {
    baseURL: `http://localhost:${port}`,
    trace: "retain-on-failure",
  },
  projects: [{ name: "chromium", use: devices["Desktop Chrome"] }],
  webServer: {
    // The e2e build: Turnstile's test keys and no Web Analytics
    // (.env.e2e, .dev.vars.example).
    command: `npm run build:e2e && npx vite preview --port ${port} --strictPort`,
    url: `http://localhost:${port}/en`,
    // Locally, a preview that is already running is reused, so a test run
    // takes seconds; it has to be the e2e build.
    reuseExistingServer: !process.env.CI,
    timeout: 180_000,
  },
})
