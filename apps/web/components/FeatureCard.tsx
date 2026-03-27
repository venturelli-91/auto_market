'use client';

import { LucideIcon } from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  delay?: number;
}

export function FeatureCard({ icon: Icon, title, description, delay = 0 }: FeatureCardProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={shouldReduceMotion ? false : { opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={shouldReduceMotion ? {} : { y: -4 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay, ease: 'easeOut' }}
      className="
        bg-white dark:bg-gradient-to-br dark:from-purple-900/40 dark:to-black/40
        border border-purple-200 dark:border-purple-600/30
        rounded-xl p-6
        hover:border-purple-400 dark:hover:border-purple-500/60
        hover:shadow-lg hover:shadow-purple-100 dark:hover:shadow-purple-900/30
        transition-[border-color,box-shadow] duration-200
        cursor-pointer
      "
    >
      <div className="relative h-44 bg-purple-50 dark:bg-gradient-to-br dark:from-purple-800/20 dark:to-black/20 rounded-lg mb-4 flex items-center justify-center">
        <Icon size={60} className="text-purple-500 dark:text-purple-400" aria-hidden="true" />
      </div>
      <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">{title}</h3>
      <p className="text-gray-600 dark:text-white/60 text-sm leading-relaxed">{description}</p>
    </motion.div>
  );
}
