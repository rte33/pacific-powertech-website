import { defineConfig, devices } from '@playwright/test';

const PORT = 4321;
const BASE_PATH = '/pacific-powertech-website';
const rawBase = process.env.PLAYWRIGHT_TEST_BASE_URL || `http://localhost:${PORT}${BASE_PATH}`;
const BASE_URL = rawBase.endsWith('/') ? rawBase : `${rawBase}/`;

export default defineConfig({
  testDir: './tests',
  timeout: 45000,
  expect: {
    timeout: 10000,
  },
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: 2,
  reporter: [
    ['list'],
    ['html', { outputFolder: 'playwright-report', open: 'never' }],
    ['json', { outputFile: 'playwright-report/test-results.json' }],
  ],
  use: {
    baseURL: BASE_URL,
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'off',
  },
  projects: [
    {
      name: 'desktop-chrome',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'mobile-galaxy',
      use: { ...devices['Galaxy S9+'] }, // 360x740 mobile viewport
    },
    {
      name: 'mobile-iphone',
      use: { ...devices['iPhone 14'] }, // 390x844 mobile viewport
    },
    {
      name: 'narrow-320',
      use: {
        viewport: { width: 320, height: 600 },
      },
    },
  ],
  webServer: process.env.PLAYWRIGHT_TEST_BASE_URL
    ? undefined
    : {
        command: `npx astro preview --port ${PORT} --host 127.0.0.1`,
        url: BASE_URL,
        reuseExistingServer: !process.env.CI,
        timeout: 30000,
      },
});
