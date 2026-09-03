import { initializeApp, getApps, getApp } from 'firebase/app';
import { 
  getFirestore, 
  collection, 
  doc, 
  getDoc, 
  getDocs, 
  setDoc, 
  deleteDoc, 
  query, 
  orderBy, 
  onSnapshot, 
  where,
  getDocFromServer
} from 'firebase/firestore';
import firebaseConfig from '../firebase-applet-config.json';
import { Article, Comment, NewsletterSubscriber, FeaturedConfig } from './types';

// Initialize Firebase App
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

// Initialize Firestore Database with specific database ID if configured
export const db = firebaseConfig.firestoreDatabaseId 
  ? getFirestore(app, firebaseConfig.firestoreDatabaseId) 
  : getFirestore(app);

/**
 * Validates connection to Firestore
 */
export async function testFirestoreConnection(): Promise<boolean> {
  try {
    await getDocFromServer(doc(db, 'test', 'ping'));
    return true;
  } catch (error) {
    console.warn('Firestore server connection check:', error);
    return false;
  }
}

/**
 * Fetch all articles from Firestore
 */
export async function fetchArticlesFromFirestore(): Promise<Article[]> {
  try {
    const q = query(collection(db, 'articles'));
    const snapshot = await getDocs(q);
    const articles: Article[] = [];
    snapshot.forEach(docSnap => {
      const data = docSnap.data() as Article;
      articles.push({
        ...data,
        id: data.id || docSnap.id,
      });
    });
    // Sort descending by publishedAt
    return articles.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
  } catch (error) {
    console.warn('Error fetching articles from Firestore:', error);
    return [];
  }
}

/**
 * Fetch a single article by ID or slug from Firestore
 */
export async function fetchArticleById(idOrSlug: string): Promise<Article | null> {
  if (!idOrSlug) return null;
  try {
    // 1. Try direct ID lookup
    const directDoc = await getDoc(doc(db, 'articles', idOrSlug));
    if (directDoc.exists()) {
      const data = directDoc.data() as Article;
      return { ...data, id: data.id || directDoc.id };
    }

    // 2. Try slug lookup
    const q = query(collection(db, 'articles'), where('slug', '==', idOrSlug));
    const querySnap = await getDocs(q);
    if (!querySnap.empty) {
      const firstDoc = querySnap.docs[0];
      const data = firstDoc.data() as Article;
      return { ...data, id: data.id || firstDoc.id };
    }

    // 3. Try partial case-insensitive or trimmed ID lookup
    const cleanId = idOrSlug.trim();
    if (cleanId !== idOrSlug) {
      const retryDoc = await getDoc(doc(db, 'articles', cleanId));
      if (retryDoc.exists()) {
        const data = retryDoc.data() as Article;
        return { ...data, id: data.id || retryDoc.id };
      }
    }

    return null;
  } catch (error) {
    console.warn('Error fetching article from Firestore by ID:', error);
    return null;
  }
}

/**
 * Save or publish an article in Firestore
 */
export async function saveArticleToFirestore(article: Article): Promise<void> {
  try {
    await setDoc(doc(db, 'articles', article.id), article, { merge: true });
  } catch (error) {
    console.error('Error saving article to Firestore:', error);
    throw error;
  }
}

/**
 * Update partial fields of an article in Firestore
 */
export async function updateArticleInFirestore(id: string, updates: Partial<Article>): Promise<void> {
  try {
    await setDoc(doc(db, 'articles', id), updates, { merge: true });
  } catch (error) {
    console.error('Error updating article in Firestore:', error);
    throw error;
  }
}

/**
 * Delete an article from Firestore
 */
export async function deleteArticleFromFirestore(id: string): Promise<void> {
  try {
    await deleteDoc(doc(db, 'articles', id));
  } catch (error) {
    console.error('Error deleting article from Firestore:', error);
    throw error;
  }
}

/**
 * Real-time listener for articles collection across mobile and desktop
 */
export function subscribeToArticles(
  onUpdate: (articles: Article[]) => void,
  onError?: (err: Error) => void
): () => void {
  try {
    const q = query(collection(db, 'articles'));
    return onSnapshot(
      q,
      snapshot => {
        const articles: Article[] = [];
        snapshot.forEach(docSnap => {
          const data = docSnap.data() as Article;
          articles.push({
            ...data,
            id: data.id || docSnap.id,
          });
        });
        articles.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
        onUpdate(articles);
      },
      error => {
        console.warn('Articles snapshot subscription error:', error);
        if (onError) onError(error);
      }
    );
  } catch (e: any) {
    console.warn('Failed to subscribe to articles snapshot:', e);
    return () => {};
  }
}

