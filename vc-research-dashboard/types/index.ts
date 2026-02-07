export type DealStage = 'sourced' | 'screening' | 'partner-meeting' | 'diligence' | 'portfolio' | 'passed';
export type Priority = 'low' | 'medium' | 'high' | 'urgent';
export type Sector = 'defense' | 'aerospace' | 'dual-use' | 'ai-ml' | 'space' | 'cyber' | 'energy' | 'manufacturing';

export interface Deal {
  id: string;
  companyName: string;
  description: string;
  sector: Sector;
  stage: DealStage;
  priority: Priority;
  valuation?: string;
  round?: string;
  leadSource: string;
  location: string;
  founded?: string;
  fundingToDate?: string;
  notes: string;
  lastContact?: string;
  nextAction?: string;
  createdAt: string;
  updatedAt: string;
}

export interface VCFirm {
  id: string;
  name: string;
  focus: string[];
  aum?: string;
  stage: string[];
  location: string;
  website?: string;
  status: 'target' | 'active' | 'intro-pending' | 'meeting-scheduled' | 'term-sheet' | 'closed';
  relationshipStrength: number; // 1-10
  contacts: Contact[];
  portfolioCompanies: string[];
  notes: string;
  lastInteraction?: string;
  nextMeeting?: string;
}

export interface Contact {
  id: string;
  name: string;
  title: string;
  email?: string;
  linkedin?: string;
  firmId: string;
  relationshipStrength: number;
  lastContact?: string;
  notes: string;
}

export interface MeetingPrep {
  id: string;
  firmId: string;
  contactId?: string;
  meetingDate: string;
  agenda: string[];
  researchNotes: string;
  questions: string[];
  valueProposition: string;
  outcome?: string;
  completed: boolean;
}

export interface AmericanDynamismCo {
  id: string;
  name: string;
  description: string;
  sector: Sector;
  location: string;
  founded: string;
  employees?: string;
  funding: string;
  valuation?: string;
  leadInvestors: string[];
  relevanceScore: number; // 1-10
  notes: string;
}
