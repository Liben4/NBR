import React, { useState } from 'react';
import { 
  TrendingUp, 
  TrendingDown, 
  ArrowUpRight, 
  Activity, 
  DollarSign, 
  Coins, 
  Building2, 
  ChevronRight,
  BarChart3
} from 'lucide-react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip } from 'recharts';
import { useApp } from '../context/AppContext';
import { MarketIndicator } from '../types';

export const MarketsDashboard: React.FC = () => {
  const { marketIndicators, currencies, setCurrentView } = useApp();
  const [activeIndicatorId, setActiveIndicatorId] = useState<string>(marketIndicators[0]?.id || 'ind-1');
  const [selectedTimeframe, setSelectedTimeframe] = useState<'1M' | '3M' | '6M' | '1Y'>('6M');

  const selectedIndicator = marketIndicators.find(i => i.id === activeIndicatorId) || marketIndicators[0];

  return (
    <section className="w-full bg-slate-900/60 border-y border-slate-800/80 py-8 px-4 sm:px-8 my-6">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="flex flex-wrap items-end justify-between gap-4 mb-6">
          <div>
            <div className="flex items-center gap-2 text-blue-400 font-brand text-xs uppercase tracking-widest font-bold">
              <Activity className="w-4 h-4" />
              <span>Macro Intelligence</span>
            </div>
            <h2 className="font-editorial text-2xl sm:text-3xl font-bold text-slate-100 mt-1">
              Market & Economy Dashboard
            </h2>
            <p className="text-slate-400 text-xs sm:text-sm mt-0.5">
              Live indicators shaping Ethiopia’s macroeconomic, banking, commodity, and foreign exchange landscape.
            </p>
          </div>

          <button 
            onClick={() => {
              setCurrentView('markets');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition-colors"
          >
            <span>Full Market Data & FX Converter</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Top 6 KPI Snapshot Cards */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 mb-6">
          {marketIndicators.map((item: MarketIndicator) => {
            const isSelected = item.id === activeIndicatorId;
            return (
              <div
                key={item.id}
                onClick={() => setActiveIndicatorId(item.id)}
                className={`p-3.5 rounded-xl border cursor-pointer transition-all duration-200 flex flex-col justify-between ${
                  isSelected
                    ? 'bg-blue-950/40 border-blue-500 shadow-md shadow-blue-950/50 ring-1 ring-blue-500/50'
                    : 'bg-slate-900/90 border-slate-800 hover:border-slate-700 hover:bg-slate-850'
                }`}
              >
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block truncate">
                    {item.code}
                  </span>
                  <div className="mt-1 flex items-baseline justify-between gap-1">
                    <span className="text-base sm:text-lg font-bold text-slate-100 font-sans tracking-tight">
                      {item.value}
                    </span>
                  </div>
                </div>

                <div className="mt-2 pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px]">
                  <span className={`font-semibold flex items-center gap-0.5 ${
                    item.isPositive ? 'text-emerald-400' : 'text-rose-400'
                  }`}>
                    {item.isPositive ? (
                      <TrendingUp className="w-3 h-3 inline" />
                    ) : (
                      <TrendingDown className="w-3 h-3 inline" />
                    )}
                    {item.change}
                  </span>
                  <span className="text-[10px] text-slate-500">{item.unit}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Dynamic Chart & Deep-Dive Panel */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 bg-slate-950/80 border border-slate-800/80 rounded-2xl p-4 sm:p-6">
          
          {/* Left / Chart Area (8 cols) */}
          <div className="lg:col-span-8 flex flex-col justify-between">
            <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
              <div>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-blue-600/20 text-blue-400 border border-blue-500/30">
                  {selectedIndicator.category} Indicator
                </span>
                <h3 className="font-editorial text-lg sm:text-xl font-bold text-slate-100 mt-1">
                  {selectedIndicator.name}
                </h3>
              </div>

              {/* Timeframe selector */}
              <div className="flex items-center gap-1 bg-slate-900 border border-slate-800 p-1 rounded-lg text-xs">
                {(['1M', '3M', '6M', '1Y'] as const).map(tf => (
                  <button
                    key={tf}
                    onClick={() => setSelectedTimeframe(tf)}
                    className={`px-2.5 py-1 rounded font-medium transition-colors ${
                      selectedTimeframe === tf 
                        ? 'bg-blue-600 text-white' 
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    {tf}
                  </button>
                ))}
              </div>
            </div>

            {/* Recharts Area Chart */}
            <div className="h-56 sm:h-64 w-full pt-2">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={selectedIndicator.history}>
                  <defs>
                    <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.4} />
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.0} />
                    </linearGradient>
                  </defs>
                  <XAxis 
                    dataKey="date" 
                    stroke="#64748b" 
                    fontSize={11} 
                    tickLine={false} 
                    axisLine={false} 
                  />
                  <YAxis 
                    stroke="#64748b" 
                    fontSize={11} 
                    tickLine={false} 
                    axisLine={false} 
                    domain={['auto', 'auto']}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#0f172a', 
                      borderColor: '#334155', 
                      borderRadius: '8px', 
                      color: '#f8fafc',
                      fontSize: '12px',
                      boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.5)'
                    }} 
                    formatter={(value: any) => [`${value} ${selectedIndicator.unit}`, selectedIndicator.name]}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="value" 
                    stroke="#3b82f6" 
                    strokeWidth={2.5} 
                    fillOpacity={1} 
                    fill="url(#colorValue)" 
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            <p className="text-xs text-slate-400 mt-2 italic">
              {selectedIndicator.description}
            </p>
          </div>

          {/* Right / Live Currency Rates Snapshot (4 cols) */}
          <div className="lg:col-span-4 flex flex-col justify-between border-t lg:border-t-0 lg:border-l border-slate-800/80 pt-4 lg:pt-0 lg:pl-6">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <Coins className="w-4 h-4 text-amber-400" />
                <h4 className="font-brand text-xs font-bold uppercase tracking-wider text-slate-200">
                  NBE Indicative Rates (ETB)
                </h4>
              </div>
              <span className="text-[10px] text-slate-500">Live Bid/Ask</span>
            </div>

            {/* Currency list */}
            <div className="divide-y divide-slate-800/60 my-2">
              {currencies.slice(0, 5).map((cur) => (
                <div key={cur.code} className="py-2 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span className="text-sm">{cur.flag}</span>
                    <div>
                      <span className="font-bold text-slate-200">{cur.code}</span>
                      <span className="text-[10px] text-slate-500 block">{cur.currency}</span>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="font-mono font-bold text-slate-200">
                      {cur.buying.toFixed(2)}
                    </span>
                    <span className="text-[10px] text-slate-500 block">
                      Sell: {cur.selling.toFixed(2)}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Quick action button to converter */}
            <button
              onClick={() => {
                setCurrentView('markets');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="w-full py-2 px-3 rounded-lg bg-blue-600/20 hover:bg-blue-600/30 text-blue-400 border border-blue-500/30 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
            >
              <span>Launch Live Currency Converter</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>

      </div>
    </section>
  );
};
