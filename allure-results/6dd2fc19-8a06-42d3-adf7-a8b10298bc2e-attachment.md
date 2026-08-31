# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: UiTest.spec.js >> @web Test Case 2
- Location: tests\UiTest.spec.js:54:1

# Error details

```
Test timeout of 30000ms exceeded.
```

```
Error: locator.textContent: Test timeout of 30000ms exceeded.
Call log:
  - waiting for locator('[style*=\'block;\']')

```

# Page snapshot

```yaml
- generic [ref=e1]:
  - generic [ref=e2]:
    - link "Free Access to InterviewQues/ResumeAssistance/Material" [ref=e3] [cursor=pointer]:
      - /url: https://rahulshettyacademy.com/documents-request
    - link "Get Shortlisted by Recruiters - Take QA Skill Assessments on TechSmartHire" [ref=e4] [cursor=pointer]:
      - /url: https://techsmarthire.com/
  - generic [ref=e5]:
    - heading [level=3] [ref=e6]:
      - img [ref=e8]
    - generic [ref=e14]:
      - generic [ref=e15]:
        - generic [ref=e16]: "Username:"
        - textbox "Username:" [ref=e17]: rahulshettyacademy
      - generic [ref=e18]:
        - generic [ref=e19]: "Password:"
        - textbox "Password:" [ref=e20]: Learningggg
      - generic [ref=e22]:
        - generic [ref=e23] [cursor=pointer]:
          - text: Admin
          - radio "Admin" [checked] [ref=e24]
        - generic [ref=e26] [cursor=pointer]:
          - text: User
          - radio "User" [ref=e27]
      - combobox [ref=e30]:
        - option "Student" [selected]
        - option "Teacher"
        - option "Consultant"
      - generic [ref=e31]:
        - generic [ref=e32]:
          - checkbox "I Agree to the terms and conditions" [checked] [ref=e34]
          - generic [ref=e35]:
            - text: I Agree to the
            - link "terms and conditions" [ref=e36] [cursor=pointer]:
              - /url: "#"
        - button "Sign In" [active] [ref=e37] [cursor=pointer]
      - paragraph [ref=e39]:
        - text: (username is
        - generic [ref=e40]: rahulshettyacademy
        - text: and Password is
        - generic [ref=e41]: Learning@830$3mK2
        - text: )
```

# Test source

```ts
  1   | const { test, expect } = require('@playwright/test');
  2   | const { ALL } = require('node:dns');
  3   | const { request } = require('node:http');
  4   | 
  5   | 
  6   | 
  7   | test('@web Ui Test', async ({ browser }) => {
  8   | 
  9   |   const context = await browser.newContext();
  10  |   const page = await context.newPage();
  11  |  
  12  |   await page.route('**\/*.css', route => route.abort());
  13  |   // await page.route('**\/*.{jpg,png,jpeg}', route => route.abort());
  14  |   await page.on('request',request=> console.log(request.url()));
  15  |   await page.on('response',Response=> console.log(Response.url(),Response.status()));
  16  | 
  17  | 
  18  |   const psd = page.locator("[name='password']");
  19  |   const clicklogin = page.locator("[type='submit']");
  20  |   const dropdown = page.locator("select.form-control");
  21  |   const dclink1 = page.locator("[href*='documents-request']");
  22  |   const dclink2 = page.locator("[href*='techsmarthire']");
  23  | 
  24  |   await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
  25  |   
  26  |   await page.locator("#username").fill("rahulshettyacademy");
  27  |   await psd.fill("Learning@830$3mK2");
  28  |   await dropdown.selectOption("Teacher");
  29  |   await page.locator("label .checkmark").last().click();
  30  |   await page.locator("#okayBtn").click();
  31  | 
  32  |   //verify its selected or not 
  33  |   console.log(await page.locator("label .checkmark").last().isChecked());
  34  |   await expect(page.locator("label .checkmark").last()).toBeChecked(); // it returns boolean value
  35  | 
  36  |   await page.locator("#terms").click();
  37  |   //verify its checked and unchecked  
  38  |   console.log(await expect(page.locator("#terms").isChecked()));
  39  |   await page.locator("#terms").uncheck();
  40  |   expect(await page.locator("#terms").isChecked()).toBeFalsy();
  41  | 
  42  |   await expect(dclink1).toHaveAttribute("class", "blinkingText");
  43  |   await expect(dclink2).toHaveAttribute("class", "blinkingText");
  44  | 
  45  | 
  46  | 
  47  | 
  48  |   //await page.pause();  // it is holds the page 
  49  | 
  50  | 
  51  | });
  52  | 
  53  | 
  54  | test('@web Test Case 2', async ({ page }) => {
  55  | 
  56  |   const psd = page.locator("[name='password']");
  57  |   const clicklogin = page.locator("[type='submit']");
  58  |   const cardtitles = page.locator(".card-body a");
  59  | 
  60  |   await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
  61  | 
  62  | 
  63  | 
  64  |   console.log(await page.title());
  65  |   await expect(page).toHaveTitle("LoginPage Practise | Rahul Shetty Academy");
  66  |   await page.locator("#username").fill("rahulshettyacademy");
  67  |   await psd.fill('Learningggg');
  68  |   await page.locator("#terms").click();
  69  |   await clicklogin.click();
> 70  |   console.log(await page.locator("[style*='block;']").textContent());
      |                                                       ^ Error: locator.textContent: Test timeout of 30000ms exceeded.
  71  |   await expect(page.locator("[style*='block;']")).toContainText('Incorrect');
  72  |   await psd.fill("");
  73  |   await psd.fill("Learning@830$3mK2");
  74  |   await clicklogin.click();
  75  | 
  76  |   //Print elemets in a 2 ways----
  77  |   // 1st Way----
  78  |   //console.log((await cardtitles).first().textContent());
  79  |   //await expect(cardtitles).toContainText("iphone X");
  80  |   // 2nd Way----
  81  |   //console.log(await cardtitles.nth(1).textContent());
  82  |   //await expect(cardtitles).toContainText("Samsung Note 8");
  83  | 
  84  |   // Grab All elements in a list 
  85  | 
  86  |   const AllItems = await cardtitles.allTextContents();
  87  |   console.log(AllItems);
  88  | 
  89  | });
  90  | 
  91  | test("Windows Handling", async ({ browser }) => {
  92  | 
  93  |   const context = await browser.newContext();
  94  |   const page = await context.newPage();
  95  | 
  96  |   const dclink1 = page.locator("[href*='documents-request']");
  97  |   const dclink2 = page.locator("[href*='techsmarthire']");
  98  | 
  99  |   await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
  100 | 
  101 |   const [newpage] = await Promise.all([
  102 |     context.waitForEvent("page"),
  103 |     dclink1.click()
  104 |   ])
  105 | 
  106 |   const text = await newpage.locator("p.red").textContent();
  107 |   const arraytext = await text.split("@");
  108 |   const domaintext = await arraytext[1].split(" ")[0];
  109 |   console.log(domaintext);
  110 | 
  111 |   await page.locator("#username").fill(domaintext);
  112 |   console.log(page.locator("#username").inputValue());
  113 | 
  114 |   await page.pause();
  115 | 
  116 | 
  117 | 
  118 | 
  119 | 
  120 | });
  121 | 
  122 | 
```