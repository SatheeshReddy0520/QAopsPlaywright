const { test, expect, request } = require('@playwright/test');
const APIUtils = require('../utils/APIUtils');
const ApiUtils = new APIUtils(apicontext, apidata, placeorderdata);
response = await ApiUtils.CreateOrder(placeorderdata);

test.skip("WebApi1", async ({ page }) => {

    //one time use---
    await page.addInitScript(value => {

        window.localStorage.setItem("token", value);
    }, response.token);

    await page.goto("https://rahulshettyacademy.com/client/");

    // 1st way to wait for element === waitfor method

    // 2nd way to wait for element === waitForLoadState("networkidle")
   

      
      
    await page.route(
        "https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*",
        async route => {
            const response = await page.request.fetch(route.request());
            const data = JSON.stringify(payloadFakeData);
            await route.fulfill({
                status: response.status(),
                contentType: 'application/json',
                body: data
            });
        }
    );

    await page.locator("button[routerlink='/dashboard/myorders']").click();
    await page.waitForResponse("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*");
    console.log(await page.locator(".mt-4").textContent());
});
