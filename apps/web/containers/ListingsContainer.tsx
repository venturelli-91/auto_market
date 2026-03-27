'use client';

import { useListings, ListingsFilters } from '../hooks/useListings';
import { VehicleCard } from '../components/VehicleCard';

interface ListingsContainerProps {
  filters?: ListingsFilters;
}

function SkeletonCard() {
  return (
    <div className="bg-white dark:bg-white/5 rounded-xl border border-gray-200 dark:border-white/10 overflow-hidden animate-pulse">
      <div className="w-full bg-gray-200 dark:bg-white/10" style={{ aspectRatio: '16 / 9' }} />
      <div className="p-4 space-y-3">
        <div className="h-5 bg-gray-200 dark:bg-white/10 rounded-md w-3/4" />
        <div className="h-4 bg-gray-200 dark:bg-white/10 rounded-md w-1/2" />
        <div className="flex items-center justify-between pt-1">
          <div className="h-7 bg-gray-200 dark:bg-white/10 rounded-md w-1/3" />
          <div className="h-6 bg-gray-200 dark:bg-white/10 rounded-md w-1/4" />
        </div>
        <div className="h-10 bg-gray-200 dark:bg-white/10 rounded-lg w-full" />
      </div>
    </div>
  );
}

export function ListingsContainer({ filters }: ListingsContainerProps) {
  const { data, isLoading, isError } = useListings(filters);

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-center py-16 text-gray-500 dark:text-white/50">
        <p className="font-medium">Failed to load listings.</p>
        <p className="text-sm mt-1">Please try again later.</p>
      </div>
    );
  }

  const listings = data?.items ?? [];

  if (listings.length === 0) {
    return (
      <div className="text-center py-16 text-gray-500 dark:text-white/50">
        <p className="font-medium">No vehicles found.</p>
        <p className="text-sm mt-1">Try adjusting your filters.</p>
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
