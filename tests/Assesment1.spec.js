const { test, expect } =require('@playwright/test');

test('test', async ({ page }) => {
  await page.goto('https://eventhub.rahulshettyacademy.com/login');
  await page.getByRole('textbox', { name: 'Email' }).fill("satheeshreddy0@gmail.com")
  await page.getByRole('textbox', { name: 'Password' }).fill("@Reddys123")
  await page.getByRole('button', { name: 'Sign In' }).click();
  await page.locator("#nav-events").click();
  await page.getByText("Add New Event").click();
  await page.locator("input[placeholder='Event title']").fill("Sports Club");
  await page.locator("textarea[placeholder='Describe the event…']").fill("sports Meeting");
  await page.locator('#category').selectOption("Sports");
  await page.locator("#city").fill("Hyderabad");
  await page.locator("#venue").fill("disco pub,Hyderabad");
  await page.locator("input[type='datetime-local']").click();





  await page.locator("input[id='price-($)']").fill("20");
  await page.locator("input[id='total-seats']").fill("50");
  await page.getByText('+ Add Event').click();
    
  

});