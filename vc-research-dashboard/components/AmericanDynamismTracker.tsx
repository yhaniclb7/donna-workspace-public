'use client'

import { AmericanDynamismCo } from '@/types';
import { 
  Rocket, 
  MapPin, 
  TrendingUp, 
  Star,
  Building2,
  Target,
  ExternalLink
} from 'lucide-react';
import { useState } from 'react';

interface AmericanDynamismTrackerProps {
  companies: AmericanDynamismCo[];
}

const sectorIcons: Record<string, string> = {
  defense: '🛡️',
  aerospace: '✈️',
  space: '🚀',
  'ai-ml': '🤖',
  cyber: '🔒',
  energy: '⚡',
  manufacturing: '🏭',
};

export default function AmericanDynamismTracker({ companies }: AmericanDynamismTrackerProps) {
  const [sortBy, setSortBy] = useState<'relevance' | 'valuation' | 'funding'>('relevance');

  const sortedCompanies = [...companies].sort((a, b) => {
    if (sortBy === 'relevance') return b.relevanceScore - a.relevanceScore;
    if (sortBy === 'valuation') {
      const valA = parseValuation(a.valuation);
      const valB = parseValuation(b.valuation);
      return valB - valA;
    }
    return 0;
  });

  function parseValuation(val?: string): number {
    if (!val) return 0;
    const num = parseFloat(val.replace(/[^0-9.]/g, ''));
    if (val.includes('B')) return num * 1000;
    if (val.includes('M')) return num;
    return num;
  }

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
      <div className="p-4 border-b border-slate-800">
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div>
            <h2 className="text-lg font-semibold text-white">American Dynamism</h2>
            <p className="text-slate-400 text-sm">{companies.length} companies tracked</p>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-500">Sort:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-slate-800 border border-slate-700 rounded-lg px-3 py-1.5 text-sm text-white"
            >
              <option value="relevance">Relevance Score</option>
              <option value="valuation">Valuation</option>
              <option value="funding">Funding</option>
            </select>
          </div>
        </div>
      </div>

      <div className="divide-y divide-slate-800 max-h-96 overflow-y-auto">
        {sortedCompanies.map((company) => (
          <div
            key={company.id}
            className="p-4 hover:bg-slate-800/50 transition-colors"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{sectorIcons[company.sector] || '🏢'}</span>
                  <div>
                    <h3 className="font-semibold text-white">{company.name}</h3>
                    <div className="flex items-center gap-3 text-xs text-slate-400 mt-0.5">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        {company.location.split(',')[0]}
                      </span>
                      <span>Est. {company.founded}</span>
                      {company.employees && (
                        <span>{company.employees} employees</span>
                      )}
                    </div>
                  </div>
                </div>

                <p className="text-slate-400 text-sm mt-3 line-clamp-2">
                  {company.description}
                </p>

                <div className="flex items-center gap-4 mt-3 text-sm">
                  {company.valuation && (
                    <div className="flex items-center gap-1.5 text-emerald-400">
                      <TrendingUp className="w-4 h-4" />
                      <span className="font-medium">{company.valuation}</span>
                    </div>
                  )}
                  <div className="flex items-center gap-1.5 text-slate-400">
                    <Building2 className="w-4 h-4" />
                    <span>{company.funding} raised</span>
                  </div>
                </div>

                {company.leadInvestors.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-3">
                    {company.leadInvestors.map((investor, idx) => (
                      <span
                        key={idx}
                        className="text-xs px-2 py-1 rounded-md bg-slate-800 text-slate-300 border border-slate-700"
                      >
                        {investor}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              <div className="flex flex-col items-end gap-2">
                <div className="flex items-center gap-1.5">
                  <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                  <span className="text-lg font-bold text-white">{company.relevanceScore}</span>
                  <span className="text-xs text-slate-500">/10</span>
                </div>
                <span className="text-xs px-2 py-1 rounded-full bg-slate-800 text-slate-400 capitalize">
                  {company.sector}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
