'use client';

import Image from 'next/image';
import { AuthProvider } from '../contexts/AuthContext';

export default function Home() {
  return (
    <AuthProvider>
      <div className="min-h-screen bg-gray-900 text-white">
        {/* Hero Section */}
        <section className="relative overflow-hidden">
          <Image 
            src="/images/techbanner.jpg"
            alt="Tech Showcase"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
            <div className="text-center px-4">
              <h1 className="text-6xl font-bold text-white mb-6">
                Discover the Latest <span className="text-purple-500">Tech Gadgets</span>
              </h1>
              <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                Your one-stop destination for premium electronics and smart devices. Explore trending items and upgrade your lifestyle today.
              </p>
              <div className="flex gap-6 justify-center">
                <button className="px-8 py-4 bg-purple-600 hover:bg-purple-700 transition rounded-lg font-semibold text-lg shadow-lg">
                  Shop Now
                </button>
                <button className="px-8 py-4 border-2 border-purple-500 text-purple-300 hover:bg-purple-500 hover:text-white transition rounded-lg font-semibold text-lg">
                  Browse Products
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="p-6 bg-gray-800 rounded-lg shadow-lg">
                <div className="text-4xl text-purple-500 mb-4">🚀</div>
                <h3 className="text-2xl font-bold mb-2">Fast Delivery</h3>
                <p className="text-gray-400">Nationwide shipping with quick delivery options</p>
              </div>
              <div className="p-6 bg-gray-800 rounded-lg shadow-lg">
                <div className="text-4xl text-purple-500 mb-4">💰</div>
                <h3 className="text-2xl font-bold mb-2">Best Prices</h3>
                <p className="text-gray-400">Competitive pricing without compromising quality</p>
              </div>
              <div className="p-6 bg-gray-800 rounded-lg shadow-lg">
                <div className="text-4xl text-purple-500 mb-4">🌟</div>
                <h3 className="text-2xl font-bold mb-2">24/7 Support</h3>
                <p className="text-gray-400">Round-the-clock customer support for your convenience</p>
              </div>
            </div>
          </div>
        </section>

        {/* Categories Section */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-3xl font-bold mb-12 text-center">Popular Categories</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="p-6 bg-gray-800 rounded-lg hover:bg-gray-700 transition">
                <div className="text-4xl text-purple-500 mb-4">📱</div>
                <h3 className="text-xl font-bold mb-2">Smartphones</h3>
                <p className="text-gray-400">Latest models from top brands</p>
              </div>
              <div className="p-6 bg-gray-800 rounded-lg hover:bg-gray-700 transition">
                <div className="text-4xl text-purple-500 mb-4">💻</div>
                <h3 className="text-xl font-bold mb-2">Laptops</h3>
                <p className="text-gray-400">High-performance computing solutions</p>
              </div>
              <div className="p-6 bg-gray-800 rounded-lg hover:bg-gray-700 transition">
                <div className="text-4xl text-purple-500 mb-4">🎮</div>
                <h3 className="text-xl font-bold mb-2">Gaming</h3>
                <p className="text-gray-400">Gaming gear and accessories</p>
              </div>
              <div className="p-6 bg-gray-800 rounded-lg hover:bg-gray-700 transition">
                <div className="text-4xl text-purple-500 mb-4">🎧</div>
                <h3 className="text-xl font-bold mb-2">Audio</h3>
                <p className="text-gray-400">Premium audio equipment</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-purple-600 py-16">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-white mb-6">
                Ready to Upgrade Your Tech?
              </h2>
              <p className="text-lg text-white/90 mb-8">
                Start exploring our collection today and find the perfect gadgets for your needs.
              </p>
              <button className="inline-block px-8 py-4 bg-white text-purple-600 font-semibold rounded-lg hover:bg-purple-500 hover:text-white transition">
                Start Shopping
              </button>
            </div>
          </div>
        </section>
      </div>
    </AuthProvider>
  );
}

// export const metadata = {
//   title: 'E-Shop - Online Tech Store',
//   description: 'Shop premium tech gadgets and electronics online at E-Shop.',
// };
