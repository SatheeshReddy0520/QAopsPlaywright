const { test, expect } = require('@playwright/test');
const { ALL } = require('node:dns');
const { request } = require('node:http');



test('Ui Test', async ({ browser }) => {

  const context = await browser.newContext();
  const page = await context.newPage();
 
  await page.route('**\/*.css', route => route.abort());
  // await page.route('**\/*.{jpg,png,jpeg}', route => route.abort());
  await page.on('request',request=> console.log(request.url()));
  await page.on('response',Response=> console.log(Response.url(),Response.status()));


  const psd = page.locator("[name='password']");
  const clicklogin = page.locator("[type='submit']");
  const dropdown = page.locator("select.form-control");
  const dclink1 = page.locator("[href*='documents-request']");
  const dclink2 = page.locator("[href*='techsmarthire']");

  await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
  
  await page.locator("#username").fill("rahulshettyacademy");
  await psd.fill("Learning@830$3mK2");
  await dropdown.selectOption("Teacher");
  await page.locator("label .checkmark").last().click();
  await page.locator("#okayBtn").click();

  //verify its selected or not 
  console.log(await page.locator("label .checkmark").last().isChecked());
  await expect(page.locator("label .checkmark").last()).toBeChecked(); // it returns boolean value

  await page.locator("#terms").click();
  //verify its checked and unchecked  
  console.log(await expect(page.locator("#terms").isChecked()));
  await page.locator("#terms").uncheck();
  expect(await page.locator("#terms").isChecked()).toBeFalsy();

  await expect(dclink1).toHaveAttribute("class", "blinkingText");
  await expect(dclink2).toHaveAttribute("class", "blinkingText");




  //await page.pause();  // it is holds the page 


});


test('Test Case 2', async ({ page }) => {

  const psd = page.locator("[name='password']");
  const clicklogin = page.locator("[type='submit']");
  const cardtitles = page.locator(".card-body a");

  await page.goto("https://rahulshettyacademy.com/loginpagePractise/");



  console.log(await page.title());
  await expect(page).toHaveTitle("LoginPage Practise | Rahul Shetty Academy");
  await page.locator("#username").fill("rahulshettyacademy");
  await psd.fill('Learningggg');
  await page.locator("#terms").click();
  await clicklogin.click();
  console.log(await page.locator("[style*='block;']").textContent());
  await expect(page.locator("[style*='block;']")).toContainText('Incorrect');
  await psd.fill("");
  await psd.fill("Learning@830$3mK2");
  await clicklogin.click();

  //Print elemets in a 2 ways----
  // 1st Way----
  //console.log((await cardtitles).first().textContent());
  //await expect(cardtitles).toContainText("iphone X");
  // 2nd Way----
  //console.log(await cardtitles.nth(1).textContent());
  //await expect(cardtitles).toContainText("Samsung Note 8");

  // Grab All elements in a list 

  const AllItems = await cardtitles.allTextContents();
  console.log(AllItems);

});

test("Windows Handling", async ({ browser }) => {

  const context = await browser.newContext();
  const page = await context.newPage();

  const dclink1 = page.locator("[href*='documents-request']");
  const dclink2 = page.locator("[href*='techsmarthire']");

  await page.goto("https://rahulshettyacademy.com/loginpagePractise/");

  const [newpage] = await Promise.all([
    context.waitForEvent("page"),
    dclink1.click()
  ])

  const text = await newpage.locator("p.red").textContent();
  const arraytext = await text.split("@");
  const domaintext = await arraytext[1].split(" ")[0];
  console.log(domaintext);

  await page.locator("#username").fill(domaintext);
  console.log(page.locator("#username").inputValue());

  await page.pause();





});

