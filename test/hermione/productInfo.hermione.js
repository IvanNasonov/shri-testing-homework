describe("Информация о продукте", async function () {
  it("должна отображать все необходимые элементы", async function () {
    const browser = this.browser;
    const puppeteer = await browser.getPuppeteer();
    const [page] = await puppeteer.pages();

    await page.setViewport({ width: 1000, height: 1024 });

    await browser.url("http://localhost:3000/hw/store/catalog");

    await page.waitForSelector(".ProductItem", { timeout: 5000 });

    await page.click(".ProductItem-DetailsLink");

    await page.waitForSelector(".Product", { timeout: 5000 });

    await browser.assertView("plain", ".Product", {
      ignoreElements: [
        ".ProductDetails-Name",
        ".ProductDetails-Description",
        ".ProductDetails-Price",
        ".ProductDetails-Color",
        ".ProductDetails-Material",
      ],
    });
  });
});
