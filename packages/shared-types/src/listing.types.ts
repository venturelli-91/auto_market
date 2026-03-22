import { Vehicle } from './vehicle.types';

export enum ListingStatus {
  DRAFT = 'draft',
  PUBLISHED = 'published',
  SOLD = 'sold',
  DELISTED = 'delisted',
}

export enum PriceBadge {
  GREAT_DEAL = 'great_deal',
  FAIR_PRICE = 'fair_price',
  HIGH_PRICE = 'high_price',
}

export interface PriceScore {
  badge: PriceBadge;
  confidence: number; // 0-1, how confident is the pricing intelligence
  marketMedian: number;
  p25: number; // 25th percentile
  p75: number; // 75th percentile
  sampleSize: number; // how many comparable vehicles in market data
}

export interface Listing {
  id: string;
  dealerId: string;
  vehicle: Vehicle;
  price: number;
  priceScore?: PriceScore;
  status: ListingStatus;
  publishedAt?: Date;
  soldAt?: Date;
  viewCount: number;
  favoriteCount: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface ListingWithoutVehicle {
  id: string;
  dealerId: string;
  vehicleId: string;
  price: number;
  priceScore?: PriceScore;
  status: ListingStatus;
  publishedAt?: Date;
  soldAt?: Date;
  viewCount: number;
  favoriteCount: number;
  createdAt: Date;
  updatedAt: Date;
}
