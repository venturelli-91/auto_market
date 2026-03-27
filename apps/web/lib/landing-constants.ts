import { Car, Zap, Gauge, Crown, Rocket, Gem, BarChart3 } from 'lucide-react';

// Navigation
export const NAV_LINKS = [
  { label: 'Marketplace', href: '/marketplace' },
  { label: 'Features', href: '/features' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
] as const;

// Brands
export const BRANDS = [
  { icon: Car, name: 'TOYOTA' },
  { icon: Gauge, name: 'BMW' },
  { icon: Zap, name: 'TESLA' },
  { icon: Rocket, name: 'AUDI' },
  { icon: Crown, name: 'MERCEDES' },
  { icon: Car, name: 'PORSCHE' },
] as const;

// Features/Cards
export const FEATURE_CARDS = [
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
export const FAQ_ITEMS = [
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
export const FOOTER_SECTIONS = [
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
      { label: 'Newsletter', href: '/newsletter' },
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
