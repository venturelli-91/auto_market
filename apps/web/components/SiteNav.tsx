import Link from 'next/link';
import { NavLink } from './NavLink';
import { ThemeToggle } from './ThemeToggle';
import { NAV_LINKS } from '../lib/landing-constants';

export function SiteNav() {
  return (
    <nav className="fixed top-4 left-4 right-4 z-50 max-w-7xl mx-auto">
      <div className="bg-white/80 dark:bg-black/70 backdrop-blur-md border border-gray-200/80 dark:border-purple-600/20 rounded-2xl px-5 h-14 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 bg-purple-600 rounded-full" aria-hidden="true" />
          <Link href="/" className="text-xl font-black text-gray-900 dark:text-white">
            DriveMatch
          </Link>
        </div>

        <div className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map(({ label, href }: typeof NAV_LINKS[number]) => (
            <NavLink key={href} href={href}>{label}</NavLink>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <Link
            href="/login"
            className="px-5 py-2 bg-purple-600 hover:bg-purple-500 text-white rounded-xl font-bold text-sm transition-colors duration-200 inline-block"
          >
            Sign In
          </Link>
          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
}