/**
 * Sync local articles from desktop localStorage to Firestore cloud
 * This automatically uploads newly created desktop articles (like art-1788436049086)
 * so that mobile devices and all readers can access them.
 */
export async function syncLocalArticlesToFirestore(localArticles: Article[]): Promise<void> {
  if (!Array.isArray(localArticles) || localArticles.length === 0) return;
  try {
    // Only upload articles that do not already exist or custom articles
    for (const article of localArticles) {
      if (article.id && article.title) {
        await setDoc(doc(db, 'articles', article.id), article, { merge: true });
      }
    }
  } catch (error) {
    console.warn('Error syncing local articles to Firestore:', error);
  }
}

/**
 * Comments Firestore helpers
 */
export async function saveCommentToFirestore(comment: Comment): Promise<void> {
  try {
    await setDoc(doc(db, 'comments', comment.id), comment, { merge: true });
  } catch (error) {
    console.warn('Error saving comment to Firestore:', error);
  }
}

export function subscribeToComments(
  onUpdate: (comments: Comment[]) => void
): () => void {
  try {
    const q = query(collection(db, 'comments'));
    return onSnapshot(
      q,
      snapshot => {
        const comments: Comment[] = [];
        snapshot.forEach(docSnap => {
          const data = docSnap.data() as Comment;
          comments.push({ ...data, id: data.id || docSnap.id });
        });
        comments.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        onUpdate(comments);
      },
      err => console.warn('Comments subscription warning:', err)
    );
  } catch (e) {
    console.warn('Failed to subscribe to comments:', e);
    return () => {};
  }
}

/**
 * Newsletter Subscribers Firestore helpers
 */
export async function saveSubscriberToFirestore(subscriber: Partial<NewsletterSubscriber> & { email: string }): Promise<void> {
  try {
    const id = subscriber.email.replace(/[^a-zA-Z0-9]/g, '_');
    await setDoc(doc(db, 'subscribers', id), subscriber, { merge: true });
  } catch (error) {
    console.warn('Error saving subscriber to Firestore:', error);
  }
}

/**
 * Homepage Featured Layout Configuration Firestore helpers
 */
export async function saveFeaturedConfigToFirestore(config: FeaturedConfig): Promise<void> {
  try {
    await setDoc(doc(db, 'config', 'featured'), config, { merge: true });
  } catch (error) {
    console.warn('Error saving featuredConfig to Firestore:', error);
  }
}

export async function fetchFeaturedConfigFromFirestore(): Promise<FeaturedConfig | null> {
  try {
    const snap = await getDoc(doc(db, 'config', 'featured'));
    if (snap.exists()) {
      return snap.data() as FeaturedConfig;
    }
  } catch (error) {
    console.warn('Error fetching featuredConfig from Firestore:', error);
  }
  return null;
}

export function subscribeToFeaturedConfig(
  onUpdate: (config: FeaturedConfig) => void
): () => void {
  try {
    return onSnapshot(
      doc(db, 'config', 'featured'),
      snapshot => {
        if (snapshot.exists()) {
          onUpdate(snapshot.data() as FeaturedConfig);
        }
      },
      err => console.warn('FeaturedConfig subscription warning:', err)
    );
  } catch (e) {
    console.warn('Failed to subscribe to featuredConfig:', e);
    return () => {};
  }
}

/**
 * Breaking News Bulletins Firestore helpers
 */
export async function saveBreakingNewsToFirestore(items: string[]): Promise<void> {
  try {
    await setDoc(doc(db, 'config', 'breakingNews'), { items, updatedAt: new Date().toISOString() }, { merge: true });
  } catch (error) {
    console.warn('Error saving breakingNews to Firestore:', error);
  }
}

export async function fetchBreakingNewsFromFirestore(): Promise<string[] | null> {
  try {
    const snap = await getDoc(doc(db, 'config', 'breakingNews'));
    if (snap.exists() && Array.isArray(snap.data().items)) {
      return snap.data().items as string[];
    }
  } catch (error) {
    console.warn('Error fetching breakingNews from Firestore:', error);
  }
  return null;
}

export function subscribeToBreakingNews(
  onUpdate: (items: string[]) => void
): () => void {
  try {
    return onSnapshot(
      doc(db, 'config', 'breakingNews'),
      snapshot => {
        if (snapshot.exists() && Array.isArray(snapshot.data().items)) {
          onUpdate(snapshot.data().items as string[]);
        }
      },
      err => console.warn('BreakingNews subscription warning:', err)
    );
  } catch (e) {
    console.warn('Failed to subscribe to breakingNews:', e);
    return () => {};
  }
}

