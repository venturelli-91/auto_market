export enum FuelType {
  GASOLINE = 'gasoline',
  DIESEL = 'diesel',
  HYBRID = 'hybrid',
  ELECTRIC = 'electric',
  FLEX = 'flex',
}

export enum Transmission {
  MANUAL = 'manual',
  AUTOMATIC = 'automatic',
  CVT = 'cvt',
}

export enum VehicleCondition {
  LIKE_NEW = 'like_new',
  EXCELLENT = 'excellent',
  GOOD = 'good',
  FAIR = 'fair',
  SALVAGE = 'salvage',
}

export interface VehicleImage {
  id: string;
  url: string;
  publicId: string; // Cloudinary public ID
  width: number;
  height: number;
  order: number;
  createdAt: Date;
}

export interface Vehicle {
  id: string;
  make: string; // e.g., "Toyota"
  model: string; // e.g., "Corolla"
  year: number;
  trim?: string; // e.g., "S", "XLE", "Limited"
  bodyType: string; // e.g., "Sedan", "SUV", "Truck"
  fuelType: FuelType;
  transmission: Transmission;
  mileage: number; // km
  condition: VehicleCondition;
  engineSize?: number; // liters
  horsepower?: number;
  color: string;
  interior?: string;
  features: string[]; // e.g., ["leather seats", "sunroof", "backup camera"]
  description?: string;
  images: VehicleImage[];
  createdAt: Date;
  updatedAt: Date;
}
