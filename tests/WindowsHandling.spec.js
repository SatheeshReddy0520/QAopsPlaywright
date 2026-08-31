const {test,expect}= require('@playwright/test');



test("Windows Handling",async({browser}) =>
    
    {
    const context= await browser.newContext();
    const page=context.newPage();

     
      //const dclink2=page.locator("[href*='techsmarthire']");

     await page.goto("https://rahulshettyacademy.com/loginpagePractise/");

      const documentlink=page.locator("[href*='documents-request']");
      await documentlink.click();
    
     

    

});


