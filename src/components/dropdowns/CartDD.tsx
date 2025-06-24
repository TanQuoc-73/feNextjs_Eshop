'use client';

import { useEffect, useState } from 'react';
import { ShoppingCartIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';
import Link from 'next/link';
import { formatCurrency } from '@/utils/format';

interface CartItem {
  id: number;
  product_id: number;
  product_name: string;
  product_sku: string;
  variant_name: string | null;
  quantity: number;
  unit_price: number;
  total_price: number;
  product: {
    image_url: string;
  };
}

export default function CartDD() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [closeTimeout, setCloseTimeout] = useState<NodeJS.Timeout | null>(null);

  const handleMouseEnter = () => {
    if (closeTimeout) {
      clearTimeout(closeTimeout);
      setCloseTimeout(null);
    }
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    const timer = setTimeout(() => {
      setIsOpen(false);
    }, 200);
    setCloseTimeout(timer);
  };

  useEffect(() => {
    fetchCartItems();
  }, []);

  const fetchCartItems = async () => {
    try {
      setLoading(true);
      // Generate a session ID if it doesn't exist
      const sessionId = localStorage.getItem('sessionId') || crypto.randomUUID();
      localStorage.setItem('sessionId', sessionId);

      const response = await fetch('http://localhost:3001/api/cart', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Session-ID': sessionId
        }
      });

      if (!response.ok) throw new Error('Failed to fetch cart items');
      const data = await response.json();
      setCartItems(data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cartItems.reduce((sum, item) => sum + item.total_price, 0);

  return (
    <div 
      className="relative inline-block text-left"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <button 
        className="relative group"
      >
        <ShoppingCartIcon className="w-6 h-6 text-gray-300 group-hover:text-purple-400 transition-colors" />
        <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full text-xs w-5 h-5 flex items-center justify-center">
          {totalItems}
        </span>
      </button>

      {isOpen && (
        <div 
          className="absolute right-0 mt-1 w-80 max-h-96 overflow-y-auto rounded-lg bg-gray-800 shadow-lg ring-1 ring-purple-600 focus:outline-none z-50 divide-y divide-gray-700 transition-all duration-200"
        >
          <div className="p-2">
            <h3 className="px-3 py-2 text-sm font-semibold text-gray-900">Your Cart</h3>
            
            {loading && (
              <div className="space-y-2 p-2">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="flex items-center space-x-3 p-2 rounded-md animate-pulse">
                    <div className="w-10 h-10 bg-gray-200 rounded"></div>
                    <div className="flex-1 space-y-2">
                      <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                      <div className="h-3 bg-gray-100 rounded w-1/2"></div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {error && (
              <div className="px-3 py-2 text-sm text-red-500">{error}</div>
            )}

            {!loading && !error && cartItems.length === 0 && (
              <div className="px-3 py-4 text-center text-gray-400">
                <ShoppingCartIcon className="mx-auto h-12 w-12 text-gray-300" />
                <h3 className="mt-2 text-sm font-medium text-gray-300">Your cart is empty</h3>
                <p className="mt-1 text-sm text-gray-400">Add some items to your cart</p>
              </div>
            )}

            {!loading && !error && cartItems.length > 0 && (
              <div className="space-y-2">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex items-center p-2 hover:bg-gray-700">
                    <div className="flex-shrink-0 w-12 h-12 relative">
                      <Image
                        src={item.product.image_url}
                        alt={item.product_name}
                        fill
                        className="object-contain"
                        sizes="48px"
                      />
                    </div>
                    <div className="ml-3 flex-1 min-w-0">
                      <div className="text-sm">
                        <Link 
                          href={`/products/${item.product_sku}`}
                          className="font-medium text-gray-300 hover:text-purple-400"
                        >
                          {item.product_name}
                        </Link>
                        {item.variant_name && (
                          <p className="text-xs text-gray-400">{item.variant_name}</p>
                        )}
                      </div>
                      <div className="flex items-center justify-between mt-1">
                        <p className="text-sm font-medium text-gray-300">
                          {formatCurrency(item.total_price)}
                        </p>
                        <div className="flex items-center space-x-2 text-xs text-gray-400">
                          <span>Qty: {item.quantity}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {!loading && cartItems.length > 0 && (
              <div className="px-3 py-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-400">Total:</span>
                  <span className="font-medium text-gray-300">
                    {formatCurrency(totalPrice)}
                  </span>
                </div>
                <Link
                  href="/cart"
                  className="w-full px-4 py-2 mt-2 text-sm font-medium text-white bg-purple-600 rounded-md hover:bg-purple-500 transition-colors flex items-center justify-center"
                >
                  View Cart
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
