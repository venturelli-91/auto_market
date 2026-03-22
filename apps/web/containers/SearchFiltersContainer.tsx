'use client';

import { useState } from 'react';

/**
 * SearchFiltersContainer - Sidebar filter interface
 *
 * Design: Inspired by DriveMatch design (Design 3)
 * Features:
 * - Brand selector
 * - Model selector
 * - Price range slider
 * - Duration selector
 * - Instant availability toggle
 * - Budget range visualization
 *
 * Architecture: Client component (uses useState for filter state)
 * Typically would connect to ListingsContainer via state management or URL params
 */
export function SearchFiltersContainer() {
  const [selectedBrand, setSelectedBrand] = useState('');
  const [selectedModel, setSelectedModel] = useState('');
  const [priceRange, setPriceRange] = useState([20000, 80000]);
  const [duration, setDuration] = useState('any');
  const [instantAvailable, setInstantAvailable] = useState(false);

  const brands = ['Toyota', 'Honda', 'Ford', 'Tesla', 'BMW', 'Mazda', 'Chevrolet', 'Nissan'];
  const models: Record<string, string[]> = {
    Toyota: ['Corolla', 'Camry', 'RAV4', 'Highlander'],
    Honda: ['Civic', 'Accord', 'CR-V', 'Pilot'],
    Ford: ['F-150', 'Mustang', 'Explorer', 'Edge'],
    Tesla: ['Model 3', 'Model S', 'Model X', 'Model Y'],
    BMW: ['3 Series', '5 Series', 'X3', 'X5'],
    Mazda: ['CX-5', 'Mazda3', 'CX-9'],
    Chevrolet: ['Silverado', 'Malibu', 'Equinox'],
    Nissan: ['Altima', 'Rogue', 'Frontier'],
  };

  const getModelOptions = () => {
    return selectedBrand && models[selectedBrand] ? models[selectedBrand] : [];
  };

  const handleResetFilters = () => {
    setSelectedBrand('');
    setSelectedModel('');
    setPriceRange([20000, 80000]);
    setDuration('any');
    setInstantAvailable(false);
  };

  return (
    <div className="bg-gray-50 rounded-lg p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">Refine Results</h3>
        <button
          onClick={handleResetFilters}
          className="text-sm text-blue-600 hover:text-blue-700 font-medium transition-colors"
        >
          Reset
        </button>
      </div>

      {/* Brand Selector */}
      <div>
        <label className="block text-sm font-medium text-gray-900 mb-3">
          Select Brand
        </label>
        <select
          value={selectedBrand}
          onChange={(e) => {
            setSelectedBrand(e.target.value);
            setSelectedModel('');
          }}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="">All Brands</option>
          {brands.map((brand) => (
            <option key={brand} value={brand}>
              {brand}
            </option>
          ))}
        </select>
      </div>

      {/* Model Selector */}
      {selectedBrand && (
        <div>
          <label className="block text-sm font-medium text-gray-900 mb-3">
            Choose Model
          </label>
          <select
            value={selectedModel}
            onChange={(e) => setSelectedModel(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">All Models</option>
            {getModelOptions().map((model) => (
              <option key={model} value={model}>
                {model}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Price Range */}
      <div>
        <label className="block text-sm font-medium text-gray-900 mb-3">
          Budget Range
        </label>
        <div className="space-y-2">
          <input
            type="range"
            min="10000"
            max="100000"
            step="5000"
            value={priceRange[0]}
            onChange={(e) => {
              const newMin = Math.min(Number(e.target.value), priceRange[1]);
              setPriceRange([newMin, priceRange[1]]);
            }}
            className="w-full h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer accent-blue-600"
          />
          <input
            type="range"
            min="10000"
            max="100000"
            step="5000"
            value={priceRange[1]}
            onChange={(e) => {
              const newMax = Math.max(Number(e.target.value), priceRange[0]);
              setPriceRange([priceRange[0], newMax]);
            }}
            className="w-full h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer accent-blue-600"
          />
          <div className="flex justify-between text-sm text-gray-600 pt-2">
            <span>${priceRange[0].toLocaleString()}</span>
            <span>${priceRange[1].toLocaleString()}</span>
          </div>
        </div>
      </div>

      {/* Duration */}
      <div>
        <label className="block text-sm font-medium text-gray-900 mb-3">
          Duration
        </label>
        <select
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="any">Any</option>
          <option value="today">Today</option>
          <option value="week">This Week</option>
          <option value="month">This Month</option>
        </select>
      </div>

      {/* Instant Availability */}
      <div className="flex items-center gap-3">
        <input
          type="checkbox"
          id="instant-available"
          checked={instantAvailable}
          onChange={(e) => setInstantAvailable(e.target.checked)}
          className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
        />
        <label htmlFor="instant-available" className="text-sm text-gray-700 cursor-pointer">
          Instant Availability
        </label>
      </div>

      {/* Apply Button */}
      <button className="w-full bg-blue-600 text-white py-2.5 rounded-lg font-medium hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
        Apply Filters
      </button>

      {/* Filter Stats */}
      <div className="pt-4 border-t border-gray-200">
        <p className="text-xs text-gray-600 text-center">
          Showing results for your selected filters
        </p>
      </div>
    </div>
  );
}
