const { test, expect } = require('@playwright/test');

test('SpecialLocatorsTest', async ({ browser }) => {

    const context = await browser.newContext();
    const page = await context.newPage();

    const email = "satheeshreddy0520@gmail.com";


    await page.goto('https://rahulshettyacademy.com/client/#/auth/login');
    await page.getByPlaceholder("email@example.com").fill(email);
    await page.getByPlaceholder("enter your passsword").fill("@Reddys143");
    await page.locator("#login").click();

    // 1st way to wait for element--- 
    // await page.waitForLoadState("networkidle");
    // 2nd way to wait for element---
    await page.locator(".card-body b").first().waitFor();

    await page.locator(".card-body").filter({ hasText: "ZARA COAT 3" }).getByRole('button', { name: " Add To Cart" }).click();


    await page.getByRole('listitem').getByRole("button", { name: "cart" }).click();

    // await page.waitForEvent("newtworkidle");
    await page.locator("div ul li").first().waitFor();
    await expect(page.getByText({ hasText: "ZARA COAT 3" }).isVisible());
    //Checkout
    await page.getByRole('button', { name: "Checkout" }).click();

    const month = page.locator('select.input.ddl').nth(0);

    await month.waitFor();
    await month.selectOption('10');

    const date = page.locator('select.input.ddl').nth(1);

    await date.waitFor();
    await date.selectOption('20');

    await page.locator("div span,input[class='input txt']").nth(1).fill("987");

    await page.locator("numberCircle,input[type='text']").nth(2).fill("Satheesh Reddy");

    //Dynamic dropdown----

    //pressSequentially this method used if "Fill" is not worked and dynamuc dropdown
    await page.getByPlaceholder('Select Country').pressSequentially("ind");
    await page.getByRole('button', { name: "india" }).nth(1).click();

    await page.getByText('Place Order ').click();


    const orderplaced = await page.locator(".hero-primary");
    await orderplaced.waitFor();

    await expect(page.getByText(" Thankyou for the order. ").isVisible());

    const orderid = await page.locator("label.ng-star-inserted").textContent();

    await page.getByRole("button", { name: "  ORDERS" }).click();
     await page.locator(".table-hover").waitFor();
     await page.locator("tr.ng-star-inserted").filter(page.locator(`th:has-text("${orderid}")`)).getByRole('button',{name:"View"}).first().click();
     await page.locator(".email-wrapper").waitFor();
     const grabid=await page.locator("div.col-text").textContent();
     expect(orderid.includes(grabid)).toBeTruthy();
     page.getByText("Thank you for Shopping With Us").isVisible();
    





}


);