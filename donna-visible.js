/**
 * Donna Visible Browser Agent
 * Launches fresh Chrome window you can watch
 */
const { chromium } = require('playwright');

async function demo() {
  console.log('🦞 Donna launching visible Chrome...');
  
  const browser = await chromium.launch({ 
    headless: false,
    args: ['--window-size=1400,900']
  });
  
  const page = await browser.newPage();
  
  console.log('🌐 Navigating to example.com...');
  await page.goto('https://example.com');
  
  console.log('⏳ Waiting 3 seconds so you can see it...');
  await page.waitForTimeout(3000);
  
  console.log('📜 Scrolling down...');
  await page.evaluate(() => window.scrollBy(0, 300));
  await page.waitForTimeout(2000);
  
  console.log('📸 Taking screenshot...');
  await page.screenshot({ path: '/tmp/donna-demo.png', fullPage: true });
  
  console.log('✅ Demo complete! Screenshot saved: /tmp/donna-demo.png');
  console.log('🖥️  Chrome stays open for 30 seconds...');
  await page.waitForTimeout(30000);
  
  await browser.close();
  console.log('🔌 Done!');
}

demo().catch(err => {
  console.error('❌ Error:', err.message);
  process.exit(1);
});
