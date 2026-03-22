'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactNode } from 'react';
import { ThemeProvider } from '../app/ThemeContext';

/**
 * Providers - Client-side providers for the application
 *
 * Includes:
 * - QueryClientProvider (TanStack Query v5)
 *
 * Wrap the entire app in <Providers> in the root layout.
 */

// Create a client for the whole app
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Don't retry on error by default
      retry: 1,
      // Refetch when window regains focus
      refetchOnWindowFocus: true,
      // Refetch on mount
      refetchOnMount: true,
    },
  },
});

interface ProvidersProps {
  children: ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  return (
    <ThemeProvider>
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    </ThemeProvider>
  );
}
