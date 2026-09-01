const { test, expect, request } = require('@playwright/test');
const { json } = require('node:stream/consumers');
const APIUtils = require('../utils/APIUtils');
 const apidata = {userEmail:"satheeshreddy0520@gmail.com",userPassword:"@Reddys143" }
 const placeorderdata = {orders:[{country:"India",productOrderedId:"6960ea76c941646b7a8b3dd5"}] }
 const payloadFakeData={data:[],message:"No Orders"}

let response;

test.beforeAll(async () => {

    const apicontext = await request.newContext();
    const ApiUtils = new APIUtils(apicontext,apidata,placeorderdata);
    response= await ApiUtils.CreateOrder(placeorderdata);

})

test.skip("WebApi1", async ({ page }) => {

    //one time use---
    await page.addInitScript(value => {

        window.localStorage.setItem("token", value);
    }, response.token);

    await page.goto("https://rahulshettyacademy.com/client/");

    // 1st way to wait for element === waitfor method

    // 2nd way to wait for element === waitForLoadState("networkidle")
   

      
      
       await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*",
        async route=>
         {
           const responses= await page.request.fetch(route.request());
           let data=JSON.stringify(payloadFakeData);
           route.fulfill({
             responses,
             data,
          });

         });
     await page.locator("button[routerlink='/dashboard/myorders']").click();
     await page.waitForResponse("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*")
     console.log(await page.locator(".mt-4").textContent());


     }
     
     


);
