describe("Продукт", async function () {
  it("должна отображать необходимые элементы", async function () {
    const browser = this.browser;
    const puppeteer = await browser.getPuppeteer();
    const [page] = await puppeteer.pages();

    await page.setViewport({ width: 575, height: 1024 });

    await browser.url("http://localhost:3000/hw/store/catalog");

    await page.waitForSelector(".ProductItem", { timeout: 5000 });
    await browser.assertView("plain", ".ProductItem", {
      ignoreElements: [".card-title", ".card-text"],
    });
  });
});
