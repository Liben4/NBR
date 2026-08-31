import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Plus, 
  FileText, 
  Users, 
  Eye, 
  MessageSquare, 
  TrendingUp, 
  Trash2, 
  Edit3, 
  CheckCircle2, 
  AlertCircle, 
  ArrowLeft, 
  Image as ImageIcon,
  Save,
  Send,
  Sparkles,
  Lock,
  Search
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Article, CategoryType } from '../types';

export const AdminDashboard: React.FC = () => {
  const { 
    articles, 
    authors, 
    addArticle, 
    updateArticle, 
    deleteArticle, 
    subscribers, 
    comments, 
    deleteComment, 
    setCurrentView,
    openArticle,
    showToast
  } = useApp();

  // Authentication state simulation
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(true);
  const [password, setPassword] = useState('');

  // Active admin tab
  const [activeTab, setActiveTab] = useState<'analytics' | 'articles' | 'subscribers' | 'comments'>('articles');

  // Article form modal state
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [editingArticleId, setEditingArticleId] = useState<string | null>(null);

  // Form fields
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [contentParagraphs, setContentParagraphs] = useState('');
  const [category, setCategory] = useState<CategoryType>('Economy');
  const [authorId, setAuthorId] = useState(authors[0]?.id || 'auth-1');
  const [featuredImage, setFeaturedImage] = useState('');
  const [imageCaption, setImageCaption] = useState('');
  const [readTime, setReadTime] = useState('5 min read');
  const [tags, setTags] = useState('Economy, Investment, NBE');
  const [isHeroFeatured, setIsHeroFeatured] = useState(false);
  const [isEditorPick, setIsEditorPick] = useState(false);
  const [status, setStatus] = useState<'published' | 'draft'>('published');
  const [keyTakeaways, setKeyTakeaways] = useState('');
  const [pullQuoteText, setPullQuoteText] = useState('');
  const [pullQuoteSpeaker, setPullQuoteSpeaker] = useState('');

  // Curated Preset Business Images
  const PRESET_IMAGES = [
    { label: 'Addis Financial District', url: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&auto=format&fit=crop&q=80' },
    { label: 'Stock Exchange Trading Floor', url: 'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?w=1200&auto=format&fit=crop&q=80' },
    { label: 'Digital Mobile Payment', url: 'https://images.unsplash.com/photo-1556742049-0a67c5574f73?w=1200&auto=format&fit=crop&q=80' },
    { label: 'Coffee Plantation & Export', url: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=1200&auto=format&fit=crop&q=80' },
    { label: 'Aviation & Bole International', url: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=1200&auto=format&fit=crop&q=80' },
    { label: 'Industrial Tech & Factory', url: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=1200&auto=format&fit=crop&q=80' }
  ];

  // Open editor for new article
  const handleNewArticle = () => {
    setEditingArticleId(null);
    setTitle('');
    setSubtitle('');
    setExcerpt('');
    setContentParagraphs('The National Bank of Ethiopia has introduced enhanced regulatory benchmarks to strengthen financial liquidity...\n\nCommercial lenders report substantial inflows as institutional investors align with market-based pricing mechanisms.\n\nGoing forward, the monetary authorities intend to balance price stabilization with sustainable industrial credit access.');
    setCategory('Economy');
    setAuthorId(authors[0]?.id || 'auth-1');
    setFeaturedImage(PRESET_IMAGES[0].url);
    setImageCaption('Addis Ababa commercial headquarters and banking precinct.');
    setReadTime('5 min read');
    setTags('NBE, Banking, Macro, Ethiopia');
    setIsHeroFeatured(false);
    setIsEditorPick(false);
    setStatus('published');
    setKeyTakeaways('Key liquidity benchmarks established for commercial institutions.\nForeign exchange inflows to formal channels up significantly.\nMonetary policy stance focused on core inflation deceleration.');
    setPullQuoteText('Sustainable monetary stability requires deep institutional trust and transparent execution.');
    setPullQuoteSpeaker('Executive Board Representative');
    setIsEditorOpen(true);
  };

  // Open editor for existing article
  const handleEditArticle = (art: Article) => {
    setEditingArticleId(art.id);
    setTitle(art.title);
    setSubtitle(art.subtitle);
    setExcerpt(art.excerpt);
    setContentParagraphs(art.content.join('\n\n'));
    setCategory(art.category);
    setAuthorId(art.author.id);
    setFeaturedImage(art.featuredImage);
    setImageCaption(art.imageCaption || '');
    setReadTime(art.readTime);
    setTags(art.tags.join(', '));
    setIsHeroFeatured(!!art.isHeroFeatured);
    setIsEditorPick(!!art.isEditorPick);
    setStatus(art.status);
    setKeyTakeaways(art.keyTakeaways?.join('\n') || '');
    setPullQuoteText(art.pullQuote?.quote || '');
    setPullQuoteSpeaker(art.pullQuote?.speaker || '');
    setIsEditorOpen(true);
  };

  // Save / Submit Article
  const handleSaveArticle = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !contentParagraphs.trim()) return;

    const selectedAuthor = authors.find(a => a.id === authorId) || authors[0];
    const paragraphs = contentParagraphs.split('\n').map(p => p.trim()).filter(p => p.length > 0);
    const tagsList = tags.split(',').map(t => t.trim()).filter(t => t.length > 0);
    const takeawaysList = keyTakeaways.split('\n').map(t => t.trim()).filter(t => t.length > 0);

    const pullQuote = pullQuoteText.trim() ? {
      quote: pullQuoteText.trim(),
      speaker: pullQuoteSpeaker.trim() || selectedAuthor.name,
      role: selectedAuthor.role
    } : undefined;

    if (editingArticleId) {
      updateArticle(editingArticleId, {
        title,
        subtitle,
        excerpt: excerpt || subtitle || paragraphs[0]?.slice(0, 160) || '',
        content: paragraphs,
        category,
        author: selectedAuthor,
        featuredImage: featuredImage || PRESET_IMAGES[0].url,
        imageCaption,
        readTime,
        tags: tagsList,
        isHeroFeatured,
        isEditorPick,
        status,
        keyTakeaways: takeawaysList.length > 0 ? takeawaysList : undefined,
        pullQuote
      });
    } else {
      addArticle({
        slug: title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
        title,
        subtitle,
        excerpt: excerpt || subtitle || paragraphs[0]?.slice(0, 160) || '',
        content: paragraphs,
        category,
        author: selectedAuthor,
        publishedAt: new Date().toISOString(),
        readTime,
        featuredImage: featuredImage || PRESET_IMAGES[0].url,
        imageCaption,
        isHeroFeatured,
        isEditorPick,
        tags: tagsList,
        keyTakeaways: takeawaysList.length > 0 ? takeawaysList : undefined,
        pullQuote,
        status
      });
    }

    setIsEditorOpen(false);
  };

  // Analytics Metrics
  const totalViews = articles.reduce((acc, a) => acc + a.views, 0);
  const totalPublished = articles.filter(a => a.status === 'published').length;
  const totalDrafts = articles.filter(a => a.status === 'draft').length;

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-8 py-8 min-h-screen">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800 mb-8">
        <div>
          <button
            onClick={() => {
              setCurrentView('home');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-slate-200 transition-colors mb-2"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Public Reader View</span>
          </button>
          
          <div className="flex items-center gap-2 text-blue-400 font-brand text-xs uppercase tracking-widest font-bold">
            <ShieldCheck className="w-4 h-4" />
            <span>Negarit Editorial Administration</span>
          </div>
          <h1 className="font-editorial text-3xl sm:text-4xl font-bold text-slate-100 mt-1">
            Publishing & Newsroom Desk
          </h1>
        </div>

        {/* Action Button */}
        <button
          onClick={handleNewArticle}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs sm:text-sm font-semibold shadow-lg shadow-blue-900/40 transition-all active:scale-95"
        >
          <Plus className="w-4 h-4" />
          <span>Write New Article</span>
        </button>
      </div>

      {/* KPI Overview Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800">
          <div className="flex items-center justify-between text-slate-400 mb-1">
            <span className="text-xs font-semibold uppercase tracking-wider">Total Briefings</span>
            <FileText className="w-4 h-4 text-blue-400" />
          </div>
          <div className="text-2xl font-bold text-slate-100 font-sans">{articles.length}</div>
          <span className="text-[11px] text-emerald-400 font-medium">{totalPublished} Live • {totalDrafts} Draft</span>
        </div>

        <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800">
          <div className="flex items-center justify-between text-slate-400 mb-1">
            <span className="text-xs font-semibold uppercase tracking-wider">Reader Views</span>
            <Eye className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-2xl font-bold text-slate-100 font-sans">{(totalViews / 1000).toFixed(1)}k</div>
          <span className="text-[11px] text-slate-400 font-medium">+18.4% this week</span>
        </div>

        <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800">
          <div className="flex items-center justify-between text-slate-400 mb-1">
            <span className="text-xs font-semibold uppercase tracking-wider">Active Subscribers</span>
            <Users className="w-4 h-4 text-purple-400" />
          </div>
          <div className="text-2xl font-bold text-slate-100 font-sans">{subscribers.length + 28400}</div>
          <span className="text-[11px] text-purple-400 font-medium">{subscribers.length} new this session</span>
        </div>

        <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800">
          <div className="flex items-center justify-between text-slate-400 mb-1">
            <span className="text-xs font-semibold uppercase tracking-wider">Moderated Comments</span>
            <MessageSquare className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="text-2xl font-bold text-slate-100 font-sans">{comments.length}</div>
          <span className="text-[11px] text-slate-400 font-medium">100% moderation active</span>
        </div>
      </div>

      {/* Tabs Switcher */}
      <div className="flex items-center gap-2 border-b border-slate-800 pb-3 mb-6 text-xs sm:text-sm font-semibold">
        <button
          onClick={() => setActiveTab('articles')}
          className={`px-4 py-2 rounded-xl transition-all ${
            activeTab === 'articles'
              ? 'bg-blue-600 text-white'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
          }`}
        >
          Articles Management ({articles.length})
        </button>
        <button
          onClick={() => setActiveTab('subscribers')}
          className={`px-4 py-2 rounded-xl transition-all ${
            activeTab === 'subscribers'
              ? 'bg-blue-600 text-white'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
          }`}
        >
          Newsletter Subscribers ({subscribers.length})
        </button>
        <button
          onClick={() => setActiveTab('comments')}
          className={`px-4 py-2 rounded-xl transition-all ${
            activeTab === 'comments'
              ? 'bg-blue-600 text-white'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
          }`}
        >
          Reader Discussion Desk ({comments.length})
        </button>
      </div>

      {/* TAB 1: ARTICLE LIST MANAGEMENT */}
      {activeTab === 'articles' && (
        <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-slate-950/80 text-slate-400 uppercase text-[10px] font-brand tracking-wider border-b border-slate-800">
                <tr>
                  <th className="py-3.5 px-4">Article</th>
                  <th className="py-3.5 px-4">Category</th>
                  <th className="py-3.5 px-4">Author</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-4">Views</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {articles.map((art: Article) => (
                  <tr key={art.id} className="hover:bg-slate-850 transition-colors">
                    <td className="py-3 px-4 max-w-sm">
                      <div className="flex items-center gap-3">
                        <img 
                          src={art.featuredImage} 
                          alt="" 
                          className="w-12 h-10 rounded-lg object-cover bg-slate-800 shrink-0" 
                          referrerPolicy="no-referrer"
                        />
                        <div className="min-w-0">
                          <p 
                            onClick={() => openArticle(art)}
                            className="font-bold text-slate-100 hover:text-blue-400 transition-colors truncate cursor-pointer"
                          >
                            {art.title}
                          </p>
                          <span className="text-[10px] text-slate-500">
                            {new Date(art.publishedAt).toLocaleDateString()} • {art.readTime}
                          </span>
                        </div>
                      </div>
                    </td>

                    <td className="py-3 px-4">
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-800 text-blue-400 border border-slate-700">
                        {art.category}
                      </span>
                    </td>

                    <td className="py-3 px-4 text-slate-300 font-medium">
                      {art.author.name}
                    </td>

                    <td className="py-3 px-4">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        art.status === 'published'
                          ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                          : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                      }`}>
                        {art.status}
                      </span>
                    </td>

                    <td className="py-3 px-4 font-mono text-slate-300">
                      {art.views.toLocaleString()}
                    </td>

                    <td className="py-3 px-4 text-right space-x-2">
                      <button
                        onClick={() => handleEditArticle(art)}
                        className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-blue-400 transition-colors"
                        title="Edit Article"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => {
                          if (confirm(`Delete article: "${art.title}"?`)) {
                            deleteArticle(art.id);
                          }
                        }}
                        className="p-1.5 rounded-lg bg-slate-800 hover:bg-rose-950 text-slate-300 hover:text-rose-400 transition-colors"
                        title="Delete Article"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 2: SUBSCRIBERS */}
      {activeTab === 'subscribers' && (
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-4">
          <div className="flex items-center justify-between pb-4 border-b border-slate-800">
            <div>
              <h3 className="font-editorial text-xl font-bold text-slate-100">
                Corporate Newsletter Subscribers
              </h3>
              <p className="text-xs text-slate-400">
                Registered institutional readers, treasury heads, and investors.
              </p>
            </div>
            <button
              onClick={() => showToast('Simulated export of subscriber CSV dataset')}
              className="px-3.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 border border-slate-700"
            >
              Export CSV
            </button>
          </div>

          <div className="divide-y divide-slate-800">
            {subscribers.map((s) => (
              <div key={s.id} className="py-3 flex items-center justify-between text-xs">
                <div>
                  <span className="font-bold text-slate-200 block">{s.name || 'Executive Subscriber'}</span>
                  <span className="text-slate-400 text-[11px] font-mono">{s.email}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-[10px] bg-slate-800 text-blue-400 px-2 py-0.5 rounded">
                    {s.interests.join(', ')}
                  </span>
                  <span className="text-emerald-400 text-[11px] font-semibold">Active</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: COMMENTS MODERATION */}
      {activeTab === 'comments' && (
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-4">
          <div className="flex items-center justify-between pb-4 border-b border-slate-800">
            <h3 className="font-editorial text-xl font-bold text-slate-100">
              Reader Discussion Moderation Desk
            </h3>
            <span className="text-xs text-slate-500 font-mono">Live Stream</span>
          </div>

          <div className="space-y-3">
            {comments.map((c) => (
              <div key={c.id} className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex items-start justify-between gap-4">
                <div className="space-y-1 text-xs">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-200">{c.authorName}</span>
                    <span className="text-slate-500">•</span>
                    <span className="text-blue-400">{c.authorRole}</span>
                    <span className="text-slate-600 text-[10px]">{c.createdAt}</span>
                  </div>
                  <p className="text-slate-300 font-sans leading-relaxed">{c.content}</p>
                </div>

                <button
                  onClick={() => deleteComment(c.id)}
                  className="p-1.5 rounded-lg bg-slate-900 hover:bg-rose-950 text-slate-400 hover:text-rose-400 transition-colors shrink-0"
                  title="Remove comment"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ================= MODAL: CREATE / EDIT ARTICLE ================= */}
      {isEditorOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-fadeIn">
          <div 
            className="relative w-full max-w-4xl bg-slate-900 border border-slate-700 rounded-3xl p-6 sm:p-8 shadow-2xl overflow-y-auto max-h-[92vh]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-6">
              <div>
                <h3 className="font-editorial text-2xl font-bold text-slate-100">
                  {editingArticleId ? 'Edit Newsroom Article' : 'Draft New Business Story'}
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Produce and broadcast executive-grade journalism for Negarit Business Review.
                </p>
              </div>
              <button
                onClick={() => setIsEditorOpen(false)}
                className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-300"
              >
                Cancel
              </button>
            </div>

            <form onSubmit={handleSaveArticle} className="space-y-5 text-xs">
              
              {/* Title & Subtitle */}
              <div>
                <label className="font-bold text-slate-300 block mb-1">Headline *</label>
                <input 
                  type="text"
                  required
                  placeholder="Compelling, editorial headline..."
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 text-sm font-editorial font-bold focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="font-bold text-slate-300 block mb-1">Subtitle / Deck *</label>
                <input 
                  type="text"
                  required
                  placeholder="One-to-two sentence executive summary..."
                  value={subtitle}
                  onChange={(e) => setSubtitle(e.target.value)}
                  className="w-full px-4 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 focus:outline-none focus:border-blue-500"
                />
              </div>

              {/* Category, Author, ReadTime */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="font-bold text-slate-300 block mb-1">Category *</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as CategoryType)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 focus:outline-none focus:border-blue-500"
                  >
                    {(['Business', 'Economy', 'Finance', 'Technology', 'Entrepreneurship', 'Opinion'] as CategoryType[]).map(c => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="font-bold text-slate-300 block mb-1">Author *</label>
                  <select
                    value={authorId}
                    onChange={(e) => setAuthorId(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 focus:outline-none focus:border-blue-500"
                  >
                    {authors.map(a => (
                      <option key={a.id} value={a.id}>{a.name} ({a.role})</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="font-bold text-slate-300 block mb-1">Estimated Read Time</label>
                  <input 
                    type="text"
                    value={readTime}
                    onChange={(e) => setReadTime(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              {/* Featured Image & Presets */}
              <div>
                <label className="font-bold text-slate-300 block mb-1">Featured Image URL</label>
                <input 
                  type="url"
                  placeholder="https://images.unsplash.com/..."
                  value={featuredImage}
                  onChange={(e) => setFeaturedImage(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 focus:outline-none focus:border-blue-500 mb-2"
                />
                
                {/* Presets */}
                <div className="flex flex-wrap gap-2 items-center">
                  <span className="text-[11px] text-slate-500 font-semibold">Or pick preset:</span>
                  {PRESET_IMAGES.map((img, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setFeaturedImage(img.url)}
                      className={`px-2.5 py-1 rounded-lg text-[10px] border transition-all ${
                        featuredImage === img.url 
                          ? 'bg-blue-600 text-white border-blue-500' 
                          : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-slate-200'
                      }`}
                    >
                      {img.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Main Content Paragraphs */}
              <div>
                <label className="font-bold text-slate-300 block mb-1">
                  Article Body (Separate paragraphs with double enter) *
                </label>
                <textarea
                  required
                  rows={8}
                  placeholder="Write full investigative story content here..."
                  value={contentParagraphs}
                  onChange={(e) => setContentParagraphs(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 font-sans leading-relaxed focus:outline-none focus:border-blue-500"
                />
              </div>

              {/* Key Takeaways & Pull Quote */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="font-bold text-slate-300 block mb-1">
                    Key Takeaways (One point per line)
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Takeaway 1&#10;Takeaway 2&#10;Takeaway 3"
                    value={keyTakeaways}
                    onChange={(e) => setKeyTakeaways(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-300 block mb-1">
                    Pull Quote & Speaker
                  </label>
                  <input
                    type="text"
                    placeholder="Quote text..."
                    value={pullQuoteText}
                    onChange={(e) => setPullQuoteText(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 focus:outline-none focus:border-blue-500 mb-2"
                  />
                  <input
                    type="text"
                    placeholder="Speaker name / title"
                    value={pullQuoteSpeaker}
                    onChange={(e) => setPullQuoteSpeaker(e.target.value)}
                    className="w-full px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              {/* Toggles: Hero & Editor Pick & Status */}
              <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl bg-slate-950 border border-slate-800">
                <div className="flex items-center gap-6">
                  <label className="flex items-center gap-2 cursor-pointer text-slate-300">
                    <input 
                      type="checkbox"
                      checked={isHeroFeatured}
                      onChange={(e) => setIsHeroFeatured(e.target.checked)}
                      className="rounded border-slate-700 text-blue-600 focus:ring-0"
                    />
                    <span>Set as Hero Cover Story</span>
                  </label>

                  <label className="flex items-center gap-2 cursor-pointer text-slate-300">
                    <input 
                      type="checkbox"
                      checked={isEditorPick}
                      onChange={(e) => setIsEditorPick(e.target.checked)}
                      className="rounded border-slate-700 text-blue-600 focus:ring-0"
                    />
                    <span>Include in Editor's Selection</span>
                  </label>
                </div>

                <div className="flex items-center gap-3">
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value as any)}
                    className="px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-700 text-slate-200 text-xs font-bold"
                  >
                    <option value="published">Published</option>
                    <option value="draft">Draft</option>
                  </select>

                  <button
                    type="submit"
                    className="inline-flex items-center gap-1.5 px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-lg transition-colors"
                  >
                    <Save className="w-3.5 h-3.5" />
                    <span>{editingArticleId ? 'Update Article' : 'Publish Article'}</span>
                  </button>
                </div>
              </div>

            </form>
          </div>
        </div>
      )}

    </div>
  );
};
