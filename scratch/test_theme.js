const puppeteer = require('puppeteer');

async function run() {
  console.log("🕵️‍♂️ Auditing contact page styles...");
  const browser = await puppeteer.launch({
    headless: "new",
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });

  await page.goto('http://localhost:3000/contact', { waitUntil: 'domcontentloaded', timeout: 30000 });
  await new Promise(r => setTimeout(r, 2000));

  // Toggle theme to light
  await page.evaluate(() => {
    document.documentElement.classList.add('light');
  });
  await new Promise(r => setTimeout(r, 1000));

  const data = await page.evaluate(() => {
    const heading = document.querySelector('h3.font-display');
    const label = document.querySelector('label');

    return {
      heading: heading ? {
        innerText: heading.innerText,
        className: heading.className,
        color: window.getComputedStyle(heading).color,
      } : null,
      label: label ? {
        innerText: label.innerText,
        className: label.className,
        color: window.getComputedStyle(label).color,
      } : null,
      htmlClassList: document.documentElement.className,
    };
  });

  console.log("Contact Page Light Mode Styling:\n", JSON.stringify(data, null, 2));
  await browser.close();
}

run();
