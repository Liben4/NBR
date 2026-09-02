import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Plus, 
  FileText, 
  FolderTree, 
  Image as ImageIcon, 
  Star, 
  TrendingUp, 
  DollarSign, 
  Users, 
  MessageSquare, 
  Search, 
  Filter, 
  Eye, 
  Edit3, 
  Trash2, 
  Calendar, 
  Clock, 
  CheckCircle, 
  CheckCircle2, 
  AlertCircle, 
  ArrowUp, 
  ArrowDown, 
  Upload, 
  Copy, 
  Sparkles, 
  LogOut, 
  ArrowLeft, 
  RefreshCw, 
  ExternalLink, 
  Save, 
  Send, 
  Tag, 
  Sliders, 
  Flame, 
  Layers, 
  MoreVertical, 
  Check, 
  X,
  FileCheck,
  Archive,
  Lock,
  Globe
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Article, CategoryItem, MediaItem, ArticleStatus, CategoryType } from '../types';
import { AdminLogin } from './AdminLogin';
import { ArticlePreviewModal } from './ArticlePreviewModal';
import { MediaPickerModal } from './MediaPickerModal';
import { CommentModerationTab } from './admin/CommentModerationTab';
import { ContentPerformanceTab } from './admin/ContentPerformanceTab';
import { AdminSecurityTab } from './admin/AdminSecurityTab';

