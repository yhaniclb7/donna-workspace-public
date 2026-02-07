# VC Research Dashboard

Defense tech and American Dynamism venture capital research and deal flow tracking dashboard.

## Features

### 📊 Dashboard Overview
- High-level stats on active deals, VC relationships, and American Dynamism companies
- Priority actions feed with upcoming meetings and urgent tasks
- Quick navigation to all major sections

### 💼 Deal Pipeline
- Kanban-style pipeline view with 6 stages: Sourced → Screening → Partner Meeting → Due Diligence → Portfolio → Passed
- Filter by sector and priority
- Click cards for detailed deal information
- Tracks: valuation, round, lead source, next actions

### 🤖 AI Investment Memo Generator
- **NEW**: One-click AI-powered investment memo generation
- Automatic market analysis, team assessment, and investment thesis
- Risk factor identification and recommendation scoring
- Professional VC-grade memo formatting
- Powered by OpenAI GPT-4 (when API key configured)

### 🔗 API Integrations
- **NEW**: Crunchbase data enrichment - funding rounds, investors, competitors
- **NEW**: News API integration - real-time company news with sentiment analysis
- **NEW**: PitchBook integration ready for private market data
- Configure via Settings → API Integrations panel
- Mock data provided for demo when APIs not configured

### 🏢 VC Firm Tracker
- Relationship strength scoring (1-10)
- Status tracking: Target → Active → Intro Pending → Meeting Scheduled → Term Sheet → Closed
- Contact management with individual relationship tracking
- Portfolio company mapping
- AUM and investment focus tagging

### 🚀 American Dynamism Tracker
- Track companies rebuilding American industrial capacity
- Relevance scoring for investment prioritization
- Sectors: Defense, Aerospace, Space, AI/ML, Cyber, Energy, Manufacturing
- Funding and valuation tracking
- Lead investor mapping

### 📅 Meeting Prep
- Structured preparation for VC meetings
- Agenda building
- Research notes storage
- Key questions list
- Value proposition documentation
- Pre-loaded with Shield Capital Feb 12 meeting prep

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Icons:** Lucide React
- **Data:** In-memory (mock data ready for API integration)

## Getting Started

```bash
# Navigate to project
cd vc-research-dashboard

# Install dependencies
npm install

# Run development server
npm run dev

# Open http://localhost:3001
```

## API Configuration

To enable AI memo generation and external data enrichment:

1. Click **API Integrations** in the left sidebar
2. Toggle on the services you want to enable
3. Enter your API keys:
   - **OpenAI**: Required for AI memo generation (`sk-...`)
   - **Crunchbase**: For company funding data
   - **News API**: For real-time news alerts (`newsapi.org`)
   - **PitchBook**: For private market valuations

4. Click **Save Settings**

API keys are stored locally in your browser. The dashboard works without APIs using enriched mock data.

## Using the Investment Memo Generator

1. Click any deal card in the pipeline
2. Go to the **Investment Memo** tab
3. Click **Generate Memo** (or configure OpenAI first for AI-powered memos)
4. Review the generated memo with sections for:
   - Executive Summary
   - Market Opportunity (TAM/SAM/SOM)
   - Team Assessment
   - Product/Technology Analysis
   - Traction & Metrics
   - Competitive Landscape
   - Risk Factors
   - Investment Thesis & Recommendation

## Pre-loaded Data

### VC Firms
- **Shield Capital** - Meeting scheduled Feb 12 with Raj Shah
- **8VC** - Joe Lonsdale's defense-focused fund
- **Lux Capital** - Frontier tech specialists
- **Founders Fund** - Trae Stephens defense practice
- **Point72 Ventures** - Active defense investor

### Deals in Pipeline
- **Anduril Industries** - $8.5B valuation, Series E
- **Hermeus** - $1.2B valuation, hypersonic aircraft
- **Epirus** - $1.8B valuation, directed energy
- **True Anomaly** - Space domain awareness
- **Defense Unicorns** - Software factory for defense

### American Dynamism Companies
- SpaceX, Anduril, Hermeus, Relativity Space
- Skydio, Commonwealth Fusion Systems, Hadrian

## Next Steps / Roadmap

### ✅ Completed
- [x] Crunchbase/PitchBook data enrichment infrastructure
- [x] AI-powered investment memo generation
- [x] News API integration with sentiment analysis
- [x] API settings management panel

### In Progress
- [ ] Connect to CRM (HubSpot/Salesforce)
- [ ] Calendar integration for automatic meeting sync
- [ ] Automated news alerts for portfolio companies
- [ ] Funding round notifications

### Planned
- [ ] Multi-user support for deal team
- [ ] Comment threads on deals
- [ ] Shared meeting notes
- [ ] Conversion funnel metrics
- [ ] Time-in-stage tracking
- [ ] Source attribution analysis

## Customization

Edit `lib/data.ts` to add your own:
- VC firms and contacts
- Deal opportunities
- American Dynamism companies
- Meeting preparation notes

---

Built for Yhanic Braithwaite's VC research workflow.
