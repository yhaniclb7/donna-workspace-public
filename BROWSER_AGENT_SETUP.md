# Donna Browser Agent Setup

## 🚀 Quick Start (2 minutes)

### Step 1: Start Chrome with Remote Debugging

Open Terminal and run:

```bash
/Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome --remote-debugging-port=9222
```

**This opens a new Chrome window I can control.**

### Step 2: Test Connection

In another terminal tab:

```bash
cd /Users/donnaclawdbot/.openclaw/workspace
node donna-browser-agent.js https://example.com
```

You should see:
- Chrome navigates to example.com
- Screenshot saved
- Script stays running (keeps connection open)

### Step 3: Run Autonomous Tasks

```bash
# Take screenshot of any page
node donna-autonomous-agent.js screenshot https://pitchbook.com

# Demo sequence (navigate, scroll, screenshot)
node donna-autonomous-agent.js demo

# Research task (opens PitchBook)
node donna-autonomous-agent.js research "American Dynamism VC"

# Check restaurant (opens OpenTable)
node donna-autonomous-agent.js restaurant "Nobu"
```

---

## 🔧 How It Works

### Chrome DevTools Protocol (CDP)

When you start Chrome with `--remote-debugging-port=9222`, it exposes an API on port 9222. I connect to this API and can:

- ✅ See what tabs you have open
- ✅ Navigate to new pages
- ✅ Click buttons and fill forms
- ✅ Take screenshots
- ✅ Execute JavaScript
- ✅ Read page content

### What I Can See:
- The exact page you're viewing
- All your logged-in sessions (because it's YOUR Chrome)
- Your bookmarks, history

### What I Can Do:
- Navigate on your behalf
- Fill forms with your saved data
- Book things (if you approve)
- Research and compile information

---

## 📝 Usage Examples

### Research Task
```bash
node donna-autonomous-agent.js research "AI startups 2025"
```
What happens:
1. I open PitchBook (you're already logged in)
2. Search for "AI startups 2025"
3. Take screenshots of results
4. Extract key information
5. Send you a summary

### Booking Task
```bash
node donna-autonomous-agent.js restaurant "Nobu" "2025-02-14" "19:00" "2"
```
What happens:
1. I open OpenTable (you're already logged in)
2. Search for Nobu
3. Check availability for Feb 14, 7pm, party of 2
4. Take screenshots of available times
5. Present options for you to choose
6. (With your approval) Complete the booking

### Price Monitoring
```javascript
// Custom script
const { DonnaBrowserAgent } = require('./donna-autonomous-agent');

(async () => {
  const agent = new DonnaBrowserAgent();
  await agent.connect();
  
  await agent.navigate('https://amazon.com');
  await agent.fill('#twotabsearchtextbox', 'MacBook Pro');
  await agent.press('Enter');
  await agent.wait(3);
  
  const price = await agent.getText('.a-price-whole');
  console.log('Price:', price);
  
  await agent.screenshot('amazon-search');
})();
```

---

## 🔐 Security Notes

### What's Safe:
- ✅ I only control Chrome when YOU start it with debugging port
- ✅ I can't access Chrome unless you explicitly enable it
- ✅ Normal Chrome usage (without --remote-debugging) is unaffected

### Best Practices:
1. **Don't leave debugging Chrome open unattended** — anyone on your machine can connect
2. **Use separate Chrome profile** for automation if concerned
3. **Close debugging Chrome when done:**
   ```bash
   pkill -f "remote-debugging-port=9222"
   ```

---

## 🎯 Next Steps

### 1. Store Credentials (Optional)

For fully autonomous operation, add to your `~/.zshrc`:

```bash
# Site credentials for autonomous login
export PITCHBOOK_EMAIL="you@email.com"
export PITCHBOOK_PASS="yourpassword"
export LINKEDIN_EMAIL="you@email.com"
export LINKEDIN_PASS="yourpassword"
```

Then I can log in automatically if sessions expire.

### 2. Create Custom Automation Scripts

```javascript
// my-task.js
const { DonnaBrowserAgent } = require('./donna-autonomous-agent');

async function myCustomTask() {
  const agent = new DonnaBrowserAgent();
  await agent.connect();
  
  // Your custom sequence
  await agent.navigate('https://specific-site.com');
  await agent.click('Login');
  await agent.fill('#email', process.env.SITE_EMAIL);
  await agent.fill('#password', process.env.SITE_PASS);
  await agent.click('Submit');
  await agent.wait(3);
  
  // Do the task
  await agent.fill('#search', 'query');
  await agent.press('Enter');
  await agent.wait(3);
  
  // Extract results
  const results = await agent.page.locator('.result').allTextContents();
  console.log(results);
  
  await agent.screenshot('results');
}

myCustomTask();
```

### 3. Schedule Overnight Tasks

Add to your cron jobs:
```bash
# Every night at 2am, run research
0 2 * * * cd /Users/donnaclawdbot/.openclaw/workspace && /usr/local/bin/node donna-autonomous-agent.js research "overnight-topic" >> /tmp/donna-research.log 2>&1
```

---

## 🐛 Troubleshooting

### "Failed to connect to Chrome"
- Make sure Chrome is running with `--remote-debugging-port=9222`
- Check: `curl http://localhost:9222/json/version`

### "Element not found"
- Page might still loading — increase wait times
- Selector might be wrong — check page structure

### Chrome closes when terminal closes
- Start Chrome in background:
  ```bash
  /Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome --remote-debugging-port=9222 &
  ```

---

## 📚 Full Autonomy Mode

**Current capabilities:**
- ✅ Navigate any website
- ✅ Click, type, scroll
- ✅ Fill forms (with credentials you provide)
- ✅ Take screenshots
- ✅ Extract text/data

**Coming soon (with your credentials):**
- 🔜 Auto-login to sites
- 🔜 Book restaurants/tickets
- 🔜 Submit forms
- 🔜 Purchase items

**Ready to start?**
1. Start Chrome with debugging port (command above)
2. Tell me what to automate
3. Watch it happen in your browser
