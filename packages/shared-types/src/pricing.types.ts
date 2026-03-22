import { Vehicle } from './vehicle.types';
import { PriceBadge } from './listing.types';

export enum PricingStrategy {
  REGIONAL = 'regional',
  NATIONAL = 'national',
  MAKE_MODEL = 'make_model',
  EXACT_MATCH = 'exact_match',
}

export interface MarketStats {
  strategyUsed: PricingStrategy;
  p25: number;
  median: number;
  p75: number;
  mean: number;
  min: number;
  max: number;
  sampleSize: number;
  filters: {
    region?: string;
    make?: string;
    model?: string;
    minYear?: number;
    maxYear?: number;
    minMileage?: number;
    maxMileage?: number;
  };
}

export interface PricingInput {
  vehicle: Vehicle;
  dealerLocation?: string; // state/region code
}

export interface PricingOutput {
  listingPrice: number;
  marketStats: MarketStats;
  badge: PriceBadge;
  confidence: number;
  explanation?: string; // why this price is "great deal" etc.
}

export interface PricingJobPayload {
  listingId: string;
  vehicleId: string;
  dealerId: string;
  dealerLocation?: string;
}
