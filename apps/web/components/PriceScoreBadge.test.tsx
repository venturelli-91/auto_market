import { render, screen, fireEvent } from '@testing-library/react';
import { PriceScoreBadge } from './PriceScoreBadge';
import { PriceBadge, PriceScore } from '@automarket/shared-types';

const mockPriceScore: PriceScore = {
  badge: PriceBadge.GREAT_DEAL,
  confidence: 0.92,
  marketMedian: 25000,
  p25: 20000,
  p75: 30000,
  sampleSize: 1250,
};

describe('PriceScoreBadge', () => {
  describe('Great Deal badge', () => {
    it('renders with correct styling', () => {
      render(<PriceScoreBadge score={mockPriceScore} />);
      const badge = screen.getByRole('button', { name: /Great Deal/i });
      expect(badge).toHaveClass('bg-green-600');
    });

    it('displays correct label', () => {
      render(<PriceScoreBadge score={mockPriceScore} />);
      expect(screen.getByText(/🏆 Great Deal/i)).toBeInTheDocument();
    });
  });

  describe('Fair Price badge', () => {
    it('renders with correct styling', () => {
      const fairPrice = { ...mockPriceScore, badge: PriceBadge.FAIR_PRICE };
      render(<PriceScoreBadge score={fairPrice} />);
      const badge = screen.getByRole('button', { name: /Fair Price/i });
      expect(badge).toHaveClass('bg-amber-500');
    });

    it('displays correct label', () => {
      const fairPrice = { ...mockPriceScore, badge: PriceBadge.FAIR_PRICE };
      render(<PriceScoreBadge score={fairPrice} />);
      expect(screen.getByText(/💡 Fair Price/i)).toBeInTheDocument();
    });
  });

  describe('High Price badge', () => {
    it('renders with correct styling', () => {
      const highPrice = { ...mockPriceScore, badge: PriceBadge.HIGH_PRICE };
      render(<PriceScoreBadge score={highPrice} />);
      const badge = screen.getByRole('button', { name: /High Price/i });
      expect(badge).toHaveClass('bg-red-500');
    });

    it('displays correct label', () => {
      const highPrice = { ...mockPriceScore, badge: PriceBadge.HIGH_PRICE };
      render(<PriceScoreBadge score={highPrice} />);
      expect(screen.getByText(/⚠️ High Price/i)).toBeInTheDocument();
    });
  });

  describe('Tooltip behavior (extended variant)', () => {
    it('does not show tooltip by default', () => {
      render(
        <PriceScoreBadge score={mockPriceScore} variant="extended" />
      );
      expect(screen.queryByText('Market Stats')).not.toBeInTheDocument();
    });

    it('shows tooltip when badge is clicked', () => {
      render(
        <PriceScoreBadge score={mockPriceScore} variant="extended" />
      );
      const badge = screen.getByRole('button');
      fireEvent.click(badge);
      expect(screen.getByText('Market Stats')).toBeInTheDocument();
    });

    it('displays market statistics correctly', () => {
      render(
        <PriceScoreBadge score={mockPriceScore} variant="extended" />
      );
      const badge = screen.getByRole('button');
      fireEvent.click(badge);

      expect(screen.getByText('P25: $20,000')).toBeInTheDocument();
      expect(screen.getByText('Median: $25,000')).toBeInTheDocument();
      expect(screen.getByText('P75: $30,000')).toBeInTheDocument();
    });

    it('displays sample size and confidence', () => {
      render(
        <PriceScoreBadge score={mockPriceScore} variant="extended" />
      );
      const badge = screen.getByRole('button');
      fireEvent.click(badge);

      expect(
        screen.getByText(/1250 comparable vehicles/i)
      ).toBeInTheDocument();
      expect(screen.getByText(/Confidence: 92%/i)).toBeInTheDocument();
    });

    it('toggles tooltip on repeated clicks', () => {
      render(
        <PriceScoreBadge score={mockPriceScore} variant="extended" />
      );
      const badge = screen.getByRole('button');

      // First click: open
      fireEvent.click(badge);
      expect(screen.getByText('Market Stats')).toBeInTheDocument();

      // Second click: close
      fireEvent.click(badge);
      expect(screen.queryByText('Market Stats')).not.toBeInTheDocument();
    });
  });

  describe('Compact variant', () => {
    it('does not show tooltip when clicked', () => {
      render(
        <PriceScoreBadge score={mockPriceScore} variant="compact" />
      );
      const badge = screen.getByRole('button');
      fireEvent.click(badge);
      expect(screen.queryByText('Market Stats')).not.toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('has correct aria-label', () => {
      render(<PriceScoreBadge score={mockPriceScore} />);
      const badge = screen.getByRole('button');
      expect(badge).toHaveAttribute('aria-label', 'Great Deal - great_deal');
    });

    it('is keyboard accessible', () => {
      render(
        <PriceScoreBadge score={mockPriceScore} variant="extended" />
      );
      const badge = screen.getByRole('button');

      // Focus and press Enter
      badge.focus();
      expect(badge).toHaveFocus();
    });
  });

  describe('Price formatting', () => {
    it('formats prices with comma separators', () => {
      const largePrice = {
        ...mockPriceScore,
        p25: 100000,
        p75: 150000,
      };
      render(
        <PriceScoreBadge score={largePrice} variant="extended" />
      );
      const badge = screen.getByRole('button');
      fireEvent.click(badge);

      expect(screen.getByText('P25: $100,000')).toBeInTheDocument();
      expect(screen.getByText('P75: $150,000')).toBeInTheDocument();
    });
  });
});
