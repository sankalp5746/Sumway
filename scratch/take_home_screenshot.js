const puppeteer = require('puppeteer');
const path = require('path');

const artifactDir = 'C:\\Users\\Sankalp.Bendale\\.gemini\\antigravity-ide\\brain\\4e3e4878-42c5-41c8-a905-99ae5f86ef85';

async function run() {
  console.log("📸 Capturing screenshots...");
  const browser = await puppeteer.launch({
    headless: "new",
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });

  const pages = [
    { name: 'homepage', url: 'http://localhost:3000' },
    { name: 'about_us', url: 'http://localhost:3000/company/about-us' },
    { name: 'contact', url: 'http://localhost:3000/contact' },
  ];

  for (const p of pages) {
    // Dark mode viewport
    try {
      await page.goto(p.url, { waitUntil: 'networkidle2', timeout: 120000 });
      await page.evaluate(() => document.documentElement.classList.remove('light'));
      await new Promise(r => setTimeout(r, 3000));
      await page.screenshot({ path: path.join(artifactDir, `screenshot_${p.name}_dark.png`) });
      console.log(`✅ ${p.name} dark viewport`);
      // Full page screenshot
      await page.screenshot({ path: path.join(artifactDir, `screenshot_${p.name}_dark_full.png`), fullPage: true });
      console.log(`✅ ${p.name} dark full page`);
    } catch (err) {
      console.log(`❌ Error ${p.name} dark:`, err.message);
    }

    // Light mode viewport
    try {
      await page.evaluate(() => document.documentElement.classList.add('light'));
      await new Promise(r => setTimeout(r, 1500));
      await page.screenshot({ path: path.join(artifactDir, `screenshot_${p.name}_light.png`) });
      console.log(`✅ ${p.name} light viewport`);
    } catch (err) {
      console.log(`❌ Error ${p.name} light:`, err.message);
    }
  }

  await browser.close();
  console.log("🎉 Capture complete.");
}

run();
