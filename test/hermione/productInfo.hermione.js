describe("Информация о продукте", async function () {
  it("должна отображаться информация о товаре", async function () {
    const browser = this.browser;
    const puppeteer = await browser.getPuppeteer();
    const [page] = await puppeteer.pages();

    await page.setViewport({ width: 1000, height: 1024 });

    await browser.url("http://localhost:3000/hw/store/catalog");

    await page.waitForSelector(".ProductItem", { timeout: 5000 });

    await page.setRequestInterception(true);

    const mockResponse = {
      id: 0,
      name: "Handmade Car",
      description:
        "The automobile layout consists of a front-engine design, with transaxle-type transmissions mounted at the rear of the engine and four wheel drive",
      price: 61,
      color: "lavender",
      material: "Granite",
    };

    page.on("request", (interceptedRequest) => {
      if (interceptedRequest.url().includes("api/products/")) {
        interceptedRequest.respond({
          status: 200,
          body: JSON.stringify(mockResponse),
        });
      } else {
        interceptedRequest.continue();
      }
    });

    await page.click(".ProductItem-DetailsLink");

    await page.waitForSelector(".Product", { timeout: 5000 });

    await browser.assertView("plain", ".Product");
  });
  it("id продукта на который мы перешли должен соответствовать id продукта который возвращает сервер", async function () {
    const browser = this.browser;
    const puppeteer = await browser.getPuppeteer();
    const [page] = await puppeteer.pages();

    await page.setViewport({ width: 1000, height: 1024 });

    await browser.url("http://localhost:3000/hw/store/catalog");

    await page.waitForSelector(".ProductItem", { timeout: 5000 });

    await page.click(".ProductItem-DetailsLink");

    const splitUrl = page.url().split("/");
    const productId = splitUrl[splitUrl.length - 1];

    const productResponse = await page.waitForResponse(
      `http://localhost:3000/hw/store/api/products/${productId}`
    );

    const productData = await productResponse.json();

    expect(productData.id === productId);
  });
});
