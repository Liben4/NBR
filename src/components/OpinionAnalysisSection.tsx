import React from 'react';
import { Feather, Quote, ArrowRight, BookOpen } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Article } from '../types';

export const OpinionAnalysisSection: React.FC = () => {
  const { articles, openArticle } = useApp();

  // Find opinion and deep analysis articles
  const opinionArticles = articles
    .filter(a => (a.category === 'Opinion' || a.tags.includes('Opinion') || a.tags.includes('Macroeconomics')) && a.status === 'published')
    .slice(0, 3);

  if (opinionArticles.length === 0) return null;

  return (
    <section className="w-full max-w-7xl mx-auto px-4 sm:px-8 py-8">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-4 border-b border-slate-800 mb-6">
        <div>
          <div className="flex items-center gap-2 text-amber-400 font-brand text-xs uppercase tracking-widest font-bold">
            <Feather className="w-4 h-4" />
            <span>Perspectives & Commentary</span>
          </div>
          <h2 className="font-editorial text-2xl sm:text-3xl font-bold text-slate-100 mt-1">
            Opinion & Thought Leadership
          </h2>
          <p className="text-slate-400 text-xs sm:text-sm mt-0.5">
            Rigorous economic debates, policy critiques, and strategic commentary from leading Horn of Africa scholars.
          </p>
        </div>

        <div className="text-xs text-slate-500 font-mono">
          Weekly Editorial Column
        </div>
      </div>

      {/* Grid of Columns */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {opinionArticles.map((article: Article) => (
          <article
            key={`opinion-${article.id}`}
            onClick={() => openArticle(article)}
            className="group cursor-pointer rounded-2xl bg-gradient-to-b from-slate-900 via-slate-900/90 to-slate-950 border border-slate-800 hover:border-slate-700 p-6 flex flex-col justify-between shadow-lg transition-all duration-300 relative overflow-hidden"
          >
            {/* Top Columnist Avatar & Bylines */}
            <div>
              <div className="flex items-center gap-3.5 pb-4 border-b border-slate-800/80">
                <div className="relative">
                  <img 
                    src={article.author.avatar} 
                    alt={article.author.name}
                    className="w-12 h-12 rounded-full object-cover border-2 border-amber-500/40 group-hover:border-amber-400 transition-colors"
                    referrerPolicy="no-referrer"
                  />
                  <span className="absolute -bottom-1 -right-1 p-0.5 rounded-full bg-slate-950 text-amber-400">
                    <Feather className="w-3 h-3" />
                  </span>
                </div>

                <div>
                  <h4 className="font-bold text-slate-200 text-sm group-hover:text-amber-300 transition-colors">
                    {article.author.name}
                  </h4>
                  <p className="text-[11px] text-slate-400 font-medium">
                    {article.author.role}
                  </p>
                </div>
              </div>

              {/* Headline */}
              <h3 className="font-editorial text-lg sm:text-xl font-bold text-slate-100 group-hover:text-blue-400 transition-colors mt-4 leading-snug">
                {article.title}
              </h3>

              {/* Subtitle / Excerpt */}
              <p className="font-sans text-xs sm:text-sm text-slate-400 leading-relaxed mt-2.5 line-clamp-3">
                {article.subtitle || article.excerpt}
              </p>

              {/* Pull quote callout if available */}
              {article.pullQuote && (
                <div className="mt-4 p-3 rounded-xl bg-slate-950/80 border-l-2 border-amber-500 text-xs text-slate-300 italic font-editorial">
                  "{article.pullQuote.quote.slice(0, 100)}..."
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="mt-6 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-500">
              <span className="flex items-center gap-1.5 text-slate-400">
                <BookOpen className="w-3.5 h-3.5 text-blue-400" />
                {article.readTime}
              </span>
              <span className="text-blue-400 font-semibold group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                <span>Read Essay</span>
                <ArrowRight className="w-3 h-3" />
              </span>
            </div>

          </article>
        ))}
      </div>

    </section>
  );
};
