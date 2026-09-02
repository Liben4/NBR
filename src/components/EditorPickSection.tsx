import React from 'react';
import { Award, Clock, ArrowRight, Bookmark } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Article } from '../types';

export const EditorPickSection: React.FC = () => {
  const { articles, openArticle, isBookmarked, toggleBookmark } = useApp();

  // Find articles marked as editor pick or fallback to published
  const published = articles.filter(a => a.status === 'published');
  const explicitlyPicked = published.filter(a => a.isEditorPick);
  const editorPicks = (explicitlyPicked.length > 0 ? explicitlyPicked : published).slice(0, 3);

  if (editorPicks.length === 0) return null;

  return (
    <section className="w-full bg-gradient-to-b from-amber-500/5 via-slate-50 to-amber-500/5 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 border-y border-amber-500/30 py-10 px-4 sm:px-8 my-8 relative overflow-hidden transition-colors duration-200">
      {/* Subtle luxury ambient glows */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-amber-500/10 dark:bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-blue-600/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Header with Gold Accent */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-4 border-b border-amber-500/30 mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-800 dark:text-amber-400 text-[11px] font-brand font-bold uppercase tracking-widest mb-2 shadow-sm">
              <Award className="w-3.5 h-3.5" />
              <span>Editor's Selection</span>
            </div>
            <h2 className="font-editorial text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 dark:text-slate-100">
              Curated Executive Briefings
            </h2>
            <p className="text-slate-600 dark:text-slate-400 text-xs sm:text-sm mt-1 max-w-xl">
              Deep investigative journalism and long-form analysis hand-selected by our senior editorial board.
            </p>
          </div>

          <div className="text-xs text-amber-700 dark:text-amber-400 font-semibold tracking-wide">
            Addis Ababa Editorial Desk
          </div>
        </div>

        {/* 3-Column Luxury Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {editorPicks.map((article: Article, idx: number) => (
            <article
              key={article.id}
              onClick={() => openArticle(article)}
              className="group cursor-pointer rounded-2xl bg-white dark:bg-gradient-to-b dark:from-slate-900/90 dark:to-slate-950/90 border border-amber-500/20 hover:border-amber-500/60 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden"
            >
              <div>
                {/* Visual Header */}
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-100 dark:bg-slate-900">
                  <img 
                    src={article.featuredImage} 
                    alt={article.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />
                  
                  {/* Badge & Ordinal */}
                  <div className="absolute top-3 left-3 flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-amber-500 text-slate-950 text-xs font-black flex items-center justify-center font-brand shadow">
                      {idx + 1}
                    </span>
                    <span className="px-2.5 py-0.5 rounded bg-slate-950/80 backdrop-blur-md text-amber-300 text-[10px] font-bold uppercase tracking-wider border border-amber-500/30">
                      {article.category}
                    </span>
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleBookmark(article.id);
                    }}
                    className={`absolute top-3 right-3 p-1.5 rounded-full backdrop-blur-md border transition-all ${
                      isBookmarked(article.id)
                        ? 'bg-amber-500 text-slate-950 border-amber-400'
                        : 'bg-slate-950/60 text-slate-300 border-slate-700 hover:text-white'
                    }`}
                  >
                    <Bookmark className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Body Content */}
                <div className="p-5">
                  <h3 className="font-editorial text-lg sm:text-xl font-bold text-slate-900 dark:text-slate-100 group-hover:text-amber-700 dark:group-hover:text-amber-300 transition-colors leading-snug">
                    {article.title}
                  </h3>

                  <p className="font-sans text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-2.5 line-clamp-3 leading-relaxed">
                    {article.subtitle || article.excerpt}
                  </p>
                </div>
              </div>

              {/* Card Footer */}
              <div className="px-5 pb-5 pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                <div className="flex items-center gap-2">
                  <img 
                    src={article.author.avatar} 
                    alt={article.author.name}
                    className="w-6 h-6 rounded-full object-cover border border-amber-500/30"
                    referrerPolicy="no-referrer"
                  />
                  <span className="text-[11px] font-medium text-slate-700 dark:text-slate-300 truncate max-w-[120px]">
                    {article.author.name}
                  </span>
                </div>

                <div className="flex items-center gap-1.5 text-amber-700 dark:text-amber-400 font-semibold text-[11px] group-hover:translate-x-1 transition-transform">
                  <span>Read Briefing</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>

            </article>
          ))}
        </div>

      </div>
    </section>
  );
};
