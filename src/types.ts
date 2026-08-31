export type CategoryType = 
  | 'All'
  | 'Business'
  | 'Economy'
  | 'Finance'
  | 'Technology'
  | 'Entrepreneurship'
  | 'Markets'
  | 'Opinion';

export interface Author {
  id: string;
  name: string;
  role: string;
  avatar: string;
  bio?: string;
  twitter?: string;
  linkedin?: string;
}

export interface Comment {
  id: string;
  articleId: string;
  authorName: string;
  authorRole?: string;
  avatar?: string;
  content: string;
  createdAt: string;
  likes: number;
  isLiked?: boolean;
}

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
  readTime: string;
  featuredImage: string;
  imageCaption?: string;
  isBreaking?: boolean;
  isHeroFeatured?: boolean;
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
  status: 'published' | 'draft';
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

export type ViewMode = 
  | 'home'
  | 'article'
  | 'category'
  | 'markets'
  | 'leaders'
  | 'admin'
  | 'bookmarks';
