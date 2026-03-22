import { useQuery } from '@tanstack/react-query';
import { Listing, PaginatedResult } from '@automarket/shared-types';
import { apiClient } from '../lib/api-client';

export interface ListingsFilters {
  make?: string;
  model?: string;
  minPrice?: number;
  maxPrice?: number;
  minYear?: number;
  maxYear?: number;
  fuelType?: string;
  transmission?: string;
}

/**
 * useListings - Custom hook for fetching vehicle listings with filters
 *
 * Uses TanStack Query v5 for:
 * - Automatic caching per filter combination
 * - Background refetching when filters change
 * - Error handling
 * - Loading states
 *
 * Never use raw fetch() or useEffect in components
 */
export function useListings(filters?: ListingsFilters) {
  // Build query params from filters
  const queryParams = new URLSearchParams();
  if (filters?.make) queryParams.append('make', filters.make);
  if (filters?.model) queryParams.append('model', filters.model);
  if (filters?.minPrice !== undefined) queryParams.append('minPrice', filters.minPrice.toString());
  if (filters?.maxPrice !== undefined) queryParams.append('maxPrice', filters.maxPrice.toString());
  if (filters?.minYear !== undefined) queryParams.append('minYear', filters.minYear.toString());
  if (filters?.maxYear !== undefined) queryParams.append('maxYear', filters.maxYear.toString());
  if (filters?.fuelType) queryParams.append('fuelType', filters.fuelType);
  if (filters?.transmission) queryParams.append('transmission', filters.transmission);

  const queryString = queryParams.toString();
  const url = `/api/listings${queryString ? `?${queryString}` : ''}`;

  return useQuery({
    queryKey: ['listings', filters],
    queryFn: async () => {
      try {
        const data = await apiClient<PaginatedResult<Listing>>(url);
        return data;
      } catch (error) {
        console.error('Failed to fetch listings:', error);
        throw error;
      }
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes (formerly cacheTime)
  });
}
