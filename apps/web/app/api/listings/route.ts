/**
 * Mock API endpoint for listings
 *
 * In production, this would call the Express backend at :3001
 * For now, we return mock data for development
 */

import { Listing, Vehicle, VehicleCondition, FuelType, Transmission, PriceBadge, ListingStatus } from '@automarket/shared-types';

// Mock listings data
const MOCK_VEHICLES: Vehicle[] = [
  {
    id: 'v1',
    make: 'Toyota',
    model: 'Corolla',
    year: 2022,
    trim: 'S',
    bodyType: 'Sedan',
    fuelType: FuelType.GASOLINE,
    transmission: Transmission.AUTOMATIC,
    mileage: 45000,
    condition: VehicleCondition.EXCELLENT,
    color: 'Silver',
    features: ['Backup Camera', 'Bluetooth', 'Cruise Control'],
    images: [
      {
        id: 'img1',
        url: 'https://images.unsplash.com/photo-1552519507-da3a142c6e38?w=800&h=600&fit=crop',
        publicId: 'mock-toyota-1',
        width: 800,
        height: 600,
        order: 0,
        createdAt: new Date(),
      },
    ],
    createdAt: new Date('2026-01-15'),
    updatedAt: new Date('2026-03-20'),
  },
  {
    id: 'v2',
    make: 'Honda',
    model: 'Civic',
    year: 2021,
    trim: 'EX',
    bodyType: 'Sedan',
    fuelType: FuelType.GASOLINE,
    transmission: Transmission.AUTOMATIC,
    mileage: 62000,
    condition: VehicleCondition.GOOD,
    color: 'Blue',
    features: ['Sunroof', 'Apple CarPlay', 'Android Auto'],
    images: [
      {
        id: 'img2',
        url: 'https://images.unsplash.com/photo-1590474304245-52f150302d8e?w=800&h=600&fit=crop',
        publicId: 'mock-honda-1',
        width: 800,
        height: 600,
        order: 0,
        createdAt: new Date(),
      },
    ],
    createdAt: new Date('2026-02-01'),
    updatedAt: new Date('2026-03-19'),
  },
  {
    id: 'v3',
    make: 'Ford',
    model: 'F-150',
    year: 2023,
    trim: 'XLT',
    bodyType: 'Truck',
    fuelType: FuelType.GASOLINE,
    transmission: Transmission.AUTOMATIC,
    mileage: 28000,
    condition: VehicleCondition.LIKE_NEW,
    color: 'Black',
    features: ['4WD', 'Towing Package', 'Integrated Backup Camera'],
    images: [
      {
        id: 'img3',
        url: 'https://images.unsplash.com/photo-1533473359331-35ad025d2f9a?w=800&h=600&fit=crop',
        publicId: 'mock-ford-1',
        width: 800,
        height: 600,
        order: 0,
        createdAt: new Date(),
      },
    ],
    createdAt: new Date('2026-02-10'),
    updatedAt: new Date('2026-03-21'),
  },
  {
    id: 'v4',
    make: 'Tesla',
    model: 'Model 3',
    year: 2023,
    trim: 'Long Range',
    bodyType: 'Sedan',
    fuelType: FuelType.ELECTRIC,
    transmission: Transmission.AUTOMATIC,
    mileage: 15000,
    condition: VehicleCondition.EXCELLENT,
    color: 'White',
    features: ['Autopilot', 'Premium Audio', 'Glass Roof'],
    images: [
      {
        id: 'img4',
        url: 'https://images.unsplash.com/photo-1566023967268-de4d440ad079?w=800&h=600&fit=crop',
        publicId: 'mock-tesla-1',
        width: 800,
        height: 600,
        order: 0,
        createdAt: new Date(),
      },
    ],
    createdAt: new Date('2026-02-20'),
    updatedAt: new Date('2026-03-18'),
  },
  {
    id: 'v5',
    make: 'BMW',
    model: '3 Series',
    year: 2020,
    trim: '330i',
    bodyType: 'Sedan',
    fuelType: FuelType.GASOLINE,
    transmission: Transmission.AUTOMATIC,
    mileage: 85000,
    condition: VehicleCondition.GOOD,
    color: 'Red',
    features: ['Leather Interior', 'Premium Audio', 'Navigation'],
    images: [
      {
        id: 'img5',
        url: 'https://images.unsplash.com/photo-1552519507-da3a142c6e38?w=800&h=600&fit=crop',
        publicId: 'mock-bmw-1',
        width: 800,
        height: 600,
        order: 0,
        createdAt: new Date(),
      },
    ],
    createdAt: new Date('2026-01-20'),
    updatedAt: new Date('2026-03-17'),
  },
  {
    id: 'v6',
    make: 'Mazda',
    model: 'CX-5',
    year: 2022,
    trim: 'Preferred',
    bodyType: 'SUV',
    fuelType: FuelType.GASOLINE,
    transmission: Transmission.AUTOMATIC,
    mileage: 35000,
    condition: VehicleCondition.EXCELLENT,
    color: 'Gray',
    features: ['AWD', 'Apple CarPlay', 'Heated Seats'],
    images: [
      {
        id: 'img6',
        url: 'https://images.unsplash.com/photo-1552519507-da3a142c6e38?w=800&h=600&fit=crop',
        publicId: 'mock-mazda-1',
        width: 800,
        height: 600,
        order: 0,
        createdAt: new Date(),
      },
    ],
    createdAt: new Date('2026-02-15'),
    updatedAt: new Date('2026-03-20'),
  },
];

