'use client';

import { useState } from 'react';

export default function IdentifyPage() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [identifying, setIdentifying] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const resizeImage = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          let width = img.width;
          let height = img.height;

          // Resize to max 1024px on longest side
          const maxSize = 1024;
          if (width > height) {
            if (width > maxSize) {
              height = (height * maxSize) / width;
              width = maxSize;
            }
          } else {
            if (height > maxSize) {
              width = (width * maxSize) / height;
              height = maxSize;
            }
          }

          canvas.width = width;
          canvas.height = height;

          const ctx = canvas.getContext('2d');
          ctx?.drawImage(img, 0, 0, width, height);

          // Convert to JPEG with 80% quality
          const resizedDataUrl = canvas.toDataURL('image/jpeg', 0.8);
          resolve(resizedDataUrl);
        };
        img.onerror = reject;
        img.src = e.target?.result as string;
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  const handleImageSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        const resizedImage = await resizeImage(file);
        setSelectedImage(resizedImage);
        setResult(null);
        setError(null);
      } catch (err) {
        console.error('Failed to process image:', err);
        setError('Failed to process image');
      }
    }
  };

  const handleIdentify = async () => {
    if (!selectedImage) return;

    setIdentifying(true);
    setResult(null);
    setError(null);

    try {
      const response = await fetch('/api/identify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ image: selectedImage }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`API returned ${response.status}: ${errorText}`);
      }

      const data = await response.json();
      
      if (data.error) {
        setError(data.error + (data.details ? `: ${data.details}` : ''));
      } else {
        setResult(data);
      }
    } catch (err) {
      console.error('Identification failed:', err);
      setError(err instanceof Error ? err.message : 'Failed to identify plant');
    } finally {
      setIdentifying(false);
    }
  };

  const styles = {
    container: {
      minHeight: '100vh',
      padding: '3rem 1rem',
    },
    maxWidth: {
      maxWidth: '900px',
      margin: '0 auto',
    },
    backLink: {
      color: '#047857',
      fontWeight: '500',
      marginBottom: '2rem',
      display: 'inline-block',
    },
    card: {
      background: 'white',
      borderRadius: '1rem',
      boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
      padding: '2rem',
    },
    title: {
      fontSize: '2rem',
      fontWeight: 'bold',
      color: '#1f2937',
      marginBottom: '1.5rem',
    },
    uploadBox: {
      border: '2px dashed #d1d5db',
      borderRadius: '0.5rem',
      padding: '3rem',
      textAlign: 'center' as const,
    },
    icon: {
      fontSize: '4rem',
      marginBottom: '1rem',
    },
    uploadTitle: {
      fontSize: '1.25rem',
      fontWeight: '600',
      color: '#374151',
      marginBottom: '0.5rem',
    },
    uploadDesc: {
      color: '#6b7280',
      marginBottom: '1.5rem',
    },
    uploadButton: {
      display: 'inline-block',
      background: '#059669',
      color: 'white',
      fontWeight: '500',
      padding: '0.75rem 2rem',
      borderRadius: '0.5rem',
      cursor: 'pointer',
      border: 'none',
    },
    imagePreview: {
      position: 'relative' as const,
      marginBottom: '1.5rem',
    },
    image: {
      width: '100%',
      height: '400px',
      objectFit: 'cover' as const,
      borderRadius: '0.5rem',
    },
    removeButton: {
      position: 'absolute' as const,
      top: '1rem',
      right: '1rem',
      background: '#ef4444',
      color: 'white',
      padding: '0.5rem 1rem',
      borderRadius: '0.5rem',
      border: 'none',
      cursor: 'pointer',
    },
    identifyButton: {
      width: '100%',
      background: '#059669',
      color: 'white',
      fontWeight: '500',
      padding: '0.75rem 1.5rem',
      borderRadius: '0.5rem',
      border: 'none',
      fontSize: '1rem',
      cursor: 'pointer',
      marginBottom: '1.5rem',
    },
    identifyButtonDisabled: {
      width: '100%',
      background: '#9ca3af',
      color: 'white',
      fontWeight: '500',
      padding: '0.75rem 1.5rem',
      borderRadius: '0.5rem',
      border: 'none',
      fontSize: '1rem',
      cursor: 'not-allowed',
      marginBottom: '1.5rem',
    },
    resultBox: {
      background: '#f0fdf4',
      border: '1px solid #86efac',
      borderRadius: '0.5rem',
      padding: '1.5rem',
    },
    errorBox: {
      background: '#fee2e2',
      border: '1px solid #fca5a5',
      borderRadius: '0.5rem',
      padding: '1.5rem',
      color: '#dc2626',
    },
    resultTitle: {
      fontSize: '1.5rem',
      fontWeight: 'bold',
      color: '#065f46',
      marginBottom: '0.5rem',
    },
    scientificName: {
      color: '#6b7280',
      fontStyle: 'italic',
      marginBottom: '1rem',
    },
    resultText: {
      color: '#374151',
      marginBottom: '0.5rem',
    },
  };

  return (
    <div style={styles.container}>
      <div className="container" style={styles.maxWidth}>
        <a href="/" style={styles.backLink}>
          ← Back to Home
        </a>

        <div style={styles.card}>
          <h1 style={styles.title}>🌿 Identify Plant</h1>

          {!selectedImage ? (
            <div style={styles.uploadBox}>
              <div style={styles.icon}>📸</div>
              <h2 style={styles.uploadTitle}>Upload a Plant Photo</h2>
              <p style={styles.uploadDesc}>
                Take a photo or choose from your gallery
              </p>
              <label style={styles.uploadButton}>
                Choose Photo
                <input
                  type="file"
                  accept="image/*"
                  capture="environment"
                  onChange={handleImageSelect}
                  style={{ display: 'none' }}
                />
              </label>
            </div>
          ) : (
            <>
              <div style={styles.imagePreview}>
                <img
                  src={selectedImage}
                  alt="Selected plant"
                  style={styles.image}
                />
                <button
                  onClick={() => {
                    setSelectedImage(null);
                    setResult(null);
                    setError(null);
                  }}
                  style={styles.removeButton}
                >
                  Remove
                </button>
              </div>

              {!result && !error && (
                <button
                  onClick={handleIdentify}
                  disabled={identifying}
                  style={identifying ? styles.identifyButtonDisabled : styles.identifyButton}
                >
                  {identifying ? 'Identifying...' : 'Identify Plant'}
                </button>
              )}

              {error && (
                <div style={styles.errorBox}>
                  <p><strong>Error:</strong> {error}</p>
                  <p style={{ marginTop: '1rem', fontSize: '0.875rem' }}>
                    Make sure your OpenAI API key is configured in Vercel environment variables.
                  </p>
                </div>
              )}

              {result && (
                <div style={styles.resultBox}>
                  <h3 style={styles.resultTitle}>{result.commonName}</h3>
                  <p style={styles.scientificName}>{result.scientificName}</p>
                  <div>
                    <p style={styles.resultText}>
                      <strong>Confidence:</strong> {result.confidence}%
                    </p>
                    <p style={styles.resultText}>{result.description}</p>
                    {result.family && (
                      <p style={styles.resultText}>
                        <strong>Family:</strong> {result.family}
                      </p>
                    )}
                    {result.nativeRegions && result.nativeRegions.length > 0 && (
                      <p style={styles.resultText}>
                        <strong>Native to:</strong> {result.nativeRegions.join(', ')}
                      </p>
                    )}
                    {result.careInstructions && (
                      <p style={styles.resultText}>
                        <strong>Care:</strong> {result.careInstructions}
                      </p>
                    )}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
