import Queue from 'bull';
import { redis } from './redis';
import { PricingJobPayload } from '@automarket/shared-types';

export const pricingQueue = new Queue<PricingJobPayload>('pricing', {
  createClient: () => redis,
});

pricingQueue.on('failed', (job, err) => {
  console.error(`Job ${job.id} failed:`, err.message);
});

pricingQueue.on('completed', (job) => {
  console.log(`Job ${job.id} completed`);
});

export async function closeQueues(): Promise<void> {
  await pricingQueue.close();
}
