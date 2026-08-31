import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { 
  initializeDatabaseIfEmpty, 
  getAllArticles, 
  insertArticle, 
  updateArticleById, 
  deleteArticleById,
  getAllCurrencies,
  updateCurrency,
  getAllSubscribers,
  insertSubscriber,
  getAllComments,
  insertComment,
  deleteCommentById
} from './src/db/queries.ts';
import { getOrCreateUser } from './src/db/users.ts';

async function startServer() {
  const app = express();
  const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

  app.use(express.json());

  // Health check endpoint
  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', database: 'cloudsql-postgresql', region: 'europe-west2' });
  });

  // DB Sync / Seed endpoint
  app.post('/api/db/init', async (req, res) => {
    try {
      await initializeDatabaseIfEmpty();
      res.json({ success: true, message: 'Database initialized successfully' });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  // Articles API
  app.get('/api/articles', async (req, res) => {
    try {
      const articlesList = await getAllArticles();
      res.json(articlesList);
    } catch (error: any) {
      console.error('Error fetching articles:', error);
      res.status(500).json({ error: error.message || 'Failed to fetch articles' });
    }
  });

  app.post('/api/articles', async (req, res) => {
    try {
      const created = await insertArticle(req.body);
      res.json(created);
    } catch (error: any) {
      console.error('Error adding article:', error);
      res.status(500).json({ error: error.message || 'Failed to add article' });
    }
  });

  app.put('/api/articles/:id', async (req, res) => {
    try {
      const rawId = req.params.id.replace('art-', '');
      const idNum = parseInt(rawId, 10);
      const updated = await updateArticleById(idNum, req.body);
      res.json(updated);
    } catch (error: any) {
      console.error('Error updating article:', error);
      res.status(500).json({ error: error.message || 'Failed to update article' });
    }
  });

  app.delete('/api/articles/:id', async (req, res) => {
    try {
      const rawId = req.params.id.replace('art-', '');
      const idNum = parseInt(rawId, 10);
      await deleteArticleById(idNum);
      res.json({ success: true });
    } catch (error: any) {
      console.error('Error deleting article:', error);
      res.status(500).json({ error: error.message || 'Failed to delete article' });
    }
  });

  // Currencies API
  app.get('/api/currencies', async (req, res) => {
    try {
      const currs = await getAllCurrencies();
      res.json(currs);
    } catch (error: any) {
      console.error('Error fetching currencies:', error);
      res.status(500).json({ error: error.message || 'Failed to fetch currencies' });
    }
  });

  app.put('/api/currencies/:code', async (req, res) => {
    try {
      const { code } = req.params;
      const { buying, selling, change } = req.body;
      const updated = await updateCurrency(code, parseFloat(buying), parseFloat(selling), parseFloat(change));
      res.json(updated);
    } catch (error: any) {
      console.error('Error updating currency:', error);
      res.status(500).json({ error: error.message || 'Failed to update currency' });
    }
  });

  // Subscribers API
  app.get('/api/subscribers', async (req, res) => {
    try {
      const subs = await getAllSubscribers();
      res.json(subs);
    } catch (error: any) {
      console.error('Error fetching subscribers:', error);
      res.status(500).json({ error: error.message || 'Failed to fetch subscribers' });
    }
  });

  app.post('/api/subscribers', async (req, res) => {
    try {
      const { email, name, interests } = req.body;
      const created = await insertSubscriber(email, name, interests);
      res.json(created);
    } catch (error: any) {
      console.error('Error adding subscriber:', error);
      res.status(500).json({ error: error.message || 'Failed to add subscriber' });
    }
  });

  // Comments API
  app.get('/api/comments', async (req, res) => {
    try {
      const commentsList = await getAllComments();
      res.json(commentsList);
    } catch (error: any) {
      console.error('Error fetching comments:', error);
      res.status(500).json({ error: error.message || 'Failed to fetch comments' });
    }
  });

  app.post('/api/comments', async (req, res) => {
    try {
      const { articleId, authorName, authorRole, content } = req.body;
      const created = await insertComment(articleId, authorName, authorRole, content);
      res.json(created);
    } catch (error: any) {
      console.error('Error adding comment:', error);
      res.status(500).json({ error: error.message || 'Failed to add comment' });
    }
  });

  app.delete('/api/comments/:id', async (req, res) => {
    try {
      const rawId = req.params.id.replace('com-', '');
      const idNum = parseInt(rawId, 10);
      await deleteCommentById(idNum);
      res.json({ success: true });
    } catch (error: any) {
      console.error('Error deleting comment:', error);
      res.status(500).json({ error: error.message || 'Failed to delete comment' });
    }
  });

  // User Sync
  app.post('/api/users/sync', async (req, res) => {
    try {
      const { uid, email } = req.body;
      if (!uid || !email) {
        return res.status(400).json({ error: 'UID and email are required' });
      }
      const user = await getOrCreateUser(uid, email);
      res.json(user);
    } catch (error: any) {
      console.error('Error syncing user:', error);
      res.status(500).json({ error: error.message || 'Failed to sync user' });
    }
  });

  // Initialize DB data on server startup in the background
  initializeDatabaseIfEmpty().catch(err => {
    console.warn('Initial background database seed check warning:', err.message);
  });

  // Vite middleware for development or Static in production
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${PORT} with Cloud SQL PostgreSQL backend`);
  });
}

startServer();
