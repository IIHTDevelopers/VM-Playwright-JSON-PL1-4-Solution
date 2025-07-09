import { Locator, Page } from "@playwright/test";
import path from 'path';
const filePath = path.resolve(__dirname, '../../TestImage.jpg');


export class MyInfoPage {
  readonly page: Page;
  private Myinfo: Locator;
  private clickImage: Locator;
  private uploadButton: Locator;
  private fileInput: Locator;
  private ImageSave: Locator;
  private helpbutton : Locator;

  constructor(page: Page) {
    this.page = page;
    this.Myinfo = page.locator("text=My Info");
    this.clickImage = page.locator(".employee-image"); 
    this.uploadButton = page.locator(".employee-image-action"); 
    this.fileInput = page.locator('input[type="file"].oxd-file-input'); 
    this.ImageSave = page.locator("button[type='submit']"); 
    this.helpbutton= page.locator("//div[@class='oxd-topbar-body-nav-slot']/button");
  }

  async myinfo() {
    await this.Myinfo.click();     
    await this.clickImage.click();         
    await this.uploadButton.click();         
    await this.fileInput.setInputFiles(filePath); 
    await this.ImageSave.click(); 

  }

   public async helpHover(): Promise<string> {
    await this.helpbutton.hover();
    await this.page.waitForTimeout(4000); 

    const tooltip = await this.helpbutton.getAttribute('title');
    return tooltip ?? "";
    
   }
}
