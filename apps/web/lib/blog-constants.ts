import { TrendingUp, BookOpen, Newspaper, DollarSign } from 'lucide-react';

export const BLOG_CATEGORIES = [
  { id: 'all', label: 'All Posts' },
  { id: 'pricing', label: 'Pricing' },
  { id: 'buying-guide', label: 'Buying Guide' },
  { id: 'market-trends', label: 'Market Trends' },
  { id: 'news', label: 'News' },
] as const;

export type BlogCategory = 'pricing' | 'buying-guide' | 'market-trends' | 'news';

export const CATEGORY_ICONS: Record<BlogCategory, React.ElementType> = {
  pricing: DollarSign,
  'buying-guide': BookOpen,
  'market-trends': TrendingUp,
  news: Newspaper,
};

export const CATEGORY_STYLES: Record<BlogCategory, { bg: string; text: string; dot: string }> = {
  pricing: {
    bg: 'bg-purple-100 dark:bg-purple-900/40',
    text: 'text-purple-700 dark:text-purple-300',
    dot: 'bg-purple-500',
  },
  'buying-guide': {
    bg: 'bg-blue-100 dark:bg-blue-900/40',
    text: 'text-blue-700 dark:text-blue-300',
    dot: 'bg-blue-500',
  },
  'market-trends': {
    bg: 'bg-emerald-100 dark:bg-emerald-900/40',
    text: 'text-emerald-700 dark:text-emerald-300',
    dot: 'bg-emerald-500',
  },
  news: {
    bg: 'bg-amber-100 dark:bg-amber-900/40',
    text: 'text-amber-700 dark:text-amber-300',
    dot: 'bg-amber-500',
  },
};

export type BlogPost = {
  id: string;
  slug: string;
  category: BlogCategory;
  title: string;
  excerpt: string;
  author: string;
  date: string;
  readTime: string;
  featured: boolean;
};

export const BLOG_POSTS: readonly BlogPost[] = [
  {
    id: 'understanding-fair-price',
    slug: 'understanding-fair-price',
    category: 'pricing',
    title: "How We Calculate Your Car's Fair Market Price",
    excerpt:
      "Behind DriveMatch's price intelligence engine: percentile analysis, sample size considerations, and why P25/median/P75 tells a better story than average.",
    author: 'DriveMatch Team',
    date: '2026-03-20',
    readTime: '6 min read',
    featured: true,
  },
  {
    id: 'overpaying-signs',
    slug: 'overpaying-signs',
    category: 'buying-guide',
    title: "5 Signs You're Paying Too Much for a Used Car",
    excerpt:
      'Market data reveals common patterns in overpriced listings. Here\'s what to watch for before signing the dotted line.',
    author: 'Ana Lima',
    date: '2026-03-15',
    readTime: '4 min read',
    featured: false,
  },
  {
    id: 'ev-rise-brazil',
    slug: 'ev-rise-brazil',
    category: 'market-trends',
    title: 'The Rise of Electric Vehicles in Brazil',
    excerpt:
      'EV adoption accelerated 42% in 2025. We analyzed 80,000 listings to understand how this is shifting used car valuations across all segments.',
    author: 'Carlos Souza',
    date: '2026-03-10',
    readTime: '8 min read',
    featured: false,
  },
  {
    id: 'p75-percentile',
    slug: 'p75-percentile',
    category: 'pricing',
    title: 'Why the P75 Percentile Changes Everything',
    excerpt:
      'Average prices hide the truth. We explain why DriveMatch uses statistical percentiles to give you a complete picture of market value.',
    author: 'DriveMatch Team',
    date: '2026-03-05',
    readTime: '5 min read',
    featured: false,
  },
  {
    id: 'used-luxury',
    slug: 'used-luxury',
    category: 'buying-guide',
    title: 'Used Luxury Cars: Are They Worth It?',
    excerpt:
      'BMW, Mercedes, Audi — depreciation curves, maintenance costs, and the sweet spot years for buying certified pre-owned luxury.',
    author: 'Fernanda Rocha',
    date: '2026-02-28',
    readTime: '7 min read',
    featured: false,
  },
  {
    id: '2026-market-outlook',
    slug: '2026-market-outlook',
    category: 'market-trends',
    title: '2026 Automotive Market Outlook',
    excerpt:
      'Supply chain normalization, EV incentives, and changing buyer behavior: our data team breaks down what to expect this year.',
    author: 'Carlos Souza',
    date: '2026-02-20',
    readTime: '9 min read',
    featured: false,
  },
  {
    id: 'depreciation-guide',
    slug: 'depreciation-guide',
    category: 'buying-guide',
    title: 'Understanding Depreciation: A Complete Buyer Guide',
    excerpt:
      'How fast do cars lose value? We mapped depreciation curves for 30 popular models so you can time your purchase perfectly.',
    author: 'Ana Lima',
    date: '2026-02-12',
    readTime: '10 min read',
    featured: false,
  },
  {
    id: 'dealer-transparency',
    slug: 'dealer-transparency',
    category: 'news',
    title: 'DriveMatch Now Shows Dealer Response Times',
    excerpt:
      'New transparency features in the marketplace: average response time, acceptance rate, and customer rating now visible on every dealer profile.',
    author: 'DriveMatch Team',
    date: '2026-02-05',
    readTime: '3 min read',
    featured: false,
  },
] as const;
