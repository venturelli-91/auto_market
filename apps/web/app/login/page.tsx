'use client';

import { useState } from 'react';
import Link from 'next/link';

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
    <main className="min-h-screen flex">
      {/* Left Side - Image */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-gray-900 to-black relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <img
          src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=1000&fit=crop"
          alt="Professional workplace"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white px-8">
            <h2 className="text-4xl font-black mb-4">DriveMatch</h2>
            <p className="text-xl text-white/80">Encontre o veículo perfeito com inteligência</p>
          </div>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center bg-black px-4 sm:px-6 lg:px-8 py-6">
        <div className="w-full max-w-md">
          {/* Logo */}
          <div className="mb-5">
            <Link href="/" className="flex items-center gap-2">
              <div className="text-xl font-black bg-gradient-to-r from-purple-500 to-purple-600 bg-clip-text text-transparent">
                DRIVE
              </div>
              <div className="text-xl font-black text-white">MATCH</div>
            </Link>
          </div>

          {/* Form Header */}
          <div className="mb-6">
            <h1 className="text-2xl font-black text-white mb-1">Bem-vindo</h1>
            <p className="text-white/60 text-sm">Acesse sua conta para continuar</p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email Input */}
            <div>
              <label htmlFor="email" className="block text-xs font-bold text-white mb-1.5">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="seu@email.com"
                className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-sm text-white placeholder-white/40 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all"
                required
              />
            </div>

            {/* Password Input */}
            <div>
              <label htmlFor="password" className="block text-xs font-bold text-white mb-1.5">
                Senha
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-sm text-white placeholder-white/40 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all"
                required
              />
            </div>

            {/* Remember & Forgot */}
            <div className="flex items-center justify-between text-xs">
              <label className="flex items-center gap-1.5 cursor-pointer">
                <input type="checkbox" className="w-4 h-4 rounded bg-white/10 border border-white/20 accent-purple-600" />
                <span className="text-white/60">Lembrar-me</span>
              </label>
              <Link href="/forgot-password" className="text-purple-400 hover:text-purple-300 transition-colors">
                Esqueceu?
              </Link>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full px-4 py-2.5 bg-gradient-to-r from-purple-600 to-purple-500 hover:from-purple-500 hover:to-purple-400 text-white rounded-lg font-bold text-sm transition-all disabled:opacity-50 disabled:cursor-not-allowed mt-5"
            >
              {isLoading ? 'Entrando...' : 'Entrar'}
            </button>
          </form>

          {/* Divider */}
          <div className="relative my-5">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/20" />
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="px-2 bg-black text-white/60">Ou continue com</span>
            </div>
          </div>

          {/* Social Login */}
          <div className="grid grid-cols-2 gap-3">
            <button className="px-3 py-2 border border-white/20 rounded-lg text-white hover:bg-white/5 transition-colors flex items-center justify-center gap-2 font-bold text-sm">
              <span>🔵</span>
              <span className="hidden sm:inline">Google</span>
            </button>
            <button className="px-3 py-2 border border-white/20 rounded-lg text-white hover:bg-white/5 transition-colors flex items-center justify-center gap-2 font-bold text-sm">
              <span>🍎</span>
              <span className="hidden sm:inline">Apple</span>
            </button>
          </div>

          {/* Sign Up Link */}
          <p className="text-center text-white/60 text-xs mt-5">
            Não tem uma conta?{' '}
            <Link href="/signup" className="text-purple-400 hover:text-purple-300 font-bold transition-colors">
              Crie uma
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}
