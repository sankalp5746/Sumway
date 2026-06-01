const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle', timeout: 20000 });
  await page.waitForTimeout(1000);

  const data = await page.evaluate(() => {
    const root = document.documentElement;
    const rootStyle = window.getComputedStyle(root);
    
    // Check all CSS custom properties related to spacing/sizing
    const props = [
      '--spacing', '--tw-spacing', '--font-display', '--font-body',
      '--text-xs', '--text-sm', '--text-base', '--text-lg', '--text-xl',
      '--text-2xl', '--text-3xl', '--text-4xl', '--text-5xl', '--text-6xl', '--text-7xl',
      '--leading-normal', '--leading-relaxed', '--tracking-wide', '--tracking-wider', '--tracking-widest',
      '--color-slate-100', '--color-slate-400', '--color-red-400',
      '--blur-3xl', '--blur-md', '--blur-sm', '--blur-xl',
      '--font-weight-bold', '--font-weight-extrabold',
    ];
    
    const values = {};
    props.forEach(p => {
      values[p] = rootStyle.getPropertyValue(p).trim() || '(empty)';
    });
    
    // Test a div with px-6 directly
    const div = document.createElement('div');
    div.className = 'px-6 py-4 text-sm font-bold';
    div.style.position = 'absolute';
    div.style.visibility = 'hidden';
    document.body.appendChild(div);
    const divStyle = window.getComputedStyle(div);
    values['_test_px6_paddingLeft'] = divStyle.paddingLeft;
    values['_test_px6_paddingInline'] = divStyle.paddingInline;
    values['_test_py4_paddingTop'] = divStyle.paddingTop;
    values['_test_textSm_fontSize'] = divStyle.fontSize;
    values['_test_fontBold_fontWeight'] = divStyle.fontWeight;
    document.body.removeChild(div);
    
    // Check if the CSS file is actually loaded
    const sheets = Array.from(document.styleSheets);
    values['_numStylesheets'] = sheets.length;
    values['_stylesheetHrefs'] = sheets.map(s => s.href || 'inline').join(', ').substring(0, 200);
    
    // Check computed style of body
    const bodyStyle = window.getComputedStyle(document.body);
    values['_body_padding'] = bodyStyle.padding;
    values['_body_margin'] = bodyStyle.margin;
    
    // Check if * reset is overriding
    const testDiv2 = document.createElement('div');
    testDiv2.style.cssText = 'padding-inline: calc(0.25rem * 6)';
    testDiv2.style.position = 'absolute';
    testDiv2.style.visibility = 'hidden';
    document.body.appendChild(testDiv2);
    values['_inline_calc_test'] = window.getComputedStyle(testDiv2).paddingLeft;
    document.body.removeChild(testDiv2);
    
    return values;
  });

  console.log('=== SPACING & CSS VARIABLE CHECK ===\n');
  Object.entries(data).forEach(([k, v]) => {
    console.log(`${k}: ${v}`);
  });

  await browser.close();
})();
