import { Locator, Page } from "@playwright/test";
const data = JSON.parse(JSON.stringify(require('../Data/login.json')));




export class LoginPage {
  readonly page: Page;
  private usernameInput: Locator;
  private passwordInput: Locator;
  private loginButton: Locator;
  private loginErrorMessage: Locator;
  private admin: Locator;
  private logOut: Locator;

  constructor(page: Page) {
    this.page = page;
    this.usernameInput = page.locator("[placeholder = 'Username']");
    this.passwordInput = page.locator("[placeholder='Password']");
    this.loginButton = page.locator("button.oxd-button");
    this.loginErrorMessage = page.locator(``);
    this.admin = page.locator('');
    this.logOut = page.locator("");
  }
  async performLogin() {
    await this.usernameInput.fill(data.ValidLogin.ValidUserName);
    await this.passwordInput.fill(data.ValidLogin.ValidPassword);
    await this.loginButton.click();
 
  }
}
module.exports= {LoginPage};
