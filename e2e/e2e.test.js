import puppetteer from 'puppeteer';
import { fork } from 'child_process';

jest.setTimeout(9000); // default puppeteer timeout

describe('Popover interaction', () => {
  let browser = null;
  let page = null;
  let server = null;
  const baseUrl = 'http://localhost:9000';

  beforeAll(async () => {
    server = fork(`${__dirname}/e2e.server.js`);
    await new Promise((resolve, reject) => {
      server.on('error', reject);
      server.on('message', (message) => {
        if (message === 'ok') {
          resolve();
        }
      });
    });

    browser = await puppetteer.launch({
      // headless: false, // show gui
      // slowMo: 250,
      // devtools: true, // show devTools
    });
    page = await browser.newPage();
  });

  afterAll(async () => {
    await browser.close();
    server.kill();
  });

  test('popover appears on button click', async () => {
    await page.goto(baseUrl);
    await page.click('.pop-button');
    await page.waitForSelector('.pop-button.visible');
    const popoverVisible = await page.evaluate(() => {
      return document.querySelector('.pop-button.visible') !== null;
    });
    expect(popoverVisible).toBe(true);
  });

  test('popover disappears when button clicked again', async () => {
    await page.goto(baseUrl);
    await page.click('.pop-button');
    await page.waitForSelector('.pop-button.visible');
    await page.click('.pop-button');
    await page.waitForSelector('.pop-button:not(.visible)');
    const popoverVisible = await page.evaluate(() => {
      return document.querySelector('.pop-button.visible') !== null;
    });
    expect(popoverVisible).toBe(false);
  });
});
