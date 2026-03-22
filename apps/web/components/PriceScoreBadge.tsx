'use client';

import { PriceScore, PriceBadge } from '@automarket/shared-types';
import { useState } from 'react';

interface PriceScoreBadgeProps {
  score: PriceScore;
  variant?: 'compact' | 'extended';
}

/**
 * PriceScoreBadge - Display pricing intelligence badge
 *
 * Design System: AutoMarket Master
 * Displays: Great Deal (Green) / Fair Price (Amber) / High Price (Red)
 * Colors: Success (#10B981), Warning (#F59E0B), Danger (#EF4444)
 * Typography: Caption (11px bold) + Body Small (12px medium) for subtext
 * Spacing: padding-sm/md (8px 12px)
 *
 * Variants:
 * - compact: Just badge + label (card footer) — default
 * - extended: Badge + market stats (detail page)
 */
export function PriceScoreBadge({
  score,
  variant = 'compact',
}: PriceScoreBadgeProps) {
  const [showTooltip, setShowTooltip] = useState(false);

  const getBadgeColor = () => {
    switch (score.badge) {
      case PriceBadge.GREAT_DEAL:
        return 'bg-green-600 text-white';
      case PriceBadge.FAIR_PRICE:
        return 'bg-amber-500 text-white';
      case PriceBadge.HIGH_PRICE:
        return 'bg-red-500 text-white';
      default:
        return 'bg-gray-300 text-gray-900';
    }
  };

  const getBadgeLabel = () => {
    switch (score.badge) {
      case PriceBadge.GREAT_DEAL:
        return '🏆 Great Deal';
      case PriceBadge.FAIR_PRICE:
        return '💡 Fair Price';
      case PriceBadge.HIGH_PRICE:
        return '⚠️ High Price';
      default:
        return 'No Price Data';
    }
  };

  return (
    <div className="relative">
      {/* Badge Button */}
      <button
        onClick={() => setShowTooltip(!showTooltip)}
        className={`
          px-3 py-1 rounded text-xs font-bold
          ${getBadgeColor()}
          cursor-pointer transition-opacity duration-200
          hover:opacity-90 focus:outline-2 focus:outline-offset-2
        `}
        aria-label={`${getBadgeLabel()} - ${score.badge}`}
      >
        {getBadgeLabel()}
      </button>

      {/* Tooltip: Market Stats */}
      {showTooltip && variant === 'extended' && (
        <div
          className="
            absolute top-full mt-2 left-0 z-10
            bg-gray-900 text-white rounded-lg p-3
            text-xs w-48 shadow-lg
            after:content-[''] after:absolute after:-top-1 after:left-3
            after:w-2 after:h-2 after:bg-gray-900 after:rotate-45
          "
        >
          <div className="space-y-1">
            <div className="font-semibold text-white">Market Stats</div>
            <div className="text-gray-300">
              <div>P25: ${score.p25.toLocaleString()}</div>
              <div>Median: ${score.marketMedian.toLocaleString()}</div>
              <div>P75: ${score.p75.toLocaleString()}</div>
            </div>
            <div className="text-gray-400 text-xs border-t border-gray-700 pt-1 mt-2">
              Based on {score.sampleSize} comparable vehicles
              <br />
              Confidence: {Math.round(score.confidence * 100)}%
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
