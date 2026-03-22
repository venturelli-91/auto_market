'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Car, Mail, Lock } from 'lucide-react';
import { ThemeToggle } from '../../components/ThemeToggle';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Login logic will be implemented here
    console.log('Login attempt:', { email, password });
    setIsLoading(false);
  };

  return (
    <main className="h-screen flex overflow-hidden relative bg-white dark:bg-black transition-colors duration-300">
      {/* Theme Toggle */}
      <div className="absolute top-4 right-4 z-50">
        <ThemeToggle />
      </div>

      {/* Left Side - Car Background (always dark — decorative) */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-purple-950 to-black" />

        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 right-0 w-80 h-80 bg-purple-700/15 rounded-full blur-3xl" />
          <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
        </div>

        <div className="absolute inset-0 flex items-center justify-center opacity-20">
          <Car size={200} className="text-purple-500 stroke-[0.5]" />
        </div>

        <div className="absolute inset-0 opacity-5" style={{
          backgroundImage: 'linear-gradient(90deg, rgba(168,85,247,0.1) 1px, transparent 1px), linear-gradient(rgba(168,85,247,0.1) 1px, transparent 1px)',
          backgroundSize: '50px 50px'
        }} />

        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white px-8 z-10">
            <Car size={64} className="mx-auto mb-4 text-purple-400" />
            <h2 className="text-4xl font-black mb-4">DriveMatch</h2>
            <p className="text-xl text-white/80">Find Your Perfect Car</p>
            <p className="text-sm text-white/60 mt-2">Powered by Intelligent Pricing</p>
          </div>
        </div>

        <div className="absolute bottom-0 inset-x-0 h-32 bg-gradient-to-t from-black to-transparent" />
      </div>

      {/* Right Side - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center bg-white dark:bg-black px-4 sm:px-6 lg:px-8 py-6 overflow-y-auto relative transition-colors duration-300">
        {/* Gradient Background Effect */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-200/40 dark:bg-purple-900/40 rounded-full blur-3xl" />
          <div className="absolute -bottom-20 -right-60 w-96 h-96 bg-purple-100/30 dark:bg-purple-800/30 rounded-full blur-3xl" />
        </div>

        <div className="w-full max-w-md relative z-10">
          {/* Logo */}
          <div className="mb-5">
            <Link href="/" className="flex items-center gap-2">
              <div className="text-xl font-black bg-gradient-to-r from-purple-500 to-purple-600 bg-clip-text text-transparent">
                DRIVE
              </div>
              <div className="text-xl font-black text-gray-900 dark:text-white">MATCH</div>
            </Link>
          </div>

          {/* Form Header */}
          <div className="mb-6">
            <h1 className="text-2xl font-black text-gray-900 dark:text-white mb-1">Welcome</h1>
            <p className="text-gray-500 dark:text-white/60 text-sm">Sign in to your account to continue</p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email Input */}
            <div>
              <label htmlFor="email" className="text-xs font-bold text-gray-700 dark:text-white mb-1.5 flex items-center gap-1.5">
                <Mail size={14} />
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="w-full px-3 py-2 bg-gray-100 dark:bg-white/10 border border-gray-300 dark:border-white/20 rounded-lg text-sm text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-white/40 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all"
                required
              />
            </div>

            {/* Password Input */}
            <div>
              <label htmlFor="password" className="text-xs font-bold text-gray-700 dark:text-white mb-1.5 flex items-center gap-1.5">
                <Lock size={14} />
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-3 py-2 bg-gray-100 dark:bg-white/10 border border-gray-300 dark:border-white/20 rounded-lg text-sm text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-white/40 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all"
                required
              />
            </div>

            {/* Remember & Forgot */}
            <div className="flex items-center justify-between text-xs">
              <label className="flex items-center gap-1.5 cursor-pointer">
                <input type="checkbox" className="w-4 h-4 rounded bg-gray-100 dark:bg-white/10 border border-gray-300 dark:border-white/20 accent-purple-600" />
                <span className="text-gray-500 dark:text-white/60">Remember me</span>
              </label>
              <Link href="/forgot-password" className="text-purple-600 dark:text-purple-400 hover:text-purple-500 dark:hover:text-purple-300 transition-colors">
                Forgot password?
              </Link>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full px-4 py-2.5 bg-gradient-to-r from-purple-600 to-purple-500 hover:from-purple-500 hover:to-purple-400 text-white rounded-lg font-bold text-sm transition-all disabled:opacity-50 disabled:cursor-not-allowed mt-5"
            >
              {isLoading ? 'Signing in...' : 'Sign in'}
            </button>
          </form>

          {/* Divider */}
          <div className="relative my-5">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200 dark:border-white/20" />
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="px-2 bg-white dark:bg-black text-gray-400 dark:text-white/60 transition-colors duration-300">Or continue with</span>
            </div>
          </div>

          {/* Social Login */}
          <div className="grid grid-cols-2 gap-3">
            <button className="px-3 py-2 border border-gray-200 dark:border-white/20 rounded-lg text-gray-700 dark:text-white hover:bg-gray-50 dark:hover:bg-white/5 transition-colors flex items-center justify-center gap-2 font-bold text-sm">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              <span className="hidden sm:inline">Google</span>
            </button>

            <button className="px-3 py-2 border border-gray-200 dark:border-white/20 rounded-lg text-gray-700 dark:text-white hover:bg-gray-50 dark:hover:bg-white/5 transition-colors flex items-center justify-center gap-2 font-bold text-sm">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.02-1.77-.63-3.29-.63-1.52 0-2 .63-3.29.65-1.33.02-2.29-1.24-3.12-2.47C6.75 17.27 6 14.33 6 11.9c0-3.15 2.07-4.83 4.09-4.86 1.35-.02 2.62.99 3.49.99.87 0 2.26-1.23 3.81-1.05.64.1 2.44.26 3.61 2.03-.1.06-1.9 1.11-1.87 3.31.02 2.5 2.2 3.4 2.22 3.41-.02.08-.37.7-1.35 1.36z"/>
              </svg>
              <span className="hidden sm:inline">Apple</span>
            </button>
          </div>

          {/* Sign Up Link */}
          <p className="text-center text-gray-500 dark:text-white/60 text-xs mt-5">
            Don't have an account?{' '}
            <Link href="/signup" className="text-purple-600 dark:text-purple-400 hover:text-purple-500 dark:hover:text-purple-300 font-bold transition-colors">
              Create one
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}
