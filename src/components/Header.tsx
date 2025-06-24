'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Bars3Icon, XMarkIcon, MagnifyingGlassIcon, UserIcon } from '@heroicons/react/24/outline';
import ProfileDropdown from './dropdowns/ProfileDropdown';
import BrandDD from './dropdowns/BrandDD';
import CartDD from './dropdowns/CartDD';
import AuthModal from './modals/AuthModal';
import { useAuth } from '../contexts/AuthContext';

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const { user, logout, loading } = useAuth();

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
  const openAuthModal = () => setIsAuthModalOpen(true);
  const closeAuthModal = () => setIsAuthModalOpen(false);

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
          {/* User/Auth Button */}
          {user ? (
            <ProfileDropdown />
          ) : (
            <button 
              onClick={openAuthModal}
              className="hidden md:flex items-center gap-1 text-gray-300 hover:text-purple-400 transition-colors"
              aria-label="Login"
              disabled={loading}
            >
              <UserIcon className="w-6 h-6" />
              <span className="text-sm ml-1">Login</span>
            </button>
          )}
          
          <CartDD />

          {/* Mobile hamburger */}
          <button className="md:hidden" onClick={toggleMobileMenu} aria-label="Toggle menu">
            {isMobileMenuOpen ? (
              <XMarkIcon className="w-7 h-7 text-gray-300" />
            ) : (
              <Bars3Icon className="w-7 h-7 text-gray-300" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-gray-900 border-t border-purple-600 shadow-lg">
          <nav className="flex flex-col p-4 space-y-3 text-gray-300">
            <Link href="/" className="hover:text-purple-400 transition-colors py-2" onClick={toggleMobileMenu}>Home</Link>
            <Link href="/categories" className="hover:text-purple-400 transition-colors py-2" onClick={toggleMobileMenu}>Categories</Link>
            <Link href="/products" className="hover:text-purple-400 transition-colors py-2" onClick={toggleMobileMenu}>Products</Link>
            <Link href="/brands" className="hover:text-purple-400 transition-colors py-2" onClick={toggleMobileMenu}>Brands</Link>
            <Link href="/cart" className="hover:text-purple-400 transition-colors py-2" onClick={toggleMobileMenu}>Cart</Link>
            {user ? (
              <button 
                className="w-full text-left hover:text-purple-400 transition-colors py-2 flex items-center gap-2"
                onClick={() => {
                  toggleMobileMenu();
                  logout();
                }}
              >
                <UserIcon className="w-5 h-5" />
                <span>Đăng xuất</span>
              </button>
            ) : (
              <button 
                className="w-full text-left hover:text-purple-400 transition-colors py-2 flex items-center gap-2" 
                onClick={() => {
                  toggleMobileMenu();
                  openAuthModal();
                }}
              >
                <UserIcon className="w-5 h-5" />
                <span>Đăng nhập</span>
              </button>
            )}
            <Link href="/about" className="hover:text-purple-400 transition-colors py-2" onClick={toggleMobileMenu}>About</Link>
          </nav>
        </div>
      )}

      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={closeAuthModal} 
      />
    </header>
  );
}