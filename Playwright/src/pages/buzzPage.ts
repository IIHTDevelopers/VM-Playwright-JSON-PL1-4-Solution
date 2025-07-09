import { Page, Locator, expect } from "@playwright/test";
import path from 'path';
const filePath = path.resolve(__dirname, '../../TestImage.jpg');
const commentText = "this is test comment";
const editPostText = "this is edit post comment";


export default class buzzPage {
  readonly page: Page;

  private buzzLink: Locator;
  private sharephoto: Locator;
  private buzzImage: Locator;
  private submitButton: Locator;
  private likeCount: Locator;
  private likeButton: Locator;
  private firstPostFooter: Locator;
  private commentInput : Locator;
  private firstCommentButton: Locator;
  private latestComment: Locator;
  private editToggle : Locator;
  private editButton: Locator;
  private postEdit: Locator;
  private postButton : Locator;
  private verifyCmnt: Locator;
  constructor(page: Page) {
    this.page = page;
    this.buzzLink = page.locator('span.oxd-main-menu-item--name', { hasText: 'Buzz' });
    this.sharephoto = page.locator("//button[normalize-space()='Share Photos']");
    this.buzzImage = page.locator('input.oxd-file-input');
    this.submitButton = page.locator("//button[normalize-space()='Share']");
    this.editToggle= page.locator("(//button[@type='button'])[9]");
    this.editButton = page.locator("//li[@class='orangehrm-buzz-post-header-config-item'][2]");
    this.firstPostFooter = page.locator('div.orangehrm-buzz-post-footer').first();


    this.likeCount = this.firstPostFooter.locator('p:has-text("like")');
    this.likeButton = this.firstPostFooter.locator('#heart-svg');
    this.commentInput = this.page.locator('[placeholder="Write your comment..."]');
    this.firstCommentButton = this.page.locator("//div[@class='orangehrm-buzz-post-actions']/button[1]").first();
    this.latestComment = this.page.locator("//div[@class='orangehrm-post-comment-area'] / span[@class='oxd-text oxd-text--span orangehrm-post-comment-text']")
    this.postEdit = this.page.locator("(//textarea[@class='oxd-buzz-post-input'])[2]");
    this.postButton = this.page.locator("//div[@class = 'oxd-form-actions orangehrm-buzz-post-modal-actions']/button")
    this.verifyCmnt = this.page.locator("//div[@class='orangehrm-buzz-post-body']/p"); 
  }
  async SharePhotoPost() {
    await this.buzzLink.click();
    await this.sharephoto.click();
    await this.buzzImage.setInputFiles(filePath);
    await this.submitButton.click();
  }

  async likePost(): Promise<{ initialNumber: number, updatedNumber: number }> {
    await this.buzzLink.click();
    const statText = await this.likeCount.textContent();
    const initialNumber = parseInt(statText?.match(/\d+/)?.[0] || '0', 10);
    await this.likeButton.click();
    await this.page.waitForTimeout(2000);
    const updatedStatText = await this.likeCount.textContent();
    const updatedNumber = parseInt(updatedStatText?.match(/\d+/)?.[0] || '0', 10);
    return { initialNumber, updatedNumber };


  }

  async addCommentToPost(commentText: string): Promise<string> {
  if (!commentText) throw new Error("Comment text is null or undefined");

  await this.buzzLink.click();
  await this.page.waitForTimeout(3000);
  await this.firstCommentButton.click();
  await this.commentInput.fill(commentText);
  await this.commentInput.press('Enter');
  await this.page.waitForTimeout(2000);

  const postedCommentText = await this.latestComment.first().textContent();
  return postedCommentText?.trim() || '';
}


 public async editPost(): Promise<string> {
  if (!editPostText) throw new Error("editPostText is null or undefined");

  await this.buzzLink.click();
  await this.editToggle.click();
  await this.editButton.click();
  await this.postEdit.clear();
  await this.postEdit.fill(editPostText);
  await this.postButton.click();
  await this.page.waitForTimeout(2000);

  const postedCommentText = await this.verifyCmnt.first().textContent();
  return postedCommentText?.trim() || '';
}

}