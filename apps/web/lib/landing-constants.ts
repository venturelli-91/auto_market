// Navigation
export const NAV_LINKS = [
  { label: 'Marketplace', href: '/marketplace' },
  { label: 'Features', href: '/features' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
] as const;

// Brands
export const BRANDS = [
  { emoji: '🏎️', name: 'TOYOTA' },
  { emoji: '⚫', name: 'BMW' },
  { emoji: '⚡', name: 'TESLA' },
  { emoji: '🎯', name: 'AUDI' },
  { emoji: '⭐', name: 'MERCEDES' },
  { emoji: '🏁', name: 'PORSCHE' },
] as const;

// Features/Cards
export const FEATURE_CARDS = [
  {
    id: 'luxury',
    emoji: '🚗',
    title: 'Used Exotic Luxury',
    description: 'Premium vehicles at market value',
  },
  {
    id: 'everyday',
    emoji: '🏎️',
    title: 'Modern Everyday Cars',
    description: 'Reliable vehicles for daily commute',
  },
  {
    id: 'investment',
    emoji: '🎯',
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

// Tailwind class constants
export const CLASSES = {
  navLink: 'text-white hover:text-purple-400 transition-colors font-medium text-sm',
  featureCard:
    'bg-gradient-to-br from-purple-900/40 to-black/40 border border-purple-600/30 rounded-xl p-6 hover:border-purple-500/60 transition-all',
  featureCardImage:
    'relative h-48 bg-gradient-to-br from-purple-800/20 to-black/20 rounded-lg mb-4 flex items-center justify-center',
  faqItem:
    'bg-purple-900/30 border border-purple-600/30 rounded-lg p-4 hover:border-purple-500/60 transition-all',
  footerLink: 'hover:text-white transition-colors',
} as const;
