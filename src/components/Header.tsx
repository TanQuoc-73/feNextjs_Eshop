'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ShoppingCartIcon, Bars3Icon, XMarkIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import BrandDD from './dropdowns/BrandDD';

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const toggleMobileMenu = () => setMobileOpen(!mobileOpen);

  return (
    <header className="fixed top-0 left-0 w-full bg-black border-b border-purple-600 shadow-lg z-50">
      <div className="container mx-auto px-4 lg:px-8 flex items-center justify-between h-16">
        {/* Logo */}
        <Link href="/" className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
          EShop
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6 font-medium text-gray-300">
          <Link href="/" className="hover:text-purple-400 transition-colors">Home</Link>
          <Link href="/categories" className="hover:text-purple-400 transition-colors">Categories</Link>
          <Link href="/products" className="hover:text-purple-400 transition-colors">Products</Link>
          <BrandDD />
          <Link href="/about" className="hover:text-purple-400 transition-colors">About</Link>
        </nav>

        {/* Search bar */}
        <div className="hidden md:flex items-center relative">
          <input
            type="text"
            placeholder="Search products…"
            className="w-64 lg:w-80 bg-gray-800 text-white border border-purple-600 rounded-full py-1.5 pl-4 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <MagnifyingGlassIcon className="w-5 h-5 absolute right-3 top-1/2 -translate-y-1/2 text-gray-500" />
        </div>

        {/* Icons */}
        <div className="flex items-center gap-4 md:gap-6">
          <Link href="/cart" className="relative group">
            <ShoppingCartIcon className="w-6 h-6 text-gray-300 group-hover:text-purple-400 transition-colors" />
            <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full text-xs w-5 h-5 flex items-center justify-center">
              0
            </span>
          </Link>

          {/* Mobile hamburger */}
          <button className="md:hidden" onClick={toggleMobileMenu} aria-label="Toggle menu">
            {mobileOpen ? (
              <XMarkIcon className="w-7 h-7 text-gray-300" />
            ) : (
              <Bars3Icon className="w-7 h-7 text-gray-300" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-gray-900 border-t border-purple-600 shadow-lg">
          <nav className="flex flex-col p-4 space-y-3 text-gray-300">
            <Link href="/" className="hover:text-purple-400 transition-colors py-2" onClick={toggleMobileMenu}>Home</Link>
            <Link href="/categories" className="hover:text-purple-400 transition-colors py-2" onClick={toggleMobileMenu}>Categories</Link>
            <Link href="/products" className="hover:text-purple-400 transition-colors py-2" onClick={toggleMobileMenu}>Products</Link>
            <Link href="/brands" className="hover:text-purple-400 transition-colors py-2" onClick={toggleMobileMenu}>Brands</Link>
            <Link href="/about" className="hover:text-purple-400 transition-colors py-2" onClick={toggleMobileMenu}>About</Link>
          </nav>
        </div>
      )}
    </header>
  );
}