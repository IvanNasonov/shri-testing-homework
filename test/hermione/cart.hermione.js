const mockCart = {
  key: "example-store-cart",
  data: {
    1: {
      name: "Test product 1",
      count: 3,
      price: 100,
    },
    2: {
      name: "Test product 2",
      count: 2,
      price: 150,
    },
  },
};

describe("Корзина", async function () {
  it("должна отображать информацию о товарах в корзине", async function () {
    const browser = this.browser;
    const puppeteer = await browser.getPuppeteer();
    const [page] = await puppeteer.pages();
    await page.setViewport({ width: 1000, height: 1024 });

    await browser.url("http://localhost:3000/hw/store");

    await page.evaluate((mockCart) => {
      localStorage.setItem(mockCart.key, JSON.stringify(mockCart.data));
    }, mockCart);

    await browser.url("http://localhost:3000/hw/store/cart");

    await page.waitForSelector(".Cart-Table", { timeout: 5000 });

    await browser.assertView("plain", ".Cart-Table");
  });
  it("должна отображать форму чекаута", async function () {
    const browser = this.browser;
    const puppeteer = await browser.getPuppeteer();
    const [page] = await puppeteer.pages();
    await page.setViewport({ width: 1000, height: 1024 });

    await browser.url("http://localhost:3000/hw/store");

    await page.evaluate((mockCart) => {
      localStorage.setItem(mockCart.key, JSON.stringify(mockCart.data));
    }, mockCart);

    await browser.url("http://localhost:3000/hw/store/cart");

    await page.waitForSelector(".Form", { timeout: 5000 });

    await browser.assertView("plain", ".Form");
  });
  it("должна отображать сообщение об успешном оформлении заказа с id заказа", async function () {
    const browser = this.browser;
    const puppeteer = await browser.getPuppeteer();
    const [page] = await puppeteer.pages();
    await page.setViewport({ width: 1000, height: 1024 });

    await browser.url("http://localhost:3000/hw/store");

    await page.evaluate((mockCart) => {
      localStorage.setItem(mockCart.key, JSON.stringify(mockCart.data));
    }, mockCart);

    await browser.url("http://localhost:3000/hw/store/cart");

    await page.waitForSelector(".Cart", { timeout: 5000 });

    const nameField = await page.waitForSelector(".Form-Field_type_name");
    await nameField.type("Иван Иванович");

    const phoneField = await page.waitForSelector(".Form-Field_type_phone");
    await phoneField.type("123-456-1234");

    const addressField = await page.waitForSelector(".Form-Field_type_address");
    await addressField.type("ул. Уличная");

    await page.setRequestInterception(true);
    const mockResponse = {
      id: 1,
    };

    page.on("request", (interceptedRequest) => {
      if (interceptedRequest.url().endsWith("/checkout")) {
        interceptedRequest.respond({
          status: 200,
          body: JSON.stringify(mockResponse),
        });
      } else {
        interceptedRequest.continue();
      }
    });

    const checkoutButton = await page.waitForSelector(".Form-Submit");
    await checkoutButton.click();

    await browser.assertView("plain", ".Cart-SuccessMessage");
  });
  it("должна сохраняться при рефреше", async function () {
    const browser = this.browser;
    const puppeteer = await browser.getPuppeteer();
    const [page] = await puppeteer.pages();

    await page.setViewport({ width: 1000, height: 1024 });

    await browser.url("http://localhost:3000/hw/store/catalog");

    await page.waitForSelector(".ProductItem", { timeout: 5000 });

    await page.click(".ProductItem-DetailsLink");

    await page.waitForSelector(".Product", { timeout: 5000 });

    await page.click(".ProductDetails-AddToCart");
    await page.click(".ProductDetails-AddToCart");

    const cart = await page.$('[data-testid="cart-link"]', {
      timeout: 5000,
    });

    const cartText = await cart.evaluate((el) => el.textContent);

    await page.reload();

    const cartAfterRefresh = await page.waitForSelector(
      '[data-testid="cart-link"]',
      {
        timeout: 5000,
      }
    );

    const cartTextAfterRefresh = await cartAfterRefresh.evaluate(
      (el) => el.textContent
    );

    expect(cartTextAfterRefresh === cartText);
  });
});
