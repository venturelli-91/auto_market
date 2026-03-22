'use client';

import Link from 'next/link';
import { Car, Gem, BarChart3, Zap, Gauge, Crown, Rocket } from 'lucide-react';
import { NavLink } from '../components/NavLink';
import { FeatureCard } from '../components/FeatureCard';
import { FAQItem } from '../components/FAQItem';

// Navigation links
const NAV_LINKS = [
  { label: 'Marketplace', href: '/marketplace' },
  { label: 'Features', href: '/features' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
] as const;

// Brands
const BRANDS = [
  { icon: Car, name: 'TOYOTA' },
  { icon: Gauge, name: 'BMW' },
  { icon: Zap, name: 'TESLA' },
  { icon: Rocket, name: 'AUDI' },
  { icon: Crown, name: 'MERCEDES' },
  { icon: Car, name: 'PORSCHE' },
] as const;

// Features/Cards
const FEATURE_CARDS = [
  {
    id: 'luxury',
    icon: Gem,
    title: 'Used Exotic Luxury',
    description: 'Premium vehicles at market value',
  },
  {
    id: 'everyday',
    icon: Car,
    title: 'Modern Everyday Cars',
    description: 'Reliable vehicles for daily commute',
  },
  {
    id: 'investment',
    icon: BarChart3,
    title: 'Smart Investment',
    description: 'Data-driven pricing insights',
  },
] as const;

// FAQ
const FAQ_ITEMS = [
  {
    id: 'pricing',
    question: 'How does the pricing intelligence work?',
    answer: 'Our AI analyzes market data to provide fair pricing insights.',
  },
  {
    id: 'data',
    question: 'What data sources do you use?',
    answer: 'We aggregate data from thousands of vehicle listings.',
  },
  {
    id: 'accuracy',
    question: 'How accurate are price predictions?',
    answer: 'Our predictions have 95%+ accuracy on historical data.',
  },
  {
    id: 'security',
    question: 'Is my data secure?',
    answer: 'Yes, we use enterprise-grade encryption for all data.',
  },
] as const;

// Footer
const FOOTER_SECTIONS = [
  {
    title: 'Platform',
    links: [
      { label: 'Browse', href: '/marketplace' },
      { label: 'Sell', href: '/sell' },
      { label: 'About', href: '/about' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'Blog', href: '/blog' },
      { label: 'Careers', href: '/careers' },
      { label: 'Contact', href: '/contact' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { label: 'Privacy', href: '/privacy' },
      { label: 'Terms', href: '/terms' },
      { label: 'Security', href: '/security' },
    ],
  },
] as const;

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-black/80 backdrop-blur-md border-b border-purple-600/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-white rounded-full" aria-hidden="true" />
            <div className="text-xl font-black text-white">DriveMatch</div>
          </div>
          <div className="flex items-center gap-6">
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
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen pt-16 bg-black overflow-hidden">
        {/* Animated background elements - purple/blue glow */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute -bottom-20 -left-40 w-96 h-96 bg-purple-600/15 rounded-full blur-3xl" />
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500/15 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 flex flex-col items-center justify-center min-h-screen">
          <div className="text-center space-y-8 max-w-3xl">
            {/* Main Heading */}
            <h1 className="text-7xl lg:text-8xl font-black text-white leading-tight">
              Drive Your Dream
              <br />
              Car Today
            </h1>

            {/* Hero Car Showcase - centered */}
            <div className="relative h-64 w-full my-8 flex items-center justify-center">
              <div className="absolute w-64 h-64 bg-gradient-radial from-purple-500/30 to-transparent rounded-full blur-3xl" />
              <div className="relative text-6xl" aria-hidden="true">
                🚗
              </div>
            </div>

            {/* Brand Logos */}
            <div className="flex items-center justify-center gap-6 flex-wrap pt-4">
              {BRANDS.map(({ icon: Icon, name }: typeof BRANDS[number]) => (
                <div key={name} className="text-white/60 font-bold flex items-center gap-1.5">
                  <Icon size={18} className="text-purple-400" />
                  <span>{name}</span>
                </div>
              ))}
            </div>

            {/* CTA Button */}
            <div className="pt-4">
              <Link
                href="/marketplace"
                className="inline-block px-10 py-4 bg-purple-600 hover:bg-purple-500 text-white rounded-lg font-bold text-lg transition-all transform hover:scale-105"
              >
                Browse
              </Link>
            </div>

            {/* Description */}
            <p className="text-white/70 text-center max-w-xl mx-auto">
              Discover vehicles with intelligent pricing insights and get fair deals backed by real market data.
            </p>
          </div>
        </div>
      </section>

      {/* Unlock Your Car Section */}
      <section className="bg-gradient-to-br from-purple-950 to-black py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-black text-white mb-4">
              Unlock Your Car
            </h2>
            <p className="text-xl text-white/60 max-w-2xl mx-auto">
              Get the best deal with our intelligence-driven pricing system
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {FEATURE_CARDS.map(({ id, icon, title, description }: typeof FEATURE_CARDS[number]) => (
              <FeatureCard key={id} icon={icon} title={title} description={description} />
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="bg-gradient-to-br from-black to-purple-950 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-black text-white mb-4">Frequently Asked Questions</h2>
          </div>

          <div className="space-y-4 max-w-3xl mx-auto">
            {FAQ_ITEMS.map(({ id, question, answer }: typeof FAQ_ITEMS[number]) => (
              <FAQItem key={id} id={id} question={question} answer={answer} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-br from-purple-900 to-purple-800 py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-black text-white mb-4">Find Your Perfect Car Today</h2>
          <div className="flex items-center justify-center gap-4 pt-8">
            <Link
              href="/marketplace"
              className="px-10 py-4 bg-purple-600 hover:bg-purple-500 text-white rounded-lg font-bold transition-all"
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
      <footer className="bg-black text-white/60 py-12 border-t border-purple-600/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="text-xl font-black text-white mb-4">DriveMatch</div>
              <p className="text-sm">Intelligent vehicle marketplace</p>
            </div>
            {FOOTER_SECTIONS.map(({ title, links }: typeof FOOTER_SECTIONS[number]) => (
              <div key={title}>
                <h4 className="font-bold text-white mb-4">{title}</h4>
                <ul className="space-y-2 text-sm">
                  {links.map(({ label, href }: typeof links[number]) => (
                    <li key={label}>
                      <Link href={href} className="hover:text-white transition-colors">
                        {label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="border-t border-purple-600/20 pt-8 text-center text-sm text-white/40">
            <p>&copy; 2026 DriveMatch. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </main>
  );
}
