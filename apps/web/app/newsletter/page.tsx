'use client';

import { useState } from 'react';
import { TrendingUp, Bell, Tag, CheckCircle, Users } from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';
import { SiteNav } from '../../components/SiteNav';
import { SiteFooter } from '../../components/SiteFooter';

const BENEFITS = [
  {
    icon: TrendingUp,
    title: 'Weekly Market Trends',
    description:
      'Curated analysis of price movements across the most traded segments — delivered every Tuesday.',
  },
  {
    icon: Bell,
    title: 'Price Drop Alerts',
    description:
      'Be the first to know when vehicles in your watchlist hit your target price range.',
  },
  {
    icon: Tag,
    title: 'Exclusive Deals',
    description:
      'Early access to new listings flagged as "Great Deal" before they go public on the marketplace.',
  },
] as const;

const STATS = [
  { value: '12,000+', label: 'Subscribers' },
  { value: '95%', label: 'Open Rate' },
  { value: 'Weekly', label: 'Frequency' },
] as const;

type FormState = {
  name: string;
  email: string;
};

export default function NewsletterPage() {
  const shouldReduceMotion = useReducedMotion();

  const [form, setForm] = useState<FormState>({ name: '', email: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [subscribed, setSubscribed] = useState(false);

  const set =
    (field: keyof FormState) =>
    (e: React.ChangeEvent<HTMLInputElement>) =>
      setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'}/api/newsletter`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(form),
        }
      );

      if (!res.ok) {
        setError('Failed to subscribe. Please try again.');
        return;
      }

      setSubscribed(true);
    } catch {
      setError('Unable to connect. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  const inputClass =
    'w-full px-4 py-2.5 bg-gray-100 dark:bg-white/10 border border-gray-300 dark:border-white/20 rounded-xl text-sm text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-white/40 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all';

  return (
    <main className="min-h-screen bg-white dark:bg-black transition-colors duration-300">
      <SiteNav />

      <div className="pt-28 pb-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Page header */}
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="text-center mb-16"
          >
            <h1 className="text-5xl lg:text-6xl font-black text-gray-900 dark:text-white mb-4 tracking-tight">
              Stay Ahead of the{' '}
              <span className="text-purple-600 dark:text-purple-400">Market</span>
            </h1>
            <p className="text-lg text-gray-500 dark:text-white/60 max-w-xl mx-auto">
              Weekly vehicle insights, price alerts, and exclusive deals — delivered straight to
              your inbox. No spam, unsubscribe anytime.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">

            {/* Left — benefits + stats */}
            <motion.aside
              initial={shouldReduceMotion ? false : { opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1, ease: 'easeOut' }}
              className="lg:col-span-2 space-y-4"
            >
              {/* Benefit cards */}
              {BENEFITS.map(({ icon: Icon, title, description }, i) => (
                <motion.div
                  key={title}
                  initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.15 + i * 0.1, ease: 'easeOut' }}
                  className="flex items-start gap-4 p-5 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-2xl"
                >
                  <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900/50 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Icon size={18} className="text-purple-600 dark:text-purple-400" aria-hidden="true" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-gray-900 dark:text-white mb-0.5">{title}</p>
                    <p className="text-xs text-gray-500 dark:text-white/50 leading-relaxed">
                      {description}
                    </p>
                  </div>
                </motion.div>
              ))}

              {/* Social proof */}
              <motion.div
                initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.45, ease: 'easeOut' }}
                className="p-5 bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-600/30 rounded-2xl"
              >
                <div className="flex items-center gap-2 mb-3">
                  <Users size={16} className="text-purple-600 dark:text-purple-400" aria-hidden="true" />
                  <span className="text-sm font-bold text-gray-900 dark:text-white">
                    Trusted by Car Buyers
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-3">
                  {STATS.map(({ value, label }) => (
                    <div key={label} className="text-center">
                      <p className="text-base font-black text-purple-600 dark:text-purple-400">
                        {value}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-white/50">{label}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            </motion.aside>

            {/* Right — subscription form */}
            <motion.div
              initial={shouldReduceMotion ? false : { opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.15, ease: 'easeOut' }}
              className="lg:col-span-3"
            >
              <div className="bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-2xl p-8">

                {subscribed ? (
                  /* Success state */
                  <motion.div
                    initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4 }}
                    className="flex flex-col items-center justify-center py-12 text-center"
                  >
                    <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center mb-5">
                      <CheckCircle size={32} className="text-emerald-600 dark:text-emerald-400" aria-hidden="true" />
                    </div>
                    <h2 className="text-2xl font-black text-gray-900 dark:text-white mb-2">
                      You're In!
                    </h2>
                    <p className="text-gray-500 dark:text-white/60 text-sm max-w-xs">
                      Welcome to the DriveMatch newsletter. Your first edition arrives next Tuesday.
                    </p>
                    <button
                      onClick={() => {
                        setSubscribed(false);
                        setForm({ name: '', email: '' });
                      }}
                      className="mt-8 px-6 py-2.5 border border-gray-200 dark:border-white/20 rounded-xl text-sm font-bold text-gray-700 dark:text-white hover:border-purple-400 dark:hover:border-purple-500 transition-colors cursor-pointer"
                    >
                      Subscribe another email
                    </button>
                  </motion.div>
                ) : (
                  /* Form */
                  <>
                    <div className="mb-6">
                      <h2 className="text-xl font-black text-gray-900 dark:text-white mb-1">
                        Join the Newsletter
                      </h2>
                      <p className="text-sm text-gray-500 dark:text-white/50">
                        Free forever. One email per week. Unsubscribe anytime.
                      </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                      {/* Name */}
                      <div>
                        <label
                          htmlFor="newsletter-name"
                          className="block text-xs font-bold text-gray-700 dark:text-white/80 mb-1.5"
                        >
                          First Name{' '}
                          <span className="font-normal text-gray-400 dark:text-white/40">
                            (optional)
                          </span>
                        </label>
                        <input
                          id="newsletter-name"
                          type="text"
                          value={form.name}
                          onChange={set('name')}
                          placeholder="Jane"
                          autoComplete="given-name"
                          className={inputClass}
                        />
                      </div>

                      {/* Email */}
                      <div>
                        <label
                          htmlFor="newsletter-email"
                          className="block text-xs font-bold text-gray-700 dark:text-white/80 mb-1.5"
                        >
                          Email Address{' '}
                          <span className="text-red-500" aria-hidden="true">
                            *
                          </span>
                        </label>
                        <input
                          id="newsletter-email"
                          type="email"
                          value={form.email}
                          onChange={set('email')}
                          placeholder="your@email.com"
                          autoComplete="email"
                          required
                          className={inputClass}
                        />
                      </div>

                      {/* What you'll get */}
                      <div className="p-4 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl space-y-2">
                        <p className="text-xs font-bold text-gray-700 dark:text-white/80 uppercase tracking-wide">
                          What's included
                        </p>
                        <ul className="space-y-1.5 text-xs text-gray-500 dark:text-white/50">
                          <li className="flex items-center gap-2">
                            <span className="w-1.5 h-1.5 bg-purple-500 rounded-full flex-shrink-0" aria-hidden="true" />
                            Top market movers and price trend analysis
                          </li>
                          <li className="flex items-center gap-2">
                            <span className="w-1.5 h-1.5 bg-purple-500 rounded-full flex-shrink-0" aria-hidden="true" />
                            Curated "Great Deal" picks from our pricing engine
                          </li>
                          <li className="flex items-center gap-2">
                            <span className="w-1.5 h-1.5 bg-purple-500 rounded-full flex-shrink-0" aria-hidden="true" />
                            Buying tips from automotive market experts
                          </li>
                        </ul>
                      </div>

                      {/* Error */}
                      {error && (
                        <p role="alert" className="text-red-500 dark:text-red-400 text-xs">
                          {error}
                        </p>
                      )}

                      {/* Submit */}
                      <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full px-4 py-3 bg-gradient-to-r from-purple-600 to-purple-500 hover:from-purple-500 hover:to-purple-400 text-white rounded-xl font-bold text-sm transition-all disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                      >
                        {isLoading ? 'Subscribing...' : 'Subscribe for Free'}
                      </button>

                      <p className="text-xs text-center text-gray-400 dark:text-white/40">
                        No spam. Unsubscribe with one click at any time.
                      </p>
                    </form>
                  </>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      <SiteFooter />
    </main>
  );
}
