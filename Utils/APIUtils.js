class APiUtils {
  constructor(apiContext, loginPayload) {
    this.apiContext = apiContext;
    this.loginPayload = loginPayload;
  }

  async getToken() {
    const loginResponse = await this.apiContext.post(
      'https://rahulshettyacademy.com/api/ecom/auth/login',
      { data: this.loginPayload }
    );

    const responseBody = await loginResponse.json();

    if (!loginResponse.ok() || !responseBody.token) {
      throw new Error(
        `Login failed: ${JSON.stringify(responseBody)}`
      );
    }

    return responseBody.token;
  }

  async createOrder(orderPayload) {
    const token = await this.getToken();

    const orderResponse = await this.apiContext.post(
      'https://rahulshettyacademy.com/api/ecom/order/create-order',
      {
        data: orderPayload,
        headers: {
          Authorization: token,
          'Content-Type': 'application/json'
        }
      }
    );

    const responseBody = await orderResponse.json();

    if (!orderResponse.ok() || !responseBody.orders?.length) {
      throw new Error(
        `Order creation failed: ${JSON.stringify(responseBody)}`
      );
    }

    return {
      token,
      orderId: responseBody.orders[0]
    };
  }
}

module.exports = { APiUtils };
