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
      overflow: 'hidden',
    },
    imagePlaceholder: {
      width: '100%',
      height: '400px',
      background: '#d1fae5',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '8rem',
    },
    content: {
      padding: '2rem',
    },
    title: {
      fontSize: '2.5rem',
      fontWeight: 'bold',
      color: '#1f2937',
      marginBottom: '0.5rem',
    },
    scientificName: {
      fontSize: '1.25rem',
      color: '#6b7280',
      fontStyle: 'italic',
      marginBottom: '1.5rem',
    },
    section: {
      marginBottom: '1.5rem',
    },
    sectionTitle: {
      fontSize: '1.125rem',
      fontWeight: '600',
      color: '#1f2937',
      marginBottom: '0.5rem',
    },
    sectionText: {
      color: '#374151',
      lineHeight: '1.6',
    },
    regions: {
      display: 'flex',
      flexWrap: 'wrap' as const,
      gap: '0.5rem',
    },
    regionTag: {
      background: '#d1fae5',
      color: '#047857',
      padding: '0.5rem 1rem',
      borderRadius: '9999px',
      fontSize: '0.875rem',
    },
  };

  if (loading) {
    return (
      <div style={styles.container}>
        <div className="container" style={{ textAlign: 'center' }}>
          <p style={{ color: '#6b7280' }}>Loading...</p>
        </div>
      </div>
    );
  }

  if (!plant) {
    return (
      <div style={styles.container}>
        <div className="container" style={{ textAlign: 'center' }}>
          <p style={{ color: '#6b7280', marginBottom: '1rem' }}>Plant not found</p>
          <a href="/plants" style={styles.backLink}>
            ← Back to Plants
          </a>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <div className="container" style={styles.maxWidth}>
        <a href="/plants" style={styles.backLink}>
          ← Back to Plants
        </a>

        <div style={styles.card}>
          <div style={styles.imagePlaceholder}>
            <span>🌿</span>
          </div>

          <div style={styles.content}>
            <h1 style={styles.title}>{plant.commonName}</h1>
            <p style={styles.scientificName}>{plant.scientificName}</p>

            <div style={styles.section}>
              <h2 style={styles.sectionTitle}>Description</h2>
              <p style={styles.sectionText}>{plant.description}</p>
            </div>

            {plant.family && (
              <div style={styles.section}>
                <h2 style={styles.sectionTitle}>Family</h2>
                <p style={styles.sectionText}>{plant.family}</p>
              </div>
            )}

            {plant.careInstructions && (
              <div style={styles.section}>
                <h2 style={styles.sectionTitle}>Care Instructions</h2>
                <p style={styles.sectionText}>{plant.careInstructions}</p>
              </div>
            )}

            {plant.nativeRegions && plant.nativeRegions.length > 0 && (
              <div style={styles.section}>
                <h2 style={styles.sectionTitle}>Native Regions</h2>
                <div style={styles.regions}>
                  {plant.nativeRegions.map((region: string) => (
                    <span key={region} style={styles.regionTag}>
                      📍 {region}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {plant.toxicity && (
              <div style={styles.section}>
                <h2 style={styles.sectionTitle}>Toxicity</h2>
                <p style={styles.sectionText}>{plant.toxicity}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
