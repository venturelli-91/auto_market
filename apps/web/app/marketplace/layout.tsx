import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Marketplace — DriveMatch',
  description: 'Browse thousands of vehicles with AI-powered pricing intelligence. Find great deals, fair prices, and more.',
};

export default function MarketplaceLayout({ children }: { children: React.ReactNode }) {
  return children;
}
