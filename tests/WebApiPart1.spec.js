const { test, expect, request } = require('@playwright/test')
const { APiUtils } = require('../utils/APIUtils')

const loginPayload = {
  userEmail: 'satheeshreddy0520@gmail.com',
  userPassword: '@Reddys143'
}

const orderPayload = {
  orders: [
    {
      country: 'India',
      productOrderedId: '6960ea76c941646b7a8b3dd5'
    }
  ]
}

let response

test.beforeAll(async () => {
  const apiContext = await request.newContext()
  const apiUtils = new APiUtils(apiContext, loginPayload)

  const token = await apiUtils.getToken()
  response = await apiUtils.createOrder(orderPayload)

  response.token = token

  await apiContext.dispose()
})

test('WebApiPart1', async ({ page }) => {
  await page.addInitScript((token) => {
    window.localStorage.setItem('token', token)
  }, response.token)

  await page.goto('https://rahulshettyacademy.com/client/');

  await page.locator("button[routerlink='/dashboard/myorders']").click()
  await page.locator('tbody').waitFor()

  const rows = page.locator('.table tbody tr')
  let orderFound = false

  for (let index = 0; index < await rows.count(); index++) {
    const rowOrderId = await rows.nth(index).locator('th').textContent()

    if (rowOrderId && response.orderId.includes(rowOrderId.trim())) {
      await rows.nth(index).locator('button').first().click()
      orderFound = true
      break
    }
  }

  expect(orderFound).toBeTruthy()

  await page.locator('.email-wrapper').waitFor()

  const orderIdDetails = await page.locator('div.col-text').textContent()

  expect(
    orderIdDetails && response.orderId.includes(orderIdDetails.trim())
  ).toBeTruthy()
})