const MOCK_LISTINGS: Listing[] = MOCK_VEHICLES.map((vehicle, index) => ({
  id: `listing-${index + 1}`,
  dealerId: `dealer-${index % 3}`,
  vehicle,
  price: [22999, 19999, 45999, 52999, 28999, 32999][index],
  priceScore: {
    badge: [PriceBadge.GREAT_DEAL, PriceBadge.FAIR_PRICE, PriceBadge.HIGH_PRICE, PriceBadge.GREAT_DEAL, PriceBadge.FAIR_PRICE, PriceBadge.FAIR_PRICE][index],
    confidence: 0.85 + Math.random() * 0.14,
    marketMedian: [25000, 22000, 48000, 50000, 32000, 35000][index],
    p25: [20000, 18000, 42000, 45000, 25000, 28000][index],
    p75: [30000, 26000, 52000, 58000, 38000, 42000][index],
    sampleSize: 1200 + Math.floor(Math.random() * 800),
  },
  status: ListingStatus.PUBLISHED,
  publishedAt: new Date(),
  viewCount: Math.floor(Math.random() * 200),
  favoriteCount: Math.floor(Math.random() * 50),
  createdAt: MOCK_VEHICLES[index].createdAt,
  updatedAt: MOCK_VEHICLES[index].updatedAt,
}));

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  // Parse filter parameters
  const make = searchParams.get('make')?.toLowerCase();
  const model = searchParams.get('model')?.toLowerCase();
  const minPrice = searchParams.get('minPrice') ? parseInt(searchParams.get('minPrice')!) : undefined;
  const maxPrice = searchParams.get('maxPrice') ? parseInt(searchParams.get('maxPrice')!) : undefined;
  const minYear = searchParams.get('minYear') ? parseInt(searchParams.get('minYear')!) : undefined;
  const maxYear = searchParams.get('maxYear') ? parseInt(searchParams.get('maxYear')!) : undefined;
  const fuelType = searchParams.get('fuelType')?.toUpperCase();
  const transmission = searchParams.get('transmission')?.toUpperCase();

  // Filter listings
  const filtered = MOCK_LISTINGS.filter(listing => {
    const vehicle = listing.vehicle;

    // Make filter
    if (make && vehicle.make.toLowerCase() !== make) return false;

    // Model filter
    if (model && vehicle.model.toLowerCase() !== model) return false;

    // Price range filter
    if (minPrice !== undefined && listing.price < minPrice) return false;
    if (maxPrice !== undefined && listing.price > maxPrice) return false;

    // Year range filter
    if (minYear !== undefined && vehicle.year < minYear) return false;
    if (maxYear !== undefined && vehicle.year > maxYear) return false;

    // Fuel type filter
    if (fuelType && vehicle.fuelType !== fuelType) return false;

    // Transmission filter
    if (transmission && vehicle.transmission !== transmission) return false;

    return true;
  });

  return Response.json({
    items: filtered,
    nextCursor: null,
    hasNextPage: false,
    hasPrevPage: false,
    totalCount: filtered.length,
  });
}
