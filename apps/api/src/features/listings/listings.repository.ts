import { Pool } from 'pg';
import { FindAllFilters, ListingRow, UpdatePriceScoreInput } from './listings.types';

export class ListingsRepository {
  constructor(private readonly pool: Pool) {}

  async findAll(filters: FindAllFilters = {}): Promise<ListingRow[]> {
    const conditions: string[] = ["l.status = 'published'"];
    const params: unknown[] = [];
    let idx = 1;

    if (filters.make) {
      conditions.push(`lower(v.make) = lower($${idx++})`);
      params.push(filters.make);
    }
    if (filters.model) {
      conditions.push(`lower(v.model) = lower($${idx++})`);
      params.push(filters.model);
    }
    if (filters.minPrice !== undefined) {
      conditions.push(`l.price >= $${idx++}`);
      params.push(filters.minPrice);
    }
    if (filters.maxPrice !== undefined) {
      conditions.push(`l.price <= $${idx++}`);
      params.push(filters.maxPrice);
    }
    if (filters.minYear !== undefined) {
      conditions.push(`v.year >= $${idx++}`);
      params.push(filters.minYear);
    }
    if (filters.maxYear !== undefined) {
      conditions.push(`v.year <= $${idx++}`);
      params.push(filters.maxYear);
    }
    if (filters.fuelType) {
      conditions.push(`lower(v.fuel_type) = lower($${idx++})`);
      params.push(filters.fuelType);
    }
    if (filters.transmission) {
      conditions.push(`lower(v.transmission) = lower($${idx++})`);
      params.push(filters.transmission);
    }

    const limit = filters.limit ?? 50;
    const offset = filters.offset ?? 0;
    params.push(limit, offset);

    const where = conditions.join(' AND ');

    const { rows } = await this.pool.query<ListingRow>(
      `SELECT
        l.id, l.dealer_id, l.vehicle_id, l.price,
        l.price_badge, l.price_confidence, l.price_market_median,
        l.price_p25, l.price_p75, l.price_sample_size,
        l.status, l.published_at, l.sold_at, l.view_count, l.favorite_count,
        l.created_at, l.updated_at,
        v.make, v.model, v.year, v.trim, v.body_type, v.fuel_type,
        v.transmission, v.mileage, v.condition, v.color, v.features,
        i.url  AS image_url,
        i.public_id AS image_public_id,
        i.width  AS image_width,
        i.height AS image_height
       FROM listings l
       JOIN vehicles v ON v.id = l.vehicle_id
       LEFT JOIN LATERAL (
         SELECT url, public_id, width, height
         FROM vehicle_images
         WHERE vehicle_id = l.vehicle_id
         ORDER BY "order" ASC
         LIMIT 1
       ) i ON true
       WHERE ${where}
       ORDER BY l.published_at DESC
       LIMIT $${idx++} OFFSET $${idx}`,
      params
    );

    return rows;
  }

  async findById(id: string): Promise<ListingRow | null> {
    const { rows } = await this.pool.query<ListingRow>(
      `SELECT
        l.id, l.dealer_id, l.vehicle_id, l.price,
        l.price_badge, l.price_confidence, l.price_market_median,
        l.price_p25, l.price_p75, l.price_sample_size,
        l.status, l.published_at, l.sold_at, l.view_count, l.favorite_count,
        l.created_at, l.updated_at,
        v.make, v.model, v.year, v.trim, v.body_type, v.fuel_type,
        v.transmission, v.mileage, v.condition, v.color, v.features,
        i.url  AS image_url,
        i.public_id AS image_public_id,
        i.width  AS image_width,
        i.height AS image_height
       FROM listings l
       JOIN vehicles v ON v.id = l.vehicle_id
       LEFT JOIN LATERAL (
         SELECT url, public_id, width, height
         FROM vehicle_images
         WHERE vehicle_id = l.vehicle_id
         ORDER BY "order" ASC
         LIMIT 1
       ) i ON true
       WHERE l.id = $1`,
      [id]
    );

    return rows[0] ?? null;
  }

  async updatePriceScore(id: string, score: UpdatePriceScoreInput): Promise<void> {
    await this.pool.query(
      `UPDATE listings SET
        price_badge         = $1,
        price_confidence    = $2,
        price_market_median = $3,
        price_p25           = $4,
        price_p75           = $5,
        price_sample_size   = $6,
        updated_at          = NOW()
       WHERE id = $7`,
      [score.badge, score.confidence, score.marketMedian, score.p25, score.p75, score.sampleSize, id]
    );
  }

  async countAll(filters: FindAllFilters = {}): Promise<number> {
    const conditions: string[] = ["l.status = 'published'"];
    const params: unknown[] = [];
    let idx = 1;

    if (filters.make) { conditions.push(`lower(v.make) = lower($${idx++})`); params.push(filters.make); }
    if (filters.model) { conditions.push(`lower(v.model) = lower($${idx++})`); params.push(filters.model); }
    if (filters.minPrice !== undefined) { conditions.push(`l.price >= $${idx++}`); params.push(filters.minPrice); }
    if (filters.maxPrice !== undefined) { conditions.push(`l.price <= $${idx++}`); params.push(filters.maxPrice); }
    if (filters.minYear !== undefined) { conditions.push(`v.year >= $${idx++}`); params.push(filters.minYear); }
    if (filters.maxYear !== undefined) { conditions.push(`v.year <= $${idx++}`); params.push(filters.maxYear); }
    if (filters.fuelType) { conditions.push(`lower(v.fuel_type) = lower($${idx++})`); params.push(filters.fuelType); }
    if (filters.transmission) { conditions.push(`lower(v.transmission) = lower($${idx++})`); params.push(filters.transmission); }

    const { rows } = await this.pool.query<{ count: string }>(
      `SELECT COUNT(*) AS count
       FROM listings l
       JOIN vehicles v ON v.id = l.vehicle_id
       WHERE ${conditions.join(' AND ')}`,
      params
    );

    return parseInt(rows[0].count, 10);
  }
}
