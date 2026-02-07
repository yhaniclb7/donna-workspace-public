'use client'

import { 
  Shield, 
  Building2, 
  Rocket, 
  Briefcase, 
  Calendar,
  TrendingUp,
  Target
} from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const tabs = [
  { id: 'overview', label: 'Overview', icon: Target },
  { id: 'deals', label: 'Deal Pipeline', icon: Briefcase },
  { id: 'firms', label: 'VC Firms', icon: Building2 },
  { id: 'dynamism', label: 'American Dynamism', icon: Rocket },
  { id: 'meetings', label: 'Meeting Prep', icon: Calendar },
];

export default function Sidebar({ activeTab, onTabChange }: SidebarProps) {
  return (
    <div className="w-64 bg-slate-900 border-r border-slate-800 flex-shrink-0 flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-violet-600 flex items-center justify-center">
            <Shield className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="font-bold text-white">VC Research</h1>
            <p className="text-xs text-slate-400">Defense & Dynamism</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <ul className="space-y-1">
          {tabs.map((tab) => (
            <li key={tab.id}>
              <button
                onClick={() => onTabChange(tab.id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  activeTab === tab.id
                    ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
              >
                <tab.icon className="w-4 h-4" />
                {tab.label}
              </button>
            </li>
          ))}
        </ul>
      </nav>

      {/* User/Status */}
      <div className="p-4 border-t border-slate-800">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center text-white font-bold">
            YB
          </div>
          <div>
            <p className="text-sm font-medium text-white">Yhanic Braithwaite</p>
            <p className="text-xs text-slate-400">VC / Defense Tech</p>
          </div>
        </div>
        <div className="mt-4 p-3 bg-slate-800 rounded-lg">
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <TrendingUp className="w-3 h-3 text-emerald-400" />
            <span>Next meeting: Feb 12</span>
          </div>
        </div>
      </div>
    </div>
  );
}
