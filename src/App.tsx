import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Header } from './components/Header';
import { BreakingTicker } from './components/BreakingTicker';
import { HeroSection } from './components/HeroSection';
import { MarketsDashboard } from './components/MarketsDashboard';
import { FeaturedCategories } from './components/FeaturedCategories';
import { LatestNewsGrid } from './components/LatestNewsGrid';
import { MostReadSidebar } from './components/MostReadSidebar';
import { EditorPickSection } from './components/EditorPickSection';
import { BusinessLeadersSection } from './components/BusinessLeadersSection';
import { OpinionAnalysisSection } from './components/OpinionAnalysisSection';
import { NewsletterSection } from './components/NewsletterSection';
import { ArticleView } from './components/ArticleView';
import { CategoryView } from './components/CategoryView';
import { MarketsView } from './components/MarketsView';
import { LeadersView } from './components/LeadersView';
import { AdminDashboard } from './components/AdminDashboard';
import { Footer } from './components/Footer';
import { SearchModal } from './components/SearchModal';
import { BookmarksDrawer } from './components/BookmarksDrawer';
import { NewsletterModal } from './components/NewsletterModal';
import { LeaderModal } from './components/LeaderModal';

const MainContent: React.FC = () => {
  const { currentView, toastMessage } = useApp();

  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col font-sans selection:bg-blue-600 selection:text-white transition-colors duration-200">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 px-4 py-2.5 rounded-xl bg-white dark:bg-slate-900 border border-blue-500/50 text-slate-900 dark:text-slate-100 text-xs font-semibold shadow-2xl animate-fadeIn flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Persistent Global Header */}
      <Header />

      {/* Breaking News Ticker */}
      <BreakingTicker />

      {/* Main View Router */}
      <main className="flex-1 w-full">
        {currentView === 'home' && (
          <>
            {/* 1. Hero Section */}
            <HeroSection />

            {/* 2. Live Ethiopian Financial & Macro Dashboard */}
            <MarketsDashboard />

            {/* 3. Editor's Selection (Luxury Curated Briefings) */}
            <EditorPickSection />

            {/* 4. Latest News + Most Read (Combined Layout) */}
            <div className="w-full max-w-7xl mx-auto px-4 sm:px-8 py-8">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                <div className="lg:col-span-8">
                  <LatestNewsGrid />
                </div>
                <div className="lg:col-span-4 sticky top-24">
                  <MostReadSidebar />
                </div>
              </div>
            </div>

            {/* 5. Deep Sector Exploration (Tabbed) */}
            <FeaturedCategories />

            {/* 6. Featured Business Leaders */}
            <BusinessLeadersSection />

            {/* 7. Opinion & Thought Leadership */}
            <OpinionAnalysisSection />

            {/* 8. Newsletter Subscription */}
            <NewsletterSection />
          </>
        )}

        {currentView === 'article' && <ArticleView />}
        {currentView === 'category' && <CategoryView />}
        {currentView === 'markets' && <MarketsView />}
        {currentView === 'leaders' && <LeadersView />}
        {currentView === 'admin' && <AdminDashboard />}
      </main>

      {/* Global Footer */}
      <Footer />

      {/* Global Modals & Drawers */}
      <SearchModal />
      <BookmarksDrawer />
      <NewsletterModal />
      <LeaderModal />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainContent />
    </AppProvider>
  );
}
