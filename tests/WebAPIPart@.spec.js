const { test, expect, request } = require('@playwright/test');
const { APiUtils } = require('../utils/APIUtils');

const loginPayLoad = {
  userEmail: 'anshika@gmail.com',
  userPassword: 'Iamking@000'
};

const orderPayLoad = {
  orders: [
    {
      country: 'Cuba',
      productOrderedId: '67a8dde5c0d3e6622a297cc8'
    }
  ]
};

let response;

test.beforeAll(async () => {
  const apiContext = await request.newContext();
  const apiUtils = new APiUtils(apiContext, loginPayLoad);

  response = await apiUtils.createOrder(orderPayLoad);

  expect(response.token).toBeTruthy();
  expect(response.orderId).toBeTruthy();

  await apiContext.dispose();
});

test('@API Place the order', async ({ page }) => {
  await page.addInitScript((token) => {
    window.localStorage.setItem('token', token);
  }, response.token);

  await page.goto('https://rahulshettyacademy.com/client');

  await page.locator("button[routerlink*='myorders']").click();
  await page.locator('tbody').waitFor();

  const rows = page.locator('tbody tr');

  for (let index = 0; index < await rows.count(); index++) {
    const rowOrderId = await rows.nth(index).locator('th').textContent();

    if (response.orderId.includes(rowOrderId.trim())) {
      await rows.nth(index).locator('button').first().click();
      break;
    }
  }

  const orderIdDetails = await page.locator('.col-text').textContent();
  expect(response.orderId.includes(orderIdDetails.trim())).toBeTruthy();
});
