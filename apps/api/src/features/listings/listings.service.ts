import { Listing, PriceBadge, PriceScore, ListingStatus, FuelType, Transmission, VehicleCondition } from '@automarket/shared-types';
import { ListingsRepository } from './listings.repository';
import { FindAllFilters, ListingRow } from './listings.types';

export class ListingsService {
  constructor(private readonly repository: ListingsRepository) {}

  async findAll(filters: FindAllFilters): Promise<{ items: Listing[]; totalCount: number }> {
    const [rows, totalCount] = await Promise.all([
      this.repository.findAll(filters),
      this.repository.countAll(filters),
    ]);

    return { items: rows.map(toListing), totalCount };
  }

  async findById(id: string): Promise<Listing | null> {
    const row = await this.repository.findById(id);
    return row ? toListing(row) : null;
  }
}

// ---------------------------------------------------------------------------
// Map flat DB row → Listing domain object
// ---------------------------------------------------------------------------
function toListing(row: ListingRow): Listing {
  const priceScore: PriceScore | undefined =
    row.price_badge && row.price_p25 && row.price_p75 && row.price_market_median
      ? {
          badge: row.price_badge as PriceBadge,
          confidence: Number(row.price_confidence) ?? 0,
          marketMedian: row.price_market_median,
          p25: row.price_p25,
          p75: row.price_p75,
          sampleSize: row.price_sample_size ?? 0,
        }
      : undefined;

  return {
    id: row.id,
    dealerId: row.dealer_id,
    vehicle: {
      id: row.vehicle_id,
      make: row.make,
      model: row.model,
      year: row.year,
      trim: row.trim ?? undefined,
      bodyType: row.body_type,
      fuelType: row.fuel_type as FuelType,
      transmission: row.transmission as Transmission,
      mileage: row.mileage,
      condition: row.condition as VehicleCondition,
      color: row.color,
      features: row.features,
      images: row.image_url
        ? [
            {
              id: row.vehicle_id,
              url: row.image_url,
              publicId: row.image_public_id ?? '',
              width: row.image_width ?? 800,
              height: row.image_height ?? 600,
              order: 0,
              createdAt: row.created_at,
            },
          ]
        : [],
      createdAt: row.created_at,
      updatedAt: row.updated_at,
    },
    price: row.price,
    priceScore,
    status: row.status as ListingStatus,
    publishedAt: row.published_at ?? undefined,
    soldAt: row.sold_at ?? undefined,
    viewCount: row.view_count,
    favoriteCount: row.favorite_count,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}
