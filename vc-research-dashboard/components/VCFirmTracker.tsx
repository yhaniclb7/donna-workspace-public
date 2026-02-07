'use client'

import { VCFirm } from '@/types';
import { 
  Building2, 
  MapPin, 
  Globe, 
  Users, 
  TrendingUp,
  Target,
  ArrowRight,
  Calendar,
  Mail,
  Linkedin
} from 'lucide-react';

interface VCFirmTrackerProps {
  firms: VCFirm[];
  onFirmClick?: (firm: VCFirm) => void;
}

const statusColors: Record<string, string> = {
  'target': 'bg-slate-600',
  'active': 'bg-emerald-600',
  'intro-pending': 'bg-amber-600',
  'meeting-scheduled': 'bg-blue-600',
  'term-sheet': 'bg-violet-600',
  'closed': 'bg-rose-600',
};

const statusLabels: Record<string, string> = {
  'target': 'Target',
  'active': 'Active',
  'intro-pending': 'Intro Pending',
  'meeting-scheduled': 'Meeting Scheduled',
  'term-sheet': 'Term Sheet',
  'closed': 'Closed',
};

export default function VCFirmTracker({ firms, onFirmClick }: VCFirmTrackerProps) {
  const sortedFirms = [...firms].sort((a, b) => b.relationshipStrength - a.relationshipStrength);

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
      <div className="p-4 border-b border-slate-800">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-white">VC Firm Tracker</h2>
            <p className="text-slate-400 text-sm">{firms.length} firms in network</p>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-500">Sort by:</span>
            <select className="bg-slate-800 border border-slate-700 rounded-lg px-3 py-1.5 text-sm text-white">
              <option>Relationship Strength</option>
              <option>Last Contact</option>
              <option>AUM</option>
            </select>
          </div>
        </div>
      </div>

      <div className="divide-y divide-slate-800">
        {sortedFirms.map((firm) => (
          <div
            key={firm.id}
            onClick={() => onFirmClick?.(firm)}
            className="p-4 hover:bg-slate-800/50 cursor-pointer transition-colors group"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3">
                  <h3 className="font-semibold text-white group-hover:text-blue-400 transition-colors">
                    {firm.name}
                  </h3>
                  <span className={`text-xs px-2 py-0.5 rounded-full text-white ${statusColors[firm.status]}`}>
                    {statusLabels[firm.status]}
                  </span>
                  {firm.nextMeeting && (
                    <span className="text-xs px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-400 flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {new Date(firm.nextMeeting).toLocaleDateString()}
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-4 mt-2 text-sm text-slate-400">
                  <div className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5" />
                    {firm.location.split(',')[0]}
                  </div>
                  {firm.aum && (
                    <div className="flex items-center gap-1">
                      <TrendingUp className="w-3.5 h-3.5" />
                      {firm.aum} AUM
                    </div>
                  )}
                  {firm.website && (
                    <div className="flex items-center gap-1">
                      <Globe className="w-3.5 h-3.5" />
                      {firm.website}
                    </div>
                  )}
                </div>

                <div className="flex flex-wrap gap-2 mt-3">
                  {firm.focus.slice(0, 4).map((focus, idx) => (
                    <span
                      key={idx}
                      className="text-xs px-2 py-1 rounded-md bg-slate-800 text-slate-300 border border-slate-700"
                    >
                      {focus}
                    </span>
                  ))}
                </div>

                {firm.contacts.length > 0 && (
                  <div className="mt-3 flex items-center gap-4">
                    <div className="flex -space-x-2">
                      {firm.contacts.slice(0, 3).map((contact, idx) => (
                        <div
                          key={idx}
                          className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-violet-600 flex items-center justify-center text-white text-xs font-medium border-2 border-slate-900"
                          title={contact.name}
                        >
                          {contact.name.split(' ').map(n => n[0]).join('')}
                        </div>
                      ))}
                    </div>
                    <div className="text-xs text-slate-500">
                      {firm.contacts[0].name} • {firm.contacts[0].title}
                    </div>
                  </div>
                )}
              </div>

              <div className="flex flex-col items-end gap-2">
                <div className="flex items-center gap-2">
                  <span className="text-xs text-slate-500">Relationship</span>
                  <div className="flex gap-0.5">
                    {Array.from({ length: 10 }).map((_, i) => (
                      <div
                        key={i}
                        className={`w-1.5 h-4 rounded-full ${
                          i < firm.relationshipStrength ? 'bg-blue-500' : 'bg-slate-700'
                        }`}
                      />
                    ))}
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-600 group-hover:text-blue-400 transition-colors" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
