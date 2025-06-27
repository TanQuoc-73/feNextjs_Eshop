'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { ChevronDownIcon } from '@heroicons/react/20/solid';

interface Brand {
  id: number;
  name: string;
  description: string;
  logoUrl: string | null;
  createdAt: string;
  updatedAt: string;
  active: boolean;
}

export default function BrandDD() {
  const [brands, setBrands] = useState<Brand[]>([]);
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
    fetchBrands();
  }, []);

  const fetchBrands = async () => {
    try {
      const apiUrl = 'http://localhost:8080/api/brands'; 
      const response = await fetch(apiUrl, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      });

      if (!response.ok) {
        const text = await response.text();
        try {
          const errorData = JSON.parse(text);
          throw new Error(errorData?.message || `Failed to fetch brands (${response.status})`);
        } catch {
          throw new Error(`Failed to fetch brands (${response.status}): ${text}`);
        }
      }

      const data = await response.json();
      setBrands(data);
      setError(null);
    } catch (err) {
      console.error('Error fetching brands:', err);
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div 
      className="relative inline-block text-left"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <button 
        className="flex items-center gap-1 text-gray-300 hover:text-purple-400 transition-colors duration-200 font-medium text-sm md:text-base px-3 py-2 rounded-md"
      >
        Brands
        <ChevronDownIcon className="w-4 h-4 ml-1 -mr-1" aria-hidden="true" />
      </button>

      {isOpen && (
        <div 
          className="absolute left-0 mt-1 w-64 max-h-96 overflow-y-auto rounded-lg bg-gray-800 shadow-lg ring-1 ring-purple-600 focus:outline-none z-50 divide-y divide-gray-700 transition-all duration-200"
        >
        <div className="p-2">
          <h3 className="px-3 py-2 text-sm font-semibold text-white">List Brands</h3>
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
              <div className="p-2 text-red-400">{error}</div>
            )}
            {!loading && !error && brands.length === 0 && (
              <div className="px-3 py-2 text-sm text-gray-400">No brands available.</div>
            )}
            {!loading && !error && (
              <div>
                {brands.map((brand) => (
                  <a
                    key={brand.id}
                    href={`/brands/${brand.id}`}
                    className="flex items-center p-2 hover:bg-gray-700"
                  >
                    <div className="flex-shrink-0 w-12 h-12 relative">
                      {brand.logoUrl ? (
                        <Image
                          src={brand.logoUrl}
                          alt={brand.name}
                          width={40}
                          height={40}
                          className="rounded"
                          loading="lazy"
                        />
                      ) : (
                        <div className="flex items-center justify-center w-12 h-12 bg-gray-700 rounded">
                          <span className="text-sm font-medium text-gray-300">
                            {brand.name.charAt(0).toUpperCase()}
                          </span>
                        </div>
                      )}
                    </div>
                    <div className="ml-3">
                      <h3 className="text-sm font-medium text-gray-300">{brand.name}</h3>
                      {brand.description && (
                        <p className="text-sm text-gray-500">{brand.description}</p>
                      )}
                    </div>
                  </a>
                ))}
              </div>
            )}
          </div>
        </div>
        </div>
      )}
    </div>
  );
}
