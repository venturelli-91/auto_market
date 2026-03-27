import Link from 'next/link';
import { FOOTER_SECTIONS } from '../lib/landing-constants';

export function SiteFooter() {
  return (
    <footer className="bg-gray-100 dark:bg-black text-gray-600 dark:text-white/60 py-14 border-t border-gray-200 dark:border-purple-600/20 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-4 h-4 bg-purple-600 rounded-full" aria-hidden="true" />
              <span className="text-lg font-black text-gray-900 dark:text-white">DriveMatch</span>
            </div>
            <p className="text-sm leading-relaxed">
              Intelligent vehicle marketplace powered by real market data.
            </p>
          </div>

          {FOOTER_SECTIONS.map(({ title, links }: typeof FOOTER_SECTIONS[number]) => (
            <div key={title}>
              <h4 className="font-bold text-gray-900 dark:text-white mb-4 text-sm uppercase tracking-wide">
                {title}
              </h4>
              <ul className="space-y-2.5 text-sm">
                {links.map(({ label, href }: typeof links[number]) => (
                  <li key={label}>
                    <Link
                      href={href}
                      className="hover:text-purple-600 dark:hover:text-white transition-colors duration-200"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-gray-200 dark:border-white/10 pt-8 text-center text-sm text-gray-400 dark:text-white/40">
          <p>&copy; 2026 DriveMatch. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
