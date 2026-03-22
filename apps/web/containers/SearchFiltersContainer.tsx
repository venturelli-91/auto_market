'use client';

import { SlidersHorizontal } from 'lucide-react';
import { ListingsFilters } from '../hooks/useListings';

interface SearchFiltersContainerProps {
  filters: ListingsFilters;
  onChange: (filters: ListingsFilters) => void;
}

const MAKES = ['Toyota', 'Honda', 'Ford', 'Tesla', 'BMW', 'Mazda', 'Audi', 'Mercedes'];
const FUEL_TYPES = [
  { label: 'Gasoline', value: 'gasoline' },
  { label: 'Electric', value: 'electric' },
  { label: 'Hybrid', value: 'hybrid' },
  { label: 'Diesel', value: 'diesel' },
];
const TRANSMISSIONS = [
  { label: 'Automatic', value: 'automatic' },
  { label: 'Manual', value: 'manual' },
  { label: 'CVT', value: 'cvt' },
];

export function SearchFiltersContainer({ filters, onChange }: SearchFiltersContainerProps) {
  const update = (patch: Partial<ListingsFilters>) => onChange({ ...filters, ...patch });

  const clearAll = () => onChange({});

  const hasActiveFilters = Object.values(filters).some(
    (v) => v !== undefined && v !== ''
  );

  return (
    <div className="bg-white dark:bg-white/5 border border-gray-200 dark:border-purple-600/20 rounded-xl p-5 transition-colors duration-300">
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2">
          <SlidersHorizontal size={16} className="text-purple-500" />
          <h2 className="font-bold text-gray-900 dark:text-white text-sm">Filters</h2>
        </div>
        {hasActiveFilters && (
          <button
            onClick={clearAll}
            className="text-xs text-purple-600 dark:text-purple-400 hover:text-purple-500 transition-colors font-medium"
          >
            Clear all
          </button>
        )}
      </div>

      <div className="space-y-5">
        {/* Make */}
        <div>
          <label className="block text-xs font-bold text-gray-500 dark:text-white/50 mb-2 uppercase tracking-wide">
            Make
          </label>
          <select
            value={filters.make ?? ''}
            onChange={(e) => update({ make: e.target.value || undefined })}
            className="w-full px-3 py-2 text-sm bg-gray-100 dark:bg-white/10 border border-gray-200 dark:border-white/10 rounded-lg text-gray-700 dark:text-white focus:outline-none focus:border-purple-500 transition-colors"
          >
            <option value="">All makes</option>
            {MAKES.map((make) => (
              <option key={make} value={make}>{make}</option>
            ))}
          </select>
        </div>

        {/* Model */}
        <div>
          <label className="block text-xs font-bold text-gray-500 dark:text-white/50 mb-2 uppercase tracking-wide">
            Model
          </label>
          <input
            type="text"
            value={filters.model ?? ''}
            onChange={(e) => update({ model: e.target.value || undefined })}
            placeholder="e.g. Corolla"
            className="w-full px-3 py-2 text-sm bg-gray-100 dark:bg-white/10 border border-gray-200 dark:border-white/10 rounded-lg text-gray-700 dark:text-white placeholder-gray-400 dark:placeholder-white/30 focus:outline-none focus:border-purple-500 transition-colors"
          />
        </div>

        {/* Price Range */}
        <div>
          <label className="block text-xs font-bold text-gray-500 dark:text-white/50 mb-2 uppercase tracking-wide">
            Price Range
          </label>
          <div className="flex gap-2">
            <input
              type="number"
              value={filters.minPrice ?? ''}
              onChange={(e) => update({ minPrice: e.target.value ? Number(e.target.value) : undefined })}
              placeholder="Min"
              className="w-full px-3 py-2 text-sm bg-gray-100 dark:bg-white/10 border border-gray-200 dark:border-white/10 rounded-lg text-gray-700 dark:text-white placeholder-gray-400 dark:placeholder-white/30 focus:outline-none focus:border-purple-500 transition-colors"
            />
            <input
              type="number"
              value={filters.maxPrice ?? ''}
              onChange={(e) => update({ maxPrice: e.target.value ? Number(e.target.value) : undefined })}
              placeholder="Max"
              className="w-full px-3 py-2 text-sm bg-gray-100 dark:bg-white/10 border border-gray-200 dark:border-white/10 rounded-lg text-gray-700 dark:text-white placeholder-gray-400 dark:placeholder-white/30 focus:outline-none focus:border-purple-500 transition-colors"
            />
          </div>
        </div>

        {/* Year Range */}
        <div>
          <label className="block text-xs font-bold text-gray-500 dark:text-white/50 mb-2 uppercase tracking-wide">
            Year
          </label>
          <div className="flex gap-2">
            <input
              type="number"
              value={filters.minYear ?? ''}
              onChange={(e) => update({ minYear: e.target.value ? Number(e.target.value) : undefined })}
              placeholder="From"
              className="w-full px-3 py-2 text-sm bg-gray-100 dark:bg-white/10 border border-gray-200 dark:border-white/10 rounded-lg text-gray-700 dark:text-white placeholder-gray-400 dark:placeholder-white/30 focus:outline-none focus:border-purple-500 transition-colors"
            />
            <input
              type="number"
              value={filters.maxYear ?? ''}
              onChange={(e) => update({ maxYear: e.target.value ? Number(e.target.value) : undefined })}
              placeholder="To"
              className="w-full px-3 py-2 text-sm bg-gray-100 dark:bg-white/10 border border-gray-200 dark:border-white/10 rounded-lg text-gray-700 dark:text-white placeholder-gray-400 dark:placeholder-white/30 focus:outline-none focus:border-purple-500 transition-colors"
            />
          </div>
        </div>

        {/* Fuel Type */}
        <div>
          <label className="block text-xs font-bold text-gray-500 dark:text-white/50 mb-2 uppercase tracking-wide">
            Fuel Type
          </label>
          <select
            value={filters.fuelType ?? ''}
            onChange={(e) => update({ fuelType: e.target.value || undefined })}
            className="w-full px-3 py-2 text-sm bg-gray-100 dark:bg-white/10 border border-gray-200 dark:border-white/10 rounded-lg text-gray-700 dark:text-white focus:outline-none focus:border-purple-500 transition-colors"
          >
            <option value="">All types</option>
            {FUEL_TYPES.map(({ label, value }) => (
              <option key={value} value={value}>{label}</option>
            ))}
          </select>
        </div>

        {/* Transmission */}
        <div>
          <label className="block text-xs font-bold text-gray-500 dark:text-white/50 mb-2 uppercase tracking-wide">
            Transmission
          </label>
          <select
            value={filters.transmission ?? ''}
            onChange={(e) => update({ transmission: e.target.value || undefined })}
            className="w-full px-3 py-2 text-sm bg-gray-100 dark:bg-white/10 border border-gray-200 dark:border-white/10 rounded-lg text-gray-700 dark:text-white focus:outline-none focus:border-purple-500 transition-colors"
          >
            <option value="">All</option>
            {TRANSMISSIONS.map(({ label, value }) => (
              <option key={value} value={value}>{label}</option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}
