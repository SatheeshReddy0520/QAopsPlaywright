const { test, expect, request } = require('@playwright/test');
const { APiUtils } = require('../utils/APIUtils');

const loginPayLoad = {
  userEmail: 'anshika@gmail.com',
  userPassword: 'Iamking@000'
};

const orderPayLoad = {
  orders: [
    {
      country: 'India',
      productOrderedId: '6960ea76c941646b7a8b3dd5'
    }
  ]
};

let response;

test.beforeAll(async () => {

  const apiContext = await request.newContext();

  const apiUtils = new APiUtils(
    apiContext,
    loginPayLoad
  );

  response = await apiUtils.createOrder(orderPayLoad);

  expect(response.token).toBeTruthy();
  expect(response.orderId).toBeTruthy();

  await apiContext.dispose();
});

test('@API Place the order', async ({ page }) => {

  // Set token in browser local storage
  await page.addInitScript((token) => {
    window.localStorage.setItem('token', token);
  }, response.token);

  // Navigate to application
  await page.goto(
    'https://rahulshettyacademy.com/client'
  );

  // Click My Orders
  await page
    .locator("button[routerlink*='myorders']")
    .click();

  // Wait for orders table
  await page.locator('tbody').waitFor();

  const rows = page.locator('tbody tr');

  const rowCount = await rows.count();

  for (let index = 0; index < rowCount; index++) {

    const rowOrderId = await rows
      .nth(index)
      .locator('th')
      .textContent();

    if (
      rowOrderId &&
      response.orderId.includes(rowOrderId.trim())
    ) {
      await rows
        .nth(index)
        .locator('button')
        .first()
        .click();

      break;
    }
  }

  // Get order ID from details page
  const orderIdDetails = await page
    .locator('.col-text')
    .textContent();

  expect(
    response.orderId.includes(orderIdDetails.trim())
  ).toBeTruthy();
});