type AdminTab = 'articles' | 'categories' | 'media' | 'featured' | 'performance' | 'forex' | 'subscribers' | 'comments' | 'security';

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
    publishArticle,
    draftArticle,
    archiveArticle,
    scheduleArticle,
    categories,
    addCategory,
    updateCategory,
    deleteCategory,
    reorderCategories,
    mediaLibrary,
    addMediaItem,
    updateMediaItem,
    deleteMediaItem,
    featuredConfig,
    updateFeaturedConfig,
    breakingNews,
    setBreakingNews,
    addBreakingNews,
    deleteBreakingNews,
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
  const [activeTab, setActiveTab] = useState<AdminTab>('articles');

  // ===================== ARTICLE MANAGEMENT STATE =====================
  const [articleSearch, setArticleSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [editingArticleId, setEditingArticleId] = useState<string | null>(null);

  // Form fields
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [contentParagraphs, setContentParagraphs] = useState('');
  const [category, setCategory] = useState<CategoryType>('Business');
  const [authorId, setAuthorId] = useState(authors[0]?.id || 'auth-1');
  const [featuredImage, setFeaturedImage] = useState('');
  const [imageCaption, setImageCaption] = useState('');
  const [featuredImageCredit, setFeaturedImageCredit] = useState('');
  const [sourceReference, setSourceReference] = useState('');
  const [readTime, setReadTime] = useState('5 min read');
  const [tags, setTags] = useState('Ethiopia, Economy, ESX');
  const [status, setStatus] = useState<ArticleStatus>('published');
  const [scheduledDate, setScheduledDate] = useState('');
  const [isHeroFeatured, setIsHeroFeatured] = useState(false);
  const [isTopStory, setIsTopStory] = useState(false);
  const [isTrending, setIsTrending] = useState(false);
  const [isEditorPick, setIsEditorPick] = useState(false);
  const [isBreaking, setIsBreaking] = useState(false);
  const [keyTakeaways, setKeyTakeaways] = useState('');
  const [pullQuoteText, setPullQuoteText] = useState('');
  const [pullQuoteSpeaker, setPullQuoteSpeaker] = useState('');
  const [pullQuoteRole, setPullQuoteRole] = useState('');

  // Preview Modal state
  const [previewArticleData, setPreviewArticleData] = useState<Partial<Article> | null>(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  // Media Picker state inside editor
  const [isMediaPickerOpen, setIsMediaPickerOpen] = useState(false);

  // ===================== CATEGORY MANAGEMENT STATE =====================
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [editingCategoryId, setEditingCategoryId] = useState<string | null>(null);
  const [categoryNameInput, setCategoryNameInput] = useState('');
  const [categoryDescInput, setCategoryDescInput] = useState('');
  const [categoryColorInput, setCategoryColorInput] = useState('blue');

  // ===================== MEDIA MANAGEMENT STATE =====================
  const [mediaSearch, setMediaSearch] = useState('');
  const [selectedMediaCategory, setSelectedMediaCategory] = useState('All');
  const [isMediaUploadModalOpen, setIsMediaUploadModalOpen] = useState(false);
  const [selectedMediaForEdit, setSelectedMediaForEdit] = useState<MediaItem | null>(null);
  const [mediaUploadTitle, setMediaUploadTitle] = useState('');
  const [mediaUploadUrl, setMediaUploadUrl] = useState('');
  const [mediaUploadCaption, setMediaUploadCaption] = useState('');
  const [mediaUploadCredit, setMediaUploadCredit] = useState('');
  const [mediaUploadCategory, setMediaUploadCategory] = useState('Business');

  // ===================== FEATURED CONTENT STATE =====================
  const [newBreakingInput, setNewBreakingInput] = useState('');

  // ===================== FOREX & SUBSCRIBERS STATE =====================
  const [editingCurrency, setEditingCurrency] = useState<{ code: string; buying: number; selling: number; change: number } | null>(null);
  const [newSubEmail, setNewSubEmail] = useState('');
  const [newSubName, setNewSubName] = useState('');

  // Open editor for creating a new article
  const handleNewArticle = () => {
    setEditingArticleId(null);
    setTitle('');
    setSubtitle('');
    setContentParagraphs('The National Bank of Ethiopia has introduced enhanced market-based pricing benchmarks to accelerate capital allocation across the financial sector...\n\nCommercial banks and institutional funds have recorded strong interbank settlement volumes as digital public infrastructure adoption widens.\n\nLooking ahead, regional economic analysts forecast sustained private capital inflows as the Ethiopian Securities Exchange (ESX) commences formal equity trading.');
    setCategory(categories[0]?.name || 'Business');
    setAuthorId(authors[0]?.id || 'auth-1');
    setFeaturedImage(mediaLibrary[0]?.url || 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&auto=format&fit=crop&q=80');
    setImageCaption('Financial district headquarters and capital markets infrastructure in Addis Ababa.');
    setFeaturedImageCredit('Negarit Business Archive');
    setSourceReference('National Bank of Ethiopia & Ethiopian Securities Exchange (ESX)');
    setReadTime('4 min read');
    setTags('Ethiopia, Banking, ESX, Capital Markets');
    setStatus('published');
    setScheduledDate('');
    setIsHeroFeatured(false);
    setIsTopStory(false);
    setIsTrending(false);
    setIsEditorPick(false);
    setIsBreaking(false);
    setKeyTakeaways('Central bank liquidity indicators maintain solid stability.\nTrading participant pipeline on ESX expands across commercial institutions.\nDigital settlement infrastructure supports foreign exchange velocity.');
    setPullQuoteText('The macroeconomic architecture is now positioned for transparent, market-driven capital formation.');
    setPullQuoteSpeaker('Dr. Eyob Tekalign');
    setPullQuoteRole('State Minister of Finance');
    setIsEditorOpen(true);
  };

  // Open editor for editing an existing article
  const handleEditArticle = (art: Article) => {
    setEditingArticleId(art.id);
    setTitle(art.title);
    setSubtitle(art.subtitle || art.excerpt || '');
    setContentParagraphs(art.content.join('\n\n'));
    setCategory(art.category);
    setAuthorId(art.author.id);
    setFeaturedImage(art.featuredImage);
    setImageCaption(art.imageCaption || '');
    setFeaturedImageCredit(art.featuredImageCredit || '');
    setSourceReference(art.sourceReference || '');
    setReadTime(art.readTime);
    setTags(art.tags.join(', '));
    setStatus(art.status || 'published');
    setScheduledDate(art.scheduledAt || '');
    setIsHeroFeatured(art.isHeroFeatured || false);
    setIsTopStory(art.isTopStory || false);
    setIsTrending(art.isTrending || false);
    setIsEditorPick(art.isEditorPick || false);
    setIsBreaking(art.isBreaking || false);
    setKeyTakeaways(art.keyTakeaways ? art.keyTakeaways.join('\n') : '');
    setPullQuoteText(art.pullQuote?.quote || '');
    setPullQuoteSpeaker(art.pullQuote?.speaker || '');
    setPullQuoteRole(art.pullQuote?.role || '');
    setIsEditorOpen(true);
  };

  // Live preview current editor state
  const handlePreviewCurrent = () => {
    const selectedAuthor = authors.find(a => a.id === authorId) || authors[0];
    const paragraphs = contentParagraphs
      .split('\n')
      .map(p => p.trim())
      .filter(p => p.length > 0);
    const parsedTags = tags
      .split(',')
      .map(t => t.trim().replace(/^#/, ''))
      .filter(t => t.length > 0);
    const parsedTakeaways = keyTakeaways
      .split('\n')
      .map(t => t.trim())
      .filter(t => t.length > 0);

    const previewObj: Partial<Article> = {
      id: editingArticleId || 'preview-temp',
      title: title.trim() || 'Untitled Headline Preview',
      subtitle: subtitle.trim() || 'Executive summary subtitle goes here.',
      excerpt: subtitle.trim() || 'Article summary excerpt.',
      content: paragraphs.length > 0 ? paragraphs : ['Article content placeholder.'],
      category,
      author: selectedAuthor,
      featuredImage: featuredImage || 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&auto=format&fit=crop&q=80',
      imageCaption: imageCaption || 'Negarit Editorial Desk Archive.',
      featuredImageCredit: featuredImageCredit || 'Negarit Editorial Archive',
      sourceReference: sourceReference || 'Official Press Disclosure',
      readTime,
      tags: parsedTags,
      keyTakeaways: parsedTakeaways,
      pullQuote: pullQuoteText.trim() ? {
        quote: pullQuoteText.trim(),
        speaker: pullQuoteSpeaker.trim() || 'Official Spokesperson',
        role: pullQuoteRole.trim() || undefined
      } : undefined,
      status,
      isHeroFeatured,
      isTopStory,
      isTrending,
      isEditorPick,
      isBreaking
    };

    setPreviewArticleData(previewObj);
    setIsPreviewOpen(true);
  };

  // Save article handler
  const handleSaveArticle = (e?: React.FormEvent, overrideStatus?: ArticleStatus) => {
    if (e) e.preventDefault();
    if (!title.trim() || !contentParagraphs.trim()) {
      showToast('Please provide an article title and content body.');
      return;
    }

    const selectedAuthor = authors.find(a => a.id === authorId) || authors[0];
    const paragraphs = contentParagraphs
      .split('\n')
      .map(p => p.trim())
      .filter(p => p.length > 0);
    const parsedTags = tags
      .split(',')
      .map(t => t.trim().replace(/^#/, ''))
      .filter(t => t.length > 0);
    const parsedTakeaways = keyTakeaways
      .split('\n')
      .map(t => t.trim())
      .filter(t => t.length > 0);

    const chosenStatus = overrideStatus || status;

    const articlePayload = {
      slug: title.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
      title: title.trim(),
      subtitle: subtitle.trim(),
      excerpt: subtitle.trim() || paragraphs[0]?.slice(0, 160) + '...',
      content: paragraphs,
      category,
      author: selectedAuthor,
      publishedAt: chosenStatus === 'published' ? new Date().toISOString() : (editingArticleId ? articles.find(a => a.id === editingArticleId)?.publishedAt || new Date().toISOString() : new Date().toISOString()),
      scheduledAt: chosenStatus === 'scheduled' ? scheduledDate || new Date(Date.now() + 86400000).toISOString() : undefined,
      readTime: readTime || '4 min read',
      featuredImage: featuredImage || 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&auto=format&fit=crop&q=80',
      imageCaption: imageCaption.trim() || 'Editorial photograph archive.',
      featuredImageCredit: featuredImageCredit.trim() || 'Negarit Editorial Desk',
      sourceReference: sourceReference.trim() || undefined,
      isHeroFeatured,
      isTopStory,
      isTrending,
      isEditorPick,
      isBreaking,
      tags: parsedTags.length > 0 ? parsedTags : ['Business', 'Ethiopia'],
      keyTakeaways: parsedTakeaways.length > 0 ? parsedTakeaways : undefined,
      pullQuote: pullQuoteText.trim() ? {
        quote: pullQuoteText.trim(),
        speaker: pullQuoteSpeaker.trim() || 'Editorial Staff',
        role: pullQuoteRole.trim() || undefined
      } : undefined,
      status: chosenStatus
    };

    if (editingArticleId) {
      updateArticle(editingArticleId, articlePayload);
    } else {
      addArticle(articlePayload);
    }

    setIsEditorOpen(false);
  };

  // Filtered articles list
  const filteredArticles = articles.filter(art => {
    const matchesSearch = art.title.toLowerCase().includes(articleSearch.toLowerCase()) ||
                          art.category.toLowerCase().includes(articleSearch.toLowerCase()) ||
                          art.author.name.toLowerCase().includes(articleSearch.toLowerCase());
    const matchesCat = categoryFilter === 'All' || art.category === categoryFilter;
    const matchesStatus = statusFilter === 'All' || (art.status || 'published') === statusFilter;
    return matchesSearch && matchesCat && matchesStatus;
  });

  // Filtered media list
  const filteredMedia = mediaLibrary.filter(m => {
    const matchesQuery = m.title.toLowerCase().includes(mediaSearch.toLowerCase()) ||
                         (m.caption && m.caption.toLowerCase().includes(mediaSearch.toLowerCase())) ||
                         (m.credit && m.credit.toLowerCase().includes(mediaSearch.toLowerCase()));
    const matchesCat = selectedMediaCategory === 'All' || m.category === selectedMediaCategory;
    return matchesQuery && matchesCat;
  });

  return (
    <div className="w-full min-h-screen bg-slate-900 text-slate-100 font-sans pb-24">
      
      {/* ================= ADMIN TOP NAVIGATION BAR ================= */}
      <header className="sticky top-0 z-40 w-full bg-slate-950/90 backdrop-blur-md border-b border-slate-800 px-4 sm:px-8 py-3.5 flex items-center justify-between shadow-lg">
        <div className="flex items-center gap-3 sm:gap-4">
          <button
            onClick={() => setCurrentView('home')}
            className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 transition-colors flex items-center gap-1.5 text-xs font-semibold"
            title="Return to Public Feed"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden md:inline">Public Feed</span>
          </button>

          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-gradient-to-tr from-amber-500 to-amber-600 text-slate-950 shadow-md">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-editorial text-lg sm:text-xl font-bold tracking-tight text-white leading-tight">
                  Editorial CMS Desk
                </h1>
                <span className="px-2 py-0.5 rounded-full bg-amber-400/20 border border-amber-400/30 text-amber-400 text-[10px] font-bold uppercase tracking-wider">
                  Admin Active
                </span>
              </div>
              <p className="text-[11px] text-slate-400">
                Negarit Business Review • Newsroom Operations & Content System
              </p>
            </div>
          </div>
        </div>

        {/* Right side: Authenticated User Meta & Logout */}
        <div className="flex items-center gap-3">
          <div className="hidden lg:flex items-center gap-2.5 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800">
            <img
              src={adminUser.avatar}
              alt={adminUser.name}
              className="w-7 h-7 rounded-full object-cover border border-amber-500/50"
              referrerPolicy="no-referrer"
            />
            <div className="text-left">
              <span className="text-xs font-bold text-slate-200 block leading-tight">{adminUser.name}</span>
              <span className="text-[10px] text-amber-400 font-semibold">{adminUser.role}</span>
            </div>
          </div>

          <button
            onClick={logoutAdmin}
            className="px-3 py-2 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 hover:text-rose-300 border border-rose-500/30 text-xs font-bold flex items-center gap-1.5 transition-all shadow-sm"
            title="Sign out of editorial session"
          >
            <LogOut className="w-4 h-4" />
            <span className="hidden sm:inline">Sign Out</span>
          </button>
        </div>
      </header>

      {/* ================= TAB NAVIGATION STRIP ================= */}
      <div className="w-full bg-slate-950 border-b border-slate-800 px-4 sm:px-8 py-2 overflow-x-auto scrollbar-none">
        <div className="max-w-7xl mx-auto flex items-center gap-2 min-w-max">
          
          <button
            onClick={() => setActiveTab('articles')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold flex items-center gap-2 transition-all ${
              activeTab === 'articles'
                ? 'bg-blue-600 text-white shadow-md'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>Articles ({articles.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('categories')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold flex items-center gap-2 transition-all ${
              activeTab === 'categories'
                ? 'bg-blue-600 text-white shadow-md'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
            }`}
          >
            <FolderTree className="w-4 h-4" />
            <span>Categories ({categories.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('media')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold flex items-center gap-2 transition-all ${
              activeTab === 'media'
                ? 'bg-blue-600 text-white shadow-md'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
            }`}
          >
            <ImageIcon className="w-4 h-4" />
            <span>Media Library ({mediaLibrary.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('featured')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold flex items-center gap-2 transition-all ${
              activeTab === 'featured'
                ? 'bg-blue-600 text-white shadow-md'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
            }`}
          >
            <Star className="w-4 h-4 text-amber-400" />
            <span>Featured & Slots</span>
          </button>

          <button
            onClick={() => setActiveTab('performance')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold flex items-center gap-2 transition-all ${
              activeTab === 'performance'
                ? 'bg-blue-600 text-white shadow-md'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
            }`}
          >
            <TrendingUp className="w-4 h-4 text-emerald-400" />
            <span>Performance & Traffic</span>
          </button>

          <button
            onClick={() => setActiveTab('forex')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold flex items-center gap-2 transition-all ${
              activeTab === 'forex'
                ? 'bg-blue-600 text-white shadow-md'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
            }`}
          >
            <DollarSign className="w-4 h-4" />
            <span>Forex Rates ({currencies.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('subscribers')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold flex items-center gap-2 transition-all ${
              activeTab === 'subscribers'
                ? 'bg-blue-600 text-white shadow-md'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>Subscribers ({subscribers.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('comments')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold flex items-center gap-2 transition-all ${
              activeTab === 'comments'
                ? 'bg-blue-600 text-white shadow-md'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
            }`}
          >
            <MessageSquare className="w-4 h-4" />
            <span>Comments & Moderation ({comments.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('security')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold flex items-center gap-2 transition-all ${
              activeTab === 'security'
                ? 'bg-blue-600 text-white shadow-md'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
            }`}
          >
            <ShieldCheck className="w-4 h-4 text-indigo-400" />
            <span>Admin & Security</span>
          </button>

        </div>
      </div>

      {/* ================= MAIN CONTAINER ================= */}
      <main className="max-w-7xl mx-auto px-4 sm:px-8 py-8">

        {/* ========================================================= */}
        {/* ================= 1. TAB: MANAGE ARTICLES ================= */}
        {/* ========================================================= */}
        {activeTab === 'articles' && (
          <div className="space-y-6 animate-fadeIn">
            {/* Action Bar */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 p-5 rounded-2xl bg-slate-950 border border-slate-800 shadow-md">
              <div>
                <h2 className="font-editorial text-2xl font-bold text-white flex items-center gap-2">
                  <span>Editorial Articles Management</span>
                  <span className="text-xs px-2.5 py-0.5 rounded-full bg-blue-600/30 text-blue-400 border border-blue-500/30 font-sans font-bold">
                    {filteredArticles.length} Loaded
                  </span>
                </h2>
                <p className="text-xs text-slate-400 mt-0.5">
                  Draft, schedule, publish, preview, and archive business intelligence reports
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <button
                  onClick={handleNewArticle}
                  className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs sm:text-sm font-bold shadow-md shadow-blue-900/30 flex items-center gap-2 transition-all active:scale-95"
                >
                  <Plus className="w-4 h-4 stroke-[3]" />
                  <span>Create New Article</span>
                </button>
              </div>
            </div>

            {/* Filter & Search Toolbar */}
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
              {/* Search */}
              <div className="sm:col-span-6 relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search articles by title, author, or keywords..."
                  value={articleSearch}
                  onChange={(e) => setArticleSearch(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs sm:text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Category Filter */}
              <div className="sm:col-span-3">
                <select
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs sm:text-sm text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="All">All Categories</option>
                  {categories.map(c => (
                    <option key={c.id} value={c.name}>{c.name}</option>
                  ))}
                </select>
              </div>

              {/* Status Filter */}
              <div className="sm:col-span-3">
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs sm:text-sm text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="All">All Statuses</option>
                  <option value="published">🟢 Published Only</option>
                  <option value="draft">🔴 Drafts Only</option>
                  <option value="scheduled">📅 Scheduled Only</option>
                  <option value="archived">🔒 Archived Only</option>
                </select>
              </div>
            </div>

            {/* Articles Table */}
            <div className="bg-slate-950 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs sm:text-sm text-slate-300">
                  <thead className="bg-slate-900/90 text-slate-400 uppercase text-[11px] font-bold tracking-wider border-b border-slate-800">
                    <tr>
                      <th className="py-3.5 px-4">Article</th>
                      <th className="py-3.5 px-3">Category</th>
                      <th className="py-3.5 px-3">Author</th>
                      <th className="py-3.5 px-3">Status</th>
                      <th className="py-3.5 px-3">Date / Schedule</th>
                      <th className="py-3.5 px-3">Placement</th>
                      <th className="py-3.5 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60">
                    {filteredArticles.length === 0 ? (
                      <tr>
                        <td colSpan={7} className="py-12 text-center text-slate-500">
                          <FileText className="w-8 h-8 mx-auto mb-2 opacity-50" />
                          <p className="font-semibold">No articles match your criteria</p>
                        </td>
                      </tr>
                    ) : (
                      filteredArticles.map((art) => {
                        const artStatus = art.status || 'published';
                        return (
                          <tr key={art.id} className="hover:bg-slate-900/50 transition-colors">
                            
                            {/* Headline & Thumbnail */}
                            <td className="py-3.5 px-4 max-w-sm">
                              <div className="flex items-center gap-3">
                                <img
                                  src={art.featuredImage}
                                  alt={art.title}
                                  className="w-12 h-10 rounded-lg object-cover bg-slate-800 shrink-0"
                                  referrerPolicy="no-referrer"
                                />
                                <div className="min-w-0">
                                  <h4 
                                    onClick={() => handleEditArticle(art)}
                                    className="font-bold text-slate-200 hover:text-blue-400 cursor-pointer line-clamp-2 leading-snug"
                                  >
                                    {art.title}
                                  </h4>
                                  <p className="text-[11px] text-slate-500 line-clamp-1">{art.subtitle || art.excerpt}</p>
                                </div>
                              </div>
                            </td>

                            {/* Category */}
                            <td className="py-3.5 px-3 whitespace-nowrap">
                              <span className="px-2.5 py-1 rounded-md bg-blue-900/30 text-blue-400 border border-blue-800/40 text-xs font-semibold">
                                {art.category}
                              </span>
                            </td>

                            {/* Author */}
                            <td className="py-3.5 px-3 whitespace-nowrap">
                              <div className="flex items-center gap-2">
                                <img
                                  src={art.author.avatar}
                                  alt={art.author.name}
                                  className="w-6 h-6 rounded-full object-cover"
                                  referrerPolicy="no-referrer"
                                />
                                <span className="font-medium text-slate-300">{art.author.name}</span>
                              </div>
                            </td>

                            {/* Status */}
                            <td className="py-3.5 px-3 whitespace-nowrap">
                              {artStatus === 'published' && (
                                <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-[11px] font-bold inline-flex items-center gap-1">
                                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                                  Published
                                </span>
                              )}
                              {artStatus === 'draft' && (
                                <span className="px-2.5 py-0.5 rounded-full bg-rose-500/20 text-rose-400 border border-rose-500/30 text-[11px] font-bold inline-flex items-center gap-1">
                                  <span className="w-1.5 h-1.5 rounded-full bg-rose-400" />
                                  Draft
                                </span>
                              )}
                              {artStatus === 'scheduled' && (
                                <span className="px-2.5 py-0.5 rounded-full bg-purple-500/20 text-purple-400 border border-purple-500/30 text-[11px] font-bold inline-flex items-center gap-1">
                                  <Clock className="w-3 h-3" />
                                  Scheduled
                                </span>
                              )}
                              {artStatus === 'archived' && (
                                <span className="px-2.5 py-0.5 rounded-full bg-slate-700 text-slate-300 text-[11px] font-bold inline-flex items-center gap-1">
                                  <Archive className="w-3 h-3" />
                                  Archived
                                </span>
                              )}
                            </td>

                            {/* Date / Scheduled Time */}
                            <td className="py-3.5 px-3 whitespace-nowrap text-xs text-slate-400">
                              {artStatus === 'scheduled' && art.scheduledAt ? (
                                <div className="text-purple-300 font-medium">
                                  {new Date(art.scheduledAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                                </div>
                              ) : (
                                <div>{new Date(art.publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</div>
                              )}
                            </td>

                            {/* Prominence Badges */}
                            <td className="py-3.5 px-3 whitespace-nowrap">
                              <div className="flex flex-wrap gap-1">
                                {art.isHeroFeatured && (
                                  <span className="px-1.5 py-0.5 rounded bg-amber-400 text-slate-950 text-[10px] font-black uppercase" title="Homepage Hero Story">
                                    Hero
                                  </span>
                                )}
                                {art.isTopStory && (
                                  <span className="px-1.5 py-0.5 rounded bg-blue-500 text-white text-[10px] font-bold uppercase" title="Top Story">
                                    Top
                                  </span>
                                )}
                                {art.isEditorPick && (
                                  <span className="px-1.5 py-0.5 rounded bg-amber-500/30 text-amber-300 text-[10px] font-bold" title="Editor's Pick">
                                    Pick
                                  </span>
                                )}
                                {art.isBreaking && (
                                  <span className="px-1.5 py-0.5 rounded bg-rose-500 text-white text-[10px] font-bold uppercase" title="Breaking News">
                                    Flash
                                  </span>
                                )}
                              </div>
                            </td>

                            {/* Actions Column */}
                            <td className="py-3.5 px-4 whitespace-nowrap text-right">
                              <div className="flex items-center justify-end gap-1.5">
                                
                                {/* Live Preview Button */}
                                <button
                                  onClick={() => {
                                    setPreviewArticleData(art);
                                    setIsPreviewOpen(true);
                                  }}
                                  className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
                                  title="Preview article formatted on desktop & mobile"
                                >
                                  <Eye className="w-3.5 h-3.5" />
                                </button>

                                {/* Edit Button */}
                                <button
                                  onClick={() => handleEditArticle(art)}
                                  className="p-1.5 rounded-lg bg-slate-800 hover:bg-blue-600/30 text-slate-300 hover:text-blue-400 transition-colors"
                                  title="Edit full article"
                                >
                                  <Edit3 className="w-3.5 h-3.5" />
                                </button>

                                {/* Quick Status Toggle Buttons */}
                                {artStatus !== 'published' ? (
                                  <button
                                    onClick={() => publishArticle(art.id)}
                                    className="p-1.5 rounded-lg bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-400 transition-colors"
                                    title="Publish immediately"
                                  >
                                    <CheckCircle className="w-3.5 h-3.5" />
                                  </button>
                                ) : (
                                  <button
                                    onClick={() => draftArticle(art.id)}
                                    className="p-1.5 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 text-amber-400 transition-colors"
                                    title="Revert to Draft"
                                  >
                                    <Lock className="w-3.5 h-3.5" />
                                  </button>
                                )}

                                {/* Archive Button */}
                                {artStatus !== 'archived' && (
                                  <button
                                    onClick={() => archiveArticle(art.id)}
                                    className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-slate-200 transition-colors"
                                    title="Archive story"
                                  >
                                    <Archive className="w-3.5 h-3.5" />
                                  </button>
                                )}

                                {/* Delete Button */}
                                <button
                                  onClick={() => {
                                    if (window.confirm(`Are you sure you want to permanently delete "${art.title}"?`)) {
                                      deleteArticle(art.id);
                                    }
                                  }}
                                  className="p-1.5 rounded-lg bg-rose-500/10 hover:bg-rose-500/30 text-rose-400 transition-colors"
                                  title="Delete article"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>

                              </div>
                            </td>

                          </tr>
                        );
                      })
                    )}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        )}

        {/* ========================================================= */}
        {/* ================= 2. TAB: MANAGE CATEGORIES ============== */}
        {/* ========================================================= */}
        {activeTab === 'categories' && (
          <div className="space-y-6 animate-fadeIn">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl bg-slate-950 border border-slate-800 shadow-md">
              <div>
                <h2 className="font-editorial text-2xl font-bold text-white flex items-center gap-2">
                  <span>Categories & Navigation Taxonomy</span>
                  <span className="text-xs px-2.5 py-0.5 rounded-full bg-blue-600/30 text-blue-400 border border-blue-500/30 font-sans font-bold">
                    {categories.length} Total
                  </span>
                </h2>
                <p className="text-xs text-slate-400 mt-0.5">
                  Organize sector categories, rename labels, add descriptions, and adjust navigation bar hierarchy
                </p>
              </div>

              <button
                onClick={() => {
                  setEditingCategoryId(null);
                  setCategoryNameInput('');
                  setCategoryDescInput('');
                  setCategoryColorInput('blue');
                  setIsCategoryModalOpen(true);
                }}
                className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs sm:text-sm font-bold shadow-md flex items-center gap-2 self-start sm:self-auto"
              >
                <Plus className="w-4 h-4 stroke-[3]" />
                <span>Add Category</span>
              </button>
            </div>

            {/* Categories List Cards & Reorder Handles */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {categories.map((cat, index) => {
                const articleCount = articles.filter(a => a.category.toLowerCase() === cat.name.toLowerCase()).length;
                return (
                  <div
                    key={cat.id}
                    className="p-5 rounded-2xl bg-slate-950 border border-slate-800 hover:border-slate-700 shadow-lg transition-all flex items-start justify-between gap-4"
                  >
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-xl bg-blue-600/20 border border-blue-500/30 text-blue-400 font-bold flex items-center justify-center shrink-0 text-xs">
                        #{cat.order || index + 1}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-bold text-base text-white">{cat.name}</h3>
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-400">
                            /{cat.slug}
                          </span>
                        </div>
                        <p className="text-xs text-slate-400 mt-1.5 leading-relaxed line-clamp-2">
                          {cat.description || 'No description provided.'}
                        </p>
                        <div className="mt-3 flex items-center gap-3 text-xs text-slate-500">
                          <span>{articleCount} published {articleCount === 1 ? 'article' : 'articles'}</span>
                          <span>•</span>
                          <span className="capitalize text-slate-400">Accent: {cat.color}</span>
                        </div>
                      </div>
                    </div>

                    {/* Category Actions & Reordering */}
                    <div className="flex flex-col items-end gap-2 shrink-0">
                      <div className="flex items-center gap-1 bg-slate-900 p-1 rounded-xl border border-slate-800">
                        {/* Move Up */}
                        <button
                          disabled={index === 0}
                          onClick={() => {
                            if (index > 0) {
                              const newArr = [...categories];
                              const temp = newArr[index - 1];
                              newArr[index - 1] = newArr[index];
                              newArr[index] = temp;
                              reorderCategories(newArr);
                            }
                          }}
                          className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white disabled:opacity-30 transition-colors"
                          title="Move up in navigation"
                        >
                          <ArrowUp className="w-3.5 h-3.5" />
                        </button>

                        {/* Move Down */}
                        <button
                          disabled={index === categories.length - 1}
                          onClick={() => {
                            if (index < categories.length - 1) {
                              const newArr = [...categories];
                              const temp = newArr[index + 1];
                              newArr[index + 1] = newArr[index];
                              newArr[index] = temp;
                              reorderCategories(newArr);
                            }
                          }}
                          className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white disabled:opacity-30 transition-colors"
                          title="Move down in navigation"
                        >
                          <ArrowDown className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => {
                            setEditingCategoryId(cat.id);
                            setCategoryNameInput(cat.name);
                            setCategoryDescInput(cat.description || '');
                            setCategoryColorInput(cat.color || 'blue');
                            setIsCategoryModalOpen(true);
                          }}
                          className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 text-xs font-semibold flex items-center gap-1 transition-colors"
                          title="Rename / Edit category"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                          <span>Edit</span>
                        </button>

                        <button
                          onClick={() => {
                            if (window.confirm(`Are you sure you want to delete category "${cat.name}"? Articles in this category will remain intact.`)) {
                              deleteCategory(cat.id);
                            }
                          }}
                          className="p-2 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/30 transition-colors"
                          title="Delete category"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* ================= 3. TAB: MEDIA MANAGEMENT ================ */}
        {/* ========================================================= */}
        {activeTab === 'media' && (
          <div className="space-y-6 animate-fadeIn">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl bg-slate-950 border border-slate-800 shadow-md">
              <div>
                <h2 className="font-editorial text-2xl font-bold text-white flex items-center gap-2">
                  <span>Newsroom Media Library</span>
                  <span className="text-xs px-2.5 py-0.5 rounded-full bg-blue-600/30 text-blue-400 border border-blue-500/30 font-sans font-bold">
                    {mediaLibrary.length} Assets
                  </span>
                </h2>
                <p className="text-xs text-slate-400 mt-0.5">
                  High-resolution photo assets with captions, credits, and article reuse capabilities
                </p>
              </div>

              <button
                onClick={() => {
                  setSelectedMediaForEdit(null);
                  setMediaUploadTitle('');
                  setMediaUploadUrl('');
                  setMediaUploadCaption('');
                  setMediaUploadCredit('Negarit Editorial Archive');
                  setMediaUploadCategory('Business');
                  setIsMediaUploadModalOpen(true);
                }}
                className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs sm:text-sm font-bold shadow-md flex items-center gap-2 self-start sm:self-auto"
              >
                <Upload className="w-4 h-4" />
                <span>Upload / Add Media</span>
              </button>
            </div>

            {/* Media Search & Category Filter */}
            <div className="flex flex-col sm:flex-row items-center gap-3">
              <div className="relative flex-1 w-full">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search media by headline, caption, or photographer credit..."
                  value={mediaSearch}
                  onChange={(e) => setMediaSearch(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs sm:text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <select
                value={selectedMediaCategory}
                onChange={(e) => setSelectedMediaCategory(e.target.value)}
                className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs sm:text-sm text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="All">All Categories</option>
                {categories.map(c => (
                  <option key={c.id} value={c.name}>{c.name}</option>
                ))}
              </select>
            </div>

            {/* Media Gallery Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
              {filteredMedia.map((media) => (
                <div
                  key={media.id}
                  className="group rounded-2xl bg-slate-950 border border-slate-800 overflow-hidden shadow-xl hover:border-slate-700 transition-all flex flex-col justify-between"
                >
                  <div>
                    {/* Visual Asset Thumbnail */}
                    <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-900">
                      <img
                        src={media.url}
                        alt={media.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                      
                      {media.category && (
                        <span className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-slate-950/80 backdrop-blur-md border border-slate-700 text-white text-[10px] font-bold uppercase">
                          {media.category}
                        </span>
                      )}

                      <span className="absolute top-3 right-3 text-[10px] text-slate-300 bg-slate-950/80 px-2 py-0.5 rounded backdrop-blur-md">
                        {media.dimensions || '1920x1080'}
                      </span>
                    </div>

                    {/* Metadata */}
                    <div className="p-4">
                      <h4 className="font-bold text-sm text-white line-clamp-1">{media.title}</h4>
                      <p className="text-xs text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                        {media.caption || 'No caption set'}
                      </p>
                      
                      <div className="mt-3 pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-500">
                        <span className="truncate max-w-[150px]">Credit: {media.credit || 'Negarit Desk'}</span>
                        <span>{media.uploadedAt}</span>
                      </div>
                    </div>
                  </div>

                  {/* Actions Footer */}
                  <div className="p-3 bg-slate-900/60 border-t border-slate-800 flex items-center justify-between gap-2">
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(media.url);
                        showToast('Image URL copied to clipboard');
                      }}
                      className="px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold flex items-center gap-1.5 transition-colors"
                      title="Copy asset URL"
                    >
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy URL</span>
                    </button>

                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => {
                          setSelectedMediaForEdit(media);
                          setMediaUploadTitle(media.title);
                          setMediaUploadUrl(media.url);
                          setMediaUploadCaption(media.caption || '');
                          setMediaUploadCredit(media.credit || '');
                          setMediaUploadCategory(media.category || 'Business');
                          setIsMediaUploadModalOpen(true);
                        }}
                        className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
                        title="Edit caption & credit"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                      </button>

                      <button
                        onClick={() => {
                          if (window.confirm(`Delete "${media.title}" from Media Library?`)) {
                            deleteMediaItem(media.id);
                          }
                        }}
                        className="p-1.5 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 transition-colors"
                        title="Delete asset"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                </div>
              ))}
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* ================= 4. TAB: FEATURED CONTENT =============== */}
        {/* ========================================================= */}
        {activeTab === 'featured' && (
          <div className="space-y-8 animate-fadeIn">
            
            {/* Header */}
            <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 shadow-md">
              <h2 className="font-editorial text-2xl font-bold text-white flex items-center gap-2">
                <Star className="w-5 h-5 text-amber-400" />
                <span>Featured Homepage Slot Management</span>
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Assign and control which published investigative articles appear in prime front-page positions
              </p>
            </div>

            {/* 1. Breaking News Ticker Manager */}
            <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 shadow-xl space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <div className="flex items-center gap-2 text-amber-400 font-bold text-sm uppercase tracking-wider">
                  <Flame className="w-4 h-4" />
                  <span>Breaking News Marquee Feed</span>
                </div>
                <span className="text-xs text-slate-400">{breakingNews.length} Active Bulletins</span>
              </div>

              {/* Add new breaking bulletin */}
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Type new breaking news headline (e.g. NBE releases updated foreign exchange guidelines)..."
                  value={newBreakingInput}
                  onChange={(e) => setNewBreakingInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      addBreakingNews(newBreakingInput);
                      setNewBreakingInput('');
                    }
                  }}
                  className="flex-1 px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs sm:text-sm text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  onClick={() => {
                    addBreakingNews(newBreakingInput);
                    setNewBreakingInput('');
                  }}
                  className="px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs sm:text-sm flex items-center gap-1.5 shadow"
                >
                  <Plus className="w-4 h-4 stroke-[3]" />
                  <span>Add Bulletin</span>
                </button>
              </div>

              {/* List of current bulletins */}
              <div className="space-y-2">
                {breakingNews.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center justify-between gap-3 text-xs text-slate-200"
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <span className="w-5 h-5 rounded-full bg-amber-500/20 text-amber-400 font-bold flex items-center justify-center text-[10px] shrink-0">
                        {idx + 1}
                      </span>
                      <span className="truncate">{item}</span>
                    </div>

                    <button
                      onClick={() => deleteBreakingNews(idx)}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 transition-colors shrink-0"
                      title="Remove bulletin"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* 2. Hero Story & Top Story Slot Assigners */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Hero Story (Slot #1) */}
              <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 shadow-xl space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                  <div className="flex items-center gap-2 text-white font-bold text-sm">
                    <Sparkles className="w-4 h-4 text-amber-400" />
                    <span>Homepage Lead Hero Story</span>
                  </div>
                  <span className="px-2 py-0.5 rounded bg-amber-400 text-slate-950 text-[10px] font-black uppercase">
                    Slot #1
                  </span>
                </div>

                <p className="text-xs text-slate-400">
                  Select the prominent 8-column main visual lead story featured at the top of the homepage:
                </p>

                <select
                  value={articles.find(a => a.isHeroFeatured)?.id || articles[0]?.id}
                  onChange={(e) => {
                    const targetId = e.target.value;
                    articles.forEach(a => {
                      updateArticle(a.id, { isHeroFeatured: a.id === targetId });
                    });
                    showToast('Lead Hero Story updated');
                  }}
                  className="w-full px-3 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs sm:text-sm text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {articles.filter(a => a.status === 'published').map(a => (
                    <option key={a.id} value={a.id}>
                      [{a.category}] {a.title}
                    </option>
                  ))}
                </select>

                {/* Current Hero Preview Card */}
                {(() => {
                  const heroArt = articles.find(a => a.isHeroFeatured) || articles[0];
                  if (!heroArt) return null;
                  return (
                    <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 flex items-center gap-3">
                      <img
                        src={heroArt.featuredImage}
                        alt={heroArt.title}
                        className="w-16 h-12 rounded-lg object-cover bg-slate-800 shrink-0"
                        referrerPolicy="no-referrer"
                      />
                      <div className="min-w-0">
                        <span className="text-[10px] font-bold text-blue-400 uppercase">{heroArt.category}</span>
                        <h4 className="text-xs font-bold text-white truncate">{heroArt.title}</h4>
                        <p className="text-[11px] text-slate-400 truncate">{heroArt.author.name}</p>
                      </div>
                    </div>
                  );
                })()}
              </div>

              {/* Editor's Selection Picks */}
              <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 shadow-xl space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                  <div className="flex items-center gap-2 text-white font-bold text-sm">
                    <Star className="w-4 h-4 text-amber-400" />
                    <span>Editor's Selection (3 Briefings)</span>
                  </div>
                  <span className="text-xs text-slate-400">
                    {articles.filter(a => a.isEditorPick).length} Selected
                  </span>
                </div>

                <p className="text-xs text-slate-400">
                  Toggle which investigative long-form pieces display in the luxury gold-framed curated section:
                </p>

                <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
                  {articles.filter(a => a.status === 'published').map(a => (
                    <label
                      key={a.id}
                      className="p-2.5 rounded-xl bg-slate-900 border border-slate-800/80 hover:border-slate-700 flex items-center justify-between gap-3 cursor-pointer text-xs"
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <input
                          type="checkbox"
                          checked={!!a.isEditorPick}
                          onChange={(e) => {
                            updateArticle(a.id, { isEditorPick: e.target.checked });
                          }}
                          className="rounded text-blue-600 focus:ring-blue-500 w-4 h-4 bg-slate-800 border-slate-700"
                        />
                        <span className="truncate text-slate-200 font-medium">{a.title}</span>
                      </div>
                      <span className="text-[10px] font-bold uppercase text-slate-500 shrink-0">
                        {a.category}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* ================= 5. TAB: FOREX & MARKETS ================= */}
        {/* ========================================================= */}
        {activeTab === 'forex' && (
          <div className="space-y-6 animate-fadeIn">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl bg-slate-950 border border-slate-800 shadow-md">
              <div>
                <h2 className="font-editorial text-2xl font-bold text-white flex items-center gap-2">
                  <DollarSign className="w-5 h-5 text-emerald-400" />
                  <span>National Bank of Ethiopia FX Exchange Rates</span>
                </h2>
                <p className="text-xs text-slate-400 mt-0.5">
                  Update live commercial buying, selling, and spread percentage benchmarks
                </p>
              </div>
            </div>

            <div className="bg-slate-950 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
              <table className="w-full text-left text-xs sm:text-sm text-slate-300">
                <thead className="bg-slate-900 text-slate-400 uppercase text-[11px] font-bold tracking-wider border-b border-slate-800">
                  <tr>
                    <th className="py-3 px-4">Currency</th>
                    <th className="py-3 px-3">Buying (ETB)</th>
                    <th className="py-3 px-3">Selling (ETB)</th>
                    <th className="py-3 px-3">24h Spread Change</th>
                    <th className="py-3 px-4 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {currencies.map(c => (
                    <tr key={c.code} className="hover:bg-slate-900/50">
                      <td className="py-3.5 px-4 font-bold text-white flex items-center gap-2">
                        <span className="text-base">{c.flag}</span>
                        <span>{c.code}</span>
                        <span className="text-xs font-normal text-slate-400">({c.currency})</span>
                      </td>
                      <td className="py-3.5 px-3 font-mono font-semibold">{c.buying.toFixed(2)}</td>
                      <td className="py-3.5 px-3 font-mono font-semibold">{c.selling.toFixed(2)}</td>
                      <td className="py-3.5 px-3 font-semibold">
                        <span className={c.change >= 0 ? 'text-emerald-400' : 'text-rose-400'}>
                          {c.change >= 0 ? `+${c.change.toFixed(2)}%` : `${c.change.toFixed(2)}%`}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        <button
                          onClick={() => setEditingCurrency(c)}
                          className="px-3 py-1.5 rounded-lg bg-blue-600/20 hover:bg-blue-600/30 text-blue-400 font-bold text-xs"
                        >
                          Update Rate
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* ================= 6. TAB: SUBSCRIBERS ==================== */}
        {/* ========================================================= */}
        {activeTab === 'subscribers' && (
          <div className="space-y-6 animate-fadeIn">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl bg-slate-950 border border-slate-800 shadow-md">
              <div>
                <h2 className="font-editorial text-2xl font-bold text-white flex items-center gap-2">
                  <Users className="w-5 h-5 text-blue-400" />
                  <span>Executive Newsletter Subscribers</span>
                  <span className="text-xs px-2.5 py-0.5 rounded-full bg-blue-600/30 text-blue-400 border border-blue-500/30 font-sans font-bold">
                    {subscribers.length} Corporate
                  </span>
                </h2>
                <p className="text-xs text-slate-400 mt-0.5">
                  Institutional readers receiving the 06:30 EAT Morning Executive Intelligence Briefing
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    const csvContent = "data:text/csv;charset=utf-8," + 
                      ["Email,Name,Subscribed Date,Frequency,Status"]
                      .concat(subscribers.map(s => `${s.email},"${s.name || ''}",${s.subscribedAt},${s.frequency},${s.status}`))
                      .join("\n");
                    const encodedUri = encodeURI(csvContent);
                    const link = document.createElement("a");
                    link.setAttribute("href", encodedUri);
                    link.setAttribute("download", `negarit_subscribers_${new Date().toISOString().split('T')[0]}.csv`);
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                    showToast('Exported subscriber CSV file');
                  }}
                  className="px-3 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-800 text-xs font-semibold flex items-center gap-1.5"
                >
                  <Copy className="w-3.5 h-3.5" />
                  <span>Export CSV</span>
                </button>
              </div>
            </div>

            {/* Quick Subscriber Add Form */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (newSubEmail) {
                  addSubscriber(newSubEmail, ['All'], newSubName);
                  setNewSubEmail('');
                  setNewSubName('');
                }
              }}
              className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex flex-col sm:flex-row gap-3"
            >
              <input
                type="email"
                placeholder="Institutional email address..."
                value={newSubEmail}
                onChange={(e) => setNewSubEmail(e.target.value)}
                required
                className="flex-1 px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs sm:text-sm text-slate-200"
              />
              <input
                type="text"
                placeholder="Subscriber name or organization..."
                value={newSubName}
                onChange={(e) => setNewSubName(e.target.value)}
                className="sm:w-64 px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs sm:text-sm text-slate-200"
              />
              <button
                type="submit"
                className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold"
              >
                Add Subscriber
              </button>
            </form>

            <div className="bg-slate-950 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
              <table className="w-full text-left text-xs sm:text-sm text-slate-300">
                <thead className="bg-slate-900 text-slate-400 uppercase text-[11px] font-bold tracking-wider border-b border-slate-800">
                  <tr>
                    <th className="py-3 px-4">Email</th>
                    <th className="py-3 px-3">Name / Entity</th>
                    <th className="py-3 px-3">Subscribed Date</th>
                    <th className="py-3 px-3">Frequency</th>
                    <th className="py-3 px-3">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {subscribers.map(s => (
                    <tr key={s.id} className="hover:bg-slate-900/50">
                      <td className="py-3 px-4 font-semibold text-white">{s.email}</td>
                      <td className="py-3 px-3 text-slate-400">{s.name || 'Executive Reader'}</td>
                      <td className="py-3 px-3 text-slate-400">{s.subscribedAt}</td>
                      <td className="py-3 px-3 capitalize text-slate-400">{s.frequency}</td>
                      <td className="py-3 px-3">
                        <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-bold uppercase">
                          {s.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* ================= 4b. TAB: PERFORMANCE & TRAFFIC ========= */}
        {/* ========================================================= */}
        {activeTab === 'performance' && (
          <div className="animate-fadeIn">
            <ContentPerformanceTab />
          </div>
        )}

        {/* ========================================================= */}
        {/* ================= 7. TAB: COMMENTS & MODERATION ========== */}
        {/* ========================================================= */}
        {activeTab === 'comments' && (
          <div className="animate-fadeIn">
            <CommentModerationTab />
          </div>
        )}

        {/* ========================================================= */}
        {/* ================= 8. TAB: ADMIN & SECURITY =============== */}
        {/* ========================================================= */}
        {activeTab === 'security' && (
          <div className="animate-fadeIn">
            <AdminSecurityTab />
          </div>
        )}

      </main>

      {/* ========================================================================= */}
      {/* ================= MODAL: COMPREHENSIVE ARTICLE EDITOR =================== */}
      {/* ========================================================================= */}
      {isEditorOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/85 backdrop-blur-sm overflow-y-auto animate-fadeIn">
          <div className="w-full max-w-4xl bg-slate-950 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col">
            
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between bg-slate-900 shrink-0">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-blue-600 text-white">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-editorial text-lg sm:text-xl font-bold text-white">
                    {editingArticleId ? 'Edit Article & Metadata' : 'Create New Executive Article'}
                  </h3>
                  <p className="text-xs text-slate-400">
                    Full publishing suite with multi-viewport preview, scheduling, and placement controls
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handlePreviewCurrent}
                  className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-amber-400 border border-amber-400/30 text-xs font-bold flex items-center gap-1.5 transition-colors"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>Live Preview</span>
                </button>

                <button
                  onClick={() => setIsEditorOpen(false)}
                  className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Modal Body Form */}
            <form 
              onSubmit={(e) => handleSaveArticle(e)}
              className="p-6 overflow-y-auto flex-1 space-y-6 text-slate-200"
            >
              {/* Row 1: Title */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                  Article Title / Headline <span className="text-rose-400">*</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g. National Bank of Ethiopia Unveils Landmark Monetary Reforms..."
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-sm sm:text-base font-semibold text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Row 2: Subtitle / Summary */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                  Subtitle / Executive Summary
                </label>
                <textarea
                  rows={2}
                  placeholder="Concise 1-2 sentence lead overview for executive summaries and social cards..."
                  value={subtitle}
                  onChange={(e) => setSubtitle(e.target.value)}
                  className="w-full px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs sm:text-sm text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Row 3: Category, Author, Read Time */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                    Category <span className="text-rose-400">*</span>
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as CategoryType)}
                    className="w-full px-3 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs sm:text-sm text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {categories.map(c => (
                      <option key={c.id} value={c.name}>{c.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                    Author Byline <span className="text-rose-400">*</span>
                  </label>
                  <select
                    value={authorId}
                    onChange={(e) => setAuthorId(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs sm:text-sm text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {authors.map(a => (
                      <option key={a.id} value={a.id}>{a.name} ({a.role})</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                    Estimated Read Time
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. 5 min read"
                    value={readTime}
                    onChange={(e) => setReadTime(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs sm:text-sm text-slate-200"
                  />
                </div>
              </div>

              {/* Row 4: Featured Image & Media Picker */}
              <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
                    <ImageIcon className="w-4 h-4 text-blue-400" />
                    <span>Featured Hero Image & Attribution</span>
                  </label>

                  <button
                    type="button"
                    onClick={() => setIsMediaPickerOpen(true)}
                    className="px-3 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold flex items-center gap-1.5 shadow"
                  >
                    <Layers className="w-3.5 h-3.5" />
                    <span>Choose from Media Library</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
                  <div className="sm:col-span-8">
                    <input
                      type="url"
                      placeholder="Image URL (https://images.unsplash.com/...)"
                      value={featuredImage}
                      onChange={(e) => setFeaturedImage(e.target.value)}
                      required
                      className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-200"
                    />
                  </div>
                  <div className="sm:col-span-4">
                    <input
                      type="text"
                      placeholder="Photo Credit (e.g. Negarit Archive)"
                      value={featuredImageCredit}
                      onChange={(e) => setFeaturedImageCredit(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-200"
                    />
                  </div>
                </div>

                <input
                  type="text"
                  placeholder="Image Caption (e.g. Commercial operations at Bole International Airport)"
                  value={imageCaption}
                  onChange={(e) => setImageCaption(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-200"
                />

                {featuredImage && (
                  <div className="aspect-video max-h-36 rounded-xl overflow-hidden bg-slate-950">
                    <img src={featuredImage} alt="Preview" className="w-full h-full object-cover" />
                  </div>
                )}
              </div>

              {/* Row 5: Full Content Body */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                  Full Article Content (Separate paragraphs with double newlines) <span className="text-rose-400">*</span>
                </label>
                <textarea
                  rows={8}
                  placeholder="Paragraph 1...\n\nParagraph 2...\n\nParagraph 3..."
                  value={contentParagraphs}
                  onChange={(e) => setContentParagraphs(e.target.value)}
                  required
                  className="w-full p-4 rounded-xl bg-slate-900 border border-slate-800 text-xs sm:text-sm font-sans leading-relaxed text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 font-normal"
                />
              </div>

              {/* Row 6: Key Takeaways & Pull Quote */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                    Executive Key Takeaways (One per line)
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Point 1: Strategic liquidity adjustment...\nPoint 2: Banking capital compliance..."
                    value={keyTakeaways}
                    onChange={(e) => setKeyTakeaways(e.target.value)}
                    className="w-full p-3 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-200"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-300">
                    Pull Quote & Attribution
                  </label>
                  <input
                    type="text"
                    placeholder="Pull quote text..."
                    value={pullQuoteText}
                    onChange={(e) => setPullQuoteText(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-200"
                  />
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="text"
                      placeholder="Speaker (e.g. Dr. Eyob)"
                      value={pullQuoteSpeaker}
                      onChange={(e) => setPullQuoteSpeaker(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-200"
                    />
                    <input
                      type="text"
                      placeholder="Role (e.g. State Minister)"
                      value={pullQuoteRole}
                      onChange={(e) => setPullQuoteRole(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-200"
                    />
                  </div>
                </div>
              </div>

              {/* Row 7: Tags & Source Reference */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                    Tags (Comma-separated)
                  </label>
                  <input
                    type="text"
                    placeholder="Ethiopia, ESX, Central Bank, Fintech"
                    value={tags}
                    onChange={(e) => setTags(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-200"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                    Source / Official Reference
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. National Bank of Ethiopia Circular NBE/FX/2026"
                    value={sourceReference}
                    onChange={(e) => setSourceReference(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-200"
                  />
                </div>
              </div>

              {/* Row 8: Status & Scheduling */}
              <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300">
                  Publication Status & Schedule
                </label>
                
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <label className={`p-3 rounded-xl border flex items-center gap-2 cursor-pointer transition-all ${
                    status === 'published' ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-300' : 'bg-slate-950 border-slate-800 text-slate-400'
                  }`}>
                    <input
                      type="radio"
                      name="status"
                      value="published"
                      checked={status === 'published'}
                      onChange={() => setStatus('published')}
                      className="hidden"
                    />
                    <CheckCircle className="w-4 h-4" />
                    <span className="font-bold text-xs">Publish Immediately</span>
                  </label>

                  <label className={`p-3 rounded-xl border flex items-center gap-2 cursor-pointer transition-all ${
                    status === 'draft' ? 'bg-rose-500/20 border-rose-500/40 text-rose-300' : 'bg-slate-950 border-slate-800 text-slate-400'
                  }`}>
                    <input
                      type="radio"
                      name="status"
                      value="draft"
                      checked={status === 'draft'}
                      onChange={() => setStatus('draft')}
                      className="hidden"
                    />
                    <Lock className="w-4 h-4" />
                    <span className="font-bold text-xs">Save as Draft</span>
                  </label>

                  <label className={`p-3 rounded-xl border flex items-center gap-2 cursor-pointer transition-all ${
                    status === 'scheduled' ? 'bg-purple-500/20 border-purple-500/40 text-purple-300' : 'bg-slate-950 border-slate-800 text-slate-400'
                  }`}>
                    <input
                      type="radio"
                      name="status"
                      value="scheduled"
                      checked={status === 'scheduled'}
                      onChange={() => setStatus('scheduled')}
                      className="hidden"
                    />
                    <Clock className="w-4 h-4" />
                    <span className="font-bold text-xs">Schedule for Later</span>
                  </label>
                </div>

                {status === 'scheduled' && (
                  <div className="pt-2 animate-fadeIn">
                    <label className="block text-xs font-semibold text-purple-300 mb-1">
                      Select Publication Date & Time (UTC/Local):
                    </label>
                    <input
                      type="datetime-local"
                      value={scheduledDate}
                      onChange={(e) => setScheduledDate(e.target.value)}
                      required={status === 'scheduled'}
                      className="px-3 py-2 rounded-xl bg-slate-950 border border-purple-500/40 text-xs text-white"
                    />
                  </div>
                )}
              </div>

              {/* Row 9: Prominence & Slot Placement Checkboxes */}
              <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300">
                  Featured Homepage Slots & Prominence
                </label>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                  <label className="flex items-center gap-2 cursor-pointer p-2.5 rounded-xl bg-slate-950 border border-slate-800">
                    <input
                      type="checkbox"
                      checked={isHeroFeatured}
                      onChange={(e) => setIsHeroFeatured(e.target.checked)}
                      className="rounded text-blue-600 focus:ring-blue-500"
                    />
                    <span className="font-semibold text-slate-200">Lead Hero Story</span>
                  </label>

                  <label className="flex items-center gap-2 cursor-pointer p-2.5 rounded-xl bg-slate-950 border border-slate-800">
                    <input
                      type="checkbox"
                      checked={isEditorPick}
                      onChange={(e) => setIsEditorPick(e.target.checked)}
                      className="rounded text-amber-500 focus:ring-amber-500"
                    />
                    <span className="font-semibold text-amber-300">Editor's Pick</span>
                  </label>

                  <label className="flex items-center gap-2 cursor-pointer p-2.5 rounded-xl bg-slate-950 border border-slate-800">
                    <input
                      type="checkbox"
                      checked={isTrending}
                      onChange={(e) => setIsTrending(e.target.checked)}
                      className="rounded text-blue-600 focus:ring-blue-500"
                    />
                    <span className="font-semibold text-slate-200">Trending Slot</span>
                  </label>

                  <label className="flex items-center gap-2 cursor-pointer p-2.5 rounded-xl bg-slate-950 border border-slate-800">
                    <input
                      type="checkbox"
                      checked={isBreaking}
                      onChange={(e) => setIsBreaking(e.target.checked)}
                      className="rounded text-rose-500 focus:ring-rose-500"
                    />
                    <span className="font-semibold text-rose-300">Breaking Flash</span>
                  </label>
                </div>
              </div>

              {/* Form Actions Footer */}
              <div className="pt-4 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3 shrink-0">
                <button
                  type="button"
                  onClick={() => setIsEditorOpen(false)}
                  className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 text-xs font-semibold"
                >
                  Cancel
                </button>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => handleSaveArticle(undefined, 'draft')}
                    className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700"
                  >
                    Save Draft
                  </button>

                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs sm:text-sm font-bold shadow-md flex items-center gap-2"
                  >
                    <Save className="w-4 h-4" />
                    <span>{editingArticleId ? 'Update Article' : 'Save & Publish'}</span>
                  </button>
                </div>
              </div>

            </form>

          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* ================= MODAL: ADD / EDIT CATEGORY ============================ */}
      {/* ========================================================================= */}
      {isCategoryModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-sm animate-fadeIn">
          <div className="w-full max-w-md bg-slate-950 border border-slate-800 rounded-2xl shadow-2xl p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="font-editorial text-lg font-bold text-white">
                {editingCategoryId ? 'Rename / Edit Category' : 'Add New Category'}
              </h3>
              <button
                onClick={() => setIsCategoryModalOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (!categoryNameInput.trim()) return;

                if (editingCategoryId) {
                  updateCategory(editingCategoryId, {
                    name: categoryNameInput.trim(),
                    description: categoryDescInput.trim(),
                    color: categoryColorInput
                  });
                } else {
                  addCategory(categoryNameInput.trim(), categoryDescInput.trim(), categoryColorInput);
                }
                setIsCategoryModalOpen(false);
              }}
              className="space-y-4"
            >
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1">
                  Category Name (e.g. International Business)
                </label>
                <input
                  type="text"
                  placeholder="e.g. Agribusiness, Investment, Fintech..."
                  value={categoryNameInput}
                  onChange={(e) => setCategoryNameInput(e.target.value)}
                  required
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1">
                  Sector Description
                </label>
                <textarea
                  rows={3}
                  placeholder="Editorial scope and sector focus in Ethiopia..."
                  value={categoryDescInput}
                  onChange={(e) => setCategoryDescInput(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1">
                  Badge Color Theme
                </label>
                <select
                  value={categoryColorInput}
                  onChange={(e) => setCategoryColorInput(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-200"
                >
                  <option value="blue">Blue (Corporate)</option>
                  <option value="amber">Amber (Macro / Gold)</option>
                  <option value="emerald">Emerald (Finance / Green)</option>
                  <option value="indigo">Indigo (Technology)</option>
                  <option value="purple">Purple (Startups & VC)</option>
                  <option value="cyan">Cyan (Investment)</option>
                  <option value="rose">Rose (Markets)</option>
                  <option value="teal">Teal (International)</option>
                  <option value="slate">Slate (Opinion)</option>
                </select>
              </div>

              <div className="pt-3 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsCategoryModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-900 text-slate-300 text-xs font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow"
                >
                  {editingCategoryId ? 'Save Changes' : 'Create Category'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* ================= MODAL: ADD / EDIT MEDIA ASSET ========================= */}
      {/* ========================================================================= */}
      {isMediaUploadModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-sm animate-fadeIn">
          <div className="w-full max-w-lg bg-slate-950 border border-slate-800 rounded-2xl shadow-2xl p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="font-editorial text-lg font-bold text-white">
                {selectedMediaForEdit ? 'Edit Media Metadata' : 'Upload / Add Media Asset'}
              </h3>
              <button
                onClick={() => setIsMediaUploadModalOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (!mediaUploadUrl.trim() || !mediaUploadTitle.trim()) return;

                if (selectedMediaForEdit) {
                  updateMediaItem(selectedMediaForEdit.id, {
                    title: mediaUploadTitle.trim(),
                    url: mediaUploadUrl.trim(),
                    caption: mediaUploadCaption.trim(),
                    credit: mediaUploadCredit.trim(),
                    category: mediaUploadCategory
                  });
                } else {
                  addMediaItem({
                    title: mediaUploadTitle.trim(),
                    url: mediaUploadUrl.trim(),
                    caption: mediaUploadCaption.trim() || 'Editorial photograph',
                    credit: mediaUploadCredit.trim() || 'Negarit Editorial Archive',
                    category: mediaUploadCategory,
                    fileSize: '1.2 MB',
                    dimensions: '1920x1080'
                  });
                }
                setIsMediaUploadModalOpen(false);
              }}
              className="space-y-4"
            >
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1">
                  Asset Title
                </label>
                <input
                  type="text"
                  placeholder="e.g. Ethiopian Securities Exchange Floor"
                  value={mediaUploadTitle}
                  onChange={(e) => setMediaUploadTitle(e.target.value)}
                  required
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs sm:text-sm text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1">
                  Image Direct URL
                </label>
                <input
                  type="url"
                  placeholder="https://images.unsplash.com/..."
                  value={mediaUploadUrl}
                  onChange={(e) => setMediaUploadUrl(e.target.value)}
                  required
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white"
                />
                {mediaUploadUrl && (
                  <div className="mt-2 aspect-video max-h-32 rounded-xl overflow-hidden bg-slate-900">
                    <img src={mediaUploadUrl} alt="Preview" className="w-full h-full object-cover" />
                  </div>
                )}
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1">
                    Editorial Caption
                  </label>
                  <input
                    type="text"
                    placeholder="Brief description of photograph..."
                    value={mediaUploadCaption}
                    onChange={(e) => setMediaUploadCaption(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1">
                    Photo Credit
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Negarit Archive / EIC"
                    value={mediaUploadCredit}
                    onChange={(e) => setMediaUploadCredit(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1">
                  Sector Tag
                </label>
                <select
                  value={mediaUploadCategory}
                  onChange={(e) => setMediaUploadCategory(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white"
                >
                  {categories.map(c => (
                    <option key={c.id} value={c.name}>{c.name}</option>
                  ))}
                </select>
              </div>

              <div className="pt-3 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsMediaUploadModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-900 text-slate-300 text-xs font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow"
                >
                  Save Asset
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* ================= MODAL: EDIT FOREX CURRENCY ============================ */}
      {/* ========================================================================= */}
      {editingCurrency && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-sm animate-fadeIn">
          <div className="w-full max-w-sm bg-slate-950 border border-slate-800 rounded-2xl shadow-2xl p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="font-bold text-white text-base">
                Update {editingCurrency.code} Exchange Rate
              </h3>
              <button
                onClick={() => setEditingCurrency(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                updateCurrencyRate(
                  editingCurrency.code,
                  editingCurrency.buying,
                  editingCurrency.selling,
                  editingCurrency.change
                );
                setEditingCurrency(null);
              }}
              className="space-y-3 text-xs"
            >
              <div>
                <label className="block text-slate-400 font-semibold mb-1">Buying Rate (ETB)</label>
                <input
                  type="number"
                  step="0.01"
                  value={editingCurrency.buying}
                  onChange={(e) => setEditingCurrency({ ...editingCurrency, buying: parseFloat(e.target.value) || 0 })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white font-mono"
                />
              </div>

              <div>
                <label className="block text-slate-400 font-semibold mb-1">Selling Rate (ETB)</label>
                <input
                  type="number"
                  step="0.01"
                  value={editingCurrency.selling}
                  onChange={(e) => setEditingCurrency({ ...editingCurrency, selling: parseFloat(e.target.value) || 0 })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white font-mono"
                />
              </div>

              <div>
                <label className="block text-slate-400 font-semibold mb-1">24h Spread Change %</label>
                <input
                  type="number"
                  step="0.01"
                  value={editingCurrency.change}
                  onChange={(e) => setEditingCurrency({ ...editingCurrency, change: parseFloat(e.target.value) || 0 })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white font-mono"
                />
              </div>

              <div className="pt-3 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setEditingCurrency(null)}
                  className="px-3 py-2 rounded-xl bg-slate-900 text-slate-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold"
                >
                  Save Rate
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ================= ARTICLE PREVIEW MODAL ================= */}
      {previewArticleData && (
        <ArticlePreviewModal
          article={previewArticleData}
          isOpen={isPreviewOpen}
          onClose={() => setIsPreviewOpen(false)}
          onPublishNow={() => {
            if (editingArticleId) {
              publishArticle(editingArticleId);
            } else {
              handleSaveArticle(undefined, 'published');
            }
          }}
          onSaveDraft={() => {
            if (editingArticleId) {
              draftArticle(editingArticleId);
            } else {
              handleSaveArticle(undefined, 'draft');
            }
          }}
        />
      )}

      {/* ================= MEDIA PICKER MODAL (INSIDE EDITOR) ================= */}
      <MediaPickerModal
        isOpen={isMediaPickerOpen}
        onClose={() => setIsMediaPickerOpen(false)}
        currentSelectedUrl={featuredImage}
        onSelectMedia={(media) => {
          setFeaturedImage(media.url);
          if (media.caption) setImageCaption(media.caption);
          if (media.credit) setFeaturedImageCredit(media.credit);
          showToast('Image inserted into article header');
        }}
      />

    </div>
  );
};
