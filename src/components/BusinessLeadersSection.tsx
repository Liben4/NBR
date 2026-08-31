import React from 'react';
import { Sparkles, ArrowRight, Linkedin, Award, Building, Quote } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { BusinessLeader } from '../types';

export const BusinessLeadersSection: React.FC = () => {
  const { leaders, setSelectedLeader, setCurrentView } = useApp();

  return (
    <section className="w-full max-w-7xl mx-auto px-4 sm:px-8 py-8">
      
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-4 border-b border-slate-800 mb-6">
        <div>
          <div className="flex items-center gap-2 text-blue-400 font-brand text-xs uppercase tracking-widest font-bold">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>Executive Profiles</span>
          </div>
          <h2 className="font-editorial text-2xl sm:text-3xl font-bold text-slate-100 mt-1">
            Featured Business Leaders
          </h2>
          <p className="text-slate-400 text-xs sm:text-sm mt-0.5">
            The visionary executives, founders, and policymakers architecting Ethiopia's economic transformation.
          </p>
        </div>

        <button
          onClick={() => {
            setCurrentView('leaders');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-white text-xs font-semibold transition-colors"
        >
          <span>All Executive Profiles</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Grid of Leaders */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {leaders.slice(0, 3).map((leader: BusinessLeader) => (
          <div
            key={leader.id}
            onClick={() => setSelectedLeader(leader)}
            className="group cursor-pointer rounded-2xl bg-slate-900/80 hover:bg-slate-850 border border-slate-800 hover:border-blue-500/50 shadow-lg transition-all duration-300 p-5 flex flex-col justify-between"
          >
            <div>
              {/* Leader Avatar & Organization */}
              <div className="flex items-center gap-4">
                <div className="relative w-16 h-16 sm:w-18 sm:h-18 rounded-xl overflow-hidden shrink-0 border-2 border-slate-700 group-hover:border-blue-500 transition-colors shadow-md">
                  <img 
                    src={leader.avatar} 
                    alt={leader.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                </div>

                <div className="min-w-0">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400 block truncate">
                    {leader.sector}
                  </span>
                  <h3 className="font-editorial text-lg sm:text-xl font-bold text-slate-100 group-hover:text-blue-400 transition-colors truncate">
                    {leader.name}
                  </h3>
                  <p className="text-xs text-slate-300 font-medium truncate">
                    {leader.position}
                  </p>
                  <p className="text-[11px] text-slate-400 font-semibold truncate flex items-center gap-1 mt-0.5">
                    <Building className="w-3 h-3 text-blue-400 shrink-0" />
                    {leader.organization}
                  </p>
                </div>
              </div>

              {/* Short Bio */}
              <p className="font-sans text-xs text-slate-400 leading-relaxed mt-4 line-clamp-3">
                {leader.shortDescription}
              </p>

              {/* Key Quote snippet if present */}
              {leader.quote && (
                <div className="mt-3 p-2.5 rounded-lg bg-slate-950/60 border border-slate-800 text-[11px] text-slate-300 italic flex gap-1.5">
                  <Quote className="w-3.5 h-3.5 text-blue-400 shrink-0 mt-0.5" />
                  <span className="line-clamp-2">"{leader.quote}"</span>
                </div>
              )}
            </div>

            {/* Footer / CTA */}
            <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs">
              <span className="text-slate-500 font-medium text-[11px]">
                {leader.achievements.length} Key Milestones
              </span>
              <span className="text-blue-400 font-semibold inline-flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                <span>View Dossier</span>
                <ArrowRight className="w-3 h-3" />
              </span>
            </div>
          </div>
        ))}
      </div>

    </section>
  );
};
