import React, { useState, useEffect } from 'react';
import { 
  Clock, 
  Bookmark, 
  Share2, 
  ArrowLeft, 
  Volume2, 
  VolumeX, 
  Play, 
  Pause, 
  ThumbsUp, 
  MessageSquare, 
  Sparkles, 
  Check, 
  Copy, 
  Printer, 
  Send,
  Trash2,
  Quote,
  Flame,
  TrendingUp,
  Mail,
  ChevronRight,
  ExternalLink,
  Type
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Article } from '../types';

export const ArticleView: React.FC = () => {
  const { 
    selectedArticle, 
    setCurrentView, 
    openArticle, 
    articles, 
    isBookmarked, 
    toggleBookmark,
    comments,
    addComment,
    likeComment,
    currencies,
    addSubscriber,
    setSelectedCategory,
    showToast
  } = useApp();

  // Typography scaling
  const [fontSize, setFontSize] = useState<'normal' | 'large' | 'xlarge'>('normal');

  // Reading progress state (0 to 100)
  const [scrollProgress, setScrollProgress] = useState(0);

  // Audio simulation player state
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [audioProgress, setAudioProgress] = useState(0);

  // New comment input
  const [commentName, setCommentName] = useState('');
  const [commentEmail, setCommentEmail] = useState('');
  const [commentRole, setCommentRole] = useState('');
  const [commentText, setCommentText] = useState('');

  // Newsletter inline signup in sidebar
  const [sidebarEmail, setSidebarEmail] = useState('');
  const [isSidebarSubscribed, setIsSidebarSubscribed] = useState(false);

  // Scroll to top on mount and attach scroll progress listener
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollTop;
      const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      if (windowHeight > 0) {
        const scroll = (totalScroll / windowHeight) * 100;
        setScrollProgress(Math.min(100, Math.max(0, Number(scroll.toFixed(1)))));
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [selectedArticle?.id]);

  // Audio simulator timer
  useEffect(() => {
    let interval: any;
    if (isPlayingAudio) {
      interval = setInterval(() => {
        setAudioProgress(prev => {
          if (prev >= 100) {
            setIsPlayingAudio(false);
            return 0;
          }
          return prev + 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlayingAudio]);

  if (!selectedArticle) {
    return (
      <div className="max-w-4xl mx-auto py-24 px-4 text-center">
        <h2 className="font-editorial text-3xl font-bold text-slate-800 dark:text-slate-200">No article selected</h2>
        <p className="text-sm text-slate-500 mt-2">Please select an article from the home edition or search catalog.</p>
        <button 
          onClick={() => {
            setCurrentView('home');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="mt-6 inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-semibold shadow-md transition-all active:scale-95"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return to Front Page</span>
        </button>
      </div>
    );
  }

  // Related articles in same category
  const relatedArticles = articles
    .filter(a => a.id !== selectedArticle.id && a.category === selectedArticle.category && a.status === 'published')
    .slice(0, 3);

  // Top Most Read articles for sidebar
  const mostReadArticles = [...articles]
    .filter(a => a.status === 'published')
    .sort((a, b) => b.views - a.views)
    .slice(0, 5);

  // More briefs in this category for sidebar
  const categoryArticles = articles
    .filter(a => a.id !== selectedArticle.id && a.category === selectedArticle.category && a.status === 'published')
    .slice(0, 4);

  // Article comments (display only approved comments to general audience)
  const articleComments = comments.filter(
    c => c.articleId === selectedArticle.id && (c.status === 'approved' || !c.status)
  );

  // USD Rate for quick market pill
  const usdRate = currencies.find(c => c.code === 'USD');

  // Handle native Web Share or fallback to social URLs / clipboard
  const handleShare = (platform: 'native' | 'copy' | 'twitter' | 'linkedin' | 'facebook' | 'telegram' | 'whatsapp') => {
    const url = window.location.href;
    const title = selectedArticle.title;
    const text = selectedArticle.subtitle || selectedArticle.excerpt;

    if (platform === 'native') {
      if (typeof navigator !== 'undefined' && navigator.share) {
        navigator.share({ title, text, url }).catch(() => {
          // Fallback to clipboard if share dialog is dismissed or unsupported
          if (navigator.clipboard) {
            navigator.clipboard.writeText(url);
            showToast('Article briefing link copied to clipboard');
          }
        });
        return;
      }
      // Fallback
      if (navigator.clipboard) {
        navigator.clipboard.writeText(url);
        showToast('Article briefing link copied to clipboard');
      }
      return;
    }

    if (platform === 'copy') {
      if (navigator.clipboard) {
        navigator.clipboard.writeText(url);
        showToast('Article briefing link copied to clipboard');
      }
    } else if (platform === 'twitter') {
      window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`, '_blank');
    } else if (platform === 'linkedin') {
      window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`, '_blank');
    } else if (platform === 'facebook') {
      window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank');
    } else if (platform === 'telegram') {
      window.open(`https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`, '_blank');
    } else if (platform === 'whatsapp') {
      window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(title + ' ' + url)}`, '_blank');
    }
  };

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentText.trim()) return;
    addComment(selectedArticle.id, commentName, commentText, commentRole, commentEmail);
    setCommentText('');
    setCommentName('');
    setCommentEmail('');
    setCommentRole('');
    showToast('Your contribution has been submitted for editorial moderation');
  };

  const handleSidebarNewsletter = (e: React.FormEvent) => {
    e.preventDefault();
    if (!sidebarEmail || !sidebarEmail.includes('@')) return;
    addSubscriber(sidebarEmail, [selectedArticle.category]);
    setIsSidebarSubscribed(true);
    setSidebarEmail('');
    showToast('Subscribed to Negarit Morning Executive Briefing');
  };

  // Font size classes
  const fontClass = fontSize === 'normal' 
    ? 'text-base sm:text-lg leading-relaxed sm:leading-8' 
    : fontSize === 'large' 
    ? 'text-lg sm:text-xl leading-relaxed sm:leading-9' 
    : 'text-xl sm:text-2xl leading-relaxed sm:leading-10';

  const cycleFontSize = () => {
    if (fontSize === 'normal') setFontSize('large');
    else if (fontSize === 'large') setFontSize('xlarge');
    else setFontSize('normal');
  };

  const scrollToComments = () => {
    const el = document.getElementById('comments-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="w-full bg-slate-50/60 dark:bg-slate-950 text-slate-900 dark:text-slate-100 min-h-screen transition-colors duration-200 pb-24 lg:pb-16">
      
      {/* 1. TOP STICKY READING PROGRESS BAR (Works identically on both Laptop & Mobile) */}
      <div className="fixed top-0 left-0 w-full h-1 bg-slate-200/80 dark:bg-slate-900/80 z-50">
        <div 
          className="h-full bg-gradient-to-r from-blue-600 via-amber-500 to-blue-600 transition-all duration-150"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* 2. MAIN ADAPTIVE CONTAINER (Laptop: 12-col grid with Intelligence Sidebar; Mobile: streamlined full width) */}
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8">
        
        {/* Top Breadcrumbs & Back Navigation */}
        <div className="flex items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800/80 mb-6">
          <div className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-400 min-w-0">
            <button
              onClick={() => {
                setCurrentView('home');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="inline-flex items-center gap-1.5 font-bold text-slate-900 dark:text-slate-200 hover:text-blue-600 dark:hover:text-blue-400 transition-colors shrink-0"
              title="Return to front page edition"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Edition Front</span>
            </button>

            <span className="text-slate-300 dark:text-slate-700 font-bold shrink-0">/</span>

            <button
              onClick={() => {
                setSelectedCategory(selectedArticle.category);
                setCurrentView('category');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-medium shrink-0"
            >
              {selectedArticle.category}
            </button>

            <span className="hidden sm:inline text-slate-300 dark:text-slate-700 font-bold shrink-0">/</span>

            <span className="hidden sm:inline text-slate-500 dark:text-slate-500 truncate max-w-[280px]">
              {selectedArticle.title}
            </span>
          </div>

          {/* Desktop Top Quick Actions (Hidden on tiny screens to avoid duplication with mobile dock) */}
          <div className="hidden sm:flex items-center gap-2 shrink-0">
            {/* Font size adjuster */}
            <div className="flex items-center bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-0.5 text-xs text-slate-600 dark:text-slate-400 shadow-2xs">
              <button 
                onClick={() => setFontSize('normal')}
                className={`px-2 py-1 rounded-lg transition-colors ${fontSize === 'normal' ? 'bg-slate-100 dark:bg-slate-800 text-blue-600 dark:text-white font-bold' : 'hover:text-slate-900 dark:hover:text-white'}`}
                title="Default text size"
              >
                A
              </button>
              <button 
                onClick={() => setFontSize('large')}
                className={`px-2 py-1 rounded-lg text-sm transition-colors ${fontSize === 'large' ? 'bg-slate-100 dark:bg-slate-800 text-blue-600 dark:text-white font-bold' : 'hover:text-slate-900 dark:hover:text-white'}`}
                title="Large text size"
              >
                A+
              </button>
              <button 
                onClick={() => setFontSize('xlarge')}
                className={`px-2 py-1 rounded-lg text-base transition-colors ${fontSize === 'xlarge' ? 'bg-slate-100 dark:bg-slate-800 text-blue-600 dark:text-white font-bold' : 'hover:text-slate-900 dark:hover:text-white'}`}
                title="Extra large text size"
              >
                A++
              </button>
            </div>

            {/* Bookmark */}
            <button
              onClick={() => toggleBookmark(selectedArticle.id)}
              className={`p-2 rounded-xl border transition-colors shadow-2xs ${
                isBookmarked(selectedArticle.id)
                  ? 'bg-blue-600 text-white border-blue-500'
                  : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white border-slate-200 dark:border-slate-800'
              }`}
              title={isBookmarked(selectedArticle.id) ? "Saved in private reading list" : "Save article for later"}
            >
              <Bookmark className="w-4 h-4" />
            </button>

            {/* Share Trigger */}
            <button
              onClick={() => handleShare('native')}
              className="p-2 rounded-xl bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-slate-800 transition-colors shadow-2xs"
              title="Share article briefing"
            >
              <Share2 className="w-4 h-4" />
            </button>

            {/* Print / PDF */}
            <button
              onClick={() => window.print()}
              className="p-2 rounded-xl bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-slate-800 transition-colors shadow-2xs"
              title="Print or Save PDF"
            >
              <Printer className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* 3. DUAL-COLUMN GRID: Left (Main Story 8 Cols) + Right (Editorial Sidebar 4 Cols) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          
          {/* ========================================================= */}
          {/* MAIN ARTICLE COLUMN (8 Cols on Laptop, 100% on Mobile)     */}
          {/* ========================================================= */}
          <article className="lg:col-span-8 flex flex-col">
            
            {/* Category Pill & Lead Badge */}
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <span className="px-3 py-1 rounded-md bg-blue-50 dark:bg-blue-600/20 text-blue-700 dark:text-blue-400 border border-blue-200 dark:border-blue-500/30 text-xs font-bold uppercase tracking-wider">
                {selectedArticle.category}
              </span>
              {selectedArticle.isEditorPick && (
                <span className="px-2.5 py-0.5 rounded-md bg-amber-50 dark:bg-amber-500/20 text-amber-700 dark:text-amber-400 border border-amber-200 dark:border-amber-500/30 text-[11px] font-extrabold uppercase tracking-wider flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-amber-500" />
                  Editor's Choice
                </span>
              )}
              {selectedArticle.isHeroFeatured && (
                <span className="px-2.5 py-0.5 rounded-md bg-emerald-50 dark:bg-emerald-500/20 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-500/30 text-[11px] font-extrabold uppercase tracking-wider flex items-center gap-1">
                  <TrendingUp className="w-3 h-3 text-emerald-500" />
                  Lead Story
                </span>
              )}
            </div>

            {/* Headline */}
            <h1 className="font-editorial text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 dark:text-slate-100 leading-[1.18] tracking-tight">
              {selectedArticle.title}
            </h1>

            {/* Subtitle / Executive Deck */}
            {selectedArticle.subtitle && (
              <p className="font-editorial text-base sm:text-lg md:text-xl text-slate-600 dark:text-slate-300 italic leading-relaxed mt-3.5">
                {selectedArticle.subtitle}
              </p>
            )}

            {/* Byline & Metadata (Cleanly wrapped on mobile without broken dividers) */}
            <div className="my-6 py-4 border-y border-slate-200 dark:border-slate-800/80 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <img 
                  src={selectedArticle.author.avatar} 
                  alt={selectedArticle.author.name}
                  className="w-11 h-11 sm:w-12 sm:h-12 rounded-full object-cover border-2 border-slate-200 dark:border-slate-700 shadow-sm shrink-0"
                  referrerPolicy="no-referrer"
                />
                <div>
                  <span className="font-bold text-sm text-slate-900 dark:text-slate-100 block">
                    {selectedArticle.author.name}
                  </span>
                  <p className="text-xs text-slate-600 dark:text-slate-400">
                    {selectedArticle.author.role}
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-xs text-slate-500 dark:text-slate-400">
                <div className="flex items-center gap-1.5">
                  <span className="text-slate-400 dark:text-slate-500">Published:</span>
                  <span className="font-semibold text-slate-800 dark:text-slate-200">
                    {new Date(selectedArticle.publishedAt).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric'
                    })}
                  </span>
                </div>
                <span className="text-slate-300 dark:text-slate-700">•</span>
                <div className="flex items-center gap-1 font-semibold text-slate-800 dark:text-slate-200">
                  <Clock className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                  <span>{selectedArticle.readTime}</span>
                </div>
              </div>
            </div>

            {/* Audio Listen Bar (Narration Edition) */}
            <div className="p-3.5 sm:p-4 rounded-2xl bg-gradient-to-r from-blue-50/80 via-indigo-50/40 to-blue-50/80 dark:from-slate-900 dark:via-blue-950/40 dark:to-slate-900 border border-blue-200/80 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3 mb-8 shadow-xs">
              <div className="flex items-center gap-3 w-full sm:w-auto">
                <button
                  onClick={() => setIsPlayingAudio(!isPlayingAudio)}
                  className="w-10 h-10 rounded-full bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center shrink-0 shadow-md transition-transform active:scale-95"
                  title={isPlayingAudio ? "Pause audio narration" : "Listen to article audio"}
                >
                  {isPlayingAudio ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
                </button>
                <div>
                  <p className="text-xs font-bold text-slate-900 dark:text-slate-200 flex items-center gap-1.5">
                    <Volume2 className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
                    <span>Listen to this Briefing (Audio Edition)</span>
                  </p>
                  <p className="text-[11px] text-slate-600 dark:text-slate-400">
                    Narrated by Negarit Voice Engine • Duration: {selectedArticle.audioDuration || '4:45'}
                  </p>
                </div>
              </div>

              {/* Responsive Scrubber */}
              <div className="w-full sm:w-56 flex items-center gap-2">
                <div className="flex-1 bg-slate-200 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                  <div 
                    className="bg-blue-600 h-full transition-all duration-300"
                    style={{ width: `${audioProgress}%` }}
                  />
                </div>
                <span className="text-[10px] font-mono font-medium text-slate-600 dark:text-slate-400 shrink-0">
                  {isPlayingAudio ? `${audioProgress}%` : (selectedArticle.audioDuration || '0:00')}
                </span>
              </div>
            </div>

            {/* Featured Image */}
            <div className="mb-8 rounded-2xl overflow-hidden bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-md dark:shadow-xl">
              <img 
                src={selectedArticle.featuredImage} 
                alt={selectedArticle.title}
                className="w-full h-auto max-h-[520px] object-cover object-center"
                referrerPolicy="no-referrer"
              />
              {selectedArticle.imageCaption && (
                <p className="p-3 text-xs text-slate-600 dark:text-slate-400 bg-slate-100/80 dark:bg-slate-900/90 border-t border-slate-200 dark:border-slate-800/80 italic">
                  {selectedArticle.imageCaption}
                </p>
              )}
            </div>

            {/* Key Takeaways Callout Box */}
            {selectedArticle.keyTakeaways && selectedArticle.keyTakeaways.length > 0 && (
              <div className="my-8 p-5 sm:p-6 rounded-2xl bg-gradient-to-br from-blue-50/90 via-white to-amber-50/40 dark:from-blue-950/40 dark:via-slate-900 dark:to-slate-950 border-2 border-blue-200 dark:border-blue-500/30 shadow-sm dark:shadow-xl">
                <div className="flex items-center gap-2 mb-3.5">
                  <Sparkles className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                  <h3 className="font-brand text-xs font-bold uppercase tracking-widest text-blue-700 dark:text-blue-300">
                    Negarit Executive Key Takeaways
                  </h3>
                </div>
                <ul className="space-y-2.5">
                  {selectedArticle.keyTakeaways.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-800 dark:text-slate-200">
                      <span className="w-5 h-5 rounded-full bg-blue-100 dark:bg-blue-600/30 text-blue-700 dark:text-blue-400 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                        {idx + 1}
                      </span>
                      <span className="leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Article Content Paragraphs & Pull Quotes */}
            <div className={`font-sans text-slate-800 dark:text-slate-200 space-y-6 ${fontClass}`}>
              {selectedArticle.content.map((paragraph, idx) => (
                <React.Fragment key={idx}>
                  <p className="font-sans leading-relaxed text-slate-800 dark:text-slate-200">
                    {idx === 0 && (
                      <span className="float-left text-4xl sm:text-5xl font-editorial font-bold text-blue-600 dark:text-blue-400 pr-2.5 pt-0.5 leading-none">
                        {paragraph.charAt(0)}
                      </span>
                    )}
                    {idx === 0 ? paragraph.slice(1) : paragraph}
                  </p>

                  {/* Inject Pull Quote after 2nd paragraph */}
                  {idx === 1 && selectedArticle.pullQuote && (
                    <figure className="my-8 p-6 sm:p-8 rounded-2xl bg-amber-50/60 dark:bg-slate-900/90 border-l-4 border-amber-500 shadow-sm">
                      <Quote className="w-8 h-8 text-amber-500/50 mb-2" />
                      <blockquote className="font-editorial text-xl sm:text-2xl font-semibold text-slate-900 dark:text-slate-100 italic leading-snug">
                        "{selectedArticle.pullQuote.quote}"
                      </blockquote>
                      <figcaption className="mt-3 text-xs sm:text-sm font-sans text-slate-600 dark:text-slate-400 font-medium">
                        — <span className="text-slate-900 dark:text-slate-200 font-semibold">{selectedArticle.pullQuote.speaker}</span>
                        {selectedArticle.pullQuote.role && `, ${selectedArticle.pullQuote.role}`}
                      </figcaption>
                    </figure>
                  )}
                </React.Fragment>
              ))}
            </div>

            {/* Tags & Topic Exploration */}
            <div className="mt-10 pt-6 border-t border-slate-200 dark:border-slate-800 space-y-6">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs font-semibold text-slate-600 dark:text-slate-400 mr-1">Topics:</span>
                {selectedArticle.tags.map(tag => (
                  <span 
                    key={tag}
                    className="px-3 py-1 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs text-slate-700 dark:text-slate-300 hover:border-blue-400 transition-colors shadow-2xs"
                  >
                    #{tag}
                  </span>
                ))}
              </div>

              {/* Social Share Bar */}
              <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-4 shadow-sm">
                <div className="flex items-center gap-2">
                  <Share2 className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-800 dark:text-slate-200">
                    Share this intelligence briefing
                  </span>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  <button
                    onClick={() => handleShare('linkedin')}
                    className="px-2.5 py-1.5 rounded-lg bg-[#0A66C2]/10 hover:bg-[#0A66C2] text-[#0A66C2] hover:text-white text-xs font-semibold transition-colors flex items-center gap-1.5"
                    title="Share on LinkedIn"
                  >
                    <span>LinkedIn</span>
                  </button>
                  <button
                    onClick={() => handleShare('twitter')}
                    className="px-2.5 py-1.5 rounded-lg bg-slate-100 hover:bg-black dark:bg-slate-800 dark:hover:bg-black text-slate-800 hover:text-white dark:text-slate-200 text-xs font-semibold transition-colors flex items-center gap-1.5"
                    title="Share on X"
                  >
                    <span>X</span>
                  </button>
                  <button
                    onClick={() => handleShare('telegram')}
                    className="px-2.5 py-1.5 rounded-lg bg-[#229ED9]/10 hover:bg-[#229ED9] text-[#229ED9] hover:text-white text-xs font-semibold transition-colors flex items-center gap-1.5"
                    title="Share on Telegram"
                  >
                    <span>Telegram</span>
                  </button>
                  <button
                    onClick={() => handleShare('whatsapp')}
                    className="px-2.5 py-1.5 rounded-lg bg-[#25D366]/10 hover:bg-[#25D366] text-[#25D366] hover:text-white text-xs font-semibold transition-colors flex items-center gap-1.5"
                    title="Share on WhatsApp"
                  >
                    <span>WhatsApp</span>
                  </button>
                  <button
                    onClick={() => handleShare('copy')}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-xs transition-colors"
                  >
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy Link</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Author Biography Card */}
            <div className="my-10 p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row gap-5 items-center sm:items-start shadow-sm">
              <img 
                src={selectedArticle.author.avatar} 
                alt={selectedArticle.author.name}
                className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover border-2 border-slate-200 dark:border-slate-700 shrink-0"
                referrerPolicy="no-referrer"
              />
              <div>
                <div>
                  <h4 className="font-editorial text-lg font-bold text-slate-900 dark:text-slate-100">
                    {selectedArticle.author.name}
                  </h4>
                  <p className="text-xs font-semibold text-blue-600 dark:text-blue-400">
                    {selectedArticle.author.role}
                  </p>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mt-2">
                  {selectedArticle.author.bio || 'Senior correspondent at Negarit Business Review specializing in macro analysis, monetary policy, and East African enterprise.'}
                </p>
              </div>
            </div>

            {/* Interactive Comment Section */}
            <section id="comments-section" className="my-10 pt-8 border-t border-slate-200 dark:border-slate-800">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                  <MessageSquare className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                  <h3 className="font-editorial text-2xl font-bold text-slate-900 dark:text-slate-100">
                    Executive Discussion ({articleComments.length})
                  </h3>
                </div>
                <span className="text-xs text-slate-500 font-medium">Moderated Editorial Desk</span>
              </div>

              {/* Comment Form */}
              <form onSubmit={handleCommentSubmit} className="mb-8 p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3 shadow-sm">
                <h4 className="font-brand text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                  Contribute an Analysis
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <input 
                    type="text"
                    required
                    placeholder="Your Full Name *"
                    value={commentName}
                    onChange={(e) => setCommentName(e.target.value)}
                    className="px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100 text-xs focus:outline-none focus:border-blue-500"
                  />
                  <input 
                    type="email"
                    placeholder="Corporate Email (confidential)"
                    value={commentEmail}
                    onChange={(e) => setCommentEmail(e.target.value)}
                    className="px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100 text-xs focus:outline-none focus:border-blue-500"
                  />
                  <input 
                    type="text"
                    placeholder="Title / Institution"
                    value={commentRole}
                    onChange={(e) => setCommentRole(e.target.value)}
                    className="px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100 text-xs focus:outline-none focus:border-blue-500"
                  />
                </div>
                <textarea
                  required
                  rows={3}
                  placeholder="Share your perspective or strategic critique..."
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100 text-xs focus:outline-none focus:border-blue-500"
                />
                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold transition-colors shadow-xs"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Publish Contribution</span>
                  </button>
                </div>
              </form>

              {/* Comment List */}
              <div className="space-y-4">
                {articleComments.length === 0 ? (
                  <p className="text-xs text-slate-500 italic text-center py-6 bg-white dark:bg-slate-900/50 rounded-xl border border-slate-200/60 dark:border-slate-800/60">
                    Be the first executive to contribute a viewpoint on this briefing.
                  </p>
                ) : (
                  articleComments.map(c => (
                    <div 
                      key={c.id}
                      className="p-4 rounded-xl bg-white dark:bg-slate-900/70 border border-slate-200 dark:border-slate-800/80 space-y-2 shadow-2xs"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2.5">
                          <img 
                            src={c.avatar} 
                            alt={c.authorName}
                            className="w-7 h-7 rounded-full bg-slate-200 dark:bg-slate-800"
                          />
                          <div>
                            <span className="font-bold text-xs text-slate-900 dark:text-slate-200">{c.authorName}</span>
                            {c.authorRole && (
                              <span className="text-[10px] text-blue-600 dark:text-blue-400 font-medium ml-2">
                                • {c.authorRole}
                              </span>
                            )}
                          </div>
                        </div>

                        <span className="text-[10px] text-slate-500">{c.createdAt}</span>
                      </div>

                      <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed font-sans pl-9">
                        {c.content}
                      </p>

                      <div className="pl-9 pt-1 flex items-center justify-between text-xs">
                        <button
                          onClick={() => likeComment(c.id)}
                          className={`inline-flex items-center gap-1 text-[11px] font-medium transition-colors ${
                            c.isLiked ? 'text-blue-600 dark:text-blue-400 font-bold' : 'text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-slate-200'
                          }`}
                        >
                          <ThumbsUp className="w-3 h-3" />
                          <span>{c.likes} Likes</span>
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </section>

            {/* Related Analysis (In-line on mobile & bottom of main column) */}
            {relatedArticles.length > 0 && (
              <section className="my-10 pt-8 border-t border-slate-200 dark:border-slate-800">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-editorial text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-100">
                    More Analysis in {selectedArticle.category}
                  </h3>
                  <button
                    onClick={() => {
                      setSelectedCategory(selectedArticle.category);
                      setCurrentView('category');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="text-xs text-blue-600 dark:text-blue-400 font-semibold hover:underline flex items-center gap-1"
                  >
                    <span>View Section</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                  {relatedArticles.map(art => (
                    <div
                      key={art.id}
                      onClick={() => openArticle(art)}
                      className="group cursor-pointer rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 overflow-hidden flex flex-col justify-between shadow-2xs hover:shadow-sm transition-all"
                    >
                      <div className="aspect-video w-full overflow-hidden bg-slate-100 dark:bg-slate-800">
                        <img 
                          src={art.featuredImage} 
                          alt={art.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                      <div className="p-4 flex flex-col justify-between flex-grow">
                        <h4 className="font-editorial text-sm font-semibold text-slate-900 dark:text-slate-200 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2 leading-snug">
                          {art.title}
                        </h4>
                        <span className="text-[10px] text-slate-500 mt-2 block">
                          {art.readTime} • {art.author.name}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

          </article>

          {/* ========================================================= */}
          {/* EDITORIAL INTELLIGENCE SIDEBAR (Laptop 4 Cols Sticky)      */}
          {/* ========================================================= */}
          <aside className="hidden lg:block lg:col-span-4 sticky top-24 space-y-6">
            
            {/* 1. Article Utility Card */}
            <div className="p-5 rounded-2xl bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 shadow-sm">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800 mb-3.5">
                <span className="font-brand text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                  Reading Overview
                </span>
                <span className="text-[11px] font-mono font-medium text-blue-600 dark:text-blue-400">
                  {scrollProgress.toFixed(0)}% Read
                </span>
              </div>

              {/* Micro Stats */}
              <div className="grid grid-cols-2 gap-3 mb-4">
                <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/50">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">Length</span>
                  <span className="text-xs font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-1 mt-0.5">
                    <Clock className="w-3 h-3 text-blue-600" />
                    {selectedArticle.readTime}
                  </span>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/50">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">Section</span>
                  <span className="text-xs font-semibold text-slate-800 dark:text-slate-200 truncate block mt-0.5">
                    {selectedArticle.category}
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => toggleBookmark(selectedArticle.id)}
                  className={`flex-1 py-2 px-3 rounded-xl border text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors ${
                    isBookmarked(selectedArticle.id)
                      ? 'bg-blue-600 text-white border-blue-500'
                      : 'bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 border-slate-200 dark:border-slate-700'
                  }`}
                >
                  <Bookmark className="w-3.5 h-3.5" />
                  <span>{isBookmarked(selectedArticle.id) ? 'Saved' : 'Save Article'}</span>
                </button>

                <button
                  onClick={() => handleShare('copy')}
                  className="p-2 rounded-xl bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 transition-colors"
                  title="Copy share link"
                >
                  <Copy className="w-4 h-4" />
                </button>

                <button
                  onClick={() => window.print()}
                  className="p-2 rounded-xl bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 transition-colors"
                  title="Print this briefing"
                >
                  <Printer className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* 2. Most Read This Week (01-05) */}
            <div className="p-5 rounded-2xl bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 shadow-sm">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800 mb-3">
                <div className="flex items-center gap-2">
                  <Flame className="w-4 h-4 text-amber-500 fill-amber-500/20" />
                  <h3 className="font-brand text-xs font-bold uppercase tracking-widest text-slate-800 dark:text-slate-200">
                    Most Read This Week
                  </h3>
                </div>
                <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">
                  Ranked 01–05
                </span>
              </div>

              <div className="divide-y divide-slate-100 dark:divide-slate-800/80">
                {mostReadArticles.map((art, idx) => {
                  const rank = `0${idx + 1}`;
                  return (
                    <div
                      key={`sidebar-most-read-${art.id}`}
                      onClick={() => openArticle(art)}
                      className="py-3 first:pt-1 last:pb-1 group cursor-pointer flex gap-3.5 items-start"
                    >
                      <span className={`font-brand text-2xl font-extrabold tracking-tighter shrink-0 transition-colors ${
                        idx === 0 
                          ? 'text-amber-500' 
                          : idx === 1 
                          ? 'text-blue-600 dark:text-blue-400' 
                          : 'text-slate-300 dark:text-slate-600 group-hover:text-slate-500'
                      }`}>
                        {rank}
                      </span>
                      <div className="flex-1 min-w-0">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 block mb-0.5">
                          {art.category}
                        </span>
                        <h4 className="font-editorial text-xs font-semibold text-slate-900 dark:text-slate-200 group-hover:text-blue-600 dark:group-hover:text-amber-300 transition-colors line-clamp-2 leading-snug">
                          {art.title}
                        </h4>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* 3. Live Ethiopian Forex & Financial Indicators */}
            {usdRate && (
              <div className="p-4 rounded-2xl bg-gradient-to-br from-white via-slate-50 to-blue-50/30 dark:from-slate-900 dark:via-slate-900/90 dark:to-blue-950/20 border border-slate-200 dark:border-slate-800 shadow-sm">
                <div className="flex items-center justify-between pb-2 border-b border-slate-200 dark:border-slate-800 mb-3">
                  <div className="flex items-center gap-1.5">
                    <TrendingUp className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                    <span className="font-brand text-xs font-bold uppercase tracking-wider text-slate-800 dark:text-slate-200">
                      Ethiopian Market Watch
                    </span>
                  </div>
                  <button
                    onClick={() => {
                      setCurrentView('markets');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="text-[10px] text-blue-600 dark:text-blue-400 font-bold hover:underline"
                  >
                    View All →
                  </button>
                </div>

                <div className="space-y-2.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-500 dark:text-slate-400 font-medium">USD / ETB (Official NBE):</span>
                    <div className="flex items-center gap-1.5 font-bold text-slate-900 dark:text-slate-100">
                      <span>{usdRate.buying.toFixed(2)}</span>
                      <span className="text-[10px] text-emerald-600 dark:text-emerald-400">+{usdRate.change}%</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-500 dark:text-slate-400 font-medium">Inflation Rate (Headline):</span>
                    <span className="font-bold text-slate-900 dark:text-slate-100">19.9%</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-500 dark:text-slate-400 font-medium">ESX Equities Pipeline:</span>
                    <span className="font-bold text-blue-600 dark:text-blue-400">14 Registered</span>
                  </div>
                </div>
              </div>
            )}

            {/* 4. Morning Executive Briefing Newsletter Box */}
            <div className="p-5 rounded-2xl bg-gradient-to-br from-blue-900 to-slate-950 text-white shadow-md">
              <div className="flex items-center gap-2 mb-2">
                <Mail className="w-4 h-4 text-amber-400" />
                <span className="font-brand text-xs font-bold uppercase tracking-wider text-amber-400">
                  Executive Briefing
                </span>
              </div>
              <h4 className="font-editorial text-base font-bold leading-snug">
                Join 14,000+ business leaders in Addis Ababa.
              </h4>
              <p className="text-xs text-slate-300 mt-1.5 leading-relaxed">
                Receive tomorrow morning's macroeconomic analysis directly in your inbox.
              </p>

              {isSidebarSubscribed ? (
                <div className="mt-3.5 p-3 rounded-xl bg-emerald-500/20 border border-emerald-400/40 text-xs text-emerald-300 flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>You are subscribed to the daily executive dispatch.</span>
                </div>
              ) : (
                <form onSubmit={handleSidebarNewsletter} className="mt-4 space-y-2">
                  <input
                    type="email"
                    required
                    placeholder="Enter corporate email..."
                    value={sidebarEmail}
                    onChange={(e) => setSidebarEmail(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-800/90 border border-slate-700 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-amber-400"
                  />
                  <button
                    type="submit"
                    className="w-full py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs transition-colors shadow-sm"
                  >
                    Subscribe Free
                  </button>
                </form>
              )}
            </div>

          </aside>

        </div>
      </div>

      {/* ========================================================= */}
      {/* 4. STICKY MOBILE READING DOCK (Shown ONLY on mobile < lg)  */}
      {/* ========================================================= */}
      <nav 
        aria-label="Mobile reading controls"
        className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-t border-slate-200 dark:border-slate-800 shadow-2xl py-2 px-4 flex items-center justify-between"
      >
        {/* Back button */}
        <button
          onClick={() => {
            setCurrentView('home');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="flex flex-col items-center gap-0.5 text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors p-1"
          title="Back to front page"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="text-[10px] font-semibold">Home</span>
        </button>

        {/* Font Size Cycle (A / A+ / A++) */}
        <button
          onClick={cycleFontSize}
          className="flex flex-col items-center gap-0.5 text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors p-1"
          title={`Text size: ${fontSize.toUpperCase()}`}
        >
          <Type className="w-5 h-5" />
          <span className="text-[10px] font-semibold uppercase">{fontSize === 'normal' ? 'Size' : fontSize === 'large' ? 'A+' : 'A++'}</span>
        </button>

        {/* Bookmark Toggle */}
        <button
          onClick={() => toggleBookmark(selectedArticle.id)}
          className={`flex flex-col items-center gap-0.5 transition-colors p-1 ${
            isBookmarked(selectedArticle.id)
              ? 'text-blue-600 dark:text-blue-400 font-bold'
              : 'text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400'
          }`}
          title={isBookmarked(selectedArticle.id) ? "Saved" : "Bookmark"}
        >
          <Bookmark className={`w-5 h-5 ${isBookmarked(selectedArticle.id) ? 'fill-blue-600 dark:fill-blue-400' : ''}`} />
          <span className="text-[10px] font-semibold">{isBookmarked(selectedArticle.id) ? 'Saved' : 'Save'}</span>
        </button>

        {/* Share Button (Native Web Share) */}
        <button
          onClick={() => handleShare('native')}
          className="flex flex-col items-center gap-0.5 text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors p-1"
          title="Share article"
        >
          <Share2 className="w-5 h-5" />
          <span className="text-[10px] font-semibold">Share</span>
        </button>

        {/* Jump to Comments */}
        <button
          onClick={scrollToComments}
          className="flex flex-col items-center gap-0.5 text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors p-1 relative"
          title="Jump to discussion"
        >
          <MessageSquare className="w-5 h-5" />
          <span className="text-[10px] font-semibold">Discuss</span>
          {articleComments.length > 0 && (
            <span className="absolute 0 top-0 right-1 w-3.5 h-3.5 rounded-full bg-amber-500 text-slate-950 font-bold text-[9px] flex items-center justify-center">
              {articleComments.length}
            </span>
          )}
        </button>
      </nav>

    </div>
  );
};
