const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

  await page.goto('http://localhost:3000', { waitUntil: 'networkidle', timeout: 20000 });
  await page.waitForTimeout(1500);

  const data = await page.evaluate(() => {
    const results = {};

    // Check every max-w-7xl with px-6
    results.maxwContainers = [];
    document.querySelectorAll('[class*="max-w-7xl"]').forEach((el, i) => {
      const s = window.getComputedStyle(el);
      const r = el.getBoundingClientRect();
      results.maxwContainers.push({
        i,
        classes: el.className.substring(0, 150),
        paddingLeft: s.paddingLeft,
        paddingRight: s.paddingRight,
        left: Math.round(r.left),
        width: Math.round(r.width)
      });
    });

    // Check a specific px-6 element
    results.px6Elements = [];
    document.querySelectorAll('[class*="px-6"]').forEach((el, i) => {
      if (i > 5) return;
      const s = window.getComputedStyle(el);
      results.px6Elements.push({
        i,
        tag: el.tagName,
        classes: el.className.substring(0, 100),
        computedPaddingLeft: s.paddingLeft,
        computedPaddingRight: s.paddingRight
      });
    });

    // Check what CSS variables are set
    const rootStyle = window.getComputedStyle(document.documentElement);
    results.cssVars = {
      background: rootStyle.getPropertyValue('--background'),
      foreground: rootStyle.getPropertyValue('--foreground'),
    };

    // Check if Tailwind spacing scale is working at all
    const testEl = document.createElement('div');
    testEl.className = 'px-6';
    testEl.style.position = 'absolute';
    testEl.style.visibility = 'hidden';
    document.body.appendChild(testEl);
    const testStyle = window.getComputedStyle(testEl);
    results.tailwindPx6Test = {
      paddingLeft: testStyle.paddingLeft,
      paddingRight: testStyle.paddingRight
    };
    document.body.removeChild(testEl);

    // Check p-6 test
    const testEl2 = document.createElement('div');
    testEl2.className = 'p-6';
    testEl2.style.position = 'absolute';
    testEl2.style.visibility = 'hidden';
    document.body.appendChild(testEl2);
    const testStyle2 = window.getComputedStyle(testEl2);
    results.tailwindP6Test = {
      padding: testStyle2.padding
    };
    document.body.removeChild(testEl2);

    // Check navbar inner div
    const navInner = document.querySelector('header > div');
    if (navInner) {
      const s = window.getComputedStyle(navInner);
      const r = navInner.getBoundingClientRect();
      results.navInner = {
        classes: navInner.className.substring(0, 150),
        paddingLeft: s.paddingLeft,
        paddingRight: s.paddingRight,
        left: Math.round(r.left),
        right: Math.round(r.right),
        width: Math.round(r.width)
      };
    }

    // Check hero inner div
    const heroInner = document.querySelector('section > div.relative.z-10');
    if (heroInner) {
      const s = window.getComputedStyle(heroInner);
      const r = heroInner.getBoundingClientRect();
      results.heroInner = {
        classes: heroInner.className.substring(0, 150),
        paddingLeft: s.paddingLeft,
        paddingRight: s.paddingRight,
        left: Math.round(r.left),
        width: Math.round(r.width)
      };
    }

    // Check what font is loading
    results.fontCheck = {
      bodyFont: window.getComputedStyle(document.body).fontFamily.substring(0, 80),
    };

    return results;
  });

  console.log('=== PADDING & TAILWIND CHECK ===\n');
  console.log('Tailwind px-6 test:', JSON.stringify(data.tailwindPx6Test));
  console.log('Tailwind p-6 test:', JSON.stringify(data.tailwindP6Test));
  console.log('\nCSS Vars:', JSON.stringify(data.cssVars));
  console.log('\nNav inner div:', JSON.stringify(data.navInner));
  console.log('\nHero inner div:', JSON.stringify(data.heroInner));
  console.log('\nFont:', JSON.stringify(data.fontCheck));
  console.log('\nFirst 4 max-w-7xl containers:');
  data.maxwContainers?.slice(0, 4).forEach(c => console.log(JSON.stringify(c)));
  console.log('\nFirst 4 px-6 elements:');
  data.px6Elements?.forEach(c => console.log(JSON.stringify(c)));

  await browser.close();
})();
