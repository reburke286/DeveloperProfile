const puppeteer = require("puppeteer");
// const fs = require("fs-extra");
// const hbs = require("handlebars");

(async () => {
  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto("file:///C:/Users/rebur/DeveloperProfile/index.html");
    // await page.emulateMedia("screen");

    // console.info(page);

    await page.pdf({
      path: "developer.pdf",
      format: "A4"
    });

    await browser.close();
  } catch (e) {
    console.log("our error", e);
  }
})();
