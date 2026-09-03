class LoginPagePractise {
  constructor(page) {
    this.page = page;
    this.username = page.locator('#username');
    this.password = page.locator('#password');
    this.terms = page.getByRole('checkbox', { name: 'I Agree to the terms and conditions' });
    this.signInButton = page.getByRole('button', { name: 'Sign In' });
  }

  async goto() {
    await this.page.goto('https://rahulshettyacademy.com/loginpagePractise/');
  }

  async login(username, password) {
    await this.username.fill(username);
    await this.password.fill(password);
    await this.terms.check();
    await this.signInButton.click();
  }
}

module.exports = { LoginPagePractise };
