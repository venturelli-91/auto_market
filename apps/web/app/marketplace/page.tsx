import { Suspense } from 'react';
import Link from 'next/link';
import { ListingsContainer } from '../../containers/ListingsContainer';
import { SearchFiltersContainer } from '../../containers/SearchFiltersContainer';

export const dynamic = 'force-dynamic';

export default function Marketplace() {
  return (
    <main className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2">
              <div className="text-2xl font-black bg-gradient-to-r from-yellow-500 to-yellow-600 bg-clip-text text-transparent">
                DRIVE
              </div>
              <div className="text-2xl font-black text-gray-900">MATCH</div>
            </Link>
            <h1 className="text-2xl font-bold text-gray-900">Marketplace</h1>
            <div className="flex gap-4">
              <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.5 1.5H3.75A2.25 2.25 0 001.5 3.75v16.5A2.25 2.25 0 003.75 22.5h16.5a2.25 2.25 0 002.25-2.25V13.5" />
                </svg>
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                </svg>
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <svg className="w-6 h-6 text-gray-600" fill="currentColor" viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="10" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content - Sidebar + Grid */}
      <div className="flex gap-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Sidebar Filters - Hidden on mobile */}
        <aside className="hidden lg:block w-64 flex-shrink-0">
          <Suspense fallback={<div className="bg-gray-100 rounded-lg p-6 h-96" />}>
            <SearchFiltersContainer />
          </Suspense>
        </aside>

        {/* Listings Grid */}
        <section className="flex-1">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Available Vehicles</h2>
            <p className="text-gray-600 text-sm mt-1">Browse our latest inventory with intelligent pricing</p>
          </div>
          <Suspense fallback={<div className="text-center py-8">Loading vehicles...</div>}>
            <ListingsContainer />
          </Suspense>
        </section>
      </div>
    </main>
  );
}
