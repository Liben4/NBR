import React, { useState } from 'react';
import { 
  Search, 
  Bookmark, 
  Sun, 
  Moon, 
  Mail, 
  ShieldCheck, 
  Menu, 
  X, 
  TrendingUp, 
  Globe, 
  ChevronRight,
  Sparkles,
  LogOut,
  UserCheck
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { CategoryType } from '../types';
import { BrandLogo } from './BrandLogo';

const CATEGORIES: { label: string; value: CategoryType }[] = [
  { label: 'Home', value: 'All' },
  { label: 'Business', value: 'Business' },
  { label: 'Economy', value: 'Economy' },
  { label: 'Finance', value: 'Finance' },
  { label: 'Technology', value: 'Technology' },
  { label: 'Entrepreneurship', value: 'Entrepreneurship' },
  { label: 'Markets', value: 'Markets' },
  { label: 'Opinion', value: 'Opinion' },
];

export const Header: React.FC = () => {
  const { 
    isDarkMode, 
    toggleTheme, 
    adminUser,
    isAdminLoggedIn,
    logoutAdmin,
    currentView, 
    setCurrentView, 
    selectedCategory, 
    setSelectedCategory,
    setIsSearchOpen,
    bookmarkedIds,
    setIsBookmarksOpen,
    setIsNewsletterModalOpen,
    currencies
  } = useApp();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Formatted current date
  const today = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });

  const handleCategoryClick = (cat: CategoryType) => {
    if (cat === 'Markets') {
      setCurrentView('markets');
    } else {
      setSelectedCategory(cat);
      setCurrentView(cat === 'All' ? 'home' : 'category');
    }
    setIsMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const usdRate = currencies.find(c => c.code === 'USD');

  return (
    <header className="w-full flex flex-col border-b border-slate-800/80 bg-slate-950 text-slate-100 transition-colors duration-200">
      
      {/* 0. ADMIN ACTIVE STATUS BANNER (Rendered only when logged in as Admin) */}
      {isAdminLoggedIn && adminUser && (
        <div className="w-full bg-gradient-to-r from-blue-950 via-slate-900 to-amber-950/40 text-xs border-b border-amber-500/30 py-1.5 px-4 sm:px-8">
          <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2 text-slate-200">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="font-bold text-amber-300 font-brand uppercase tracking-wider text-[11px]">
                Editorial Session:
              </span>
              <span className="font-semibold text-slate-100">{adminUser.name}</span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-400/20 text-amber-300 border border-amber-400/30 hidden sm:inline">
                {adminUser.role}
              </span>
            </div>

            <div className="flex items-center gap-3 ml-auto">
              <button
                onClick={() => {
                  setCurrentView('admin');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className={`text-xs font-semibold px-3 py-1 rounded-lg transition-all ${
                  currentView === 'admin' 
                    ? 'bg-amber-400 text-slate-950 font-bold' 
                    : 'bg-slate-800 hover:bg-slate-700 text-amber-300 border border-amber-400/40'
                }`}
              >
                {currentView === 'admin' ? 'Active in CMS Desk' : 'Open Admin CMS Desk'}
              </button>

              <button
                onClick={logoutAdmin}
                className="inline-flex items-center gap-1 text-xs font-semibold text-rose-300 hover:text-rose-100 px-2 py-1 rounded hover:bg-rose-950/60 transition-colors"
                title="Log out of Editorial Administration"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Log Out</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 1. TOP METADATA & FINANCIAL TICKER BAR */}
      <div className="w-full bg-slate-900/90 text-xs border-b border-slate-800/60 py-1.5 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
          {/* Left: Date & Location */}
          <div className="flex items-center gap-4 text-slate-400">
            <span className="font-medium tracking-wide flex items-center gap-1.5 text-slate-300">
              <Globe className="w-3.5 h-3.5 text-blue-400" />
              Addis Ababa Edition
            </span>
            <span className="hidden md:inline text-slate-600">|</span>
            <span className="hidden md:inline text-slate-400">{today}</span>
            <span className="hidden lg:inline text-slate-600">|</span>
            <span className="hidden lg:inline text-amber-400/90 font-medium">
              ESX Trading: Pre-Market Launch
            </span>
          </div>

          {/* Center/Right: Quick Market Bar */}
          <div className="flex items-center gap-4 ml-auto">
            {usdRate && (
              <div 
                onClick={() => setCurrentView('markets')}
                className="cursor-pointer flex items-center gap-1.5 bg-slate-800/80 hover:bg-slate-800 px-2.5 py-0.5 rounded text-[11px] border border-slate-700/50 transition-colors"
                title="Click to open Markets Dashboard"
              >
                <span className="text-slate-400 font-medium">USD/ETB:</span>
                <span className="text-slate-100 font-semibold">{usdRate.buying.toFixed(2)}</span>
                <span className="text-emerald-400 flex items-center text-[10px]">
                  <TrendingUp className="w-3 h-3 inline" /> +{usdRate.change}%
                </span>
              </div>
            )}

            {/* Quick Links */}
            <div className="flex items-center gap-3 text-slate-400">
              <button 
                onClick={() => setCurrentView('leaders')}
                className="hover:text-amber-400 transition-colors hidden sm:inline"
              >
                Business Leaders
              </button>
              
              {/* Staff Portal / Admin Button - Visible ONLY when Admin is authenticated */}
              {isAdminLoggedIn && (
                <>
                  <span className="hidden sm:inline text-slate-700">•</span>
                  <button 
                    onClick={() => setCurrentView('admin')}
                    className="flex items-center gap-1 text-amber-400 hover:text-amber-300 transition-colors font-semibold"
                    title="Open Admin CMS"
                  >
                    <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
                    <span>Admin Desk</span>
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* 2. MAIN BRAND MASTHEAD */}
      <div className="max-w-7xl mx-auto w-full px-4 sm:px-8 py-5 md:py-6 flex items-center justify-between">
        {/* Left: Mobile menu button */}
        <div className="flex items-center gap-2 lg:hidden">
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-200 hover:text-white"
            aria-label="Toggle navigation menu"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Center: Brand Identity (Official Logo) */}
        <div 
          onClick={() => {
            setSelectedCategory('All');
            setCurrentView('home');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="cursor-pointer flex items-center text-center mx-auto lg:mx-0 group"
          title="Negarit Business Review - Home"
        >
          <BrandLogo variant="horizontal" isDark={isDarkMode} size="lg" />
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Search Trigger */}
          <button 
            id="search-open-btn"
            onClick={() => setIsSearchOpen(true)}
            className="p-2 sm:px-3 sm:py-2 rounded-lg bg-slate-900/90 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-white flex items-center gap-2 text-sm transition-all"
            title="Search articles, companies, and topics (Ctrl+K)"
          >
            <Search className="w-4 h-4 text-slate-400" />
            <span className="hidden md:inline text-xs text-slate-400 font-normal">Search...</span>
          </button>

          {/* Bookmarks */}
          <button 
            onClick={() => setIsBookmarksOpen(true)}
            className="relative p-2 rounded-lg bg-slate-900/90 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-white transition-colors"
            title="Saved reading list"
          >
            <Bookmark className="w-4 h-4" />
            {bookmarkedIds.length > 0 && (
              <span className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full bg-blue-600 text-white text-[10px] font-bold flex items-center justify-center border border-slate-950">
                {bookmarkedIds.length}
              </span>
            )}
          </button>

          {/* Theme Toggle */}
          <button 
            onClick={toggleTheme}
            className="p-2 rounded-lg bg-slate-900/90 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-amber-300 transition-colors"
            title={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
            aria-label="Toggle theme"
          >
            {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>

          {/* Newsletter CTA */}
          <button 
            onClick={() => setIsNewsletterModalOpen(true)}
            className="hidden sm:flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white text-xs font-semibold shadow-md shadow-blue-900/30 transition-all active:scale-95"
          >
            <Mail className="w-3.5 h-3.5" />
            <span>Newsletter</span>
          </button>
        </div>
      </div>

      {/* 3. STICKY PRIMARY NAVIGATION MENU */}
      <nav className="sticky top-0 z-40 w-full bg-slate-950/95 glass-nav border-t border-b border-slate-800/80 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 flex items-center justify-between overflow-x-auto no-scrollbar">
          <ul className="flex items-center gap-1 sm:gap-2 py-1.5 text-xs sm:text-sm font-medium tracking-wide">
            {CATEGORIES.map((cat) => {
              const isActive = 
                (cat.value === 'All' && currentView === 'home') ||
                (cat.value === 'Markets' && currentView === 'markets') ||
                (currentView === 'category' && selectedCategory === cat.value);

              return (
                <li key={cat.value} className="shrink-0">
                  <button
                    onClick={() => handleCategoryClick(cat.value)}
                    className={`px-3 py-2 rounded-md transition-all duration-150 whitespace-nowrap ${
                      isActive 
                        ? 'bg-blue-600/20 text-blue-400 font-semibold border-b-2 border-blue-500 rounded-b-none' 
                        : 'text-slate-300 hover:text-white hover:bg-slate-900/80'
                    }`}
                  >
                    {cat.label}
                  </button>
                </li>
              );
            })}

            {/* Business Leaders Tab */}
            <li className="shrink-0">
              <button
                onClick={() => {
                  setCurrentView('leaders');
                  setIsMobileMenuOpen(false);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className={`px-3 py-2 rounded-md transition-all duration-150 whitespace-nowrap flex items-center gap-1 ${
                  currentView === 'leaders'
                    ? 'bg-blue-600/20 text-blue-400 font-semibold border-b-2 border-blue-500 rounded-b-none'
                    : 'text-slate-300 hover:text-white hover:bg-slate-900/80'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-400 inline" />
                <span>Leaders</span>
              </button>
            </li>
          </ul>

          {/* Quick Right Badge */}
          <div className="hidden xl:flex items-center gap-2 text-xs text-slate-400 pl-4 border-l border-slate-800">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span className="text-[11px] font-medium text-slate-300">Live Coverage</span>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden w-full bg-slate-900 border-b border-slate-800 py-3 px-4 flex flex-col gap-1.5 animate-fadeIn">
            {CATEGORIES.map((cat) => (
              <button
                key={`mob-${cat.value}`}
                onClick={() => handleCategoryClick(cat.value)}
                className="w-full text-left px-3 py-2 rounded-md text-sm font-medium text-slate-200 hover:bg-slate-800 flex items-center justify-between"
              >
                <span>{cat.label}</span>
                <ChevronRight className="w-4 h-4 text-slate-500" />
              </button>
            ))}
            <div className="border-t border-slate-800 pt-2 mt-2 flex flex-col gap-2">
              <button
                onClick={() => {
                  setCurrentView('leaders');
                  setIsMobileMenuOpen(false);
                }}
                className="w-full text-left px-3 py-2 rounded-md text-sm font-medium text-amber-300 hover:bg-slate-800 flex items-center justify-between"
              >
                <span>Featured Business Leaders</span>
                <Sparkles className="w-4 h-4 text-amber-400" />
              </button>
              {isAdminLoggedIn && (
                <>
                  <button
                    onClick={() => {
                      setCurrentView('admin');
                      setIsMobileMenuOpen(false);
                    }}
                    className="w-full text-left px-3 py-2 rounded-md text-sm font-medium text-amber-300 hover:bg-slate-800 flex items-center justify-between"
                  >
                    <div className="flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4 text-amber-400" />
                      <span>Admin Desk ({adminUser?.name})</span>
                    </div>
                    <span className="text-[10px] bg-amber-400/20 text-amber-300 px-2 py-0.5 rounded">Active</span>
                  </button>

                  <button
                    onClick={() => {
                      logoutAdmin();
                      setIsMobileMenuOpen(false);
                    }}
                    className="w-full text-left px-3 py-2 rounded-md text-sm font-medium text-rose-400 hover:bg-slate-800 flex items-center justify-between"
                  >
                    <span>Log Out of Admin</span>
                    <LogOut className="w-4 h-4 text-rose-400" />
                  </button>
                </>
              )}
              <button
                onClick={() => {
                  setIsNewsletterModalOpen(true);
                  setIsMobileMenuOpen(false);
                }}
                className="w-full text-center mt-1 py-2 rounded-md bg-blue-600 text-white text-sm font-semibold"
              >
                Subscribe to Newsletter
              </button>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};
