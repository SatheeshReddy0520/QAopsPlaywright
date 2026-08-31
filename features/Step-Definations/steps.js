const { expect } = require('@playwright/test');
const {POManager} =require('../../PageObjects/POManager');
const {Given, When,Then, } = require ('@cucumber/cucumber');
const playwright = require('@playwright/test');




Given('Login to website with {string} and {string}',{timeout : 100*1000}, async function (username, password) {
  // Write code here that turns the phrase above into concrete actions
 
    const browser= await playwright.chromium.launch({headless: false});
    const context=await browser.newContext();
    const page=await context.newPage();
    this.poManager = new POManager(page);
    const loginpage = this.poManager.getInToLoginPage();
    await loginpage.Goto();
    await loginpage.ValidLogin(username,password );


});

When('search for a product {string} add to cart', async function (ProductName) {
  // Write code here that turns the phrase above into concrete actions
  const dbpage = this.poManager.GetIntoDashboardPage();
    await dbpage.SearchProduct(ProductName);
    await dbpage.navigatetocart();
});

Then('verify the produt is added to cart {string} and checkout', async function (ProductName) {
  // Write code here that turns the phrase above into concrete actions
   const cartpage = this.poManager.getIntoCartPage();
    await cartpage.SearchinCartList(ProductName);
    await cartpage.ClickCheckoutPage();
});

When('place the order in my orders page', async function () {
  const checkoutPage = this.poManager.getIntoCheckoutPage();
    await checkoutPage.selectCountryAndVerifyEmail("ind", " India",);
});

Then('verify the order is present in orders page is {string} and view the order details',{timeout : 100*1000}, async function (productName) {
  // Write code here that turns the phrase above into concrete actions
  
  const ordReview = this.poManager.GetOrderIDandVerifyMsg();
    await ordReview.OrderMessaGe();
    const orderid = await ordReview.VerifyandGetOrderId();
    console.log(orderid + "Product is = " + productName);
    await ordReview.ClickMyodersPage();

    //History page 
    const historyPage = this.poManager.getIntoorderHistoryPage();
    await historyPage.getordersPage(orderid);

});





Given('Login to website2 with {string} and {string}', {timeout : 100*1000}, async function (username, password) {
  // Write code here that turns the phrase above into concrete actions
 await this.page.goto("https://rahulshettyacademy.com/loginpagePractise/");
 await this.page.locator("input[name='username']").fill(username);
 await this.page.locator("input[name='password']").fill(password);
 await this.page.locator("#terms").click();
 await this.page.locator("#signInBtn").click();
 

});

Then('verify logging is incorrect', async function () {
  // Write code here that turns the phrase above into concrete actions
  console.log(await this.page.locator("[style*='block;']").textContent());
  await expect(this.page.locator("[style*='block;']")).toContainText('Incorrect');
});