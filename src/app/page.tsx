'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function HomePage() {
  const router = useRouter();
  const [location, setLocation] = useState<string>('');

  const handleIdentify = () => {
    router.push('/identify');
  };

  const handleBrowse = () => {
    router.push('/plants');
  };

  const handleLocationSearch = () => {
    if (location.trim()) {
      router.push(`/plants?location=${encodeURIComponent(location)}`);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-green-900 mb-4">
            🌱 PlantBook
          </h1>
          <p className="text-xl text-green-700">
            Identify plants with AI • Discover species by location
          </p>
        </div>

        <div className="max-w-2xl mx-auto space-y-6">
          {/* Identify Plant */}
          <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition">
            <div className="flex items-center gap-4 mb-4">
              <span className="text-4xl">📸</span>
              <div>
                <h2 className="text-2xl font-semibold text-gray-900">Identify a Plant</h2>
                <p className="text-gray-600">Take a photo or upload an image</p>
              </div>
            </div>
            <button
              onClick={handleIdentify}
              className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-6 rounded-lg transition"
            >
              Start Identification
            </button>
          </div>

          {/* Browse by Location */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="flex items-center gap-4 mb-4">
              <span className="text-4xl">🗺️</span>
              <div>
                <h2 className="text-2xl font-semibold text-gray-900">Discover by Location</h2>
                <p className="text-gray-600">Find plants native to your area</p>
              </div>
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Enter location (e.g., California, Europe)"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleLocationSearch()}
                className="flex-1 border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <button
                onClick={handleLocationSearch}
                className="bg-emerald-600 hover:bg-emerald-700 text-white font-medium px-6 rounded-lg transition"
              >
                Search
              </button>
            </div>
          </div>

          {/* Browse All */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="flex items-center gap-4 mb-4">
              <span className="text-4xl">📚</span>
              <div>
                <h2 className="text-2xl font-semibold text-gray-900">Browse Field Guide</h2>
                <p className="text-gray-600">Explore our plant database</p>
              </div>
            </div>
            <button
              onClick={handleBrowse}
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-3 px-6 rounded-lg transition"
            >
              Browse Plants
            </button>
          </div>
        </div>

        <div className="text-center mt-12">
          <a
            href="/my-garden"
            className="text-green-700 hover:text-green-900 font-medium underline"
          >
            View My Garden →
          </a>
        </div>
      </div>
    </div>
  );
}
