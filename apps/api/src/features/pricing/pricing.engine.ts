import { Pool } from 'pg';
import { PriceBadge, PricingInput, PricingOutput } from '@automarket/shared-types';
import { IPricingStrategy } from './pricing.strategy';
import { ExactMatchStrategy } from './strategies/exact-match.strategy';
import { MakeModelStrategy } from './strategies/make-model.strategy';
import { NationalStrategy } from './strategies/national.strategy';

/**
 * PricingEngine — Strategy Pattern
 *
 * Tries strategies from most specific to most broad:
 *   ExactMatch → MakeModel → National → no badge
 *
 * Badge assignment:
 *   price < p25          → GREAT_DEAL  (below market)
 *   p25 <= price <= p75  → FAIR_PRICE  (market rate)
 *   price > p75          → HIGH_PRICE  (above market)
 *
 * Confidence is derived from sample size (capped at 1.0 at 500+ samples).
 */
export class PricingEngine {
  private readonly strategies: IPricingStrategy[];

  constructor(private readonly pool: Pool) {
    this.strategies = [
      new ExactMatchStrategy(),
      new MakeModelStrategy(),
      new NationalStrategy(),
    ];
  }

  async calculate(input: PricingInput): Promise<PricingOutput | null> {
    for (const strategy of this.strategies) {
      const applicable = await strategy.canApply(input, this.pool);
      if (!applicable) continue;

      const stats = await strategy.compute(input, this.pool);
      const badge = assignBadge(input.listingPrice, stats.p25, stats.p75);

      // Confidence: log-scale from sample size, capped at 0.99
      const confidence = Math.min(0.99, Math.log10(stats.sampleSize + 1) / Math.log10(500));

      return {
        listingPrice: input.listingPrice,
        marketStats: stats,
        badge,
        confidence: Math.round(confidence * 1000) / 1000,
      };
    }

    // Not enough data to assign a badge
    return null;
  }
}

function assignBadge(price: number, p25: number, p75: number): PriceBadge {
  if (price < p25) return PriceBadge.GREAT_DEAL;
  if (price > p75) return PriceBadge.HIGH_PRICE;
  return PriceBadge.FAIR_PRICE;
}
