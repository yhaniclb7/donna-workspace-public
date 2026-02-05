/**
 * Simple Browser Test - Guaranteed to work
 */
const { chromium } = require('playwright');

async function test() {
  console.log('🧪 Testing Playwright...');
  
  // Test 1: Headless (no Chrome window)
  console.log('\n1️⃣ Testing headless mode...');
  const browser1 = await chromium.launch({ headless: true });
  const page1 = await browser1.newPage();
  await page1.goto('https://example.com');
  await page1.screenshot({ path: '/tmp/test-headless.png' });
  await browser1.close();
  console.log('✅ Headless works! Screenshot: /tmp/test-headless.png');
  
  // Test 2: Visible mode (launches fresh Chrome)
  console.log('\n2️⃣ Testing visible mode (you should see Chrome open)...');
  const browser2 = await chromium.launch({ 
    headless: false,
    args: ['--window-size=1280,720']
  });
  const page2 = await browser2.newPage();
  await page2.goto('https://example.com');
  console.log('✅ Visible Chrome opened! Check your screen.');
  console.log('   Browser stays open for 10 seconds...');
  
  await page2.waitForTimeout(10000);
  await browser2.close();
  
  console.log('\n✅ All tests passed! Playwright is fully working.');
}

test().catch(err => {
  console.error('❌ Error:', err.message);
  process.exit(1);
});
