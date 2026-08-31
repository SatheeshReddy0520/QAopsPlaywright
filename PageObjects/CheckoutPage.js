const { expect } = require("@playwright/test");

class CheckoutPage {

    constructor(page) {

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

    async FillDetails(monthValue, yearValue) {

        await this.pageload.waitFor({ state: "visible" });
        await this.month.waitFor({ state: "visible" });
        await this.month.selectOption({ value: monthValue });

        await this.year.waitFor({ state: "visible" });
        await this.year.selectOption({ value: yearValue });
    }

    async CardDetails(cvvNumber, cardName) {

        await this.cvv.waitFor({ state: "visible" });
        await this.cvv.fill(cvvNumber);

        await this.cardname.waitFor({ state: "visible" });
        await this.cardname.fill(cardName);
    }

    async selectCountryAndVerifyEmail(countryType, countryName, username) {

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

module.exports = { CheckoutPage };