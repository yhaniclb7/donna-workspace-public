import { Deal, VCFirm, MeetingPrep, AmericanDynamismCo, DealStage } from '@/types';

export const dealStages: { value: DealStage; label: string; color: string }[] = [
  { value: 'sourced', label: 'Sourced', color: 'bg-slate-600' },
  { value: 'screening', label: 'Screening', color: 'bg-blue-600' },
  { value: 'partner-meeting', label: 'Partner Meeting', color: 'bg-indigo-600' },
  { value: 'diligence', label: 'Due Diligence', color: 'bg-amber-600' },
  { value: 'portfolio', label: 'Portfolio', color: 'bg-emerald-600' },
  { value: 'passed', label: 'Passed', color: 'bg-rose-600' },
];

export const mockDeals: Deal[] = [
  {
    id: 'd1',
    companyName: 'Anduril Industries',
    description: 'Defense technology company building autonomous systems, AI-powered drones, and border security solutions.',
    sector: 'defense',
    stage: 'partner-meeting',
    priority: 'high',
    valuation: '$8.5B',
    round: 'Series E',
    leadSource: 'Shield Capital Intro',
    location: 'Costa Mesa, CA',
    founded: '2017',
    fundingToDate: '$2.3B',
    notes: 'Strong traction with DOD contracts. Palmer Luckey founder. Valuation compressed from peak but still premium.',
    lastContact: '2026-02-04',
    nextAction: 'Follow up on 2026 roadmap',
    createdAt: '2026-01-15',
    updatedAt: '2026-02-04',
  },
  {
    id: 'd2',
    companyName: 'Hermeus',
    description: 'Hypersonic aircraft for defense and commercial applications. Building the world\'s fastest reusable aircraft.',
    sector: 'aerospace',
    stage: 'diligence',
    priority: 'urgent',
    valuation: '$1.2B',
    round: 'Series B',
    leadSource: 'Kellogg Network',
    location: 'Atlanta, GA',
    founded: '2018',
    fundingToDate: '$200M',
    notes: 'Quarterhorse prototype testing. DOD contracts in place. Strong team with SpaceX/Blue Origin pedigree.',
    lastContact: '2026-02-05',
    nextAction: 'Schedule technical deep-dive',
    createdAt: '2026-01-20',
    updatedAt: '2026-02-05',
  },
  {
    id: 'd3',
    companyName: 'Epirus',
    description: 'Directed energy and high-power microwave systems for counter-drone defense.',
    sector: 'defense',
    stage: 'screening',
    priority: 'medium',
    valuation: '$1.8B',
    round: 'Series C',
    leadSource: '8VC Referral',
    location: 'Torrance, CA',
    founded: '2018',
    fundingToDate: '$300M',
    notes: 'Leonidas counter-drone system deployed. Multiple DOD contracts. Competitive landscape heating up.',
    lastContact: '2026-02-01',
    nextAction: 'Request cap table',
    createdAt: '2026-01-28',
    updatedAt: '2026-02-01',
  },
  {
    id: 'd4',
    companyName: 'True Anomaly',
    description: 'Autonomous spacecraft for space domain awareness and orbital security.',
    sector: 'space',
    stage: 'sourced',
    priority: 'high',
    valuation: '$250M',
    round: 'Series A',
    leadSource: 'Space Force Pitch Day',
    location: 'Denver, CO',
    founded: '2022',
    fundingToDate: '$30M',
    notes: 'Jackal autonomous orbital vehicle. Strong government traction. Early stage with high potential.',
    lastContact: '2026-02-03',
    nextAction: 'Initial outreach to CEO',
    createdAt: '2026-02-03',
    updatedAt: '2026-02-03',
  },
  {
    id: 'd5',
    companyName: 'Defense Unicorns',
    description: 'Open-source software factory for national security systems. Kubernetes-based platform.',
    sector: 'cyber',
    stage: 'screening',
    priority: 'medium',
    valuation: '$500M',
    round: 'Series B',
    leadSource: 'TechCrunch',
    location: 'Colorado Springs, CO',
    founded: '2021',
    fundingToDate: '$35M',
    notes: 'Big contracts with Air Force/Space Force. Open source model with gov support. Differentiated approach.',
    lastContact: '2026-01-30',
    nextAction: 'Competitive analysis',
    createdAt: '2026-01-25',
    updatedAt: '2026-01-30',
  },
];

