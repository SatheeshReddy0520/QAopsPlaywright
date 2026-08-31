import { test as base } from "@playwright/test";

type TestDataForOrder = {
  username: string;
  password: string;
  productName: string;
};

type CustomFixtures = {
  testDataForOrder: TestDataForOrder;
};

export const customtest = base.extend<CustomFixtures>({
  testDataForOrder: {
    username: "satheeshreddy0520@gmail.com",
    password: "@Reddys143",
    productName: "ADIDAS ORIGINAL",
  },
});
