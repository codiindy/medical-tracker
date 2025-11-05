import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: 'tests/e2e',
  use: {
    headless: true,
    baseURL: 'http://localhost:5173'
  },
  // Playwright run server
  webServer: {
    command: 'npm run preview',
    port: 5173,
    reuseExistingServer: !process.env.CI
  }
});
