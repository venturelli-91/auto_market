'use client';

import { ListingsContainer } from '@/containers/ListingsContainer';

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-blue-50 to-white py-12 md:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            AutoMarket
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Find Your Perfect Car with Price Intelligence
          </p>
          <p className="text-gray-500 max-w-2xl mx-auto">
            Browse verified vehicle listings with market-based pricing analysis.
            Know if you're getting a great deal, fair price, or paying too much.
          </p>
        </div>
      </section>

      {/* Listings Section */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
            Available Listings
          </h2>
          <p className="text-gray-600 mt-2">
            Browse our latest vehicle listings
          </p>
        </div>
        <ListingsContainer />
      </section>
    </main>
  );
}
