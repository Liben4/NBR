import React from 'react';
import { Flame, Clock, TrendingUp } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Article } from '../types';

export const MostReadSidebar: React.FC = () => {
  const { articles, openArticle } = useApp();

  // Rank top 5 most read articles by views / isMostRead
  const mostReadArticles = [...articles]
    .filter(a => a.status === 'published')
    .sort((a, b) => b.views - a.views)
    .slice(0, 5);

  return (
    <aside className="w-full bg-slate-900/70 border border-slate-800 rounded-2xl p-5 shadow-lg">
      
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-4">
        <div className="flex items-center gap-2">
          <Flame className="w-4 h-4 text-amber-500 fill-amber-500/20" />
          <h3 className="font-brand text-xs font-bold uppercase tracking-widest text-slate-200">
            Most Read This Week
          </h3>
        </div>
        <span className="text-[10px] text-slate-500 uppercase font-bold tracking-wider">
          Ranked 01–05
        </span>
      </div>

      {/* Ranked List */}
      <div className="divide-y divide-slate-800/80">
        {mostReadArticles.map((article: Article, idx: number) => {
          const rank = `0${idx + 1}`;
          return (
            <div
              key={`most-read-${article.id}`}
              onClick={() => openArticle(article)}
              className="py-3.5 first:pt-1 last:pb-1 group cursor-pointer flex gap-4 items-start"
            >
              {/* Big Editorial Number */}
              <span className={`font-brand text-2xl sm:text-3xl font-extrabold tracking-tighter shrink-0 transition-colors ${
                idx === 0 
                  ? 'text-amber-400' 
                  : idx === 1 
                  ? 'text-blue-400' 
                  : 'text-slate-600 group-hover:text-slate-400'
              }`}>
                {rank}
              </span>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <span className="text-[10px] font-bold uppercase tracking-wider text-blue-400 block mb-0.5">
                  {article.category}
                </span>
                
                <h4 className="font-editorial text-sm font-semibold text-slate-200 group-hover:text-amber-300 transition-colors line-clamp-2 leading-snug">
                  {article.title}
                </h4>

                <div className="flex items-center gap-2 mt-1.5 text-[10px] text-slate-500">
                  <span>{article.author.name}</span>
                  <span>•</span>
                  <span className="flex items-center gap-0.5 text-slate-400">
                    <TrendingUp className="w-2.5 h-2.5 text-emerald-400" />
                    {(article.views / 1000).toFixed(1)}k views
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

    </aside>
  );
};
