import Redis from 'ioredis';

const REDIS_URL = process.env.REDIS_URL || 'redis://localhost:6379';

export const redis = new Redis(REDIS_URL, {
  retryStrategy: (times) => Math.min(times * 50, 2000),
});

redis.on('error', (err) => {
  console.error('Redis client error', err);
});

redis.on('connect', () => {
  console.log('Redis connected');
});

export async function closeRedis(): Promise<void> {
  await redis.quit();
}
