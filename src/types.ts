export type CategoryType = string;

export interface CategoryItem {
  id: string;
  slug: string;
  name: string;
  description?: string;
  color: string;
  order: number;
}

export interface Author {
  id: string;
  name: string;
  role: string;
  avatar: string;
  bio?: string;
  twitter?: string;
  linkedin?: string;
}

export type CommentStatus = 'approved' | 'pending' | 'rejected' | 'spam';

export interface Comment {
  id: string;
  articleId: string;
  authorName: string;
  authorEmail?: string;
  authorRole?: string;
  avatar?: string;
  content: string;
  createdAt: string;
  likes: number;
  isLiked?: boolean;
  status: CommentStatus;
  ipAddress?: string;
  isBlockedUser?: boolean;
  flagReason?: string;
}

export interface BlockedUser {
  id: string;
  authorName: string;
  email?: string;
  ipAddress?: string;
  blockedAt: string;
  reason: string;
  blockedBy: string;
}

export type ArticleStatus = 'published' | 'draft' | 'scheduled' | 'archived';

export interface Article {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  excerpt: string;
  content: string[]; // array of paragraphs
  category: CategoryType;
  author: Author;
  publishedAt: string;
  scheduledAt?: string;
  readTime: string;
  featuredImage: string;
  imageCaption?: string;
  featuredImageCredit?: string;
  sourceReference?: string;
  isBreaking?: boolean;
  isHeroFeatured?: boolean;
  isTopStory?: boolean;
  isTrending?: boolean;
  isEditorPick?: boolean;
  isMostRead?: boolean;
  views: number;
  shares: number;
  tags: string[];
  keyTakeaways?: string[];
  pullQuote?: {
    quote: string;
    speaker: string;
    role?: string;
  };
  audioDuration?: string;
  audioUrl?: string;
  relatedCompany?: string;
  status: ArticleStatus;
}

export interface MediaItem {
  id: string;
  title: string;
  url: string;
  caption?: string;
  credit?: string;
  category?: string;
  uploadedAt: string;
  fileSize?: string;
  dimensions?: string;
  usageCount?: number;
}

export interface FeaturedConfig {
  breakingNewsTicker: string[];
  heroArticleId: string;
  topStoryArticleId: string;
  trendingArticleIds: string[];
  editorPickArticleIds: string[];
}

export interface MarketDataPoint {
  date: string;
  value: number;
  label?: string;
}

export interface MarketIndicator {
  id: string;
  name: string;
  code: string;
  category: 'Forex' | 'Equities' | 'Macro' | 'Commodity' | 'Banking';
  value: string;
  numericValue: number;
  change: string;
  isPositive: boolean;
  unit: string;
  high52w?: string;
  low52w?: string;
  lastUpdated: string;
  history: MarketDataPoint[];
  description: string;
}

export interface CurrencyRate {
  currency: string;
  code: string;
  symbol: string;
  buying: number;
  selling: number;
  change: number;
  isPositive: boolean;
  flag: string;
}

export interface BusinessLeader {
  id: string;
  name: string;
  position: string;
  organization: string;
  sector: string;
  avatar: string;
  shortDescription: string;
  fullBio: string;
  achievements: string[];
  quote?: string;
  linkedIn?: string;
}

export interface NewsletterSubscriber {
  id: string;
  email: string;
  name?: string;
  subscribedAt: string;
  frequency: 'daily' | 'weekly';
  interests: CategoryType[];
  status: 'active' | 'unsubscribed';
}

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: 'Editor-in-Chief' | 'Senior Markets Editor' | 'Managing Editor' | 'Newsroom Admin';
  avatar: string;
  department: string;
  lastLogin?: string;
}

export interface AdminSession {
  id: string;
  deviceName: string;
  deviceType: 'desktop' | 'mobile' | 'tablet';
  browser: string;
  os: string;
  ipAddress: string;
  location: string;
  lastActive: string;
  isCurrent: boolean;
}

export interface LoginActivity {
  id: string;
  timestamp: string;
  ipAddress: string;
  location: string;
  device: string;
  browser: string;
  status: 'success' | 'failed' | 'warning';
  action: string;
}

export interface SecuritySettings {
  twoFactorEnabled: boolean;
  twoFactorSecret?: string;
  backupCodes: string[];
  lastPasswordChange: string;
  sessionTimeoutMinutes: number;
}

export interface TrafficSourceItem {
  id: string;
  name: string;
  iconType: 'google' | 'facebook' | 'instagram' | 'linkedin' | 'direct' | 'newsletter';
  iconEmoji: string;
  sessions: number;
  percentage: number;
  bounceRate: string;
  avgDuration: string;
  change: number;
  isPositive: boolean;
  color: string;
}

export type ViewMode = 
  | 'home'
  | 'article'
  | 'category'
  | 'markets'
  | 'leaders'
  | 'admin'
  | 'bookmarks';


