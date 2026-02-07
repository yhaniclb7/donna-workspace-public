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

1. **API Integration**
   - Connect to CRM (HubSpot/Salesforce)
   - Calendar integration for automatic meeting sync
   - Crunchbase/PitchBook data enrichment

2. **Deal Intelligence**
   - Automated news alerts for portfolio companies
   - Funding round notifications
   - Competitive landscape tracking

3. **Collaboration**
   - Multi-user support for deal team
   - Comment threads on deals
   - Shared meeting notes

4. **Analytics**
   - Conversion funnel metrics
   - Time-in-stage tracking
   - Source attribution analysis

## Customization

Edit `lib/data.ts` to add your own:
- VC firms and contacts
- Deal opportunities
- American Dynamism companies
- Meeting preparation notes

---

Built for Yhanic Braithwaite's VC research workflow.
