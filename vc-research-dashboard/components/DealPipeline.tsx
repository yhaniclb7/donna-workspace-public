'use client'

import { Deal } from '@/types';
import { dealStages } from '@/lib/data';
import { 
  Building2, 
  MapPin, 
  DollarSign, 
  Clock, 
  AlertCircle,
  ArrowRight,
  CheckCircle2,
  XCircle,
  Loader2,
  Search,
  Filter
} from 'lucide-react';
import { useState } from 'react';

interface DealPipelineProps {
  deals: Deal[];
  onDealClick?: (deal: Deal) => void;
}

const priorityColors = {
  urgent: 'text-rose-400 bg-rose-400/10 border-rose-400/20',
  high: 'text-amber-400 bg-amber-400/10 border-amber-400/20',
  medium: 'text-blue-400 bg-blue-400/10 border-blue-400/20',
  low: 'text-slate-400 bg-slate-400/10 border-slate-400/20',
};

const sectorIcons: Record<string, string> = {
  defense: '🛡️',
  aerospace: '✈️',
  space: '🚀',
  'ai-ml': '🤖',
  cyber: '🔒',
  energy: '⚡',
  manufacturing: '🏭',
};

export default function DealPipeline({ deals, onDealClick }: DealPipelineProps) {
  const [filterSector, setFilterSector] = useState<string>('all');
  const [filterPriority, setFilterPriority] = useState<string>('all');

  const sectors = ['all', ...Array.from(new Set(deals.map(d => d.sector)))];
  
  const filteredDeals = deals.filter(deal => {
    const sectorMatch = filterSector === 'all' || deal.sector === filterSector;
    const priorityMatch = filterPriority === 'all' || deal.priority === filterPriority;
    return sectorMatch && priorityMatch;
  });

  const dealsByStage = dealStages.map(stage => ({
    ...stage,
    deals: filteredDeals.filter(d => d.stage === stage.value),
  }));

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
      <div className="p-4 border-b border-slate-800">
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div>
            <h2 className="text-lg font-semibold text-white">Deal Pipeline</h2>
            <p className="text-slate-400 text-sm">{filteredDeals.length} active opportunities</p>
          </div>
          <div className="flex items-center gap-2">
            <select
              value={filterSector}
              onChange={(e) => setFilterSector(e.target.value)}
              className="bg-slate-800 border border-slate-700 rounded-lg px-3 py-1.5 text-sm text-white"
            >
              <option value="all">All Sectors</option>
              {sectors.filter(s => s !== 'all').map(s => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
            <select
              value={filterPriority}
              onChange={(e) => setFilterPriority(e.target.value)}
              className="bg-slate-800 border border-slate-700 rounded-lg px-3 py-1.5 text-sm text-white"
            >
              <option value="all">All Priorities</option>
              <option value="urgent">Urgent</option>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <div className="flex gap-4 p-4 min-w-max">
          {dealsByStage.map((stage) => (
            <div key={stage.value} className="w-72 flex-shrink-0">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className={`w-3 h-3 rounded-full ${stage.color}`} />
                  <span className="text-sm font-medium text-white">{stage.label}</span>
                </div>
                <span className="text-xs text-slate-500 bg-slate-800 px-2 py-0.5 rounded-full">
                  {stage.deals.length}
                </span>
              </div>

              <div className="space-y-3">
                {stage.deals.map((deal) => (
                  <div
                    key={deal.id}
                    onClick={() => onDealClick?.(deal)}
                    className="bg-slate-800 border border-slate-700 rounded-lg p-3 hover:border-slate-600 cursor-pointer transition-all hover:shadow-lg group"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-lg">{sectorIcons[deal.sector] || '🏢'}</span>
                        <h3 className="font-medium text-white text-sm group-hover:text-blue-400 transition-colors">
                          {deal.companyName}
                        </h3>
                      </div>
                      <span className={`text-xs px-2 py-0.5 rounded-full border ${priorityColors[deal.priority]}`}>
                        {deal.priority}
                      </span>
                    </div>

                    <p className="text-slate-400 text-xs mt-2 line-clamp-2">
                      {deal.description}
                    </p>

                    <div className="flex items-center gap-3 mt-3 text-xs text-slate-500">
                      <div className="flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        {deal.location.split(',')[0]}
                      </div>
                      {deal.valuation && (
                        <div className="flex items-center gap-1">
                          <DollarSign className="w-3 h-3" />
                          {deal.valuation}
                        </div>
                      )}
                    </div>

                    {deal.nextAction && (
                      <div className="mt-3 pt-3 border-t border-slate-700">
                        <div className="flex items-center gap-1.5 text-xs">
                          <Clock className="w-3 h-3 text-amber-400" />
                          <span className="text-slate-400">Next:</span>
                          <span className="text-amber-400">{deal.nextAction}</span>
                        </div>
                      </div>
                    )}
                  </div>
                ))}

                {stage.deals.length === 0 && (
                  <div className="text-center py-8 text-slate-600 text-sm">
                    No deals
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
