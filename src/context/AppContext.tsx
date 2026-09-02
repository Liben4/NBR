import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  Article, 
  CategoryType, 
  ViewMode, 
  MarketIndicator, 
  CurrencyRate, 
  BusinessLeader, 
  Comment, 
  NewsletterSubscriber, 
  Author,
  AdminUser
} from '../types';
import { 
  INITIAL_ARTICLES, 
  INITIAL_AUTHORS, 
  INITIAL_BREAKING_NEWS, 
  INITIAL_CURRENCIES, 
  INITIAL_LEADERS, 
  INITIAL_MARKET_INDICATORS, 
  INITIAL_COMMENTS, 
  INITIAL_SUBSCRIBERS 
} from '../data/seedData';

export const DEFAULT_ADMIN_ACCOUNTS: { [email: string]: { password: string; user: AdminUser } } = {
  'liben457@gmail.com': {
    password: 'Liben@2026NBR',
    user: {
      id: 'admin-liben',
      name: 'Liben',
      email: 'liben457@gmail.com',
      role: 'Editor-in-Chief',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80',
      department: 'Executive Editorial & Operations Board',
      lastLogin: 'Just now'
    }
  }
};

interface AppContextType {
  // Theme
  isDarkMode: boolean;
  toggleTheme: () => void;

  // Admin Auth & Separation
  adminUser: AdminUser | null;
  isAdminLoggedIn: boolean;
  loginAdmin: (email: string, password: string, remember?: boolean) => { success: boolean; message?: string };
  logoutAdmin: () => void;

  // Navigation & Views
  currentView: ViewMode;
  setCurrentView: (view: ViewMode) => void;
  selectedCategory: CategoryType;
  setSelectedCategory: (category: CategoryType) => void;
  selectedArticle: Article | null;
  openArticle: (article: Article) => void;
  selectedLeader: BusinessLeader | null;
  setSelectedLeader: (leader: BusinessLeader | null) => void;

  // Search & Filters
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  isSearchOpen: boolean;
  setIsSearchOpen: (open: boolean) => void;

  // Bookmarks
  bookmarkedIds: string[];
  toggleBookmark: (articleId: string) => void;
  isBookmarked: (articleId: string) => boolean;
  isBookmarksOpen: boolean;
  setIsBookmarksOpen: (open: boolean) => void;

  // Newsletter
  isNewsletterModalOpen: boolean;
  setIsNewsletterModalOpen: (open: boolean) => void;
  subscribers: NewsletterSubscriber[];
  addSubscriber: (email: string, interests?: CategoryType[], name?: string) => boolean;

  // Data
  articles: Article[];
  authors: Author[];
  breakingNews: string[];
  marketIndicators: MarketIndicator[];
  currencies: CurrencyRate[];
  updateCurrencyRate: (code: string, buying: number, selling: number, change: number) => void;
  leaders: BusinessLeader[];
  comments: Comment[];

  // Article Actions (Admin & User)
  addArticle: (newArticle: Omit<Article, 'id' | 'views' | 'shares'>) => void;
  updateArticle: (id: string, updatedFields: Partial<Article>) => void;
  deleteArticle: (id: string) => void;
  incrementViews: (id: string) => void;

  // Comments
  addComment: (articleId: string, authorName: string, content: string, role?: string) => void;
  likeComment: (commentId: string) => void;
  deleteComment: (commentId: string) => void;

