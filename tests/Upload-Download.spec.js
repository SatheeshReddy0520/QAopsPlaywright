const Exceljs = require('exceljs');
const { test, expect } = require('@playwright/test');

async function Exceltest(searchtext, Replacetext, change, filepath) {


    const workbook = new Exceljs.Workbook();
    await workbook.xlsx.readFile(filepath);
    const worksheet = workbook.getWorksheet('Sheet1');

    const output = await ReadExceltest(worksheet, searchtext);

    const cell = worksheet.getCell(output.Row, output.coloumn + change.changecoloumn);
    cell.value = Replacetext;
    await workbook.xlsx.writeFile(filepath);
}

async function ReadExceltest(worksheet, searchtext) {
    let output = { Row: -1, coloumn: -1 };
    worksheet.eachRow((row, rownumber) => {
        row.eachCell((cell, cellnumber) => {

            if (cell.value === searchtext) {
                output.Row = rownumber;
                output.coloumn = cellnumber;
            }


        })

    })
    return output;
}

// Exceltest("Papaya", 300, { row: 0, changecoloumn: 2 }, "C:/Users/Pranavi Reddy/Downloads/download.xlsx");


test('Upload download validation Test', async ({ page }) => {
      const textsearch='Apple';
      const updatedvalue=1000;
    await page.goto("https://rahulshettyacademy.com/upload-download-test/");
    const downloadpromise = page.waitForEvent('download');
    await page.getByRole('button', { name: 'Download' }).click();

    const download = await downloadpromise;

    // have to use save as method otherwise it will won't save get error 
    await download.saveAs("C:/Users/Pranavi Reddy/Downloads/download.xlsx");

    await Exceltest(textsearch,updatedvalue, { row: 0, changecoloumn: 2 },"C:/Users/Pranavi Reddy/Downloads/download.xlsx");

    await page.locator('#fileinput').click();
    await page.locator('#fileinput').setInputFiles("C:/Users/Pranavi Reddy/Downloads/download.xlsx");
    await expect(page.getByText("Updated Excel Data Successfully.")).toBeVisible();
   
    const textlocator=  await page.getByText(textsearch);
     const desiredvalue= await page.getByRole('row').filter({has:textlocator});
    expect(await desiredvalue.locator("#cell-4-undefined")).toContainText(updatedvalue.toString());

   

})