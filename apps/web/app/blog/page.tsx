'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, Clock, User, Rss } from 'lucide-react';
import { SiteNav } from '../../components/SiteNav';
import { SiteFooter } from '../../components/SiteFooter';
import {
  BLOG_POSTS,
  BLOG_CATEGORIES,
  CATEGORY_ICONS,
  CATEGORY_STYLES,
  type BlogCategory,
  type BlogPost,
} from '../../lib/blog-constants';

type ActiveCategory = 'all' | BlogCategory;

export default function BlogPage() {
  const shouldReduceMotion = useReducedMotion();
  const [activeCategory, setActiveCategory] = useState<ActiveCategory>('all');

  const filtered =
    activeCategory === 'all'
      ? BLOG_POSTS
      : BLOG_POSTS.filter((p) => p.category === activeCategory);

  const featured = filtered.find((p) => p.featured);
  const regular = filtered.filter((p) => !p.featured);

  return (
    <main className="min-h-screen bg-white dark:bg-black transition-colors duration-300">
      <SiteNav />

      <div className="pt-28 pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Page Header */}
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="text-center mb-14"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-purple-100 dark:bg-purple-900/30 rounded-full mb-6">
              <Rss size={14} className="text-purple-600 dark:text-purple-400" aria-hidden="true" />
              <span className="text-xs font-bold text-purple-700 dark:text-purple-300 uppercase tracking-wide">
                Blog
              </span>
            </div>
            <h1 className="text-5xl lg:text-6xl font-black text-gray-900 dark:text-white mb-4 tracking-tight">
              Automotive{' '}
              <span className="text-purple-600 dark:text-purple-400">Insights</span>
            </h1>
            <p className="text-lg text-gray-500 dark:text-white/60 max-w-xl mx-auto">
              Market data, buying guides, and pricing intelligence from the DriveMatch team.
            </p>
          </motion.div>

          {/* Category Filter */}
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex flex-wrap gap-2 justify-center mb-12"
          >
            {BLOG_CATEGORIES.map(({ id, label }) => (
              <button
                key={id}
                onClick={() => setActiveCategory(id as ActiveCategory)}
                className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200 cursor-pointer ${
                  activeCategory === id
                    ? 'bg-purple-600 text-white shadow-md shadow-purple-500/20'
                    : 'bg-gray-100 dark:bg-white/10 text-gray-600 dark:text-white/60 hover:bg-gray-200 dark:hover:bg-white/20'
                }`}
              >
                {label}
              </button>
            ))}
          </motion.div>

          {/* Featured Post */}
          {featured && (
            <motion.div
              key={featured.id}
              initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="mb-10"
            >
              <Link
                href={`/blog/${featured.slug}`}
                className="group block bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-2xl overflow-hidden hover:border-purple-400 dark:hover:border-purple-500/50 transition-all duration-200 cursor-pointer"
              >
                <div className="grid grid-cols-1 lg:grid-cols-2">
                  {/* Visual panel */}
                  <FeaturedVisual category={featured.category} />

                  {/* Content */}
                  <div className="p-8 lg:p-10 flex flex-col justify-center">
                    <CategoryBadge category={featured.category} />
                    <h2 className="text-2xl lg:text-3xl font-black text-gray-900 dark:text-white mt-3 mb-4 leading-tight group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors duration-200">
                      {featured.title}
                    </h2>
                    <p className="text-gray-500 dark:text-white/60 text-sm leading-relaxed mb-6">
                      {featured.excerpt}
                    </p>
                    <div className="flex items-center justify-between">
                      <PostMeta
                        author={featured.author}
                        date={featured.date}
                        readTime={featured.readTime}
                      />
                      <span className="flex items-center gap-1 text-purple-600 dark:text-purple-400 text-sm font-bold group-hover:gap-2 transition-all duration-200">
                        Read more <ArrowRight size={14} aria-hidden="true" />
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          )}

          {/* Posts Grid */}
          {regular.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {regular.map((post, i) => (
                <PostCard key={post.id} post={post} index={i} shouldReduceMotion={!!shouldReduceMotion} />
              ))}
            </div>
          )}

          {/* Empty state */}
          {!featured && regular.length === 0 && (
            <div className="text-center py-20">
              <p className="text-gray-400 dark:text-white/40 text-lg font-semibold">
                No posts in this category yet.
              </p>
            </div>
          )}

          {/* Newsletter CTA */}
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="mt-20"
          >
            <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-2xl p-10 text-center">
              <h2 className="text-2xl font-black text-white mb-3">
                Never Miss a Market Update
              </h2>
              <p className="text-white/70 text-sm mb-6 max-w-md mx-auto">
                Get weekly pricing insights, market reports, and buying guides delivered to your inbox.
              </p>
              <Link
                href="/newsletter"
                className="inline-flex items-center gap-2 px-6 py-3 bg-white text-purple-600 rounded-xl font-bold text-sm hover:bg-gray-50 transition-colors duration-200 cursor-pointer"
              >
                Subscribe to Newsletter <ArrowRight size={16} aria-hidden="true" />
              </Link>
            </div>
          </motion.div>

        </div>
      </div>

      <SiteFooter />
    </main>
  );
}

// ——— sub-components ———

function FeaturedVisual({ category }: { category: BlogCategory }) {
  const Icon = CATEGORY_ICONS[category];
  return (
    <div className="h-56 lg:h-auto bg-gradient-to-br from-purple-600 via-purple-500 to-indigo-600 flex items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 bg-black/10" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-white/5 rounded-full blur-3xl" />
      <Icon size={64} className="relative text-white/30" aria-hidden="true" />
      <div className="absolute top-4 left-4">
        <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs font-bold text-white uppercase tracking-wide">
          Featured
        </span>
      </div>
    </div>
  );
}

function PostCard({
  post,
  index,
  shouldReduceMotion,
}: {
  post: BlogPost;
  index: number;
  shouldReduceMotion: boolean;
}) {
  const Icon = CATEGORY_ICONS[post.category];
  return (
    <motion.div
      initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.2 + index * 0.07 }}
    >
      <Link
        href={`/blog/${post.slug}`}
        className="group flex flex-col h-full bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-2xl overflow-hidden hover:border-purple-400 dark:hover:border-purple-500/50 hover:shadow-lg hover:shadow-purple-500/5 transition-all duration-200 cursor-pointer"
      >
        {/* Card header */}
        <div className="h-36 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-white/5 dark:to-white/10 flex items-center justify-center relative overflow-hidden flex-shrink-0">
          <Icon size={40} className="text-gray-300 dark:text-white/20" aria-hidden="true" />
        </div>

        {/* Card body */}
        <div className="p-6 flex flex-col flex-1">
          <CategoryBadge category={post.category} />
          <h3 className="text-lg font-black text-gray-900 dark:text-white mt-2.5 mb-2.5 leading-tight group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors duration-200 line-clamp-2">
            {post.title}
          </h3>
          <p className="text-sm text-gray-500 dark:text-white/50 leading-relaxed line-clamp-3 mb-5 flex-1">
            {post.excerpt}
          </p>
          <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-white/10">
            <PostMeta author={post.author} date={post.date} readTime={post.readTime} />
            <ArrowRight
              size={16}
              className="text-gray-300 dark:text-white/30 group-hover:text-purple-500 group-hover:translate-x-0.5 transition-all duration-200"
              aria-hidden="true"
            />
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

function CategoryBadge({ category }: { category: BlogCategory }) {
  const style = CATEGORY_STYLES[category];
  const label = BLOG_CATEGORIES.find((c) => c.id === category)?.label ?? category;
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold ${style.bg} ${style.text}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${style.dot}`} aria-hidden="true" />
      {label}
    </span>
  );
}

function PostMeta({
  author,
  date,
  readTime,
}: {
  author: string;
  date: string;
  readTime: string;
}) {
  const formatted = new Date(date).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
  return (
    <div className="flex items-center gap-3 text-xs text-gray-400 dark:text-white/40">
      <span className="flex items-center gap-1">
        <User size={11} aria-hidden="true" />
        {author}
      </span>
      <span className="flex items-center gap-1" title={formatted}>
        <Clock size={11} aria-hidden="true" />
        {readTime}
      </span>
    </div>
  );
}