  // Toast notifications
  toastMessage: string | null;
  showToast: (msg: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Theme: default to luxury dark mode
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    const saved = localStorage.getItem('negarit_theme');
    return saved !== null ? saved === 'dark' : true;
  });

  // Check initial URL route
  const getInitialView = (): ViewMode => {
    if (typeof window !== 'undefined') {
      const path = window.location.pathname.toLowerCase();
      const hash = window.location.hash.toLowerCase();
      const search = window.location.search.toLowerCase();
      if (path === '/admin' || path.endsWith('/admin') || hash.includes('admin') || search.includes('admin')) {
        return 'admin';
      }
      if (hash.includes('markets') || search.includes('markets')) return 'markets';
      if (hash.includes('leaders') || search.includes('leaders')) return 'leaders';
    }
    return 'home';
  };

  const [currentView, setCurrentViewInternal] = useState<ViewMode>(getInitialView);
  const [selectedCategory, setSelectedCategory] = useState<CategoryType>('All');
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [selectedLeader, setSelectedLeader] = useState<BusinessLeader | null>(null);

  const setCurrentView = (view: ViewMode) => {
    setCurrentViewInternal(view);
    if (typeof window !== 'undefined') {
      try {
        if (view === 'admin') {
          if (window.location.pathname !== '/admin') {
            window.history.pushState({ view: 'admin' }, '', '/admin');
          }
        } else if (view === 'home') {
          if (window.location.pathname !== '/' || window.location.hash || window.location.search) {
            window.history.pushState({ view: 'home' }, '', '/');
          }
        }
      } catch (err) {
        // Fallback if pushState restricted in sandbox iframe
      }
    }
  };

  // Listen to browser navigation / URL changes
  useEffect(() => {
    const handleLocationChange = () => {
      const path = window.location.pathname.toLowerCase();
      const hash = window.location.hash.toLowerCase();
      const search = window.location.search.toLowerCase();
      if (path === '/admin' || path.endsWith('/admin') || hash.includes('admin') || search.includes('admin')) {
        setCurrentViewInternal('admin');
      } else if (path === '/' && !hash && !search) {
        setCurrentViewInternal('home');
      }
    };

    window.addEventListener('popstate', handleLocationChange);
    window.addEventListener('hashchange', handleLocationChange);
    return () => {
      window.removeEventListener('popstate', handleLocationChange);
      window.removeEventListener('hashchange', handleLocationChange);
    };
  }, []);

  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  const [isBookmarksOpen, setIsBookmarksOpen] = useState<boolean>(false);
  const [isNewsletterModalOpen, setIsNewsletterModalOpen] = useState<boolean>(false);

  // Admin Authentication & Session
  const [adminUser, setAdminUser] = useState<AdminUser | null>(() => {
    const saved = localStorage.getItem('negarit_admin_session');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error(e);
      }
    }
    return null;
  });

  const isAdminLoggedIn = !!adminUser;

  // Persistence
  const [articles, setArticles] = useState<Article[]>(() => {
    const saved = localStorage.getItem('negarit_articles');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { console.error(e); }
    }
    return INITIAL_ARTICLES;
  });

  const [authors] = useState<Author[]>(INITIAL_AUTHORS);
  const [breakingNews] = useState<string[]>(INITIAL_BREAKING_NEWS);
  const [marketIndicators] = useState<MarketIndicator[]>(INITIAL_MARKET_INDICATORS);
  const [currencies, setCurrencies] = useState<CurrencyRate[]>(() => {
    const saved = localStorage.getItem('negarit_currencies');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { console.error(e); }
    }
    return INITIAL_CURRENCIES;
  });
  const [leaders] = useState<BusinessLeader[]>(INITIAL_LEADERS);

  const [bookmarkedIds, setBookmarkedIds] = useState<string[]>(() => {
    const saved = localStorage.getItem('negarit_bookmarks');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { console.error(e); }
    }
    return ['art-1', 'art-5'];
  });

  const [comments, setComments] = useState<Comment[]>(() => {
    const saved = localStorage.getItem('negarit_comments');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { console.error(e); }
    }
    return INITIAL_COMMENTS;
  });

  const [subscribers, setSubscribers] = useState<NewsletterSubscriber[]>(() => {
    const saved = localStorage.getItem('negarit_subscribers');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { console.error(e); }
    }
    return INITIAL_SUBSCRIBERS;
  });

  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Sync theme to DOM
  useEffect(() => {
    localStorage.setItem('negarit_theme', isDarkMode ? 'dark' : 'light');
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  // Sync state to localStorage
  useEffect(() => {
    localStorage.setItem('negarit_articles', JSON.stringify(articles));
  }, [articles]);

  useEffect(() => {
    localStorage.setItem('negarit_bookmarks', JSON.stringify(bookmarkedIds));
  }, [bookmarkedIds]);

  useEffect(() => {
    localStorage.setItem('negarit_comments', JSON.stringify(comments));
  }, [comments]);

  useEffect(() => {
    localStorage.setItem('negarit_subscribers', JSON.stringify(subscribers));
  }, [subscribers]);

  useEffect(() => {
    localStorage.setItem('negarit_currencies', JSON.stringify(currencies));
  }, [currencies]);

  // Fetch initial data from Cloud SQL backend
  useEffect(() => {
    const fetchCloudSqlData = async () => {
      try {
        const [artRes, currRes, subRes, comRes] = await Promise.allSettled([
          fetch('/api/articles').then(r => r.ok ? r.json() : null),
          fetch('/api/currencies').then(r => r.ok ? r.json() : null),
          fetch('/api/subscribers').then(r => r.ok ? r.json() : null),
          fetch('/api/comments').then(r => r.ok ? r.json() : null),
        ]);

        if (artRes.status === 'fulfilled' && Array.isArray(artRes.value) && artRes.value.length > 0) {
          setArticles(artRes.value);
        }
        if (currRes.status === 'fulfilled' && Array.isArray(currRes.value) && currRes.value.length > 0) {
          setCurrencies(currRes.value);
        }
        if (subRes.status === 'fulfilled' && Array.isArray(subRes.value) && subRes.value.length > 0) {
          setSubscribers(subRes.value);
        }
        if (comRes.status === 'fulfilled' && Array.isArray(comRes.value) && comRes.value.length > 0) {
          setComments(comRes.value);
        }
      } catch (e) {
        console.warn('Initial Cloud SQL synchronization completed with local cache fallback:', e);
      }
    };

    fetchCloudSqlData();
  }, []);

  const toggleTheme = () => {
    setIsDarkMode(prev => !prev);
  };

  const loginAdmin = (email: string, pass: string, remember: boolean = true): { success: boolean; message?: string } => {
    const cleanEmail = email.trim().toLowerCase();
    const cleanPass = pass.trim();

    if (cleanEmail === 'liben457@gmail.com' && cleanPass === 'Liben@2026NBR') {
      const loggedUser: AdminUser = {
        id: 'admin-liben',
        name: 'Liben',
        email: 'liben457@gmail.com',
        role: 'Editor-in-Chief',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80',
        department: 'Executive Editorial & Operations Board',
        lastLogin: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }) + ', Today'
      };
      setAdminUser(loggedUser);
      if (remember) {
        localStorage.setItem('negarit_admin_session', JSON.stringify(loggedUser));
      }
      showToast(`Welcome back, ${loggedUser.name} (${loggedUser.role})`);
      return { success: true };
    }

    return { 
      success: false, 
      message: 'Authentication failed. Please verify your administrator email and access passphrase.' 
    };
  };

  const logoutAdmin = () => {
    setAdminUser(null);
    localStorage.removeItem('negarit_admin_session');
    showToast('Editorial session terminated. Logged out of Admin Desk.');
    setCurrentView('home');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const updateCurrencyRate = (code: string, buying: number, selling: number, change: number) => {
    setCurrencies(prev => prev.map(c => c.code === code ? { ...c, buying, selling, change, isPositive: change >= 0 } : c));
    showToast(`Updated official NBE ${code}/ETB foreign exchange rate`);
    fetch(`/api/currencies/${code}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ buying, selling, change })
    }).catch(err => console.warn('Cloud SQL currency update warning:', err));
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(prev => prev === msg ? null : prev);
    }, 3500);
  };

  const openArticle = (article: Article) => {
    setSelectedArticle(article);
    setCurrentView('article');
    incrementViews(article.id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const toggleBookmark = (articleId: string) => {
    setBookmarkedIds(prev => {
      const exists = prev.includes(articleId);
      const updated = exists ? prev.filter(id => id !== articleId) : [...prev, articleId];
      showToast(exists ? 'Article removed from saved briefing' : 'Article saved to private reading list');
      return updated;
    });
  };

  const isBookmarked = (articleId: string) => bookmarkedIds.includes(articleId);

  const incrementViews = (id: string) => {
    setArticles(prev => prev.map(art => art.id === id ? { ...art, views: art.views + 1 } : art));
  };

  const addSubscriber = (email: string, interests: CategoryType[] = ['All'], name?: string): boolean => {
    if (!email || !email.includes('@')) return false;
    const exists = subscribers.some(s => s.email.toLowerCase() === email.toLowerCase());
    if (exists) {
      showToast('You are already subscribed to Negarit Business Review briefings.');
      return true;
    }
    const newSub: NewsletterSubscriber = {
      id: `sub-${Date.now()}`,
      email,
      name: name || 'Valued Reader',
      subscribedAt: new Date().toISOString().split('T')[0],
      frequency: 'daily',
      interests,
      status: 'active'
    };
    setSubscribers(prev => [newSub, ...prev]);
    showToast('Subscribed successfully. Welcome to Negarit Executive Intelligence.');
    fetch('/api/subscribers', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, name, interests })
    }).catch(err => console.warn('Cloud SQL subscriber sync warning:', err));
    return true;
  };

  const addArticle = (newArticle: Omit<Article, 'id' | 'views' | 'shares'>) => {
    const article: Article = {
      ...newArticle,
      id: `art-${Date.now()}`,
      views: 1,
      shares: 0,
    };
    setArticles(prev => [article, ...prev]);
    showToast(`Article "${article.title.slice(0, 30)}..." published successfully`);
    fetch('/api/articles', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(article)
    }).catch(err => console.warn('Cloud SQL article sync warning:', err));
  };

  const updateArticle = (id: string, updatedFields: Partial<Article>) => {
    setArticles(prev => prev.map(art => art.id === id ? { ...art, ...updatedFields } : art));
    if (selectedArticle && selectedArticle.id === id) {
      setSelectedArticle(prev => prev ? { ...prev, ...updatedFields } : null);
    }
    showToast('Article updated successfully');
    fetch(`/api/articles/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedFields)
    }).catch(err => console.warn('Cloud SQL article update warning:', err));
  };

  const deleteArticle = (id: string) => {
    setArticles(prev => prev.filter(art => art.id !== id));
    if (selectedArticle && selectedArticle.id === id) {
      setSelectedArticle(null);
      setCurrentView('home');
    }
    showToast('Article removed from publication');
    fetch(`/api/articles/${id}`, {
      method: 'DELETE'
    }).catch(err => console.warn('Cloud SQL article delete warning:', err));
  };

  const addComment = (articleId: string, authorName: string, content: string, role?: string) => {
    const newComment: Comment = {
      id: `comm-${Date.now()}`,
      articleId,
      authorName: authorName.trim() || 'Executive Reader',
      authorRole: role?.trim() || 'Verified Industry Reader',
      avatar: `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(authorName)}`,
      content,
      createdAt: 'Just now',
      likes: 0,
      isLiked: false
    };
    setComments(prev => [newComment, ...prev]);
    showToast('Comment submitted for publication');
    fetch('/api/comments', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ articleId, authorName, authorRole: role || 'Verified Reader', content })
    }).catch(err => console.warn('Cloud SQL comment sync warning:', err));
  };

  const likeComment = (commentId: string) => {
    setComments(prev => prev.map(c => {
      if (c.id === commentId) {
        const isLiked = !c.isLiked;
        return {
          ...c,
          isLiked,
          likes: isLiked ? c.likes + 1 : Math.max(0, c.likes - 1)
        };
      }
      return c;
    }));
  };

  const deleteComment = (commentId: string) => {
    setComments(prev => prev.filter(c => c.id !== commentId));
    showToast('Comment removed');
    fetch(`/api/comments/${commentId}`, {
      method: 'DELETE'
    }).catch(err => console.warn('Cloud SQL comment delete warning:', err));
  };

  return (
    <AppContext.Provider
      value={{
        isDarkMode,
        toggleTheme,
        adminUser,
        isAdminLoggedIn,
        loginAdmin,
        logoutAdmin,
        currentView,
        setCurrentView,
        selectedCategory,
        setSelectedCategory,
        selectedArticle,
        openArticle,
        selectedLeader,
        setSelectedLeader,
        searchQuery,
        setSearchQuery,
        isSearchOpen,
        setIsSearchOpen,
        bookmarkedIds,
        toggleBookmark,
        isBookmarked,
        isBookmarksOpen,
        setIsBookmarksOpen,
        isNewsletterModalOpen,
        setIsNewsletterModalOpen,
        subscribers,
        addSubscriber,
        articles,
        authors,
        breakingNews,
        marketIndicators,
        currencies,
        updateCurrencyRate,
        leaders,
        comments,
        addArticle,
        updateArticle,
        deleteArticle,
        incrementViews,
        addComment,
        likeComment,
        deleteComment,
        toastMessage,
        showToast
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within an AppProvider');
  return context;
};
