'use client'

import { useState, useEffect } from 'react';
import { ApiConfig } from '@/types/enhanced';
import { 
  Settings, 
  Key, 
  CheckCircle2, 
  XCircle, 
  Loader2,
  Save,
  Globe,
  Newspaper,
  Sparkles,
  Database
} from 'lucide-react';

interface ApiSettingsPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

const defaultConfig: ApiConfig = {
  crunchbase: { enabled: false, apiKey: '' },
  pitchbook: { enabled: false, apiKey: '' },
  openai: { enabled: false, apiKey: '', model: 'gpt-4' },
  newsApi: { enabled: false, apiKey: '' },
};

export default function ApiSettingsPanel({ isOpen, onClose }: ApiSettingsPanelProps) {
  const [config, setConfig] = useState<ApiConfig>(defaultConfig);
  const [isLoading, setIsLoading] = useState(false);
  const [savedMessage, setSavedMessage] = useState<string | null>(null);

  useEffect(() => {
    // Load config from localStorage or API
    const saved = localStorage.getItem('vc_dashboard_api_config');
    if (saved) {
      try {
        setConfig(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to parse saved config');
      }
    }
  }, []);

  const handleSave = () => {
    setIsLoading(true);
    // Save to localStorage (in production, this would go to a secure backend)
    localStorage.setItem('vc_dashboard_api_config', JSON.stringify(config));
    setTimeout(() => {
      setIsLoading(false);
      setSavedMessage('Settings saved successfully!');
      setTimeout(() => setSavedMessage(null), 3000);
    }, 500);
  };

  const updateConfig = (service: keyof ApiConfig, field: string, value: any) => {
    setConfig(prev => ({
      ...prev,
      [service]: {
        ...prev[service],
        [field]: value
      }
    }));
  };

  const testConnection = async (service: keyof ApiConfig) => {
    // In production, this would test the actual API connection
    alert(`Testing ${service} connection... (Mock)`);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-slate-900 border border-slate-800 rounded-xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-slate-800">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-500/10 rounded-lg">
                <Settings className="w-5 h-5 text-blue-400" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">API Integrations</h2>
                <p className="text-slate-400 text-sm">Connect external data sources for deal enrichment</p>
              </div>
            </div>
            <button 
              onClick={onClose}
              className="p-2 hover:bg-slate-800 rounded-lg transition-colors"
            >
              <XCircle className="w-5 h-5 text-slate-400" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* OpenAI */}
          <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-5">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-purple-500/10 rounded-lg">
                <Sparkles className="w-5 h-5 text-purple-400" />
              </div>
              <div className="flex-1">
                <h3 className="font-medium text-white">OpenAI</h3>
                <p className="text-slate-400 text-sm">Generate AI-powered investment memos</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={config.openai?.enabled}
                  onChange={(e) => updateConfig('openai', 'enabled', e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
              </label>
            </div>
            
            {config.openai?.enabled && (
              <div className="space-y-3">
                <div>
                  <label className="block text-sm text-slate-400 mb-1">API Key</label>
                  <input
                    type="password"
                    value={config.openai?.apiKey || ''}
                    onChange={(e) => updateConfig('openai', 'apiKey', e.target.value)}
                    placeholder="sk-..."
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-purple-500"
                  />
                </div>
                <div>
                  <label className="block text-sm text-slate-400 mb-1">Model</label>
                  <select
                    value={config.openai?.model || 'gpt-4'}
                    onChange={(e) => updateConfig('openai', 'model', e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-purple-500"
                  >
                    <option value="gpt-4">GPT-4 (Recommended)</option>
                    <option value="gpt-4-turbo">GPT-4 Turbo</option>
                    <option value="gpt-3.5-turbo">GPT-3.5 Turbo (Faster)</option>
                  </select>
                </div>
                <button
                  onClick={() => testConnection('openai')}
                  className="text-sm text-purple-400 hover:text-purple-300"
                >
                  Test Connection →
                </button>
              </div>
            )}
          </div>

          {/* Crunchbase */}
          <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-5">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-emerald-500/10 rounded-lg">
                <Database className="w-5 h-5 text-emerald-400" />
              </div>
              <div className="flex-1">
                <h3 className="font-medium text-white">Crunchbase</h3>
                <p className="text-slate-400 text-sm">Company funding and investor data</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={config.crunchbase?.enabled}
                  onChange={(e) => updateConfig('crunchbase', 'enabled', e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-600"></div>
              </label>
            </div>
            
            {config.crunchbase?.enabled && (
              <div className="space-y-3">
                <div>
                  <label className="block text-sm text-slate-400 mb-1">API Key</label>
                  <input
                    type="password"
                    value={config.crunchbase?.apiKey || ''}
                    onChange={(e) => updateConfig('crunchbase', 'apiKey', e.target.value)}
                    placeholder="Enter your Crunchbase API key"
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-emerald-500"
                  />
                </div>
                <button
                  onClick={() => testConnection('crunchbase')}
                  className="text-sm text-emerald-400 hover:text-emerald-300"
                >
                  Test Connection →
                </button>
              </div>
            )}
          </div>

          {/* News API */}
          <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-5">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-amber-500/10 rounded-lg">
                <Newspaper className="w-5 h-5 text-amber-400" />
              </div>
              <div className="flex-1">
                <h3 className="font-medium text-white">News API</h3>
                <p className="text-slate-400 text-sm">Company news and sentiment analysis</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={config.newsApi?.enabled}
                  onChange={(e) => updateConfig('newsApi', 'enabled', e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-amber-600"></div>
              </label>
            </div>
            
            {config.newsApi?.enabled && (
              <div className="space-y-3">
                <div>
                  <label className="block text-sm text-slate-400 mb-1">API Key</label>
                  <input
                    type="password"
                    value={config.newsApi?.apiKey || ''}
                    onChange={(e) => updateConfig('newsApi', 'apiKey', e.target.value)}
                    placeholder="Enter your News API key"
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-amber-500"
                  />
                </div>
                <button
                  onClick={() => testConnection('newsApi')}
                  className="text-sm text-amber-400 hover:text-amber-300"
                >
                  Test Connection →
                </button>
              </div>
            )}
          </div>

          {/* Pitchbook */}
          <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-5">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-blue-500/10 rounded-lg">
                <Globe className="w-5 h-5 text-blue-400" />
              </div>
              <div className="flex-1">
                <h3 className="font-medium text-white">PitchBook</h3>
                <p className="text-slate-400 text-sm">Private market data and valuations</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={config.pitchbook?.enabled}
                  onChange={(e) => updateConfig('pitchbook', 'enabled', e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
            
            {config.pitchbook?.enabled && (
              <div className="space-y-3">
                <div>
                  <label className="block text-sm text-slate-400 mb-1">API Key</label>
                  <input
                    type="password"
                    value={config.pitchbook?.apiKey || ''}
                    onChange={(e) => updateConfig('pitchbook', 'apiKey', e.target.value)}
                    placeholder="Enter your PitchBook API key"
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-blue-500"
                  />
                </div>
                <button
                  onClick={() => testConnection('pitchbook')}
                  className="text-sm text-blue-400 hover:text-blue-300"
                >
                  Test Connection →
                </button>
              </div>
            )}
          </div>

          {/* Info Box */}
          <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
            <p className="text-blue-400 text-sm">
              <strong>Note:</strong> API keys are stored locally in your browser. For team deployments, 
              consider using a secure backend to manage credentials.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-slate-800">
          <div className="flex items-center justify-between">
            {savedMessage && (
              <div className="flex items-center gap-2 text-emerald-400 text-sm">
                <CheckCircle2 className="w-4 h-4" />
                {savedMessage}
              </div>
            )}
            <div className="ml-auto flex gap-3">
              <button
                onClick={onClose}
                className="px-4 py-2 text-slate-400 hover:text-white transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                disabled={isLoading}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-500 disabled:bg-slate-700 text-white rounded-lg font-medium transition-colors flex items-center gap-2"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4" />
                    Save Settings
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
