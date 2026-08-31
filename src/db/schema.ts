import { pgTable, serial, text, timestamp, integer, boolean, doublePrecision } from 'drizzle-orm/pg-core';

// Users table (identifying Firebase users)
export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  uid: text('uid').notNull().unique(), // Firebase Auth UID
  email: text('email').notNull(),
  role: text('role').default('reader'),
  createdAt: timestamp('created_at').defaultNow(),
});

// Articles table
export const articles = pgTable('articles', {
  id: serial('id').primaryKey(),
  slug: text('slug').notNull().unique(),
  title: text('title').notNull(),
  subtitle: text('subtitle'),
  excerpt: text('excerpt').notNull(),
  content: text('content').notNull(), // JSON stringified array of paragraphs
  category: text('category').notNull(),
  authorId: text('author_id').notNull(),
  authorName: text('author_name').notNull(),
  authorRole: text('author_role').notNull(),
  authorAvatar: text('author_avatar'),
  publishedAt: timestamp('published_at').defaultNow(),
  readTime: text('read_time').notNull(),
  featuredImage: text('featured_image').notNull(),
  imageCaption: text('image_caption'),
  views: integer('views').default(0),
  status: text('status').notNull().default('published'),
  isHeroFeatured: boolean('is_hero_featured').default(false),
  isEditorPick: boolean('is_editor_pick').default(false),
  isBreaking: boolean('is_breaking').default(false),
  tags: text('tags'), // JSON stringified tags array
  keyTakeaways: text('key_takeaways'), // JSON stringified takeaways array
  pullQuote: text('pull_quote'), // JSON stringified pullquote object
  createdAt: timestamp('created_at').defaultNow(),
});

// Forex and market benchmarks table
export const currencies = pgTable('currencies', {
  id: serial('id').primaryKey(),
  code: text('code').notNull().unique(),
  currency: text('currency').notNull(),
  flag: text('flag').notNull(),
  buying: doublePrecision('buying').notNull(),
  selling: doublePrecision('selling').notNull(),
  change: doublePrecision('change').notNull(),
  isPositive: boolean('is_positive').default(true),
  updatedAt: timestamp('updated_at').defaultNow(),
});

// Newsletter subscribers table
export const subscribers = pgTable('subscribers', {
  id: serial('id').primaryKey(),
  email: text('email').notNull().unique(),
  name: text('name'),
  interests: text('interests'), // JSON stringified array
  status: text('status').default('active'),
  subscribedAt: timestamp('subscribed_at').defaultNow(),
});

// Moderated reader comments table
export const comments = pgTable('comments', {
  id: serial('id').primaryKey(),
  articleId: text('article_id').notNull(),
  authorName: text('author_name').notNull(),
  authorRole: text('author_role').notNull(),
  content: text('content').notNull(),
  likes: integer('likes').default(0),
  createdAt: timestamp('created_at').defaultNow(),
});
