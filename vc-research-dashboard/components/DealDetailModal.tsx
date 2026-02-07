'use client'

import { useState, useEffect } from 'react';
import { Deal } from '@/types';
import { CrunchbaseCompany, DealMemo, NewsItem, ApiConfig } from '@/types/enhanced';
import { DataEnrichmentAPI } from '@/lib/api';
import { 
  X, 
  Building2, 
  MapPin, 
  DollarSign, 
  Calendar, 
  Users, 
  Globe, 
  FileText, 
  Sparkles,
  Loader2,
  ExternalLink,
  TrendingUp,
  AlertTriangle,
  CheckCircle2,
  Newspaper,
  RefreshCw
} from 'lucide-react';

interface DealDetailModalProps {
  deal: Deal;
  isOpen: boolean;
  onClose: () => void;
}

const recommendationColors = {
  'pass': 'text-rose-400 bg-rose-400/10 border-rose-400/20',
  'consider': 'text-amber-400 bg-amber-400/10 border-amber-400/20',
  'strong-interest': 'text-blue-400 bg-blue-400/10 border-blue-400/20',
  'invest': 'text-emerald-400 bg-emerald-400/10 border-emerald-400/20',
};

const recommendationLabels = {
  'pass': 'Pass',
  'consider': 'Consider',
  'strong-interest': 'Strong Interest',
  'invest': 'Invest',
};

