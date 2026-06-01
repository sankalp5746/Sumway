const { chromium } = require('playwright');
const fs = require('fs');

(async () => {
  const browser = await chromium.launch({ headless: true });

  // Desktop viewport
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

  if (!fs.existsSync('screenshots')) fs.mkdirSync('screenshots');

  const urls = [
    'http://localhost:3000',
    'http://localhost:3000/company/about-us',
    'http://localhost:3000/company/leadership-team',
    'http://localhost:3000/company/mission-vision',
    'http://localhost:3000/company/why-choose-us',
    'http://localhost:3000/services/staffing-solutions',
    'http://localhost:3000/services/rpo',
    'http://localhost:3000/industries/bpo',
    'http://localhost:3000/solutions/workforce-management',
    'http://localhost:3000/careers',
    'http://localhost:3000/blog',
    'http://localhost:3000/contact',
    'http://localhost:3000/login',
    'http://localhost:3000/register',
  ];

  for (const url of urls) {
    console.log(`Capturing: ${url}`);
    try {
      await page.goto(url, { waitUntil: 'networkidle', timeout: 15000 });
      await page.waitForTimeout(1000);
      const name = url.replace('http://localhost:3000', '').replace(/\//g, '_') || '_home';
      await page.screenshot({ path: `screenshots/desktop${name}.png`, fullPage: true });
    } catch(e) {
      console.log(`  Failed: ${e.message}`);
    }
  }

  // Mobile viewport
  const mobile = await browser.newPage({ viewport: { width: 390, height: 844 }, isMobile: true });
  const mobileUrls = [
    'http://localhost:3000',
    'http://localhost:3000/contact',
    'http://localhost:3000/login',
  ];
  for (const url of mobileUrls) {
    console.log(`Mobile capturing: ${url}`);
    try {
      await mobile.goto(url, { waitUntil: 'networkidle', timeout: 15000 });
      await mobile.waitForTimeout(800);
      const name = url.replace('http://localhost:3000', '').replace(/\//g, '_') || '_home';
      await mobile.screenshot({ path: `screenshots/mobile${name}.png`, fullPage: true });
    } catch(e) {
      console.log(`  Failed: ${e.message}`);
    }
  }

  await browser.close();
  console.log('Done! Screenshots saved to ./screenshots/');
})();
