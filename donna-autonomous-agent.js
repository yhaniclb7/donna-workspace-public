#!/usr/bin/env node
/**
 * Donna Autonomous Browser Agent
 * Advanced automation with natural language instructions
 */

const { chromium } = require('playwright');

const CDP_URL = 'http://localhost:9222';

class DonnaBrowserAgent {
  constructor() {
    this.browser = null;
    this.context = null;
    this.page = null;
  }

  async connect() {
    console.log('🦞 Donna connecting to Chrome...');
    this.browser = await chromium.connectOverCDP(CDP_URL);
    this.context = this.browser.contexts()[0] || await this.browser.newContext();
    this.page = this.context.pages()[0] || await this.context.newPage();
    console.log('✅ Connected to your browser');
    return this;
  }

  async navigate(url) {
    console.log(`🌐 Opening: ${url}`);
    await this.page.goto(url, { waitUntil: 'networkidle' });
    console.log('✅ Page loaded');
  }

  async click(textOrSelector) {
    console.log(`🖱️  Clicking: ${textOrSelector}`);
    
    // Try finding by text first, then by selector
    const element = await this.page.locator(`text=${textOrSelector}`).first()
      .or(this.page.locator(textOrSelector).first())
      .waitFor({ timeout: 5000 });
    
    await element.click();
    console.log('✅ Clicked');
  }

  async fill(selector, text) {
    console.log(`⌨️  Filling: ${selector}`);
    await this.page.fill(selector, text);
    console.log('✅ Filled');
  }

  async type(text, delay = 50) {
    console.log(`⌨️  Typing: "${text}"`);
    await this.page.keyboard.type(text, { delay });
    console.log('✅ Typed');
  }

  async wait(seconds) {
    console.log(`⏳ Waiting ${seconds}s...`);
    await this.page.waitForTimeout(seconds * 1000);
  }

  async screenshot(name = 'screenshot') {
    const filename = `${name}-${Date.now()}.png`;
    await this.page.screenshot({ path: filename, fullPage: true });
    console.log(`📸 Saved: ${filename}`);
    return filename;
  }

  async getText(selector) {
    const text = await this.page.locator(selector).first().textContent();
    return text?.trim();
  }

  async scroll(direction = 'down', amount = 500) {
    const scrollAmount = direction === 'up' ? -amount : amount;
    await this.page.evaluate((px) => window.scrollBy(0, px), scrollAmount);
    console.log(`📜 Scrolled ${direction}`);
  }

  async press(key) {
    console.log(`⌨️  Pressing: ${key}`);
    await this.page.keyboard.press(key);
  }

  async close() {
    if (this.browser) {
      await this.browser.close();
      console.log('🔌 Disconnected');
    }
  }
}

// Pre-built automation recipes
const recipes = {
  async researchVC(agent, query) {
    await agent.navigate('https://pitchbook.com');
    await agent.wait(3);
    await agent.screenshot('pitchbook-home');
    // Would need credentials to proceed
  },

  async checkOpenTable(agent, restaurant, date, time, partySize) {
    await agent.navigate('https://www.opentable.com');
    await agent.wait(2);
    
    // Search for restaurant
    await agent.fill('[data-test="search-bar-input"]', restaurant);
    await agent.press('Enter');
    await agent.wait(3);
    
    await agent.screenshot('opentable-search');
    
    // Click first result
    await agent.click('a[href*="restaurant"]');
    await agent.wait(3);
    
    await agent.screenshot('opentable-restaurant');
  },

  async monitorPrice(agent, url, selector) {
    await agent.navigate(url);
    await agent.wait(2);
    const price = await agent.getText(selector);
    await agent.screenshot('price-check');
    console.log(`💰 Current price: ${price}`);
    return price;
  }
};

// Main execution
async function main() {
  const task = process.argv[2] || 'screenshot';
  const agent = new DonnaBrowserAgent();
  
  try {
    await agent.connect();
    
    switch (task) {
      case 'screenshot':
        const url = process.argv[3] || 'https://example.com';
        await agent.navigate(url);
        await agent.wait(2);
        await agent.screenshot();
        break;
        
      case 'research':
        const query = process.argv[3] || 'American Dynamism VC';
        await recipes.researchVC(agent, query);
        break;
        
      case 'restaurant':
        const restaurant = process.argv[3] || 'Nobu';
        await recipes.checkOpenTable(agent, restaurant);
        break;
        
      case 'demo':
        // Demo sequence
        await agent.navigate('https://example.com');
        await agent.wait(1);
        await agent.scroll('down');
        await agent.wait(1);
        await agent.screenshot('demo');
        break;
        
      default:
        console.log('Usage: node donna-autonomous-agent.js [task] [args]');
        console.log('\nTasks:');
        console.log('  screenshot [url]     - Take screenshot of page');
        console.log('  research [query]     - Research on PitchBook');
        console.log('  restaurant [name]    - Check OpenTable');
        console.log('  demo                 - Run demo sequence');
    }
    
    await agent.wait(5); // Keep connection open so you can see results
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    // Don't close so you can interact with the page
    console.log('\n✅ Task complete. Browser stays open.');
    console.log('Press Ctrl+C to exit this script.');
    await new Promise(() => {});
  }
}

module.exports = { DonnaBrowserAgent, recipes };

if (require.main === module) {
  main();
}
