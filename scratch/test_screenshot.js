const puppeteer = require('puppeteer');
const path = require('path');

async function run() {
  console.log("📸 Taking fresh debug screenshot...");
  const browser = await puppeteer.launch({
    headless: "new",
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });

  try {
    await page.goto('http://localhost:3000/company/about-us', { waitUntil: 'networkidle0', timeout: 60000 });
  } catch (e) {
    console.log("Wait until networkidle0 timed out, falling back...");
    await page.goto('http://localhost:3000/company/about-us', { waitUntil: 'domcontentloaded', timeout: 30000 });
  }
  
  // Extra wait to make sure everything compiles and compiles
  await new Promise(r => setTimeout(r, 6000));

  await page.evaluate(() => {
    document.documentElement.classList.add('light');
  });
  await new Promise(r => setTimeout(r, 2000));

  await page.screenshot({ path: path.join(__dirname, '..', 'screenshot_debug_real.png') });
  console.log("✅ Saved screenshot_debug_real.png");

  await browser.close();
}

run();
