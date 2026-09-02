import React, { useState } from 'react';
import { 
  Clock, 
  Bookmark, 
  Share2, 
  Grid3X3, 
  List, 
  ArrowRight,
  TrendingUp
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Article, CategoryType } from '../types';

export const LatestNewsGrid: React.FC = () => {
  const { 
    articles, 
    openArticle, 
    isBookmarked, 
    toggleBookmark,
    showToast
  } = useApp();

  const [activeFilter, setActiveFilter] = useState<CategoryType>('All');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const filterOptions: CategoryType[] = ['All', 'Business', 'Economy', 'Finance', 'Technology', 'Entrepreneurship', 'Opinion'];

  const filteredArticles = articles.filter(a => {
    if (a.status !== 'published') return false;
    if (activeFilter === 'All') return true;
    return a.category === activeFilter;
  });

  const handleShare = (e: React.MouseEvent, article: Article) => {
    e.stopPropagation();
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      showToast(`Link copied for "${article.title.slice(0, 25)}..."`);
    }
  };

  return (
    <section className="w-full max-w-7xl mx-auto px-4 sm:px-8 py-8">
      
      {/* Section Top Header & Filters */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800 mb-6">
        <div>
          <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-brand text-xs uppercase tracking-widest font-bold">
            <span className="w-2 h-2 rounded-full bg-blue-600" />
            <span>Dispatches & Intelligence</span>
          </div>
          <h2 className="font-editorial text-2xl sm:text-3xl font-bold text-slate-900 dark:text-slate-100 mt-1">
            Latest Business News
          </h2>
        </div>

        {/* Category Pills & Layout Toggle */}
        <div className="flex flex-wrap items-center gap-2 justify-between md:justify-end">
          <div className="flex items-center gap-1 overflow-x-auto no-scrollbar py-1">
            {filterOptions.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                className={`px-3 py-1 rounded-full text-xs font-semibold transition-all whitespace-nowrap ${
                  activeFilter === cat
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Grid / List Switcher */}
          <div className="hidden sm:flex items-center bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-0.5 rounded-lg text-slate-500 dark:text-slate-400">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded transition-colors ${viewMode === 'grid' ? 'bg-white dark:bg-slate-800 text-blue-600 dark:text-white shadow-2xs' : 'hover:text-slate-900 dark:hover:text-white'}`}
              title="Grid view"
            >
              <Grid3X3 className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-1.5 rounded transition-colors ${viewMode === 'list' ? 'bg-white dark:bg-slate-800 text-blue-600 dark:text-white shadow-2xs' : 'hover:text-slate-900 dark:hover:text-white'}`}
              title="Compact list view"
            >
              <List className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Articles Container */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredArticles.map((article: Article) => (
            <article
              key={article.id}
              onClick={() => openArticle(article)}
              className="group cursor-pointer rounded-2xl bg-white dark:bg-slate-900/90 hover:bg-slate-50 dark:hover:bg-slate-850 border border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 shadow-sm hover:shadow-md dark:shadow-lg dark:hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden"
            >
              <div>
                {/* Thumbnail Image */}
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-100 dark:bg-slate-800">
                  <img 
                    src={article.featuredImage} 
                    alt={article.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-950/20 to-transparent" />
                  
                  {/* Category Pill */}
                  <span className="absolute top-3 left-3 px-2.5 py-0.5 rounded-md bg-slate-950/80 backdrop-blur-md text-blue-400 border border-blue-500/30 text-[11px] font-bold uppercase tracking-wide">
                    {article.category}
                  </span>

                  {/* Bookmark Button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleBookmark(article.id);
                    }}
                    className={`absolute top-3 right-3 p-1.5 rounded-full backdrop-blur-md border transition-all ${
                      isBookmarked(article.id)
                        ? 'bg-blue-600 text-white border-blue-400'
                        : 'bg-slate-950/60 text-slate-200 border-slate-700 hover:text-white hover:bg-slate-900'
                    }`}
                    title={isBookmarked(article.id) ? "Saved" : "Save article"}
                  >
                    <Bookmark className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Article Info */}
                <div className="p-4 sm:p-5">
                  <h3 className="font-editorial text-lg sm:text-xl font-bold text-slate-900 dark:text-slate-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2 leading-snug">
                    {article.title}
                  </h3>

                  <p className="font-sans text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-2.5 line-clamp-2 leading-relaxed">
                    {article.subtitle || article.excerpt}
                  </p>
                </div>
              </div>

              {/* Card Footer */}
              <div className="px-4 pb-4 sm:px-5 sm:pb-5 pt-3 border-t border-slate-100 dark:border-slate-800/60 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                <div className="flex items-center gap-2">
                  <img 
                    src={article.author.avatar} 
                    alt={article.author.name}
                    className="w-6 h-6 rounded-full object-cover border border-slate-200 dark:border-slate-700"
                    referrerPolicy="no-referrer"
                  />
                  <span className="text-[11px] font-medium text-slate-800 dark:text-slate-300 truncate max-w-[110px]">
                    {article.author.name}
                  </span>
                </div>

                <div className="flex items-center gap-3 text-[11px] text-slate-500 dark:text-slate-400">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3 text-slate-400 dark:text-slate-500" />
                    {article.readTime}
                  </span>
                  <button
                    onClick={(e) => handleShare(e, article)}
                    className="p-1 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                    title="Share link"
                  >
                    <Share2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      ) : (
        /* List Mode */
        <div className="divide-y divide-slate-200 dark:divide-slate-800 bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden shadow-xs">
          {filteredArticles.map((article: Article) => (
            <div
              key={article.id}
              onClick={() => openArticle(article)}
              className="p-4 sm:p-5 hover:bg-slate-50 dark:hover:bg-slate-800/80 transition-colors cursor-pointer flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between group"
            >
              <div className="flex gap-4 items-center flex-1 min-w-0">
                <div className="w-20 h-16 sm:w-24 sm:h-20 rounded-lg overflow-hidden shrink-0 bg-slate-100 dark:bg-slate-800">
                  <img 
                    src={article.featuredImage} 
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    referrerPolicy="no-referrer"
                    loading="lazy"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                      {article.category}
                    </span>
                    <span className="text-slate-300 dark:text-slate-600 text-xs">•</span>
                    <span className="text-[11px] text-slate-500 dark:text-slate-400">{article.readTime}</span>
                  </div>
                  <h3 className="font-editorial text-base sm:text-lg font-bold text-slate-900 dark:text-slate-200 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors truncate">
                    {article.title}
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-400 truncate hidden md:block mt-0.5">
                    {article.subtitle}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4 shrink-0 text-xs text-slate-500 dark:text-slate-400 self-end sm:self-center">
                <span className="hidden lg:inline text-slate-700 dark:text-slate-400 font-medium">{article.author.name}</span>
                <span className="text-slate-400 dark:text-slate-500">
                  {new Date(article.publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                </span>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleBookmark(article.id);
                  }}
                  className={`p-1.5 rounded-lg border transition-colors ${
                    isBookmarked(article.id)
                      ? 'bg-blue-600 text-white border-blue-500'
                      : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 text-slate-500 dark:text-slate-400'
                  }`}
                >
                  <Bookmark className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

    </section>
  );
};

