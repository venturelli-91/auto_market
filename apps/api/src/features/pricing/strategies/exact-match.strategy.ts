import { Pool } from 'pg';
import { MarketStats, PricingInput, PricingStrategy } from '@automarket/shared-types';
import { IPricingStrategy, MIN_SAMPLE_SIZE } from '../pricing.strategy';

/**
 * ExactMatchStrategy — same make+model, year ±2, mileage ±30k
 * Highest confidence, smallest sample pool.
 */
export class ExactMatchStrategy implements IPricingStrategy {
  readonly name = PricingStrategy.EXACT_MATCH;

  async canApply(input: PricingInput, pool: Pool): Promise<boolean> {
    const { vehicle } = input;
    const { rows } = await pool.query<{ count: string }>(
      `SELECT COUNT(*) AS count
       FROM listings l
       JOIN vehicles v ON v.id = l.vehicle_id
       WHERE l.status = 'published'
         AND lower(v.make)  = lower($1)
         AND lower(v.model) = lower($2)
         AND v.year BETWEEN $3 AND $4
         AND v.mileage BETWEEN $5 AND $6`,
      [vehicle.make, vehicle.model, vehicle.year - 2, vehicle.year + 2,
       Math.max(0, vehicle.mileage - 30000), vehicle.mileage + 30000]
    );
    return parseInt(rows[0].count, 10) >= MIN_SAMPLE_SIZE;
  }

  async compute(input: PricingInput, pool: Pool): Promise<MarketStats> {
    const { vehicle } = input;
    const minYear = vehicle.year - 2;
    const maxYear = vehicle.year + 2;
    const minMileage = Math.max(0, vehicle.mileage - 30000);
    const maxMileage = vehicle.mileage + 30000;

    const { rows } = await pool.query<{
      p25: string; median: string; p75: string;
      mean: string; min: string; max: string; sample_size: string;
    }>(
      `SELECT
        percentile_cont(0.25) WITHIN GROUP (ORDER BY l.price) AS p25,
        percentile_cont(0.50) WITHIN GROUP (ORDER BY l.price) AS median,
        percentile_cont(0.75) WITHIN GROUP (ORDER BY l.price) AS p75,
        AVG(l.price)          AS mean,
        MIN(l.price)          AS min,
        MAX(l.price)          AS max,
        COUNT(*)              AS sample_size
       FROM listings l
       JOIN vehicles v ON v.id = l.vehicle_id
       WHERE l.status = 'published'
         AND lower(v.make)  = lower($1)
         AND lower(v.model) = lower($2)
         AND v.year    BETWEEN $3 AND $4
         AND v.mileage BETWEEN $5 AND $6`,
      [vehicle.make, vehicle.model, minYear, maxYear, minMileage, maxMileage]
    );

    const r = rows[0];
    return {
      strategyUsed: PricingStrategy.EXACT_MATCH,
      p25:        Math.round(Number(r.p25)),
      median:     Math.round(Number(r.median)),
      p75:        Math.round(Number(r.p75)),
      mean:       Math.round(Number(r.mean)),
      min:        Math.round(Number(r.min)),
      max:        Math.round(Number(r.max)),
      sampleSize: parseInt(r.sample_size, 10),
      filters:    { make: vehicle.make, model: vehicle.model, minYear, maxYear, minMileage, maxMileage },
    };
  }
}
