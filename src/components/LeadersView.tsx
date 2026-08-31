import React, { useState } from 'react';
import { Sparkles, ArrowLeft, Search, Building, Award, Quote, ArrowRight } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { BusinessLeader } from '../types';

export const LeadersView: React.FC = () => {
  const { leaders, setSelectedLeader, setCurrentView } = useApp();
  const [search, setSearch] = useState('');
  const [selectedSector, setSelectedSector] = useState<string>('All');

  const sectors = ['All', 'Telecommunications & Fintech', 'Aviation & Global Logistics', 'Sovereign Wealth & Capital Strategy', 'Mobility & Technology Ecosystems', 'Investment Banking & Private Equity', 'Commercial Banking & Monetary Assets'];

  const filteredLeaders = leaders.filter(l => {
    const matchSearch = l.name.toLowerCase().includes(search.toLowerCase()) ||
      l.organization.toLowerCase().includes(search.toLowerCase()) ||
      l.position.toLowerCase().includes(search.toLowerCase());
    const matchSector = selectedSector === 'All' || l.sector === selectedSector;
    return matchSearch && matchSector;
  });

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
          <Sparkles className="w-4 h-4" />
          <span>Negarit Executive Index</span>
        </div>
        <h1 className="font-editorial text-3xl sm:text-4xl md:text-5xl font-bold text-slate-100 mt-1">
          Ethiopian Business Leaders
        </h1>
        <p className="text-slate-400 text-xs sm:text-sm mt-1 max-w-2xl">
          Profiles of the chief executives, policy directors, startup pioneers, and institutional strategists leading the transformation of the East African economic landscape.
        </p>

        {/* Search & Filter Bar */}
        <div className="flex flex-col sm:flex-row gap-3 mt-6">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
            <input 
              type="text"
              placeholder="Search executive by name, organization, or title..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-100 text-xs focus:outline-none focus:border-blue-500"
            />
          </div>

          <select
            value={selectedSector}
            onChange={(e) => setSelectedSector(e.target.value)}
            className="px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-200 text-xs focus:outline-none focus:border-blue-500"
          >
            {sectors.map(s => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Leaders Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredLeaders.map((leader: BusinessLeader) => (
          <div
            key={leader.id}
            onClick={() => setSelectedLeader(leader)}
            className="group cursor-pointer rounded-3xl bg-slate-900 border border-slate-800 hover:border-blue-500/50 p-6 flex flex-col justify-between shadow-xl transition-all duration-300"
          >
            <div>
              <div className="flex items-center gap-4">
                <img 
                  src={leader.avatar} 
                  alt={leader.name}
                  className="w-20 h-20 rounded-2xl object-cover border-2 border-slate-700 group-hover:border-blue-500 transition-colors shrink-0 shadow-md"
                  referrerPolicy="no-referrer"
                />

                <div className="min-w-0">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400 block truncate">
                    {leader.sector}
                  </span>
                  <h3 className="font-editorial text-xl font-bold text-slate-100 group-hover:text-blue-400 transition-colors truncate">
                    {leader.name}
                  </h3>
                  <p className="text-xs text-slate-300 font-semibold truncate mt-0.5">
                    {leader.position}
                  </p>
                  <p className="text-[11px] text-slate-400 font-medium truncate flex items-center gap-1 mt-0.5">
                    <Building className="w-3 h-3 text-blue-400 shrink-0" />
                    {leader.organization}
                  </p>
                </div>
              </div>

              <p className="font-sans text-xs text-slate-400 leading-relaxed mt-4 line-clamp-3">
                {leader.shortDescription}
              </p>

              {leader.quote && (
                <div className="mt-3 p-3 rounded-xl bg-slate-950/70 border-l-2 border-amber-400 text-xs text-slate-300 italic font-editorial">
                  "{leader.quote}"
                </div>
              )}
            </div>

            <div className="mt-5 pt-3 border-t border-slate-800 flex items-center justify-between text-xs">
              <span className="text-slate-500 text-[11px]">
                {leader.achievements.length} Key Strategic Achievements
              </span>
              <span className="text-blue-400 font-semibold inline-flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                <span>View Dossier</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};
