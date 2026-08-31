import { test, expect, type Locator, type Page } from "@playwright/test";




export class CheckoutPage {
    page: Page;
    pageload :Locator;
    month :Locator;
    year :Locator;
    cvv :Locator;
    cardname :Locator;
    typecntryname :Locator;
    dropdown :Locator;
    verifyusername :Locator;
    placeOrder :Locator;
    constructor(page: Page) {

        this.page = page;

        this.pageload = page.locator(".form__cc");

        // Month and Year dropdowns
        this.month = page.locator("select.input.ddl").first();
        this.year = page.locator("select.input.ddl").last();

        // Card Details
        this.cvv = page.locator("input.input.txt").nth(1);
        this.cardname = page.locator("input[type='text']").nth(2);

        // Country
        this.typecntryname = page.locator("[placeholder='Select Country']");
        this.dropdown = page.locator("section.ta-results");

        // Email Verification
        this.verifyusername = page.locator(".user__name input").first();

        // Place Order
        this.placeOrder = page.locator(".action__submit");
    }

    async FillDetails(monthValue: any, yearValue: any) {

        await this.pageload.waitFor({ state: "visible" });
        await this.month.waitFor({ state: "visible" });
        await this.month.selectOption({ value: monthValue });

        await this.year.waitFor({ state: "visible" });
        await this.year.selectOption({ value: yearValue });
    }

    async CardDetails(cvvNumber: any, cardName: any) {

        await this.cvv.waitFor({ state: "visible" });
        await this.cvv.fill(cvvNumber);

        await this.cardname.waitFor({ state: "visible" });
        await this.cardname.fill(cardName);
    }

    async selectCountryAndVerifyEmail(countryType: any, countryName: any, username: any) {

        await this.typecntryname.pressSequentially(countryType);

        await this.dropdown.waitFor({ state: "visible" });

        const options = this.dropdown.locator("button");
        const count = await options.count();

        for (let i = 0; i < count; i++) {

            const text = await options.nth(i).textContent();

            if (text === countryName) {
                await options.nth(i).click();
                break;
            }
        }

      //  await expect(this.verifyusername).toHaveValue(username);

        await this.placeOrder.click();
    }

}

