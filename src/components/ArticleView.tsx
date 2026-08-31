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
  Twitter, 
  Linkedin, 
  Printer, 
  Send,
  Trash2,
  Quote
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
    deleteComment,
    showToast
  } = useApp();

  // Typography scaling
  const [fontSize, setFontSize] = useState<'normal' | 'large' | 'xlarge'>('normal');

  // Reading progress state
  const [scrollProgress, setScrollProgress] = useState(0);

  // Audio simulation player state
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [audioProgress, setAudioProgress] = useState(0);

  // New comment input
  const [commentName, setCommentName] = useState('');
  const [commentRole, setCommentRole] = useState('');
  const [commentText, setCommentText] = useState('');

  // Scroll to top on mount and attach scroll progress listener
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollTop;
      const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      if (windowHeight > 0) {
        const scroll = (totalScroll / windowHeight) * 100;
        setScrollProgress(Number(scroll.toFixed(1)));
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [selectedArticle]);

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
      <div className="max-w-4xl mx-auto py-20 px-4 text-center">
        <h2 className="font-editorial text-2xl text-slate-300">No article selected</h2>
        <button 
          onClick={() => setCurrentView('home')}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm"
        >
          Return to Homepage
        </button>
      </div>
    );
  }

  // Related articles in same category
  const relatedArticles = articles
    .filter(a => a.id !== selectedArticle.id && a.category === selectedArticle.category && a.status === 'published')
    .slice(0, 3);

  // Article comments
  const articleComments = comments.filter(c => c.articleId === selectedArticle.id);

  const handleShare = (platform: 'copy' | 'twitter' | 'linkedin') => {
    const url = window.location.href;
    const title = selectedArticle.title;
    if (platform === 'copy') {
      navigator.clipboard.writeText(url);
      showToast('Article link copied to clipboard');
    } else if (platform === 'twitter') {
      window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`, '_blank');
    } else if (platform === 'linkedin') {
      window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`, '_blank');
    }
  };

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentText.trim()) return;
    addComment(selectedArticle.id, commentName, commentText, commentRole);
    setCommentText('');
    setCommentName('');
    setCommentRole('');
  };

  // Font size classes
  const fontClass = fontSize === 'normal' 
    ? 'text-base sm:text-lg leading-relaxed sm:leading-8' 
    : fontSize === 'large' 
    ? 'text-lg sm:text-xl leading-relaxed sm:leading-9' 
    : 'text-xl sm:text-2xl leading-relaxed sm:leading-10';

  return (
    <div className="w-full bg-slate-950 text-slate-100 min-h-screen">
      
      {/* 1. STICKY READING PROGRESS BAR */}
      <div className="fixed top-0 left-0 w-full h-1 bg-slate-900 z-50">
        <div 
          className="h-full bg-gradient-to-r from-blue-500 via-amber-400 to-blue-500 transition-all duration-150"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Main Container */}
      <article className="max-w-4xl mx-auto px-4 sm:px-6 py-6 md:py-10">
        
        {/* Back navigation & Tools */}
        <div className="flex items-center justify-between gap-4 pb-6 border-b border-slate-800/80 mb-6">
          <button
            onClick={() => {
              setCurrentView('home');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-slate-100 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Edition</span>
          </button>

          {/* Action Bar */}
          <div className="flex items-center gap-2">
            {/* Font size adjuster */}
            <div className="flex items-center bg-slate-900 border border-slate-800 rounded-lg p-0.5 text-xs text-slate-400">
              <button 
                onClick={() => setFontSize('normal')}
                className={`px-2 py-1 rounded ${fontSize === 'normal' ? 'bg-slate-800 text-white font-bold' : 'hover:text-white'}`}
                title="Normal text size"
              >
                A
              </button>
              <button 
                onClick={() => setFontSize('large')}
                className={`px-2 py-1 rounded text-sm ${fontSize === 'large' ? 'bg-slate-800 text-white font-bold' : 'hover:text-white'}`}
                title="Large text size"
              >
                A+
              </button>
              <button 
                onClick={() => setFontSize('xlarge')}
                className={`px-2 py-1 rounded text-base ${fontSize === 'xlarge' ? 'bg-slate-800 text-white font-bold' : 'hover:text-white'}`}
                title="Extra large text size"
              >
                A++
              </button>
            </div>

            {/* Bookmark */}
            <button
              onClick={() => toggleBookmark(selectedArticle.id)}
              className={`p-2 rounded-lg border transition-colors ${
                isBookmarked(selectedArticle.id)
                  ? 'bg-blue-600 text-white border-blue-400'
                  : 'bg-slate-900 text-slate-400 hover:text-white border-slate-800'
              }`}
              title={isBookmarked(selectedArticle.id) ? "Saved in briefing" : "Save article"}
            >
              <Bookmark className="w-4 h-4" />
            </button>

            {/* Print */}
            <button
              onClick={() => window.print()}
              className="p-2 rounded-lg bg-slate-900 text-slate-400 hover:text-white border border-slate-800 transition-colors hidden sm:inline-flex"
              title="Print / Save PDF"
            >
              <Printer className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* 2. CATEGORY & HEADLINE HEADER */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-md bg-blue-600/20 text-blue-400 border border-blue-500/30 text-xs font-bold uppercase tracking-wider">
              {selectedArticle.category}
            </span>
            {selectedArticle.isEditorPick && (
              <span className="px-2.5 py-0.5 rounded-md bg-amber-500/20 text-amber-400 border border-amber-500/30 text-[11px] font-extrabold uppercase tracking-wider">
                Editor's Choice
              </span>
            )}
          </div>

          <h1 className="font-editorial text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-slate-100 leading-[1.15] tracking-tight">
            {selectedArticle.title}
          </h1>

          <p className="font-editorial text-lg sm:text-xl md:text-2xl text-slate-300 italic leading-relaxed">
            {selectedArticle.subtitle}
          </p>
        </div>

        {/* 3. AUTHOR BYLINE & METADATA */}
        <div className="my-6 py-4 border-y border-slate-800/80 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <img 
              src={selectedArticle.author.avatar} 
              alt={selectedArticle.author.name}
              className="w-12 h-12 rounded-full object-cover border-2 border-slate-700 shadow-md"
              referrerPolicy="no-referrer"
            />
            <div>
              <span className="font-bold text-sm text-slate-200 block">
                {selectedArticle.author.name}
              </span>
              <p className="text-xs text-slate-400">
                {selectedArticle.author.role}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 text-xs text-slate-400">
            <div>
              <span className="block text-slate-500 text-[11px] uppercase font-bold tracking-wider">Published</span>
              <span className="font-medium text-slate-300">
                {new Date(selectedArticle.publishedAt).toLocaleDateString('en-US', {
                  weekday: 'short',
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric'
                })}
              </span>
            </div>
            <div className="h-6 w-px bg-slate-800" />
            <div>
              <span className="block text-slate-500 text-[11px] uppercase font-bold tracking-wider">Reading Time</span>
              <span className="font-medium text-slate-300 flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-blue-400" />
                {selectedArticle.readTime}
              </span>
            </div>
          </div>
        </div>

        {/* 4. AUDIO LISTEN BAR (AI / NARRATOR SIMULATION) */}
        <div className="p-3.5 sm:p-4 rounded-2xl bg-gradient-to-r from-slate-900 via-blue-950/40 to-slate-900 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3 mb-8">
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={() => setIsPlayingAudio(!isPlayingAudio)}
              className="w-10 h-10 rounded-full bg-blue-600 hover:bg-blue-500 text-white flex items-center justify-center shrink-0 shadow-lg transition-transform active:scale-95"
              title={isPlayingAudio ? "Pause audio narration" : "Listen to article audio"}
            >
              {isPlayingAudio ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
            </button>
            <div>
              <p className="text-xs font-bold text-slate-200 flex items-center gap-1.5">
                <Volume2 className="w-3.5 h-3.5 text-amber-400" />
                <span>Listen to this Briefing (Audio Edition)</span>
              </p>
              <p className="text-[11px] text-slate-400">
                Narrated by Negarit Voice Engine • Duration: {selectedArticle.audioDuration || '5:15'}
              </p>
            </div>
          </div>

          {/* Audio Scrubber */}
          <div className="w-full sm:w-64 flex items-center gap-2">
            <div className="flex-1 bg-slate-800 h-1.5 rounded-full overflow-hidden">
              <div 
                className="bg-blue-500 h-full transition-all duration-300"
                style={{ width: `${audioProgress}%` }}
              />
            </div>
            <span className="text-[10px] font-mono text-slate-400 shrink-0">
              {isPlayingAudio ? `${audioProgress}%` : (selectedArticle.audioDuration || '0:00')}
            </span>
          </div>
        </div>

        {/* 5. HERO FEATURED IMAGE */}
        <div className="mb-8 rounded-2xl overflow-hidden bg-slate-900 border border-slate-800 shadow-2xl">
          <img 
            src={selectedArticle.featuredImage} 
            alt={selectedArticle.title}
            className="w-full h-auto max-h-[520px] object-cover"
            referrerPolicy="no-referrer"
          />
          {selectedArticle.imageCaption && (
            <p className="p-3 text-xs text-slate-400 bg-slate-900/90 border-t border-slate-800/80 italic">
              {selectedArticle.imageCaption}
            </p>
          )}
        </div>

        {/* 6. KEY TAKEAWAYS EXECUTIVE CALLOUT BOX */}
        {selectedArticle.keyTakeaways && selectedArticle.keyTakeaways.length > 0 && (
          <div className="my-8 p-6 rounded-2xl bg-gradient-to-br from-blue-950/40 via-slate-900 to-slate-950 border-2 border-blue-500/30 shadow-xl">
            <div className="flex items-center gap-2 mb-3">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <h3 className="font-brand text-xs font-bold uppercase tracking-widest text-blue-300">
                Negarit Executive Key Takeaways
              </h3>
            </div>
            <ul className="space-y-2.5">
              {selectedArticle.keyTakeaways.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-200">
                  <span className="w-5 h-5 rounded-full bg-blue-600/30 text-blue-400 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <span className="leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* 7. ARTICLE CONTENT PARAGRAPHS & PULL QUOTES */}
        <div className={`font-sans text-slate-200 space-y-6 ${fontClass}`}>
          {selectedArticle.content.map((paragraph, idx) => {
            return (
              <React.Fragment key={idx}>
                <p className="font-sans leading-relaxed text-slate-200">
                  {idx === 0 && (
                    <span className="float-left text-5xl font-editorial font-bold text-blue-400 pr-3 pt-1 leading-none">
                      {paragraph.charAt(0)}
                    </span>
                  )}
                  {idx === 0 ? paragraph.slice(1) : paragraph}
                </p>

                {/* Inject Pull Quote after 2nd paragraph */}
                {idx === 1 && selectedArticle.pullQuote && (
                  <figure className="my-8 p-6 sm:p-8 rounded-2xl bg-slate-900/90 border-l-4 border-amber-500 shadow-lg">
                    <Quote className="w-8 h-8 text-amber-500/40 mb-2" />
                    <blockquote className="font-editorial text-xl sm:text-2xl font-semibold text-slate-100 italic leading-snug">
                      "{selectedArticle.pullQuote.quote}"
                    </blockquote>
                    <figcaption className="mt-3 text-xs sm:text-sm font-sans text-slate-400 font-medium">
                      — <span className="text-slate-200 font-semibold">{selectedArticle.pullQuote.speaker}</span>
                      {selectedArticle.pullQuote.role && `, ${selectedArticle.pullQuote.role}`}
                    </figcaption>
                  </figure>
                )}
              </React.Fragment>
            );
          })}
        </div>

        {/* 8. TAGS & SOCIAL SHARE BUTTONS */}
        <div className="mt-10 pt-6 border-t border-slate-800 space-y-6">
          {/* Tags */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-semibold text-slate-400 mr-1">Topics:</span>
            {selectedArticle.tags.map(tag => (
              <span 
                key={tag}
                className="px-3 py-1 rounded-lg bg-slate-900 border border-slate-800 text-xs text-slate-300 hover:border-slate-700 transition-colors"
              >
                #{tag}
              </span>
            ))}
          </div>

          {/* Social Share Bar */}
          <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <Share2 className="w-4 h-4 text-blue-400" />
              <span className="text-xs font-bold uppercase tracking-wider text-slate-200">
                Share this intelligence briefing
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => handleShare('twitter')}
                className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
                title="Share on X (Twitter)"
              >
                <Twitter className="w-4 h-4" />
              </button>
              <button
                onClick={() => handleShare('linkedin')}
                className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
                title="Share on LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </button>
              <button
                onClick={() => handleShare('copy')}
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold shadow transition-colors"
              >
                <Copy className="w-3.5 h-3.5" />
                <span>Copy Link</span>
              </button>
            </div>
          </div>
        </div>

        {/* 9. AUTHOR EXPANDED BIOGRAPHY CARD */}
        <div className="my-10 p-6 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col sm:flex-row gap-5 items-center sm:items-start">
          <img 
            src={selectedArticle.author.avatar} 
            alt={selectedArticle.author.name}
            className="w-20 h-20 rounded-2xl object-cover border-2 border-slate-700 shrink-0"
            referrerPolicy="no-referrer"
          />
          <div>
            <div className="flex items-center justify-between gap-2">
              <div>
                <h4 className="font-editorial text-lg font-bold text-slate-100">
                  {selectedArticle.author.name}
                </h4>
                <p className="text-xs font-semibold text-blue-400">
                  {selectedArticle.author.role}
                </p>
              </div>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed mt-2">
              {selectedArticle.author.bio || 'Senior correspondent at Negarit Business Review specializing in macro analysis and East African capital flows.'}
            </p>
          </div>
        </div>

        {/* 10. INTERACTIVE COMMENT SECTION */}
        <section className="my-12 pt-8 border-t border-slate-800">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-amber-400" />
              <h3 className="font-editorial text-2xl font-bold text-slate-100">
                Executive Discussion ({articleComments.length})
              </h3>
            </div>
            <span className="text-xs text-slate-500 font-medium">Moderated Editorial Desk</span>
          </div>

          {/* Comment Form */}
          <form onSubmit={handleCommentSubmit} className="mb-8 p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
            <h4 className="font-brand text-xs font-bold uppercase tracking-wider text-slate-300">
              Contribute to the Perspective
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <input 
                type="text"
                required
                placeholder="Your Name *"
                value={commentName}
                onChange={(e) => setCommentName(e.target.value)}
                className="px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 text-xs focus:outline-none focus:border-blue-500"
              />
              <input 
                type="text"
                placeholder="Professional Title / Organization"
                value={commentRole}
                onChange={(e) => setCommentRole(e.target.value)}
                className="px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 text-xs focus:outline-none focus:border-blue-500"
              />
            </div>
            <textarea
              required
              rows={3}
              placeholder="Share your business insights or critique..."
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 text-xs focus:outline-none focus:border-blue-500"
            />
            <div className="flex justify-end">
              <button
                type="submit"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold transition-colors"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Publish Contribution</span>
              </button>
            </div>
          </form>

          {/* Comment List */}
          <div className="space-y-4">
            {articleComments.length === 0 ? (
              <p className="text-xs text-slate-500 italic text-center py-4">
                Be the first executive to join the discussion.
              </p>
            ) : (
              articleComments.map(c => (
                <div 
                  key={c.id}
                  className="p-4 rounded-xl bg-slate-900/70 border border-slate-800/80 space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <img 
                        src={c.avatar} 
                        alt={c.authorName}
                        className="w-7 h-7 rounded-full bg-slate-800"
                      />
                      <div>
                        <span className="font-bold text-xs text-slate-200">{c.authorName}</span>
                        {c.authorRole && (
                          <span className="text-[10px] text-blue-400 font-medium ml-2">
                            • {c.authorRole}
                          </span>
                        )}
                      </div>
                    </div>

                    <span className="text-[10px] text-slate-500">{c.createdAt}</span>
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed font-sans pl-9">
                    {c.content}
                  </p>

                  <div className="pl-9 pt-1 flex items-center justify-between text-xs">
                    <button
                      onClick={() => likeComment(c.id)}
                      className={`inline-flex items-center gap-1 text-[11px] font-medium transition-colors ${
                        c.isLiked ? 'text-blue-400 font-bold' : 'text-slate-400 hover:text-slate-200'
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

        {/* 11. RELATED BRIEFINGS SECTION */}
        {relatedArticles.length > 0 && (
          <section className="my-12 pt-8 border-t border-slate-800">
            <h3 className="font-editorial text-2xl font-bold text-slate-100 mb-6">
              Related Analysis in {selectedArticle.category}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              {relatedArticles.map(art => (
                <div
                  key={art.id}
                  onClick={() => openArticle(art)}
                  className="group cursor-pointer rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 overflow-hidden flex flex-col justify-between"
                >
                  <div className="aspect-video w-full overflow-hidden bg-slate-800">
                    <img 
                      src={art.featuredImage} 
                      alt={art.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div className="p-4 flex flex-col justify-between flex-grow">
                    <h4 className="font-editorial text-sm font-semibold text-slate-200 group-hover:text-blue-400 transition-colors line-clamp-2 leading-snug">
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

    </div>
  );
};
