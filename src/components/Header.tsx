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
  Sparkles
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { CategoryType } from '../types';

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
              <span className="hidden sm:inline text-slate-700">•</span>
              <button 
                onClick={() => setCurrentView('admin')}
                className="flex items-center gap-1 hover:text-blue-400 transition-colors font-medium text-slate-300"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
                <span>Admin</span>
              </button>
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

        {/* Center: Brand Identity */}
        <div 
          onClick={() => {
            setSelectedCategory('All');
            setCurrentView('home');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="cursor-pointer flex flex-col items-center text-center mx-auto lg:mx-0 group"
        >
          <div className="flex items-center gap-2.5">
            {/* Elegant Emblem Icon */}
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-gradient-to-br from-blue-600 via-blue-700 to-slate-900 border border-blue-400/30 flex items-center justify-center shadow-lg shadow-blue-900/20 group-hover:border-amber-400/50 transition-all duration-300">
              <span className="font-brand font-black text-lg sm:text-xl text-amber-400 tracking-tighter">
                N
              </span>
            </div>

            <div className="flex flex-col text-left">
              <h1 className="font-brand text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-wider text-slate-100 uppercase group-hover:text-amber-200/95 transition-colors duration-200">
                NEGARIT
                <span className="text-blue-500 font-light text-xl sm:text-2xl ml-1.5">REVIEW</span>
              </h1>
            </div>
          </div>
          <span className="font-editorial italic text-xs sm:text-sm text-slate-400 tracking-wide mt-1 group-hover:text-slate-300 transition-colors">
            Navigating Business Dynamics
          </span>
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
              <button
                onClick={() => {
                  setCurrentView('admin');
                  setIsMobileMenuOpen(false);
                }}
                className="w-full text-left px-3 py-2 rounded-md text-sm font-medium text-blue-400 hover:bg-slate-800 flex items-center justify-between"
              >
                <span>Admin Editorial Portal</span>
                <ShieldCheck className="w-4 h-4 text-blue-400" />
              </button>
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
