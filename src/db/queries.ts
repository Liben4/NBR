import { db } from './index.ts';
import { articles, currencies, subscribers, comments, users } from './schema.ts';
import { eq, desc } from 'drizzle-orm';
import { INITIAL_ARTICLES, INITIAL_CURRENCIES, INITIAL_SUBSCRIBERS, INITIAL_COMMENTS } from '../data/seedData.ts';

// Initialize DB with seed data if tables are empty
export async function initializeDatabaseIfEmpty() {
  try {
    const existingArticles = await db.select().from(articles).limit(1);
    if (existingArticles.length === 0) {
      console.log('Seeding initial articles into Cloud SQL PostgreSQL...');
      for (const art of INITIAL_ARTICLES) {
        await db.insert(articles).values({
          slug: art.slug,
          title: art.title,
          subtitle: art.subtitle || null,
          excerpt: art.excerpt,
          content: JSON.stringify(art.content),
          category: art.category,
          authorId: art.author.id,
          authorName: art.author.name,
          authorRole: art.author.role,
          authorAvatar: art.author.avatar,
          publishedAt: new Date(art.publishedAt),
          readTime: art.readTime,
          featuredImage: art.featuredImage,
          imageCaption: art.imageCaption || null,
          views: art.views || 0,
          status: art.status || 'published',
          isHeroFeatured: !!art.isHeroFeatured,
          isEditorPick: !!art.isEditorPick,
          isBreaking: !!art.isBreaking,
          tags: JSON.stringify(art.tags || []),
          keyTakeaways: JSON.stringify(art.keyTakeaways || []),
          pullQuote: art.pullQuote ? JSON.stringify(art.pullQuote) : null,
        }).onConflictDoNothing();
      }
    }

    const existingCurrencies = await db.select().from(currencies).limit(1);
    if (existingCurrencies.length === 0) {
      console.log('Seeding initial currency benchmarks into Cloud SQL...');
      for (const curr of INITIAL_CURRENCIES) {
        await db.insert(currencies).values({
          code: curr.code,
          currency: curr.currency,
          flag: curr.flag,
          buying: curr.buying,
          selling: curr.selling,
          change: curr.change,
          isPositive: curr.isPositive,
        }).onConflictDoNothing();
      }
    }

    const existingSubscribers = await db.select().from(subscribers).limit(1);
    if (existingSubscribers.length === 0) {
      for (const sub of INITIAL_SUBSCRIBERS) {
        await db.insert(subscribers).values({
          email: sub.email,
          name: sub.name,
          interests: JSON.stringify(sub.interests || []),
          status: sub.status || 'active',
          subscribedAt: new Date(sub.subscribedAt),
        }).onConflictDoNothing();
      }
    }

    const existingComments = await db.select().from(comments).limit(1);
    if (existingComments.length === 0) {
      for (const com of INITIAL_COMMENTS) {
        await db.insert(comments).values({
          articleId: com.articleId,
          authorName: com.authorName,
          authorRole: com.authorRole,
          content: com.content,
          likes: com.likes || 0,
        }).onConflictDoNothing();
      }
    }
  } catch (error) {
    console.error('Error auto-seeding Cloud SQL PostgreSQL:', error);
  }
}

// Articles Queries
export async function getAllArticles() {
  try {
    const rows = await db.select().from(articles).orderBy(desc(articles.publishedAt));
    return rows.map(r => ({
      id: `art-${r.id}`,
      slug: r.slug,
      title: r.title,
      subtitle: r.subtitle || undefined,
      excerpt: r.excerpt,
      content: JSON.parse(r.content || '[]'),
      category: r.category as any,
      author: {
        id: r.authorId,
        name: r.authorName,
        role: r.authorRole,
        avatar: r.authorAvatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80',
        bio: 'Editorial writer and macroeconomic correspondent.'
      },
      publishedAt: r.publishedAt ? r.publishedAt.toISOString() : new Date().toISOString(),
      readTime: r.readTime,
      featuredImage: r.featuredImage,
      imageCaption: r.imageCaption || undefined,
      views: r.views || 0,
      status: (r.status || 'published') as 'published' | 'draft',
      isHeroFeatured: !!r.isHeroFeatured,
      isEditorPick: !!r.isEditorPick,
      isBreaking: !!r.isBreaking,
      tags: JSON.parse(r.tags || '[]'),
      keyTakeaways: r.keyTakeaways ? JSON.parse(r.keyTakeaways) : undefined,
      pullQuote: r.pullQuote ? JSON.parse(r.pullQuote) : undefined,
    }));
  } catch (error) {
    console.error('Failed to get articles from database:', error);
    throw new Error('Database query failed', { cause: error });
  }
}

export async function insertArticle(data: any) {
  try {
    const result = await db.insert(articles).values({
      slug: data.slug || data.title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      title: data.title,
      subtitle: data.subtitle || null,
      excerpt: data.excerpt,
      content: JSON.stringify(data.content || []),
      category: data.category,
      authorId: data.author?.id || 'auth-1',
      authorName: data.author?.name || 'Editorial Board',
      authorRole: data.author?.role || 'Staff Writer',
      authorAvatar: data.author?.avatar || null,
      readTime: data.readTime || '5 min read',
      featuredImage: data.featuredImage,
      imageCaption: data.imageCaption || null,
      views: data.views || 0,
      status: data.status || 'published',
      isHeroFeatured: !!data.isHeroFeatured,
      isEditorPick: !!data.isEditorPick,
      isBreaking: !!data.isBreaking,
      tags: JSON.stringify(data.tags || []),
      keyTakeaways: data.keyTakeaways ? JSON.stringify(data.keyTakeaways) : null,
      pullQuote: data.pullQuote ? JSON.stringify(data.pullQuote) : null,
    }).returning();
    return result[0];
  } catch (error) {
    console.error('Failed to insert article:', error);
    throw new Error('Database query failed', { cause: error });
  }
}

