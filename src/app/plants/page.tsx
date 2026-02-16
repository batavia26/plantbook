'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';

function PlantsContent() {
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

  const styles = {
    container: {
      minHeight: '100vh',
      padding: '3rem 1rem',
    },
    backLink: {
      color: '#047857',
      fontWeight: '500',
      marginBottom: '2rem',
      display: 'inline-block',
    },
    title: {
      fontSize: '2.5rem',
      fontWeight: 'bold',
      marginBottom: '0.5rem',
    },
    subtitle: {
      fontSize: '1.25rem',
      color: '#6b7280',
      marginBottom: '2rem',
    },
    grid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
      gap: '1.5rem',
    },
    card: {
      background: 'white',
      borderRadius: '1rem',
      overflow: 'hidden',
      boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
      textDecoration: 'none',
      color: 'inherit',
      display: 'block',
    },
    imagePlaceholder: {
      width: '100%',
      height: '200px',
      background: '#d1fae5',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '4rem',
    },
    cardContent: {
      padding: '1.5rem',
    },
    plantName: {
      fontSize: '1.25rem',
      fontWeight: 'bold',
      marginBottom: '0.25rem',
    },
    scientificName: {
      color: '#6b7280',
      fontStyle: 'italic',
      fontSize: '0.875rem',
      marginBottom: '0.75rem',
    },
    regions: {
      color: '#6b7280',
      fontSize: '0.875rem',
    },
  };

  return (
    <div style={styles.container}>
      <div className="container">
        <a href="/" style={styles.backLink}>
          ← Back to Home
        </a>

        <div style={{ marginBottom: '2rem' }}>
          <h1 style={styles.title}>📚 Plant Field Guide</h1>
          {location && (
            <p style={styles.subtitle}>
              Plants found in: <strong>{location}</strong>
            </p>
          )}
        </div>

        {loading ? (
          <div style={{ textAlign: 'center', padding: '3rem' }}>
            <p style={{ color: '#6b7280' }}>Loading plants...</p>
          </div>
        ) : plants.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '3rem' }}>
            <p style={{ color: '#6b7280' }}>No plants found</p>
          </div>
        ) : (
          <div style={styles.grid}>
            {plants.map((plant) => (
              <a
                key={plant.id}
                href={`/plants/${plant.id}`}
                style={styles.card}
              >
                <div style={styles.imagePlaceholder}>
                  <span>🌿</span>
                </div>
                <div style={styles.cardContent}>
                  <h3 style={styles.plantName}>{plant.commonName}</h3>
                  <p style={styles.scientificName}>{plant.scientificName}</p>
                  {plant.nativeRegions && (
                    <p style={styles.regions}>
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

export default function PlantsPage() {
  return (
    <Suspense fallback={<div style={{ padding: '3rem', textAlign: 'center' }}>Loading...</div>}>
      <PlantsContent />
    </Suspense>
  );
}
