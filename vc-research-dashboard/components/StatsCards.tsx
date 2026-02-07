'use client'

import { Deal, VCFirm, AmericanDynamismCo } from '@/types';
import { 
  TrendingUp, 
  Users, 
  Target, 
  Calendar, 
  AlertCircle,
  Building2,
  Rocket,
  Briefcase
} from 'lucide-react';

interface StatsCardsProps {
  deals: Deal[];
  firms: VCFirm[];
  dynamismCompanies: AmericanDynamismCo[];
}

export default function StatsCards({ deals, firms, dynamismCompanies }: StatsCardsProps) {
  const activeDeals = deals.filter(d => d.stage !== 'passed' && d.stage !== 'portfolio');
  const portfolioDeals = deals.filter(d => d.stage === 'portfolio');
  const activeFirms = firms.filter(f => f.status === 'active' || f.status === 'meeting-scheduled');
  const upcomingMeetings = firms.filter(f => f.nextMeeting).length;
  
  const stats = [
    {
      title: 'Active Deals',
      value: activeDeals.length,
      subtitle: `${portfolioDeals.length} in portfolio`,
      icon: Briefcase,
      color: 'bg-blue-500',
      trend: '+2 this week',
    },
    {
      title: 'VC Relationships',
      value: activeFirms.length,
      subtitle: `${firms.length} total firms tracked`,
      icon: Building2,
      color: 'bg-indigo-500',
      trend: '3 warm intros',
    },
    {
      title: 'Am. Dynamism',
      value: dynamismCompanies.length,
      subtitle: `${dynamismCompanies.filter(c => c.relevanceScore >= 8).length} high priority`,
      icon: Rocket,
      color: 'bg-amber-500',
      trend: 'Tracking leaders',
    },
    {
      title: 'Upcoming Meetings',
      value: upcomingMeetings,
      subtitle: 'Next: Feb 12 with Shield',
      icon: Calendar,
      color: 'bg-emerald-500',
      trend: 'Prepped & ready',
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, idx) => (
        <div
          key={idx}
          className="bg-slate-900 border border-slate-800 rounded-xl p-4 hover:border-slate-700 transition-colors"
        >
          <div className="flex items-start justify-between">
            <div>
              <p className="text-slate-400 text-sm">{stat.title}</p>
              <p className="text-2xl font-bold text-white mt-1">{stat.value}</p>
              <p className="text-slate-500 text-xs mt-1">{stat.subtitle}</p>
            </div>
            <div className={`${stat.color} p-2 rounded-lg`}>
              <stat.icon className="w-5 h-5 text-white" />
            </div>
          </div>
          <div className="mt-3 flex items-center gap-2">
            <TrendingUp className="w-3 h-3 text-emerald-400" />
            <span className="text-xs text-emerald-400">{stat.trend}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
