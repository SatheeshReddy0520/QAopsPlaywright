import { test, expect, type Locator, type Page } from "@playwright/test";

export class CartPage {
    page: Page;
    cartlist: Locator;
    productVisible: Locator;
    clickcheckoutpage: Locator;

    constructor(page: Page) {
        this.page = page;
        this.cartlist = page.locator("div ul li");
        this.productVisible = page.locator(".infoWrap h3");
        this.clickcheckoutpage = page.locator("div.subtotal li button");
    }

    async SearchinCartList(cartProduct: string): Promise<void> {
        await this.cartlist.first().waitFor();
        const pdcttext: string | null = await this.productVisible.textContent();
        if (pdcttext === pdcttext) {
            expect(pdcttext).toBeTruthy();
        }
    }

    async ClickCheckoutPage(): Promise<void> {
        await this.clickcheckoutpage.click();
    }
}
