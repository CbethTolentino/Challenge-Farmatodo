import { defineConfig, devices } from '@playwright/test';


export default defineConfig({
  testDir: './tests',
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,

  reporter: [
            ['allure-playwright',
            { outputFolder: 'allure-results' }
    ]
    ],
  
  use: {
   
    trace: 'on-first-retry',
    screenshot: 'on', 
    video: 'retain-on-failure',
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'Chrome',
      use: { ...devices['Desktop Chrome'] },
    }

  
  ],

  
});
