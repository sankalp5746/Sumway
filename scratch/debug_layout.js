const puppeteer = require('puppeteer');

async function run() {
  console.log("🕵️‍♂️ Auditing layout positions...");
  const browser = await puppeteer.launch({
    headless: "new",
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });

  await page.goto('http://localhost:3000/company/about-us', { waitUntil: 'domcontentloaded', timeout: 30000 });
  await new Promise(r => setTimeout(r, 2000));

  const data = await page.evaluate(() => {
    const header = document.querySelector('header');
    const hero = document.querySelector('section');
    const breadnav = document.querySelector('nav[aria-label="Breadcrumb"]');
    const h1 = document.querySelector('h1');

    return {
      header: header ? {
        className: header.className,
        offsetTop: header.offsetTop,
        offsetHeight: header.offsetHeight,
        position: window.getComputedStyle(header).position,
        height: window.getComputedStyle(header).height,
      } : null,
      hero: hero ? {
        className: hero.className,
        offsetTop: hero.offsetTop,
        offsetHeight: hero.offsetHeight,
        paddingTop: window.getComputedStyle(hero).paddingTop,
        marginTop: window.getComputedStyle(hero).marginTop,
      } : null,
      breadnav: breadnav ? {
        offsetTop: breadnav.offsetTop,
        offsetHeight: breadnav.offsetHeight,
        marginTop: window.getComputedStyle(breadnav).marginTop,
        position: window.getComputedStyle(breadnav).position,
      } : null,
      h1: h1 ? {
        innerText: h1.innerText,
        offsetTop: h1.offsetTop,
        offsetHeight: h1.offsetHeight,
      } : null,
    };
  });

  console.log("Layout Data:\n", JSON.stringify(data, null, 2));
  await browser.close();
}

run();
