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

  const [currentView, setCurrentView] = useState<ViewMode>('home');
  const [selectedCategory, setSelectedCategory] = useState<CategoryType>('All');
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [selectedLeader, setSelectedLeader] = useState<BusinessLeader | null>(null);

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

    if (cleanEmail !== 'liben457@gmail.com') {
      return { success: false, message: 'Unauthorized administrator email address. Access is restricted to liben457@gmail.com.' };
    }

    return { 
      success: false, 
      message: 'Invalid password for liben457@gmail.com. Please check your credentials.' 
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
  };

  const updateArticle = (id: string, updatedFields: Partial<Article>) => {
    setArticles(prev => prev.map(art => art.id === id ? { ...art, ...updatedFields } : art));
    if (selectedArticle && selectedArticle.id === id) {
      setSelectedArticle(prev => prev ? { ...prev, ...updatedFields } : null);
    }
    showToast('Article updated successfully');
  };

  const deleteArticle = (id: string) => {
    setArticles(prev => prev.filter(art => art.id !== id));
    if (selectedArticle && selectedArticle.id === id) {
      setSelectedArticle(null);
      setCurrentView('home');
    }
    showToast('Article removed from publication');
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
