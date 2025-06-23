'use client'

import Image from "next/image";
import { useEffect, useState } from "react";

interface Brand {
  id: number;
  name: string;
  slug: string;
  logo_url: string;
  description: string;
}

export default function Home() {
  const [brands, setBrands] = useState<Brand[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchBrands();
  }, []);

  const fetchBrands = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/brands');
      if (!response.ok) {
        throw new Error('Failed to fetch brands');
      }
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
    <div className="min-h-screen bg-gray-50">
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Thương hiệu</h1>
        
        {loading && (
          <div className="text-center py-8">Đang tải...</div>
        )}

        {error && (
          <div className="text-red-500 text-center py-8">{error}</div>
        )}

        {!loading && !error && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {brands.map((brand) => (
              <div
                key={brand.id}
                className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow"
              >
                <div className="flex items-center gap-4">
                  {brand.logo_url && (
                    <div className="w-20 h-20">
                      <Image
                        src={brand.logo_url}
                        alt={brand.name}
                        width={80}
                        height={80}
                        className="object-contain"
                      />
                    </div>
                  )}
                  <div>
                    <h3 className="text-xl font-semibold">{brand.name}</h3>
                    {brand.description && (
                      <p className="text-gray-600 text-sm mt-1">{brand.description}</p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
