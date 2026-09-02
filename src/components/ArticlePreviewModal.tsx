import React, { useState } from 'react';
import { 
  X, 
  Monitor, 
  Tablet, 
  Smartphone, 
  Calendar, 
  Clock, 
  Share2, 
  Bookmark, 
  ExternalLink, 
  CheckCircle, 
  Eye, 
  Quote, 
  FileText, 
  Sparkles, 
  ArrowRight,
  Send
} from 'lucide-react';
import { Article } from '../types';

interface ArticlePreviewModalProps {
  article: Partial<Article>;
  isOpen: boolean;
  onClose: () => void;
  onPublishNow?: () => void;
  onSaveDraft?: () => void;
}

export const ArticlePreviewModal: React.FC<ArticlePreviewModalProps> = ({
  article,
  isOpen,
  onClose,
  onPublishNow,
  onSaveDraft
}) => {
  const [deviceMode, setDeviceMode] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');

  if (!isOpen) return null;

  const title = article.title || 'Untitled Article Headline';
  const subtitle = article.subtitle || article.excerpt || 'Article summary and executive subtitle overview.';
  const category = article.category || 'Business';
  const authorName = article.author?.name || 'Editorial Staff';
  const authorRole = article.author?.role || 'Senior Markets Correspondent';
  const authorAvatar = article.author?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80';
  const featuredImage = article.featuredImage || 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&auto=format&fit=crop&q=80';
  const imageCaption = article.imageCaption || 'Photograph archive representation for Negarit Business Review.';
  const imageCredit = article.featuredImageCredit || 'Negarit Editorial Archive';
  const readTime = article.readTime || '4 min read';
  const tags = article.tags && article.tags.length > 0 ? article.tags : ['Ethiopia', 'Markets', 'Capital'];
  const sourceRef = article.sourceReference || 'National Bank of Ethiopia & Ministry of Finance Official Disclosures';
  const keyTakeaways = article.keyTakeaways && article.keyTakeaways.length > 0 
    ? article.keyTakeaways 
    : [
        'Strategic macro adjustment with high-yield investor implications.',
        'Immediate liquidity effects across interbank banking corridors.',
        'Regulatory compliance window set for upcoming fiscal quarters.'
      ];
  const paragraphs = article.content && article.content.length > 0
    ? article.content
    : [
        'This represents the live preview of the article content. The full investigative reporting will appear here exactly as formatted by the editorial team.',
        'All typographic scales, line heights, pull quotes, and visual metadata are calculated for maximum executive readability across devices.'
      ];

  const containerWidthClass = {
    desktop: 'max-w-4xl',
    tablet: 'max-w-2xl',
    mobile: 'max-w-sm'
  }[deviceMode];

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-slate-950/80 backdrop-blur-md overflow-hidden animate-fadeIn">
      {/* Top Floating Control Bar */}
      <header className="w-full bg-slate-900 border-b border-slate-800 px-4 sm:px-6 py-3 flex items-center justify-between shadow-xl shrink-0">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 bg-slate-800/80 p-1 rounded-xl border border-slate-700">
            <button
              onClick={() => setDeviceMode('desktop')}
              className={`p-2 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-all ${
                deviceMode === 'desktop' ? 'bg-blue-600 text-white shadow' : 'text-slate-400 hover:text-white'
              }`}
              title="Desktop View"
            >
              <Monitor className="w-4 h-4" />
              <span className="hidden sm:inline">Desktop</span>
            </button>
            <button
              onClick={() => setDeviceMode('tablet')}
              className={`p-2 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-all ${
                deviceMode === 'tablet' ? 'bg-blue-600 text-white shadow' : 'text-slate-400 hover:text-white'
              }`}
              title="Tablet View"
            >
              <Tablet className="w-4 h-4" />
              <span className="hidden sm:inline">Tablet</span>
            </button>
            <button
              onClick={() => setDeviceMode('mobile')}
              className={`p-2 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-all ${
                deviceMode === 'mobile' ? 'bg-blue-600 text-white shadow' : 'text-slate-400 hover:text-white'
              }`}
              title="Mobile View"
            >
              <Smartphone className="w-4 h-4" />
              <span className="hidden sm:inline">Mobile</span>
            </button>
          </div>

          <div className="hidden md:flex items-center gap-2">
            <span className="px-2.5 py-1 rounded-md text-[11px] font-bold uppercase tracking-wider bg-amber-400/20 text-amber-400 border border-amber-400/30 flex items-center gap-1">
              <Eye className="w-3.5 h-3.5" />
              Live Editorial Preview
            </span>
            {article.status && (
              <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                article.status === 'published' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' :
                article.status === 'scheduled' ? 'bg-purple-500/20 text-purple-400 border border-purple-500/30' :
                'bg-slate-700 text-slate-300'
              }`}>
                {article.status}
              </span>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          {onSaveDraft && (
            <button
              onClick={() => {
                onSaveDraft();
                onClose();
              }}
              className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-medium border border-slate-700 transition-colors"
            >
              Save as Draft
            </button>
          )}

          {onPublishNow && (
            <button
              onClick={() => {
                onPublishNow();
                onClose();
              }}
              className="px-4 py-1.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs font-bold shadow-md flex items-center gap-1.5 transition-all"
            >
              <CheckCircle className="w-3.5 h-3.5" />
              <span>Publish Live</span>
            </button>
          )}

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-800 hover:bg-rose-500/20 text-slate-400 hover:text-rose-400 border border-slate-700 transition-colors"
            title="Close preview"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </header>

      {/* Scrollable Viewport Stage */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-8 flex justify-center items-start bg-slate-950/60">
        <div className={`w-full ${containerWidthClass} bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl overflow-hidden transition-all duration-300 my-4`}>
          
          {/* Article Header */}
          <div className="p-6 sm:p-10 border-b border-slate-100 dark:border-slate-800">
            {/* Category & Badges */}
            <div className="flex flex-wrap items-center gap-2 mb-4">
              <span className="px-3 py-1 rounded-full bg-blue-600 text-white text-xs font-bold uppercase tracking-wider">
                {category}
              </span>
              {article.isHeroFeatured && (
                <span className="px-2.5 py-0.5 rounded-full bg-amber-400 text-slate-950 text-[10px] font-extrabold uppercase">
                  Lead Story Slot
                </span>
              )}
              {article.isEditorPick && (
                <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-700 dark:text-amber-400 border border-amber-500/40 text-[10px] font-bold uppercase">
                  Editor's Pick
                </span>
              )}
            </div>

            {/* Headline */}
            <h1 className="font-editorial text-2xl sm:text-4xl md:text-5xl font-bold tracking-tight text-slate-900 dark:text-slate-100 leading-tight">
              {title}
            </h1>

            {/* Subtitle */}
            <p className="font-sans text-base sm:text-lg text-slate-600 dark:text-slate-300 mt-4 leading-relaxed font-normal">
              {subtitle}
            </p>

            {/* Author Meta */}
            <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-800 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <img
                  src={authorAvatar}
                  alt={authorName}
                  className="w-11 h-11 rounded-full object-cover border border-slate-300 dark:border-slate-700"
                  referrerPolicy="no-referrer"
                />
                <div>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-slate-100">
                    {authorName}
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    {authorRole}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4 text-xs text-slate-500 dark:text-slate-400">
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-blue-600" />
                  {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-blue-600" />
                  {readTime}
                </span>
              </div>
            </div>
          </div>

          {/* Featured Hero Visual */}
          <div className="w-full relative bg-slate-100 dark:bg-slate-800">
            <img
              src={featuredImage}
              alt={title}
              className="w-full max-h-[500px] object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="p-3 bg-slate-50 dark:bg-slate-950/80 border-b border-slate-200 dark:border-slate-800 text-xs text-slate-500 dark:text-slate-400 flex flex-col sm:flex-row sm:items-center justify-between gap-1">
              <span>{imageCaption}</span>
              <span className="text-[11px] text-slate-400 dark:text-slate-500">Credit: {imageCredit}</span>
            </div>
          </div>

          {/* Key Takeaways Callout */}
          <div className="p-6 sm:p-10">
            <div className="p-5 sm:p-6 rounded-2xl bg-blue-50/70 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900/60 mb-8">
              <div className="flex items-center gap-2 text-blue-700 dark:text-blue-400 font-brand font-bold text-xs uppercase tracking-wider mb-3">
                <Sparkles className="w-4 h-4" />
                <span>Executive Key Takeaways</span>
              </div>
              <ul className="space-y-2">
                {keyTakeaways.map((point, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-2 shrink-0" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Article Body Paragraphs */}
            <div className="space-y-6 text-slate-800 dark:text-slate-200 font-sans text-base leading-relaxed">
              {paragraphs.map((para, idx) => (
                <React.Fragment key={idx}>
                  <p className="first-of-type:font-editorial first-of-type:text-lg first-of-type:leading-relaxed">
                    {para}
                  </p>

                  {/* Pull Quote placement after 2nd paragraph */}
                  {idx === 1 && article.pullQuote?.quote && (
                    <blockquote className="my-8 p-6 rounded-2xl bg-amber-50/70 dark:bg-amber-500/10 border-l-4 border-amber-500 text-slate-900 dark:text-slate-100">
                      <Quote className="w-8 h-8 text-amber-500/40 mb-2" />
                      <p className="font-editorial text-xl sm:text-2xl font-bold italic leading-snug">
                        "{article.pullQuote.quote}"
                      </p>
                      <cite className="block text-xs font-bold uppercase tracking-wider text-amber-700 dark:text-amber-400 mt-3 not-italic">
                        — {article.pullQuote.speaker} {article.pullQuote.role && `, ${article.pullQuote.role}`}
                      </cite>
                    </blockquote>
                  )}
                </React.Fragment>
              ))}
            </div>

            {/* Source Reference Attribution */}
            {sourceRef && (
              <div className="mt-8 p-4 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-400 flex items-center gap-2">
                <FileText className="w-4 h-4 text-blue-600 shrink-0" />
                <span><strong>Editorial Source:</strong> {sourceRef}</span>
              </div>
            )}

            {/* Tags */}
            <div className="mt-8 pt-6 border-t border-slate-200 dark:border-slate-800 flex flex-wrap items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mr-2">
                Tags:
              </span>
              {tags.map((tag, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-medium"
                >
                  #{tag}
                </span>
              ))}
            </div>

          </div>

        </div>
      </div>
    </div>
  );
};
