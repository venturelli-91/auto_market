import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-black/80 backdrop-blur-md border-b border-purple-600/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-white rounded-full"></div>
            <div className="text-xl font-black text-white">DriveMatch</div>
          </div>
          <div className="flex items-center gap-6">
            <Link href="/marketplace" className="text-white hover:text-purple-400 transition-colors font-medium text-sm">
              Marketplace
            </Link>
            <Link href="/features" className="text-white hover:text-purple-400 transition-colors font-medium text-sm">
              Features
            </Link>
            <Link href="/about" className="text-white hover:text-purple-400 transition-colors font-medium text-sm">
              About
            </Link>
            <Link href="/contact" className="text-white hover:text-purple-400 transition-colors font-medium text-sm">
              Contact
            </Link>
            <button className="px-6 py-2 bg-purple-600 hover:bg-purple-500 text-white rounded-lg font-bold transition-all">
              Sign In
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen pt-16 bg-black overflow-hidden">
        {/* Animated background elements - purple/blue glow */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute -bottom-20 -left-40 w-96 h-96 bg-purple-600/15 rounded-full blur-3xl" />
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500/15 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 flex flex-col items-center justify-center min-h-screen">
          <div className="text-center space-y-8 max-w-3xl">
            {/* Main Heading */}
            <h1 className="text-7xl lg:text-8xl font-black text-white leading-tight">
              Drive Your Dream
              <br />
              Car Today
            </h1>

            {/* Hero Car Showcase - centered */}
            <div className="relative h-64 w-full flex items-center justify-center my-8">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-64 h-64 bg-gradient-radial from-purple-500/30 to-transparent rounded-full blur-3xl" />
              </div>
              <div className="relative text-6xl">🚗</div>
            </div>

            {/* Brand Logos */}
            <div className="flex items-center justify-center gap-6 flex-wrap pt-4">
              <div className="text-white/60 font-bold">🏎️ TOYOTA</div>
              <div className="text-white/60 font-bold">⚫ BMW</div>
              <div className="text-white/60 font-bold">⚡ TESLA</div>
              <div className="text-white/60 font-bold">🎯 AUDI</div>
              <div className="text-white/60 font-bold">⭐ MERCEDES</div>
              <div className="text-white/60 font-bold">🏁 PORSCHE</div>
            </div>

            {/* CTA Button */}
            <div className="pt-4">
              <Link
                href="/marketplace"
                className="inline-block px-10 py-4 bg-purple-600 hover:bg-purple-500 text-white rounded-lg font-bold text-lg transition-all transform hover:scale-105"
              >
                Browse
              </Link>
            </div>

            {/* Description */}
            <p className="text-white/70 text-center max-w-xl mx-auto">
              Discover vehicles with intelligent pricing insights and get fair deals backed by real market data.
            </p>
          </div>
        </div>
      </section>

      {/* Unlock Your Car Section */}
      <section className="bg-gradient-to-br from-purple-950 to-black py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-black text-white mb-4">
              Unlock Your Car
            </h2>
            <p className="text-xl text-white/60 max-w-2xl mx-auto">
              Get the best deal with our intelligence-driven pricing system
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature Card 1 */}
            <div className="bg-gradient-to-br from-purple-900/40 to-black/40 border border-purple-600/30 rounded-xl p-6 hover:border-purple-500/60 transition-all">
              <div className="relative h-48 bg-gradient-to-br from-purple-800/20 to-black/20 rounded-lg mb-4 flex items-center justify-center">
                <div className="text-6xl">🚗</div>
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Used Exotic Luxury</h3>
              <p className="text-white/60 text-sm">Premium vehicles at market value</p>
            </div>

            {/* Feature Card 2 */}
            <div className="bg-gradient-to-br from-purple-900/40 to-black/40 border border-purple-600/30 rounded-xl p-6 hover:border-purple-500/60 transition-all">
              <div className="relative h-48 bg-gradient-to-br from-purple-800/20 to-black/20 rounded-lg mb-4 flex items-center justify-center">
                <div className="text-6xl">🏎️</div>
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Modern Everyday Cars</h3>
              <p className="text-white/60 text-sm">Reliable vehicles for daily commute</p>
            </div>

            {/* Feature Card 3 */}
            <div className="bg-gradient-to-br from-purple-900/40 to-black/40 border border-purple-600/30 rounded-xl p-6 hover:border-purple-500/60 transition-all">
              <div className="relative h-48 bg-gradient-to-br from-purple-800/20 to-black/20 rounded-lg mb-4 flex items-center justify-center">
                <div className="text-6xl">🎯</div>
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Smart Investment</h3>
              <p className="text-white/60 text-sm">Data-driven pricing insights</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="bg-gradient-to-br from-black to-purple-950 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-black text-white mb-4">Frequently Asked Questions</h2>
          </div>

          <div className="space-y-4 max-w-3xl mx-auto">
            {[1, 2, 3, 4].map((item) => (
              <div key={item} className="bg-purple-900/30 border border-purple-600/30 rounded-lg p-4 hover:border-purple-500/60 transition-all">
                <div className="flex items-center justify-between">
                  <p className="text-white/80 font-medium">How does the pricing intelligence work?</p>
                  <span className="text-white/40">+</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-br from-purple-900 to-purple-800 py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-black text-white mb-4">Find Your Perfect Car Today</h2>
          <div className="flex items-center justify-center gap-4 pt-8">
            <Link
              href="/marketplace"
              className="px-10 py-4 bg-purple-600 hover:bg-purple-500 text-white rounded-lg font-bold transition-all"
            >
              Browse
            </Link>
            <button className="px-10 py-4 border-2 border-white text-white rounded-lg font-bold hover:bg-white/10 transition-all">
              Learn More
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black text-white/60 py-12 border-t border-purple-600/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="text-xl font-black text-white mb-4">DriveMatch</div>
              <p className="text-sm">Intelligent vehicle marketplace</p>
            </div>
            <div>
              <h4 className="font-bold text-white mb-4">Platform</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white transition-colors">Browse</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Sell</a></li>
                <li><a href="#" className="hover:text-white transition-colors">About</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-white mb-4">Company</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-white mb-4">Legal</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white transition-colors">Privacy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Terms</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Security</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-purple-600/20 pt-8 text-center text-sm text-white/40">
            <p>&copy; 2026 DriveMatch. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </main>
  );
}
