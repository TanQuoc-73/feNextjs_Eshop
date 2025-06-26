'use client';

import { useEffect, useState } from 'react';
import { ShoppingCartIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';
import Link from 'next/link';
import { formatCurrency } from '@/utils/format';

interface CartItem {
  id: number;
  product_id: number;
  variant_id: number | null;
  quantity: number;
  unit_price: number;
  total_price: number;
  products: {
    id: number;
    name: string;
    sku: string;
    image_url: string;
  };
  variants?: {
    id: number;
    name: string;
    price: number;
  };
}

export default function CartDD() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [closeTimeout, setCloseTimeout] = useState<NodeJS.Timeout | null>(null);

  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

  const updateCartItem = async (itemId: number, quantity: number) => {
    try {
      const response = await fetch(`${apiUrl}/api/cart/items/${itemId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ quantity })
      });

      if (!response.ok) throw new Error('Failed to update cart item');
      await fetchCartItems();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update cart item');
    }
  };

  const removeCartItem = async (itemId: number) => {
    try {
      const response = await fetch(`${apiUrl}/api/cart/items/${itemId}`, {
        method: 'DELETE'
      });

      if (!response.ok) throw new Error('Failed to remove cart item');
      await fetchCartItems();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to remove cart item');
    }
  };

  const fetchCartItems = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${apiUrl}/api/cart`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        credentials: 'include'
      });

      if (!response.ok) throw new Error('Failed to fetch cart');
      const data = await response.json();
      setCartItems(data.items || []);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch cart');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCartItems();
  }, []);

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
          className="absolute right-0 mt-1 w-72 max-h-96 overflow-y-auto rounded-lg bg-gray-800 shadow-lg ring-1 ring-purple-600 focus:outline-none z-50 divide-y divide-gray-700 transition-all duration-200"
        >
          <div className="p-2">
            <h3 className="px-3 py-2 text-sm font-semibold text-white">Your Cart</h3>
            <div className="space-y-1">
              {loading && (
                <div className="space-y-2 p-2">
                  <div className="flex items-center space-x-2">
                    <div className="h-6 w-16 rounded bg-gray-700 animate-pulse"></div>
                    <div className="h-6 w-24 rounded bg-gray-700 animate-pulse"></div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="h-6 w-16 rounded bg-gray-700 animate-pulse"></div>
                    <div className="h-6 w-24 rounded bg-gray-700 animate-pulse"></div>
                  </div>
                </div>
              )}
              {error && (
                <div className="p-2 text-red-400">
                  {error}
                </div>
              )}
              {cartItems.length === 0 && !loading && !error && (
                <div className="p-2 text-center">
                  <div className="flex items-center justify-center h-32">
                    <ShoppingCartIcon className="h-12 w-12 text-gray-400" />
                  </div>
                  <p className="text-sm text-gray-400">
                    Your cart is empty
                  </p>
                  <p className="mt-1 text-xs text-gray-400">
                    Add some items to your cart
                  </p>
                </div>
              )}
              {cartItems.map((item) => (
                <div key={item.id} className="flex items-center p-2 hover:bg-gray-700">
                  <div className="flex-shrink-0 w-12 h-12 relative">
                    <Image
                      src={item.products.image_url}
                      alt={item.products.name}
                      width={40}
                      height={40}
                      className="rounded"
                    />
                  </div>
                  <div className="ml-3 flex-1 min-w-0">
                    <div className="text-sm">
                      <Link 
                        href={`/products/${item.products.sku}`}
                        className="font-medium text-gray-300 hover:text-purple-400"
                      >
                        <h3 className="font-medium">{item.products.name}</h3>
                      </Link>
                      {item.variants?.name && (
                        <p className="text-sm text-gray-500">{item.variants.name}</p>
                      )}
                      <p className="text-sm text-gray-500">
                        SKU: {item.products.sku}
                      </p>
                    </div>
                    <div className="flex items-center justify-between mt-1">
                      <p className="text-sm font-medium text-gray-300">
                        {formatCurrency(item.unit_price)}
                      </p>
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => updateCartItem(item.id, item.quantity - 1)}
                          disabled={item.quantity <= 1}
                          className="p-1 rounded text-gray-400 hover:text-purple-400"
                        >
                          -
                        </button>
                        <span className="text-sm text-gray-300">{item.quantity}</span>
                        <button
                          onClick={() => updateCartItem(item.id, item.quantity + 1)}
                          className="p-1 rounded text-gray-400 hover:text-purple-400"
                        >
                          +
                        </button>
                      </div>
                      <button
                        onClick={() => removeCartItem(item.id)}
                        className="text-red-400 hover:text-red-500"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
