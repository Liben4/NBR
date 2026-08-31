import React from 'react';
import { 
  Shield, 
  Mail, 
  MapPin, 
  Send, 
  ArrowUp, 
  Globe, 
  Linkedin, 
  Twitter, 
  Radio, 
  Compass, 
  Sparkles,
  Lock,
  LogOut,
  ShieldCheck
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { CategoryType } from '../types';

export const Footer: React.FC = () => {
  const { 
    setCurrentView, 
    setSelectedCategory, 
    setIsNewsletterModalOpen,
    adminUser,
    isAdminLoggedIn,
    logoutAdmin
  } = useApp();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCategoryNav = (cat: CategoryType) => {
    setSelectedCategory(cat);
    setCurrentView('category');
    scrollToTop();
  };

  return (
    <footer className="w-full bg-slate-950 border-t border-slate-800 text-slate-400 font-sans text-xs relative overflow-hidden">
      
      {/* Top Banner Accent */}
      <div className="h-1 w-full bg-gradient-to-r from-blue-600 via-amber-400 to-blue-600" />

      {/* Main Footer Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-12 lg:py-16">
        
        {/* Top Grid: Brand & Categories */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12 pb-12 border-b border-slate-800">
          
          {/* Column 1: Brand (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            {/* Logo */}
            <div 
              onClick={() => {
                setCurrentView('home');
                scrollToTop();
              }}
              className="cursor-pointer inline-flex items-center gap-3"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center text-amber-400 font-brand font-black text-xl shadow-lg border border-amber-400/30">
                N
              </div>
              <div>
                <span className="font-brand font-extrabold text-base sm:text-lg tracking-wider text-slate-100 uppercase block">
                  NEGARIT
                </span>
                <span className="text-[9px] font-brand tracking-[0.25em] text-amber-400 uppercase font-bold block -mt-1">
                  BUSINESS REVIEW
                </span>
              </div>
            </div>

            <p className="text-slate-400 text-xs leading-relaxed max-w-sm">
              Ethiopia’s premier independent digital publication for macroeconomic intelligence, capital markets, enterprise innovation, and high-level corporate analysis.
            </p>

            <div className="space-y-1.5 text-[11px] text-slate-500">
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                <span>Bole Commercial District, Addis Ababa, Ethiopia</span>
              </div>
              <div className="flex items-center gap-2">
                <Globe className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span>Horn of Africa Regional Bureau • Frequency: Daily</span>
              </div>
            </div>

            {/* Social Channels */}
            <div className="flex items-center gap-3 pt-2">
              <a 
                href="https://linkedin.com" 
                target="_blank" 
                rel="noreferrer"
                className="w-8 h-8 rounded-lg bg-slate-900 hover:bg-blue-600 hover:text-white text-slate-400 border border-slate-800 flex items-center justify-center transition-colors"
                title="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a 
                href="https://twitter.com" 
                target="_blank" 
                rel="noreferrer"
                className="w-8 h-8 rounded-lg bg-slate-900 hover:bg-slate-800 hover:text-white text-slate-400 border border-slate-800 flex items-center justify-center transition-colors"
                title="Twitter"
              >
                <Twitter className="w-4 h-4" />
              </a>
              <a 
                href="https://t.me" 
                target="_blank" 
                rel="noreferrer"
                className="w-8 h-8 rounded-lg bg-slate-900 hover:bg-blue-500 hover:text-white text-slate-400 border border-slate-800 flex items-center justify-center transition-colors"
                title="Telegram Broadcast"
              >
                <Send className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Column 2: Editorial Categories (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-brand text-xs font-bold uppercase tracking-widest text-slate-200">
              Editorial Desks
            </h4>
            <ul className="space-y-2 text-xs">
              {(['Economy', 'Finance', 'Technology', 'Business', 'Entrepreneurship', 'Opinion'] as CategoryType[]).map((cat) => (
                <li key={cat}>
                  <button
                    onClick={() => handleCategoryNav(cat)}
                    className="hover:text-blue-400 text-slate-400 transition-colors"
                  >
                    {cat} Desk & Analysis
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Intelligence & Corporate (4 cols) */}
          <div className="lg:col-span-4 space-y-3">
            <h4 className="font-brand text-xs font-bold uppercase tracking-widest text-slate-200">
              Intelligence Portals
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => {
                    setCurrentView('markets');
                    scrollToTop();
                  }}
                  className="hover:text-amber-300 text-slate-400 transition-colors flex items-center gap-1.5"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  <span>Ethiopian FX & Capital Markets Portal</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setCurrentView('leaders');
                    scrollToTop();
                  }}
                  className="hover:text-amber-300 text-slate-400 transition-colors flex items-center gap-1.5"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                  <span>Executive Profiles & Leader Index</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => setIsNewsletterModalOpen(true)}
                  className="hover:text-blue-400 text-slate-400 transition-colors"
                >
                  Daily Executive Morning Briefing
                </button>
              </li>
              {isAdminLoggedIn ? (
                <li className="pt-2 border-t border-slate-850">
                  <div className="flex items-center justify-between text-[11px]">
                    <button
                      onClick={() => {
                        setCurrentView('admin');
                        scrollToTop();
                      }}
                      className="text-amber-400 hover:text-amber-300 transition-colors flex items-center gap-1.5 font-bold"
                    >
                      <ShieldCheck className="w-3.5 h-3.5" />
                      <span>Admin Desk ({adminUser?.role})</span>
                    </button>

                    <button
                      onClick={logoutAdmin}
                      className="text-rose-400 hover:text-rose-300 transition-colors flex items-center gap-1 text-[10px]"
                      title="Log Out of Admin Desk"
                    >
                      <LogOut className="w-3 h-3" />
                      <span>Log Out</span>
                    </button>
                  </div>
                </li>
              ) : (
                <li>
                  <button
                    onClick={() => {
                      setCurrentView('admin');
                      scrollToTop();
                    }}
                    className="hover:text-amber-400 text-slate-500 transition-colors flex items-center gap-1.5 text-[11px]"
                  >
                    <Lock className="w-3 h-3" />
                    <span>Staff & Editorial Newsroom Login</span>
                  </button>
                </li>
              )}
            </ul>

            {/* Newsletter quick box in footer */}
            <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 mt-4">
              <p className="text-[11px] text-slate-300 font-semibold mb-2">
                Join our 28,000+ subscriber corporate network.
              </p>
              <button
                onClick={() => setIsNewsletterModalOpen(true)}
                className="w-full py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs transition-colors flex items-center justify-center gap-1.5"
              >
                <Mail className="w-3.5 h-3.5" />
                <span>Subscribe Free</span>
              </button>
            </div>
          </div>

        </div>

        {/* Bottom Copyright & Back to Top Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-500 text-[11px]">
          <div>
            © {new Date().getFullYear()} NEGARIT BUSINESS REVIEW. All rights reserved. 
            <span className="hidden sm:inline"> • Addis Ababa, Ethiopia.</span>
          </div>

          <div className="flex items-center gap-6">
            <span className="hover:text-slate-400 cursor-pointer">Privacy Charter</span>
            <span className="hover:text-slate-400 cursor-pointer">Editorial Ethics</span>
            <span className="hover:text-slate-400 cursor-pointer">Terms of Service</span>

            <button
              onClick={scrollToTop}
              className="p-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white border border-slate-800 transition-colors inline-flex items-center gap-1"
              title="Back to Top"
            >
              <ArrowUp className="w-3.5 h-3.5" />
              <span className="text-[10px] font-bold">TOP</span>
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
