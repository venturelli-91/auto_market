'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Car, Mail, Lock, User, Eye, EyeOff } from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';
import { ThemeToggle } from '../../components/ThemeToggle';

export default function SignupPage() {
  const shouldReduceMotion = useReducedMotion();

  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const set = (field: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (form.password !== form.confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    if (!agreedToTerms) {
      setError('You must agree to the Terms of Service.');
      return;
    }

    setIsLoading(true);

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'}/api/auth/register`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: form.name,
            email: form.email,
            password: form.password,
          }),
        }
      );

      if (!res.ok) {
        const body = await res.json().catch(() => ({})) as { message?: string };
        setError(body.message ?? 'Could not create account. Please try again.');
        return;
      }

      const { token } = await res.json() as { token: string };
      localStorage.setItem('auth_token', token);
      window.location.href = '/marketplace';
    } catch {
      setError('Unable to connect. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="h-screen flex overflow-hidden relative bg-white dark:bg-black transition-colors duration-300">
      {/* Theme Toggle */}
      <div className="absolute top-4 right-4 z-50">
        <ThemeToggle />
      </div>

      {/* Left Side — decorative (always dark) */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-purple-950 to-black" />

        {/* Glow orbs */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 right-0 w-80 h-80 bg-purple-700/15 rounded-full blur-3xl" />
          <div
            className="absolute top-1/3 right-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl animate-pulse"
            style={{ animationDelay: '2s' }}
          />
        </div>

        {/* Grid texture */}
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage:
              'linear-gradient(90deg, rgba(168,85,247,0.1) 1px, transparent 1px), linear-gradient(rgba(168,85,247,0.1) 1px, transparent 1px)',
            backgroundSize: '50px 50px',
          }}
        />

        {/* Ghosted car icon */}
        <div className="absolute inset-0 flex items-center justify-center opacity-10">
          <Car size={220} className="text-purple-400 stroke-[0.5]" aria-hidden="true" />
        </div>

        {/* Content */}
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="text-center text-white px-8 z-10"
          >
            <Car size={56} className="mx-auto mb-5 text-purple-400" aria-hidden="true" />
            <h2 className="text-4xl font-black mb-3">DriveMatch</h2>
            <p className="text-xl text-white/80 mb-2">Find Your Perfect Car</p>
            <p className="text-sm text-white/50">Powered by Intelligent Pricing</p>

            {/* Trust stats */}
            <div className="mt-10 grid grid-cols-3 gap-6 border-t border-white/10 pt-8">
              {[
                { value: '50k+', label: 'Vehicles' },
                { value: '95%', label: 'Accuracy' },
                { value: '4.9★', label: 'Rating' },
              ].map(({ value, label }) => (
                <div key={label} className="text-center">
                  <div className="text-2xl font-black text-white">{value}</div>
                  <div className="text-xs text-white/50 mt-0.5">{label}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        <div className="absolute bottom-0 inset-x-0 h-32 bg-gradient-to-t from-black to-transparent" />
      </div>

      {/* Right Side — signup form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center bg-white dark:bg-black px-4 sm:px-6 lg:px-8 py-6 overflow-y-auto relative transition-colors duration-300">
        {/* Background glow */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-200/40 dark:bg-purple-900/40 rounded-full blur-3xl" />
          <div className="absolute -bottom-20 -right-60 w-96 h-96 bg-purple-100/30 dark:bg-purple-800/30 rounded-full blur-3xl" />
        </div>

        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="w-full max-w-md relative z-10"
        >
          {/* Logo */}
          <div className="mb-5">
            <Link href="/" className="flex items-center gap-2">
              <div className="text-xl font-black bg-gradient-to-r from-purple-500 to-purple-600 bg-clip-text text-transparent">
                DRIVE
              </div>
              <div className="text-xl font-black text-gray-900 dark:text-white">MATCH</div>
            </Link>
          </div>

          {/* Header */}
          <div className="mb-6">
            <h1 className="text-2xl font-black text-gray-900 dark:text-white mb-1">Create Account</h1>
            <p className="text-gray-500 dark:text-white/60 text-sm">Join thousands of smart car buyers today</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4" noValidate>

            {/* Full Name */}
            <div>
              <label htmlFor="name" className="text-xs font-bold text-gray-700 dark:text-white mb-1.5 flex items-center gap-1.5">
                <User size={13} aria-hidden="true" />
                Full Name
              </label>
              <input
                id="name"
                type="text"
                value={form.name}
                onChange={set('name')}
                placeholder="John Smith"
                autoComplete="name"
                required
                className="w-full px-3 py-2 bg-gray-100 dark:bg-white/10 border border-gray-300 dark:border-white/20 rounded-lg text-sm text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-white/40 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all"
              />
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="text-xs font-bold text-gray-700 dark:text-white mb-1.5 flex items-center gap-1.5">
                <Mail size={13} aria-hidden="true" />
                Email
              </label>
              <input
                id="email"
                type="email"
                value={form.email}
                onChange={set('email')}
                placeholder="your@email.com"
                autoComplete="email"
                required
                className="w-full px-3 py-2 bg-gray-100 dark:bg-white/10 border border-gray-300 dark:border-white/20 rounded-lg text-sm text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-white/40 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all"
              />
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="text-xs font-bold text-gray-700 dark:text-white mb-1.5 flex items-center gap-1.5">
                <Lock size={13} aria-hidden="true" />
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={form.password}
                  onChange={set('password')}
                  placeholder="Min. 8 characters"
                  autoComplete="new-password"
                  required
                  minLength={8}
                  className="w-full px-3 py-2 pr-10 bg-gray-100 dark:bg-white/10 border border-gray-300 dark:border-white/20 rounded-lg text-sm text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-white/40 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-white/40 hover:text-gray-600 dark:hover:text-white/70 transition-colors cursor-pointer"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
            </div>

            {/* Confirm Password */}
            <div>
              <label htmlFor="confirmPassword" className="text-xs font-bold text-gray-700 dark:text-white mb-1.5 flex items-center gap-1.5">
                <Lock size={13} aria-hidden="true" />
                Confirm Password
              </label>
              <div className="relative">
                <input
                  id="confirmPassword"
                  type={showConfirmPassword ? 'text' : 'password'}
                  value={form.confirmPassword}
                  onChange={set('confirmPassword')}
                  placeholder="Repeat your password"
                  autoComplete="new-password"
                  required
                  className="w-full px-3 py-2 pr-10 bg-gray-100 dark:bg-white/10 border border-gray-300 dark:border-white/20 rounded-lg text-sm text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-white/40 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-white/40 hover:text-gray-600 dark:hover:text-white/70 transition-colors cursor-pointer"
                  aria-label={showConfirmPassword ? 'Hide password' : 'Show password'}
                >
                  {showConfirmPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
            </div>

            {/* Terms */}
            <div>
              <label className="flex items-start gap-2.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={agreedToTerms}
                  onChange={(e) => setAgreedToTerms(e.target.checked)}
                  className="mt-0.5 w-4 h-4 rounded bg-gray-100 dark:bg-white/10 border border-gray-300 dark:border-white/20 accent-purple-600 cursor-pointer flex-shrink-0"
                />
                <span className="text-xs text-gray-500 dark:text-white/60 leading-relaxed">
                  I agree to the{' '}
                  <Link href="/terms" className="text-purple-600 dark:text-purple-400 hover:text-purple-500 dark:hover:text-purple-300 font-semibold transition-colors">
                    Terms of Service
                  </Link>{' '}
                  and{' '}
                  <Link href="/privacy" className="text-purple-600 dark:text-purple-400 hover:text-purple-500 dark:hover:text-purple-300 font-semibold transition-colors">
                    Privacy Policy
                  </Link>
                </span>
              </label>
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
              className="w-full px-4 py-2.5 bg-gradient-to-r from-purple-600 to-purple-500 hover:from-purple-500 hover:to-purple-400 text-white rounded-lg font-bold text-sm transition-all disabled:opacity-50 disabled:cursor-not-allowed mt-2 cursor-pointer"
            >
              {isLoading ? 'Creating account...' : 'Create Account'}
            </button>
          </form>

          {/* Divider */}
          <div className="relative my-5">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200 dark:border-white/20" />
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="px-2 bg-white dark:bg-black text-gray-400 dark:text-white/60 transition-colors duration-300">
                Or sign up with
              </span>
            </div>
          </div>

          {/* Social */}
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              className="px-3 py-2 border border-gray-200 dark:border-white/20 rounded-lg text-gray-700 dark:text-white hover:bg-gray-50 dark:hover:bg-white/5 transition-colors flex items-center justify-center gap-2 font-bold text-sm cursor-pointer"
            >
              <svg className="w-4 h-4 flex-shrink-0" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
              </svg>
              <span>Google</span>
            </button>

            <button
              type="button"
              className="px-3 py-2 border border-gray-200 dark:border-white/20 rounded-lg text-gray-700 dark:text-white hover:bg-gray-50 dark:hover:bg-white/5 transition-colors flex items-center justify-center gap-2 font-bold text-sm cursor-pointer"
            >
              <svg className="w-4 h-4 flex-shrink-0" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.02-1.77-.63-3.29-.63-1.52 0-2 .63-3.29.65-1.33.02-2.29-1.24-3.12-2.47C6.75 17.27 6 14.33 6 11.9c0-3.15 2.07-4.83 4.09-4.86 1.35-.02 2.62.99 3.49.99.87 0 2.26-1.23 3.81-1.05.64.1 2.44.26 3.61 2.03-.1.06-1.9 1.11-1.87 3.31.02 2.5 2.2 3.4 2.22 3.41-.02.08-.37.7-1.35 1.36z" />
              </svg>
              <span>Apple</span>
            </button>
          </div>

          {/* Sign In link */}
          <p className="text-center text-gray-500 dark:text-white/60 text-xs mt-5">
            Already have an account?{' '}
            <Link
              href="/login"
              className="text-purple-600 dark:text-purple-400 hover:text-purple-500 dark:hover:text-purple-300 font-bold transition-colors"
            >
              Sign in
            </Link>
          </p>
        </motion.div>
      </div>
    </main>
  );
}
