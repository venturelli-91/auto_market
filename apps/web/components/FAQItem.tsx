'use client';

import { useState } from 'react';

interface FAQItemProps {
  id: string;
  question: string;
  answer: string;
}

export function FAQItem({ id, question, answer }: FAQItemProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="bg-purple-900/30 border border-purple-600/30 rounded-lg p-4 hover:border-purple-500/60 transition-all">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full text-left"
        aria-expanded={isOpen}
        aria-controls={`faq-answer-${id}`}
      >
        <p className="text-white/80 font-medium">{question}</p>
        <span className="text-white/40 text-lg" aria-hidden="true">
          {isOpen ? '−' : '+'}
        </span>
      </button>
      {isOpen && (
        <p id={`faq-answer-${id}`} className="text-white/60 text-sm mt-3">
          {answer}
        </p>
      )}
    </div>
  );
}
