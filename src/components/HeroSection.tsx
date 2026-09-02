import React from 'react';
import { Clock, ArrowRight, Bookmark, TrendingUp } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Article } from '../types';

export const HeroSection: React.FC = () => {
  const { articles, openArticle, isBookmarked, toggleBookmark, setCurrentView } = useApp();

  // Find hero featured article or fallback to first
  const heroArticle = articles.find(a => a.isHeroFeatured && a.status === 'published') || articles[0];
  
  // Side stories: 3-4 other high importance articles
  const sideArticles = articles
    .filter(a => a.id !== heroArticle.id && a.status === 'published')
    .slice(0, 3);

  if (!heroArticle) return null;

  return (
    <section className="w-full max-w-7xl mx-auto px-4 sm:px-8 py-6 md:py-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">
        
        {/* ================= LEFT / MAIN: FEATURED HERO STORY (8 Cols) ================= */}
        <div className="lg:col-span-8 flex flex-col justify-between group">
          <div className="relative overflow-hidden rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-md dark:shadow-xl transition-all duration-300 hover:border-slate-300 dark:hover:border-slate-700 flex flex-col h-full">
            
            {/* Main Featured Image with Zoom on Hover */}
            <div 
              className="relative aspect-video w-full overflow-hidden cursor-pointer bg-slate-100 dark:bg-slate-800"
              onClick={() => openArticle(heroArticle)}
            >
              <img 
                src={heroArticle.featuredImage} 
                alt={heroArticle.title}
                className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-transparent" />
              
              {/* Category & Badge */}
              <div className="absolute top-4 left-4 flex items-center gap-2">
                <span className="px-3 py-1 rounded-full bg-blue-600 text-white text-xs font-bold tracking-wider uppercase backdrop-blur-md shadow-md">
                  {heroArticle.category}
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-amber-400 text-slate-950 text-[11px] font-extrabold tracking-wide uppercase shadow-md flex items-center gap-1">
                  <TrendingUp className="w-3 h-3" /> Lead Story
                </span>
              </div>

              {/* Bookmark overlay */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleBookmark(heroArticle.id);
                }}
                className={`absolute top-4 right-4 p-2 rounded-full backdrop-blur-md border transition-all ${
                  isBookmarked(heroArticle.id)
                    ? 'bg-blue-600 text-white border-blue-400'
                    : 'bg-slate-950/60 text-slate-200 border-slate-700 hover:text-white hover:bg-slate-900'
                }`}
                title={isBookmarked(heroArticle.id) ? "Saved" : "Save for later"}
              >
                <Bookmark className="w-4 h-4" />
              </button>
            </div>

            {/* Content Details */}
            <div className="p-5 sm:p-7 flex flex-col flex-grow justify-between bg-white dark:bg-slate-900">
              <div>
                <h2 
                  onClick={() => openArticle(heroArticle)}
                  className="font-editorial text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-slate-900 dark:text-slate-100 hover:text-blue-600 dark:hover:text-blue-400 transition-colors cursor-pointer leading-[1.2]"
                >
                  {heroArticle.title}
                </h2>
                
                <p className="font-sans text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed mt-3 line-clamp-3">
                  {heroArticle.subtitle || heroArticle.excerpt}
                </p>
              </div>

              {/* Meta & CTA Footer */}
              <div className="mt-6 pt-4 border-t border-slate-200 dark:border-slate-800/80 flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <img 
                    src={heroArticle.author.avatar} 
                    alt={heroArticle.author.name}
                    className="w-9 h-9 rounded-full object-cover border border-slate-300 dark:border-slate-700"
                    referrerPolicy="no-referrer"
                  />
                  <div>
                    <span className="text-xs font-semibold text-slate-900 dark:text-slate-200 block">
                      {heroArticle.author.name}
                    </span>
                    <div className="flex items-center gap-2 text-[11px] text-slate-500 dark:text-slate-400">
                      <span>{new Date(heroArticle.publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                      <span>•</span>
                      <span className="flex items-center gap-1 text-slate-500 dark:text-slate-400">
                        <Clock className="w-3 h-3 text-blue-600 dark:text-blue-400" />
                        {heroArticle.readTime}
                      </span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => openArticle(heroArticle)}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs sm:text-sm font-semibold shadow-md shadow-blue-900/20 transition-all group/btn"
                >
                  <span>Read Full Story</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                </button>
              </div>

            </div>
          </div>
        </div>

        {/* ================= RIGHT: SIDE STORIES LIST (4 Cols) ================= */}
        <div className="lg:col-span-4 flex flex-col justify-between space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-slate-200 dark:border-slate-800">
            <h3 className="font-brand text-xs font-bold uppercase tracking-widest text-slate-800 dark:text-slate-300 flex items-center gap-2">
              <span className="w-2 h-2 rounded bg-amber-500" />
              Essential Briefings
            </h3>
            <span className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">Top Developments</span>
          </div>

          <div className="flex flex-col gap-3.5 flex-grow">
            {sideArticles.map((article: Article) => (
              <div 
                key={article.id}
                onClick={() => openArticle(article)}
                className="group/side cursor-pointer p-3.5 rounded-xl bg-white dark:bg-slate-900/90 hover:bg-slate-50 dark:hover:bg-slate-800/90 border border-slate-200 dark:border-slate-800/80 hover:border-slate-300 dark:hover:border-slate-700 shadow-2xs transition-all duration-200 flex flex-col justify-between"
              >
                <div className="flex gap-3.5 items-start">
                  {/* Thumbnail */}
                  <div className="w-20 h-20 sm:w-24 sm:h-20 shrink-0 rounded-lg overflow-hidden relative bg-slate-100 dark:bg-slate-800">
                    <img 
                      src={article.featuredImage} 
                      alt={article.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover/side:scale-110"
                      referrerPolicy="no-referrer"
                    />
                  </div>

                  {/* Headline & Meta */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-1 mb-1">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                        {article.category}
                      </span>
                      <span className="text-[10px] text-slate-500 dark:text-slate-400">
                        {article.readTime}
                      </span>
                    </div>

                    <h4 className="font-editorial text-sm sm:text-[15px] font-semibold text-slate-900 dark:text-slate-200 group-hover/side:text-blue-600 dark:group-hover/side:text-amber-300 transition-colors line-clamp-2 leading-snug">
                      {article.title}
                    </h4>
                  </div>
                </div>

                <div className="mt-2.5 pt-2 border-t border-slate-100 dark:border-slate-800/50 flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400">
                  <span className="truncate max-w-[140px] text-slate-600 dark:text-slate-400 font-medium">{article.author.name}</span>
                  <span className="text-slate-400 dark:text-slate-500">
                    {new Date(article.publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Premium Market Callout Banner */}
          <div 
            onClick={() => setCurrentView('markets')}
            className="cursor-pointer p-3.5 rounded-xl bg-gradient-to-r from-blue-50 to-indigo-50/60 dark:from-blue-950/80 dark:to-slate-900 border border-blue-200 dark:border-blue-900/40 text-xs flex items-center justify-between shadow-2xs hover:shadow-sm transition-all"
          >
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-blue-600 text-white dark:bg-blue-600/20 dark:text-blue-400 flex items-center justify-center font-bold text-xs shadow-2xs">
                ESX
              </div>
              <div>
                <p className="font-semibold text-slate-900 dark:text-slate-200">Ethiopian Capital Markets</p>
                <p className="text-[11px] text-slate-600 dark:text-slate-400">Track equity listings & sovereign bonds</p>
              </div>
            </div>
            <span className="text-blue-600 dark:text-blue-400 text-xs font-bold hover:underline">
              Explore →
            </span>
          </div>

        </div>

      </div>
    </section>
  );
};
