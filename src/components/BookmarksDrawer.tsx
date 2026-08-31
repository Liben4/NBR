import React from 'react';
import { X, Bookmark, Trash2, ArrowRight, Clock } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Article } from '../types';

export const BookmarksDrawer: React.FC = () => {
  const { 
    isBookmarksOpen, 
    setIsBookmarksOpen, 
    bookmarkedIds, 
    toggleBookmark, 
    articles, 
    openArticle 
  } = useApp();

  if (!isBookmarksOpen) return null;

  const savedArticles = articles.filter(a => bookmarkedIds.includes(a.id));

  const handleOpen = (article: Article) => {
    openArticle(article);
    setIsBookmarksOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-slate-950/80 backdrop-blur-sm animate-fadeIn">
      <div 
        className="w-full max-w-md bg-slate-900 border-l border-slate-800 h-full p-5 sm:p-6 shadow-2xl flex flex-col justify-between overflow-hidden animate-slideLeft"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Top Header */}
        <div>
          <div className="flex items-center justify-between pb-4 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <Bookmark className="w-5 h-5 text-blue-400" />
              <h3 className="font-editorial text-xl font-bold text-slate-100">
                Saved Executive Briefings
              </h3>
            </div>
            <button
              onClick={() => setIsBookmarksOpen(false)}
              className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <p className="text-xs text-slate-400 mt-2">
            Your private reading list. Persisted securely in your browser cache.
          </p>
        </div>

        {/* List of Bookmarked Articles */}
        <div className="flex-1 overflow-y-auto py-4 space-y-3">
          {savedArticles.length === 0 ? (
            <div className="text-center py-16 text-slate-500">
              <Bookmark className="w-10 h-10 mx-auto text-slate-600 mb-2 opacity-50" />
              <p className="text-sm font-semibold text-slate-400">No saved briefings yet</p>
              <p className="text-xs text-slate-500 mt-1 max-w-xs mx-auto">
                Click the bookmark icon on any article card to add it to your reading list.
              </p>
            </div>
          ) : (
            savedArticles.map((article: Article) => (
              <div
                key={`saved-${article.id}`}
                className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 hover:border-slate-700 transition-all flex flex-col justify-between gap-3 group"
              >
                <div 
                  onClick={() => handleOpen(article)}
                  className="cursor-pointer"
                >
                  <span className="text-[10px] font-bold uppercase tracking-wider text-blue-400">
                    {article.category}
                  </span>
                  <h4 className="font-editorial text-sm font-semibold text-slate-200 group-hover:text-amber-300 transition-colors line-clamp-2 mt-1 leading-snug">
                    {article.title}
                  </h4>
                  <div className="flex items-center gap-2 text-[11px] text-slate-500 mt-2">
                    <span>{article.author.name}</span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3 text-slate-500" />
                      {article.readTime}
                    </span>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-900 flex items-center justify-between text-xs">
                  <button
                    onClick={() => toggleBookmark(article.id)}
                    className="text-rose-400/80 hover:text-rose-400 inline-flex items-center gap-1 text-[11px] transition-colors"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Remove</span>
                  </button>

                  <button
                    onClick={() => handleOpen(article)}
                    className="text-blue-400 hover:text-blue-300 font-semibold inline-flex items-center gap-1 text-[11px]"
                  >
                    <span>Read Now</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-xs text-slate-500">
          <span>{savedArticles.length} Article{savedArticles.length === 1 ? '' : 's'} Stored</span>
          <button
            onClick={() => setIsBookmarksOpen(false)}
            className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
};
