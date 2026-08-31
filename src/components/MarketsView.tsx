import React, { useState } from 'react';
import { 
  TrendingUp, 
  TrendingDown, 
  Coins, 
  Building2, 
  DollarSign, 
  ArrowLeftRight, 
  ArrowLeft, 
  Activity, 
  BarChart3, 
  Layers, 
  CheckCircle2 
} from 'lucide-react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, BarChart, Bar } from 'recharts';
import { useApp } from '../context/AppContext';
import { MarketIndicator, CurrencyRate } from '../types';

export const MarketsView: React.FC = () => {
  const { marketIndicators, currencies, setCurrentView } = useApp();

  // Currency converter state
  const [amount, setAmount] = useState<number>(1000);
  const [selectedCurrencyCode, setSelectedCurrencyCode] = useState<string>('USD');
  const [conversionDirection, setConversionDirection] = useState<'foreignToEtb' | 'etbToForeign'>('foreignToEtb');

  // Selected indicator for graph
  const [activeIndicatorId, setActiveIndicatorId] = useState<string>(marketIndicators[0]?.id || 'ind-1');
  const selectedIndicator = marketIndicators.find(i => i.id === activeIndicatorId) || marketIndicators[0];

  const currentCurrency = currencies.find(c => c.code === selectedCurrencyCode) || currencies[0];

  // Calculate conversion
  const convertedValue = conversionDirection === 'foreignToEtb'
    ? (amount * currentCurrency.buying).toFixed(2)
    : (amount / currentCurrency.selling).toFixed(2);

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-8 py-8 min-h-[80vh]">
      
      {/* Header */}
      <div className="pb-6 border-b border-slate-800 mb-8">
        <button
          onClick={() => {
            setCurrentView('home');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-slate-200 transition-colors mb-3"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Homepage</span>
        </button>

        <div className="flex items-center gap-2 text-amber-400 font-brand text-xs uppercase tracking-widest font-bold">
          <Activity className="w-4 h-4" />
          <span>Ethiopian Capital & Macro Intelligence Hub</span>
        </div>
        <h1 className="font-editorial text-3xl sm:text-4xl md:text-5xl font-bold text-slate-100 mt-1">
          Markets, Currency & Indicators
        </h1>
        <p className="text-slate-400 text-xs sm:text-sm mt-1 max-w-2xl">
          National Bank of Ethiopia indicative rates, Ethiopian Securities Exchange (ESX) benchmarks, commodity exports, and macroeconomic indicators updated daily.
        </p>
      </div>

      {/* Main Grid: Converter + Indicator Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-10">
        
        {/* Left: Interactive Currency Converter (5 cols) */}
        <div className="lg:col-span-5 bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-5">
              <div className="flex items-center gap-2">
                <Coins className="w-5 h-5 text-amber-400" />
                <h3 className="font-editorial text-xl font-bold text-slate-100">
                  NBE FX Converter
                </h3>
              </div>
              <span className="text-[11px] text-emerald-400 font-bold uppercase tracking-wide bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                Market Floating Rate
              </span>
            </div>

            {/* Direction Switcher */}
            <div className="flex items-center justify-between bg-slate-950 p-1 rounded-xl border border-slate-800 mb-4 text-xs">
              <button
                onClick={() => setConversionDirection('foreignToEtb')}
                className={`flex-1 py-1.5 rounded-lg font-medium transition-all ${
                  conversionDirection === 'foreignToEtb'
                    ? 'bg-blue-600 text-white shadow'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Foreign Currency → ETB
              </button>
              <button
                onClick={() => setConversionDirection('etbToForeign')}
                className={`flex-1 py-1.5 rounded-lg font-medium transition-all ${
                  conversionDirection === 'etbToForeign'
                    ? 'bg-blue-600 text-white shadow'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                ETB → Foreign Currency
              </button>
            </div>

            {/* Inputs */}
            <div className="space-y-4">
              <div>
                <label className="text-[11px] font-semibold text-slate-400 block mb-1">
                  {conversionDirection === 'foreignToEtb' ? 'Amount to Convert' : 'Amount in Ethiopian Birr (ETB)'}
                </label>
                <div className="relative">
                  <input
                    type="number"
                    min="1"
                    value={amount}
                    onChange={(e) => setAmount(Math.max(0, Number(e.target.value)))}
                    className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 font-bold text-lg focus:outline-none focus:border-blue-500"
                  />
                  <span className="absolute right-4 top-3.5 text-xs text-slate-400 font-bold">
                    {conversionDirection === 'foreignToEtb' ? selectedCurrencyCode : 'ETB'}
                  </span>
                </div>
              </div>

              <div>
                <label className="text-[11px] font-semibold text-slate-400 block mb-1">
                  Select Foreign Currency
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {currencies.map(cur => (
                    <button
                      key={cur.code}
                      onClick={() => setSelectedCurrencyCode(cur.code)}
                      className={`p-2.5 rounded-xl border text-left flex items-center gap-2 transition-all ${
                        selectedCurrencyCode === cur.code
                          ? 'bg-blue-600/30 border-blue-500 text-white'
                          : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      <span className="text-lg">{cur.flag}</span>
                      <div className="min-w-0">
                        <span className="font-bold text-xs block text-slate-200">{cur.code}</span>
                        <span className="text-[9px] text-slate-500 block truncate">{cur.currency}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Result Box */}
            <div className="mt-6 p-4 rounded-2xl bg-gradient-to-r from-blue-950/60 to-slate-950 border border-blue-500/30">
              <span className="text-[11px] text-slate-400 block mb-1">
                Estimated Commercial Value
              </span>
              <div className="text-2xl sm:text-3xl font-extrabold font-sans text-amber-400">
                {conversionDirection === 'foreignToEtb' ? `${convertedValue} ETB` : `${convertedValue} ${selectedCurrencyCode}`}
              </div>
              <div className="flex items-center justify-between text-[11px] text-slate-400 mt-2 pt-2 border-t border-slate-800">
                <span>Indicative Buy: {currentCurrency.buying.toFixed(2)} ETB</span>
                <span>Indicative Sell: {currentCurrency.selling.toFixed(2)} ETB</span>
              </div>
            </div>
          </div>

          <p className="text-[10px] text-slate-500 mt-4 text-center">
            Rates reflect National Bank of Ethiopia (NBE) weighted average interbank transaction benchmarks.
          </p>
        </div>

        {/* Right: Selected Indicator Deep Dive (7 cols) */}
        <div className="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl flex flex-col justify-between">
          <div>
            <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-800 mb-4">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-blue-400 bg-blue-600/10 px-2 py-0.5 rounded border border-blue-500/20">
                  {selectedIndicator.category} Indicator
                </span>
                <h3 className="font-editorial text-xl sm:text-2xl font-bold text-slate-100 mt-1">
                  {selectedIndicator.name}
                </h3>
              </div>

              <div className="text-right">
                <span className="text-2xl font-extrabold text-slate-100 font-sans">
                  {selectedIndicator.value}
                </span>
                <span className={`text-xs font-bold block ${
                  selectedIndicator.isPositive ? 'text-emerald-400' : 'text-rose-400'
                }`}>
                  {selectedIndicator.change} ({selectedIndicator.unit})
                </span>
              </div>
            </div>

            {/* Indicator switcher tabs */}
            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-2 mb-4">
              {marketIndicators.map(ind => (
                <button
                  key={ind.id}
                  onClick={() => setActiveIndicatorId(ind.id)}
                  className={`px-3 py-1 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
                    activeIndicatorId === ind.id
                      ? 'bg-blue-600 text-white'
                      : 'bg-slate-950 text-slate-400 hover:text-slate-200 border border-slate-800'
                  }`}
                >
                  {ind.code}
                </button>
              ))}
            </div>

            {/* Chart Area */}
            <div className="h-64 sm:h-72 w-full pt-3">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={selectedIndicator.history}>
                  <defs>
                    <linearGradient id="marketGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.4} />
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.0} />
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="date" stroke="#64748b" fontSize={11} tickLine={false} axisLine={false} />
                  <YAxis stroke="#64748b" fontSize={11} tickLine={false} axisLine={false} domain={['auto', 'auto']} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#0f172a', 
                      borderColor: '#334155', 
                      borderRadius: '8px', 
                      color: '#f8fafc',
                      fontSize: '12px'
                    }} 
                    formatter={(val: any) => [`${val} ${selectedIndicator.unit}`, selectedIndicator.name]}
                  />
                  <Area type="monotone" dataKey="value" stroke="#3b82f6" strokeWidth={2.5} fill="url(#marketGradient)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="mt-4 p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-400">
            <span className="font-semibold text-slate-300">Analysis: </span>
            {selectedIndicator.description}
          </div>
        </div>

      </div>

      {/* Section: ESX Listings & Capital Market Pipeline */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-800 mb-6">
          <div>
            <div className="flex items-center gap-2 text-blue-400 font-brand text-xs uppercase tracking-widest font-bold">
              <Building2 className="w-4 h-4 text-amber-400" />
              <span>Capital Markets Bourse</span>
            </div>
            <h3 className="font-editorial text-2xl font-bold text-slate-100 mt-1">
              Ethiopian Securities Exchange (ESX) Listings Pipeline
            </h3>
          </div>
          <span className="text-xs text-slate-400 font-mono">Addis Ababa Securities Registry</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              enterprise: 'Ethio Telecom',
              sector: 'Telecommunications & Fintech',
              floatTarget: '10% Public Share Offering',
              status: 'Approved Prospectus',
              valuation: 'Estimated $6.5B Valuation',
              icon: Building2
            },
            {
              enterprise: 'Commercial Bank of Ethiopia (CBE)',
              sector: 'Banking & Financial Assets',
              floatTarget: 'Tier-1 Capital Expansion / Rights',
              status: 'Secondary Market Ready',
              valuation: '2.45T ETB Asset Base',
              icon: Coins
            },
            {
              enterprise: 'Ethiopian Insurance Corporation',
              sector: 'Insurance & Reinsurance',
              floatTarget: 'Institutional Placement',
              status: 'Underwriting Review',
              valuation: 'Market Leading Insurer',
              icon: Layers
            }
          ].map((item, idx) => (
            <div 
              key={idx}
              className="p-5 rounded-2xl bg-slate-950 border border-slate-800 hover:border-slate-700 flex flex-col justify-between"
            >
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400 block mb-1">
                  {item.sector}
                </span>
                <h4 className="font-editorial text-lg font-bold text-slate-100">
                  {item.enterprise}
                </h4>
                <p className="text-xs text-slate-300 font-semibold mt-2">
                  {item.floatTarget}
                </p>
                <p className="text-[11px] text-slate-400 mt-1">
                  {item.valuation}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-900 flex items-center justify-between text-xs">
                <span className="inline-flex items-center gap-1 text-emerald-400 font-medium text-[11px]">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  {item.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
