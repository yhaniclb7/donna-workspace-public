#!/usr/bin/env node
/**
 * Donna Smart Browser Agent
 * Automatically switches between visible (watch me) and headless (overnight) modes
 */

const { chromium } = require('playwright');

class SmartBrowserAgent {
  constructor(options = {}) {
    this.showMode = options.showMode || process.env.SHOW_MODE === 'true';
    this.slowMo = this.showMode ? 100 : 0;
    this.browser = null;
    this.page = null;
  }

  async connect() {
    if (this.showMode) {
      // Connect to YOUR visible Chrome
      console.log('🦞 Donna connecting to YOUR Chrome (visible mode)...');
      this.browser = await chromium.connectOverCDP('http://localhost:9222');
      const context = this.browser.contexts()[0] || await this.browser.newContext();
      this.page = context.pages()[0] || await context.newPage();
      console.log('✅ Connected to your browser — WATCH ME WORK!');
    } else {
      // Launch invisible browser (overnight mode)
      console.log('🌙 Donna launching headless browser (overnight mode)...');
      this.browser = await chromium.launch({ 
        headless: true,
        args: ['--no-sandbox']
      });
      this.page = await this.browser.newPage();
      console.log('✅ Headless browser ready — working in background');
    }
    return this;
  }

  async navigate(url) {
    console.log(`🌐 ${this.showMode ? 'Opening' : 'Loading'}: ${url}`);
    await this.page.goto(url, { waitUntil: 'networkidle' });
    if (this.showMode) await this.page.waitForTimeout(1000);
    console.log('✅ Loaded');
  }

  async click(textOrSelector) {
    console.log(`🖱️  ${this.showMode ? 'Clicking' : 'Click'}: ${textOrSelector}`);
    
    try {
      // Try text first
      const byText = this.page.locator(`text=${textOrSelector}`).first();
      if (await byText.isVisible().catch(() => false)) {
        await byText.click();
      } else {
        // Try selector
        await this.page.locator(textOrSelector).first().click();
      }
      
      if (this.showMode) await this.page.waitForTimeout(500);
      console.log('✅ Clicked');
    } catch (error) {
      console.error(`❌ Could not click "${textOrSelector}"`);
      throw error;
    }
  }

  async fill(selector, text) {
    console.log(`⌨️  ${this.showMode ? 'Typing' : 'Fill'}: ${selector}`);
    await this.page.fill(selector, text);
    if (this.showMode) await this.page.waitForTimeout(this.slowMo);
    console.log('✅ Filled');
  }

  async type(text) {
    console.log(`⌨️  Typing: "${text}"`);
    await this.page.keyboard.type(text, { delay: this.showMode ? 50 : 0 });
  }

  async screenshot(name = 'screenshot') {
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const filename = `${name}-${timestamp}.png`;
    await this.page.screenshot({ path: filename, fullPage: true });
    console.log(`📸 Screenshot: ${filename}`);
    return filename;
  }

  async getText(selector) {
    try {
      const text = await this.page.locator(selector).first().textContent({ timeout: 5000 });
      return text?.trim();
    } catch {
      return null;
    }
  }

  async scroll(direction = 'down', amount = 500) {
    const scrollAmount = direction === 'up' ? -amount : amount;
    await this.page.evaluate((px) => window.scrollBy(0, px), scrollAmount);
    console.log(`📜 Scrolled ${direction}`);
    if (this.showMode) await this.page.waitForTimeout(300);
  }

  async wait(seconds) {
    console.log(`⏳ Waiting ${seconds}s...`);
    await this.page.waitForTimeout(seconds * 1000);
  }

  async extractAll(selectors) {
    const results = {};
    for (const [name, selector] of Object.entries(selectors)) {
      results[name] = await this.getText(selector);
    }
    return results;
  }

  async close() {
    if (this.browser) {
      await this.browser.close();
      console.log('🔌 Disconnected');
    }
  }
}

