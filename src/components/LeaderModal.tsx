import React from 'react';
import { X, Building, Award, Quote, Linkedin, CheckCircle2 } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const LeaderModal: React.FC = () => {
  const { selectedLeader, setSelectedLeader } = useApp();

  if (!selectedLeader) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 dark:bg-slate-950/80 backdrop-blur-md animate-fadeIn transition-colors">
      <div 
        className="relative w-full max-w-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-3xl p-6 sm:p-8 shadow-2xl overflow-y-auto max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={() => setSelectedLeader(null)}
          className="absolute top-5 right-5 p-2 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Top Profile Header */}
        <div className="flex flex-col sm:flex-row gap-5 items-start sm:items-center pb-6 border-b border-slate-100 dark:border-slate-800">
          <img 
            src={selectedLeader.avatar} 
            alt={selectedLeader.name}
            className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl object-cover border-2 border-blue-500/50 shadow-md dark:shadow-xl"
            referrerPolicy="no-referrer"
          />

          <div>
            <span className="px-2.5 py-0.5 rounded text-[11px] font-bold uppercase tracking-wider bg-amber-50 dark:bg-amber-500/10 text-amber-700 dark:text-amber-400 border border-amber-200 dark:border-amber-500/20 inline-block mb-1.5">
              {selectedLeader.sector}
            </span>
            <h2 className="font-editorial text-2xl sm:text-3xl font-bold text-slate-900 dark:text-slate-100">
              {selectedLeader.name}
            </h2>
            <p className="text-sm font-semibold text-blue-600 dark:text-blue-400 mt-0.5">
              {selectedLeader.position}
            </p>
            <p className="text-xs text-slate-600 dark:text-slate-300 flex items-center gap-1.5 mt-1 font-medium">
              <Building className="w-3.5 h-3.5 text-slate-500 dark:text-slate-400" />
              {selectedLeader.organization}
            </p>
          </div>
        </div>

        {/* Executive Bio */}
        <div className="py-5">
          <h4 className="font-brand text-xs font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400 mb-2">
            Executive Profile & Career Dossier
          </h4>
          <p className="font-sans text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
            {selectedLeader.fullBio}
          </p>
        </div>

        {/* Key Achievements */}
        <div className="py-4 border-t border-slate-100 dark:border-slate-800">
          <h4 className="font-brand text-xs font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400 mb-3 flex items-center gap-1.5">
            <Award className="w-4 h-4 text-amber-500 dark:text-amber-400" />
            <span>Notable Strategic Milestones</span>
          </h4>
          <ul className="space-y-2">
            {selectedLeader.achievements.map((ach, idx) => (
              <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-700 dark:text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                <span>{ach}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Leadership Quote */}
        {selectedLeader.quote && (
          <div className="mt-4 p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border-l-4 border-blue-600 dark:border-blue-500 text-xs text-slate-800 dark:text-slate-300 italic font-editorial leading-relaxed">
            <div className="flex gap-2">
              <Quote className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0" />
              <p>"{selectedLeader.quote}"</p>
            </div>
            <span className="block text-right text-[10px] text-slate-500 font-sans mt-2 font-normal">
              — {selectedLeader.name}, {selectedLeader.organization}
            </span>
          </div>
        )}

        {/* Footer */}
        <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
          <div className="text-xs text-slate-500">
            Negarit Executive Leadership Index
          </div>
          <button
            onClick={() => setSelectedLeader(null)}
            className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-200 transition-colors"
          >
            Close Dossier
          </button>
        </div>

      </div>
    </div>
  );
};
