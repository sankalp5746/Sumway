const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

(async () => {
  console.log("Starting Vendor Registration programmatic test...");
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1280, height: 960 } });

  page.on('console', msg => console.log('PAGE LOG:', msg.text()));
  page.on('pageerror', err => console.log('PAGE ERROR:', err.message));

  try {
    // 1. Navigate to register page
    console.log("Navigating to register page...");
    await page.goto('http://127.0.0.1:3000/register', { waitUntil: 'domcontentloaded', timeout: 30000 });
    await page.waitForTimeout(3000); // Wait for hydration
    await page.screenshot({ path: 'website-capture/screenshots/test_register_initial.png' });

    // 2. Click Vendor tab
    console.log("Clicking 'vendor' role tab...");
    // Find all buttons inside glass-card and print their text
    const buttons = page.locator('.glass-card button');
    const count = await buttons.count();
    console.log(`Found ${count} buttons inside .glass-card:`);
    for (let i = 0; i < count; i++) {
      const text = await buttons.nth(i).innerText();
      console.log(`Button ${i}: "${text}"`);
    }

    const vendorTab = page.locator('.glass-card button').nth(2);
    console.log("Clicking button index 2 via JS evaluate...");
    await vendorTab.evaluate(el => el.click());
    await page.waitForTimeout(2000); // Wait 2s for transition
    await page.screenshot({ path: 'website-capture/screenshots/test_register_vendor_tab.png' });

    // 3. Verify classification toggle exists
    const b2bBtn = page.locator('button:has-text("B2B (Business-to-Business)")');
    const b2cBtn = page.locator('button:has-text("B2C (Business-to-Consumer)")');
    
    if (await b2bBtn.count() > 0 && await b2cBtn.count() > 0) {
      console.log("SUCCESS: Vendor classification toggles B2B and B2C are visible!");
    } else {
      throw new Error("B2B or B2C classification buttons not found!");
    }

    // 4. Click B2B and check fields
    console.log("Clicking B2B Category...");
    await b2bBtn.click();
    await page.waitForTimeout(500);
    await page.screenshot({ path: 'website-capture/screenshots/test_register_b2b_fields.png' });

    const companyNameLabel = page.locator('label:has-text("Firm / Company Registration Name")');
    const gstCertLabel = page.locator('label:has-text("GST Registration Certificate")');
    if (await companyNameLabel.count() > 0 && await gstCertLabel.count() > 0) {
      console.log("SUCCESS: B2B registration specific fields are visible!");
    } else {
      throw new Error("B2B registration fields are missing!");
    }

    // 5. Click B2C and check fields
    console.log("Clicking B2C Category...");
    await b2cBtn.click();
    await page.waitForTimeout(500);
    await page.screenshot({ path: 'website-capture/screenshots/test_register_b2c_fields.png' });

    const addressProofLabel = page.locator('label:has-text("Address Proof Type")');
    const bankDetailsLabel = page.locator('span:has-text("Bank Account Details")');
    if (await addressProofLabel.count() > 0 && await bankDetailsLabel.count() > 0) {
      console.log("SUCCESS: B2C registration specific fields & Bank Details are visible!");
    } else {
      throw new Error("B2C registration fields are missing!");
    }

    // 6. Test Blank Submission Validation
    console.log("Testing blank form submission validations...");
    const registerBtn = page.locator('button:has-text("Register Secure Gateway")');
    await registerBtn.click();
    await page.waitForTimeout(1000);
    await page.screenshot({ path: 'website-capture/screenshots/test_register_validation_errors.png' });

    const errorCount = await page.locator('span.text-red-500').count();
    console.log(`Validation errors visible: ${errorCount}`);

    // 7. Fill B2C Form and upload files
    console.log("Filling B2C Form inputs...");
    await page.fill('input[placeholder="e.g. Amit Kumar Sharma"]', 'Sankalp Bendale');
    await page.fill('input[placeholder="e.g. +91 9414940434"]', '+91 9876543210');
    await page.fill('input[placeholder="e.g. workspace@sumway.com"]', 'vendor.b2c@sumway.com');
    await page.fill('input[placeholder="Min 6 characters..."]', 'password123');

    // Select address proof type
    await page.selectOption('select', 'aadhaar');

    // Bank Details
    await page.fill('input[placeholder="e.g. Amit Kumar"]', 'Sankalp Bendale');
    await page.fill('input[placeholder="e.g. State Bank of India"]', 'HDFC Bank');
    await page.fill('input[placeholder="e.g. 123456789012"]', '987654321098');
    await page.fill('input[placeholder="e.g. SBIN0000001"]', 'HDFC0001234');

    // Document mock upload
    console.log("Simulating document upload...");
    // Create a temporary dummy file to upload
    const dummyFilePath = path.join(__dirname, 'dummy_doc.pdf');
    fs.writeFileSync(dummyFilePath, 'dummy PDF content');
    
    // Set file input
    const fileChooserPromise = page.waitForEvent('filechooser');
    // Click the browse link inside B2C Address Proof upload
    await page.locator('span:has-text("Browse")').first().click();
    const fileChooser = await fileChooserPromise;
    await fileChooser.setFiles(dummyFilePath);

    console.log("Waiting for upload progress animation...");
    await page.waitForTimeout(2000); // Allow upload animation to finish
    await page.screenshot({ path: 'website-capture/screenshots/test_register_b2c_filled.png' });

    // 8. Submit successfully
    console.log("Submitting B2C Form...");
    await registerBtn.click();
    
    console.log("Waiting for redirection/success state...");
    await page.waitForTimeout(3000);
    await page.screenshot({ path: 'website-capture/screenshots/test_register_success.png' });

    // Clean up dummy file
    fs.unlinkSync(dummyFilePath);
    console.log("SUCCESS: Programmatic vendor registration test completed!");

  } catch (err) {
    console.error("TEST ERROR:", err.message);
  } finally {
    await browser.close();
  }
})();
