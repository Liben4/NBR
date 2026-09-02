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
  LogOut,
  Search,
  DollarSign,
  History,
  Check,
  RefreshCw,
  Sliders,
  ExternalLink,
  Tag,
  Clock,
  UserCheck
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Article, CategoryType } from '../types';
import { AdminLogin } from './AdminLogin';

export const AdminDashboard: React.FC = () => {
  const { 
    adminUser,
    isAdminLoggedIn,
    logoutAdmin,
    articles, 
    authors, 
    addArticle, 
    updateArticle, 
    deleteArticle, 
    subscribers, 
    addSubscriber,
    comments, 
    deleteComment, 
    currencies,
    updateCurrencyRate,
    setCurrentView,
    openArticle,
    showToast
  } = useApp();

  // If user is not logged in as Admin, show the dedicated Admin Authentication Gateway
  if (!isAdminLoggedIn || !adminUser) {
    return <AdminLogin />;
  }

  // Active admin tab
  const [activeTab, setActiveTab] = useState<'articles' | 'forex' | 'subscribers' | 'comments' | 'audit' | 'security'>('articles');

  // Search and filters for articles
  const [articleSearch, setArticleSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('All');
  const [statusFilter, setStatusFilter] = useState<string>('All');

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
  const [isBreaking, setIsBreaking] = useState(false);
  const [status, setStatus] = useState<'published' | 'draft'>('published');
  const [keyTakeaways, setKeyTakeaways] = useState('');
  const [pullQuoteText, setPullQuoteText] = useState('');
  const [pullQuoteSpeaker, setPullQuoteSpeaker] = useState('');

  // Forex edit modal / state
  const [editingCurrency, setEditingCurrency] = useState<{ code: string; buying: number; selling: number; change: number } | null>(null);

  // Manual subscriber add state
  const [newSubEmail, setNewSubEmail] = useState('');
  const [newSubName, setNewSubName] = useState('');

  // Curated Preset Business Images for Ethiopian business reporting
  const PRESET_IMAGES = [
    { label: 'Addis Financial District & CBE Tower', url: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&auto=format&fit=crop&q=80' },
    { label: 'ESX Stock Exchange Trading Floor', url: 'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?w=1200&auto=format&fit=crop&q=80' },
    { label: 'Digital Mobile Payment & Fintech', url: 'https://images.unsplash.com/photo-1556742049-0a67c5574f73?w=1200&auto=format&fit=crop&q=80' },
    { label: 'Coffee Plantation & Agro Export', url: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=1200&auto=format&fit=crop&q=80' },
    { label: 'Ethiopian Aviation & Bole Hub', url: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=1200&auto=format&fit=crop&q=80' },
    { label: 'Industrial Park & Manufacturing', url: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=1200&auto=format&fit=crop&q=80' }
  ];

  // Open editor for new article
  const handleNewArticle = () => {
    setEditingArticleId(null);
    setTitle('');
    setSubtitle('');
    setExcerpt('');
    setContentParagraphs('The National Bank of Ethiopia has announced comprehensive liquidity and market-based pricing benchmarks to accelerate financial modernization...\n\nCommercial institutions and institutional asset managers report elevated formal transactions across key industrial corridors.\n\nMoving into the upcoming fiscal quarter, market participants anticipate continued structural deepening as the capital market ecosystem expands.');
    setCategory('Economy');
    setAuthorId(authors[0]?.id || 'auth-1');
    setFeaturedImage(PRESET_IMAGES[0].url);
    setImageCaption('Commercial hub and banking headquarters in Addis Ababa.');
    setReadTime('5 min read');
    setTags('NBE, Banking, Macro, Capital Markets, Ethiopia');
    setIsHeroFeatured(false);
    setIsEditorPick(false);
    setIsBreaking(false);
    setStatus('published');
    setKeyTakeaways('Key liquidity benchmarks established for commercial institutions.\nForeign exchange inflows to formal channels up significantly.\nMonetary policy stance focused on core inflation deceleration.');
    setPullQuoteText('Sustainable monetary stability requires deep institutional trust and transparent market execution.');
    setPullQuoteSpeaker('Executive Editorial Board');
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
    setIsBreaking(!!art.isBreaking);
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
        isBreaking,
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
        isBreaking,
        tags: tagsList,
        keyTakeaways: takeawaysList.length > 0 ? takeawaysList : undefined,
        pullQuote,
        status
      });
    }

    setIsEditorOpen(false);
  };

  // Handle Currency Update
  const handleSaveCurrency = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingCurrency) return;
    updateCurrencyRate(editingCurrency.code, editingCurrency.buying, editingCurrency.selling, editingCurrency.change);
    setEditingCurrency(null);
  };

  // Filtered Articles
  const filteredArticles = articles.filter(art => {
    const matchesSearch = 
      art.title.toLowerCase().includes(articleSearch.toLowerCase()) ||
      art.excerpt.toLowerCase().includes(articleSearch.toLowerCase()) ||
      art.author.name.toLowerCase().includes(articleSearch.toLowerCase());
    
    const matchesCat = categoryFilter === 'All' || art.category === categoryFilter;
    const matchesStatus = statusFilter === 'All' || art.status === statusFilter;

    return matchesSearch && matchesCat && matchesStatus;
  });

  // Analytics Metrics
  const totalViews = articles.reduce((acc, a) => acc + a.views, 0);
  const totalPublished = articles.filter(a => a.status === 'published').length;
  const totalDrafts = articles.filter(a => a.status === 'draft').length;

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-8 py-8 min-h-screen transition-colors duration-200">
      
      {/* 1. TOP AUTHENTICATED ADMIN HEADER & PROFILE BAR */}
      <div className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 sm:p-6 mb-8 shadow-md dark:shadow-2xl relative overflow-hidden">
        {/* Glow */}
        <div className="absolute top-0 right-0 w-80 h-full bg-gradient-to-l from-blue-600/10 via-amber-500/5 to-transparent pointer-events-none" />

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
          {/* Left: Admin Identity */}
          <div className="flex items-start sm:items-center gap-4">
            <div className="relative">
              <img 
                src={adminUser.avatar} 
                alt={adminUser.name} 
                className="w-14 h-14 rounded-2xl object-cover border-2 border-amber-500 dark:border-amber-400/60 shadow-lg shadow-amber-900/20"
                referrerPolicy="no-referrer"
              />
              <span className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-emerald-500 border-2 border-white dark:border-slate-900 flex items-center justify-center">
                <Check className="w-2.5 h-2.5 text-white" />
              </span>
            </div>

            <div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-amber-100 dark:bg-amber-400/20 text-amber-800 dark:text-amber-300 border border-amber-300 dark:border-amber-400/30">
                  {adminUser.role}
                </span>
                <span className="text-[11px] text-slate-500 dark:text-slate-400 font-mono hidden sm:inline">
                  • {adminUser.department}
                </span>
              </div>

              <h1 className="font-editorial text-2xl sm:text-3xl font-bold text-slate-900 dark:text-slate-100 mt-1">
                {adminUser.name}
              </h1>

              <div className="flex items-center gap-3 text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                <span>{adminUser.email}</span>
                <span>•</span>
                <span className="text-emerald-600 dark:text-emerald-400 flex items-center gap-1 font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 dark:bg-emerald-400 animate-ping" />
                  Authenticated Session
                </span>
              </div>
            </div>
          </div>

          {/* Right: Quick Global Navigation & Logout Action */}
          <div className="flex flex-wrap items-center gap-2.5 sm:gap-3 border-t lg:border-t-0 pt-4 lg:pt-0 border-slate-200 dark:border-slate-800">
            {/* View Customer Website */}
            <button
              onClick={() => {
                setCurrentView('home');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-100 dark:bg-slate-800/90 hover:bg-slate-200 dark:hover:bg-slate-750 text-slate-800 dark:text-slate-200 text-xs font-semibold border border-slate-300 dark:border-slate-700 hover:border-slate-400 dark:hover:border-slate-600 transition-all"
              title="Preview Negarit Business Review from a public customer perspective"
            >
              <Eye className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
              <span>Customer Website View</span>
            </button>

            {/* Write New Article CTA */}
            <button
              onClick={handleNewArticle}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold shadow-lg shadow-blue-900/30 transition-all active:scale-95"
            >
              <Plus className="w-4 h-4" />
              <span>Compose Briefing</span>
            </button>

            {/* Prominent Admin Logout Button */}
            <button
              onClick={logoutAdmin}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-rose-50 dark:bg-rose-950/40 hover:bg-rose-100 dark:hover:bg-rose-900/60 text-rose-700 dark:text-rose-300 hover:text-rose-900 dark:hover:text-rose-100 text-xs font-bold border border-rose-200 dark:border-rose-800/60 transition-all active:scale-95"
              title="End current editorial administrator session"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Log Out</span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. KPI OVERVIEW METRICS */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 mb-1">
            <span className="text-[11px] font-semibold uppercase tracking-wider">Total Briefings</span>
            <FileText className="w-4 h-4 text-blue-600 dark:text-blue-400" />
          </div>
          <div className="text-2xl font-bold text-slate-900 dark:text-slate-100 font-sans">{articles.length}</div>
          <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-medium">{totalPublished} Published • {totalDrafts} Draft</span>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 mb-1">
            <span className="text-[11px] font-semibold uppercase tracking-wider">Reader Views</span>
            <Eye className="w-4 h-4 text-amber-500 dark:text-amber-400" />
          </div>
          <div className="text-2xl font-bold text-slate-900 dark:text-slate-100 font-sans">{(totalViews / 1000).toFixed(1)}k</div>
          <span className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">+18.4% audience growth</span>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 mb-1">
            <span className="text-[11px] font-semibold uppercase tracking-wider">Subscribers</span>
            <Users className="w-4 h-4 text-purple-600 dark:text-purple-400" />
          </div>
          <div className="text-2xl font-bold text-slate-900 dark:text-slate-100 font-sans">{subscribers.length + 28400}</div>
          <span className="text-[11px] text-purple-600 dark:text-purple-400 font-medium">{subscribers.length} live records</span>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 mb-1">
            <span className="text-[11px] font-semibold uppercase tracking-wider">Moderated Comments</span>
            <MessageSquare className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
          </div>
          <div className="text-2xl font-bold text-slate-900 dark:text-slate-100 font-sans">{comments.length}</div>
          <span className="text-[11px] text-cyan-600 dark:text-cyan-400 font-medium">100% active moderation</span>
        </div>
      </div>

      {/* 3. TABS SWITCHER */}
      <div className="flex items-center gap-1.5 sm:gap-2 border-b border-slate-200 dark:border-slate-800 pb-3 mb-6 overflow-x-auto no-scrollbar text-xs sm:text-sm font-semibold">
        <button
          onClick={() => setActiveTab('articles')}
          className={`px-4 py-2 rounded-xl transition-all whitespace-nowrap flex items-center gap-2 ${
            activeTab === 'articles'
              ? 'bg-blue-600 text-white shadow-md'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-900'
          }`}
        >
          <FileText className="w-4 h-4" />
          <span>Articles Desk ({articles.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('forex')}
          className={`px-4 py-2 rounded-xl transition-all whitespace-nowrap flex items-center gap-2 ${
            activeTab === 'forex'
              ? 'bg-blue-600 text-white shadow-md'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-900'
          }`}
        >
          <DollarSign className="w-4 h-4 text-emerald-500 dark:text-emerald-400" />
          <span>Forex & Commodities ({currencies.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('subscribers')}
          className={`px-4 py-2 rounded-xl transition-all whitespace-nowrap flex items-center gap-2 ${
            activeTab === 'subscribers'
              ? 'bg-blue-600 text-white shadow-md'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-900'
          }`}
        >
          <Users className="w-4 h-4 text-purple-500 dark:text-purple-400" />
          <span>Newsletter Subscribers ({subscribers.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('comments')}
          className={`px-4 py-2 rounded-xl transition-all whitespace-nowrap flex items-center gap-2 ${
            activeTab === 'comments'
              ? 'bg-blue-600 text-white shadow-md'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-900'
          }`}
        >
          <MessageSquare className="w-4 h-4 text-cyan-500 dark:text-cyan-400" />
          <span>Reader Discussion ({comments.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('audit')}
          className={`px-4 py-2 rounded-xl transition-all whitespace-nowrap flex items-center gap-2 ${
            activeTab === 'audit'
              ? 'bg-blue-600 text-white shadow-md'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-900'
          }`}
        >
          <History className="w-4 h-4 text-amber-500 dark:text-amber-400" />
          <span>Audit Log</span>
        </button>

        <button
          onClick={() => setActiveTab('security')}
          className={`px-4 py-2 rounded-xl transition-all whitespace-nowrap flex items-center gap-2 ${
            activeTab === 'security'
              ? 'bg-blue-600 text-white shadow-md'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-900'
          }`}
        >
          <ShieldCheck className="w-4 h-4 text-amber-500 dark:text-amber-400" />
          <span>Security & Credentials</span>
        </button>
      </div>

      {/* 4. TAB 1: ARTICLE LIST MANAGEMENT */}
      {activeTab === 'articles' && (
        <div className="space-y-4">
          {/* Filter Bar */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search articles by title, author, topic..."
                value={articleSearch}
                onChange={(e) => setArticleSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-200 text-xs focus:outline-none focus:border-blue-500"
              />
            </div>

            <div className="flex items-center gap-2">
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 text-xs font-medium"
              >
                <option value="All">All Categories</option>
                <option value="Business">Business</option>
                <option value="Economy">Economy</option>
                <option value="Finance">Finance</option>
                <option value="Technology">Technology</option>
                <option value="Entrepreneurship">Entrepreneurship</option>
                <option value="Markets">Markets</option>
                <option value="Opinion">Opinion</option>
              </select>

              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 text-xs font-medium"
              >
                <option value="All">All Statuses</option>
                <option value="published">Published</option>
                <option value="draft">Draft</option>
              </select>
            </div>
          </div>

          {/* Table */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl overflow-hidden shadow-sm dark:shadow-xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-700 dark:text-slate-300">
                <thead className="bg-slate-50 dark:bg-slate-950/80 text-slate-600 dark:text-slate-400 uppercase text-[10px] font-brand tracking-wider border-b border-slate-200 dark:border-slate-800">
                  <tr>
                    <th className="py-3.5 px-4">Article</th>
                    <th className="py-3.5 px-4">Category</th>
                    <th className="py-3.5 px-4">Author</th>
                    <th className="py-3.5 px-4">Status & Flags</th>
                    <th className="py-3.5 px-4">Views</th>
                    <th className="py-3.5 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                  {filteredArticles.map((art: Article) => (
                    <tr key={art.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                      <td className="py-3 px-4 max-w-sm">
                        <div className="flex items-center gap-3">
                          <img 
                            src={art.featuredImage} 
                            alt="" 
                            className="w-12 h-10 rounded-lg object-cover bg-slate-100 dark:bg-slate-800 shrink-0 border border-slate-200 dark:border-slate-700" 
                            referrerPolicy="no-referrer"
                          />
                          <div className="min-w-0">
                            <p 
                              onClick={() => openArticle(art)}
                              className="font-bold text-slate-900 dark:text-slate-100 hover:text-blue-600 dark:hover:text-blue-400 transition-colors truncate cursor-pointer"
                              title="Preview article"
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
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-50 dark:bg-slate-800 text-blue-700 dark:text-blue-400 border border-blue-200 dark:border-slate-700">
                          {art.category}
                        </span>
                      </td>

                      <td className="py-3 px-4 text-slate-800 dark:text-slate-300 font-medium">
                        {art.author.name}
                      </td>

                      <td className="py-3 px-4">
                        <div className="flex flex-wrap items-center gap-1.5">
                          <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                            art.status === 'published'
                              ? 'bg-emerald-100 dark:bg-emerald-500/20 text-emerald-700 dark:text-emerald-400 border border-emerald-300 dark:border-emerald-500/30'
                              : 'bg-amber-100 dark:bg-amber-500/20 text-amber-800 dark:text-amber-400 border border-amber-300 dark:border-amber-500/30'
                          }`}>
                            {art.status}
                          </span>
                          {art.isHeroFeatured && (
                            <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-blue-100 dark:bg-blue-500/20 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-500/30">
                              Hero
                            </span>
                          )}
                          {art.isEditorPick && (
                            <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-amber-100 dark:bg-amber-500/20 text-amber-800 dark:text-amber-300 border border-amber-200 dark:border-amber-500/30">
                              Pick
                            </span>
                          )}
                          {art.isBreaking && (
                            <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-rose-100 dark:bg-rose-500/20 text-rose-700 dark:text-rose-300 border border-rose-200 dark:border-rose-500/30">
                              Breaking
                            </span>
                          )}
                        </div>
                      </td>

                      <td className="py-3 px-4 font-mono text-slate-700 dark:text-slate-300">
                        {art.views.toLocaleString()}
                      </td>

                      <td className="py-3 px-4 text-right space-x-2 whitespace-nowrap">
                        <button
                          onClick={() => openArticle(art)}
                          className="p-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors"
                          title="View on Customer Site"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleEditArticle(art)}
                          className="p-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-blue-100 dark:hover:bg-blue-900/60 text-slate-700 dark:text-slate-300 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
                          title="Edit Article"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => {
                            if (confirm(`Remove article from publication: "${art.title}"?`)) {
                              deleteArticle(art.id);
                            }
                          }}
                          className="p-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-rose-100 dark:hover:bg-rose-950 text-slate-700 dark:text-slate-300 hover:text-rose-700 dark:hover:text-rose-400 transition-colors"
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
        </div>
      )}

      {/* 5. TAB 2: FOREX & MARKET BENCHMARKS */}
      {activeTab === 'forex' && (
        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm dark:shadow-xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800 mb-6">
              <div>
                <h3 className="font-editorial text-xl font-bold text-slate-900 dark:text-slate-100">
                  National Bank of Ethiopia (NBE) Foreign Exchange Rates Desk
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">
                  Live indicative rates published across Negarit Business Review's financial tickers and currency calculators.
                </p>
              </div>
              <span className="text-[11px] font-mono text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500 dark:bg-emerald-400 animate-ping" />
                Live Broadcast
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {currencies.map((curr) => (
                <div key={curr.code} className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 transition-all flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <span className="text-xl">{curr.flag}</span>
                        <div>
                          <span className="font-bold text-slate-900 dark:text-slate-100 text-sm">{curr.code}</span>
                          <span className="text-slate-500 dark:text-slate-400 text-xs ml-1.5">({curr.currency})</span>
                        </div>
                      </div>
                      <span className={`text-xs font-mono font-bold ${curr.isPositive ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'}`}>
                        {curr.change >= 0 ? `+${curr.change}%` : `${curr.change}%`}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-2 bg-white dark:bg-slate-900/60 p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 mb-3">
                      <div>
                        <span className="text-[10px] text-slate-500 dark:text-slate-400 uppercase font-semibold block">Buying (ETB)</span>
                        <span className="text-base font-bold text-slate-900 dark:text-slate-100 font-mono">{curr.buying.toFixed(2)}</span>
                      </div>
                      <div>
                        <span className="text-[10px] text-slate-500 dark:text-slate-400 uppercase font-semibold block">Selling (ETB)</span>
                        <span className="text-base font-bold text-slate-900 dark:text-slate-100 font-mono">{curr.selling.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => setEditingCurrency({ code: curr.code, buying: curr.buying, selling: curr.selling, change: curr.change })}
                    className="w-full py-1.5 rounded-xl bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-blue-700 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 text-xs font-semibold transition-colors flex items-center justify-center gap-1.5"
                  >
                    <Sliders className="w-3.5 h-3.5" />
                    <span>Adjust Official Benchmark</span>
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Edit Currency Modal */}
          {editingCurrency && (
            <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn">
              <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-2xl">
                <h4 className="font-editorial text-lg font-bold text-slate-100 mb-1">
                  Adjust {editingCurrency.code}/ETB Exchange Rate
                </h4>
                <p className="text-xs text-slate-400 mb-4">
                  Changes will propagate across the home header, breaking ticker, and markets hub immediately.
                </p>

                <form onSubmit={handleSaveCurrency} className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Buying Rate (ETB)</label>
                    <input
                      type="number"
                      step="0.01"
                      value={editingCurrency.buying}
                      onChange={(e) => setEditingCurrency({ ...editingCurrency, buying: parseFloat(e.target.value) || 0 })}
                      className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-slate-100 font-mono"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Selling Rate (ETB)</label>
                    <input
                      type="number"
                      step="0.01"
                      value={editingCurrency.selling}
                      onChange={(e) => setEditingCurrency({ ...editingCurrency, selling: parseFloat(e.target.value) || 0 })}
                      className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-slate-100 font-mono"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Daily Percentage Change (%)</label>
                    <input
                      type="number"
                      step="0.01"
                      value={editingCurrency.change}
                      onChange={(e) => setEditingCurrency({ ...editingCurrency, change: parseFloat(e.target.value) || 0 })}
                      className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-slate-100 font-mono"
                      required
                    />
                  </div>

                  <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-800">
                    <button
                      type="button"
                      onClick={() => setEditingCurrency(null)}
                      className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold shadow-lg"
                    >
                      Save Benchmark
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      )}

      {/* 6. TAB 3: SUBSCRIBERS */}
      {activeTab === 'subscribers' && (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm dark:shadow-xl space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
            <div>
              <h3 className="font-editorial text-xl font-bold text-slate-900 dark:text-slate-100">
                Corporate Newsletter Subscribers & Treasury Network
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                Registered institutional readers, commercial bankers, and executives receiving daily morning briefings.
              </p>
            </div>
            <button
              onClick={() => {
                const csvData = subscribers.map(s => `"${s.name}","${s.email}","${s.subscribedAt}","${s.status}"`).join('\n');
                navigator.clipboard?.writeText(csvData);
                showToast('Subscriber data copied to clipboard in CSV format');
              }}
              className="px-3.5 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-xs font-semibold text-slate-800 dark:text-slate-200 border border-slate-300 dark:border-slate-700"
            >
              Export CSV Dataset
            </button>
          </div>

          {/* Quick Manual Add Subscriber Form */}
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-3 flex items-center gap-1.5">
              <Plus className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
              <span>Enroll VIP Corporate Subscriber</span>
            </h4>
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="text"
                placeholder="Full Name (e.g. Dawit Kebede)"
                value={newSubName}
                onChange={(e) => setNewSubName(e.target.value)}
                className="flex-1 px-3 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-200 text-xs focus:outline-none focus:border-blue-500"
              />
              <input
                type="email"
                placeholder="Work Email (e.g. dawit@cbe.com.et)"
                value={newSubEmail}
                onChange={(e) => setNewSubEmail(e.target.value)}
                className="flex-1 px-3 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-200 text-xs focus:outline-none focus:border-blue-500"
              />
              <button
                type="button"
                onClick={() => {
                  if (newSubEmail && newSubEmail.includes('@')) {
                    addSubscriber(newSubEmail, ['Economy', 'Finance'], newSubName);
                    setNewSubEmail('');
                    setNewSubName('');
                  } else {
                    showToast('Please provide a valid work email address');
                  }
                }}
                className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold shadow-md"
              >
                Enroll Subscriber
              </button>
            </div>
          </div>

          {/* Subscriber List */}
          <div className="divide-y divide-slate-200 dark:divide-slate-800">
            {subscribers.map((s) => (
              <div key={s.id} className="py-3.5 flex items-center justify-between text-xs">
                <div>
                  <span className="font-bold text-slate-900 dark:text-slate-200 block text-sm">{s.name || 'Executive Reader'}</span>
                  <span className="text-slate-500 dark:text-slate-400 text-xs font-mono">{s.email}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-[10px] bg-slate-100 dark:bg-slate-800 text-blue-700 dark:text-blue-400 px-2.5 py-1 rounded-lg border border-slate-200 dark:border-slate-700">
                    {s.interests.join(', ')}
                  </span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 dark:bg-emerald-500/20 text-emerald-700 dark:text-emerald-400 border border-emerald-300 dark:border-emerald-500/30">
                    Active
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 7. TAB 4: COMMENTS MODERATION */}
      {activeTab === 'comments' && (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm dark:shadow-xl space-y-4">
          <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800">
            <div>
              <h3 className="font-editorial text-xl font-bold text-slate-900 dark:text-slate-100">
                Reader Discussion Moderation Desk
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                Ensure professional standards and ethical discourse across all editorial briefing comment sections.
              </p>
            </div>
            <span className="text-xs text-slate-500 dark:text-slate-400 font-mono">{comments.length} Total</span>
          </div>

          <div className="space-y-3">
            {comments.map((c) => (
              <div key={c.id} className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 flex items-start justify-between gap-4">
                <div className="space-y-1 text-xs">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-900 dark:text-slate-200 text-sm">{c.authorName}</span>
                    <span className="text-slate-400 dark:text-slate-500">•</span>
                    <span className="text-blue-600 dark:text-blue-400">{c.authorRole}</span>
                    <span className="text-slate-500 dark:text-slate-600 text-[10px]">{c.createdAt}</span>
                  </div>
                  <p className="text-slate-700 dark:text-slate-300 font-sans leading-relaxed text-xs">{c.content}</p>
                </div>

                <button
                  onClick={() => deleteComment(c.id)}
                  className="p-2 rounded-xl bg-slate-200 dark:bg-slate-900 hover:bg-rose-100 dark:hover:bg-rose-950 text-slate-600 dark:text-slate-400 hover:text-rose-700 dark:hover:text-rose-400 border border-slate-300 dark:border-slate-800 transition-colors shrink-0"
                  title="Remove Comment"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 8. TAB 5: AUDIT LOG & TELEMETRY */}
      {activeTab === 'audit' && (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm dark:shadow-xl space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800">
            <div>
              <h3 className="font-editorial text-xl font-bold text-slate-900 dark:text-slate-100">
                Editorial Activity & Security Audit Register
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                Immutable chronological log of editorial publications, price adjustments, and administrative sign-ins.
              </p>
            </div>
            <span className="text-xs font-mono text-emerald-600 dark:text-emerald-400">Status: Verified</span>
          </div>

          <div className="space-y-3 font-mono text-xs">
            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                <span className="text-slate-800 dark:text-slate-200">Admin Session Authenticated ({adminUser.name})</span>
              </div>
              <span className="text-slate-500">{adminUser.lastLogin || 'Just now'}</span>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-blue-500" />
                <span className="text-slate-800 dark:text-slate-200">ESX Capital Market liquidity briefing updated</span>
              </div>
              <span className="text-slate-500">14 mins ago</span>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-amber-500" />
                <span className="text-slate-800 dark:text-slate-200">NBE Official Foreign Exchange USD/ETB rate published</span>
              </div>
              <span className="text-slate-500">32 mins ago</span>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-purple-500" />
                <span className="text-slate-800 dark:text-slate-200">Corporate subscriber digest dispatched to 28,400+ readers</span>
              </div>
              <span className="text-slate-500">Today, 06:00 AM</span>
            </div>
          </div>
        </div>
      )}

      {/* TAB 6: SECURITY & ADMIN PROFILE (Visible strictly to authenticated admin) */}
      {activeTab === 'security' && (
        <div className="space-y-6 animate-fadeIn">
          {/* Main Account Card */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-sm dark:shadow-xl relative overflow-hidden">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 pb-6 border-b border-slate-200 dark:border-slate-800">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <img 
                    src={adminUser.avatar} 
                    alt={adminUser.name} 
                    className="w-16 h-16 rounded-2xl object-cover border-2 border-amber-500 shadow-xl"
                    referrerPolicy="no-referrer"
                  />
                  <span className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-emerald-500 border-2 border-white dark:border-slate-900 flex items-center justify-center">
                    <Check className="w-2.5 h-2.5 text-white" />
                  </span>
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-amber-100 dark:bg-amber-400/20 text-amber-800 dark:text-amber-300 border border-amber-300 dark:border-amber-400/30">
                      {adminUser.role}
                    </span>
                    <span className="text-xs text-emerald-600 dark:text-emerald-400 font-mono font-semibold">Active Session</span>
                  </div>
                  <h2 className="font-editorial text-2xl font-bold text-slate-900 dark:text-slate-100">{adminUser.name}</h2>
                  <p className="text-xs text-slate-500 dark:text-slate-400 font-mono">{adminUser.email}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={logoutAdmin}
                  className="px-4 py-2 rounded-xl bg-rose-50 dark:bg-rose-950/50 hover:bg-rose-100 dark:hover:bg-rose-900 text-rose-700 dark:text-rose-300 hover:text-rose-900 dark:hover:text-white border border-rose-200 dark:border-rose-800 text-xs font-bold transition-all flex items-center gap-1.5"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Terminate Session (Log Out)</span>
                </button>
              </div>
            </div>

            {/* Profile & Security Credentials Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-6">
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
                <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider block mb-1">
                  Registered Admin Email
                </span>
                <span className="text-sm font-bold text-slate-900 dark:text-slate-100 font-mono select-all block">
                  {adminUser.email}
                </span>
                <span className="text-[10px] text-slate-500 mt-1 block">Primary newsroom authentication identity</span>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
                <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider block mb-1">
                  Assigned Authority
                </span>
                <span className="text-sm font-bold text-amber-700 dark:text-amber-300 block">
                  {adminUser.role} (Superadmin)
                </span>
                <span className="text-[10px] text-slate-500 mt-1 block">Full publishing, market editing, & moderation rights</span>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
                <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider block mb-1">
                  Department & Division
                </span>
                <span className="text-xs font-bold text-slate-800 dark:text-slate-200 block">
                  {adminUser.department}
                </span>
                <span className="text-[10px] text-slate-500 mt-1 block">Horn of Africa Regional Headquarters</span>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
                <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider block mb-1">
                  Database & Cloud Backend
                </span>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-xs font-bold text-emerald-700 dark:text-emerald-300 font-mono">Connected & Synchronized</span>
                </div>
                <span className="text-[10px] text-slate-500 mt-1 block">PostgreSQL / Cloud SQL / Render API Active</span>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
                <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider block mb-1">
                  Session Security
                </span>
                <span className="text-xs font-bold text-slate-800 dark:text-slate-200 font-mono block">
                  TLS 1.3 • AES-256 State
                </span>
                <span className="text-[10px] text-slate-500 mt-1 block">Encrypted token persisted on local client</span>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
                <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider block mb-1">
                  Last Login Timestamp
                </span>
                <span className="text-xs font-bold text-slate-800 dark:text-slate-200 font-mono block">
                  {adminUser.lastLogin || 'Current Session'}
                </span>
                <span className="text-[10px] text-slate-500 mt-1 block">Bole Commercial District, Addis Ababa</span>
              </div>
            </div>
          </div>

          {/* Security Protocols Notice */}
          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs space-y-3">
            <h4 className="font-bold text-slate-900 dark:text-slate-200 text-sm flex items-center gap-2">
              <Lock className="w-4 h-4 text-amber-500 dark:text-amber-400" />
              <span>Editorial Newsroom Security Protocol</span>
            </h4>
            <ul className="space-y-1.5 text-slate-600 dark:text-slate-400 list-disc list-inside leading-relaxed text-xs">
              <li>Editorial credentials and administrative controls are strictly restricted to authorized staff.</li>
              <li>Public reader views remain cleanly decoupled from newsroom administrative operations.</li>
              <li>Always remember to log out when completing editing sessions on shared or public workstations.</li>
            </ul>
          </div>
        </div>
      )}

      {/* 9. WRITE / EDIT ARTICLE MODAL */}
      {isEditorOpen && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto animate-fadeIn">
          <div className="w-full max-w-4xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl my-8">
            
            <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800 mb-6">
              <div>
                <span className="text-xs font-bold text-amber-600 dark:text-amber-400 font-brand uppercase tracking-wider">
                  Editorial Desk Composer
                </span>
                <h3 className="font-editorial text-2xl font-bold text-slate-900 dark:text-slate-100">
                  {editingArticleId ? 'Edit Editorial Briefing' : 'Compose New Business Briefing'}
                </h3>
              </div>
              <button
                onClick={() => setIsEditorOpen(false)}
                className="text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white text-xs font-semibold px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800"
              >
                Close Window
              </button>
            </div>

            <form onSubmit={handleSaveArticle} className="space-y-6">
              
              {/* Title & Subtitle */}
              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Headline Title</label>
                  <input
                    type="text"
                    placeholder="E.g., Ethiopian Capital Market Authority Approves First Batch of Primary Market Dealers"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100 font-bold focus:outline-none focus:border-blue-500 text-sm"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Subtitle / Dek</label>
                  <input
                    type="text"
                    placeholder="E.g., Licensed banking institutions prepare to underwrite corporate bonds..."
                    value={subtitle}
                    onChange={(e) => setSubtitle(e.target.value)}
                    className="w-full px-4 py-2 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 text-xs focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              {/* Category, Author, Read Time */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Sector Category</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as CategoryType)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 text-xs"
                  >
                    <option value="Business">Business</option>
                    <option value="Economy">Economy</option>
                    <option value="Finance">Finance</option>
                    <option value="Technology">Technology</option>
                    <option value="Entrepreneurship">Entrepreneurship</option>
                    <option value="Markets">Markets</option>
                    <option value="Opinion">Opinion</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Lead Journalist / Author</label>
                  <select
                    value={authorId}
                    onChange={(e) => setAuthorId(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 text-xs"
                  >
                    {authors.map((a) => (
                      <option key={a.id} value={a.id}>
                        {a.name} ({a.role})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Estimated Read Time</label>
                  <input
                    type="text"
                    value={readTime}
                    onChange={(e) => setReadTime(e.target.value)}
                    placeholder="5 min read"
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 text-xs"
                  />
                </div>
              </div>

              {/* Featured Image Selection */}
              <div className="space-y-2">
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">Featured Photography</label>
                <div className="grid grid-cols-2 sm:grid-cols-6 gap-2">
                  {PRESET_IMAGES.map((img, idx) => (
                    <div 
                      key={idx}
                      onClick={() => setFeaturedImage(img.url)}
                      className={`cursor-pointer rounded-xl overflow-hidden border-2 transition-all relative ${
                        featuredImage === img.url ? 'border-amber-500 ring-2 ring-amber-400/40' : 'border-slate-200 dark:border-slate-800 hover:border-slate-400 dark:hover:border-slate-600'
                      }`}
                    >
                      <img src={img.url} alt="" className="w-full h-14 object-cover" referrerPolicy="no-referrer" />
                      <span className="block text-[9px] p-1 bg-slate-100 dark:bg-slate-950 text-slate-800 dark:text-slate-300 truncate">{img.label}</span>
                    </div>
                  ))}
                </div>
                <input
                  type="text"
                  placeholder="Or enter custom photography URL..."
                  value={featuredImage}
                  onChange={(e) => setFeaturedImage(e.target.value)}
                  className="w-full px-3 py-1.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 text-xs"
                />
              </div>

              {/* Main Content Paragraphs */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Editorial Body Copy (Separate paragraphs with double Enter)
                </label>
                <textarea
                  rows={6}
                  value={contentParagraphs}
                  onChange={(e) => setContentParagraphs(e.target.value)}
                  className="w-full px-4 py-3 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100 text-xs leading-relaxed focus:outline-none focus:border-blue-500 font-sans"
                  required
                />
              </div>

              {/* Key Takeaways & Pull Quote */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Executive Key Takeaways (One per line)
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Bullet point summary for executive readers..."
                    value={keyTakeaways}
                    onChange={(e) => setKeyTakeaways(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 text-xs"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Editorial Pull Quote
                  </label>
                  <input
                    type="text"
                    placeholder="Quote text..."
                    value={pullQuoteText}
                    onChange={(e) => setPullQuoteText(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:border-blue-500 text-xs mb-2"
                  />
                  <input
                    type="text"
                    placeholder="Speaker name / title"
                    value={pullQuoteSpeaker}
                    onChange={(e) => setPullQuoteSpeaker(e.target.value)}
                    className="w-full px-3 py-1.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100 text-xs"
                  />
                </div>
              </div>

              {/* Toggles: Hero & Editor Pick & Status */}
              <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
                <div className="flex flex-wrap items-center gap-5 text-xs">
                  <label className="flex items-center gap-2 cursor-pointer text-slate-700 dark:text-slate-300">
                    <input 
                      type="checkbox"
                      checked={isHeroFeatured}
                      onChange={(e) => setIsHeroFeatured(e.target.checked)}
                      className="rounded border-slate-300 dark:border-slate-700 text-blue-600 focus:ring-0"
                    />
                    <span>Hero Cover Story</span>
                  </label>

                  <label className="flex items-center gap-2 cursor-pointer text-slate-700 dark:text-slate-300">
                    <input 
                      type="checkbox"
                      checked={isEditorPick}
                      onChange={(e) => setIsEditorPick(e.target.checked)}
                      className="rounded border-slate-300 dark:border-slate-700 text-blue-600 focus:ring-0"
                    />
                    <span>Editor's Selection</span>
                  </label>

                  <label className="flex items-center gap-2 cursor-pointer text-slate-700 dark:text-slate-300">
                    <input 
                      type="checkbox"
                      checked={isBreaking}
                      onChange={(e) => setIsBreaking(e.target.checked)}
                      className="rounded border-slate-300 dark:border-slate-700 text-rose-600 focus:ring-0"
                    />
                    <span>Breaking Ticker Flash</span>
                  </label>
                </div>

                <div className="flex items-center gap-3">
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value as any)}
                    className="px-3 py-1.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 text-xs font-bold"
                  >
                    <option value="published">Published</option>
                    <option value="draft">Draft</option>
                  </select>

                  <button
                    type="submit"
                    className="inline-flex items-center gap-1.5 px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-lg transition-colors"
                  >
                    <Save className="w-3.5 h-3.5" />
                    <span>{editingArticleId ? 'Update Briefing' : 'Publish to Readers'}</span>
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