export const mockVCFirms: VCFirm[] = [
  {
    id: 'vc1',
    name: 'Shield Capital',
    focus: ['defense', 'dual-use', 'national security', 'aerospace'],
    aum: '$1.2B',
    stage: ['Series A', 'Series B', 'Series C'],
    location: 'San Francisco, CA',
    website: 'shieldcapital.com',
    status: 'meeting-scheduled',
    relationshipStrength: 4,
    contacts: [
      {
        id: 'c1',
        name: 'Raj Shah',
        title: 'Managing Partner',
        email: 'raj@shieldcapital.com',
        linkedin: 'linkedin.com/in/rajshah',
        firmId: 'vc1',
        relationshipStrength: 4,
        lastContact: '2026-02-05',
        notes: 'Former DoD. Deep defense tech expertise. Meeting scheduled Feb 12. Warm intro via SkillBridge contact.',
      },
      {
        id: 'c2',
        name: 'Eric Schmidt',
        title: 'Strategic Advisor',
        linkedin: 'linkedin.com/in/ericschmidt',
        firmId: 'vc1',
        relationshipStrength: 1,
        notes: 'Former Google CEO. LPs include his foundation. High-level strategic value.',
      },
    ],
    portfolioCompanies: ['Anduril', 'Rebellion Defense', 'Shift5', 'Cognitivespace'],
    notes: 'Top defense tech fund. Perfect fit for Yhanic\'s background. Portfolio synergies with our deal flow.',
    lastInteraction: '2026-02-05',
    nextMeeting: '2026-02-12',
  },
  {
    id: 'vc2',
    name: '8VC',
    focus: ['enterprise', 'defense', 'logistics', 'AI'],
    aum: '$6B+',
    stage: ['Seed', 'Series A', 'Series B'],
    location: 'San Francisco, CA',
    website: '8vc.com',
    status: 'target',
    relationshipStrength: 2,
    contacts: [
      {
        id: 'c3',
        name: 'Joe Lonsdale',
        title: 'Founding Partner',
        linkedin: 'linkedin.com/in/joelonsdale',
        firmId: 'vc2',
        relationshipStrength: 2,
        notes: 'Palantir co-founder. Strong defense connections. Need warm intro.',
      },
    ],
    portfolioCompanies: ['Palantir', 'Anduril', 'Epirus', 'Joby Aviation'],
    notes: 'Major defense tech investor. Joe Lonsdale actively recruiting veterans. High priority target.',
  },
  {
    id: 'vc3',
    name: 'Lux Capital',
    focus: ['frontier tech', 'defense', 'space', 'deeptech'],
    aum: '$5B+',
    stage: ['Seed', 'Series A', 'Series B'],
    location: 'New York, NY / SF, CA',
    website: 'luxcapital.com',
    status: 'active',
    relationshipStrength: 3,
    contacts: [
      {
        id: 'c4',
        name: 'Josh Wolfe',
        title: 'Co-Founder & Managing Partner',
        linkedin: 'linkedin.com/in/joshwolfe',
        firmId: 'vc3',
        relationshipStrength: 3,
        lastContact: '2026-01-20',
        notes: 'Thought leader in defense tech. Met at Kellogg event. Responsive on Twitter/X.',
      },
    ],
    portfolioCompanies: ['Anduril', 'Hermeus', 'Relativity Space', 'Kymeta'],
    notes: 'Leading frontier tech fund. Strong space/defense portfolio. Good cultural fit.',
    lastInteraction: '2026-01-20',
  },
  {
    id: 'vc4',
    name: 'Founders Fund',
    focus: ['frontier tech', 'defense', 'AI', 'biotech'],
    aum: '$12B+',
    stage: ['Series A', 'Series B', 'Growth'],
    location: 'San Francisco, CA / Miami, FL',
    website: 'foundersfund.com',
    status: 'target',
    relationshipStrength: 1,
    contacts: [
      {
        id: 'c5',
        name: 'Trae Stephens',
        title: 'Partner',
        linkedin: 'linkedin.com/in/traestephens',
        firmId: 'vc4',
        relationshipStrength: 1,
        notes: 'Anduril co-founder. Defense tech specialist. Need intro through mutual connection.',
      },
    ],
    portfolioCompanies: ['Anduril', 'SpaceX', 'Palantir', 'Epiroc'],
    notes: 'Top-tier fund with strong defense thesis. Trae Stephens ideal contact.',
  },
  {
    id: 'vc5',
    name: 'Point72 Ventures',
    focus: ['fintech', 'defense', 'enterprise', 'AI'],
    aum: '$2.5B',
    stage: ['Seed', 'Series A', 'Series B'],
    location: 'Stamford, CT / SF, CA',
    website: 'p72.vc',
    status: 'intro-pending',
    relationshipStrength: 2,
    contacts: [
      {
        id: 'c6',
        name: 'Ethan Batraski',
        title: 'Partner',
        linkedin: 'linkedin.com/in/ethanbatraski',
        firmId: 'vc5',
        relationshipStrength: 2,
        notes: 'Defense/enterprise focus. Warm intro in progress via Kellogg alum.',
      },
    ],
    portfolioCompanies: ['Rebellion Defense', 'Shield AI', 'Evolv Technology'],
    notes: 'Active defense investor. Good reputation for operator support.',
  },
];

