'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ShoppingCartIcon, Bars3Icon, XMarkIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const toggleMobileMenu = () => setMobileOpen(!mobileOpen);

  return (
    <header className="fixed top-0 left-0 w-full bg-white shadow-sm z-50">
      <div className="container mx-auto px-4 lg:px-8 flex items-center justify-between h-16">
        {/* Logo */}
        <Link href="/" className="text-2xl font-extrabold text-indigo-600">
          EShop
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6 font-medium text-gray-700">
          <Link href="/" className="hover:text-indigo-600 transition-colors">Home</Link>
          <Link href="/categories" className="hover:text-indigo-600 transition-colors">Categories</Link>
          <Link href="/products" className="hover:text-indigo-600 transition-colors">Products</Link>
          <Link href="/brands" className="hover:text-indigo-600 transition-colors">Brands</Link>
          <Link href="/about" className="hover:text-indigo-600 transition-colors">About</Link>
        </nav>

        {/* Search bar */}
        <div className="hidden md:flex items-center relative">
          <input
            type="text"
            placeholder="Search products…"
            className="w-64 lg:w-80 border rounded-full py-1.5 pl-4 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <MagnifyingGlassIcon className="w-5 h-5 absolute right-3 top-1/2 -translate-y-1/2 text-gray-500" />
        </div>

        {/* Icons */}
        <div className="flex items-center gap-4 md:gap-6">
          <Link href="/cart" className="relative group">
            <ShoppingCartIcon className="w-6 h-6 text-gray-700 group-hover:text-indigo-600 transition-colors" />
            <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full text-xs w-5 h-5 flex items-center justify-center">
              0
            </span>
          </Link>

          {/* Mobile hamburger */}
          <button className="md:hidden" onClick={toggleMobileMenu} aria-label="Toggle menu">
            {mobileOpen ? (
              <XMarkIcon className="w-7 h-7 text-gray-700" />
            ) : (
              <Bars3Icon className="w-7 h-7 text-gray-700" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-white border-t shadow-lg">
          <nav className="flex flex-col p-4 space-y-3 text-gray-700">
            <Link href="/" className="hover:text-indigo-600" onClick={toggleMobileMenu}>Home</Link>
            <Link href="/categories" className="hover:text-indigo-600" onClick={toggleMobileMenu}>Categories</Link>
            <Link href="/products" className="hover:text-indigo-600" onClick={toggleMobileMenu}>Products</Link>
            <Link href="/about" className="hover:text-indigo-600" onClick={toggleMobileMenu}>About</Link>
            <Link href="/cart" className="hover:text-indigo-600" onClick={toggleMobileMenu}>Cart</Link>
          </nav>
        </div>
      )}
    </header>
  );
}