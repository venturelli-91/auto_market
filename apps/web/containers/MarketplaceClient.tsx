'use client';

import { useState } from 'react';
import { Car } from 'lucide-react';
import { ListingsFilters } from '../hooks/useListings';
import { SearchFiltersContainer } from './SearchFiltersContainer';
import { ListingsContainer } from './ListingsContainer';

export function MarketplaceClient() {
  const [filters, setFilters] = useState<ListingsFilters>({});

  return (
    <div className="flex gap-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Sidebar */}
      <aside className="hidden lg:block w-64 flex-shrink-0">
        <SearchFiltersContainer filters={filters} onChange={setFilters} />
      </aside>

      {/* Listings */}
      <section className="flex-1 min-w-0">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">Available Vehicles</h2>
            <p className="text-gray-500 dark:text-white/50 text-sm mt-0.5">
              Browse our inventory with intelligent pricing
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Car size={16} className="text-purple-500" />
            <span className="text-sm text-gray-500 dark:text-white/50">Live results</span>
          </div>
        </div>

        <ListingsContainer filters={filters} />
      </section>
    </div>
  );
}
