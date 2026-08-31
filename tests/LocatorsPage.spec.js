const { test, expect } = require('@playwright/test');


test("LocatorsPage", async ({browser}) => {

    const context = await browser.newContext();
    const page = await context.newPage();
    
    await page.goto("https://rahulshettyacademy.com/angularpractice/");

   // await page.locator("input.ng-touched").fill("Satheesh Reddy");
    await page.locator("input[name='email']").fill("satheeshreddy05@gmail.com");
    await page.getByPlaceholder("Password").fill("@Reddys143");
    await page.getByLabel("Check me out if you Love IceCreams!").click();
    await page.getByLabel("Gender").selectOption("Female");
    await page.getByLabel("Student").check();
    await page.getByRole("button",{name: 'Submit'}).click();
    await page.getByText("Success! The Form has been submitted successfully!.").isVisible();
    await page.getByRole("link",{name:'Shop'}).click();

    await page.locator("app-card").filter({hasText:'Blackberry'}).getByRole("button").click();
    
 
}
);