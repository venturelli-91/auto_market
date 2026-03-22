export interface ListingRow {
  id: string;
  dealer_id: string;
  vehicle_id: string;
  price: number;
  price_badge: string | null;
  price_confidence: number | null;
  price_market_median: number | null;
  price_p25: number | null;
  price_p75: number | null;
  price_sample_size: number | null;
  status: string;
  published_at: Date | null;
  sold_at: Date | null;
  view_count: number;
  favorite_count: number;
  created_at: Date;
  updated_at: Date;
  // joined vehicle fields
  make: string;
  model: string;
  year: number;
  trim: string | null;
  body_type: string;
  fuel_type: string;
  transmission: string;
  mileage: number;
  condition: string;
  color: string;
  features: string[];
  // joined image fields (first image)
  image_url: string | null;
  image_public_id: string | null;
  image_width: number | null;
  image_height: number | null;
}

export interface FindAllFilters {
  make?: string;
  model?: string;
  minPrice?: number;
  maxPrice?: number;
  minYear?: number;
  maxYear?: number;
  fuelType?: string;
  transmission?: string;
  limit?: number;
  offset?: number;
}

export interface UpdatePriceScoreInput {
  badge: string;
  confidence: number;
  marketMedian: number;
  p25: number;
  p75: number;
  sampleSize: number;
}
