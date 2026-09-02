import React from 'react';

interface BrandLogoProps {
  variant?: 'full-vertical' | 'horizontal' | 'icon-only';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  isDark?: boolean;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  variant = 'horizontal',
  size = 'md',
  className = '',
  isDark = true,
}) => {
  // Color tokens
  const navyColor = isDark ? '#FFFFFF' : '#0A2540';
  const navyAccent = isDark ? '#38BDF8' : '#0F2C59';
  const goldColor = '#D97706'; // Vibrant warm gold matching the emblem
  const goldLight = '#F59E0B';
  const subtextColor = isDark ? '#94A3B8' : '#475569';

  // SVG Emblem Icon (NBR monogram + Bar chart + Upward Arrow + Circular Arc)
  const Emblem = ({ iconSize = 44 }: { iconSize?: number }) => (
    <svg
      width={iconSize}
      height={iconSize}
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="shrink-0 transition-transform duration-300 group-hover:scale-105"
    >
      <defs>
        <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#F59E0B" />
          <stop offset="100%" stopColor="#D97706" />
        </linearGradient>
        <linearGradient id="navyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={isDark ? '#E2E8F0' : '#0F2C59'} />
          <stop offset="100%" stopColor={isDark ? '#94A3B8' : '#0A2540'} />
        </linearGradient>
      </defs>

      {/* Top Arc swoosh */}
      <path
        d="M 52 70 C 65 35 110 20 148 38 C 165 46 178 60 184 78"
        stroke="url(#navyGrad)"
        strokeWidth="3.5"
        strokeLinecap="round"
        fill="none"
        opacity="0.85"
      />

      {/* Bottom Left Arc swoosh */}
      <path
        d="M 55 90 C 42 110 46 142 66 160 C 80 172 98 178 118 178"
        stroke="url(#navyGrad)"
        strokeWidth="3.5"
        strokeLinecap="round"
        fill="none"
        opacity="0.85"
      />

      {/* Stylized 'N' */}
      <path
        d="M 46 122 L 57 52 L 72 52 L 95 106 L 95 52 L 108 52 L 97 122 L 82 122 L 59 68 L 59 122 Z"
        fill={isDark ? '#F8FAFC' : '#0A2540'}
      />

      {/* Stylized 'B' */}
      <path
        d="M 104 52 L 132 52 C 146 52 153 58 153 68 C 153 75 148 81 140 84 C 150 87 155 94 155 104 C 155 116 145 122 130 122 L 104 122 Z M 118 64 L 118 78 L 129 78 C 135 78 139 75 139 71 C 139 67 135 64 129 64 Z M 118 92 L 118 110 L 131 110 C 138 110 142 107 142 101 C 142 95 138 92 131 92 Z"
        fill="url(#goldGrad)"
      />

      {/* Stylized 'R' */}
      <path
        d="M 148 52 L 176 52 C 188 52 195 58 195 69 C 195 78 189 85 180 87 L 196 122 L 181 122 L 168 89 L 162 89 L 162 122 L 148 122 Z M 162 64 L 162 77 L 173 77 C 178 77 182 74 182 70 C 182 66 178 64 173 64 Z"
        fill={isDark ? '#F8FAFC' : '#0A2540'}
      />

      {/* Financial Bar Chart (4 ascending navy/slate bars) */}
      <rect x="74" y="145" width="10" height="15" rx="2" fill={isDark ? '#64748B' : '#0A2540'} />
      <rect x="88" y="136" width="10" height="24" rx="2" fill={isDark ? '#94A3B8' : '#0A2540'} />
      <rect x="102" y="125" width="10" height="35" rx="2" fill={isDark ? '#CBD5E1' : '#0A2540'} />
      <rect x="116" y="112" width="10" height="48" rx="2" fill={isDark ? '#F8FAFC' : '#0A2540'} />

      {/* Upward Curving Golden Growth Arrow */}
      <path
        d="M 64 154 C 84 174 126 170 162 132"
        stroke="url(#goldGrad)"
        strokeWidth="6.5"
        strokeLinecap="round"
        fill="none"
      />
      {/* Arrowhead */}
      <polygon
        points="176,120 152,126 166,140"
        fill="url(#goldGrad)"
      />
    </svg>
  );

  // Icon only
  if (variant === 'icon-only') {
    const sizePx = size === 'sm' ? 32 : size === 'md' ? 44 : size === 'lg' ? 60 : 80;
    return (
      <div className={`inline-flex items-center justify-center ${className}`}>
        <Emblem iconSize={sizePx} />
      </div>
    );
  }

  // Full Vertical (Stacked: Emblem + NEGARIT + BUSINESS REVIEW + Tagline)
  if (variant === 'full-vertical') {
    return (
      <div className={`flex flex-col items-center text-center select-none ${className}`}>
        <Emblem iconSize={size === 'lg' ? 84 : size === 'xl' ? 104 : 68} />
        
        {/* NEGARIT with Golden Delta 'A' */}
        <div className="mt-3 flex items-center justify-center tracking-wider">
          <span 
            className="font-brand font-black text-2xl sm:text-3xl tracking-[0.22em] uppercase"
            style={{ color: navyColor }}
          >
            NEG
          </span>
          {/* Stylized Delta Triangle for 'A' */}
          <span className="inline-flex items-center justify-center px-0.5">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
              <path d="M12 3L22 21H2L12 3Z" fill={goldColor} />
              <path d="M12 9L17 18H7L12 9Z" fill={isDark ? '#0F172A' : '#FFFFFF'} />
            </svg>
          </span>
          <span 
            className="font-brand font-black text-2xl sm:text-3xl tracking-[0.22em] uppercase"
            style={{ color: navyColor }}
          >
            RIT
          </span>
        </div>

        {/* Subtitle: — BUSINESS REVIEW — */}
        <div className="flex items-center gap-2 mt-1">
          <span className="h-[1px] w-6 sm:w-8 bg-amber-500/60" />
          <span className="text-[11px] sm:text-xs font-brand font-bold tracking-[0.26em] uppercase text-amber-500">
            Business Review
          </span>
          <span className="h-[1px] w-6 sm:w-8 bg-amber-500/60" />
        </div>

        {/* Tagline */}
        <div className="flex items-center gap-2 mt-1.5 text-[10px] sm:text-[11px] font-editorial italic tracking-wide text-slate-400">
          <span className="text-slate-600">― •</span>
          <span>Navigating Business Dynamics</span>
          <span className="text-slate-600">• ―</span>
        </div>
      </div>
    );
  }

  // Horizontal Header Layout (Emblem on Left + Wordmark on Right)
  return (
    <div className={`inline-flex items-center gap-3 select-none ${className}`}>
      <Emblem iconSize={size === 'sm' ? 36 : size === 'lg' ? 52 : 44} />
      
      <div className="flex flex-col text-left">
        {/* NEGARIT + REVIEW */}
        <div className="flex items-baseline gap-1.5 leading-none">
          <div className="flex items-center">
            <span 
              className="font-brand font-black text-xl sm:text-2xl md:text-[26px] tracking-[0.14em] uppercase"
              style={{ color: navyColor }}
            >
              NEG
            </span>
            <span className="inline-flex items-center justify-center px-0.5">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="sm:w-5 sm:h-5">
                <path d="M12 3L22 21H2L12 3Z" fill={goldColor} />
                <path d="M12 10L16.5 18H7.5L12 10Z" fill={isDark ? '#020617' : '#FFFFFF'} />
              </svg>
            </span>
            <span 
              className="font-brand font-black text-xl sm:text-2xl md:text-[26px] tracking-[0.14em] uppercase"
              style={{ color: navyColor }}
            >
              RIT
            </span>
          </div>

          <span className="font-brand font-bold text-xs sm:text-sm md:text-base tracking-[0.18em] text-amber-500 uppercase">
            REVIEW
          </span>
        </div>

        {/* Tagline */}
        <div className="flex items-center gap-1.5 mt-0.5">
          <span className="h-[1px] w-2.5 bg-amber-500/50 hidden sm:inline" />
          <span className="font-editorial italic text-[10px] sm:text-[11px] md:text-xs text-slate-400 tracking-wide">
            Navigating Business Dynamics
          </span>
        </div>
      </div>
    </div>
  );
};
