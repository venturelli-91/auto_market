'use client';

import { useState } from 'react';
import { SlidersHorizontal, X } from 'lucide-react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { ListingsFilters } from '../hooks/useListings';
import { SearchFiltersContainer } from './SearchFiltersContainer';
import { ListingsContainer } from './ListingsContainer';

export function MarketplaceClient() {
  const [filters, setFilters] = useState<ListingsFilters>({});
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  const activeFilterCount = Object.values(filters).filter(
    (v) => v !== undefined && v !== ''
  ).length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Mobile filter toggle */}
      <div className="lg:hidden mb-4">
        <button
          onClick={() => setMobileFiltersOpen(true)}
          className="flex items-center gap-2 px-4 py-2.5 bg-white dark:bg-white/5 border border-gray-200 dark:border-purple-600/20 rounded-xl text-sm font-medium text-gray-700 dark:text-white hover:border-purple-400 dark:hover:border-purple-500/50 transition-colors cursor-pointer"
          aria-label="Open filters"
        >
          <SlidersHorizontal size={16} className="text-purple-500" />
          <span>Filters</span>
          {activeFilterCount > 0 && (
            <span className="ml-1 w-5 h-5 bg-purple-600 text-white rounded-full text-xs flex items-center justify-center font-bold">
              {activeFilterCount}
            </span>
          )}
        </button>
      </div>

      {/* Mobile filter drawer */}
      <AnimatePresence>
        {mobileFiltersOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              initial={shouldReduceMotion ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={shouldReduceMotion ? {} : { opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setMobileFiltersOpen(false)}
              className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            />

            {/* Drawer */}
            <motion.div
              key="drawer"
              initial={shouldReduceMotion ? false : { x: '-100%' }}
              animate={{ x: 0 }}
              exit={shouldReduceMotion ? {} : { x: '-100%' }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="fixed left-0 top-0 bottom-0 w-80 z-50 bg-white dark:bg-black border-r border-gray-200 dark:border-purple-600/20 overflow-y-auto lg:hidden"
            >
              <div className="flex items-center justify-between px-5 py-4 border-b border-gray-200 dark:border-white/10">
                <span className="font-bold text-gray-900 dark:text-white">Filters</span>
                <button
                  onClick={() => setMobileFiltersOpen(false)}
                  className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-white/10 transition-colors cursor-pointer"
                  aria-label="Close filters"
                >
                  <X size={18} className="text-gray-600 dark:text-white/60" />
                </button>
              </div>
              <div className="p-4">
                <SearchFiltersContainer
                  filters={filters}
                  onChange={(f) => { setFilters(f); setMobileFiltersOpen(false); }}
                />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Desktop layout */}
      <div className="flex gap-6">
        {/* Sidebar — desktop only */}
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
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" aria-hidden="true" />
              <span className="text-sm text-gray-500 dark:text-white/50">Live results</span>
            </div>
          </div>

          <ListingsContainer filters={filters} />
        </section>
      </div>
    </div>
  );
}