export const mockMeetingPreps: MeetingPrep[] = [
  {
    id: 'mp1',
    firmId: 'vc1',
    contactId: 'c1',
    meetingDate: '2026-02-12T14:00:00',
    agenda: [
      'Introduction & background exchange',
      'Discuss current deal flow and investment thesis',
      'Explore co-investment opportunities',
      'Potential value-add collaboration',
    ],
    researchNotes: `Raj Shah: Former DoD official, deep defense tech expertise. Shield Capital $1.2B AUM focused on dual-use. Portfolio includes Anduril, Rebellion Defense.

Key Topics:
- His view on defense tech market timing
- How he evaluates dual-use vs pure defense
- Interest in aerospace/deep tech
- Veteran operator perspective value`,
    questions: [
      'What are you most excited about in defense tech right now?',
      'How do you think about valuation compression in the sector?',
      'What role do veteran operators play in your portfolio?',
      'Are there specific aerospace opportunities on your radar?',
    ],
    valueProposition: `Yhanic's unique value:
- 11 years F/A-18 & F-5N pilot, Navy veteran
- Deep DOD network and operational expertise
- Kellogg EMBA network
- AI automation company operator
- Can evaluate technical claims and DOD sales cycles`,
    completed: false,
  },
];

export const mockAmericanDynamism: AmericanDynamismCo[] = [
  {
    id: 'ad1',
    name: 'SpaceX',
    description: 'Spacecraft manufacturing, launch services, and satellite communications.',
    sector: 'space',
    location: 'Hawthorne, CA',
    founded: '2002',
    employees: '15,000+',
    funding: 'Private',
    valuation: '$180B+',
    leadInvestors: ['Founders Fund', 'a16z', 'Google'],
    relevanceScore: 9,
    notes: 'The gold standard. Starship program, Starlink government contracts. Benchmark for aerospace.',
  },
  {
    id: 'ad2',
    name: 'Anduril Industries',
    description: 'AI-powered autonomous defense systems, drones, and border security.',
    sector: 'defense',
    location: 'Costa Mesa, CA',
    founded: '2017',
    employees: '3,000+',
    funding: '$2.3B',
    valuation: '$8.5B',
    leadInvestors: ['Founders Fund', '8VC', 'Elad Gil'],
    relevanceScore: 10,
    notes: 'Category leader. Palmer Luckey founder. Strong DOD traction. Potential investment target.',
  },
  {
    id: 'ad3',
    name: 'Hermeus',
    description: 'Hypersonic aircraft for defense and commercial applications.',
    sector: 'aerospace',
    location: 'Atlanta, GA',
    founded: '2018',
    employees: '500+',
    funding: '$200M',
    valuation: '$1.2B',
    leadInvestors: ['Khosla Ventures', 'Lux Capital', 'Cathie Wood'],
    relevanceScore: 9,
    notes: 'Quarterhorse prototype. SpaceX/Blue Origin pedigree. Hot sector (hypersonics).',
  },
  {
    id: 'ad4',
    name: 'Relativity Space',
    description: '3D-printed rockets and launch services.',
    sector: 'space',
    location: 'Long Beach, CA',
    founded: '2015',
    employees: '1,000+',
    funding: '$1.3B',
    valuation: '$4.2B',
    leadInvestors: ['Tiger Global', 'Fidelity', 'Baillie Gifford'],
    relevanceScore: 7,
    notes: '3D printing approach to rockets. First launch attempt failed but learning fast.',
  },
  {
    id: 'ad5',
    name: 'Skydio',
    description: 'AI-powered autonomous drones for defense and enterprise.',
    sector: 'defense',
    location: 'San Mateo, CA',
    founded: '2014',
    employees: '1,000+',
    funding: '$562M',
    valuation: '$2.2B',
    leadInvestors: ['Andreessen Horowitz', 'Bessemer', 'Lockheed Martin'],
    relevanceScore: 8,
    notes: 'US-based drone leader (vs DJI). Strong DOD contracts. Autonomy first approach.',
  },
  {
    id: 'ad6',
    name: 'Commonwealth Fusion Systems',
    description: 'Compact fusion power plants using high-temperature superconductors.',
    sector: 'energy',
    location: 'Cambridge, MA',
    founded: '2018',
    employees: '400+',
    funding: '$2B',
    valuation: '$7B+',
    leadInvestors: ['Tiger Global', 'Bill Gates', 'Google'],
    relevanceScore: 7,
    notes: 'Energy independence = national security. Massive addressable market. Long timeline.',
  },
  {
    id: 'ad7',
    name: 'Hadrian',
    description: 'Automated precision manufacturing for aerospace and defense.',
    sector: 'manufacturing',
    location: 'Los Angeles, CA',
    founded: '2019',
    employees: '200+',
    funding: '$180M',
    valuation: '$1B',
    leadInvestors: ['Andreessen Horowitz', 'Lux Capital'],
    relevanceScore: 8,
    notes: 'Reshoring critical manufacturing. Defense supply chain priority. Rapid growth.',
  },
];

export const getDealsByStage = () => {
  const counts: Record<string, number> = {};
  dealStages.forEach(stage => counts[stage.value] = 0);
  mockDeals.forEach(deal => counts[deal.stage]++);
  return dealStages.map(stage => ({
    name: stage.label,
    value: counts[stage.value],
    color: stage.color,
  }));
};

export const getDealsBySector = () => {
  const sectors: Record<string, number> = {};
  mockDeals.forEach(deal => {
    sectors[deal.sector] = (sectors[deal.sector] || 0) + 1;
  });
  return Object.entries(sectors).map(([name, value]) => ({ name, value }));
};

export const getUpcomingMeetings = () => {
  return mockVCFirms
    .filter(firm => firm.nextMeeting)
    .sort((a, b) => new Date(a.nextMeeting!).getTime() - new Date(b.nextMeeting!).getTime())
    .slice(0, 3);
};

export const getHighPriorityDeals = () => {
  return mockDeals
    .filter(deal => deal.priority === 'urgent' || deal.priority === 'high')
    .sort((a, b) => {
      const priorityOrder = { urgent: 0, high: 1, medium: 2, low: 3 };
      return priorityOrder[a.priority] - priorityOrder[b.priority];
    });
};
