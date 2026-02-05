/**
 * Donna Crunchbase Test - American Dynamism Research
 * 1 minute max
 */
const { chromium } = require('playwright');

async function crunchbaseTest() {
  console.log('🦞 Opening Crunchbase...');
  
  const browser = await chromium.launch({ 
    headless: false,
    args: ['--window-size=1400,900']
  });
  
  const page = await browser.newPage();
  
  // Go to Crunchbase
  await page.goto('https://www.crunchbase.com');
  console.log('🌐 Crunchbase loaded');
  await page.waitForTimeout(2000);
  
  // Search for American Dynamism
  console.log('⌨️ Searching "American Dynamism"...');
  try {
    await page.fill('input[data-test="search-input"]', 'American Dynamism');
    await page.keyboard.press('Enter');
    console.log('⏎ Search submitted');
  } catch {
    // Try alternative selector
    await page.fill('input[type="search"]', 'American Dynamism');
    await page.keyboard.press('Enter');
  }
  
  await page.waitForTimeout(3000);
  
  // Scroll to see results
  console.log('📜 Scrolling...');
  await page.evaluate(() => window.scrollBy(0, 400));
  await page.waitForTimeout(1500);
  
  await page.evaluate(() => window.scrollBy(0, 400));
  await page.waitForTimeout(1500);
  
  // Screenshot
  console.log('📸 Screenshot...');
  await page.screenshot({ path: '/tmp/crunchbase-test.png', fullPage: true });
  console.log('✅ Saved: /tmp/crunchbase-test.png');
  
  console.log('Browser stays open 10 sec...');
  await page.waitForTimeout(10000);
  
  await browser.close();
  console.log('🔌 Done!');
}

crunchbaseTest().catch(err => {
  console.error('❌ Error:', err.message);
  // Keep browser open on error
  console.log('Browser still open for inspection');
});
