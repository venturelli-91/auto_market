'use client';

import { Listing, Vehicle } from '@automarket/shared-types';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useReducedMotion } from 'framer-motion';
import { PriceScoreBadge } from './PriceScoreBadge';

interface VehicleCardProps {
  listing: Listing;
  vehicle: Vehicle;
}

export function VehicleCard({ listing, vehicle }: VehicleCardProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
    >
      <Link
        href={`/listings/${listing.id}`}
        className="
          group block bg-white dark:bg-white/5
          rounded-xl overflow-hidden
          border border-gray-200 dark:border-white/10
          hover:border-purple-300 dark:hover:border-purple-600/50
          hover:shadow-lg dark:hover:shadow-purple-900/20
          transition-all duration-200
          cursor-pointer
        "
        aria-label={`View ${vehicle.year} ${vehicle.make} ${vehicle.model}`}
      >
        {/* Image */}
        <div
          className="relative w-full overflow-hidden bg-gray-100 dark:bg-white/5"
          style={{ aspectRatio: '16 / 9' }}
        >
          {vehicle.images && vehicle.images.length > 0 ? (
            <Image
              src={vehicle.images[0].url}
              alt={`${vehicle.year} ${vehicle.make} ${vehicle.model}`}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
              priority={false}
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 dark:from-white/5 dark:to-white/10 flex items-center justify-center">
              <span className="text-gray-400 dark:text-white/30 text-sm">No image</span>
            </div>
          )}

          {/* Action Buttons */}
          <div className="absolute top-3 right-3 flex gap-2">
            <button
              className="bg-white dark:bg-black/60 backdrop-blur-sm rounded-lg p-2 hover:bg-gray-100 dark:hover:bg-white/10 transition-colors shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 cursor-pointer"
              aria-label="Compare"
              onClick={(e) => e.preventDefault()}
            >
              <svg className="w-4 h-4 text-gray-700 dark:text-white/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </button>
            <button
              className="bg-white dark:bg-black/60 backdrop-blur-sm rounded-lg p-2 hover:bg-gray-100 dark:hover:bg-white/10 transition-colors shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 cursor-pointer"
              aria-label="Add to favorites"
              onClick={(e) => e.preventDefault()}
            >
              <svg className="w-4 h-4 text-gray-700 dark:text-white/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-4 space-y-3">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white leading-snug">
            {vehicle.year} {vehicle.make} {vehicle.model}
          </h3>

          <p className="text-sm text-gray-500 dark:text-white/50">
            {vehicle.mileage?.toLocaleString()} miles · {vehicle.color}
          </p>

          <div className="flex items-center justify-between pt-1">
            <div className="text-2xl font-bold text-gray-900 dark:text-white">
              ${listing.price.toLocaleString()}
            </div>
            {listing.priceScore && <PriceScoreBadge score={listing.priceScore} />}
          </div>

          <button
            className="
              w-full bg-purple-600 hover:bg-purple-500 active:bg-purple-700
              text-white py-2.5 rounded-lg
              transition-colors duration-200
              cursor-pointer font-semibold text-sm
              focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 dark:focus:ring-offset-black
            "
            onClick={(e) => {
              e.preventDefault();
              window.location.href = `/listings/${listing.id}`;
            }}
          >
            View Details
          </button>
        </div>
      </Link>
    </motion.div>
  );
}
