import { CrunchbaseCompany, FundingRound, Investor, Competitor, NewsItem, ApiConfig } from '@/types/enhanced';

/**
 * API Integration Layer for VC Research Dashboard
 * Handles Crunchbase, PitchBook, News API, and OpenAI integrations
 */

export class DataEnrichmentAPI {
  private config: ApiConfig;

  constructor(config: ApiConfig) {
    this.config = config;
  }

  /**
   * Enrich a company with Crunchbase data
   * Note: Uses mock data for demo. Replace with actual API calls when keys are available.
   */
  async enrichWithCrunchbase(companyName: string): Promise<CrunchbaseCompany | null> {
    // In production, this would call Crunchbase API
    // const response = await fetch(`https://api.crunchbase.com/v4/entities/organizations/${companyName}`, {
    //   headers: { 'X-cb-user-key': this.config.crunchbase?.apiKey || '' }
    // });
    
    // For now, return enriched mock data
    return this.getMockCrunchbaseData(companyName);
  }

  /**
   * Generate an investment memo using OpenAI
   */
  async generateMemo(dealData: any, crunchbaseData?: CrunchbaseCompany): Promise<string> {
    if (!this.config.openai?.enabled) {
      return this.generateMockMemo(dealData, crunchbaseData);
    }

    const prompt = this.buildMemoPrompt(dealData, crunchbaseData);
    
    try {
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.config.openai.apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: this.config.openai.model || 'gpt-4',
          messages: [
            {
              role: 'system',
              content: 'You are a senior VC associate writing investment memos for a defense tech and American Dynamism focused fund.'
            },
            { role: 'user', content: prompt }
          ],
          temperature: 0.7,
        }),
      });

      const data = await response.json();
      return data.choices[0].message.content;
    } catch (error) {
      console.error('OpenAI API error:', error);
      return this.generateMockMemo(dealData, crunchbaseData);
    }
  }

  /**
   * Fetch recent news for a company
   */
  async fetchNews(companyName: string): Promise<NewsItem[]> {
    if (!this.config.newsApi?.enabled) {
      return this.getMockNews(companyName);
    }

    try {
      const response = await fetch(
        `https://newsapi.org/v2/everything?q=${encodeURIComponent(companyName)}&sortBy=publishedAt&apiKey=${this.config.newsApi.apiKey}`
      );
      const data = await response.json();
      
      return data.articles.slice(0, 5).map((article: any) => ({
        date: article.publishedAt,
        title: article.title,
        source: article.source.name,
        url: article.url,
        sentiment: this.analyzeSentiment(article.title + ' ' + article.description),
      }));
    } catch (error) {
      console.error('News API error:', error);
      return this.getMockNews(companyName);
    }
  }

  private buildMemoPrompt(deal: any, crunchbase?: CrunchbaseCompany): string {
    return `Write a comprehensive investment memo for ${deal.companyName}.

COMPANY OVERVIEW:
${deal.description}
Sector: ${deal.sector}
Stage: ${deal.round || 'Unknown'}
Valuation: ${deal.valuation || 'Unknown'}
Location: ${deal.location}
Founded: ${deal.founded || 'Unknown'}

${crunchbase ? `
CRUNCHBASE DATA:
Total Funding: ${crunchbase.fundingTotal}
Employees: ${crunchbase.employees}
Key Investors: ${crunchbase.investors.map((i: Investor) => i.name).join(', ')}
Categories: ${crunchbase.categories.join(', ')}
` : ''}

INTERNAL NOTES:
${deal.notes}

Please provide:
1. Executive Summary (2-3 paragraphs)
2. Market Opportunity (TAM/SAM/SOM analysis)
3. Team Assessment
4. Product/Technology Analysis
5. Traction & Metrics
6. Competitive Landscape
7. Risk Factors (3-5 bullet points)
8. Investment Thesis
9. Recommendation (Pass / Consider / Strong Interest / Invest)
10. Suggested Allocation Range

Format as a professional VC investment memo.`;
  }

  private generateMockMemo(deal: any, crunchbase?: CrunchbaseCompany): string {
    const memos: Record<string, string> = {
      'Anduril Industries': `# Investment Memo: Anduril Industries

## Executive Summary
Anduril Industries is a defense technology company building autonomous systems and AI-powered defense solutions. Founded by Palmer Luckey (Oculus VR founder) in 2017, the company has rapidly scaled to become a category leader in modern defense tech with $2.3B raised to date and an $8.5B valuation. The company differentiates through its "Lattice" AI platform that enables autonomous drones, counter-drone systems, and border security solutions.

The defense tech sector is experiencing unprecedented tailwinds following geopolitical tensions and the DOD's push for faster procurement cycles. Anduril is well-positioned as a pure-play defense tech company with established DOD relationships and a demonstrated ability to win major contracts.

## Market Opportunity
- **TAM**: $750B+ annual US defense budget, growing 3-5% annually
- **SAM**: $45B autonomous systems and AI defense segment
- **SOM**: $2-3B addressable for Anduril's current product suite

The shift toward autonomous warfare and AI-powered defense systems represents a generational investment opportunity.

## Team Assessment
**Strengths**: Palmer Luckey brings product vision and Silicon Valley credibility. Executive team includes former Palantir, SpaceX, and military leadership. Strong technical bench.
**Concerns**: Founder transition risk; high-profile nature of Luckey may attract political/regulatory scrutiny.

## Product/Technology
Lattice AI platform is the core moat—enables rapid deployment of autonomous capabilities across drone, counter-drone, and surveillance use cases. Hardware+software integration creates switching costs.

## Traction & Metrics
- $2.3B funding to date across Series A-E
- Multiple 9-figure DOD contracts
- 3,000+ employees
- Operations in US, UK, Australia

## Competitive Landscape
- Palantir: Data analytics focus, complementary not competitive
- Shield AI: Autonomous swarming, potential competitor
- Traditional defense primes (Lockheed, Raytheon): Slow-moving, acquisition targets

## Risk Factors
1. **Valuation Risk**: $8.5B valuation requires continued hypergrowth; compressed from $10B+ peak
2. **Political Risk**: Defense spending subject to administration changes
3. **Execution Risk**: Scaling hardware production at DOD-required volumes
4. **Key Person Risk**: Heavy reliance on Palmer Luckey's vision and relationships

## Investment Thesis
Anduril represents the gold standard for modern defense tech—Silicon Valley speed with DOD credibility. The company has achieved escape velocity with brand recognition, talent magnetism, and contract wins. While valuation is rich, the long-term opportunity in autonomous defense systems justifies premium pricing for a category leader.

## Recommendation: **STRONG INTEREST**

Target a $2-5M allocation in next round. Prioritize pro-rata rights for future rounds. Use relationship with Shield Capital (existing investor) to secure allocation access.

---
*Memo generated: ${new Date().toLocaleDateString()}*`,

      'Hermeus': `# Investment Memo: Hermeus

## Executive Summary
Hermeus is developing hypersonic aircraft for defense and commercial applications, targeting speeds above Mach 5. The company has made significant technical progress with its Quarterhorse prototype and has attracted strong talent from SpaceX, Blue Origin, and traditional aerospace. With a $1.2B valuation and $200M raised, Hermeus sits at the intersection of defense priority (hypersonics) and commercial aviation disruption.

The hypersonic market is rapidly accelerating as both the US and China race for dominance in high-speed flight capabilities. Hermeus's staged approach—starting with unmanned prototypes before scaling to commercial applications—provides a clear technical roadmap.

## Market Opportunity
- **TAM**: $15B+ hypersonic defense market by 2030
- **SAM**: $5B addressable for Hermeus's initial defense applications
- **SOM**: $500M near-term contract opportunities

## Team Assessment
**Strengths**: SpaceX/Blue Origin pedigree. CEO AJ Piplica (former Generation Orbit) brings relevant hypersonics experience. Strong engineering team with demonstrated ability to move fast.
**Concerns**: Aerospace hardware is capital intensive; team may need to scale significantly for production.

## Product/Technology
Quarterhorse prototype testing in progress. Turbine-based combined cycle (TBCC) engine technology is the key differentiator. Technical risk is high but progress has been promising.

## Traction & Metrics
- $200M raised (Series B)
- Quarterhorse prototype in testing
- DOD contracts secured
- $1.2B valuation

## Risk Factors
1. **Technical Risk**: Hypersonic flight is extremely challenging; many have failed
2. **Capital Intensity**: Will require billions more to reach commercial viability
3. **Timeline Risk**: Aerospace timelines often slip by years
4. **Competition**: Boeing, Lockheed, and startups all pursuing hypersonics

## Investment Thesis
Hypersonics is a national security priority with strong DOD budget support. Hermeus has the best-positioned technical approach and talent to execute. While risky, the potential returns from successful hypersonic commercialization are enormous.

## Recommendation: **CONSIDER**

Target $1-2M allocation. Valuation reasonable for the technical progress shown. Use this round to build relationship for larger allocation once technical milestones are proven.

---
*Memo generated: ${new Date().toLocaleDateString()}*`,
    };

    return memos[deal.companyName] || this.generateGenericMemo(deal, crunchbase);
  }

  private generateGenericMemo(deal: any, crunchbase?: CrunchbaseCompany): string {
    return `# Investment Memo: ${deal.companyName}

## Executive Summary
${deal.companyName} operates in the ${deal.sector} sector. ${deal.description}

## Investment Thesis
The company is positioned in the ${deal.sector} space with ${deal.fundingToDate || 'significant'} funding to date. 

## Risk Factors
- Market risk in competitive ${deal.sector} sector
- Execution risk on growth plans
- Valuation risk at current levels

## Recommendation: **CONSIDER**

Further diligence required on competitive positioning and unit economics.

---
*Memo generated: ${new Date().toLocaleDateString()}*`;
  }

  private getMockCrunchbaseData(companyName: string): CrunchbaseCompany {
    const mockData: Record<string, CrunchbaseCompany> = {
      'Anduril Industries': {
        name: 'Anduril Industries',
        description: 'Defense technology company building autonomous systems, AI-powered drones, and border security solutions.',
        fundingTotal: '$2.3B',
        fundingRounds: [
          { date: '2024-12', series: 'Series E', amount: '$600M', valuation: '$8.5B', leadInvestors: ['Founders Fund'], investors: ['Founders Fund', '8VC'] },
          { date: '2022-06', series: 'Series D', amount: '$1.5B', valuation: '$8.4B', leadInvestors: ['Valor Equity Partners'], investors: ['Valor', 'Founders Fund'] },
        ],
        investors: [
          { name: 'Founders Fund', type: 'vc', lead: true },
          { name: '8VC', type: 'vc', lead: false },
          { name: 'Valor Equity Partners', type: 'vc', lead: true },
          { name: 'Elad Gil', type: 'angel', lead: false },
        ],
        employees: '3,000+',
        founded: '2017',
        website: 'anduril.com',
        linkedin: 'linkedin.com/company/anduril-industries',
        twitter: '@anduriltech',
        categories: ['Defense', 'Artificial Intelligence', 'Drones', 'National Security'],
        location: 'Costa Mesa, CA',
        competitors: [
          { name: 'Shield AI', description: 'Autonomous drone swarming', funding: '$1B+', valuation: '$2.8B' },
          { name: 'Palantir', description: 'Defense data analytics', funding: 'Public', valuation: '$80B+' },
        ],
        news: [
          { date: '2024-12-15', title: 'Anduril Raises $600M at $8.5B Valuation', source: 'TechCrunch', url: '#', sentiment: 'positive' },
          { date: '2024-11-20', title: 'Anduril Wins $250M Air Force Contract', source: 'Defense News', url: '#', sentiment: 'positive' },
        ],
        lastUpdated: '2025-01-15',
      },
      'Hermeus': {
        name: 'Hermeus',
        description: 'Hypersonic aircraft for defense and commercial applications.',
        fundingTotal: '$200M',
        fundingRounds: [
          { date: '2023-08', series: 'Series B', amount: '$100M', valuation: '$1.2B', leadInvestors: ['Khosla Ventures'], investors: ['Khosla', 'Lux Capital'] },
        ],
        investors: [
          { name: 'Khosla Ventures', type: 'vc', lead: true },
          { name: 'Lux Capital', type: 'vc', lead: false },
          { name: 'Cathie Wood', type: 'angel', lead: false },
        ],
        employees: '500+',
        founded: '2018',
        website: 'hermeus.com',
        linkedin: 'linkedin.com/company/hermeus',
        twitter: '@hermeuscorp',
        categories: ['Aerospace', 'Hypersonics', 'Defense', 'Aviation'],
        location: 'Atlanta, GA',
        competitors: [
          { name: 'Boeing', description: 'Traditional aerospace', funding: 'Public', valuation: '$130B' },
          { name: 'Lockheed Martin', description: 'Defense aerospace', funding: 'Public', valuation: '$110B' },
        ],
        news: [
          { date: '2024-10-05', title: 'Hermeus Quarterhorse Prototype Testing Progress', source: 'Aviation Week', url: '#', sentiment: 'positive' },
        ],
        lastUpdated: '2025-01-10',
      },
    };

    return mockData[companyName] || {
      name: companyName,
      description: dealData.find((d: any) => d.companyName === companyName)?.description || '',
      fundingTotal: 'Unknown',
      fundingRounds: [],
      investors: [],
      employees: 'Unknown',
      founded: '',
      website: '',
      linkedin: '',
      twitter: '',
      categories: [],
      location: '',
      competitors: [],
      news: [],
      lastUpdated: new Date().toISOString(),
    };
  }

  private getMockNews(companyName: string): NewsItem[] {
    const mockNews: Record<string, NewsItem[]> = {
      'Anduril Industries': [
        { date: '2024-12-15', title: 'Anduril Raises $600M at $8.5B Valuation', source: 'TechCrunch', url: 'https://techcrunch.com', sentiment: 'positive' },
        { date: '2024-11-20', title: 'Anduril Wins $250M Air Force Contract for Autonomous Systems', source: 'Defense News', url: '#', sentiment: 'positive' },
        { date: '2024-10-08', title: 'Palmer Luckey Discusses Future of Defense Tech at Tech Summit', source: 'The Information', url: '#', sentiment: 'neutral' },
      ],
      'Hermeus': [
        { date: '2024-12-20', title: 'Hermeus Successfully Tests Quarterhorse Engine', source: 'Aviation Week', url: '#', sentiment: 'positive' },
        { date: '2024-09-15', title: 'Hypersonic Race Heats Up Between US and China', source: 'Defense One', url: '#', sentiment: 'neutral' },
      ],
    };

    return mockNews[companyName] || [
      { date: new Date().toISOString(), title: `${companyName} in the News`, source: 'Various', url: '#', sentiment: 'neutral' },
    ];
  }

  private analyzeSentiment(text: string): 'positive' | 'neutral' | 'negative' {
    const positiveWords = ['growth', 'wins', 'raises', 'partnership', 'launch', 'success', 'record', 'expansion'];
    const negativeWords = ['layoffs', 'loss', 'decline', 'cuts', 'shutdown', 'failure', 'investigation'];
    
    const lowerText = text.toLowerCase();
    let score = 0;
    
    positiveWords.forEach(word => { if (lowerText.includes(word)) score++; });
    negativeWords.forEach(word => { if (lowerText.includes(word)) score--; });
    
    if (score > 0) return 'positive';
    if (score < 0) return 'negative';
    return 'neutral';
  }
}

// Import deal data for fallback
import { mockDeals } from './data';
const dealData = mockDeals;
