class LoginPage{
   

   constructor(page){

   this.page=page;
   this.email= page.locator("#userEmail");
   this.passwod= page.locator("#userPassword");
   this.signinbutton= page.locator("[type='submit']").click();
   }

   async Goto(){
 await this.page.goto('https://rahulshettyacademy.com/client/#/auth/login');
   }

   ValidLogin(username,password){

    await email.fill(username);
    await passwod.fill(password);
    await this.signinbutton
   

   }
}