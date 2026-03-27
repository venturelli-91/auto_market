import { Pool } from 'pg';
import { PricingJobPayload } from '@automarket/shared-types';
import { pricingQueue } from '../../shared/queue';
import { PricingEngine } from './pricing.engine';
import { ListingsRepository } from '../listings/listings.repository';
import { ListingsService } from '../listings/listings.service';

/**
 * Pricing worker — processes Bull queue jobs triggered on listing creation.
 *
 * Flow: listing created → Bull job enqueued → worker calculates badge async
 *       → updates listings.price_badge (+ p25/p75/median/confidence)
 *
 * Decoupled from request lifecycle so listing creation never waits for pricing.
 */
export function startPricingWorker(pool: Pool): void {
  const engine = new PricingEngine(pool);
  const repository = new ListingsRepository(pool);
  const service = new ListingsService(repository);

  pricingQueue.process(async (job) => {
    const { listingId, dealerLocation }: PricingJobPayload = job.data;

    // Fetch listing to get vehicle data (as domain object)
    const listing = await service.findById(listingId);
    if (!listing) {
      throw new Error(`Listing ${listingId} not found`);
    }

    const result = await engine.calculate({
      vehicle: listing.vehicle,
      listingPrice: listing.price,
      dealerLocation,
    });

    if (!result) {
      // Not enough market data — leave badge null
      return;
    }

    await repository.updatePriceScore(listingId, {
      badge:        result.badge,
      confidence:   result.confidence,
      marketMedian: result.marketStats.median,
      p25:          result.marketStats.p25,
      p75:          result.marketStats.p75,
      sampleSize:   result.marketStats.sampleSize,
    });
  });
}
