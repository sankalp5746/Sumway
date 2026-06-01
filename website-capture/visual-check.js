const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });

  async function checkPage(page, url, label) {
    await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 20000 });
    await page.waitForTimeout(1500);
    return await page.evaluate((lbl) => {
      const issues = [];
      const nav = document.querySelector('header');
      const navH = nav ? nav.getBoundingClientRect().height : 0;
      const navInner = document.querySelector('header > div');
      const navInnerS = navInner ? window.getComputedStyle(navInner) : {};

      issues.push(`[${lbl}] navbar h=${Math.round(navH)}px pl=${navInnerS.paddingLeft}`);

      // Check overflow
      if (document.documentElement.scrollWidth > window.innerWidth + 2) {
        issues.push(`[${lbl}] OVERFLOW: scrollW=${document.documentElement.scrollWidth} > ${window.innerWidth}`);
      }

      // Check h1
      const h1 = document.querySelector('h1');
      if (h1) {
        const r = h1.getBoundingClientRect();
        const s = window.getComputedStyle(h1);
        issues.push(`[${lbl}] h1: top=${Math.round(r.top)} fontSize=${s.fontSize} right=${Math.round(r.right)} viewW=${window.innerWidth}`);
        if (r.right > window.innerWidth + 5) issues.push(`[${lbl}] H1 OVERFLOWS RIGHT`);
      }

      // Check first section
      const firstSection = document.querySelector('section');
      if (firstSection) {
        const r = firstSection.getBoundingClientRect();
        issues.push(`[${lbl}] firstSection: top=${Math.round(r.top)} h=${Math.round(r.height)}`);
      }

      // Check all h2s for overflow
      document.querySelectorAll('h2').forEach((h, i) => {
        const r = h.getBoundingClientRect();
        if (r.right > window.innerWidth + 5) {
          issues.push(`[${lbl}] H2[${i}] OVERFLOWS: right=${Math.round(r.right)} text="${h.textContent?.substring(0,30)}"`);
        }
      });

      // Check containers
      const containers = document.querySelectorAll('.max-w-7xl');
      if (containers.length > 0) {
        const r = containers[0].getBoundingClientRect();
        const s = window.getComputedStyle(containers[0]);
        issues.push(`[${lbl}] container[0]: left=${Math.round(r.left)} pl=${s.paddingLeft} w=${Math.round(r.width)}`);
      }

      // Check light mode text colors
      const bodyColor = window.getComputedStyle(document.body).color;
      issues.push(`[${lbl}] body color=${bodyColor}`);

      return issues;
    }, label);
  }

  // Desktop dark
  const desktop = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  const homeIssues = await checkPage(desktop, 'http://localhost:3000', 'HOME-DARK');
  homeIssues.forEach(i => console.log(i));

  // Mobile
  const mobile = await browser.newPage({ viewport: { width: 390, height: 844 }, isMobile: true });
  const mobileIssues = await checkPage(mobile, 'http://localhost:3000', 'HOME-MOBILE');
  mobileIssues.forEach(i => console.log(i));

  // Light mode
  const lightPage = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await lightPage.goto('http://localhost:3000', { waitUntil: 'domcontentloaded', timeout: 20000 });
  await lightPage.waitForTimeout(1000);
  await lightPage.evaluate(() => document.documentElement.classList.add('light'));
  await lightPage.waitForTimeout(300);
  const lightIssues = await lightPage.evaluate(() => {
    const issues = [];
    const body = window.getComputedStyle(document.body);
    issues.push(`[LIGHT] body bg=${body.backgroundColor} color=${body.color}`);
    // Check heading colors
    document.querySelectorAll('h1,h2,h3').forEach((h, i) => {
      if (i > 5) return;
      const s = window.getComputedStyle(h);
      issues.push(`[LIGHT] ${h.tagName}[${i}]: color=${s.color} text="${h.textContent?.substring(0,25)}"`);
    });
    // Check paragraph colors
    document.querySelectorAll('p').forEach((p, i) => {
      if (i > 3) return;
      const s = window.getComputedStyle(p);
      issues.push(`[LIGHT] P[${i}]: color=${s.color} text="${p.textContent?.substring(0,25)}"`);
    });
    // Check nav links
    const navLinks = document.querySelectorAll('header a, header button');
    navLinks.forEach((el, i) => {
      if (i > 4) return;
      const s = window.getComputedStyle(el);
      issues.push(`[LIGHT] NAV[${i}]: color=${s.color} text="${el.textContent?.substring(0,20)}"`);
    });
    return issues;
  });
  lightIssues.forEach(i => console.log(i));

  // Contact page
  const contactIssues = await checkPage(desktop, 'http://localhost:3000/contact', 'CONTACT');
  contactIssues.forEach(i => console.log(i));

  await browser.close();
})();
