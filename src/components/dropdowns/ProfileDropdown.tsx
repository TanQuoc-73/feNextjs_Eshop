'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { UserIcon, ChevronDownIcon, ArrowLeftOnRectangleIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { useAuth } from '../../contexts/AuthContext';

// Translation constants
const translations = {
  profile: {
    title: 'Profile',
    account: 'My Account',
    logout: 'Logout'
  }
};

export default function ProfileDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useAuth();

  return (
    <div className="relative">
      {/* Profile button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1 text-gray-300 hover:text-purple-400 transition-colors"
        aria-label="Profile"
      >
        <div className="w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center">
          <UserIcon className="w-5 h-5 text-white" />
        </div>
        <span className="text-sm ml-1">{user?.name || translations.profile.title}</span>
        <ChevronDownIcon className="w-4 h-4 ml-1" />
      </button>

      {/* Dropdown menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-50"
          >
            <div className="py-1">
              {/* Account link */}
              <Link
                href="/account"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                <div className="flex items-center gap-2">
                  <UserIcon className="w-4 h-4 text-gray-500" />
                  <span>{translations.profile.account}</span>
                </div>
              </Link>

              {/* Logout button */}
              <button
                onClick={() => {
                  logout();
                  setIsOpen(false);
                }}
                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
              >
                <div className="flex items-center gap-2">
                  <ArrowLeftOnRectangleIcon className="w-4 h-4 text-red-500" />
                  <span>{translations.profile.logout}</span>
                </div>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
