export interface DealMemo {
  id: string;
  dealId: string;
  generatedAt: string;
  sections: MemoSection[];
  executiveSummary: string;
  investmentThesis: string;
  riskFactors: string[];
  recommendation: 'pass' | 'consider' | 'strong-interest' | 'invest';
  targetAllocation?: string;
  tags: string[];
}

export interface MemoSection {
  title: string;
  content: string;
  type: 'market' | 'team' | 'product' | 'traction' | 'financials' | 'competition' | 'risks';
}

export interface CrunchbaseCompany {
  name: string;
  description: string;
  fundingTotal: string;
  fundingRounds: FundingRound[];
  investors: Investor[];
  employees: string;
  founded: string;
  website: string;
  linkedin: string;
  twitter: string;
  categories: string[];
  location: string;
  competitors: Competitor[];
  news: NewsItem[];
  lastUpdated: string;
}

export interface FundingRound {
  date: string;
  series: string;
  amount: string;
  valuation?: string;
  leadInvestors: string[];
  investors: string[];
}

export interface Investor {
  name: string;
  type: 'vc' | 'angel' | 'corporate' | 'other';
  lead: boolean;
}

export interface Competitor {
  name: string;
  description: string;
  funding: string;
  valuation?: string;
}

export interface NewsItem {
  date: string;
  title: string;
  source: string;
  url: string;
  sentiment: 'positive' | 'neutral' | 'negative';
}

export interface ApiConfig {
  crunchbase?: {
    apiKey: string;
    enabled: boolean;
  };
  pitchbook?: {
    apiKey: string;
    enabled: boolean;
  };
  openai?: {
    apiKey: string;
    model: string;
    enabled: boolean;
  };
  newsApi?: {
    apiKey: string;
    enabled: boolean;
  };
}

export interface EnrichedDeal extends Deal {
  crunchbaseData?: CrunchbaseCompany;
  memo?: DealMemo;
  newsAlerts: NewsItem[];
  lastEnriched?: string;
}

import { Deal } from './index';
