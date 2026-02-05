#!/usr/bin/env node
/**
 * Donna Browser Agent
 * Connects to your existing Chrome browser and automates tasks
 * 
 * Usage:
 * 1. Start Chrome with remote debugging:
 *    /Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome --remote-debugging-port=9222
 * 
 * 2. Run this script:
 *    node donna-browser-agent.js "https://example.com"
 */

const { chromium } = require('playwright');

const CDP_URL = 'http://localhost:9222';

async function connectToChrome() {
  console.log('🔌 Connecting to your Chrome browser...');
  
  try {
    // Connect to existing Chrome instance
    const browser = await chromium.connectOverCDP(CDP_URL);
    
    // Get existing context or create new one
    const context = browser.contexts()[0] || await browser.newContext();
    
    // Get existing pages
    const pages = context.pages();
    
    console.log(`✅ Connected! Found ${pages.length} tab(s) open`);
    
    // Return the last page (most recent) or create a new one
    const page = pages[pages.length - 1] || await context.newPage();
    
    return { browser, context, page };
  } catch (error) {
    console.error('❌ Failed to connect to Chrome');
    console.error('Make sure Chrome is running with: --remote-debugging-port=9222');
    console.error('\nStart Chrome with:');
    console.error('/Applications/Google\\ Chrome.app/Contents/MacOS/Google\\ Chrome --remote-debugging-port=9222');
    throw error;
  }
}

async function navigateTo(page, url) {
  console.log(`🌐 Navigating to: ${url}`);
  await page.goto(url);
  console.log('✅ Page loaded');
}

async function takeScreenshot(page, filename = 'screenshot.png') {
  await page.screenshot({ path: filename, fullPage: true });
  console.log(`📸 Screenshot saved: ${filename}`);
}

async function main() {
  const url = process.argv[2] || 'https://example.com';
  
  try {
    const { browser, page } = await connectToChrome();
    
    await navigateTo(page, url);
    
    // Wait a moment for you to see it
    await page.waitForTimeout(2000);
    
    await takeScreenshot(page);
    
    console.log('\n✅ Done! Check your Chrome window.');
    console.log('Press Ctrl+C to disconnect.');
    
    // Keep connection alive
    await new Promise(() => {});
    
  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
}

// Export for use as module
module.exports = { connectToChrome, navigateTo, takeScreenshot };

// Run if called directly
if (require.main === module) {
  main();
}
