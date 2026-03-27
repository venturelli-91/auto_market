'use client';

import { PriceScore, PriceBadge } from '@automarket/shared-types';
import { useState } from 'react';

interface PriceScoreBadgeProps {
  score: PriceScore;
  variant?: 'compact' | 'extended';
}

export function PriceScoreBadge({ score, variant = 'compact' }: PriceScoreBadgeProps) {
  const [showTooltip, setShowTooltip] = useState(false);

  const getBadgeStyle = () => {
    switch (score.badge) {
      case PriceBadge.GREAT_DEAL:
        return 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30';
      case PriceBadge.FAIR_PRICE:
        return 'bg-amber-500/15 text-amber-600 dark:text-amber-400 border border-amber-500/30';
      case PriceBadge.HIGH_PRICE:
        return 'bg-red-500/15 text-red-600 dark:text-red-400 border border-red-500/30';
      default:
        return 'bg-gray-100 dark:bg-white/10 text-gray-500 dark:text-white/50 border border-gray-200 dark:border-white/10';
    }
  };

  const getBadgeLabel = () => {
    switch (score.badge) {
      case PriceBadge.GREAT_DEAL:
        return 'Great Deal';
      case PriceBadge.FAIR_PRICE:
        return 'Fair Price';
      case PriceBadge.HIGH_PRICE:
        return 'High Price';
      default:
        return 'No Data';
    }
  };

  return (
    <div className="relative">
      <button
        onClick={() => setShowTooltip(!showTooltip)}
        className={`
          px-2.5 py-1 rounded-md text-xs font-bold
          ${getBadgeStyle()}
          cursor-pointer transition-opacity duration-200
          hover:opacity-80 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-1
        `}
        aria-label={`Price rating: ${getBadgeLabel()}`}
      >
        {getBadgeLabel()}
      </button>

      {showTooltip && variant === 'extended' && (
        <div className="
          absolute top-full mt-2 left-0 z-10
          bg-gray-900 dark:bg-black border border-white/10
          text-white rounded-xl p-3
          text-xs w-48 shadow-xl
        ">
          <div className="space-y-1.5">
            <div className="font-semibold text-white mb-2">Market Stats</div>
            <div className="text-gray-300 space-y-1">
              <div className="flex justify-between">
                <span className="text-white/50">P25</span>
                <span>${score.p25.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/50">Median</span>
                <span>${score.marketMedian.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/50">P75</span>
                <span>${score.p75.toLocaleString()}</span>
              </div>
            </div>
            <div className="text-white/40 text-xs border-t border-white/10 pt-2 mt-2">
              {score.sampleSize} vehicles · {Math.round(score.confidence * 100)}% confidence
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
