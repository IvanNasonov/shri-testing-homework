describe("Шапка", async function () {
  it("должна при разрешении меньше 576px кнопки навигации должны прятаться в гамбургер", async function () {
    const browser = this.browser;
    const puppeteer = await browser.getPuppeteer();
    const [page] = await puppeteer.pages();

    await page.setViewport({ width: 575, height: 1024 });

    await browser.url("http://localhost:3000/hw/store/catalog");

    await page.waitForSelector(".navbar");
    await browser.assertView("plain", ".navbar");
  });
});
