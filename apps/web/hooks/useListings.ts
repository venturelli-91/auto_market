import { useQuery } from '@tanstack/react-query';
import { Listing, PaginatedResult } from '@automarket/shared-types';
import { apiClient } from '@/lib/api-client';

/**
 * useListings - Custom hook for fetching vehicle listings
 *
 * Uses TanStack Query v5 for:
 * - Automatic caching
 * - Background refetching
 * - Error handling
 * - Loading states
 *
 * Never use raw fetch() or useEffect in components
 */
export function useListings() {
  return useQuery({
    queryKey: ['listings'],
    queryFn: async () => {
      try {
        const data = await apiClient<PaginatedResult<Listing>>(
          '/api/listings'
        );
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
