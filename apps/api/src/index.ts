import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { errorHandler } from './shared/middleware';
import { pool } from './shared/db';
import { redis } from './shared/redis';
import { pricingQueue } from './shared/queue';
import { createListingsRouter } from './features/listings/listings.routes';
import { createAuthRouter } from './features/auth/auth.routes';
import { startPricingWorker } from './features/pricing/pricing.worker';

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(helmet());
app.use(cors({ origin: process.env.FRONTEND_URL || 'http://localhost:5000' }));
app.use(express.json());

// Health check
app.get('/health', (_req, res) => {
  res.json({ status: 'ok' });
});

// Routes
app.use('/api/auth', createAuthRouter(pool));
app.use('/api/listings', createListingsRouter(pool));

// Error handling
app.use(errorHandler);

// Server startup
async function start(): Promise<void> {
  try {
    // Test database connection
    await pool.query('SELECT NOW()');
    console.log('✓ Database connected');

    // Test Redis connection
    await redis.ping();
    console.log('✓ Redis connected');

    // Start pricing worker
    startPricingWorker(pool);
    console.log('✓ Pricing worker started');

    app.listen(PORT, () => {
      console.log(`✓ API running on http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error('Failed to start server:', err);
    process.exit(1);
  }
}

start();

// Graceful shutdown
process.on('SIGTERM', async () => {
  console.log('SIGTERM received, shutting down gracefully');
  await pool.end();
  await redis.quit();
  await pricingQueue.close();
  process.exit(0);
});
