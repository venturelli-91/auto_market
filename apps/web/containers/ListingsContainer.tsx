'use client';

import { Suspense, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import { useListings, ListingsFilters } from '../hooks/useListings';
import { VehicleCard } from '../components/VehicleCard';
import { Listing } from '@automarket/shared-types';

/**
 * ListingsContainer - Data fetching layer for vehicle listings
 *
 * Architecture: Container/Presentational Pattern
 * - This container handles TanStack Query data fetching
 * - Reads filters from URL search params
 * - Passes data to presentational VehicleCard components
 * - Never renders UI directly (except loading/error states)
 *
 * Responsibilities:
 * - Parse filters from URL search params
 * - Fetch listings via useListings hook with filters
 * - Handle loading, error, and empty states
 * - Map listings to VehicleCard components
 */
export function ListingsContainer() {
  const searchParams = useSearchParams();

  // Build filters object from URL search params
  const filters = useMemo<ListingsFilters>(() => {
    return {
      make: searchParams.get('make') || undefined,
      model: searchParams.get('model') || undefined,
      minPrice: searchParams.get('minPrice') ? parseInt(searchParams.get('minPrice')!) : undefined,
      maxPrice: searchParams.get('maxPrice') ? parseInt(searchParams.get('maxPrice')!) : undefined,
      minYear: searchParams.get('minYear') ? parseInt(searchParams.get('minYear')!) : undefined,
      maxYear: searchParams.get('maxYear') ? parseInt(searchParams.get('maxYear')!) : undefined,
      fuelType: searchParams.get('fuelType') || undefined,
      transmission: searchParams.get('transmission') || undefined,
    };
  }, [searchParams]);

  const { data, isLoading, error } = useListings(filters);

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="
              bg-white rounded-lg shadow-md overflow-hidden
              animate-pulse
            "
          >
            {/* Image skeleton */}
            <div className="w-full bg-gray-200" style={{ aspectRatio: '16/9' }} />

            {/* Content skeleton */}
            <div className="p-4 space-y-3">
              <div className="h-5 bg-gray-200 rounded w-3/4" />
              <div className="h-4 bg-gray-100 rounded w-1/2" />
              <div className="h-6 bg-gray-200 rounded w-1/3" />
              <div className="h-10 bg-gray-200 rounded" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <div className="text-center">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Error loading listings
          </h3>
          <p className="text-gray-600 mb-4">
            Something went wrong. Please try again later.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="
              px-4 py-2 bg-blue-600 text-white rounded
              hover:bg-blue-700 transition-colors
            "
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  if (!data || data.items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <div className="text-center">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            No listings found
          </h3>
          <p className="text-gray-600">
            Check back soon for available vehicles!
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {data.items.map((listing: Listing) => (
        <VehicleCard
          key={listing.id}
          listing={listing}
          vehicle={listing.vehicle}
        />
      ))}
    </div>
  );
}

/**
 * ListingsContainerWithSuspense - Wrapper with Suspense boundary
 *
 * Use this in Server Components when you need Suspense fallback
 */
export function ListingsContainerWithSuspense() {
  return (
    <Suspense fallback={<div>Loading listings...</div>}>
      <ListingsContainer />
    </Suspense>
  );
}
