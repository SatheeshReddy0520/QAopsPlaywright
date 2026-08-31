const { expect } = require('@playwright/test');

class HistoryPage {

    constructor(page) {
        this.page = page;

        this.waitforpage = page.locator("tbody");

        this.rows = page.locator(".table tbody tr");

        this.pagewait = page.locator(".email-wrapper");
        this.grabid = page.locator("div.col-text");
    }

    async getordersPage(orderid) {

        
        await this.waitforpage.waitFor();

        for (let i = 0; i < await this.rows.count(); ++i) {
            const rowOrderId = await this.rows.nth(i).locator("th").textContent();
            if (orderid.includes(rowOrderId)) {
                await this.rows.nth(i).locator("button").first().click();
                break;
            }
        }

        const orderiddetails = await this.grabid.textContent();
        expect(orderid.includes(orderiddetails)).toBeTruthy();

    }


}
module.exports = { HistoryPage };