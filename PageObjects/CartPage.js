const { expect } = require("@playwright/test");

class CartPage{

    constructor(page){
        
        this.cartlist=page.locator("div ul li");
        this.productVisible= page.locator(".infoWrap h3");
        this.clickcheckoutpage=page.locator("div.subtotal li button");

    }

   async SearchinCartList(cartProduct){
     await this.cartlist.first().waitFor();
    const pdcttext= await this.productVisible.textContent();
    if(pdcttext === pdcttext){
        expect(pdcttext).toBeTruthy();
    }
   
   }

   async ClickCheckoutPage(){

     this.clickcheckoutpage.click();
   }
}
module.exports={CartPage};