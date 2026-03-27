'use client';

import Link from 'next/link';
import { Car } from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';
import { FeatureCard } from '../components/FeatureCard';
import { FAQItem } from '../components/FAQItem';
import { SiteNav } from '../components/SiteNav';
import { SiteFooter } from '../components/SiteFooter';
import { BRANDS, FEATURE_CARDS, FAQ_ITEMS } from '../lib/landing-constants';

export default function Home() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <main className="min-h-screen bg-white dark:bg-black transition-colors duration-300">
      <SiteNav />

      {/* Hero Section */}
      <section className="relative min-h-screen pt-24 bg-white dark:bg-black overflow-hidden transition-colors duration-300">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-500/8 dark:bg-purple-500/15 rounded-full blur-3xl" />
          <div className="absolute -bottom-20 -left-40 w-96 h-96 bg-purple-600/8 dark:bg-purple-600/12 rounded-full blur-3xl" />
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500/8 dark:bg-blue-500/12 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center min-h-[calc(100vh-96px)]">
          <div className="text-center space-y-8 max-w-3xl">
            <motion.h1
              initial={shouldReduceMotion ? false : { opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: 'easeOut' }}
              className="text-6xl lg:text-8xl font-black text-gray-900 dark:text-white leading-[1.05] tracking-tight"
            >
              Drive Your Dream
              <br />
              <span className="text-purple-600 dark:text-purple-400">Car Today</span>
            </motion.h1>

            <motion.div
              initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
              className="relative h-48 w-full flex items-center justify-center"
            >
              <div className="absolute w-48 h-48 bg-purple-500/20 dark:bg-purple-500/30 rounded-full blur-3xl" />
              <Car size={88} className="relative text-purple-500 dark:text-purple-400" aria-hidden="true" />
            </motion.div>

            {/* Brand logos */}
            <motion.div
              initial={shouldReduceMotion ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex items-center justify-center gap-6 flex-wrap"
            >
              {BRANDS.map(({ icon: Icon, name }: typeof BRANDS[number]) => (
                <div key={name} className="flex items-center gap-1.5 text-gray-400 dark:text-white/40 font-bold text-sm tracking-wider">
                  <Icon size={16} className="text-purple-400 dark:text-purple-500" aria-hidden="true" />
                  <span>{name}</span>
                </div>
              ))}
            </motion.div>

            {/* CTA */}
            <motion.div
              initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.55 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2"
            >
              <Link
                href="/marketplace"
                className="px-10 py-4 bg-purple-600 hover:bg-purple-500 text-white rounded-xl font-bold text-lg transition-colors duration-200 inline-block"
              >
                Browse Vehicles
              </Link>
              <Link
                href="#features"
                className="px-10 py-4 border border-gray-300 dark:border-white/20 text-gray-700 dark:text-white/80 hover:border-purple-400 dark:hover:border-purple-500 rounded-xl font-bold text-lg transition-colors duration-200 inline-block"
              >
                Learn More
              </Link>
            </motion.div>

            <motion.p
              initial={shouldReduceMotion ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.65 }}
              className="text-gray-500 dark:text-white/50 text-center max-w-xl mx-auto text-sm leading-relaxed"
            >
              Discover vehicles with intelligent pricing insights. Get fair deals backed by real market data.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="bg-gray-50 dark:bg-gradient-to-br dark:from-purple-950 dark:to-black py-24 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <motion.h2
              initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-4xl lg:text-5xl font-black text-gray-900 dark:text-white mb-4"
            >
              Unlock Your Car
            </motion.h2>
            <motion.p
              initial={shouldReduceMotion ? false : { opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-lg text-gray-500 dark:text-white/60 max-w-2xl mx-auto"
            >
              Get the best deal with our intelligence-driven pricing system
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {FEATURE_CARDS.map(({ id, icon, title, description }: typeof FEATURE_CARDS[number], index) => (
              <FeatureCard key={id} icon={icon} title={title} description={description} delay={index * 0.15} />
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="bg-white dark:bg-gradient-to-br dark:from-black dark:to-purple-950 py-24 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <motion.h2
              initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-4xl font-black text-gray-900 dark:text-white"
            >
              Frequently Asked Questions
            </motion.h2>
          </div>

          <div className="space-y-3 max-w-3xl mx-auto">
            {FAQ_ITEMS.map(({ id, question, answer }: typeof FAQ_ITEMS[number]) => (
              <FAQItem key={id} id={id} question={question} answer={answer} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-purple-600 dark:bg-gradient-to-br dark:from-purple-900 dark:to-purple-800 py-20 transition-colors duration-300">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h2
            initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-4xl font-black text-white mb-4"
          >
            Find Your Perfect Car Today
          </motion.h2>
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex items-center justify-center gap-4 pt-8"
          >
            <Link
              href="/marketplace"
              className="px-10 py-4 bg-white text-purple-600 hover:bg-gray-100 rounded-xl font-bold transition-colors duration-200 inline-block"
            >
              Browse Vehicles
            </Link>
            <Link
              href="#features"
              className="px-10 py-4 border-2 border-white text-white rounded-xl font-bold hover:bg-white/10 transition-colors duration-200 inline-block"
            >
              Learn More
            </Link>
          </motion.div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
