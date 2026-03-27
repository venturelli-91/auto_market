'use client';

import { useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

interface FAQItemProps {
  id: string;
  question: string;
  answer: string;
}

export function FAQItem({ id, question, answer }: FAQItemProps) {
  const [isOpen, setIsOpen] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className="bg-purple-50 dark:bg-purple-900/30 border border-purple-200 dark:border-purple-600/30 rounded-xl hover:border-purple-400 dark:hover:border-purple-500/60 transition-colors duration-200 overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full text-left px-5 py-4 cursor-pointer"
        aria-expanded={isOpen}
        aria-controls={`faq-answer-${id}`}
      >
        <p className="text-gray-800 dark:text-white/80 font-medium pr-4">{question}</p>
        <motion.div
          animate={shouldReduceMotion ? {} : { rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2, ease: 'easeInOut' }}
          className="flex-shrink-0 text-purple-500 dark:text-purple-400"
        >
          <ChevronDown size={18} aria-hidden="true" />
        </motion.div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            id={`faq-answer-${id}`}
            key="answer"
            initial={shouldReduceMotion ? false : { height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={shouldReduceMotion ? {} : { height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <p className="text-gray-600 dark:text-white/60 text-sm px-5 pb-4 leading-relaxed">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
