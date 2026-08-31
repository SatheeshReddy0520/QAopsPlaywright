import { expect, type Locator, type Page } from "@playwright/test";

let message: string = "Happy Birthday";
message = "To you";
console.log(message);

let age1: number = 11234;
age1 = 30;
console.log(age1);

let isactive: boolean = false;
console.log(isactive);

let numbers1: number[] = [90, 80, 77];
console.log(numbers1);

let data: any = "Rapido";
data = 2;
data = "own Bike";

console.log(data);

let user : { username: string, age: number, location:string } = { username:"Pramod", age:25,location:"" }
console.log(user);


class Cartpage
{
    page: Page;
    cartlist: Locator;
    productVisible: Locator;
    clickcheckoutpage: Locator;

    constructor(page: any ) {
        this.page = page;
        this.cartlist = page.locator("div ul li");
        this.productVisible = page.locator(".infoWrap h3");
        this.clickcheckoutpage = page.locator("div.subtotal li button");
    }
}
