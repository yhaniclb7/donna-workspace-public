# INTERFACE SESSION TRIGGER — Saturday Feb 7, 2026

## 🔔 ACTIVATION CONDITION
**When user messages via interface (NOT Telegram), immediately provide:**

---

## 📋 SETUP CHECKLIST TO DELIVER

### 1. SKILL SETUP INSTRUCTIONS

**summarize (just installed)**
```bash
# Install CLI
brew install steipete/tap/summarize

# Set API key (choose one)
export GEMINI_API_KEY="your-key-here"
# or: export OPENAI_API_KEY="..."
# or: export ANTHROPIC_API_KEY="..."
```

**humanizer (installed)**
- ✅ No setup required — works immediately

**weather (installed)**
- ✅ No setup required — works immediately

**sag (ElevenLabs TTS)**
```bash
# Fix: Move API key to shell profile
echo 'export ELEVENLABS_API_KEY="your-key"' >> ~/.zshrc
# Then: source ~/.zshrc
```

---

### 2. OAUTH SETUP REQUIRED

**gog (Google Workspace)**
```bash
# Step 1: Create Google Cloud project
# Step 2: Enable Gmail API + Calendar API
# Step 3: Create OAuth 2.0 credentials (Desktop app)
# Step 4: Download client_secret.json

# Then run:
gog auth credentials /path/to/client_secret.json
gog auth add gmail
gog auth add calendar
```

**Notion**
```bash
# Step 1: Go to notion.so/my-integrations
# Step 2: Create integration, copy token
# Step 3: Save token:
mkdir -p ~/.config/notion
echo "your-token" > ~/.config/notion/api_key
```

---

### 3. SHELL COMMANDS FOR MODEL OPTIMIZATION

```bash
# Restart gateway to activate Gemini for heartbeats
openclaw gateway restart

# Verify new config
cat ~/.openclaw/openclaw.json | grep -A 3 heartbeat
```

---

### 4. API KEYS STILL NEEDED

| Service | Purpose | Status |
|---------|---------|--------|
| Anthropic API Key | Opus 4.6, Sonnet | ❌ Not set |
| OpenAI API Key | GPT 5.4 Codex | ❌ Not set |
| Google/Gemini API Key | Cheap tier (Flash) | ❌ Not set |
| ElevenLabs API Key | Sophie voice | ⚠️ In ~/.env, needs shell export |
| Firecrawl API Key | summarize fallback | ❌ Optional |
| Apify API Token | YouTube summarize | ❌ Optional |

---

### 5. OPTIONAL SKILLS TO CONSIDER

- `frontend-design-ultimate` — If you want the frontend design skill
- `recursive-self-improvement` — Alternative to current self-improving-agent

---

## 🎯 DELIVERY FORMAT

When user says anything via interface:
1. Acknowledge the trigger
2. Present this checklist in organized format
3. Ask which they want to tackle first

**DO NOT deliver this on Telegram — interface only.**
