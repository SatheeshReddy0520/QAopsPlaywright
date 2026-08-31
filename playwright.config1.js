// @ts-check
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  retries: 2,
  workers:5,
  timeout: 30 * 1000,
  expect: {
    timeout: 5 * 1000,
  },

  reporter: 'html',
  projects: [
    {
      name: 'Chrome',
      use: {
        headless: true,
        browserName: 'chromium',
        ignoreHTTPSErrors: true,     //private browser errors will rectify it 
        permissions: ['geolocation'], // it will gives the perimisiion to open the location 
        screenshot: 'on',
        video: "retain-on-failure",
        trace: 'on',
        // viewport:{width:800,height:800},  // it will decrease size of the browser
        //...devices['Galaxy S24'],  // it will supports the mobiles devices 

      }
    },
    {
      name: 'Safari',
      use: {
        headless: false,
        browserName: 'webkit',
        //browserName:'firefox',
        // browserName:'webkit',
        screenshot: 'off', //on
        trace: 'on',
        // ...devices['iPhone 11'],

      },
    },
    {
      name: 'Firefox',
      use: {
        headless: false,
        browserName: 'firefox',
        screenshot: 'on',
        trace: 'on',
      }

    },
  ]


});

