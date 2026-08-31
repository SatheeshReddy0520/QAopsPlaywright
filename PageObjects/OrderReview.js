const { expect } = require("@playwright/test");

class OrderReview {

    constructor(page) {
        this.page = page;

        this.orderplaced = page.locator(".hero-primary");
        this.itemorderid = page.locator(".em-spacer-1 .ng-star-inserted");
        this.orderspage = page.locator("button[routerlink='/dashboard/myorders']");


    }

    async OrderMessaGe() {
        await this.orderplaced.waitFor();
        await expect(this.orderplaced).toHaveText(" Thankyou for the order. ");
        const verifyMsg = await this.orderplaced.textContent();
        console.log(verifyMsg);
    }

    async VerifyandGetOrderId() {

        return await this.itemorderid.textContent();

    }

    async ClickMyodersPage() {
        await this.orderspage.click();
    }

}
module.exports = { OrderReview };