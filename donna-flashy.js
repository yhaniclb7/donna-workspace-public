/**
 * Donna Flashy Browser Demo
 * More visible actions you can watch
 */
const { chromium } = require('playwright');

async function flashyDemo() {
  console.log('🦞 Starting flashy demo...');
  
  const browser = await chromium.launch({ 
    headless: false,
    args: ['--window-size=1400,900']
  });
  
  const page = await browser.newPage();
  
  // Demo 1: Navigate to Hacker News
  console.log('🌐 Going to Hacker News...');
  await page.goto('https://news.ycombinator.com');
  await page.waitForTimeout(2000);
  
  // Demo 2: Click "new" link
  console.log('🖱️ Clicking "new" tab...');
  await page.click('a[href="newest"]');
  await page.waitForTimeout(2000);
  
  // Demo 3: Scroll to see more stories
  console.log('📜 Scrolling down...');
  await page.evaluate(() => window.scrollBy(0, 500));
  await page.waitForTimeout(1500);
  
  // Demo 4: Type in search
  console.log('⌨️ Searching for "AI"...');
  await page.fill('input[name="q"]', 'AI automation');
  await page.waitForTimeout(1000);
  
  // Demo 5: Press Enter
  console.log('⏎ Pressing Enter...');
  await page.keyboard.press('Enter');
  await page.waitForTimeout(3000);
  
  // Demo 6: Screenshot
  console.log('📸 Screenshot...');
  await page.screenshot({ path: '/tmp/donna-flashy.png', fullPage: true });
  
  console.log('✅ Flashy demo complete!');
  console.log('Browser stays open for 20 seconds...');
  await page.waitForTimeout(20000);
  
  await browser.close();
  console.log('🔌 Done!');
}

flashyDemo().catch(err => {
  console.error('❌ Error:', err.message);
  process.exit(1);
});
