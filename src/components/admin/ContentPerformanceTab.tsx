import React, { useState, useMemo } from 'react';
import { 
  TrendingUp, 
  Eye, 
  Share2, 
  Clock, 
  Layers, 
  Search, 
  Globe, 
  Mail, 
  ExternalLink, 
  ArrowUpRight, 
  ArrowDownRight, 
  Calendar,
  Sparkles,
  BarChart3,
  Flame,
  PieChart
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Article, CategoryType } from '../../types';

export const ContentPerformanceTab: React.FC = () => {
  const { articles, categories, trafficSources, openArticle } = useApp();
  const [timeRange, setTimeRange] = useState<'today' | '7d' | '30d' | 'all'>('7d');
  const [activeMetricTab, setActiveMetricTab] = useState<'views' | 'shares' | 'categories' | 'sources'>('views');

  // Multiplier simulation for timeframes
  const multiplier = useMemo(() => {
    switch (timeRange) {
      case 'today': return 0.18;
      case '7d': return 1;
      case '30d': return 3.6;
      case 'all': return 8.2;
    }
  }, [timeRange]);

  // Aggregate stats
  const totalViews = useMemo(() => {
    const rawSum = articles.reduce((acc, a) => acc + (a.views || 0), 0);
    return Math.round(rawSum * multiplier);
  }, [articles, multiplier]);

  const totalShares = useMemo(() => {
    const rawSum = articles.reduce((acc, a) => acc + (a.shares || 0), 0);
    return Math.round(rawSum * multiplier);
  }, [articles, multiplier]);

  const averageReadMinutes = useMemo(() => {
    const published = articles.filter(a => a.status === 'published');
    if (published.length === 0) return '4.2 min';
    const totalMinutes = published.reduce((acc, a) => {
      const match = a.readTime.match(/(\d+)/);
      return acc + (match ? parseInt(match[1], 10) : 5);
    }, 0);
    return `${(totalMinutes / published.length).toFixed(1)} min`;
  }, [articles]);

  // 1. Most Viewed Articles
  const mostViewedArticles = useMemo(() => {
    return [...articles]
      .filter(a => a.status === 'published')
      .sort((a, b) => (b.views || 0) - (a.views || 0))
      .slice(0, 8);
  }, [articles]);

  // 2. Most Shared Articles
  const mostSharedArticles = useMemo(() => {
    return [...articles]
      .filter(a => a.status === 'published')
      .sort((a, b) => (b.shares || 0) - (a.shares || 0))
      .slice(0, 8);
  }, [articles]);

  // 3. Most Popular Categories
  const categoryPerformance = useMemo(() => {
    const map: { [cat: string]: { views: number; count: number; shares: number } } = {};
    articles.forEach(a => {
      if (!map[a.category]) {
        map[a.category] = { views: 0, count: 0, shares: 0 };
      }
      map[a.category].views += a.views || 0;
      map[a.category].shares += a.shares || 0;
      map[a.category].count += 1;
    });

    const totalCategoryViews = Object.values(map).reduce((acc, curr) => acc + curr.views, 0) || 1;

    return Object.keys(map).map(catName => {
      const data = map[catName];
      const scaledViews = Math.round(data.views * multiplier);
      const percentage = Number(((data.views / totalCategoryViews) * 100).toFixed(1));
      return {
        name: catName,
        views: scaledViews,
        count: data.count,
        shares: Math.round(data.shares * multiplier),
        percentage,
        avgViewsPerArticle: data.count > 0 ? Math.round(scaledViews / data.count) : 0
      };
    }).sort((a, b) => b.views - a.views);
  }, [articles, multiplier]);

  // Max views for calculating bar lengths
  const maxArticleViews = useMemo(() => {
    if (mostViewedArticles.length === 0) return 1;
    return Math.max(...mostViewedArticles.map(a => Math.round((a.views || 0) * multiplier)));
  }, [mostViewedArticles, multiplier]);

  const maxArticleShares = useMemo(() => {
    if (mostSharedArticles.length === 0) return 1;
    return Math.max(...mostSharedArticles.map(a => Math.round((a.shares || 0) * multiplier)));
  }, [mostSharedArticles, multiplier]);

  return (
    <div className="space-y-6">
      {/* Header & Range Selector */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold font-editorial text-slate-900 dark:text-slate-100 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            <span>Editorial Content Performance & Audience Analytics</span>
          </h2>
          <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">
            Real-time analytics for article reads, viral distribution, category engagement, and multi-channel traffic.
          </p>
        </div>

        {/* Timeframe selector */}
        <div className="flex items-center gap-1 p-1 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 self-start sm:self-auto">
          {(['today', '7d', '30d', 'all'] as const).map(range => (
            <button
              key={range}
              onClick={() => setTimeRange(range)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold capitalize transition-all ${
                timeRange === range
                  ? 'bg-white dark:bg-slate-800 text-blue-600 dark:text-blue-400 shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
              }`}
            >
              {range === 'today' ? 'Today' : range === '7d' ? '7 Days' : range === '30d' ? '30 Days' : 'All Time'}
            </button>
          ))}
        </div>
      </div>

      {/* Top 4 Key Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Total Views */}
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">Total Briefing Views</span>
            <div className="w-8 h-8 rounded-xl bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 flex items-center justify-center">
              <Eye className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline justify-between">
            <span className="text-2xl font-bold font-editorial text-slate-900 dark:text-slate-100">
              {totalViews.toLocaleString()}
            </span>
            <span className="inline-flex items-center text-xs font-bold text-emerald-600 dark:text-emerald-400">
              <ArrowUpRight className="w-3.5 h-3.5 mr-0.5" />
              +16.4%
            </span>
          </div>
          <p className="text-[11px] text-slate-500">Avg. 1,420 unique readers per active article</p>
        </div>

        {/* Card 2: Total Shares */}
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">Total Shares & Reposts</span>
            <div className="w-8 h-8 rounded-xl bg-indigo-100 dark:bg-indigo-900/40 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
              <Share2 className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline justify-between">
            <span className="text-2xl font-bold font-editorial text-slate-900 dark:text-slate-100">
              {totalShares.toLocaleString()}
            </span>
            <span className="inline-flex items-center text-xs font-bold text-emerald-600 dark:text-emerald-400">
              <ArrowUpRight className="w-3.5 h-3.5 mr-0.5" />
              +24.1%
            </span>
          </div>
          <p className="text-[11px] text-slate-500">Dominant on LinkedIn & Executive Newsletter</p>
        </div>

        {/* Card 3: Average Reading Time */}
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">Average Reading Time</span>
            <div className="w-8 h-8 rounded-xl bg-amber-100 dark:bg-amber-900/40 text-amber-600 dark:text-amber-400 flex items-center justify-center">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline justify-between">
            <span className="text-2xl font-bold font-editorial text-slate-900 dark:text-slate-100">
              {averageReadMinutes}
            </span>
            <span className="inline-flex items-center text-xs font-bold text-emerald-600 dark:text-emerald-400">
              <ArrowUpRight className="w-3.5 h-3.5 mr-0.5" />
              +0.8 min
            </span>
          </div>
          <p className="text-[11px] text-slate-500">78.4% article completion / scroll depth rate</p>
        </div>

        {/* Card 4: Top Category */}
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">Top Performing Sector</span>
            <div className="w-8 h-8 rounded-xl bg-emerald-100 dark:bg-emerald-900/40 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
              <Layers className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline justify-between">
            <span className="text-2xl font-bold font-editorial text-slate-900 dark:text-slate-100 truncate">
              {categoryPerformance[0]?.name || 'Economy'}
            </span>
            <span className="text-xs font-bold text-slate-500">
              {categoryPerformance[0]?.percentage || 0}% share
            </span>
          </div>
          <p className="text-[11px] text-slate-500">Highest reader retention on macroeconomic reforms</p>
        </div>
      </div>

      {/* Traffic Sources Breakdown (Search, Facebook, Instagram, LinkedIn, Direct, Newsletter) */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-xs space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h3 className="text-base font-bold font-editorial text-slate-900 dark:text-slate-100 flex items-center gap-2">
              <Globe className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              <span>Multi-Channel Traffic Sources & Acquisition Distribution</span>
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Tracking origin gateways driving readership into Negarit Business Review.
            </p>
          </div>

          <span className="text-xs font-mono font-semibold px-2.5 py-1 rounded-lg bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-900">
            6 Tracked Gateways
          </span>
        </div>

        {/* Traffic Source Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {trafficSources.map((src) => {
            const scaledSessions = Math.round(src.sessions * multiplier);

            return (
              <div 
                key={src.id}
                className="p-4 rounded-xl bg-slate-50/70 dark:bg-slate-950/60 border border-slate-200/80 dark:border-slate-800/80 hover:border-slate-300 dark:hover:border-slate-700 transition-all space-y-3"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <span className="text-xl" role="img" aria-label={src.name}>
                      {src.iconEmoji}
                    </span>
                    <div>
                      <h4 className="font-bold text-xs text-slate-900 dark:text-slate-100">{src.name}</h4>
                      <span className="text-[10px] text-slate-500 font-medium">Avg. Duration: {src.avgDuration}</span>
                    </div>
                  </div>

                  <span className={`inline-flex items-center text-[11px] font-bold ${
                    src.isPositive ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'
                  }`}>
                    {src.isPositive ? <ArrowUpRight className="w-3 h-3 mr-0.5" /> : <ArrowDownRight className="w-3 h-3 mr-0.5" />}
                    {src.change > 0 ? `+${src.change}%` : `${src.change}%`}
                  </span>
                </div>

                {/* Progress bar */}
                <div className="space-y-1">
                  <div className="flex justify-between text-[11px] text-slate-600 dark:text-slate-400">
                    <span className="font-mono font-semibold text-slate-900 dark:text-slate-200">
                      {scaledSessions.toLocaleString()} sessions
                    </span>
                    <span className="font-bold">{src.percentage}%</span>
                  </div>
                  <div className="h-2 w-full bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
                    <div 
                      className="h-full rounded-full transition-all duration-500"
                      style={{ 
                        width: `${src.percentage}%`,
                        backgroundColor: src.color || '#3b82f6'
                      }}
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between text-[10px] text-slate-500 pt-1 border-t border-slate-200/60 dark:border-slate-800/60">
                  <span>Bounce Rate: <strong>{src.bounceRate}</strong></span>
                  <span className="font-mono text-blue-600 dark:text-blue-400">Verified UTM Source</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Main Analytics Sections: Tabbed Views */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs overflow-hidden">
        {/* Navigation Tabs */}
        <div className="p-3 bg-slate-50 dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-1">
            <button
              onClick={() => setActiveMetricTab('views')}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold inline-flex items-center gap-1.5 transition-all ${
                activeMetricTab === 'views'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-800'
              }`}
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Most Viewed Articles</span>
            </button>

            <button
              onClick={() => setActiveMetricTab('shares')}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold inline-flex items-center gap-1.5 transition-all ${
                activeMetricTab === 'shares'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-800'
              }`}
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>Most Shared Articles</span>
            </button>

            <button
              onClick={() => setActiveMetricTab('categories')}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold inline-flex items-center gap-1.5 transition-all ${
                activeMetricTab === 'categories'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-800'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Popular Categories</span>
            </button>
          </div>

          <span className="text-xs text-slate-500 hidden sm:inline">
            Ranked by engagement algorithms
          </span>
        </div>

        {/* Tab 1: Most Viewed Articles */}
        {activeMetricTab === 'views' && (
          <div className="divide-y divide-slate-200 dark:divide-slate-800">
            {mostViewedArticles.map((article, idx) => {
              const scaledViews = Math.round((article.views || 0) * multiplier);
              const viewPercentage = Math.round((scaledViews / maxArticleViews) * 100);

              return (
                <div key={article.id} className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                  <div className="flex items-start gap-3.5 flex-1">
                    <span className="w-7 h-7 rounded-lg bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-400 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5 border border-blue-200 dark:border-blue-900">
                      #{idx + 1}
                    </span>

                    <div className="space-y-1 flex-1">
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                          {article.category}
                        </span>
                        <span className="text-xs text-slate-500 font-medium">
                          by {article.author.name} • {article.readTime}
                        </span>
                      </div>

                      <h4 
                        onClick={() => openArticle(article)}
                        className="font-editorial text-sm font-bold text-slate-900 dark:text-slate-100 hover:text-blue-600 dark:hover:text-blue-400 cursor-pointer line-clamp-1 transition-colors"
                      >
                        {article.title}
                      </h4>

                      {/* Visual Bar */}
                      <div className="w-full max-w-md bg-slate-100 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden mt-2">
                        <div 
                          className="bg-blue-600 h-full rounded-full transition-all duration-500"
                          style={{ width: `${viewPercentage}%` }}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-6 sm:text-right shrink-0">
                    <div>
                      <span className="block text-sm sm:text-base font-bold font-editorial text-slate-900 dark:text-slate-100">
                        {scaledViews.toLocaleString()}
                      </span>
                      <span className="text-[10px] text-slate-500 uppercase font-semibold">Total Views</span>
                    </div>

                    <div>
                      <span className="block text-sm sm:text-base font-bold font-editorial text-indigo-600 dark:text-indigo-400">
                        {Math.round((article.shares || 0) * multiplier).toLocaleString()}
                      </span>
                      <span className="text-[10px] text-slate-500 uppercase font-semibold">Shares</span>
                    </div>

                    <button
                      onClick={() => openArticle(article)}
                      className="p-2 rounded-xl text-slate-400 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-950/50 transition-colors"
                      title="Open full briefing"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Tab 2: Most Shared Articles */}
        {activeMetricTab === 'shares' && (
          <div className="divide-y divide-slate-200 dark:divide-slate-800">
            {mostSharedArticles.map((article, idx) => {
              const scaledShares = Math.round((article.shares || 0) * multiplier);
              const sharePercentage = Math.round((scaledShares / maxArticleShares) * 100);

              return (
                <div key={article.id} className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                  <div className="flex items-start gap-3.5 flex-1">
                    <span className="w-7 h-7 rounded-lg bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-400 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5 border border-indigo-200 dark:border-indigo-900">
                      #{idx + 1}
                    </span>

                    <div className="space-y-1 flex-1">
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                          {article.category}
                        </span>
                        <span className="text-xs text-slate-500 font-medium">
                          by {article.author.name}
                        </span>
                      </div>

                      <h4 
                        onClick={() => openArticle(article)}
                        className="font-editorial text-sm font-bold text-slate-900 dark:text-slate-100 hover:text-indigo-600 dark:hover:text-indigo-400 cursor-pointer line-clamp-1 transition-colors"
                      >
                        {article.title}
                      </h4>

                      {/* Visual Bar */}
                      <div className="w-full max-w-md bg-slate-100 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden mt-2">
                        <div 
                          className="bg-indigo-600 h-full rounded-full transition-all duration-500"
                          style={{ width: `${sharePercentage}%` }}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-6 sm:text-right shrink-0">
                    <div>
                      <span className="block text-sm sm:text-base font-bold font-editorial text-indigo-600 dark:text-indigo-400">
                        {scaledShares.toLocaleString()}
                      </span>
                      <span className="text-[10px] text-slate-500 uppercase font-semibold">Total Shares</span>
                    </div>

                    <div>
                      <span className="block text-sm sm:text-base font-bold font-editorial text-slate-900 dark:text-slate-100">
                        {Math.round((article.views || 0) * multiplier).toLocaleString()}
                      </span>
                      <span className="text-[10px] text-slate-500 uppercase font-semibold">Views</span>
                    </div>

                    <button
                      onClick={() => openArticle(article)}
                      className="p-2 rounded-xl text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-950/50 transition-colors"
                      title="Open full briefing"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Tab 3: Most Popular Categories */}
        {activeMetricTab === 'categories' && (
          <div className="divide-y divide-slate-200 dark:divide-slate-800">
            {categoryPerformance.map((cat, idx) => (
              <div key={cat.name} className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                <div className="flex items-center gap-3.5 flex-1">
                  <span className="w-7 h-7 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 font-bold text-xs flex items-center justify-center shrink-0 border border-emerald-200 dark:border-emerald-900">
                    #{idx + 1}
                  </span>

                  <div className="space-y-1 flex-1">
                    <div className="flex items-center gap-2">
                      <h4 className="font-bold text-sm text-slate-900 dark:text-slate-100">
                        {cat.name}
                      </h4>
                      <span className="text-xs text-slate-500">
                        ({cat.count} published articles)
                      </span>
                    </div>

                    <div className="w-full max-w-md bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                      <div 
                        className="bg-emerald-600 h-full rounded-full transition-all duration-500"
                        style={{ width: `${cat.percentage}%` }}
                      />
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-6 sm:text-right shrink-0">
                  <div>
                    <span className="block text-sm sm:text-base font-bold font-editorial text-slate-900 dark:text-slate-100">
                      {cat.views.toLocaleString()}
                    </span>
                    <span className="text-[10px] text-slate-500 uppercase font-semibold">Total Category Views</span>
                  </div>

                  <div>
                    <span className="block text-sm sm:text-base font-bold font-editorial text-emerald-600 dark:text-emerald-400">
                      {cat.percentage}%
                    </span>
                    <span className="text-[10px] text-slate-500 uppercase font-semibold">Audience Share</span>
                  </div>

                  <div>
                    <span className="block text-sm sm:text-base font-bold font-editorial text-slate-700 dark:text-slate-300">
                      {cat.avgViewsPerArticle.toLocaleString()}
                    </span>
                    <span className="text-[10px] text-slate-500 uppercase font-semibold">Avg / Article</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
