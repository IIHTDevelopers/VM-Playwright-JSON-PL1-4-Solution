import {  test } from "playwright/test";
import { Page, Locator, expect } from "@playwright/test";
import { LoginPage } from "../../pages/LoginPage";
import  AdminPage  from "src/pages/AdminPage";
import  buzzpage from "src/pages/buzzPage";
import MedicalRecordsPage from "src/pages/buzzPage";
import { MyInfoPage } from "src/pages/MyInfoPage";



test.describe("Yaksha", () => {
 let loginPage: LoginPage;
 let myinfoPage : MyInfoPage;
 let adminPage : AdminPage ;
 let buzzPage: buzzpage;
 

  test.beforeEach(async ({ page, baseURL }) => {
    await page.goto("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login");
    loginPage = new LoginPage(page);
    myinfoPage= new MyInfoPage(page); 
    adminPage = new AdminPage(page);
    buzzPage = new buzzpage(page);
  });

 

  test("1_VerifyProfilePic", async ({ page }) => {
    await loginPage.performLogin();
    await myinfoPage.myinfo();
    console.log("first test case");
  });

  test("TS-2 Verify Admin can edit records ", async ({
    page,
  }) => {
    await loginPage.performLogin();
    await adminPage.AdminEdit();

  });

  test("TS-3 verify admin can sort the record", async ({
    page,
  }) => {
    await loginPage.performLogin();
    const trimmedRoles = await adminPage.admitSort();

    assertSortedList(trimmedRoles);
    console.log("Admin can sort the record successfully");
    
  });

  test("TS-4 Verify new Tab opens on clicking the Upgrade button", async ({
    page,
  }) => {
    
    await loginPage.performLogin();
    const title = await adminPage.upgrade();
    expect(title).toBe(newPageTitle);
  });

 test("TS-5 Verify tooltip shows up when hovered over 'Help' button ", async ({
    page,
  }) => {
    await loginPage.performLogin();
    const tooltipText = await myinfoPage.helpHover();
    expect(tooltipText).toBe('Help'); 
  });

  

  test("TS-6 Verify admin Seaarch Functionality", async ({ page }) => {
    await loginPage.performLogin();
    const roles = await adminPage.adminSearchh();
    for (const role of roles) {
      expect(role.trim()).toBe('Admin');
    }

  });

  test("TS-7	Verify Image could be dragged and dropped in Buzz", async ({page}) => {
    await loginPage.performLogin();
    await buzzPage.SharePhotoPost();
    
    console.log("Image dragged and dropped successfully");
  });

  test("TS-8 Verify Like button is Functional ", async ({
    page,
  }) => {
    await loginPage.performLogin();
    const { initialNumber, updatedNumber } = await buzzPage.likePost();
  await assertLikeCountIncreased(initialNumber, updatedNumber);
  });

  test("TS-9 Verify the Comment could be added to a post	", async ({
    page,
  }) => {
    await loginPage.performLogin();
    const commentText = 'This is a test comment';
  const postedComment = await buzzPage.addCommentToPost(commentText);
  assertCommentIsPosted(postedComment, commentText);
  });

  test("TS-10 Verify Edit Post Functionality	", async ({
    page,
  }) => {
    await loginPage.performLogin();
    const updatedText = await buzzPage.editPost();
  
  assertEditedPost(updatedText, editPostText);
   
  });
});

/**
 * ------------------------------------------------------Helper Methods----------------------------------------------------
 */
async function assertSortedList(actualList: string[]) {
  for (let i = 0; i < actualList.length - 1; i++) {
    if (actualList[i].localeCompare(actualList[i + 1]) > 0) {
      throw new Error(
        `List is not sorted at index ${i}: '${actualList[i]}' > '${actualList[i + 1]}'`
      );
    }
  }
}

const editPostText = "this is edit post comment";

const newPageTitle = "Upgrade to Advanced from Open Source | OrangeHRM HR Software";


async function assertLikeCountIncreased(initial: number, updated: number) {
  console.log(`Like count increased from ${initial} to ${updated}`);
  expect(updated).toBe(initial + 1);
}

async function assertCommentIsPosted(actual: string, expected: string) {
  expect(actual).toBe(expected);
}
export function assertEditedPost(actual: string, expected: string) {
  expect(actual).toBe(expected);
}

//-----