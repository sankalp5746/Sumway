const { chromium } = require('playwright');
const fs = require('fs');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

  if (!fs.existsSync('screenshots')) fs.mkdirSync('screenshots');

  const urls = [
    { url: 'http://localhost:3000', name: 'home' },
    { url: 'http://localhost:3000/contact', name: 'contact' },
    { url: 'http://localhost:3000/login', name: 'login' },
    { url: 'http://localhost:3000/register', name: 'register' },
    { url: 'http://localhost:3000/careers', name: 'careers' },
    { url: 'http://localhost:3000/blog', name: 'blog' },
    { url: 'http://localhost:3000/company/about-us', name: 'about' },
    { url: 'http://localhost:3000/services/staffing-solutions', name: 'service' },
  ];

  const report = [];

  for (const { url, name } of urls) {
    console.log(`Analyzing: ${url}`);
    try {
      await page.goto(url, { waitUntil: 'networkidle', timeout: 20000 });
      await page.waitForTimeout(1500);

      // Capture screenshot as base64
      const screenshotBuffer = await page.screenshot({ fullPage: true });
      const base64 = screenshotBuffer.toString('base64');
      fs.writeFileSync(`screenshots/${name}.b64`, base64);

      // Also collect layout diagnostics
      const diagnostics = await page.evaluate(() => {
        const issues = [];

        // Check for horizontal overflow
        if (document.documentElement.scrollWidth > window.innerWidth) {
          issues.push(`OVERFLOW: page scrollWidth=${document.documentElement.scrollWidth} > innerWidth=${window.innerWidth}`);
        }

        // Check navbar
        const nav = document.querySelector('header');
        if (nav) {
          const r = nav.getBoundingClientRect();
          issues.push(`NAVBAR: height=${Math.round(r.height)}px, top=${Math.round(r.top)}px`);
        }

        // Check main content top padding (should clear navbar)
        const main = document.querySelector('main');
        if (main) {
          const firstChild = main.firstElementChild;
          if (firstChild) {
            const r = firstChild.getBoundingClientRect();
            issues.push(`MAIN_FIRST_CHILD: top=${Math.round(r.top)}px, tag=${firstChild.tagName}, class="${firstChild.className.substring(0,80)}"`);
          }
        }

        // Check all sections for negative margins or zero height
        const sections = document.querySelectorAll('section');
        sections.forEach((s, i) => {
          const r = s.getBoundingClientRect();
          const style = window.getComputedStyle(s);
          if (r.height < 10) {
            issues.push(`SECTION[${i}] ZERO HEIGHT: height=${r.height}`);
          }
          if (parseInt(style.marginTop) < -10) {
            issues.push(`SECTION[${i}] NEGATIVE MARGIN: marginTop=${style.marginTop}`);
          }
        });

        // Check for elements overflowing their containers
        const allEls = document.querySelectorAll('h1, h2, h3, p, button, a');
        allEls.forEach((el) => {
          const r = el.getBoundingClientRect();
          if (r.right > window.innerWidth + 5) {
            issues.push(`OVERFLOW_EL: <${el.tagName}> right=${Math.round(r.right)} text="${el.textContent?.substring(0,40)}"`);
          }
        });

        // Check btn-primary computed styles
        const btns = document.querySelectorAll('.btn-primary');
        btns.forEach((btn, i) => {
          const style = window.getComputedStyle(btn);
          issues.push(`BTN_PRIMARY[${i}]: bg=${style.backgroundColor}, color=${style.color}, padding=${style.padding}, display=${style.display}`);
        });

        // Check form-input computed styles
        const inputs = document.querySelectorAll('.form-input');
        inputs.forEach((inp, i) => {
          const style = window.getComputedStyle(inp);
          issues.push(`FORM_INPUT[${i}]: border=${style.border}, bg=${style.backgroundColor}, fontSize=${style.fontSize}`);
        });

        // Check badge-teal
        const badges = document.querySelectorAll('.badge-teal');
        badges.forEach((b, i) => {
          const style = window.getComputedStyle(b);
          issues.push(`BADGE_TEAL[${i}]: display=${style.display}, color=${style.color}, bg=${style.backgroundColor}`);
        });

        // Check section-divider
        const dividers = document.querySelectorAll('.section-divider');
        dividers.forEach((d, i) => {
          const r = d.getBoundingClientRect();
          const style = window.getComputedStyle(d);
          issues.push(`SECTION_DIVIDER[${i}]: width=${r.width}, height=${r.height}, bg=${style.background}`);
        });

        // Check glass-card
        const cards = document.querySelectorAll('.glass-card');
        if (cards.length > 0) {
          const style = window.getComputedStyle(cards[0]);
          issues.push(`GLASS_CARD[0]: bg=${style.backgroundColor}, border=${style.border}, borderRadius=${style.borderRadius}`);
        }

        // Check icon-box-teal
        const iconBoxes = document.querySelectorAll('.icon-box-teal');
        if (iconBoxes.length > 0) {
          const style = window.getComputedStyle(iconBoxes[0]);
          issues.push(`ICON_BOX_TEAL[0]: width=${style.width}, height=${style.height}, display=${style.display}`);
        }

        return issues;
      });

      report.push({ page: name, url, diagnostics });
      console.log(`  Issues found: ${diagnostics.length}`);
      diagnostics.forEach(d => console.log(`    ${d}`));

    } catch(e) {
      report.push({ page: name, url, error: e.message });
      console.log(`  ERROR: ${e.message}`);
    }
  }

  fs.writeFileSync('report.json', JSON.stringify(report, null, 2));
  console.log('\nReport saved to report.json');
  await browser.close();
})();
