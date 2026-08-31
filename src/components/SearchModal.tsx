import React, { useState, useEffect, useRef } from 'react';
import { Search, X, ArrowRight, Clock, Building, Tag, User, Sparkles } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Article } from '../types';

export const SearchModal: React.FC = () => {
  const { 
    isSearchOpen, 
    setIsSearchOpen, 
    articles, 
    openArticle,
    leaders,
    setSelectedLeader
  } = useApp();

  const [query, setQuery] = useState('');
  const [activeType, setActiveType] = useState<'all' | 'articles' | 'companies' | 'topics' | 'authors'>('all');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isSearchOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
    }
  }, [isSearchOpen]);

  // Keyboard shortcut ESC and Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsSearchOpen(true);
      }
      if (e.key === 'Escape') {
        setIsSearchOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [setIsSearchOpen]);

  if (!isSearchOpen) return null;

  const cleanQuery = query.toLowerCase().trim();

  // Search matches
  const matchedArticles = cleanQuery
    ? articles.filter(a => 
        a.title.toLowerCase().includes(cleanQuery) ||
        a.subtitle.toLowerCase().includes(cleanQuery) ||
        a.category.toLowerCase().includes(cleanQuery) ||
        a.tags.some(t => t.toLowerCase().includes(cleanQuery)) ||
        a.author.name.toLowerCase().includes(cleanQuery) ||
        (a.relatedCompany && a.relatedCompany.toLowerCase().includes(cleanQuery))
      )
    : articles.slice(0, 4);

  const matchedLeaders = cleanQuery
    ? leaders.filter(l => 
        l.name.toLowerCase().includes(cleanQuery) ||
        l.organization.toLowerCase().includes(cleanQuery) ||
        l.sector.toLowerCase().includes(cleanQuery)
      )
    : [];

  const handleArticleClick = (art: Article) => {
    openArticle(art);
    setIsSearchOpen(false);
  };

  const handleLeaderClick = (lead: any) => {
    setSelectedLeader(lead);
    setIsSearchOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      <div 
        className="relative w-full max-w-3xl bg-slate-900 border border-slate-700 rounded-3xl p-5 sm:p-6 shadow-2xl overflow-hidden flex flex-col max-h-[80vh]"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Search Input Bar */}
        <div className="flex items-center gap-3 pb-4 border-b border-slate-800">
          <Search className="w-5 h-5 text-blue-400 shrink-0" />
          <input 
            ref={inputRef}
            type="text"
            placeholder="Search articles, companies, topics, economic data, or leaders..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full bg-transparent text-slate-100 placeholder-slate-500 text-sm sm:text-base focus:outline-none"
          />
          {query && (
            <button 
              onClick={() => setQuery('')}
              className="p-1 rounded text-slate-500 hover:text-slate-300"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={() => setIsSearchOpen(false)}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white text-xs font-semibold"
          >
            ESC
          </button>
        </div>

        {/* Quick Filter Categories */}
        <div className="flex items-center gap-2 py-3 border-b border-slate-800 text-xs overflow-x-auto no-scrollbar">
          <span className="text-slate-500 font-semibold mr-1">Filter:</span>
          {(['all', 'articles', 'companies', 'topics', 'authors'] as const).map(type => (
            <button
              key={type}
              onClick={() => setActiveType(type)}
              className={`px-3 py-1 rounded-lg capitalize font-medium transition-colors ${
                activeType === type
                  ? 'bg-blue-600 text-white'
                  : 'bg-slate-800/60 text-slate-400 hover:text-slate-200'
              }`}
            >
              {type}
            </button>
          ))}
        </div>

        {/* Search Results Area */}
        <div className="overflow-y-auto flex-1 py-4 space-y-4 pr-1">
          
          {/* Quick Suggestions when empty */}
          {!cleanQuery && (
            <div className="text-xs text-slate-400 mb-2">
              <span className="font-bold text-slate-300 block mb-2">Trending Searches:</span>
              <div className="flex flex-wrap gap-2">
                {['NBE FX Liberalization', 'ESX Stock Exchange', 'Ethio Telecom Public Float', 'Coffee Export Record', 'GERD Clean Energy', 'Safaricom M-Pesa'].map(t => (
                  <button
                    key={t}
                    onClick={() => setQuery(t)}
                    className="px-2.5 py-1 rounded-md bg-slate-800/80 hover:bg-slate-800 text-slate-300 border border-slate-700/60 transition-colors"
                  >
                    #{t}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Leaders matches */}
          {matchedLeaders.length > 0 && (
            <div>
              <h4 className="text-[11px] font-brand font-bold uppercase tracking-widest text-amber-400 mb-2">
                Executive Leaders ({matchedLeaders.length})
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {matchedLeaders.map(l => (
                  <div
                    key={l.id}
                    onClick={() => handleLeaderClick(l)}
                    className="p-2.5 rounded-xl bg-slate-800/60 hover:bg-slate-800 border border-slate-700/60 cursor-pointer flex items-center gap-3"
                  >
                    <img 
                      src={l.avatar} 
                      alt={l.name} 
                      className="w-10 h-10 rounded-lg object-cover" 
                      referrerPolicy="no-referrer"
                    />
                    <div className="min-w-0">
                      <p className="font-bold text-xs text-slate-200 truncate">{l.name}</p>
                      <p className="text-[10px] text-slate-400 truncate">{l.position} • {l.organization}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Articles list */}
          <div>
            <h4 className="text-[11px] font-brand font-bold uppercase tracking-widest text-blue-400 mb-2">
              {cleanQuery ? `Articles & Briefings (${matchedArticles.length})` : 'Recommended Briefings'}
            </h4>

            {matchedArticles.length === 0 ? (
              <div className="text-center py-8 text-slate-500 text-xs">
                No matching articles found for "{query}". Try searching for macroeconomic topics or banking terms.
              </div>
            ) : (
              <div className="space-y-2.5">
                {matchedArticles.map((article: Article) => (
                  <div
                    key={article.id}
                    onClick={() => handleArticleClick(article)}
                    className="p-3 rounded-xl bg-slate-800/40 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 cursor-pointer transition-all flex gap-3 items-center group"
                  >
                    <div className="w-16 h-16 rounded-lg overflow-hidden shrink-0 bg-slate-800">
                      <img 
                        src={article.featuredImage} 
                        alt={article.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-0.5">
                        <span className="text-[10px] font-bold uppercase text-blue-400">
                          {article.category}
                        </span>
                        <span className="text-slate-600 text-xs">•</span>
                        <span className="text-[10px] text-slate-400">{article.readTime}</span>
                      </div>
                      <h5 className="font-editorial text-sm font-semibold text-slate-200 group-hover:text-amber-300 transition-colors line-clamp-1">
                        {article.title}
                      </h5>
                      <p className="text-[11px] text-slate-400 truncate mt-0.5">
                        {article.subtitle}
                      </p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-white group-hover:translate-x-1 transition-all shrink-0" />
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>

        {/* Modal Footer */}
        <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-xs text-slate-500">
          <span>Search Negarit Archive</span>
          <span>Press ESC to close</span>
        </div>

      </div>
    </div>
  );
};
