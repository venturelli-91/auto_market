import Link from 'next/link';
import { ThemeToggle } from '../../components/ThemeToggle';
import { MarketplaceClient } from '../../containers/MarketplaceClient';

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

      <MarketplaceClient />
    </main>
  );
}