export async function updateArticleById(idNum: number, data: any) {
  try {
    const updateData: any = {};
    if (data.title !== undefined) updateData.title = data.title;
    if (data.subtitle !== undefined) updateData.subtitle = data.subtitle;
    if (data.excerpt !== undefined) updateData.excerpt = data.excerpt;
    if (data.content !== undefined) updateData.content = JSON.stringify(data.content);
    if (data.category !== undefined) updateData.category = data.category;
    if (data.author) {
      updateData.authorId = data.author.id;
      updateData.authorName = data.author.name;
      updateData.authorRole = data.author.role;
      updateData.authorAvatar = data.author.avatar;
    }
    if (data.readTime !== undefined) updateData.readTime = data.readTime;
    if (data.featuredImage !== undefined) updateData.featuredImage = data.featuredImage;
    if (data.imageCaption !== undefined) updateData.imageCaption = data.imageCaption;
    if (data.views !== undefined) updateData.views = data.views;
    if (data.status !== undefined) updateData.status = data.status;
    if (data.isHeroFeatured !== undefined) updateData.isHeroFeatured = data.isHeroFeatured;
    if (data.isEditorPick !== undefined) updateData.isEditorPick = data.isEditorPick;
    if (data.isBreaking !== undefined) updateData.isBreaking = data.isBreaking;
    if (data.tags !== undefined) updateData.tags = JSON.stringify(data.tags);
    if (data.keyTakeaways !== undefined) updateData.keyTakeaways = JSON.stringify(data.keyTakeaways);
    if (data.pullQuote !== undefined) updateData.pullQuote = JSON.stringify(data.pullQuote);

    const result = await db.update(articles).set(updateData).where(eq(articles.id, idNum)).returning();
    return result[0];
  } catch (error) {
    console.error('Failed to update article:', error);
    throw new Error('Database query failed', { cause: error });
  }
}

export async function deleteArticleById(idNum: number) {
  try {
    return await db.delete(articles).where(eq(articles.id, idNum)).returning();
  } catch (error) {
    console.error('Failed to delete article:', error);
    throw new Error('Database query failed', { cause: error });
  }
}

// Currencies
export async function getAllCurrencies() {
  try {
    const rows = await db.select().from(currencies);
    return rows.map(r => ({
      code: r.code,
      currency: r.currency,
      flag: r.flag,
      buying: r.buying,
      selling: r.selling,
      change: r.change,
      isPositive: r.isPositive ?? true,
    }));
  } catch (error) {
    console.error('Failed to get currencies:', error);
    throw new Error('Database query failed', { cause: error });
  }
}

export async function updateCurrency(code: string, buying: number, selling: number, change: number) {
  try {
    const isPositive = change >= 0;
    const result = await db.update(currencies)
      .set({
        buying,
        selling,
        change,
        isPositive,
        updatedAt: new Date()
      })
      .where(eq(currencies.code, code))
      .returning();
    return result[0];
  } catch (error) {
    console.error('Failed to update currency:', error);
    throw new Error('Database query failed', { cause: error });
  }
}

// Subscribers
export async function getAllSubscribers() {
  try {
    const rows = await db.select().from(subscribers).orderBy(desc(subscribers.subscribedAt));
    return rows.map(r => ({
      id: `sub-${r.id}`,
      email: r.email,
      name: r.name || undefined,
      interests: JSON.parse(r.interests || '[]'),
      subscribedAt: r.subscribedAt ? r.subscribedAt.toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
      status: (r.status || 'active') as 'active' | 'unsubscribed',
    }));
  } catch (error) {
    console.error('Failed to get subscribers:', error);
    throw new Error('Database query failed', { cause: error });
  }
}

export async function insertSubscriber(email: string, name?: string, interests: string[] = ['Economy', 'Markets']) {
  try {
    const result = await db.insert(subscribers)
      .values({
        email,
        name: name || null,
        interests: JSON.stringify(interests),
        status: 'active',
      })
      .onConflictDoUpdate({
        target: subscribers.email,
        set: {
          name: name || null,
          interests: JSON.stringify(interests),
          status: 'active',
        }
      })
      .returning();
    return result[0];
  } catch (error) {
    console.error('Failed to insert subscriber:', error);
    throw new Error('Database query failed', { cause: error });
  }
}

// Comments
export async function getAllComments() {
  try {
    const rows = await db.select().from(comments).orderBy(desc(comments.createdAt));
    return rows.map(r => ({
      id: `com-${r.id}`,
      articleId: r.articleId,
      authorName: r.authorName,
      authorRole: r.authorRole,
      content: r.content,
      createdAt: r.createdAt ? r.createdAt.toLocaleDateString() : 'Today',
      likes: r.likes || 0,
    }));
  } catch (error) {
    console.error('Failed to get comments:', error);
    throw new Error('Database query failed', { cause: error });
  }
}

export async function insertComment(articleId: string, authorName: string, authorRole: string, content: string) {
  try {
    const result = await db.insert(comments)
      .values({
        articleId,
        authorName,
        authorRole,
        content,
        likes: 0,
      })
      .returning();
    return result[0];
  } catch (error) {
    console.error('Failed to insert comment:', error);
    throw new Error('Database query failed', { cause: error });
  }
}

export async function deleteCommentById(idNum: number) {
  try {
    return await db.delete(comments).where(eq(comments.id, idNum)).returning();
  } catch (error) {
    console.error('Failed to delete comment:', error);
    throw new Error('Database query failed', { cause: error });
  }
}
