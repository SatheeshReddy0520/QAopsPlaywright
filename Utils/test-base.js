const base=require('@playwright/test');

exports.customtest=base.test.extend(
    {
  testDataForOrder : {
    username : "satheeshreddy0520@gmail.com",
    password :"@Reddys143",
    productName : "ADIDAS ORIGINAL"

  }

    }


);
