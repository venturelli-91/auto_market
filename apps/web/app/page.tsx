'use client';

import Link from 'next/link';
import { Car } from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';
import { NavLink } from '../components/NavLink';
import { FeatureCard } from '../components/FeatureCard';
import { FAQItem } from '../components/FAQItem';
import { ThemeToggle } from '../components/ThemeToggle';
import { NAV_LINKS, BRANDS, FEATURE_CARDS, FAQ_ITEMS, FOOTER_SECTIONS } from '../lib/landing-constants';

export default function Home() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <main className="min-h-screen bg-white dark:bg-black transition-colors duration-300">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-white/90 dark:bg-black/80 backdrop-blur-md border-b border-purple-600/30 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-purple-600 rounded-full" aria-hidden="true" />
            <div className="text-xl font-black text-gray-900 dark:text-white">DriveMatch</div>
          </div>
          <div className="flex items-center gap-4">
            {NAV_LINKS.map(({ label, href }: typeof NAV_LINKS[number]) => (
              <NavLink key={href} href={href}>
                {label}
              </NavLink>
            ))}
            <Link
              href="/login"
              className="px-6 py-2 bg-purple-600 hover:bg-purple-500 text-white rounded-lg font-bold transition-all inline-block"
            >
              Sign In
            </Link>
            <ThemeToggle />
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen pt-16 bg-white dark:bg-black overflow-hidden transition-colors duration-300">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-500/10 dark:bg-purple-500/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute -bottom-20 -left-40 w-96 h-96 bg-purple-600/10 dark:bg-purple-600/15 rounded-full blur-3xl" />
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500/10 dark:bg-blue-500/15 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 flex flex-col items-center justify-center min-h-screen">
          <div className="text-center space-y-8 max-w-3xl">
            <motion.h1
              initial={shouldReduceMotion ? false : { opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: 'easeOut' }}
              className="text-7xl lg:text-8xl font-black text-gray-900 dark:text-white leading-tight"
            >
              Drive Your Dream
              <br />
              Car Today
            </motion.h1>

            <motion.div
              initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
              className="relative h-64 w-full my-8 flex items-center justify-center"
            >
              <div className="absolute w-64 h-64 bg-purple-500/20 rounded-full blur-3xl" />
              <Car size={96} className="relative text-purple-500 dark:text-purple-400" />
            </motion.div>

            {/* Brand Logos */}
            <motion.div
              initial={shouldReduceMotion ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex items-center justify-center gap-6 flex-wrap pt-4"
            >
              {BRANDS.map(({ icon: Icon, name }: typeof BRANDS[number]) => (
                <div key={name} className="text-gray-500 dark:text-white/60 font-bold flex items-center gap-1.5">
                  <Icon size={18} className="text-purple-500 dark:text-purple-400" />
                  <span>{name}</span>
                </div>
              ))}
            </motion.div>

            {/* CTA Button */}
            <motion.div
              initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.55 }}
              className="pt-4"
            >
              <Link
                href="/marketplace"
                className="inline-block px-10 py-4 bg-purple-600 hover:bg-purple-500 text-white rounded-lg font-bold text-lg transition-all transform hover:scale-105"
              >
                Browse
              </Link>
            </motion.div>

            <motion.p
              initial={shouldReduceMotion ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.65 }}
              className="text-gray-600 dark:text-white/70 text-center max-w-xl mx-auto"
            >
              Discover vehicles with intelligent pricing insights and get fair deals backed by real market data.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Unlock Your Car Section */}
      <section className="bg-gray-50 dark:bg-gradient-to-br dark:from-purple-950 dark:to-black py-20 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-black text-gray-900 dark:text-white mb-4">
              Unlock Your Car
            </h2>
            <p className="text-xl text-gray-600 dark:text-white/60 max-w-2xl mx-auto">
              Get the best deal with our intelligence-driven pricing system
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {FEATURE_CARDS.map(({ id, icon, title, description }: typeof FEATURE_CARDS[number], index) => (
              <FeatureCard key={id} icon={icon} title={title} description={description} delay={index * 0.15} />
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="bg-white dark:bg-gradient-to-br dark:from-black dark:to-purple-950 py-20 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-black text-gray-900 dark:text-white mb-4">Frequently Asked Questions</h2>
          </div>

          <div className="space-y-4 max-w-3xl mx-auto">
            {FAQ_ITEMS.map(({ id, question, answer }: typeof FAQ_ITEMS[number]) => (
              <FAQItem key={id} id={id} question={question} answer={answer} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-purple-600 dark:bg-gradient-to-br dark:from-purple-900 dark:to-purple-800 py-20 transition-colors duration-300">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-black text-white mb-4">Find Your Perfect Car Today</h2>
          <div className="flex items-center justify-center gap-4 pt-8">
            <Link
              href="/marketplace"
              className="px-10 py-4 bg-white text-purple-600 hover:bg-gray-100 rounded-lg font-bold transition-all"
            >
              Browse
            </Link>
            <button className="px-10 py-4 border-2 border-white text-white rounded-lg font-bold hover:bg-white/10 transition-all">
              Learn More
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-100 dark:bg-black text-gray-600 dark:text-white/60 py-12 border-t border-purple-600/20 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="text-xl font-black text-gray-900 dark:text-white mb-4">DriveMatch</div>
              <p className="text-sm">Intelligent vehicle marketplace</p>
            </div>
            {FOOTER_SECTIONS.map(({ title, links }: typeof FOOTER_SECTIONS[number]) => (
              <div key={title}>
                <h4 className="font-bold text-gray-900 dark:text-white mb-4">{title}</h4>
                <ul className="space-y-2 text-sm">
                  {links.map(({ label, href }: typeof links[number]) => (
                    <li key={label}>
                      <Link href={href} className="hover:text-purple-600 dark:hover:text-white transition-colors">
                        {label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="border-t border-purple-600/20 pt-8 text-center text-sm text-gray-400 dark:text-white/40">
            <p>&copy; 2026 DriveMatch. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </main>
  );
}
