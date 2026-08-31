const { test, expect, request } = require('@playwright/test')

const apidata = { userEmail: "satheeshreddy0520@gmail.com", userPassword: "@Reddys143" }
const placeorderdata = { orders: [{ country: "India", productOrderedId: "6960ea76c941646b7a8b3dd5" }] }
let token;
let orderid;


test.beforeAll(async () => {

    //Login Token--
    const apicontext = await request.newContext();
   
    //Place order token--

 

})

test.beforeEach(() => {

})




test("WebApi", async ({ page }) => {

//one time use---
    await page.addInitScript(value => {

        window.localStorage.setItem("token", value);
    }, token);

    await page.goto("https://rahulshettyacademy.com/client/");

    // 1st way to wait for element === waitfor method

    // 2nd way to wait for element === waitForLoadState("networkidle")

    await page.locator("button[routerlink='/dashboard/myorders']").click();

    await page.locator("tbody").waitFor();
    const rows = await page.locator(".table tbody tr");

    for (let i = 0; i < await rows.count(); ++i) {
        const rowOrderId = await rows.nth(i).locator("th").textContent();
        if (orderid.includes(rowOrderId)) {
            await rows.nth(i).locator("button").first().click();
            break;
        }
    }

    await page.locator(".email-wrapper").waitFor();
    const grabid = await page.locator("div.col-text");
    const orderiddetails = await grabid.textContent();
    expect(orderid.includes(orderiddetails)).toBeTruthy();

    /*  const dlvyName = await page.locator(".row .text").first();
      const emailname= await dlvyName.textContent();
      expect(email.includes(emailname)).toBeTruthy();
   
      const CountryName = await page.locator("div.address p.text").last();
    const Cname=await CountryName.textContent();
     expect(countryname.includes(Cname)).toBeTruthy();
   */
    await page.pause();

}


);
