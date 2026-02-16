'use client';

import { useState } from 'react';

export default function IdentifyPage() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [identifying, setIdentifying] = useState(false);
  const [result, setResult] = useState<any>(null);

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleIdentify = async () => {
    if (!selectedImage) return;

    setIdentifying(true);
    setResult(null);

    try {
      const response = await fetch('/api/identify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ image: selectedImage }),
      });

      const data = await response.json();
      setResult(data);
    } catch (error) {
      console.error('Identification failed:', error);
      setResult({ error: 'Failed to identify plant' });
    } finally {
      setIdentifying(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="mb-8">
          <a href="/" className="text-green-700 hover:text-green-900 font-medium">
            ← Back to Home
          </a>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">
            🌿 Identify Plant
          </h1>

          {!selectedImage ? (
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center">
              <div className="mb-4">
                <span className="text-6xl">📸</span>
              </div>
              <h2 className="text-xl font-semibold text-gray-700 mb-2">
                Upload a Plant Photo
              </h2>
              <p className="text-gray-500 mb-6">
                Take a photo or choose from your gallery
              </p>
              <label className="inline-block bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-8 rounded-lg cursor-pointer transition">
                Choose Photo
                <input
                  type="file"
                  accept="image/*"
                  capture="environment"
                  onChange={handleImageSelect}
                  className="hidden"
                />
              </label>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="relative">
                <img
                  src={selectedImage}
                  alt="Selected plant"
                  className="w-full h-96 object-cover rounded-lg"
                />
                <button
                  onClick={() => {
                    setSelectedImage(null);
                    setResult(null);
                  }}
                  className="absolute top-4 right-4 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
                >
                  Remove
                </button>
              </div>

              {!result && (
                <button
                  onClick={handleIdentify}
                  disabled={identifying}
                  className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white font-medium py-3 px-6 rounded-lg transition"
                >
                  {identifying ? 'Identifying...' : 'Identify Plant'}
                </button>
              )}

              {result && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                  {result.error ? (
                    <p className="text-red-600">{result.error}</p>
                  ) : (
                    <div>
                      <h3 className="text-2xl font-bold text-green-900 mb-2">
                        {result.commonName}
                      </h3>
                      <p className="text-gray-600 italic mb-4">
                        {result.scientificName}
                      </p>
                      <div className="space-y-2">
                        <p className="text-gray-700">
                          <strong>Confidence:</strong> {result.confidence}%
                        </p>
                        <p className="text-gray-700">{result.description}</p>
                      </div>
                      {result.plantId && (
                        <a
                          href={`/plants/${result.plantId}`}
                          className="inline-block mt-4 text-green-700 hover:text-green-900 font-medium underline"
                        >
                          View Full Details →
                        </a>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
