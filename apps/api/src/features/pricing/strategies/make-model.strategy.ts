import { Pool } from 'pg';
import { MarketStats, PricingInput, PricingStrategy } from '@automarket/shared-types';
import { IPricingStrategy, MIN_SAMPLE_SIZE } from '../pricing.strategy';

/**
 * MakeModelStrategy — same make+model, year ±3 (no mileage restriction)
 */
export class MakeModelStrategy implements IPricingStrategy {
  readonly name = PricingStrategy.MAKE_MODEL;

  async canApply(input: PricingInput, pool: Pool): Promise<boolean> {
    const { vehicle } = input;
    const { rows } = await pool.query<{ count: string }>(
      `SELECT COUNT(*) AS count
       FROM listings l
       JOIN vehicles v ON v.id = l.vehicle_id
       WHERE l.status = 'published'
         AND lower(v.make)  = lower($1)
         AND lower(v.model) = lower($2)
         AND v.year BETWEEN $3 AND $4`,
      [vehicle.make, vehicle.model, vehicle.year - 3, vehicle.year + 3]
    );
    return parseInt(rows[0].count, 10) >= MIN_SAMPLE_SIZE;
  }

  async compute(input: PricingInput, pool: Pool): Promise<MarketStats> {
    const { vehicle } = input;
    const minYear = vehicle.year - 3;
    const maxYear = vehicle.year + 3;

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
         AND v.year BETWEEN $3 AND $4`,
      [vehicle.make, vehicle.model, minYear, maxYear]
    );

    const r = rows[0];
    return {
      strategyUsed: PricingStrategy.MAKE_MODEL,
      p25:        Math.round(Number(r.p25)),
      median:     Math.round(Number(r.median)),
      p75:        Math.round(Number(r.p75)),
      mean:       Math.round(Number(r.mean)),
      min:        Math.round(Number(r.min)),
      max:        Math.round(Number(r.max)),
      sampleSize: parseInt(r.sample_size, 10),
      filters:    { make: vehicle.make, model: vehicle.model, minYear, maxYear },
    };
  }
}
