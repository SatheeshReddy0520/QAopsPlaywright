const { test, expect } = require('@playwright/test');

test('Tc--1', async ({ browser }) => {

   const context = await browser.newContext();
   const page = await context.newPage();

   await page.goto('https://rahulshettyacademy.com/client/#/auth/login');
   console.log(await page.title());
   await page.locator('.text-reset').click();
   await page.locator('#firstName').fill("satheesh");
   await page.locator('#lastName').fill("Reddy");
   await page.locator('#userEmail').fill("satheeshreddy05@gmail.com");
   await page.locator("[placeholder='enter your number']").fill("9542880351");
   await page.locator("[value='Male']").click();
   await page.locator("#userPassword").fill("@Reddys143");
   await page.locator("[formcontrolname='confirmPassword']").fill("@Reddys143");
   await page.locator("[type='checkbox']").click();
   await page.locator("#login").click();
   await expect(page.locator("h1.headcolor")).toHaveText("Account Created Successfully");
   await page.locator("div button.btn").click();
});

test('Tc--2', async ({ page }) => {

   const products = page.locator(".card-body");
   const allProductsNames = page.locator(".card-body b");
   const productName = "iphone 13 pro";
   const email ="satheeshreddy0520@gmail.com";
   const countryname = " Country - India ";

   await page.goto('https://rahulshettyacademy.com/client/#/auth/login');
   await page.locator("#userEmail").fill(email);
   await page.locator("#userPassword").fill("@Reddys143");
   await page.locator("[type='submit']").click();
   //  console.log(await products.first().textContent());
   //  console.log(await products.nth(1).textContent());

   // 1st way to wait for element--- 
   // await page.waitForLoadState("networkidle");
   // 2nd way to wait for element---
   await page.locator(".card-body b").first().waitFor();
   const allproducts = await allProductsNames.allTextContents();
   console.log(allproducts);

   const count = await products.count();

   for (let i = 0; i < count; ++i) {

      if (await products.nth(i).locator("b").textContent() === productName) {

         await products.nth(i).locator("text=' Add To Cart'").click();
         break;
      }
   }


   await page.locator("[routerlink*='cart']").click();

   // await page.waitForEvent("newtworkidle");
   await page.locator("div ul li").first().waitFor();
   const bool = await page.locator("h3:has-text('iphone 13 pro')").isVisible();
   await expect(bool).toBeTruthy();

   await page.locator("text=Checkout").click();

   const month = page.locator('select.input.ddl').nth(0);

   await month.waitFor();
   await month.selectOption('10');

   const date = page.locator('select.input.ddl').nth(1);

   await date.waitFor();
   await date.selectOption('20');

   await page.locator("div span,input[class='input txt']").nth(1).fill("987");

   await page.locator("numberCircle,input[type='text']").nth(2).fill("Satheesh Reddy");

   //Dynamic dropdown----

   await page.locator("[placeholder='Select Country']").pressSequentially("ind");  //pressSequentially this method used if "Fill" is not worked and dynamuc dropdown
   const dropdown = await page.locator("section.ta-results");
   await dropdown.waitFor();
   const cntyNames = await dropdown.locator("button").count();


   for (let i = 0; i < cntyNames; ++i) {
      const text = await dropdown.locator("button").nth(i).textContent();
      if (text === " India") {
         await dropdown.locator("button").nth(i).click();
         break;
      }

   }

   expect(await page.locator(".user__name [type='text']").first()).toHaveText(email);
   page.locator(".action__submit").click();

   const orderplaced = await page.locator(".hero-primary");
   await orderplaced.waitFor();
   console.log(await orderplaced.textContent());
   await expect(orderplaced).toHaveText(" Thankyou for the order. ");

   const itemorderid = await page.locator(".em-spacer-1 .ng-star-inserted");

   await itemorderid.waitFor();
   const orderid = await itemorderid.textContent();
   console.log(orderid);

   //  await expect(page.locator(orderid)).toHaveText();

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








