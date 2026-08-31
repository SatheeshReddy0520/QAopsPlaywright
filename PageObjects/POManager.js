const { LoginPage } = require('./LoginPage');
const { DashboardPage } = require('./DashboardPage');
const { CartPage } = require('./CartPage');
const { CheckoutPage } = require('./CheckoutPage');
const { OrderReview } = require('./OrderReview');
const { HistoryPage } = require('./HistoryPage');



class POManager {

    constructor(page) {
        this.page = page;
        this.LoginPage = new LoginPage(this.page);
        this.DashboardPage = new DashboardPage(this.page);
        this.CartPage = new CartPage(this.page);
        this.CheckoutPage = new CheckoutPage(this.page);
        this.OrderReview = new OrderReview(this.page);
        this.HistoryPage = new HistoryPage(this.page);


    }

    getInToLoginPage() {
        return this.LoginPage;
    }

    GetIntoDashboardPage() {
        return this.DashboardPage;

    }

    getIntoCartPage() {
        return this.CartPage;

    }

    getIntoCheckoutPage() {
        return this.CheckoutPage;

    }

    GetOrderIDandVerifyMsg() {
        return this.OrderReview;
    }

    getIntoorderHistoryPage() {
        return this.HistoryPage;
    }


}
module.exports = { POManager };