export default function DealDetailModal({ deal, isOpen, onClose }: DealDetailModalProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'memo' | 'data' | 'news'>('overview');
  const [crunchbaseData, setCrunchbaseData] = useState<CrunchbaseCompany | null>(null);
  const [memo, setMemo] = useState<string | null>(null);
  const [news, setNews] = useState<NewsItem[]>([]);
  const [isLoading, setIsLoading] = useState({
    crunchbase: false,
    memo: false,
    news: false,
  });
  const [error, setError] = useState<string | null>(null);

  const [apiConfig, setApiConfig] = useState<ApiConfig>({
    crunchbase: { enabled: false, apiKey: '' },
    openai: { enabled: false, apiKey: '', model: 'gpt-4' },
    newsApi: { enabled: false, apiKey: '' },
  });

  useEffect(() => {
    const saved = localStorage.getItem('vc_dashboard_api_config');
    if (saved) {
      try {
        setApiConfig(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to load API config');
      }
    }
  }, []);

  const api = new DataEnrichmentAPI(apiConfig);

  useEffect(() => {
    if (isOpen && deal) {
      loadCrunchbaseData();
      loadNews();
    }
  }, [isOpen, deal]);

  const loadCrunchbaseData = async () => {
    setIsLoading(prev => ({ ...prev, crunchbase: true }));
    try {
      const data = await api.enrichWithCrunchbase(deal.companyName);
      setCrunchbaseData(data);
    } catch (err) {
      console.error('Failed to load Crunchbase data:', err);
    } finally {
      setIsLoading(prev => ({ ...prev, crunchbase: false }));
    }
  };

  const loadNews = async () => {
    setIsLoading(prev => ({ ...prev, news: true }));
    try {
      const newsData = await api.fetchNews(deal.companyName);
      setNews(newsData);
    } catch (err) {
      console.error('Failed to load news:', err);
    } finally {
      setIsLoading(prev => ({ ...prev, news: false }));
    }
  };

  const generateMemo = async () => {
    setIsLoading(prev => ({ ...prev, memo: true }));
    try {
      const memoContent = await api.generateMemo(deal, crunchbaseData || undefined);
      setMemo(memoContent);
      setActiveTab('memo');
    } catch (err) {
      setError('Failed to generate memo. Please try again.');
    } finally {
      setIsLoading(prev => ({ ...prev, memo: false }));
    }
  };

  const parseMemoContent = (content: string) => {
    const sections = content.split('##').filter(s => s.trim());
    return sections.map(section => {
      const lines = section.trim().split('\n');
      const title = lines[0].trim();
      const content = lines.slice(1).join('\n').trim();
      return { title, content };
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-slate-900 border border-slate-800 rounded-xl w-full max-w-5xl max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-slate-800">
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center gap-3">
                <h2 className="text-2xl font-bold text-white">{deal.companyName}</h2>
                <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                  deal.priority === 'urgent' ? 'text-rose-400 bg-rose-400/10' :
                  deal.priority === 'high' ? 'text-amber-400 bg-amber-400/10' :
                  deal.priority === 'medium' ? 'text-blue-400 bg-blue-400/10' :
                  'text-slate-400 bg-slate-400/10'
                }`}>
                  {deal.priority}
                </span>
              </div>
              <p className="text-slate-400 mt-1">{deal.description}</p>
            </div>
            <button 
              onClick={onClose}
              className="p-2 hover:bg-slate-800 rounded-lg transition-colors"
            >
              <X className="w-5 h-5 text-slate-400" />
            </button>
          </div>

          {/* Quick Stats */}
          <div className="flex flex-wrap gap-4 mt-4">
            {deal.valuation && (
              <div className="flex items-center gap-2 text-sm">
                <DollarSign className="w-4 h-4 text-emerald-400" />
                <span className="text-slate-400">Valuation:</span>
                <span className="text-white font-medium">{deal.valuation}</span>
              </div>
            )}
            {deal.round && (
              <div className="flex items-center gap-2 text-sm">
                <TrendingUp className="w-4 h-4 text-blue-400" />
                <span className="text-slate-400">Round:</span>
                <span className="text-white font-medium">{deal.round}</span>
              </div>
            )}
            <div className="flex items-center gap-2 text-sm">
              <MapPin className="w-4 h-4 text-amber-400" />
              <span className="text-slate-400">Location:</span>
              <span className="text-white font-medium">{deal.location}</span>
            </div>
            {deal.founded && (
              <div className="flex items-center gap-2 text-sm">
                <Calendar className="w-4 h-4 text-purple-400" />
                <span className="text-slate-400">Founded:</span>
                <span className="text-white font-medium">{deal.founded}</span>
              </div>
            )}
          </div>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-slate-800">
          {[
            { id: 'overview', label: 'Overview', icon: Building2 },
            { id: 'memo', label: 'Investment Memo', icon: FileText },
            { id: 'data', label: 'Crunchbase Data', icon: Globe },
            { id: 'news', label: 'News & Alerts', icon: Newspaper },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-6 py-3 text-sm font-medium transition-colors ${
                activeTab === tab.id
                  ? 'text-blue-400 border-b-2 border-blue-400'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Internal Notes */}
              <div>
                <h3 className="text-sm font-medium text-slate-300 mb-2">Internal Notes</h3>
                <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-4">
                  <p className="text-slate-300 text-sm whitespace-pre-wrap">{deal.notes}</p>
                </div>
              </div>

              {/* Next Actions */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-4">
                  <h3 className="text-sm font-medium text-slate-300 mb-2">Last Contact</h3>
                  <p className="text-white">{deal.lastContact || 'No contact recorded'}</p>
                </div>
                <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-4">
                  <h3 className="text-sm font-medium text-slate-300 mb-2">Next Action</h3>
                  <p className="text-amber-400">{deal.nextAction || 'No action scheduled'}</p>
                </div>
              </div>

              {/* Generate Memo CTA */}
              {!memo && (
                <div className="bg-gradient-to-r from-blue-900/20 to-purple-900/20 border border-blue-800/30 rounded-xl p-6">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-blue-500/10 rounded-lg">
                      <Sparkles className="w-6 h-6 text-blue-400" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-medium text-white">Generate Investment Memo</h3>
                      <p className="text-slate-400 text-sm mt-1">
                        Use AI to generate a comprehensive investment memo including market analysis, 
                        team assessment, and investment thesis.
                      </p>
                      <button
                        onClick={generateMemo}
                        disabled={isLoading.memo}
                        className="mt-4 px-4 py-2 bg-blue-600 hover:bg-blue-500 disabled:bg-slate-700 text-white rounded-lg text-sm font-medium transition-colors flex items-center gap-2"
                      >
                        {isLoading.memo ? (
                          <>
                            <Loader2 className="w-4 h-4 animate-spin" />
                            Generating...
                          </>
                        ) : (
                          <>
                            <Sparkles className="w-4 h-4" />
                            Generate Memo
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === 'memo' && (
            <div className="space-y-6">
              {memo ? (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-medium text-white">AI-Generated Investment Memo</h3>
                    <div className="flex gap-2">
                      <button
                        onClick={generateMemo}
                        disabled={isLoading.memo}
                        className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg text-sm transition-colors flex items-center gap-2"
                      >
                        <RefreshCw className={`w-4 h-4 ${isLoading.memo ? 'animate-spin' : ''}`} />
                        Regenerate
                      </button>
                    </div>
                  </div>
                  
                  <div className="prose prose-invert max-w-none">
                    {parseMemoContent(memo).map((section, idx) => (
                      <div key={idx} className="mb-6">
                        {idx === 0 ? (
                          <h1 className="text-2xl font-bold text-white mb-4">{section.title}</h1>
                        ) : (
                          <h2 className="text-xl font-semibold text-white mt-6 mb-3">{section.title}</h2>
                        )}
                        <div className="text-slate-300 whitespace-pre-wrap">
                          {section.content}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="text-center py-12">
                  <FileText className="w-12 h-12 text-slate-600 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-white mb-2">No Memo Generated</h3>
                  <p className="text-slate-400 mb-4">Generate an AI-powered investment memo for this deal</p>
                  <button
                    onClick={generateMemo}
                    disabled={isLoading.memo}
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-500 disabled:bg-slate-700 text-white rounded-lg text-sm font-medium transition-colors flex items-center gap-2 mx-auto"
                  >
                    {isLoading.memo ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Generating...
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-4 h-4" />
                        Generate Memo
                      </>
                    )}
                  </button>
                </div>
              )}
            </div>
          )}

          {activeTab === 'data' && (
            <div className="space-y-6">
              {isLoading.crunchbase ? (
                <div className="text-center py-12">
                  <Loader2 className="w-8 h-8 text-blue-400 animate-spin mx-auto mb-4" />
                  <p className="text-slate-400">Loading Crunchbase data...</p>
                </div>
              ) : crunchbaseData ? (
                <>
                  {/* Company Overview */}
                  <div className="grid grid-cols-3 gap-4">
                    <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-4">
                      <div className="text-slate-400 text-sm">Total Funding</div>
                      <div className="text-xl font-semibold text-white">{crunchbaseData.fundingTotal}</div>
                    </div>
                    <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-4">
                      <div className="text-slate-400 text-sm">Employees</div>
                      <div className="text-xl font-semibold text-white">{crunchbaseData.employees}</div>
                    </div>
                    <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-4">
                      <div className="text-slate-400 text-sm">Founded</div>
                      <div className="text-xl font-semibold text-white">{crunchbaseData.founded}</div>
                    </div>
                  </div>

                  {/* Funding Rounds */}
                  <div>
                    <h3 className="text-sm font-medium text-slate-300 mb-3">Funding History</h3>
                    <div className="space-y-3">
                      {crunchbaseData.fundingRounds.map((round, idx) => (
                        <div key={idx} className="bg-slate-800/50 border border-slate-700 rounded-lg p-4">
                          <div className="flex items-center justify-between">
                            <div>
                              <span className="text-white font-medium">{round.series}</span>
                              <span className="text-slate-400 text-sm ml-3">{round.date}</span>
                            </div>
                            <div className="text-right">
                              <div className="text-emerald-400 font-medium">{round.amount}</div>
                              {round.valuation && (
                                <div className="text-slate-400 text-sm">{round.valuation} valuation</div>
                              )}
                            </div>
                          </div>
                          <div className="mt-2 text-sm text-slate-400">
                            Lead: {round.leadInvestors.join(', ')}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Investors */}
                  <div>
                    <h3 className="text-sm font-medium text-slate-300 mb-3">Key Investors</h3>
                    <div className="flex flex-wrap gap-2">
                      {crunchbaseData.investors.map((investor, idx) => (
                        <span 
                          key={idx}
                          className={`px-3 py-1 rounded-full text-sm ${
                            investor.lead 
                              ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30' 
                              : 'bg-slate-700 text-slate-300'
                          }`}
                        >
                          {investor.name} {investor.lead && '(Lead)'}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Competitors */}
                  <div>
                    <h3 className="text-sm font-medium text-slate-300 mb-3">Competitive Landscape</h3>
                    <div className="grid grid-cols-2 gap-3">
                      {crunchbaseData.competitors.map((comp, idx) => (
                        <div key={idx} className="bg-slate-800/50 border border-slate-700 rounded-lg p-3">
                          <div className="font-medium text-white">{comp.name}</div>
                          <div className="text-slate-400 text-sm">{comp.description}</div>
                          <div className="text-emerald-400 text-sm mt-1">{comp.funding}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* External Links */}
                  <div className="flex gap-3">
                    {crunchbaseData.website && (
                      <a 
                        href={`https://${crunchbaseData.website}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg text-sm transition-colors"
                      >
                        <Globe className="w-4 h-4" />
                        Website
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                    {crunchbaseData.linkedin && (
                      <a 
                        href={`https://${crunchbaseData.linkedin}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg text-sm transition-colors"
                      >
                        <Users className="w-4 h-4" />
                        LinkedIn
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                  </div>
                </>
              ) : (
                <div className="text-center py-12">
                  <Globe className="w-12 h-12 text-slate-600 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-white mb-2">No External Data</h3>
                  <p className="text-slate-400">Crunchbase data not available for this company</p>
                </div>
              )}
            </div>
          )}

          {activeTab === 'news' && (
            <div className="space-y-4">
              {isLoading.news ? (
                <div className="text-center py-12">
                  <Loader2 className="w-8 h-8 text-blue-400 animate-spin mx-auto mb-4" />
                  <p className="text-slate-400">Loading news...</p>
                </div>
              ) : news.length > 0 ? (
                news.map((item, idx) => (
                  <a
                    key={idx}
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block bg-slate-800/50 border border-slate-700 hover:border-slate-600 rounded-lg p-4 transition-colors"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h4 className="text-white font-medium hover:text-blue-400 transition-colors">
                          {item.title}
                        </h4>
                        <div className="flex items-center gap-3 mt-2 text-sm">
                          <span className="text-slate-400">{item.source}</span>
                          <span className="text-slate-600">•</span>
                          <span className="text-slate-400">
                            {new Date(item.date).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        item.sentiment === 'positive' ? 'text-emerald-400 bg-emerald-400/10' :
                        item.sentiment === 'negative' ? 'text-rose-400 bg-rose-400/10' :
                        'text-slate-400 bg-slate-400/10'
                      }`}>
                        {item.sentiment}
                      </span>
                    </div>
                  </a>
                ))
              ) : (
                <div className="text-center py-12">
                  <Newspaper className="w-12 h-12 text-slate-600 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-white mb-2">No News Found</h3>
                  <p className="text-slate-400">No recent news articles for this company</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
