import React from 'react';

export interface BrandLogoProps {
  variant?: 'full-vertical' | 'horizontal' | 'icon-only' | 'stacked-compact';
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  isDark?: boolean;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  variant = 'horizontal',
  size = 'md',
  className = '',
  isDark = false,
}) => {
  // Theme color tokens matching the official NBR palette
  const navyMain = isDark ? '#F8FAFC' : '#0A1E3F';
  const navySecondary = isDark ? '#94A3B8' : '#0A1E3F';
  const goldColor = '#D97706';
  const goldGradientStart = '#F5A623';
  const goldGradientEnd = '#D97706';
  const taglineColor = isDark ? '#94A3B8' : '#1E293B';

  // SVG Emblem: NBR monogram with 4 financial bars, sweeping golden growth arrow, and orbital arcs
  const NBREmblem: React.FC<{ iconSize: number }> = ({ iconSize }) => (
    <svg
      width={iconSize}
      height={iconSize}
      viewBox="0 0 220 220"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="shrink-0 select-none transition-transform duration-300 group-hover:scale-[1.03]"
    >
      <defs>
        <linearGradient id={`goldGrad-${isDark ? 'dark' : 'light'}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={goldGradientStart} />
          <stop offset="50%" stopColor="#E5941E" />
          <stop offset="100%" stopColor={goldGradientEnd} />
        </linearGradient>

        <linearGradient id={`navyGrad-${isDark ? 'dark' : 'light'}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={isDark ? '#F8FAFC' : '#0E274A'} />
          <stop offset="100%" stopColor={isDark ? '#CBD5E1' : '#081A36'} />
        </linearGradient>
      </defs>

      {/* Top Arc Orbit */}
      <path
        d="M 38 98 C 34 54 74 24 120 24 C 154 24 182 41 196 66"
        stroke={navySecondary}
        strokeWidth="4"
        strokeLinecap="round"
        fill="none"
        opacity={isDark ? 0.75 : 0.9}
      />

      {/* Bottom Left Arc Orbit */}
      <path
        d="M 38 108 C 34 134 45 164 68 184 C 80 192 92 197 106 198"
        stroke={navySecondary}
        strokeWidth="4"
        strokeLinecap="round"
        fill="none"
        opacity={isDark ? 0.75 : 0.9}
      />

      {/* Letter 'N' */}
      <path
        d="M 34 140 L 46 54 L 64 54 L 92 120 L 92 54 L 108 54 L 94 140 L 76 140 L 49 76 L 49 140 Z"
        fill={navyMain}
      />

      {/* Letter 'B' (Warm Gold with sharp 3D fold geometry) */}
      <path
        d="M 103 54 L 138 54 C 155 54 164 63 164 75 C 164 84 158 91 148 95 C 160 100 166 108 166 120 C 166 133 153 140 135 140 L 103 140 Z M 120 68 L 120 85 L 135 85 C 142 85 147 82 147 76 C 147 71 142 68 135 68 Z M 120 101 L 120 126 L 136 126 C 144 126 149 122 149 113 C 149 105 144 101 136 101 Z"
        fill={`url(#goldGrad-${isDark ? 'dark' : 'light'})`}
      />

      {/* Letter 'R' */}
      <path
        d="M 157 54 L 192 54 C 206 54 215 62 215 75 C 215 86 207 94 196 97 L 217 140 L 198 140 L 181 101 L 173 101 L 173 140 L 157 140 Z M 173 68 L 173 86 L 188 86 C 194 86 198 83 198 77 C 198 72 194 68 188 68 Z"
        fill={navyMain}
      />

      {/* Financial Bar Chart (4 Ascending Navy/White columns under N & B) */}
      <rect x="78" y="162" width="13" height="19" rx="2" fill={navyMain} />
      <rect x="96" y="150" width="13" height="31" rx="2" fill={navyMain} />
      <rect x="114" y="136" width="13" height="45" rx="2" fill={navyMain} />
      <rect x="132" y="122" width="13" height="59" rx="2" fill={navyMain} />

      {/* Sweeping Upward Golden Growth Arrow */}
      <path
        d="M 62 176 C 84 203 136 205 182 159"
        stroke={`url(#goldGrad-${isDark ? 'dark' : 'light'})`}
        strokeWidth="8.5"
        strokeLinecap="round"
        fill="none"
      />
      {/* Arrowhead */}
      <polygon
        points="199,142 169,152 186,169"
        fill={`url(#goldGrad-${isDark ? 'dark' : 'light'})`}
      />
    </svg>
  );

  // Stylized 'A' component with outer chevron and inner solid gold delta triangle
  const StylizedA: React.FC<{ sizePx?: number }> = ({ sizePx = 20 }) => (
    <span className="inline-flex items-center justify-center shrink-0 mx-[1px]">
      <svg
        width={sizePx}
        height={sizePx}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Outer Chevron Frame */}
        <path
          d="M 12 1.5 L 23.5 22.5 L 17.5 22.5 L 12 11.5 L 6.5 22.5 L 0.5 22.5 Z"
          fill={navyMain}
        />
        {/* Golden Solid Triangle nested in inner counter */}
        <polygon
          points="12,10 17,20 7,20"
          fill={goldColor}
        />
      </svg>
    </span>
  );

  // 1. ICON ONLY VARIANT
  if (variant === 'icon-only') {
    const sizeMap = {
      xs: 28,
      sm: 36,
      md: 46,
      lg: 64,
      xl: 88,
    };
    return (
      <div className={`inline-flex items-center justify-center ${className}`}>
        <NBREmblem iconSize={sizeMap[size]} />
      </div>
    );
  }

  // 2. FULL VERTICAL STACKED (Identical to Official Brand Spec Image)
  if (variant === 'full-vertical') {
    const emblemSize = size === 'xs' ? 52 : size === 'sm' ? 68 : size === 'md' ? 84 : size === 'lg' ? 104 : 130;
    const aIconSize = size === 'xs' ? 14 : size === 'sm' ? 18 : size === 'md' ? 22 : size === 'lg' ? 28 : 34;

    return (
      <div className={`flex flex-col items-center text-center select-none ${className}`}>
        {/* Emblem */}
        <NBREmblem iconSize={emblemSize} />

        {/* Brand Name: N E G [A] R I T */}
        <div className="mt-3.5 flex items-center justify-center">
          <span
            className="font-brand font-black text-2xl sm:text-3xl md:text-4xl tracking-[0.24em] uppercase"
            style={{ color: navyMain }}
          >
            NEG
          </span>
          <StylizedA sizePx={aIconSize} />
          <span
            className="font-brand font-black text-2xl sm:text-3xl md:text-4xl tracking-[0.24em] uppercase"
            style={{ color: navyMain }}
          >
            RIT
          </span>
        </div>

        {/* Sub-headline: ── BUSINESS REVIEW ── */}
        <div className="flex items-center justify-center gap-2 sm:gap-3 mt-1.5 w-full max-w-[280px] sm:max-w-[340px]">
          <span className="h-[1.5px] flex-1 bg-amber-500/80 rounded-full" />
          <span className="text-[11px] sm:text-xs md:text-sm font-brand font-extrabold tracking-[0.28em] uppercase text-amber-500 shrink-0">
            BUSINESS REVIEW
          </span>
          <span className="h-[1.5px] flex-1 bg-amber-500/80 rounded-full" />
        </div>

        {/* Tagline: •── Navigating Business Dynamics ──• */}
        <div className="flex items-center justify-center gap-2 mt-2 w-full max-w-[300px] sm:max-w-[360px]">
          <div className="flex items-center gap-1 shrink-0">
            <span className="w-1 h-1 rounded-full bg-slate-400 dark:bg-slate-500" />
            <span className="h-[1px] w-5 sm:w-7 bg-slate-300 dark:bg-slate-700" />
          </div>
          <span 
            className="text-[10px] sm:text-[11.5px] md:text-xs font-semibold tracking-wide shrink-0 font-sans"
            style={{ color: taglineColor }}
          >
            Navigating Business Dynamics
          </span>
          <div className="flex items-center gap-1 shrink-0">
            <span className="h-[1px] w-5 sm:w-7 bg-slate-300 dark:bg-slate-700" />
            <span className="w-1 h-1 rounded-full bg-slate-400 dark:bg-slate-500" />
          </div>
        </div>
      </div>
    );
  }

  // 3. STACKED COMPACT (For modal headers, mobile drawers, cards)
  if (variant === 'stacked-compact') {
    return (
      <div className={`flex flex-col items-center text-center select-none ${className}`}>
        <NBREmblem iconSize={48} />
        <div className="mt-1 flex items-center justify-center">
          <span className="font-brand font-black text-lg tracking-[0.2em] uppercase" style={{ color: navyMain }}>
            NEG
          </span>
          <StylizedA sizePx={15} />
          <span className="font-brand font-black text-lg tracking-[0.2em] uppercase" style={{ color: navyMain }}>
            RIT
          </span>
        </div>
        <div className="flex items-center justify-center gap-1.5 mt-0.5">
          <span className="h-[1px] w-3 bg-amber-500/70" />
          <span className="text-[9px] font-brand font-bold tracking-[0.24em] uppercase text-amber-500">
            BUSINESS REVIEW
          </span>
          <span className="h-[1px] w-3 bg-amber-500/70" />
        </div>
      </div>
    );
  }

  // 4. HORIZONTAL HEADER / NAV VARIANT (Default)
  const emblemSize = size === 'xs' ? 32 : size === 'sm' ? 40 : size === 'md' ? 48 : size === 'lg' ? 56 : 68;
  const aIconSize = size === 'xs' ? 12 : size === 'sm' ? 14 : size === 'md' ? 17 : size === 'lg' ? 20 : 24;

  return (
    <div className={`inline-flex items-center gap-2.5 sm:gap-3.5 select-none ${className}`}>
      {/* Emblem */}
      <NBREmblem iconSize={emblemSize} />

      {/* Lockup Text */}
      <div className="flex flex-col text-left justify-center">
        {/* Primary Row: NEGARIT */}
        <div className="flex items-center leading-none">
          <span
            className="font-brand font-black text-lg sm:text-xl md:text-2xl tracking-[0.2em] uppercase transition-colors"
            style={{ color: navyMain }}
          >
            NEG
          </span>
          <StylizedA sizePx={aIconSize} />
          <span
            className="font-brand font-black text-lg sm:text-xl md:text-2xl tracking-[0.2em] uppercase transition-colors"
            style={{ color: navyMain }}
          >
            RIT
          </span>
        </div>

        {/* Secondary Row: ── BUSINESS REVIEW ── */}
        <div className="flex items-center gap-1 sm:gap-1.5 mt-1">
          <span className="h-[1px] w-3 sm:w-4 bg-amber-500/80 rounded-full" />
          <span className="text-[9px] sm:text-[10.5px] md:text-xs font-brand font-extrabold tracking-[0.22em] uppercase text-amber-500 whitespace-nowrap">
            BUSINESS REVIEW
          </span>
          <span className="h-[1px] w-3 sm:w-4 bg-amber-500/80 rounded-full" />
        </div>

        {/* Tertiary Row: Navigating Business Dynamics */}
        <div className="hidden sm:flex items-center gap-1.5 mt-0.5">
          <span className="w-0.5 h-0.5 rounded-full bg-slate-400 dark:bg-slate-500" />
          <span 
            className="text-[9px] md:text-[10px] font-sans font-medium tracking-tight text-slate-500 dark:text-slate-400 whitespace-nowrap"
          >
            Navigating Business Dynamics
          </span>
        </div>
      </div>
    </div>
  );
};
