import React, { useState } from 'react';
import { Clock, Bookmark, ArrowLeft, Filter, Sparkles, TrendingUp } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Article } from '../types';

export const CategoryView: React.FC = () => {
  const { 
    selectedCategory, 
    setCurrentView, 
    articles, 
    openArticle, 
    isBookmarked, 
    toggleBookmark 
  } = useApp();

  const [sortOption, setSortOption] = useState<'latest' | 'views' | 'readTime'>('latest');

  // Filter articles by current category
  const categoryArticles = articles.filter(a => 
    a.category === selectedCategory && a.status === 'published'
  );

  const sortedArticles = [...categoryArticles].sort((a, b) => {
    if (sortOption === 'views') return b.views - a.views;
    if (sortOption === 'readTime') return parseInt(b.readTime) - parseInt(a.readTime);
    return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
  });

  const leadArticle = sortedArticles[0];
  const otherArticles = sortedArticles.slice(1);

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-8 py-8 min-h-[70vh]">
      
      {/* Category Header */}
      <div className="pb-6 border-b border-slate-800 mb-8">
        <button
          onClick={() => {
            setCurrentView('home');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-slate-200 transition-colors mb-3"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All Editions</span>
        </button>

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-blue-400 font-brand text-xs uppercase tracking-widest font-bold">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-500" />
              <span>Editorial Desk</span>
            </div>
            <h1 className="font-editorial text-3xl sm:text-4xl md:text-5xl font-bold text-slate-100 mt-1">
              {selectedCategory}
            </h1>
            <p className="text-slate-400 text-xs sm:text-sm mt-1 max-w-xl">
              Comprehensive coverage, investigative reports, and market analyses focused on {selectedCategory.toLowerCase()} in Ethiopia and the Horn of Africa.
            </p>
          </div>

          {/* Sort options */}
          <div className="flex items-center gap-2 text-xs">
            <span className="text-slate-500 font-medium">Sort by:</span>
            <select
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value as any)}
              className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-200 text-xs focus:outline-none focus:border-blue-500"
            >
              <option value="latest">Latest Published</option>
              <option value="views">Most Read</option>
              <option value="readTime">In-Depth / Long Reads</option>
            </select>
          </div>
        </div>
      </div>

      {sortedArticles.length === 0 ? (
        <div className="text-center py-20 text-slate-500">
          <p className="text-lg font-editorial">No published articles under {selectedCategory} yet.</p>
          <button 
            onClick={() => setCurrentView('home')}
            className="mt-4 px-4 py-2 rounded-xl bg-blue-600 text-white text-xs font-semibold"
          >
            Return to Homepage
          </button>
        </div>
      ) : (
        <div className="space-y-10">
          
          {/* Main Lead Story in Category */}
          {leadArticle && (
            <div 
              onClick={() => openArticle(leadArticle)}
              className="group cursor-pointer rounded-3xl bg-slate-900 border border-slate-800 hover:border-slate-700 overflow-hidden shadow-2xl transition-all duration-300 grid grid-cols-1 lg:grid-cols-12 gap-0"
            >
              <div className="lg:col-span-7 relative aspect-video lg:aspect-auto w-full overflow-hidden bg-slate-800">
                <img 
                  src={leadArticle.featuredImage} 
                  alt={leadArticle.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent" />
                <span className="absolute top-4 left-4 px-3 py-1 rounded-md bg-blue-600 text-white text-xs font-bold uppercase tracking-wider shadow">
                  Lead {selectedCategory} Story
                </span>
              </div>

              <div className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between bg-gradient-to-b from-slate-900 to-slate-950">
                <div>
                  <h2 className="font-editorial text-2xl sm:text-3xl font-bold text-slate-100 group-hover:text-blue-400 transition-colors leading-tight">
                    {leadArticle.title}
                  </h2>
                  <p className="font-sans text-xs sm:text-sm text-slate-300 leading-relaxed mt-3 line-clamp-4">
                    {leadArticle.subtitle || leadArticle.excerpt}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
                  <div className="flex items-center gap-2.5">
                    <img 
                      src={leadArticle.author.avatar} 
                      alt={leadArticle.author.name}
                      className="w-7 h-7 rounded-full object-cover border border-slate-700"
                      referrerPolicy="no-referrer"
                    />
                    <span className="font-medium text-slate-200">{leadArticle.author.name}</span>
                  </div>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-slate-500" />
                    {leadArticle.readTime}
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Grid of Other Category Articles */}
          {otherArticles.length > 0 && (
            <div>
              <h3 className="font-brand text-xs font-bold uppercase tracking-widest text-slate-400 mb-4">
                More in {selectedCategory}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {otherArticles.map((article: Article) => (
                  <article
                    key={article.id}
                    onClick={() => openArticle(article)}
                    className="group cursor-pointer rounded-2xl bg-slate-900/80 hover:bg-slate-850 border border-slate-800 hover:border-slate-700 shadow-lg transition-all duration-300 flex flex-col justify-between overflow-hidden"
                  >
                    <div>
                      <div className="relative aspect-video w-full overflow-hidden bg-slate-800">
                        <img 
                          src={article.featuredImage} 
                          alt={article.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          referrerPolicy="no-referrer"
                        />
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleBookmark(article.id);
                          }}
                          className={`absolute top-3 right-3 p-1.5 rounded-full backdrop-blur-md border transition-all ${
                            isBookmarked(article.id)
                              ? 'bg-blue-600 text-white border-blue-400'
                              : 'bg-slate-950/60 text-slate-300 border-slate-700 hover:text-white'
                          }`}
                        >
                          <Bookmark className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="p-4 sm:p-5">
                        <h4 className="font-editorial text-lg font-bold text-slate-100 group-hover:text-blue-400 transition-colors line-clamp-2 leading-snug">
                          {article.title}
                        </h4>
                        <p className="font-sans text-xs text-slate-400 mt-2 line-clamp-2">
                          {article.subtitle}
                        </p>
                      </div>
                    </div>

                    <div className="px-4 pb-4 sm:px-5 sm:pb-5 pt-3 border-t border-slate-800/60 flex items-center justify-between text-xs text-slate-400">
                      <span className="text-[11px] truncate max-w-[120px] text-slate-300">
                        {article.author.name}
                      </span>
                      <span className="flex items-center gap-1 text-[11px] text-slate-400">
                        <Clock className="w-3 h-3 text-slate-500" />
                        {article.readTime}
                      </span>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          )}

        </div>
      )}

    </div>
  );
};
