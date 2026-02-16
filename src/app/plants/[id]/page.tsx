'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';

export default function PlantDetailPage() {
  const params = useParams();
  const id = params.id as string;
  const [plant, setPlant] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPlant();
  }, [id]);

  const fetchPlant = async () => {
    try {
      const response = await fetch(`/api/plants/${id}`);
      const data = await response.json();
      setPlant(data);
    } catch (error) {
      console.error('Failed to fetch plant:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 py-12">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!plant) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 py-12">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-600">Plant not found</p>
          <a href="/plants" className="text-green-700 hover:text-green-900 font-medium underline mt-4 inline-block">
            ← Back to Plants
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="mb-8">
          <a href="/plants" className="text-green-700 hover:text-green-900 font-medium">
            ← Back to Plants
          </a>
        </div>

        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          {plant.imageUrl ? (
            <img
              src={plant.imageUrl}
              alt={plant.commonName}
              className="w-full h-96 object-cover"
            />
          ) : (
            <div className="w-full h-96 bg-green-100 flex items-center justify-center">
              <span className="text-9xl">🌿</span>
            </div>
          )}

          <div className="p-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              {plant.commonName}
            </h1>
            <p className="text-xl text-gray-600 italic mb-6">
              {plant.scientificName}
            </p>

            <div className="space-y-6">
              <div>
                <h2 className="text-lg font-semibold text-gray-900 mb-2">Description</h2>
                <p className="text-gray-700">{plant.description}</p>
              </div>

              {plant.family && (
                <div>
                  <h2 className="text-lg font-semibold text-gray-900 mb-2">Family</h2>
                  <p className="text-gray-700">{plant.family}</p>
                </div>
              )}

              {plant.careInstructions && (
                <div>
                  <h2 className="text-lg font-semibold text-gray-900 mb-2">Care Instructions</h2>
                  <p className="text-gray-700">{plant.careInstructions}</p>
                </div>
              )}

              {plant.nativeRegions && plant.nativeRegions.length > 0 && (
                <div>
                  <h2 className="text-lg font-semibold text-gray-900 mb-2">Native Regions</h2>
                  <div className="flex flex-wrap gap-2">
                    {plant.nativeRegions.map((region: string) => (
                      <span
                        key={region}
                        className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm"
                      >
                        📍 {region}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {plant.toxicity && (
                <div>
                  <h2 className="text-lg font-semibold text-gray-900 mb-2">Toxicity</h2>
                  <p className="text-gray-700">{plant.toxicity}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
