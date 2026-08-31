import {test, expect, type Locator, type Page } from "@playwright/test";

export class LoginPage {

  page: Page;
  username: Locator;
  passwod: Locator;
  signinbutton: Locator;
   

  constructor(page : Page) {

    this.page = page;
    this.username = page.locator("#userEmail");
    this.passwod = page.locator("#userPassword");
    this.signinbutton = page.locator("[type='submit']");

  }

  async Goto() {
    await this.page.goto('https://rahulshettyacademy.com/client/#/auth/login');
  }

   async ValidLogin(UsernamE : any,PassworD : any) {

    await this.username.fill(UsernamE);
    await this.passwod.fill(PassworD);
    await this.signinbutton.click();
   


  }
}
