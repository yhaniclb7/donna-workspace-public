/**
 * Donna GUARANTEED Visible Demo
 * Actions you WILL see
 */
const { chromium } = require('playwright');

async function guaranteedDemo() {
  console.log('🚀 Starting GUARANTEED visible demo...');
  
  const browser = await chromium.launch({ 
    headless: false,
    slowMo: 500, // SLOW MOTION - 500ms between actions
    args: ['--window-size=1400,900']
  });
  
  const page = await browser.newPage();
  
  // STEP 1: Go to a simple site
  console.log('STEP 1: Going to httpbin.org (simple test page)...');
  await page.goto('https://httpbin.org/forms/post');
  console.log('✅ Page loaded - you should see a form');
  
  // STEP 2: Wait so you can see it
  console.log('Waiting 3 seconds...');
  await page.waitForTimeout(3000);
  
  // STEP 3: Fill a field (VISIBLE ACTION)
  console.log('STEP 3: Filling "custname" field with "Yhanic"...');
  await page.fill('input[name="custname"]', 'Yhanic');
  console.log('✅ Typed "Yhanic" - you should see it in the field');
  
  await page.waitForTimeout(2000);
  
  // STEP 4: Fill another field
  console.log('STEP 4: Filling "custtel" with "555-1234"...');
  await page.fill('input[name="custtel"]', '555-1234');
  console.log('✅ Phone number entered');
  
  await page.waitForTimeout(2000);
  
  // STEP 5: Scroll down
  console.log('STEP 5: Scrolling down...');
  await page.evaluate(() => window.scrollBy(0, 300));
  console.log('✅ Scrolled');
  
  await page.waitForTimeout(2000);
  
  // STEP 6: Scroll up
  console.log('STEP 6: Scrolling up...');
  await page.evaluate(() => window.scrollBy(0, -300));
  console.log('✅ Scrolled back up');
  
  await page.waitForTimeout(2000);
  
  // STEP 7: Screenshot
  console.log('STEP 7: Taking screenshot...');
  await page.screenshot({ path: '/tmp/donna-visible-demo.png' });
  console.log('✅ Screenshot saved');
  
  console.log('\n✅✅✅ DEMO COMPLETE! ✅✅✅');
  console.log('You should have seen:');
  console.log('  - Browser open');
  console.log('  - Page load');
  console.log('  - Text being typed (slowly)');
  console.log('  - Scrolling up and down');
  
  console.log('\nBrowser stays open 15 seconds...');
  await page.waitForTimeout(15000);
  
  await browser.close();
  console.log('🔌 Done!');
}

guaranteedDemo().catch(err => {
  console.error('❌ Error:', err.message);
  console.log(err.stack);
});
