'use client';

import { useListings, ListingsFilters } from '../hooks/useListings';
import { VehicleCard } from '../components/VehicleCard';

interface ListingsContainerProps {
  filters?: ListingsFilters;
}

export function ListingsContainer({ filters }: ListingsContainerProps) {
  const { data, isLoading, isError } = useListings(filters);

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="bg-gray-100 dark:bg-white/5 rounded-lg h-72 animate-pulse" />
        ))}
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-center py-12 text-gray-500 dark:text-white/50">
        Failed to load listings. Please try again.
      </div>
    );
  }

  const listings = data?.items ?? [];

  if (listings.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500 dark:text-white/50">
        No vehicles found matching your filters.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
      {listings.map((listing) => (
        <VehicleCard key={listing.id} listing={listing} vehicle={listing.vehicle} />
      ))}
    </div>
  );
}
