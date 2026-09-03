const { test, expect } = require('@playwright/test');
const { POManager } = require('../PageObjects/POManager');

test('logs in to the practice page and verifies iphone X', async ({ page }) => {
  const poManager = new POManager(page);
  const loginPage = poManager.getIntoLoginPagePractise();

  await loginPage.goto();
   await loginPage.login('rahulshettyacademy','Learning@830$3mK2');

  await page.waitForURL('https://rahulshettyacademy.com/angularpractice/shop');
  await expect(page.getByRole('heading', { name: 'iphone X', exact: true })).toBeVisible();
});
