const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../PageObjects/LoginPage');

test('make HTTP GET request', async ({ request, page }) => {
  const loginPage = new LoginPage(page);

  const response = await request.get(
    'https://jsonplaceholder.typicode.com/posts/1'
  );

  expect(response.ok()).toBeTruthy();
  expect(response.status()).toBe(200);

  const body = await response.json();
  expect(body.id).toBe(1);

  await loginPage.Goto();
  await loginPage.ValidLogin("satheeshreddy0520@gmail.com", "@Reddys143");
  await page.waitForTimeout(5000); // Wait for 5 seconds to observe the login action
}); 