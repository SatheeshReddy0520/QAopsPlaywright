import {LoginPage} from './LoginPage';
import {DashboardPage} from './DashboardPage';
import {CartPage} from './CartPage';
import {CheckoutPage} from './CheckoutPage';
import {OrderReview} from './OrderReview';
import {HistoryPage} from './HistoryPage';
import { Page } from '@playwright/test';



export class POManager {

    page: Page;
    LoginPage: LoginPage;
    DashboardPage: DashboardPage;
    CartPage: CartPage;
    CheckoutPage: CheckoutPage;
    OrderReview: OrderReview;
    HistoryPage: HistoryPage;

    constructor(page :Page) {
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