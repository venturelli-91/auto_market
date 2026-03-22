import { FuelType, Transmission, VehicleCondition } from './vehicle.types';
import { Listing } from './listing.types';

export interface SearchFilters {
  query?: string; // full-text search on make, model, trim
  minPrice?: number;
  maxPrice?: number;
  minYear?: number;
  maxYear?: number;
  minMileage?: number;
  maxMileage?: number;
  fuelType?: FuelType[];
  transmission?: Transmission[];
  condition?: VehicleCondition[];
  bodyType?: string[];
  make?: string[];
  model?: string[];
  dealerId?: string;
  hasImages?: boolean;
  sortBy?: SortOption;
  limit?: number; // default 20, max 100
  cursor?: string; // for cursor-based pagination
}

export enum SortOption {
  PRICE_ASC = 'price_asc',
  PRICE_DESC = 'price_desc',
  NEWEST = 'newest',
  MILEAGE_ASC = 'mileage_asc',
  RELEVANCE = 'relevance',
  DEAL_SCORE = 'deal_score', // Great Deal first
}

export interface CursorPage<T> {
  items: T[];
  nextCursor?: string;
  prevCursor?: string;
  hasNextPage: boolean;
  hasPrevPage: boolean;
  totalCount: number;
}

export type PaginatedResult<T> = CursorPage<T>;

export interface SearchResult {
  listings: CursorPage<Listing>;
  facets: {
    makes: { label: string; count: number }[];
    models: { label: string; count: number }[];
    fuelTypes: { label: FuelType; count: number }[];
    transmissions: { label: Transmission; count: number }[];
    conditions: { label: VehicleCondition; count: number }[];
    bodyTypes: { label: string; count: number }[];
    priceRanges: { min: number; max: number }[];
    yearRanges: { min: number; max: number }[];
  };
}
