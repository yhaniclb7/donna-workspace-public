'use client'

import { MeetingPrep, VCFirm } from '@/types';
import { 
  Calendar, 
  Clock, 
  CheckCircle2, 
  Circle,
  Target,
  FileText,
  Lightbulb,
  HelpCircle,
  ArrowRight,
  AlertCircle
} from 'lucide-react';

interface MeetingPrepPanelProps {
  meetingPreps: MeetingPrep[];
  firms: VCFirm[];
}

export default function MeetingPrepPanel({ meetingPreps, firms }: MeetingPrepPanelProps) {
  const upcomingPreps = meetingPreps
    .filter(p => !p.completed)
    .sort((a, b) => new Date(a.meetingDate).getTime() - new Date(b.meetingDate).getTime());

  const getFirmName = (firmId: string) => {
    return firms.find(f => f.id === firmId)?.name || 'Unknown Firm';
  };

  const getContactName = (firmId: string, contactId?: string) => {
    if (!contactId) return null;
    const firm = firms.find(f => f.id === firmId);
    return firm?.contacts.find(c => c.id === contactId)?.name;
  };

  if (upcomingPreps.length === 0) {
    return (
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 text-center">
        <div className="w-16 h-16 bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4">
          <Calendar className="w-8 h-8 text-slate-600" />
        </div>
        <h3 className="text-white font-medium mb-2">No Upcoming Meetings</h3>
        <p className="text-slate-400 text-sm">Schedule meetings with VC firms to see prep checklists here.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {upcomingPreps.map((prep) => {
        const firmName = getFirmName(prep.firmId);
        const contactName = getContactName(prep.firmId, prep.contactId);
        const daysUntil = Math.ceil((new Date(prep.meetingDate).getTime() - Date.now()) / (1000 * 60 * 60 * 24));

        return (
          <div
            key={prep.id}
            className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden"
          >
            <div className="p-4 border-b border-slate-800 bg-slate-800/30">
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-white">{firmName}</h3>
                    {contactName && (
                      <span className="text-slate-400">with {contactName}</span>
                    )}
                  </div>
                  <div className="flex items-center gap-3 mt-1 text-sm text-slate-400">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {new Date(prep.meetingDate).toLocaleDateString('en-US', {
                        weekday: 'short',
                        month: 'short',
                        day: 'numeric',
                        hour: 'numeric',
                        minute: '2-digit',
                      })}
                    </div>
                    <div className={`flex items-center gap-1 ${daysUntil <= 3 ? 'text-amber-400' : ''}`}>
                      <Clock className="w-4 h-4" />
                      {daysUntil <= 0 ? 'Today' : `${daysUntil} days`}
                    </div>
                  </div>
                </div>
                <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                  daysUntil <= 3 ? 'bg-amber-500/20 text-amber-400' : 'bg-blue-500/20 text-blue-400'
                }`}>
                  {daysUntil <= 3 ? '⚡ Coming Up' : 'Scheduled'}
                </div>
              </div>
            </div>

            <div className="p-4 space-y-4">
              {/* Agenda */}
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Target className="w-4 h-4 text-blue-400" />
                  <span className="text-sm font-medium text-white">Agenda</span>
                </div>
                <ul className="space-y-1.5">
                  {prep.agenda.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm text-slate-400">
                      <Circle className="w-4 h-4 mt-0.5 text-slate-600 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Research Notes */}
              {prep.researchNotes && (
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <FileText className="w-4 h-4 text-violet-400" />
                    <span className="text-sm font-medium text-white">Research Notes</span>
                  </div>
                  <div className="bg-slate-800/50 rounded-lg p-3 text-sm text-slate-400 whitespace-pre-line">
                    {prep.researchNotes}
                  </div>
                </div>
              )}

              {/* Questions */}
              {prep.questions.length > 0 && (
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <HelpCircle className="w-4 h-4 text-emerald-400" />
                    <span className="text-sm font-medium text-white">Key Questions</span>
                  </div>
                  <ul className="space-y-1.5">
                    {prep.questions.map((q, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm text-slate-400">
                        <span className="text-emerald-500 font-medium">{idx + 1}.</span>
                        {q}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Value Prop */}
              {prep.valueProposition && (
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Lightbulb className="w-4 h-4 text-amber-400" />
                    <span className="text-sm font-medium text-white">Your Value Proposition</span>
                  </div>
                  <div className="bg-amber-500/10 border border-amber-500/20 rounded-lg p-3 text-sm text-slate-300 whitespace-pre-line">
                    {prep.valueProposition}
                  </div>
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
