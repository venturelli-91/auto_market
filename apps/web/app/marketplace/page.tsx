import { Suspense } from 'react';
import Link from 'next/link';
import { Car, SlidersHorizontal } from 'lucide-react';
import { ThemeToggle } from '../../components/ThemeToggle';
import { ListingsContainer } from '../../containers/ListingsContainer';

export const dynamic = 'force-dynamic';

export default function Marketplace() {
  return (
    <main className="min-h-screen bg-gray-50 dark:bg-black transition-colors duration-300">
      {/* Header */}
      <header className="bg-white dark:bg-black border-b border-gray-200 dark:border-purple-600/20 sticky top-0 z-40 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-5 h-5 bg-purple-600 rounded-full" />
              <div className="text-xl font-black text-gray-900 dark:text-white">DriveMatch</div>
            </Link>
            <h1 className="text-lg font-bold text-gray-900 dark:text-white">Marketplace</h1>
            <ThemeToggle />
          </div>
        </div>
      </header>

      {/* Main Content - Sidebar + Grid */}
      <div className="flex gap-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Sidebar Filters */}
        <aside className="hidden lg:block w-64 flex-shrink-0">
          <div className="bg-white dark:bg-white/5 border border-gray-200 dark:border-purple-600/20 rounded-xl p-5 transition-colors duration-300">
            <div className="flex items-center gap-2 mb-5">
              <SlidersHorizontal size={16} className="text-purple-500" />
              <h2 className="font-bold text-gray-900 dark:text-white text-sm">Filters</h2>
            </div>

            <div className="space-y-5">
              {/* Make */}
              <div>
                <label className="block text-xs font-bold text-gray-500 dark:text-white/50 mb-2 uppercase tracking-wide">Make</label>
                <select className="w-full px-3 py-2 text-sm bg-gray-100 dark:bg-white/10 border border-gray-200 dark:border-white/10 rounded-lg text-gray-700 dark:text-white focus:outline-none focus:border-purple-500 transition-colors">
                  <option value="">All makes</option>
                  <option>Toyota</option>
                  <option>Honda</option>
                  <option>Ford</option>
                  <option>Tesla</option>
                  <option>BMW</option>
                  <option>Mazda</option>
                </select>
              </div>

              {/* Price Range */}
              <div>
                <label className="block text-xs font-bold text-gray-500 dark:text-white/50 mb-2 uppercase tracking-wide">Price Range</label>
                <div className="flex gap-2">
                  <input type="number" placeholder="Min" className="w-full px-3 py-2 text-sm bg-gray-100 dark:bg-white/10 border border-gray-200 dark:border-white/10 rounded-lg text-gray-700 dark:text-white placeholder-gray-400 dark:placeholder-white/30 focus:outline-none focus:border-purple-500 transition-colors" />
                  <input type="number" placeholder="Max" className="w-full px-3 py-2 text-sm bg-gray-100 dark:bg-white/10 border border-gray-200 dark:border-white/10 rounded-lg text-gray-700 dark:text-white placeholder-gray-400 dark:placeholder-white/30 focus:outline-none focus:border-purple-500 transition-colors" />
                </div>
              </div>

              {/* Year */}
              <div>
                <label className="block text-xs font-bold text-gray-500 dark:text-white/50 mb-2 uppercase tracking-wide">Year</label>
                <div className="flex gap-2">
                  <input type="number" placeholder="From" className="w-full px-3 py-2 text-sm bg-gray-100 dark:bg-white/10 border border-gray-200 dark:border-white/10 rounded-lg text-gray-700 dark:text-white placeholder-gray-400 dark:placeholder-white/30 focus:outline-none focus:border-purple-500 transition-colors" />
                  <input type="number" placeholder="To" className="w-full px-3 py-2 text-sm bg-gray-100 dark:bg-white/10 border border-gray-200 dark:border-white/10 rounded-lg text-gray-700 dark:text-white placeholder-gray-400 dark:placeholder-white/30 focus:outline-none focus:border-purple-500 transition-colors" />
                </div>
              </div>

              {/* Fuel Type */}
              <div>
                <label className="block text-xs font-bold text-gray-500 dark:text-white/50 mb-2 uppercase tracking-wide">Fuel Type</label>
                <select className="w-full px-3 py-2 text-sm bg-gray-100 dark:bg-white/10 border border-gray-200 dark:border-white/10 rounded-lg text-gray-700 dark:text-white focus:outline-none focus:border-purple-500 transition-colors">
                  <option value="">All types</option>
                  <option>Gasoline</option>
                  <option>Electric</option>
                  <option>Hybrid</option>
                  <option>Diesel</option>
                </select>
              </div>

              <button className="w-full py-2 bg-purple-600 hover:bg-purple-500 text-white rounded-lg text-sm font-bold transition-colors">
                Apply Filters
              </button>
            </div>
          </div>
        </aside>

        {/* Listings Grid */}
        <section className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">Available Vehicles</h2>
              <p className="text-gray-500 dark:text-white/50 text-sm mt-0.5">Browse our inventory with intelligent pricing</p>
            </div>
            <div className="flex items-center gap-2">
              <Car size={16} className="text-purple-500" />
              <span className="text-sm text-gray-500 dark:text-white/50">6 vehicles</span>
            </div>
          </div>

          <Suspense
            fallback={
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="bg-gray-100 dark:bg-white/5 rounded-lg h-72 animate-pulse" />
                ))}
              </div>
            }
          >
            <ListingsContainer />
          </Suspense>
        </section>
      </div>
    </main>
  );
}
