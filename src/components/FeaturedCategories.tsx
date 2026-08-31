import React, { useState } from 'react';
import { 
  Building, 
  TrendingUp, 
  Landmark, 
  Cpu, 
  Rocket, 
  ArrowRight,
  Clock,
  Sparkles
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Article, CategoryType } from '../types';

interface CategoryConfig {
  id: CategoryType;
  title: string;
  subtitle: string;
  icon: React.ElementType;
  accentColor: string;
}

const CATEGORY_TABS: CategoryConfig[] = [
  {
    id: 'Business',
    title: 'Business & Corporate',
    subtitle: 'Mergers, acquisitions, commercial strategies, and enterprise earnings.',
    icon: Building,
    accentColor: 'from-blue-600 to-indigo-600'
  },
  {
    id: 'Economy',
    title: 'Macro Economy & Trade',
    subtitle: 'Fiscal reforms, central banking policies, and cross-border corridors.',
    icon: TrendingUp,
    accentColor: 'from-emerald-600 to-teal-600'
  },
  {
    id: 'Finance',
    title: 'Banking, Fintech & ESX',
    subtitle: 'Capital markets, commercial liquidity, insurance, and mobile money.',
    icon: Landmark,
    accentColor: 'from-amber-600 to-orange-600'
  },
  {
    id: 'Technology',
    title: 'Technology & Telecom',
    subtitle: 'Digital infrastructure, AI algorithms, 5G rollouts, and tech policy.',
    icon: Cpu,
    accentColor: 'from-cyan-600 to-blue-600'
  },
  {
    id: 'Entrepreneurship',
    title: 'Founders & Startups',
    subtitle: 'Venture funding, high-growth SMEs, and Ethiopian innovation hubs.',
    icon: Rocket,
    accentColor: 'from-purple-600 to-pink-600'
  }
];

export const FeaturedCategories: React.FC = () => {
  const { articles, openArticle, setSelectedCategory, setCurrentView } = useApp();
  const [activeTab, setActiveTab] = useState<CategoryType>('Business');

  const currentConfig = CATEGORY_TABS.find(t => t.id === activeTab) || CATEGORY_TABS[0];
  
  // Articles in this category
  const categoryArticles = articles.filter(a => a.category === activeTab && a.status === 'published');
  
  // If not enough in category, fallback gracefully
  const featured = categoryArticles[0] || articles[0];
  const sideList = categoryArticles.length > 1 
    ? categoryArticles.slice(1, 4) 
    : articles.filter(a => a.id !== featured.id).slice(0, 3);

  const handleExploreMore = () => {
    setSelectedCategory(activeTab);
    setCurrentView('category');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section className="w-full max-w-7xl mx-auto px-4 sm:px-8 py-8">
      
      {/* Category Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-4 border-b border-slate-800 mb-6">
        <div>
          <div className="flex items-center gap-2 text-amber-400 font-brand text-xs uppercase tracking-widest font-bold">
            <Sparkles className="w-4 h-4" />
            <span>Curated Desks</span>
          </div>
          <h2 className="font-editorial text-2xl sm:text-3xl font-bold text-slate-100 mt-1">
            Featured Sectors & Coverage
          </h2>
        </div>

        {/* Category Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
          {CATEGORY_TABS.map(tab => {
            const Icon = tab.icon;
            const isSelected = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all whitespace-nowrap ${
                  isSelected
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-900/30'
                    : 'bg-slate-900 text-slate-400 hover:text-slate-200 hover:bg-slate-800 border border-slate-800'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.id}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Dynamic Category Showcase Grid */}
      <div className="bg-slate-900/50 border border-slate-800/80 rounded-2xl p-4 sm:p-6">
        
        {/* Category Header Banner */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 mb-6 border-b border-slate-800/60">
          <div>
            <h3 className="font-editorial text-xl font-bold text-slate-100 flex items-center gap-2">
              <currentConfig.icon className="w-5 h-5 text-blue-400" />
              {currentConfig.title}
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">{currentConfig.subtitle}</p>
          </div>

          <button
            onClick={handleExploreMore}
            className="self-start sm:self-auto inline-flex items-center gap-1 text-xs font-semibold text-blue-400 hover:text-blue-300 transition-colors"
          >
            <span>View all {activeTab} coverage</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Featured Story + Supporting Stories */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Main Lead Story in Category (7 cols) */}
          {featured && (
            <div 
              onClick={() => openArticle(featured)}
              className="lg:col-span-7 group cursor-pointer flex flex-col justify-between rounded-xl bg-slate-900 border border-slate-800/80 hover:border-slate-700 overflow-hidden transition-all duration-300"
            >
              <div className="relative aspect-video w-full overflow-hidden bg-slate-800">
                <img 
                  src={featured.featuredImage} 
                  alt={featured.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
                <span className="absolute bottom-3 left-3 px-2.5 py-0.5 rounded bg-blue-600 text-white text-[11px] font-bold uppercase tracking-wider">
                  Featured {featured.category} Story
                </span>
              </div>

              <div className="p-5 flex flex-col justify-between flex-grow">
                <div>
                  <h4 className="font-editorial text-xl sm:text-2xl font-bold text-slate-100 group-hover:text-blue-400 transition-colors leading-snug">
                    {featured.title}
                  </h4>
                  <p className="text-slate-400 text-xs sm:text-sm mt-2 line-clamp-2">
                    {featured.subtitle || featured.excerpt}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
                  <span className="font-medium text-slate-300">{featured.author.name}</span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3 text-slate-500" />
                    {featured.readTime}
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Supporting Stories (5 cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-3">
            {sideList.map((article: Article) => (
              <div
                key={`cat-side-${article.id}`}
                onClick={() => openArticle(article)}
                className="group/side cursor-pointer p-3.5 rounded-xl bg-slate-900/80 hover:bg-slate-800/80 border border-slate-800/80 hover:border-slate-700 transition-all flex gap-3.5 items-center"
              >
                <div className="w-20 h-20 rounded-lg overflow-hidden shrink-0 bg-slate-800">
                  <img 
                    src={article.featuredImage} 
                    alt={article.title}
                    className="w-full h-full object-cover group-hover/side:scale-105 transition-transform"
                    referrerPolicy="no-referrer"
                  />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400">
                      {article.category}
                    </span>
                    <span className="text-slate-600 text-xs">•</span>
                    <span className="text-[10px] text-slate-400">{article.readTime}</span>
                  </div>
                  <h5 className="font-editorial text-sm font-semibold text-slate-200 group-hover/side:text-blue-400 transition-colors line-clamp-2 leading-snug">
                    {article.title}
                  </h5>
                  <span className="text-[11px] text-slate-500 block mt-1">
                    {article.author.name}
                  </span>
                </div>
              </div>
            ))}
          </div>

        </div>

      </div>

    </section>
  );
};
