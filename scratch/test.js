const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

// Target directory for screenshots
const artifactDir = 'C:\\Users\\Sankalp.Bendale\\.gemini\\antigravity-ide\\brain\\0f5f0975-1ea3-425a-b448-730c2490b0ba';

async function runTest() {
  console.log("🚀 Starting Automated Browser Test Suite for Sumway Global...");
  
  const browser = await puppeteer.launch({
    headless: "new",
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  
  // Track console errors and warnings
  const consoleErrors = [];
  const consoleLogs = [];
  
  page.on('console', msg => {
    const text = msg.text();
    if (msg.type() === 'error') {
      consoleErrors.push(`[ERROR] ${text}`);
      console.log(`❌ Console Error: ${text}`);
    } else {
      consoleLogs.push(`[${msg.type().toUpperCase()}] ${text}`);
    }
  });

  page.on('pageerror', err => {
    consoleErrors.push(`[UNCAUGHT] ${err.toString()}`);
    console.log(`❌ Uncaught Page Exception: ${err.toString()}`);
  });

  // 1. Visit Homepage
  try {
    console.log("\n📸 Visiting Homepage: http://localhost:3000...");
    await page.setViewport({ width: 1440, height: 900 });
    await page.goto('http://localhost:3000', { waitUntil: 'networkidle2' });
    
    // Take homepage screenshot
    const homeScreenshotPath = path.join(artifactDir, 'screenshot_homepage.png');
    await page.screenshot({ path: homeScreenshotPath, fullPage: false });
    console.log(`✅ Saved Homepage Screenshot: ${homeScreenshotPath}`);
    
    // Verify crucial UI elements
    const pageTitle = await page.title();
    console.log(`ℹ️ Page Title: "${pageTitle}"`);
    
    const heroHeadline = await page.$eval('h1', el => el.innerText).catch(() => 'NOT FOUND');
    console.log(`ℹ️ Hero Headline: "${heroHeadline.trim()}"`);
    
  } catch (err) {
    console.log(`❌ Error loading Homepage: ${err.message}`);
  }

  // 2. Test Inquiry Modal Trigger
  try {
    console.log("\n🔘 Testing Inquiry Trigger Button...");
    const enquiryButton = await page.$('button[class*="bg-[#F5C542]"]'); // Get Started Button
    if (enquiryButton) {
      await enquiryButton.click();
      console.log("👉 Clicked 'Get Started Now' Button.");
      await new Promise(r => setTimeout(r, 1000));
      
      const modalScreenshotPath = path.join(artifactDir, 'screenshot_enquiry_modal.png');
      await page.screenshot({ path: modalScreenshotPath });
      console.log(`✅ Saved Enquiry Modal Screenshot: ${modalScreenshotPath}`);
      
      // Close the modal if possible
      const closeButton = await page.$('button[class*="text-slate-400"]');
      if (closeButton) {
        await closeButton.click();
        console.log("👉 Closed Enquiry Modal.");
        await new Promise(r => setTimeout(r, 500));
      }
    } else {
      console.log("⚠️ Could not find the Enquiry trigger button.");
    }
  } catch (err) {
    console.log(`❌ Error testing modal: ${err.message}`);
  }

  // 3. Visit About Us Page
  try {
    console.log("\n📸 Visiting About Us Page: http://localhost:3000/company/about-us...");
    await page.goto('http://localhost:3000/company/about-us', { waitUntil: 'networkidle2' });
    
    const aboutScreenshotPath = path.join(artifactDir, 'screenshot_about_us.png');
    await page.screenshot({ path: aboutScreenshotPath, fullPage: true });
    console.log(`✅ Saved About Us Screenshot: ${aboutScreenshotPath}`);
  } catch (err) {
    console.log(`❌ Error loading About Us: ${err.message}`);
  }

  // 4. Visit Who We Are Page
  try {
    console.log("\n📸 Visiting Who We Are Page: http://localhost:3000/company/who-we-are...");
    await page.goto('http://localhost:3000/company/who-we-are', { waitUntil: 'networkidle2' });
    
    const whoWeAreScreenshotPath = path.join(artifactDir, 'screenshot_who_we_are.png');
    await page.screenshot({ path: whoWeAreScreenshotPath, fullPage: true });
    console.log(`✅ Saved Who We Are Screenshot: ${whoWeAreScreenshotPath}`);
  } catch (err) {
    console.log(`❌ Error loading Who We Are: ${err.message}`);
  }

  // 5. Test Contact Form Validation
  try {
    console.log("\n📝 Navigating to Contact Page to test form validations...");
    await page.goto('http://localhost:3000/contact', { waitUntil: 'networkidle2' });
    
    console.log("👉 Submitting empty contact form to trigger errors...");
    const submitBtn = await page.$('button[type="submit"]');
    if (submitBtn) {
      await submitBtn.click();
      await new Promise(r => setTimeout(r, 1000));
      
      const validationScreenshotPath = path.join(artifactDir, 'screenshot_contact_errors.png');
      await page.screenshot({ path: validationScreenshotPath });
      console.log(`✅ Saved Contact Form Validation Errors Screenshot: ${validationScreenshotPath}`);
    }
  } catch (err) {
    console.log(`❌ Error testing contact form: ${err.message}`);
  }

  // Compile final report logs
  console.log("\n📊 Compiled Final Reports:");
  console.log(`- Console logs checked: ${consoleLogs.length}`);
  console.log(`- Browser errors detected: ${consoleErrors.length}`);
  
  fs.writeFileSync(
    path.join(artifactDir, 'browser_errors_report.json'),
    JSON.stringify({ errors: consoleErrors, logs: consoleLogs }, null, 2)
  );
  console.log(`✅ Errors report saved successfully.`);

  await browser.close();
  console.log("\n🎉 Testing Completed Successfully!");
}

runTest();
