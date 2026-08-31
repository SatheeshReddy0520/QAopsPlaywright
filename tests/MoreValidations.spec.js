const { test, expect } = require('@playwright/test')

test("Validation", async ({ page }) => {


    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    await page.locator("#displayed-text").isVisible();
    await page.locator("#hide-textbox").click();
    expect(await page.locator("#displayed-text")).toBeHidden();
    await page.locator("#confirmbtn").click();
    //Popup will display popup another name as in playwright dialog

    page.on('dialog', dialog => dialog.accept());   //accept or Dismiss 

    await page.locator("#mousehover").hover();

    const iframe = await page.frameLocator("#courses-iframe");

    await iframe.locator("li a[href='lifetime-access']").first().click();
    const text = await iframe.locator("h2[style*='padding-bottom:']").textContent();
    console.log(await text.split(" ")[1]);


  //  await page.pause();
});

test("Screenshot,Visual Comaparision", async ({ page }) => {

    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    await page.locator("#displayed-text").isVisible();
    await page.locator('#displayed-text').screenshot({path:'PartialScreenshot.png'});
    await page.locator("#hide-textbox").click();
    await page.screenshot({path:'Screenshot.png'});
    expect(await page.locator("#displayed-text")).toBeHidden();

});

test.only("visual Testing", async ({ page }) => {

    await page.goto("https://www.google.com/");
     expect( await page.screenshot()).toMatchSnapshot('Landingpage.png');


}); 