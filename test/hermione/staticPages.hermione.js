describe("Статичные страницы", async function () {
  it("Главная страница должна иметь статичное содержание", async function () {
    const browser = this.browser;
    const puppeteer = await browser.getPuppeteer();
    const [page] = await puppeteer.pages();

    await page.setViewport({ width: 1200, height: 1024 });

    await browser.url("http://localhost:3000/hw/store");

    await page.waitForSelector(".Home");
    await browser.assertView("plain", ".Home");
  });

  it("Страница с информацией о доставке должна иметь статичное содержание", async function () {
    const browser = this.browser;
    const puppeteer = await browser.getPuppeteer();
    const [page] = await puppeteer.pages();

    await page.setViewport({ width: 1200, height: 1024 });

    await browser.url("http://localhost:3000/hw/store/delivery");

    await page.waitForSelector(".Delivery");
    await browser.assertView("plain", ".Delivery");
  });

  it("Страница с контактами должна иметь статичное содержание", async function () {
    const browser = this.browser;
    const puppeteer = await browser.getPuppeteer();
    const [page] = await puppeteer.pages();

    await page.setViewport({ width: 1200, height: 1024 });

    await browser.url("http://localhost:3000/hw/store/contacts");

    await page.waitForSelector(".Contacts");
    await browser.assertView("plain", ".Contacts");
  });
});
