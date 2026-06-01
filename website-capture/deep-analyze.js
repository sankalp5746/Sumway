const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

  await page.goto('http://localhost:3000', { waitUntil: 'networkidle', timeout: 20000 });
  await page.waitForTimeout(1500);

  const data = await page.evaluate(() => {
    const results = {};

    // 1. Navbar exact measurements
    const header = document.querySelector('header');
    if (header) {
      const r = header.getBoundingClientRect();
      const s = window.getComputedStyle(header);
      results.navbar = {
        height: r.height,
        paddingTop: s.paddingTop,
        paddingBottom: s.paddingBottom,
        position: s.position,
        top: s.top,
        zIndex: s.zIndex,
        classes: header.className
      };
    }

    // 2. Hero section
    const hero = document.querySelector('section');
    if (hero) {
      const r = hero.getBoundingClientRect();
      const s = window.getComputedStyle(hero);
      results.hero = {
        top: r.top,
        height: r.height,
        paddingTop: s.paddingTop,
        marginTop: s.marginTop,
        classes: hero.className.substring(0, 120)
      };
    }

    // 3. All sections - top positions and heights
    results.sections = [];
    document.querySelectorAll('section').forEach((s, i) => {
      const r = s.getBoundingClientRect();
      const cs = window.getComputedStyle(s);
      results.sections.push({
        index: i,
        top: Math.round(r.top),
        height: Math.round(r.height),
        paddingTop: cs.paddingTop,
        paddingBottom: cs.paddingBottom,
        marginTop: cs.marginTop,
        classes: s.className.substring(0, 100)
      });
    });

    // 4. Check if content is hidden behind navbar
    results.contentBehindNavbar = [];
    const navHeight = document.querySelector('header')?.getBoundingClientRect().height || 0;
    document.querySelectorAll('h1, h2').forEach(el => {
      const r = el.getBoundingClientRect();
      if (r.top < navHeight && r.top > -100) {
        results.contentBehindNavbar.push({
          tag: el.tagName,
          top: Math.round(r.top),
          text: el.textContent?.substring(0, 60)
        });
      }
    });

    // 5. PageHero section specifically
    const pageHero = document.querySelector('[style*="paddingTop"]');
    if (pageHero) {
      const r = pageHero.getBoundingClientRect();
      results.pageHero = {
        top: r.top,
        paddingTop: pageHero.style.paddingTop,
        classes: pageHero.className.substring(0, 100)
      };
    }

    // 6. Check max-w containers alignment
    results.containers = [];
    document.querySelectorAll('.max-w-7xl').forEach((el, i) => {
      const r = el.getBoundingClientRect();
      const s = window.getComputedStyle(el);
      results.containers.push({
        index: i,
        left: Math.round(r.left),
        right: Math.round(r.right),
        width: Math.round(r.width),
        paddingLeft: s.paddingLeft,
        paddingRight: s.paddingRight
      });
    });

    // 7. Specific btn-primary in navbar
    const navBtn = document.querySelector('header .btn-primary');
    if (navBtn) {
      const r = navBtn.getBoundingClientRect();
      const s = window.getComputedStyle(navBtn);
      results.navBtn = {
        top: r.top, height: r.height,
        padding: s.padding,
        fontSize: s.fontSize
      };
    }

    // 8. Check for any elements with negative top or clipping
    results.clipped = [];
    document.querySelectorAll('*').forEach(el => {
      const s = window.getComputedStyle(el);
      if (s.overflow === 'hidden' || s.overflow === 'clip') {
        const r = el.getBoundingClientRect();
        if (r.height > 0 && r.height < 5 && r.width > 100) {
          results.clipped.push({
            tag: el.tagName,
            class: el.className.substring(0, 60),
            height: r.height
          });
        }
      }
    });

    return results;
  });

  console.log('=== HOMEPAGE DEEP ANALYSIS ===');
  console.log('\n--- NAVBAR ---');
  console.log(JSON.stringify(data.navbar, null, 2));
  console.log('\n--- HERO SECTION ---');
  console.log(JSON.stringify(data.hero, null, 2));
  console.log('\n--- ALL SECTIONS (first 6) ---');
  data.sections?.slice(0, 6).forEach(s => console.log(JSON.stringify(s)));
  console.log('\n--- CONTENT BEHIND NAVBAR ---');
  console.log(JSON.stringify(data.contentBehindNavbar, null, 2));
  console.log('\n--- CONTAINERS (first 4) ---');
  data.containers?.slice(0, 4).forEach(c => console.log(JSON.stringify(c)));
  console.log('\n--- NAV BUTTON ---');
  console.log(JSON.stringify(data.navBtn, null, 2));

  // Now check inner pages
  console.log('\n\n=== CONTACT PAGE ===');
  await page.goto('http://localhost:3000/contact', { waitUntil: 'networkidle', timeout: 20000 });
  await page.waitForTimeout(1000);

  const contactData = await page.evaluate(() => {
    const header = document.querySelector('header');
    const navH = header?.getBoundingClientRect().height || 0;
    const pageHeroSection = document.querySelector('section');
    const h1 = document.querySelector('h1');
    return {
      navbarHeight: navH,
      pageHeroTop: pageHeroSection?.getBoundingClientRect().top,
      pageHeroHeight: pageHeroSection?.getBoundingClientRect().height,
      pageHeroPaddingTop: pageHeroSection?.style?.paddingTop,
      h1Top: h1?.getBoundingClientRect().top,
      h1Text: h1?.textContent?.substring(0, 40),
      pageHeroClasses: pageHeroSection?.className?.substring(0, 120)
    };
  });
  console.log(JSON.stringify(contactData, null, 2));

  console.log('\n\n=== LOGIN PAGE ===');
  await page.goto('http://localhost:3000/login', { waitUntil: 'networkidle', timeout: 20000 });
  await page.waitForTimeout(1000);

  const loginData = await page.evaluate(() => {
    const header = document.querySelector('header');
    const navH = header?.getBoundingClientRect().height || 0;
    const pageHeroSection = document.querySelector('section');
    const h1 = document.querySelector('h1');
    const mainDiv = document.querySelector('main > div');
    return {
      navbarHeight: navH,
      mainDivTop: mainDiv?.getBoundingClientRect().top,
      pageHeroTop: pageHeroSection?.getBoundingClientRect().top,
      h1Top: h1?.getBoundingClientRect().top,
      h1Text: h1?.textContent?.substring(0, 40),
    };
  });
  console.log(JSON.stringify(loginData, null, 2));

  await browser.close();
})();
