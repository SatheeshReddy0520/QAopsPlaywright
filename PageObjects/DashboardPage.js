class DashboardPage {
   
    
    constructor(page) {

        this.products = page.locator(".card-body");
        this.productList = page.locator(".card-body b");
        this.cart = page.locator("[routerlink*='cart']");

    }

    async SearchProduct(productname) {

        await this.products.first().waitFor();

        const allproducts = await this.productList.allTextContents();
        console.log(allproducts);

        const count = await this.products.count();
      



        for (let i = 0; i < count; ++i) {

            if (await this.products.nth(i).locator("b").textContent() === productname) {

                await this.products.nth(i).locator("text=' Add To Cart'").click();
                break;
            }
        }

     
      
    }

       getProductLocator(productname){
      return  this.page.locator("h3:has-text('"+productname+"')");
        }


    async navigatetocart() {
        await this.cart.click();
    }


}

module.exports = { DashboardPage };