import {test, expect, type Locator, type Page } from "@playwright/test";

export class HistoryPage {


    page: Page;
    waitforpage :Locator;
    rows :Locator;
    pagewait :Locator;
    grabid :Locator;
    
    constructor(page : Page) {
        this.page = page;

        this.waitforpage = page.locator("tbody");

        this.rows = page.locator(".table tbody tr");

        this.pagewait = page.locator(".email-wrapper");
        this.grabid = page.locator("div.col-text");
    }

    async getordersPage(orderid : any) {

        
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
