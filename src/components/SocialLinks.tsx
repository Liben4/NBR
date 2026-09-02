import React, { useState } from 'react';
import { 
  Check, 
  ExternalLink, 
  Share2, 
  Users, 
  MessageCircle, 
  Send, 
  Sparkles 
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export interface SocialPlatform {
  id: string;
  name: string;
  handle: string;
  url: string;
  brandColor: string;
  bgLight: string;
  bgDark: string;
  textColor: string;
  description: string;
  icon: (props: { className?: string; size?: number }) => React.ReactElement;
}

// Crisp Vector Icons for All 5 Requested Platforms
export const SocialIcons = {
  LinkedIn: ({ className = 'w-4 h-4', size }: { className?: string; size?: number }) => (
    <svg 
      width={size || 16} 
      height={size || 16} 
      viewBox="0 0 24 24" 
      fill="currentColor" 
      className={className}
    >
      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76c.97 0 1.75-.79 1.75-1.76s-.78-1.75-1.75-1.75a1.75 1.75 0 0 0-1.75 1.75c0 .97.78 1.76 1.75 1.76m1.39 9.74v-8.37H5.07v8.37h2.78Z" />
    </svg>
  ),
  Facebook: ({ className = 'w-4 h-4', size }: { className?: string; size?: number }) => (
    <svg 
      width={size || 16} 
      height={size || 16} 
      viewBox="0 0 24 24" 
      fill="currentColor" 
      className={className}
    >
      <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c5.05-.5 9-4.76 9-9.95z" />
    </svg>
  ),
  Telegram: ({ className = 'w-4 h-4', size }: { className?: string; size?: number }) => (
    <svg 
      width={size || 16} 
      height={size || 16} 
      viewBox="0 0 24 24" 
      fill="currentColor" 
      className={className}
    >
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z" />
    </svg>
  ),
  X: ({ className = 'w-4 h-4', size }: { className?: string; size?: number }) => (
    <svg 
      width={size || 16} 
      height={size || 16} 
      viewBox="0 0 24 24" 
      fill="currentColor" 
      className={className}
    >
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  ),
  WhatsApp: ({ className = 'w-4 h-4', size }: { className?: string; size?: number }) => (
    <svg 
      width={size || 16} 
      height={size || 16} 
      viewBox="0 0 24 24" 
      fill="currentColor" 
      className={className}
    >
      <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2m.01 1.67c4.56 0 8.25 3.69 8.25 8.24 0 2.2-.86 4.28-2.42 5.84-1.56 1.56-3.64 2.42-5.84 2.42-1.44 0-2.85-.37-4.1-1.08l-.29-.17-3.06.8.82-2.98-.19-.3c-.78-1.25-1.2-2.69-1.2-4.17 0-4.55 3.7-8.24 8.24-8.24m4.52 11.66c-.25-.13-1.47-.72-1.7-.81-.23-.08-.39-.13-.56.13-.17.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.13-1.06-.39-2.03-1.25-.75-.67-1.26-1.5-1.41-1.75-.15-.25-.02-.39.11-.51.11-.11.25-.29.37-.44.13-.15.17-.25.25-.42.08-.17.04-.31-.02-.44-.06-.13-.56-1.35-.77-1.85-.2-.49-.41-.42-.56-.43h-.48c-.17 0-.44.06-.67.31-.23.25-.88.86-.88 2.1 0 1.24.9 2.44 1.03 2.61.13.17 1.78 2.71 4.3 3.8 2.53 1.09 2.53.73 2.99.68.46-.04 1.47-.6 1.68-1.18.21-.58.21-1.07.15-1.18-.06-.11-.23-.17-.48-.3z" />
    </svg>
  ),
};

export const SOCIAL_PLATFORMS: SocialPlatform[] = [
  {
    id: 'linkedin',
    name: 'LinkedIn',
    handle: '@negarit-business-review',
    url: 'https://www.linkedin.com/company/negarit-business-review',
    brandColor: '#0A66C2',
    bgLight: 'bg-[#0A66C2]/10 hover:bg-[#0A66C2]/20 border-[#0A66C2]/30',
    bgDark: 'bg-[#0A66C2]/20 hover:bg-[#0A66C2]/30 border-[#0A66C2]/40',
    textColor: 'text-[#0A66C2] dark:text-[#38BDF8]',
    description: 'Executive network, macroeconomic research, & CEO interviews',
    icon: SocialIcons.LinkedIn,
  },
  {
    id: 'telegram',
    name: 'Telegram',
    handle: '@NegaritReview',
    url: 'https://t.me/negaritbusinessreview',
    brandColor: '#24A1DE',
    bgLight: 'bg-[#24A1DE]/10 hover:bg-[#24A1DE]/20 border-[#24A1DE]/30',
    bgDark: 'bg-[#24A1DE]/20 hover:bg-[#24A1DE]/30 border-[#24A1DE]/40',
    textColor: 'text-[#0284C7] dark:text-[#38BDF8]',
    description: 'Real-time Ethiopian forex rates, NBE circulars & breaking alerts',
    icon: SocialIcons.Telegram,
  },
  {
    id: 'facebook',
    name: 'Facebook',
    handle: 'Negarit Business Review',
    url: 'https://www.facebook.com/negaritbusinessreview',
    brandColor: '#1877F2',
    bgLight: 'bg-[#1877F2]/10 hover:bg-[#1877F2]/20 border-[#1877F2]/30',
    bgDark: 'bg-[#1877F2]/20 hover:bg-[#1877F2]/30 border-[#1877F2]/40',
    textColor: 'text-[#1877F2] dark:text-[#60A5FA]',
    description: 'Business community debates, infographics & live briefings',
    icon: SocialIcons.Facebook,
  },
  {
    id: 'x',
    name: 'X (Twitter)',
    handle: '@NegaritReview',
    url: 'https://x.com/negaritreview',
    brandColor: '#000000',
    bgLight: 'bg-slate-900/10 hover:bg-slate-900/20 border-slate-900/30',
    bgDark: 'bg-slate-800/60 hover:bg-slate-700/80 border-slate-700',
    textColor: 'text-slate-900 dark:text-slate-100',
    description: 'Macro insights, ESX market updates & fast dispatch threads',
    icon: SocialIcons.X,
  },
  {
    id: 'whatsapp',
    name: 'WhatsApp',
    handle: 'Negarit Executive Channel',
    url: 'https://whatsapp.com/channel/negaritbusinessreview',
    brandColor: '#25D366',
    bgLight: 'bg-[#25D366]/10 hover:bg-[#25D366]/20 border-[#25D366]/30',
    bgDark: 'bg-[#25D366]/20 hover:bg-[#25D366]/30 border-[#25D366]/40',
    textColor: 'text-[#16A34A] dark:text-[#4ADE80]',
    description: 'Direct morning executive digest & currency bulletins',
    icon: SocialIcons.WhatsApp,
  },
];

interface SocialLinksProps {
  variant?: 'header-top' | 'header-compact' | 'footer-grid' | 'footer-centered' | 'share-bar' | 'sidebar-card';
  title?: string;
  shareData?: { title: string; url?: string; summary?: string };
  className?: string;
}

export const SocialLinks: React.FC<SocialLinksProps> = ({
  variant = 'header-top',
  title = 'Follow Us',
  shareData,
  className = '',
}) => {
  const { showToast } = useApp();
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleShareClick = (platform: SocialPlatform, e: React.MouseEvent) => {
    if (variant === 'share-bar' && shareData) {
      e.preventDefault();
      const encodedUrl = encodeURIComponent(shareData.url || (typeof window !== 'undefined' ? window.location.href : ''));
      const encodedTitle = encodeURIComponent(`${shareData.title} | Negarit Business Review`);

      let shareUrl = '';
      if (platform.id === 'telegram') {
        shareUrl = `https://t.me/share/url?url=${encodedUrl}&text=${encodedTitle}`;
      } else if (platform.id === 'whatsapp') {
        shareUrl = `https://api.whatsapp.com/send?text=${encodedTitle}%20${encodedUrl}`;
      } else if (platform.id === 'linkedin') {
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`;
      } else if (platform.id === 'x') {
        shareUrl = `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}&via=NegaritReview`;
      } else if (platform.id === 'facebook') {
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`;
      }

      if (shareUrl && typeof window !== 'undefined') {
        window.open(shareUrl, '_blank', 'noopener,noreferrer,width=600,height=500');
        showToast(`Sharing briefing to ${platform.name}`);
        return;
      }
    }

    showToast(`Opening Negarit Business Review on ${platform.name}`);
  };

  // 1. HEADER TOP BAR (Sleek minimalist pills with tooltips)
  if (variant === 'header-top') {
    return (
      <div className={`flex items-center gap-1 sm:gap-2 ${className}`}>
        <span className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mr-1 hidden sm:inline">
          {title}:
        </span>
        <div className="flex items-center gap-1">
          {SOCIAL_PLATFORMS.map((platform) => {
            const Icon = platform.icon;
            return (
              <a
                key={platform.id}
                href={platform.url}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => handleShareClick(platform, e)}
                className="group relative p-1.5 sm:p-1.5 rounded-lg text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white bg-slate-100 hover:bg-slate-200 dark:bg-slate-800/80 dark:hover:bg-slate-700 transition-all duration-200 hover:scale-105 active:scale-95"
                title={`Follow Negarit on ${platform.name} (${platform.handle})`}
                aria-label={`Follow on ${platform.name}`}
              >
                <Icon className="w-3.5 h-3.5 transition-colors group-hover:text-amber-600 dark:group-hover:text-amber-400" />
                
                {/* Micro tooltip */}
                <span className="pointer-events-none absolute -bottom-7 left-1/2 -translate-x-1/2 z-50 whitespace-nowrap rounded-md bg-slate-900 px-2 py-0.5 text-[10px] font-medium text-slate-100 opacity-0 shadow-lg transition-opacity group-hover:opacity-100 dark:bg-slate-100 dark:text-slate-900">
                  {platform.name}
                </span>
              </a>
            );
          })}
        </div>
      </div>
    );
  }

  // 2. HEADER COMPACT (Drawer / Mobile Navigation)
  if (variant === 'header-compact') {
    return (
      <div className={`space-y-3 ${className}`}>
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>Follow Negarit Official</span>
          </span>
          <span className="text-[10px] text-slate-400 font-mono">Official Channels</span>
        </div>
        <div className="grid grid-cols-5 gap-2">
          {SOCIAL_PLATFORMS.map((platform) => {
            const Icon = platform.icon;
            return (
              <a
                key={platform.id}
                href={platform.url}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => handleShareClick(platform, e)}
                className="flex flex-col items-center justify-center p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-amber-400 dark:hover:border-amber-400 transition-all group"
                title={`Follow on ${platform.name}`}
              >
                <Icon className={`w-5 h-5 ${platform.textColor} group-hover:scale-110 transition-transform`} />
                <span className="text-[10px] font-medium text-slate-600 dark:text-slate-400 mt-1 truncate max-w-full">
                  {platform.name.split(' ')[0]}
                </span>
              </a>
            );
          })}
        </div>
      </div>
    );
  }

  // 3. FOOTER CENTERED (Centered horizontal/grid layout under the footer)
  if (variant === 'footer-centered') {
    return (
      <div className={`w-full flex flex-col items-center justify-center ${className}`}>
        <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3.5 max-w-4xl mx-auto">
          {SOCIAL_PLATFORMS.map((platform) => {
            const Icon = platform.icon;
            return (
              <a
                key={platform.id}
                href={platform.url}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => handleShareClick(platform, e)}
                className="group inline-flex items-center gap-2.5 px-4 py-2 rounded-xl border border-slate-700/80 hover:border-amber-400/80 bg-slate-950/80 hover:bg-slate-800 text-slate-300 hover:text-white transition-all duration-200 shadow-sm hover:shadow-md hover:-translate-y-0.5"
                title={`Follow Negarit Business Review on ${platform.name}`}
              >
                <div className="p-1 rounded-lg bg-slate-900 border border-slate-800 group-hover:border-amber-500/40 transition-colors">
                  <Icon className={`w-4 h-4 ${platform.textColor}`} />
                </div>
                <div className="text-left">
                  <span className="text-xs font-bold text-slate-200 group-hover:text-amber-400 block leading-tight">
                    {platform.name}
                  </span>
                  <span className="text-[10px] text-slate-400 block leading-tight font-mono">
                    {platform.handle}
                  </span>
                </div>
                <ExternalLink className="w-3 h-3 text-slate-500 group-hover:text-amber-400 transition-colors ml-1" />
              </a>
            );
          })}
        </div>
      </div>
    );
  }

  // 4. FOOTER GRID (Executive community cards)
  if (variant === 'footer-grid') {
    return (
      <div className={`space-y-4 ${className}`}>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-slate-100 flex items-center gap-2">
              <Users className="w-4 h-4 text-amber-500" />
              <span>Follow Us & Join the Executive Network</span>
            </h4>
            <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">
              Connect on LinkedIn, Telegram, WhatsApp, Facebook, and X for direct morning intelligence.
            </p>
          </div>
          <span className="text-[11px] font-mono px-2.5 py-1 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/30 w-fit">
            Verified Editorial Channels
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          {SOCIAL_PLATFORMS.map((platform) => {
            const Icon = platform.icon;
            return (
              <a
                key={platform.id}
                href={platform.url}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => handleShareClick(platform, e)}
                className="group relative flex flex-col justify-between p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/90 hover:bg-slate-50 dark:hover:bg-slate-850 hover:border-amber-400/60 dark:hover:border-amber-400/60 transition-all duration-300 shadow-sm hover:shadow-lg hover:-translate-y-0.5"
              >
                <div>
                  <div className="flex items-center justify-between mb-2.5">
                    <div className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 group-hover:border-amber-400/50 transition-colors">
                      <Icon className={`w-5 h-5 ${platform.textColor}`} />
                    </div>
                    <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-amber-500 transition-colors opacity-60 group-hover:opacity-100" />
                  </div>

                  <span className="font-bold text-sm text-slate-900 dark:text-slate-100 block group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                    {platform.name}
                  </span>
                  <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400 block truncate">
                    {platform.handle}
                  </span>
                  
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-2 line-clamp-2 leading-relaxed">
                    {platform.description}
                  </p>
                </div>

                <div className="pt-3 mt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-end text-[11px]">
                  <span className="text-amber-600 dark:text-amber-400 font-bold group-hover:underline flex items-center gap-1">
                    <span>Follow</span>
                    <span>→</span>
                  </span>
                </div>
              </a>
            );
          })}
        </div>
      </div>
    );
  }

  // 5. SHARE BAR (For Article View with 1-click sharing)
  if (variant === 'share-bar') {
    return (
      <div className={`flex flex-wrap items-center gap-2 ${className}`}>
        <span className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 flex items-center gap-1 mr-1">
          <Share2 className="w-3.5 h-3.5 text-amber-500" />
          <span>Share:</span>
        </span>
        {SOCIAL_PLATFORMS.map((platform) => {
          const Icon = platform.icon;
          return (
            <button
              key={platform.id}
              onClick={(e) => handleShareClick(platform, e)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-amber-400 dark:hover:border-amber-400 text-slate-700 dark:text-slate-200 hover:text-amber-600 dark:hover:text-amber-400 transition-all shadow-sm active:scale-95"
              title={`Share on ${platform.name}`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{platform.name.split(' ')[0]}</span>
            </button>
          );
        })}
      </div>
    );
  }

  // 6. SIDEBAR CARD (Prominent community widget)
  return (
    <div className={`p-5 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/90 shadow-sm ${className}`}>
      <div className="flex items-center gap-2 mb-2">
        <div className="w-8 h-8 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center border border-amber-500/30">
          <Send className="w-4 h-4" />
        </div>
        <div>
          <h4 className="font-brand font-bold text-sm text-slate-900 dark:text-slate-100 uppercase tracking-wider">
            Follow Negarit Channels
          </h4>
          <p className="text-[11px] text-slate-500 dark:text-slate-400">
            Real-time business updates across 5 platforms
          </p>
        </div>
      </div>

      <div className="space-y-2 mt-4">
        {SOCIAL_PLATFORMS.map((platform) => {
          const Icon = platform.icon;
          return (
            <a
              key={platform.id}
              href={platform.url}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => handleShareClick(platform, e)}
              className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 dark:bg-slate-950/70 hover:bg-amber-500/10 border border-slate-200 dark:border-slate-800/80 hover:border-amber-400/50 transition-all group"
            >
              <div className="flex items-center gap-2.5">
                <div className="p-1.5 rounded-lg bg-white dark:bg-slate-900 shadow-xs border border-slate-200 dark:border-slate-700">
                  <Icon className={`w-4 h-4 ${platform.textColor}`} />
                </div>
                <div>
                  <span className="text-xs font-bold text-slate-800 dark:text-slate-200 group-hover:text-amber-600 dark:group-hover:text-amber-400 block">
                    {platform.name}
                  </span>
                  <span className="text-[10px] text-slate-500 dark:text-slate-400 block font-mono">
                    {platform.handle}
                  </span>
                </div>
              </div>
              <span className="text-[11px] font-bold text-slate-400 group-hover:text-amber-500">
                Join →
              </span>
            </a>
          );
        })}
      </div>
    </div>
  );
};
