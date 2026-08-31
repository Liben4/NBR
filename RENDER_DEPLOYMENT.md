# Deploying Negarit Business Review to Render

This application is ready to deploy directly to [Render](https://render.com) with full-stack Node.js + Express, Vite frontend SPA, and PostgreSQL support.

---

## Option 1: One-Click / Blueprint Deployment (`render.yaml`)

1. Push this repository to your **GitHub** or **GitLab** account.
2. In the [Render Dashboard](https://dashboard.render.com), click **New +** and choose **Blueprint**.
3. Connect your repository. Render will automatically detect `render.yaml` and provision:
   - **Web Service** (`negarit-business-review`): Node.js production server.
   - **PostgreSQL Database** (`negarit-postgres`): Free-tier managed relational database with auto-wired `DATABASE_URL`.
4. Click **Apply**. Render will automatically build the static assets, compile the backend server bundle, link the PostgreSQL database, and launch the service.

---

## Option 2: Manual Web Service Setup

If you prefer to configure the Web Service manually on Render:

1. **Create Web Service**:
   - **Repository**: Select your GitHub/GitLab repo
   - **Environment**: `Node`
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm start`
   - **Plan**: Free or Starter

2. **Environment Variables**:
   In the Render Web Service Settings -> Environment Variables, add:
   | Variable | Recommended Value | Description |
   |---|---|---|
   | `NODE_ENV` | `production` | Enables production optimizations & static asset serving |
   | `DATABASE_URL` | `<Your Postgres Connection String>` | Internal or External connection string from Render PostgreSQL |
   | `DATABASE_SSL` | `true` | Required for secure cloud database connections |

3. **Health Check Path**:
   - Set the Health Check path to `/api/health`

---

## Production Build & Architecture

- **Build Output**: `npm run build` runs `vite build` to generate `/dist` and uses `esbuild` to compile `server.ts` into a self-contained CommonJS binary at `dist/server.cjs`.
- **Runtime**: `npm start` executes `node dist/server.cjs`.
- **Port**: Render automatically provides `PORT`, which the server automatically binds to on `0.0.0.0`.
- **Data Auto-Seeding**: On first startup with a fresh database, the server automatically initializes tables and seeds the initial business review articles, forex benchmarks, subscribers directory, and commentary threads.
