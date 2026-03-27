'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Mail, MessageSquare, Clock, MapPin, CheckCircle } from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';
import { SiteNav } from '../../components/SiteNav';
import { SiteFooter } from '../../components/SiteFooter';

const SUBJECTS = [
  { value: '', label: 'Select a subject' },
  { value: 'general', label: 'General Inquiry' },
  { value: 'support', label: 'Technical Support' },
  { value: 'sales', label: 'Sales & Pricing' },
  { value: 'dealer', label: 'Dealer Partnership' },
  { value: 'press', label: 'Press & Media' },
] as const;

const CONTACT_INFO = [
  {
    icon: Mail,
    label: 'Email',
    value: 'contact@drivematch.com',
    detail: 'Send us a message anytime',
  },
  {
    icon: Clock,
    label: 'Response Time',
    value: 'Within 24 hours',
    detail: 'Monday to Friday, 9am–6pm',
  },
  {
    icon: MapPin,
    label: 'Location',
    value: 'São Paulo, Brazil',
    detail: 'Serving customers nationwide',
  },
] as const;

type FormState = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

export default function ContactPage() {
  const shouldReduceMotion = useReducedMotion();

  const [form, setForm] = useState<FormState>({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const set = (field: keyof FormState) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
      setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'}/api/contact`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(form),
        }
      );

      if (!res.ok) {
        setError('Failed to send message. Please try again.');
        return;
      }

      setSubmitted(true);
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

      {/* Page content */}
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
              Get in <span className="text-purple-600 dark:text-purple-400">Touch</span>
            </h1>
            <p className="text-lg text-gray-500 dark:text-white/60 max-w-xl mx-auto">
              Have a question about a vehicle or our pricing engine? We'd love to hear from you.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">

            {/* Left — contact info */}
            <motion.aside
              initial={shouldReduceMotion ? false : { opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1, ease: 'easeOut' }}
              className="lg:col-span-2 space-y-4"
            >
              {/* Info cards */}
              {CONTACT_INFO.map(({ icon: Icon, label, value, detail }, i) => (
                <motion.div
                  key={label}
                  initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.15 + i * 0.1, ease: 'easeOut' }}
                  className="flex items-start gap-4 p-5 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-2xl"
                >
                  <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900/50 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Icon size={18} className="text-purple-600 dark:text-purple-400" aria-hidden="true" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-gray-500 dark:text-white/50 uppercase tracking-wide mb-0.5">
                      {label}
                    </p>
                    <p className="text-sm font-semibold text-gray-900 dark:text-white">{value}</p>
                    <p className="text-xs text-gray-500 dark:text-white/50 mt-0.5">{detail}</p>
                  </div>
                </motion.div>
              ))}

              {/* Response time callout */}
              <div className="p-5 bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-600/30 rounded-2xl">
                <div className="flex items-center gap-2 mb-2">
                  <MessageSquare size={16} className="text-purple-600 dark:text-purple-400" aria-hidden="true" />
                  <span className="text-sm font-bold text-gray-900 dark:text-white">Quick Support</span>
                </div>
                <p className="text-xs text-gray-600 dark:text-white/60 leading-relaxed">
                  For urgent matters, include your listing ID in the message and we'll prioritize your request.
                </p>
              </div>
            </motion.aside>

            {/* Right — form */}
            <motion.div
              initial={shouldReduceMotion ? false : { opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.15, ease: 'easeOut' }}
              className="lg:col-span-3"
            >
              <div className="bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-2xl p-8">

                {submitted ? (
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
                    <h2 className="text-2xl font-black text-gray-900 dark:text-white mb-2">Message Sent!</h2>
                    <p className="text-gray-500 dark:text-white/60 text-sm max-w-xs">
                      Thanks for reaching out. We'll get back to you within 24 hours.
                    </p>
                    <button
                      onClick={() => { setSubmitted(false); setForm({ name: '', email: '', subject: '', message: '' }); }}
                      className="mt-8 px-6 py-2.5 border border-gray-200 dark:border-white/20 rounded-xl text-sm font-bold text-gray-700 dark:text-white hover:border-purple-400 dark:hover:border-purple-500 transition-colors cursor-pointer"
                    >
                      Send another message
                    </button>
                  </motion.div>
                ) : (
                  /* Form */
                  <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      {/* Name */}
                      <div>
                        <label htmlFor="name" className="block text-xs font-bold text-gray-700 dark:text-white/80 mb-1.5">
                          Full Name <span className="text-red-500" aria-hidden="true">*</span>
                        </label>
                        <input
                          id="name"
                          type="text"
                          value={form.name}
                          onChange={set('name')}
                          placeholder="John Smith"
                          autoComplete="name"
                          required
                          className={inputClass}
                        />
                      </div>

                      {/* Email */}
                      <div>
                        <label htmlFor="contact-email" className="block text-xs font-bold text-gray-700 dark:text-white/80 mb-1.5">
                          Email Address <span className="text-red-500" aria-hidden="true">*</span>
                        </label>
                        <input
                          id="contact-email"
                          type="email"
                          value={form.email}
                          onChange={set('email')}
                          placeholder="your@email.com"
                          autoComplete="email"
                          required
                          className={inputClass}
                        />
                      </div>
                    </div>

                    {/* Subject */}
                    <div>
                      <label htmlFor="subject" className="block text-xs font-bold text-gray-700 dark:text-white/80 mb-1.5">
                        Subject <span className="text-red-500" aria-hidden="true">*</span>
                      </label>
                      <select
                        id="subject"
                        value={form.subject}
                        onChange={set('subject')}
                        required
                        className={`${inputClass} cursor-pointer`}
                      >
                        {SUBJECTS.map(({ value, label }) => (
                          <option key={value} value={value} disabled={value === ''}>
                            {label}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Message */}
                    <div>
                      <label htmlFor="message" className="block text-xs font-bold text-gray-700 dark:text-white/80 mb-1.5">
                        Message <span className="text-red-500" aria-hidden="true">*</span>
                      </label>
                      <textarea
                        id="message"
                        value={form.message}
                        onChange={set('message')}
                        placeholder="Tell us how we can help you..."
                        required
                        rows={5}
                        className={`${inputClass} resize-none`}
                      />
                    </div>

                    {/* Privacy note */}
                    <p className="text-xs text-gray-400 dark:text-white/40">
                      By submitting this form you agree to our{' '}
                      <Link href="/privacy" className="text-purple-600 dark:text-purple-400 hover:underline">
                        Privacy Policy
                      </Link>
                      .
                    </p>

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
                      {isLoading ? 'Sending...' : 'Send Message'}
                    </button>
                  </form>
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
