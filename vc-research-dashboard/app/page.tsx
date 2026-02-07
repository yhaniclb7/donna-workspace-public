'use client'

import { useState } from 'react'
import Sidebar from '@/components/Sidebar'
import StatsCards from '@/components/StatsCards'
import DealPipeline from '@/components/DealPipeline'
import VCFirmTracker from '@/components/VCFirmTracker'
import AmericanDynamismTracker from '@/components/AmericanDynamismTracker'
import MeetingPrepPanel from '@/components/MeetingPrepPanel'
import { 
  mockDeals, 
  mockVCFirms, 
  mockAmericanDynamism, 
  mockMeetingPreps,
  getUpcomingMeetings,
  getHighPriorityDeals
} from '@/lib/data'
import { Deal, VCFirm } from '@/types'
import { 
  Target, 
  TrendingUp, 
  AlertCircle,
  CheckCircle2,
  Clock,
  ArrowRight
} from 'lucide-react'

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('overview')
  const [selectedDeal, setSelectedDeal] = useState<Deal | null>(null)
  const [selectedFirm, setSelectedFirm] = useState<VCFirm | null>(null)

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="space-y-6">
            <StatsCards 
              deals={mockDeals} 
              firms={mockVCFirms}
              dynamismCompanies={mockAmericanDynamism}
            />

            <div className="grid lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <h2 className="text-lg font-semibold text-white mb-4">Active Pipeline</h2>
                <DealPipeline 
                  deals={mockDeals.slice(0, 3)} 
                  onDealClick={setSelectedDeal}
                />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-white mb-4">Priority Actions</h2>
                <div className="space-y-3">
                  <div className="bg-slate-900 border border-amber-500/30 rounded-xl p-4">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-lg bg-amber-500/20 flex items-center justify-center flex-shrink-0">
                        <Clock className="w-5 h-5 text-amber-400" />
                      </div>
                      <div>
                        <h3 className="font-medium text-white">Shield Capital Meeting</h3>
                        <p className="text-sm text-slate-400 mt-1">Feb 12, 2026 with Raj Shah</p>
                        <button 
                          onClick={() => setActiveTab('meetings')}
                          className="text-sm text-amber-400 mt-2 hover:text-amber-300 flex items-center gap-1"
                        >
                          View prep <ArrowRight className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="bg-slate-900 border border-blue-500/30 rounded-xl p-4">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center flex-shrink-0">
                        <Target className="w-5 h-5 text-blue-400" />
                      </div>
                      <div>
                        <h3 className="font-medium text-white">Hermeus Diligence</h3>
                        <p className="text-sm text-slate-400 mt-1">Technical deep-dive pending</p>
                        <button 
                          onClick={() => setActiveTab('deals')}
                          className="text-sm text-blue-400 mt-2 hover:text-blue-300 flex items-center gap-1"
                        >
                          View deal <ArrowRight className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="bg-slate-900 border border-slate-700 rounded-xl p-4">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-lg bg-slate-800 flex items-center justify-center flex-shrink-0">
                        <TrendingUp className="w-5 h-5 text-emerald-400" />
                      </div>
                      <div>
                        <h3 className="font-medium text-white">New Deal Sourced</h3>
                        <p className="text-sm text-slate-400 mt-1">True Anomaly - Space</p>
                        <button 
                          onClick={() => setActiveTab('deals')}
                          className="text-sm text-slate-400 mt-2 hover:text-white flex items-center gap-1"
                        >
                          Review <ArrowRight className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid lg:grid-cols-2 gap-6">
              <div>
                <h2 className="text-lg font-semibold text-white mb-4">Top VC Relationships</h2>
                <VCFirmTracker 
                  firms={mockVCFirms.slice(0, 3)} 
                  onFirmClick={setSelectedFirm}
                />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-white mb-4">American Dynamism Leaders</h2>
                <AmericanDynamismTracker companies={mockAmericanDynamism.slice(0, 4)} />
              </div>
            </div>
          </div>
        )

      case 'deals':
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-white">Deal Pipeline</h2>
                <p className="text-slate-400">Track opportunities from source to close</p>
              </div>
              <button className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg font-medium transition-colors">
                + Add Deal
              </button>
            </div>
            <DealPipeline deals={mockDeals} onDealClick={setSelectedDeal} />
          </div>
        )

      case 'firms':
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-white">VC Firm Tracker</h2>
                <p className="text-slate-400">Manage relationships and meeting pipeline</p>
              </div>
              <button className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg font-medium transition-colors">
                + Add Firm
              </button>
            </div>
            <VCFirmTracker firms={mockVCFirms} onFirmClick={setSelectedFirm} />
          </div>
        )

      case 'dynamism':
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-white">American Dynamism</h2>
                <p className="text-slate-400">Companies rebuilding American industrial capacity</p>
              </div>
              <div className="flex gap-2">
                <span className="px-3 py-1.5 bg-slate-800 rounded-lg text-sm text-slate-400">
                  {mockAmericanDynamism.filter(c => c.relevanceScore >= 8).length} high priority
                </span>
              </div>
            </div>
            <AmericanDynamismTracker companies={mockAmericanDynamism} />
          </div>
        )

      case 'meetings':
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-white">Meeting Preparation</h2>
              <p className="text-slate-400">Research and prep for upcoming VC meetings</p>
            </div>
            <MeetingPrepPanel meetingPreps={mockMeetingPreps} firms={mockVCFirms} />
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="flex h-screen bg-[#0a0a0f]">
      <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />
      
      <main className="flex-1 overflow-y-auto">
        <div className="p-6">
          {renderContent()}
        </div>
      </main>

      {/* Deal Detail Modal */}
      {selectedDeal && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4"
          onClick={() => setSelectedDeal(null)}
        >
          <div 
            className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6 border-b border-slate-800">
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-white">{selectedDeal.companyName}</h2>
                  <p className="text-slate-400 mt-1">{selectedDeal.description}</p>
                </div>
                <button 
                  onClick={() => setSelectedDeal(null)}
                  className="text-slate-400 hover:text-white"
                >
                  ✕
                </button>
              </div>
            </div>
            <div className="p-6 space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-slate-800 rounded-lg p-4">
                  <p className="text-slate-400 text-sm">Stage</p>
                  <p className="text-white font-medium capitalize">{selectedDeal.stage.replace('-', ' ')}</p>
                </div>
                <div className="bg-slate-800 rounded-lg p-4">
                  <p className="text-slate-400 text-sm">Priority</p>
                  <p className="text-white font-medium capitalize">{selectedDeal.priority}</p>
                </div>
                <div className="bg-slate-800 rounded-lg p-4">
                  <p className="text-slate-400 text-sm">Valuation</p>
                  <p className="text-white font-medium">{selectedDeal.valuation || 'N/A'}</p>
                </div>
                <div className="bg-slate-800 rounded-lg p-4">
                  <p className="text-slate-400 text-sm">Round</p>
                  <p className="text-white font-medium">{selectedDeal.round || 'N/A'}</p>
                </div>
              </div>

              <div>
                <h3 className="font-medium text-white mb-2">Lead Source</h3>
                <p className="text-slate-400">{selectedDeal.leadSource}</p>
              </div>

              <div>
                <h3 className="font-medium text-white mb-2">Notes</h3>
                <p className="text-slate-400">{selectedDeal.notes}</p>
              </div>

              {selectedDeal.nextAction && (
                <div className="bg-amber-500/10 border border-amber-500/20 rounded-lg p-4">
                  <h3 className="font-medium text-amber-400 mb-1">Next Action</h3>
                  <p className="text-slate-300">{selectedDeal.nextAction}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Firm Detail Modal */}
      {selectedFirm && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4"
          onClick={() => setSelectedFirm(null)}
        >
          <div 
            className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6 border-b border-slate-800">
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-white">{selectedFirm.name}</h2>
                  <p className="text-slate-400 mt-1">{selectedFirm.location}</p>
                </div>
                <button 
                  onClick={() => setSelectedFirm(null)}
                  className="text-slate-400 hover:text-white"
                >
                  ✕
                </button>
              </div>
            </div>
            <div className="p-6 space-y-6">
              <div className="flex flex-wrap gap-2">
                {selectedFirm.focus.map((f, i) => (
                  <span key={i} className="px-3 py-1 bg-slate-800 rounded-full text-sm text-slate-300">
                    {f}
                  </span>
                ))}
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="bg-slate-800 rounded-lg p-4 text-center">
                  <p className="text-2xl font-bold text-white">{selectedFirm.aum || 'N/A'}</p>
                  <p className="text-slate-400 text-sm">AUM</p>
                </div>
                <div className="bg-slate-800 rounded-lg p-4 text-center">
                  <p className="text-2xl font-bold text-white">{selectedFirm.relationshipStrength}/10</p>
                  <p className="text-slate-400 text-sm">Relationship</p>
                </div>
                <div className="bg-slate-800 rounded-lg p-4 text-center">
                  <p className="text-2xl font-bold text-white">{selectedFirm.portfolioCompanies.length}</p>
                  <p className="text-slate-400 text-sm">Portfolio Cos</p>
                </div>
              </div>

              <div>
                <h3 className="font-medium text-white mb-3">Key Contacts</h3>
                <div className="space-y-3">
                  {selectedFirm.contacts.map((contact) => (
                    <div key={contact.id} className="bg-slate-800 rounded-lg p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-white font-medium">{contact.name}</p>
                          <p className="text-slate-400 text-sm">{contact.title}</p>
                        </div>
                        <span className="text-sm text-slate-500">
                          Strength: {contact.relationshipStrength}/10
                        </span>
                      </div>
                      {contact.notes && (
                        <p className="text-slate-400 text-sm mt-2">{contact.notes}</p>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-medium text-white mb-3">Portfolio Companies</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedFirm.portfolioCompanies.map((company, i) => (
                    <span key={i} className="px-3 py-1.5 bg-blue-500/10 border border-blue-500/20 rounded-lg text-sm text-blue-400">
                      {company}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
