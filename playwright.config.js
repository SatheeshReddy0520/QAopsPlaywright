// @ts-ignore
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  timeout: 30 * 1000,
  expect: {
    timeout: 5 * 1000,
  },

  reporter: 'html',

  use: {
    headless: false,
    browserName: 'chromium',
    //browserName:'firefox',
    // browserName:'webkit',
    screenshot :'on',
    trace :'on',



    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */

  },


});

