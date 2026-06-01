const { chromium } = require('playwright');
const fs = require('fs');

(async () => {
  const browser = await chromium.launch({ headless: true });
  if (!fs.existsSync('screenshots')) fs.mkdirSync('screenshots');

  const urls = [
    { url: 'http://localhost:3000', name: 'home_desktop' },
    { url: 'http://localhost:3000/contact', name: 'contact_desktop' },
    { url: 'http://localhost:3000/login', name: 'login_desktop' },
    { url: 'http://localhost:3000/careers', name: 'careers_desktop' },
    { url: 'http://localhost:3000/blog', name: 'blog_desktop' },
    { url: 'http://localhost:3000/company/about-us', name: 'about_desktop' },
    { url: 'http://localhost:3000/services/staffing-solutions', name: 'service_desktop' },
  ];

  // Desktop
  const desktop = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  for (const { url, name } of urls) {
    console.log(`Capturing: ${url}`);
    try {
      await desktop.goto(url, { waitUntil: 'domcontentloaded', timeout: 20000 });
      await desktop.waitForTimeout(2000);
      await desktop.screenshot({ path: `screenshots/${name}.png`, fullPage: true });
      console.log(`  ✓ ${name}.png`);
    } catch(e) { console.log(`  ✗ ${e.message.substring(0,60)}`); }
  }

  // Mobile
  const mobile = await browser.newPage({ viewport: { width: 390, height: 844 }, isMobile: true });
  for (const { url, name } of urls.slice(0, 3)) {
    try {
      await mobile.goto(url, { waitUntil: 'domcontentloaded', timeout: 20000 });
      await mobile.waitForTimeout(2000);
      await mobile.screenshot({ path: `screenshots/${name.replace('desktop','mobile')}.png`, fullPage: true });
      console.log(`  ✓ mobile ${name}`);
    } catch(e) { console.log(`  ✗ mobile ${e.message.substring(0,60)}`); }
  }

  // Light mode
  const light = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  try {
    await light.goto('http://localhost:3000', { waitUntil: 'domcontentloaded', timeout: 20000 });
    await light.waitForTimeout(1500);
    await light.evaluate(() => document.documentElement.classList.add('light'));
    await light.waitForTimeout(500);
    await light.screenshot({ path: 'screenshots/home_light.png', fullPage: true });
    console.log('  ✓ home_light.png');
  } catch(e) { console.log(`  ✗ light ${e.message.substring(0,60)}`); }

  await browser.close();
  console.log('\nDone!');
})();