// Automation Recipes
const tasks = {
  async researchVCFirms(agent) {
    console.log('\n🔍 Task: Research VC Firms on PitchBook');
    await agent.navigate('https://pitchbook.com');
    await agent.wait(2);
    await agent.screenshot('pitchbook-home');
    
    // Would search here if not logged in
    console.log('📊 Screenshot saved — check if login needed');
  },

  async checkCompetitorPricing(agent, competitor) {
    console.log(`\n💰 Task: Check pricing for ${competitor}`);
    await agent.navigate(`https://${competitor}.com/pricing`);
    await agent.wait(2);
    await agent.scroll('down');
    await agent.screenshot(`${competitor}-pricing`);
    
    const price = await agent.getText('.price, [data-testid="price"], .pricing-amount');
    console.log(`💵 Found price: ${price || 'Not visible'}`);
  },

  async findRestaurant(agent, name, date, time, party) {
    console.log(`\n🍽️  Task: Find restaurant "${name}"`);
    await agent.navigate('https://www.opentable.com');
    await agent.wait(2);
    
    // Search
    await agent.fill('[data-test="search-bar-input"]', name);
    await agent.press('Enter');
    await agent.wait(3);
    
    await agent.screenshot('opentable-search-results');
    
    // Click first result
    try {
      await agent.click('a[href*="restaurant"]');
      await agent.wait(3);
      await agent.screenshot('opentable-restaurant');
    } catch {
      console.log('⚠️  Could not click restaurant — may need login');
    }
  },

  async monitorNews(agent, query) {
    console.log(`\n📰 Task: Monitor news for "${query}"`);
    await agent.navigate('https://news.ycombinator.com');
    await agent.wait(2);
    
    // Search
    await agent.fill('input[name="q"]', query);
    await agent.press('Enter');
    await agent.wait(3);
    
    await agent.scroll('down');
    await agent.screenshot('hackernews-results');
    
    // Extract top stories
    const stories = await agent.page.locator('.titleline > a').allTextContents();
    console.log('\n📋 Top stories:');
    stories.slice(0, 5).forEach((story, i) => {
      console.log(`  ${i + 1}. ${story.substring(0, 80)}...`);
    });
  },

  async linkedInPost(agent, topic) {
    console.log(`\n💼 Task: Research LinkedIn content for "${topic}"`);
    await agent.navigate('https://www.linkedin.com');
    await agent.wait(2);
    await agent.screenshot('linkedin-home');
    
    // Check if logged in
    const loginButton = await agent.page.locator('text=Sign in').first().isVisible().catch(() => false);
    if (loginButton) {
      console.log('🔐 Login required — stopping (you handle credentials)');
      return;
    }
    
    // Search for topic
    await agent.fill('.search-global-typeahead__input', topic);
    await agent.press('Enter');
    await agent.wait(3);
    
    await agent.screenshot('linkedin-search');
  }
};

// Main execution
async function main() {
  const taskName = process.argv[2] || 'demo';
  const showMode = process.argv.includes('--show') || process.argv.includes('-s');
  
  const agent = new SmartBrowserAgent({ showMode });
  
  try {
    await agent.connect();
    
    switch (taskName) {
      case 'demo':
        console.log('\n🎯 Running DEMO sequence');
        await agent.navigate('https://example.com');
        await agent.wait(1);
        await agent.scroll('down');
        await agent.wait(1);
        await agent.scroll('up');
        await agent.screenshot('demo-complete');
        break;
        
      case 'vc':
        await tasks.researchVCFirms(agent);
        break;
        
      case 'competitor':
        const competitor = process.argv[3] || 'stripe';
        await tasks.checkCompetitorPricing(agent, competitor);
        break;
        
      case 'restaurant':
        const restaurant = process.argv[3] || 'Nobu';
        await tasks.findRestaurant(agent, restaurant);
        break;
        
      case 'news':
        const query = process.argv[3] || 'AI automation';
        await tasks.monitorNews(agent, query);
        break;
        
      case 'linkedin':
        const topic = process.argv[3] || 'venture capital';
        await tasks.linkedInPost(agent, topic);
        break;
        
      default:
        console.log('Usage: node donna-smart-agent.js [task] [args] [--show]');
        console.log('\nTasks:');
        console.log('  demo                  - Demo sequence (visible)');
        console.log('  vc                    - Research VC firms on PitchBook');
        console.log('  competitor [name]     - Check competitor pricing');
        console.log('  restaurant [name]     - Find restaurant on OpenTable');
        console.log('  news [query]          - Monitor HN for topic');
        console.log('  linkedin [topic]      - Research LinkedIn content');
        console.log('\nOptions:');
        console.log('  --show, -s            - Watch me work (connects to YOUR Chrome)');
        console.log('                        - Omit for headless overnight mode');
        process.exit(0);
    }
    
    console.log('\n✅ Task complete!');
    
    if (showMode) {
      console.log('Browser stays open — you can continue interacting.');
      console.log('Press Ctrl+C to disconnect.');
      await new Promise(() => {});
    } else {
      await agent.close();
    }
    
  } catch (error) {
    console.error('\n❌ Error:', error.message);
    if (error.message.includes('connectOverCDP')) {
      console.error('\n💡 Start Chrome with:');
      console.error('/Applications/Google\\ Chrome.app/Contents/MacOS/Google\\ Chrome --remote-debugging-port=9222');
    }
    process.exit(1);
  }
}

module.exports = { SmartBrowserAgent, tasks };

if (require.main === module) {
  main();
}
