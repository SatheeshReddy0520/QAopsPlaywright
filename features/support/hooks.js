const playwright = require('@playwright/test');
const { POManager } = require('../../PageObjects/POManager');
const {Before,After,BeforeStep,AfterStep,Status} = require('@cucumber/cucumber');

Before(async function () {

    this.browser = await playwright.chromium.launch({
        headless: false
    });

    this.context = await this.browser.newContext();

    this.page = await this.context.newPage();

    this.poManager = new POManager(this.page);
});


BeforeStep(function () {

});


AfterStep(async function (result) {

    if(result.result.status === Status.FAILED){
    await this.page.screenshot({path:'./Screenshots/failed.png'
});
    
    }
});


After(async function () {

    console.log("Test is completed");

});