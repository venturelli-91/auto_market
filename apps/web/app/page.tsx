import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-gradient-to-r from-purple-900 via-purple-800 to-purple-900 backdrop-blur-md border-b border-purple-700/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="text-2xl font-black bg-gradient-to-r from-yellow-300 to-yellow-500 bg-clip-text text-transparent">
              DRIVE
            </div>
            <div className="text-2xl font-black text-white">MATCH</div>
          </div>
          <div className="flex items-center gap-6">
            <Link href="/marketplace" className="text-white hover:text-yellow-300 transition-colors font-medium">
              Marketplace
            </Link>
            <button className="px-6 py-2 bg-gradient-to-r from-yellow-400 to-yellow-500 text-purple-900 rounded-lg font-bold hover:shadow-lg hover:shadow-yellow-500/50 transition-all">
              Sign In
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen pt-16 bg-gradient-to-br from-purple-950 via-purple-900 to-blue-900 overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-yellow-400/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute top-1/3 -left-20 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Text Content */}
            <div className="space-y-8">
              <div className="space-y-4">
                <h1 className="text-6xl lg:text-7xl font-black text-white leading-tight">
                  Find Your
                  <br />
                  <span className="bg-gradient-to-r from-yellow-300 via-yellow-400 to-yellow-500 bg-clip-text text-transparent">
                    Perfect Ride
                  </span>
                </h1>
                <p className="text-xl text-purple-200 max-w-lg">
                  Discover vehicles with intelligent pricing insights. Get fair deals backed by real market data.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/marketplace"
                  className="px-8 py-4 bg-gradient-to-r from-yellow-400 to-yellow-500 text-purple-900 rounded-lg font-bold text-lg hover:shadow-2xl hover:shadow-yellow-500/50 transition-all transform hover:scale-105"
                >
                  Browse Vehicles
                </Link>
                <button className="px-8 py-4 border-2 border-yellow-400 text-yellow-300 rounded-lg font-bold text-lg hover:bg-yellow-400/10 transition-all">
                  Learn More
                </button>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-6 pt-8">
                <div>
                  <div className="text-3xl font-black text-yellow-400">500K+</div>
                  <p className="text-purple-300 text-sm">Vehicles Listed</p>
                </div>
                <div>
                  <div className="text-3xl font-black text-yellow-400">50K+</div>
                  <p className="text-purple-300 text-sm">Happy Buyers</p>
                </div>
                <div>
                  <div className="text-3xl font-black text-yellow-400">99%</div>
                  <p className="text-purple-300 text-sm">Fair Pricing</p>
                </div>
              </div>
            </div>

            {/* Hero Image Showcase */}
            <div className="relative h-full min-h-96">
              <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/20 to-purple-600/20 rounded-2xl backdrop-blur-sm border border-yellow-400/30 overflow-hidden">
                <div className="w-full h-full bg-gradient-to-br from-purple-800 to-purple-900 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-6xl mb-4">🚗</div>
                    <p className="text-yellow-300 font-bold text-lg">Vehicle showcase</p>
                    <p className="text-purple-300 text-sm mt-2">Coming Soon</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-gradient-to-br from-purple-900 via-blue-900 to-purple-900 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-black text-white mb-4">
              Why Choose
              <br />
              <span className="text-yellow-400">DriveMatch</span>
            </h2>
            <p className="text-xl text-purple-200 max-w-2xl mx-auto">
              We revolutionize how you buy and sell vehicles with data-driven insights
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-gradient-to-br from-purple-800/50 to-purple-900/50 border border-yellow-400/30 rounded-xl p-8 hover:border-yellow-400/60 transition-all hover:shadow-xl hover:shadow-yellow-400/20">
              <div className="text-4xl mb-4">💡</div>
              <h3 className="text-xl font-bold text-yellow-300 mb-3">Price Intelligence</h3>
              <p className="text-purple-200">
                Our AI-powered system analyzes thousands of vehicles to give you fair pricing insights in real-time.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-gradient-to-br from-purple-800/50 to-purple-900/50 border border-yellow-400/30 rounded-xl p-8 hover:border-yellow-400/60 transition-all hover:shadow-xl hover:shadow-yellow-400/20">
              <div className="text-4xl mb-4">🔍</div>
              <h3 className="text-xl font-bold text-yellow-300 mb-3">Smart Search</h3>
              <p className="text-purple-200">
                Filter by price, features, condition, and more. Find exactly what you&apos;re looking for in seconds.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-gradient-to-br from-purple-800/50 to-purple-900/50 border border-yellow-400/30 rounded-xl p-8 hover:border-yellow-400/60 transition-all hover:shadow-xl hover:shadow-yellow-400/20">
              <div className="text-4xl mb-4">✅</div>
              <h3 className="text-xl font-bold text-yellow-300 mb-3">Trust & Safety</h3>
              <p className="text-purple-200">
                Verified listings, transparent pricing, and secure transactions. Buy with confidence.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-yellow-400 to-yellow-500 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-black text-purple-900 mb-4">Ready to Find Your Perfect Vehicle?</h2>
          <p className="text-lg text-purple-800 mb-8">Start browsing our inventory of verified listings with intelligent pricing.</p>
          <Link
            href="/marketplace"
            className="inline-block px-10 py-4 bg-purple-900 text-yellow-300 rounded-lg font-bold text-lg hover:bg-purple-800 transition-all transform hover:scale-105"
          >
            Browse Marketplace
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-purple-950 to-blue-950 text-purple-200 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="text-xl font-black mb-4">
                <span className="bg-gradient-to-r from-yellow-300 to-yellow-500 bg-clip-text text-transparent">DRIVE</span>
                <span className="text-white">MATCH</span>
              </div>
              <p className="text-sm">Intelligent vehicle marketplace</p>
            </div>
            <div>
              <h4 className="font-bold text-white mb-4">Platform</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-yellow-300 transition-colors">Browse</a></li>
                <li><a href="#" className="hover:text-yellow-300 transition-colors">Sell</a></li>
                <li><a href="#" className="hover:text-yellow-300 transition-colors">About</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-white mb-4">Company</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-yellow-300 transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-yellow-300 transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-yellow-300 transition-colors">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-white mb-4">Legal</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-yellow-300 transition-colors">Privacy</a></li>
                <li><a href="#" className="hover:text-yellow-300 transition-colors">Terms</a></li>
                <li><a href="#" className="hover:text-yellow-300 transition-colors">Security</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-purple-700/50 pt-8 text-center text-sm">
            <p>&copy; 2026 DriveMatch. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </main>
  );
}
