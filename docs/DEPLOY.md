# Deployment Guide

Instructions for deploying AutoMarket to production.

---

## Table of Contents

1. [Pre-Deployment Checklist](#pre-deployment-checklist)
2. [Infrastructure Setup](#infrastructure-setup)
3. [Database Migrations](#database-migrations)
4. [Environment Variables](#environment-variables)
5. [Deployment Steps](#deployment-steps)
6. [Monitoring & Logs](#monitoring--logs)
7. [Rollback Procedure](#rollback-procedure)

---

## Pre-Deployment Checklist

Before deploying to production:

- [ ] All tests pass: `pnpm test`
- [ ] TypeScript strict mode passes: `pnpm typecheck`
- [ ] No ESLint violations: `pnpm lint`
- [ ] Staging environment tested
- [ ] Database backups created
- [ ] Environment variables are set (no secrets in code)
- [ ] Cloudinary API keys configured
- [ ] Anthropic API key configured (if using AI features)
- [ ] Redis persistence enabled
- [ ] PostgreSQL backups configured
- [ ] Monitoring/alerting set up (Sentry, etc.)
- [ ] Rate limiting configured
- [ ] CORS origins whitelist configured
- [ ] HTTPS enabled on all domains

---

## Infrastructure Setup

### Option A: Self-Hosted (Recommended for Learning)

**Requirements:**
- Linux server (Ubuntu 22.04 LTS recommended)
- 2GB RAM minimum (4GB recommended)
- 20GB disk space
- Docker + Docker Compose installed

**Steps:**

1. **SSH into server**
```bash
ssh deploy@your-server.com
```

2. **Clone repository**
```bash
cd /opt
git clone https://github.com/YOUR_USERNAME/auto-market.git
cd auto-market
```

3. **Install Docker**
```bash
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh
sudo usermod -aG docker $USER
```

4. **Create production environment**
```bash
# Copy env template
cp apps/web/.env.example apps/web/.env.production
cp apps/api/.env.example apps/api/.env.production

# Edit with production values
nano apps/api/.env.production
```

5. **Start services with Docker Compose**
```bash
docker-compose -f docker-compose.yml up -d
```

---

### Option B: Vercel (Frontend Only)

**For Next.js frontend:**

1. **Connect repository to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Select your GitHub repository
   - Set root directory: `apps/web`

2. **Configure environment variables**
   - Add `NEXT_PUBLIC_API_URL` → Your production API URL
   - Deploy

3. **Deployment is automatic** on every push to `main`

**Advantages:**
- Zero-config deployment
- Automatic HTTPS
- Auto-scaling
- Built-in analytics

**Disadvantages:**
- Frontend only (API must be elsewhere)

---

### Option C: Railway/Render (Full Stack)

**For both frontend and backend:**

Railway and Render support monorepos with workspace support.

1. **Connect repository**
2. **Create two services:**
   - Service 1: Frontend (Next.js) from `apps/web`
   - Service 2: Backend (Express) from `apps/api`
3. **Configure environment variables** for each service
4. **Link services** (set frontend `NEXT_PUBLIC_API_URL` to backend service URL)

**Railway Quick Start:**
```bash
# Install Railway CLI
npm i -g @railway/cli

# Login
railway login

# Initialize project
railway init

# Deploy
railway up
```

---

## Database Migrations

### PostgreSQL Setup

1. **Create database**
```bash
psql -U postgres -h your-db-host

CREATE DATABASE automarket;
CREATE USER automarket WITH PASSWORD 'secure_password';
GRANT ALL PRIVILEGES ON DATABASE automarket TO automarket;
```

2. **Enable RLS (Row Level Security)**
```sql
ALTER DATABASE automarket SET rls = on;
```

3. **Create base tables** (example schema, adapt to your needs)

```sql
-- Dealers table
CREATE TABLE dealers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  website VARCHAR(255),
  logo VARCHAR(255),
  description TEXT,
  is_verified BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Vehicles table
CREATE TABLE vehicles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  make VARCHAR(100) NOT NULL,
  model VARCHAR(100) NOT NULL,
  year INTEGER NOT NULL,
  trim VARCHAR(100),
  body_type VARCHAR(100),
  fuel_type VARCHAR(50),
  transmission VARCHAR(50),
  mileage INTEGER,
  condition VARCHAR(50),
  color VARCHAR(100),
  features JSONB DEFAULT '[]',
  description TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Listings table
CREATE TABLE listings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  dealer_id UUID NOT NULL REFERENCES dealers(id) ON DELETE CASCADE,
  vehicle_id UUID NOT NULL REFERENCES vehicles(id) ON DELETE CASCADE,
  price NUMERIC(10, 2) NOT NULL,
  price_score JSONB, -- { badge, confidence, p25, p75, median, sample_size }
  status VARCHAR(50) DEFAULT 'draft', -- draft, published, sold, delisted
  published_at TIMESTAMP,
  sold_at TIMESTAMP,
  view_count INTEGER DEFAULT 0,
  favorite_count INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Enable RLS on listings
ALTER TABLE listings ENABLE ROW LEVEL SECURITY;

-- RLS Policy: dealers can only see their own listings
CREATE POLICY "dealers_see_own_listings" ON listings
  USING (dealer_id = (SELECT current_user_id FROM app.current_user));

-- Create indexes for performance
CREATE INDEX idx_listings_dealer_id ON listings(dealer_id);
CREATE INDEX idx_listings_published ON listings(published_at) WHERE status = 'published';
CREATE INDEX idx_vehicles_make_model_year ON vehicles(make, model, year);
```

4. **Run migrations** (to be implemented)
```bash
pnpm db:migrate
```

---

## Environment Variables

### Frontend (`apps/web/.env.production`)

```env
# API
NEXT_PUBLIC_API_URL=https://api.automarket.com

# Analytics (optional)
NEXT_PUBLIC_GA_ID=G_XXXXXXXXXX
```

### Backend (`apps/api/.env.production`)

```env
NODE_ENV=production

# Database
DATABASE_URL=postgresql://automarket:PASSWORD@db.automarket.com:5432/automarket

# Redis
REDIS_URL=redis://redis.automarket.com:6379

# Cloudinary
CLOUDINARY_CLOUD_NAME=xxxxx
CLOUDINARY_API_KEY=xxxxx
CLOUDINARY_API_SECRET=xxxxx

# Anthropic
ANTHROPIC_API_KEY=sk-proj-xxxxx

# Security
CORS_ORIGIN=https://automarket.com,https://www.automarket.com
API_RATE_LIMIT=100 # requests per minute

# Email (optional, for notifications)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=noreply@automarket.com
SMTP_PASS=xxxxxxx
```

**⚠️ IMPORTANT:** Never commit `.env` files. Use environment secrets in your deployment platform.

---

## Deployment Steps

### Manual Deployment (Self-Hosted)

```bash
# SSH into production server
ssh deploy@your-server.com

# Pull latest code
cd /opt/auto-market
git pull origin main

# Install dependencies
pnpm install

# Build applications
pnpm build

# Run database migrations
pnpm db:migrate

# Restart services
docker-compose down
docker-compose up -d

# Verify services
docker-compose logs -f
curl http://localhost:3000  # Frontend
curl http://localhost:3001/health  # Backend
```

### Automated Deployment (GitHub Actions)

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Production

on:
  push:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: pnpm/action-setup@v2
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'pnpm'
      - run: pnpm install
      - run: pnpm typecheck
      - run: pnpm lint
      - run: pnpm test

  deploy:
    needs: test
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    steps:
      - uses: actions/checkout@v3
      - name: Deploy to server
        env:
          DEPLOY_KEY: ${{ secrets.DEPLOY_KEY }}
          DEPLOY_HOST: ${{ secrets.DEPLOY_HOST }}
          DEPLOY_USER: ${{ secrets.DEPLOY_USER }}
        run: |
          mkdir -p ~/.ssh
          echo "$DEPLOY_KEY" > ~/.ssh/deploy_key
          chmod 600 ~/.ssh/deploy_key
          ssh-keyscan -H $DEPLOY_HOST >> ~/.ssh/known_hosts
          ssh -i ~/.ssh/deploy_key $DEPLOY_USER@$DEPLOY_HOST 'cd /opt/auto-market && ./deploy.sh'
```

Create `deploy.sh`:

```bash
#!/bin/bash
set -e

echo "Pulling latest code..."
git pull origin main

echo "Installing dependencies..."
pnpm install

echo "Building applications..."
pnpm build

echo "Running migrations..."
pnpm db:migrate

echo "Restarting services..."
docker-compose down
docker-compose up -d

echo "Deployment complete!"
```

---

## Monitoring & Logs

### View Logs

```bash
# Frontend logs (if using Docker)
docker-compose logs -f web

# Backend logs
docker-compose logs -f api

# Database logs
docker-compose logs -f postgres

# Redis logs
docker-compose logs -f redis
```

### Health Checks

```bash
# Frontend
curl https://automarket.com/ | head -20

# Backend API
curl https://api.automarket.com/health
# Expected response: { "status": "ok" }
```

### Monitoring Recommendations

1. **Error Tracking:** [Sentry](https://sentry.io)
   ```javascript
   // In apps/api/src/index.ts
   import * as Sentry from "@sentry/node";

   Sentry.init({
     dsn: process.env.SENTRY_DSN,
     environment: process.env.NODE_ENV,
   });
   ```

2. **Performance Monitoring:** [New Relic](https://newrelic.com) or [DataDog](https://datadoghq.com)

3. **Database Monitoring:** [pgAdmin](https://www.pgadmin.org/) for PostgreSQL

4. **Uptime Monitoring:** [UptimeRobot](https://uptimerobot.com) or [Pingdom](https://www.pingdom.com)

---

## Rollback Procedure

### If Deployment Fails

**Option 1: Revert Last Commit**
```bash
git revert HEAD
git push origin main
# This will trigger CI/CD and redeploy the previous version
```

**Option 2: Checkout Previous Commit**
```bash
git checkout HEAD~1
pnpm build
docker-compose down
docker-compose up -d
```

**Option 3: Use Docker Image Tags**
```bash
# Before deploying, tag the current running image
docker tag auto-market-api:latest auto-market-api:v1.0.0

# If new version fails, switch back
docker-compose down
docker image rm auto-market-api:latest
docker tag auto-market-api:v1.0.0 auto-market-api:latest
docker-compose up -d
```

---

## Performance Optimization

### Frontend (Next.js)

1. **Enable Static Generation**
   ```typescript
   // apps/web/app/page.tsx
   export const revalidate = 60; // Revalidate every 60 seconds
   ```

2. **Image Optimization**
   ```tsx
   <Image
     src="https://res.cloudinary.com/..."
     alt="Vehicle"
     width={800}
     height={600}
     priority={true} // For above-the-fold images
   />
   ```

3. **Code Splitting** (automatic with Next.js)

### Backend (Express)

1. **Enable Compression**
   ```javascript
   app.use(compression());
   ```

2. **Connection Pooling** (already configured in db.ts)

3. **Query Optimization**
   - Use indexes (composite on make, model, year)
   - Explain analyze slow queries
   - Cache frequently accessed data in Redis

---

## Security Checklist

- [ ] HTTPS enabled (SSL/TLS certificate)
- [ ] API rate limiting enabled
- [ ] CORS origins whitelisted
- [ ] Input validation (Zod schemas)
- [ ] SQL injection prevention (parameterized queries)
- [ ] XSS prevention (CSP headers via Helmet)
- [ ] CSRF protection (SameSite cookies)
- [ ] Sensitive headers removed (X-Powered-By, etc.)
- [ ] Secrets not in code (environment variables only)
- [ ] Regular dependency updates (`pnpm up`)
- [ ] Database backups configured (daily)
- [ ] WAF (Web Application Firewall) enabled if using cloud provider

---

## Cost Estimation (Monthly)

**Self-Hosted on DigitalOcean:**
- Server (2GB RAM, 1 CPU): $12/month
- Database (Managed PostgreSQL): $15/month
- Redis (Managed): $10/month
- **Total: ~$37/month**

**Vercel + Railway:**
- Vercel (Next.js): Free for low traffic
- Railway (Express + PostgreSQL + Redis): $20-50/month
- **Total: ~$20-50/month**

**AWS:**
- EC2 (t3.small): $20/month
- RDS PostgreSQL (db.t3.micro): $30/month
- ElastiCache Redis (cache.t3.micro): $20/month
- ALB (Application Load Balancer): $16/month
- **Total: ~$86/month**

---

## Disaster Recovery

### Database Backup Strategy

```bash
# Daily backups to S3
0 2 * * * pg_dump automarket | gzip > /backups/db-$(date +\%Y-\%m-\%d).sql.gz

# Upload to S3
aws s3 sync /backups s3://automarket-backups/
```

### Restore from Backup

```bash
# Download backup from S3
aws s3 cp s3://automarket-backups/db-2026-03-22.sql.gz .

# Restore
gunzip < db-2026-03-22.sql.gz | psql automarket
```

---

*Last updated: 2026-03-22*
*Review deployment strategy quarterly or when adding infrastructure.*
