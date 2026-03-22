'use client';

import { Listing, Vehicle, PriceScore } from '@automarket/shared-types';
import Image from 'next/image';
import Link from 'next/link';
import { PriceScoreBadge } from './PriceScoreBadge';

interface VehicleCardProps {
  listing: Listing;
  vehicle: Vehicle;
}

/**
 * VehicleCard - Automotive product showcase
 *
 * Design System: AutoMarket Master
 * Applies: Product showcase pattern + Pricing intelligence
 * Colors: Primary Blue (#2563EB), Success/Warning/Danger for badges
 * Typography: Heading 3 for title, Body Small for metadata
 * Spacing: padding-md (16px), gap-sm (12px)
 *
 * Scalable for:
 * - Rental marketplace (add date picker)
 * - B2B fleet management (add bulk actions)
 * - Insurance quotes (add coverage info)
 */
export function VehicleCard({ listing, vehicle }: VehicleCardProps) {
  return (
    <Link
      href={`/listings/${listing.id}`}
      className="
        block bg-white rounded-lg shadow-md overflow-hidden
        border border-gray-200
        hover:shadow-lg transition-shadow duration-200
        cursor-pointer
      "
      aria-label={`View ${vehicle.year} ${vehicle.make} ${vehicle.model}`}
    >
      {/* Image: From MASTER: aspect-ratio 16/9, hover scale 1.05 */}
      <div
        className="relative w-full overflow-hidden bg-gray-100"
        style={{ aspectRatio: '16 / 9' }}
      >
        {vehicle.images && vehicle.images.length > 0 ? (
          <Image
            src={vehicle.images[0].url}
            alt={`${vehicle.year} ${vehicle.make} ${vehicle.model}`}
            fill
            className="object-cover hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            priority={false}
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
            <span className="text-gray-400">No image</span>
          </div>
        )}

        {/* Action Buttons - Top right */}
        <div className="absolute top-3 right-3 flex gap-2">
          <button
            className="bg-white rounded-lg p-2 hover:bg-gray-100 transition-colors shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label="Compare"
          >
            <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
          </button>
          <button
            className="bg-white rounded-lg p-2 hover:bg-gray-100 transition-colors shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label="Add to favorites"
          >
            <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </button>
        </div>
      </div>

      {/* Content: From MASTER: spacing-md, gap-sm */}
      <div className="p-4 space-y-3">
        {/* Title: From MASTER: Heading 3, font-semibold */}
        <h3 className="text-lg font-semibold text-gray-900">
          {vehicle.year} {vehicle.make} {vehicle.model}
        </h3>

        {/* Metadata: From MASTER: Body Small, gray secondary text */}
        <p className="text-sm text-gray-600">
          {vehicle.mileage?.toLocaleString()} miles • {vehicle.color}
        </p>

        {/* Price & Badge: From MASTER: Display 2 (36px bold) + PriceScore */}
        <div className="flex items-center justify-between pt-2">
          <div className="text-2xl font-bold text-gray-900">
            ${listing.price.toLocaleString()}
          </div>
          {listing.priceScore && <PriceScoreBadge score={listing.priceScore} />}
        </div>

        {/* CTA: From MASTER: Primary Blue, hover state, smooth transition */}
        <button
          className="
            w-full bg-blue-600 text-white py-2 rounded
            hover:bg-blue-700 transition-colors duration-200
            cursor-pointer font-semibold
            focus:outline-2 focus:outline-offset-2 focus:outline-blue-600
            active:bg-blue-800
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
  );
}
