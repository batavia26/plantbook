'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';

export default function PlantsPage() {
  const searchParams = useSearchParams();
  const location = searchParams.get('location');
  const [plants, setPlants] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPlants();
  }, [location]);

  const fetchPlants = async () => {
    try {
      const url = location
        ? `/api/plants?location=${encodeURIComponent(location)}`
        : '/api/plants';
      const response = await fetch(url);
      const data = await response.json();
      setPlants(data.plants || []);
    } catch (error) {
      console.error('Failed to fetch plants:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 py-12">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <a href="/" className="text-green-700 hover:text-green-900 font-medium">
            ← Back to Home
          </a>
        </div>

        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            📚 Plant Field Guide
          </h1>
          {location && (
            <p className="text-xl text-gray-600">
              Plants found in: <strong>{location}</strong>
            </p>
          )}
        </div>

        {loading ? (
          <div className="text-center py-12">
            <p className="text-gray-600">Loading plants...</p>
          </div>
        ) : plants.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600">No plants found</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {plants.map((plant) => (
              <a
                key={plant.id}
                href={`/plants/${plant.id}`}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition"
              >
                {plant.imageUrl ? (
                  <img
                    src={plant.imageUrl}
                    alt={plant.commonName}
                    className="w-full h-48 object-cover"
                  />
                ) : (
                  <div className="w-full h-48 bg-green-100 flex items-center justify-center">
                    <span className="text-6xl">🌿</span>
                  </div>
                )}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-1">
                    {plant.commonName}
                  </h3>
                  <p className="text-gray-600 italic text-sm mb-3">
                    {plant.scientificName}
                  </p>
                  {plant.nativeRegions && (
                    <p className="text-gray-500 text-sm">
                      📍 {plant.nativeRegions.join(', ')}
                    </p>
                  )}
                </div>
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
