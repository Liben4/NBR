import React, { useState } from 'react';
import { Flame, Pause, Play, ChevronRight } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const BreakingTicker: React.FC = () => {
  const { breakingNews, articles, openArticle } = useApp();
  const [isPaused, setIsPaused] = useState(false);

  const handleTickerClick = (text: string) => {
    // Find matching article if any
    const matched = articles.find(a => 
      text.toLowerCase().includes(a.category.toLowerCase()) || 
      a.title.toLowerCase().split(' ').some(w => text.toLowerCase().includes(w) && w.length > 5)
    );
    if (matched) {
      openArticle(matched);
    }
  };

  return (
    <div className="w-full bg-amber-50/60 dark:bg-slate-900/95 border-b border-amber-200/60 dark:border-slate-800/80 text-xs overflow-hidden relative flex items-center py-2 px-4 sm:px-8 select-none transition-colors duration-200">
      {/* Breaking Badge */}
      <div className="flex items-center gap-1.5 shrink-0 z-10 pr-3 sm:pr-4 bg-amber-50/90 dark:bg-slate-900/95 shadow-2xs">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-500 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-600 dark:bg-amber-500"></span>
        </span>
        <span className="font-brand font-bold uppercase tracking-wider text-amber-700 dark:text-amber-400 flex items-center gap-1 text-[11px]">
          <Flame className="w-3.5 h-3.5 text-amber-600 dark:text-amber-500 fill-amber-500/30" />
          Breaking News
        </span>
        <span className="text-slate-300 dark:text-slate-700 font-bold ml-1">|</span>
      </div>

      {/* Marquee Content */}
      <div 
        className="flex-1 overflow-hidden relative"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <div 
          className={`animate-ticker flex items-center gap-8 ${isPaused ? 'cursor-pointer' : ''}`}
          style={{ animationPlayState: isPaused ? 'paused' : 'running' }}
        >
          {breakingNews.map((item, idx) => (
            <div 
              key={`ticker-${idx}`} 
              onClick={() => handleTickerClick(item)}
              className="flex items-center gap-3 text-slate-800 dark:text-slate-300 hover:text-blue-600 dark:hover:text-amber-300 transition-colors cursor-pointer group whitespace-nowrap"
            >
              <span className="text-slate-800 dark:text-slate-300 font-normal tracking-wide text-xs sm:text-[13px] group-hover:underline">
                {item}
              </span>
              <ChevronRight className="w-3 h-3 text-slate-400 dark:text-slate-600 group-hover:text-blue-600 dark:group-hover:text-amber-400 transition-transform group-hover:translate-x-0.5" />
              <span className="text-slate-300 dark:text-slate-700 font-black">•</span>
            </div>
          ))}

          {/* Repeat for seamless infinite loop */}
          {breakingNews.map((item, idx) => (
            <div 
              key={`ticker-dup-${idx}`} 
              onClick={() => handleTickerClick(item)}
              className="flex items-center gap-3 text-slate-800 dark:text-slate-300 hover:text-blue-600 dark:hover:text-amber-300 transition-colors cursor-pointer group whitespace-nowrap"
            >
              <span className="text-slate-800 dark:text-slate-300 font-normal tracking-wide text-xs sm:text-[13px] group-hover:underline">
                {item}
              </span>
              <ChevronRight className="w-3 h-3 text-slate-400 dark:text-slate-600 group-hover:text-blue-600 dark:group-hover:text-amber-400 transition-transform group-hover:translate-x-0.5" />
              <span className="text-slate-300 dark:text-slate-700 font-black">•</span>
            </div>
          ))}
        </div>
      </div>

      {/* Play/Pause Control Button */}
      <button 
        onClick={() => setIsPaused(!isPaused)}
        className="hidden sm:flex items-center justify-center p-1 rounded hover:bg-amber-100 dark:hover:bg-slate-800 text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 transition-colors shrink-0 ml-2"
        title={isPaused ? "Resume ticker" : "Pause ticker"}
      >
        {isPaused ? <Play className="w-3 h-3" /> : <Pause className="w-3 h-3" />}
      </button>
    </div>
  );
};

