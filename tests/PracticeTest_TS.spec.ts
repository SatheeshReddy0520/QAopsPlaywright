import { test, type Page } from '@playwright/test';
import * as TestBase from '../Utils -ts/Test-Base';
import { POManager } from '../PageObjects_ts/POManager';
import testData from '../Utils -ts/PlaceOrderTestData1.json';

const customTest: any = (TestBase as any).customTest ?? test;





//json->String->Object JS----
const dataset = testData;

for (const data of dataset) {
  test(`@web Place a Order for,${data.productName}`, async ({ page }) => {

    // const username = "satheeshreddy0520@gmail.com";
    // const password = "@Reddys143";
    // const products = page.locator(".card-body");
    // const productName = "iphone 13 pro";
    const countryname = " Country - India ";
    const cvvnum = "955";
    const cardName = "Satheesh Reddy";

    //LoginPage
    const poManager = new POManager(page);
    const loginpage = poManager.getInToLoginPage();
    await loginpage.Goto();
    await loginpage.ValidLogin(data.username, data.password);
    //DashboatrdPage
    const dbpage = poManager.GetIntoDashboardPage();
    await dbpage.SearchProduct(data.productName);
    await dbpage.navigatetocart();

    //Verify CartPage

    const cartpage = poManager.getIntoCartPage();
    await cartpage.SearchinCartList(data.productName);
    await cartpage.ClickCheckoutPage();


    //Verify CheckoutPage 

    const checkoutPage = poManager.getIntoCheckoutPage();
    await checkoutPage.selectCountryAndVerifyEmail("ind", " India", data.username);

    //order ReviewPage
    const ordReview = poManager.GetOrderIDandVerifyMsg();
    await ordReview.OrderMessaGe();
    const orderid = await ordReview.VerifyandGetOrderId();
    console.log(orderid + "Product is = " + data.productName);
    await ordReview.ClickMyodersPage();

    //History page 
    const historyPage = poManager.getIntoorderHistoryPage();
    await historyPage.getordersPage(orderid);

    /*  const dlvyName = await page.locator(".row .text").first();
      const emailname= await dlvyName.textContent();
      expect(email.includes(emailname)).toBeTruthy();
   
      const CountryName = await page.locator("div.address p.text").last();
    const Cname=await CountryName.textContent();
     expect(countryname.includes(Cname)).toBeTruthy();
   */

  }
  );
}


customTest ("@web Test Case For Order", async ({ page, testDataForOrder }: { page: Page; testDataForOrder: any }) => {

  const countryname = " Country - India ";
  const cvvnum = "955";
  const cardName = "Satheesh Reddy";

  //LoginPage
  const poManager = new POManager(page);
  const loginpage = poManager.getInToLoginPage();
  await loginpage.Goto();
  await loginpage.ValidLogin(testDataForOrder.username, testDataForOrder.password);
  //DashboatrdPage
  const dbpage = poManager.GetIntoDashboardPage();
  await dbpage.SearchProduct(testDataForOrder.productName);
  await dbpage.navigatetocart();

  //Verify CartPage

  const cartpage = poManager.getIntoCartPage();
  await cartpage.SearchinCartList(testDataForOrder.productName);
  await cartpage.ClickCheckoutPage();


  //Verify CheckoutPage 

  const checkoutPage = poManager.getIntoCheckoutPage();
  await checkoutPage.selectCountryAndVerifyEmail("ind", " India", testDataForOrder.username);

  //order ReviewPage
  const ordReview = poManager.GetOrderIDandVerifyMsg();
  await ordReview.OrderMessaGe();
  const orderid = await ordReview.VerifyandGetOrderId();
  console.log(orderid + "Product is = " + testDataForOrder.productName);
  await ordReview.ClickMyodersPage();

  //History page 
  const historyPage = poManager.getIntoorderHistoryPage();
  await historyPage.getordersPage(orderid);

});





