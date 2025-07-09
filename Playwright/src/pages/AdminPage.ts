import { Page, Locator, expect } from "@playwright/test";
export default class AdminPage {
  readonly page: Page;
  private AdminLink: Locator;
  private editbutton: Locator;
  private empName: Locator;
  private empNameSubmit: Locator;
  private sortUsername: Locator;
  private sortAsc: Locator;
  private upgradeButton: Locator;
  private maintitle: Locator;
  private admindropdown: Locator;
  private adminSearch: Locator;
  private searchButton: Locator;
  private userRoleElements: Locator;
  private username: Locator;


  constructor(page: Page) {
    this.page = page;
    this.AdminLink = page.locator('text=Admin');
    this.editbutton = page.locator("(//div[@class='oxd-table-cell-actions']/button[2])[1]");
    this.empName = page.locator('input.oxd-input.oxd-input--focus');
    this.empNameSubmit = page.locator("button[type='submit']");
    this.sortUsername = page.locator("(//i[contains(@class, 'bi-sort-alpha-down')])[1]");
    this.sortAsc = page.locator("(//span[@class='oxd-text oxd-text--span'][normalize-space()='Ascending'])[1]");
    this.upgradeButton = this.page.locator("a.orangehrm-upgrade-link");
    this.maintitle = page.locator(".main-title");
    this.admindropdown = page.locator("(//div[@class='oxd-select-text oxd-select-text--active'])[1]");
    this.adminSearch = page.locator('div[role="option"]:has-text("Admin")');
    this.searchButton = page.locator('button[type="submit"]:has-text("Search")');
    this.userRoleElements = page.locator('.oxd-table-body .oxd-table-row >> nth=0').locator('xpath=../../..//div[@role="row"]//div[@role="cell"][2]');

    this.username = page.locator("//input[@autocomplete='off']");
    // Extract all user role texts

  }

  public async AdminEdit() {
    await this.AdminLink.click();
    await this.editbutton.click();
    // await this.username.click();
    // await this.empName.fill("Ashutoshsdd");
    // await this.empNameSubmit.click();
  }

public async admitSort(): Promise<string[]> {
  await this.AdminLink.click();
  await this.sortUsername.click();
  await this.sortAsc.click();

  await this.page.waitForTimeout(2000);
  await this.page.waitForLoadState('networkidle');

  const roles = await this.userRoleElements.allTextContents();
  const trimmedRoles = roles.map(role => role.trim());

  return trimmedRoles; 
}



  public async upgrade(): Promise<string> {
    await this.AdminLink.click();
    await this.page.waitForTimeout(2000);
    const [upgradeTab] = await Promise.all([
      this.page.context().waitForEvent('page'),
      this.upgradeButton.click()
    ]);
    await upgradeTab.waitForLoadState();
    const title = await upgradeTab.title();
    return title; 
  }


  public async adminSearchh(): Promise<string[]> {
    await this.AdminLink.click();
    await this.admindropdown.click();
    await this.adminSearch.click();
    await this.searchButton.click();
    const roles = await this.userRoleElements.allTextContents();
    return roles.map(role => role.trim());
  }
}
