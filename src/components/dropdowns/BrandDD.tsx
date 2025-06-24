'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { ChevronDownIcon } from '@heroicons/react/20/solid';

interface Brand {
  id: number;
  name: string;
  slug: string;
  logo_url: string;
  description: string;
}

export default function BrandDD() {
  const [brands, setBrands] = useState<Brand[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [closing, setClosing] = useState(false);
  const [closeTimeout, setCloseTimeout] = useState<NodeJS.Timeout | null>(null);

  const handleMouseEnter = () => {
    if (closeTimeout) {
      clearTimeout(closeTimeout);
      setCloseTimeout(null);
    }
    setClosing(false);
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    setClosing(true);
    const timer = setTimeout(() => {
      if (closing) {
        setIsOpen(false);
        setClosing(false);
      }
    }, 200); // Thời gian delay trước khi đóng
    setCloseTimeout(timer);
  };

  useEffect(() => {
    fetchBrands();
  }, []);

  const fetchBrands = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/brands');
      if (!response.ok) throw new Error('Failed to fetch brands');
      const data = await response.json();
      setBrands(data);
      setError(null);
    } catch (err) {
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

      {(isOpen || closing) && (
        <div 
          className={`absolute left-0 mt-1 w-72 max-h-96 overflow-y-auto rounded-lg bg-gray-800 shadow-lg ring-1 ring-purple-600 focus:outline-none z-50 divide-y divide-gray-700 transition-all duration-200 ${
            closing ? 'opacity-0 scale-95' : 'opacity-100 scale-100'
          }`}
        >
        <div className="p-2">
          <h3 className="px-3 py-2 text-sm font-semibold text-gray-900">List Brands</h3>
          <div className="space-y-1">
            {loading && (
              <div className="space-y-2 p-2">
                {[...Array(5)].map((_, i) => (
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
            {!loading && !error && brands.map((brand) => (
              <div key={brand.id} className="hover:bg-gray-700">
                <a
                  href={`/thuong-hieu/${brand.slug}`}
                  className="flex items-center p-3 transition-colors duration-150 text-gray-300 hover:text-white"
                >
                  {brand.logo_url ? (
                    <div className="flex-shrink-0 w-8 h-8 relative">
                      <Image
                        src={brand.logo_url}
                        alt={brand.name}
                        fill
                        className="object-contain"
                        sizes="32px"
                      />
                    </div>
                  ) : (
                    <div className="flex-shrink-0 w-8 h-8 bg-gray-100 rounded flex items-center justify-center">
                      <span className="text-xs font-medium text-gray-500">
                        {brand.name.charAt(0).toUpperCase()}
                      </span>
                    </div>
                  )}
                  <div className="ml-3">
                    <p className="text-sm font-medium">
                      {brand.name}
                    </p>
                    {brand.description && (
                      <p className="text-xs text-gray-400 line-clamp-1">{brand.description}</p>
                    )}
                  </div>
                </a>
              </div>
            ))}
          </div>
        </div>
        </div>
      )}
    </div>
  );
}
