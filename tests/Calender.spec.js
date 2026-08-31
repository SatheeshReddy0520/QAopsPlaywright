const { test, expect } = require("@playwright/test")


test("Calenders TestCase", async ({ browser }) => {

    const context = await browser.newContext();
    const page = await context.newPage();
    const month = "9";
    const date = "20";
    const year = "2028";

    const Expectedlist = [month,date,year];

    await page.goto("https://rahulshettyacademy.com/seleniumPractise/#/offers");
    await page.locator(".react-date-picker__calendar-button").click();
    await page.locator(".react-calendar__navigation__label").click();
    await page.locator(".react-calendar__navigation__label").click();

    await page.getByText(year).click();

    await page.locator(".react-calendar__year-view__months__month").nth(Number(month - 1)).click();
    await page.locator("//abbr[text()='"+date+"']").click();

   const inputs = page.locator(".react-date-picker__inputGroup__input");

    for (let i = 0; i < Expectedlist.length; i++) {
        const value = await inputs.nth(i).inputValue();
        expect(value).toEqual(Expectedlist[i]);


    }







});
