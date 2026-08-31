class LoginPage {


  constructor(page) {

    this.page = page;
    this.username = page.locator("#userEmail");
    this.passwod = page.locator("#userPassword");
    this.signinbutton = page.locator("[type='submit']");

  }

  async Goto() {
    await this.page.goto('https://rahulshettyacademy.com/client/#/auth/login');
  }

   async ValidLogin(UsernamE,PassworD) {

    await this.username.fill(UsernamE);
    await this.passwod.fill(PassworD);
    await this.signinbutton.click();
   


  }
}
module.exports={LoginPage};