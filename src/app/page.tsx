'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function HomePage() {
  const router = useRouter();
  const [location, setLocation] = useState<string>('');

  const styles = {
    container: {
      minHeight: '100vh',
      padding: '4rem 1rem',
    },
    title: {
      textAlign: 'center' as const,
      fontSize: '3rem',
      fontWeight: 'bold',
      color: '#065f46',
      marginBottom: '1rem',
    },
    subtitle: {
      textAlign: 'center' as const,
      fontSize: '1.25rem',
      color: '#047857',
      marginBottom: '3rem',
    },
    cardsContainer: {
      maxWidth: '800px',
      margin: '0 auto',
      display: 'flex',
      flexDirection: 'column' as const,
      gap: '1.5rem',
    },
    card: {
      background: 'white',
      borderRadius: '1rem',
      padding: '2rem',
      boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
    },
    cardHeader: {
      display: 'flex',
      alignItems: 'center',
      gap: '1rem',
      marginBottom: '1rem',
    },
    icon: {
      fontSize: '2.5rem',
    },
    cardTitle: {
      fontSize: '1.5rem',
      fontWeight: '600',
      marginBottom: '0.25rem',
    },
    cardDesc: {
      color: '#6b7280',
    },
    button: {
      width: '100%',
      background: '#059669',
      color: 'white',
      padding: '0.75rem 1.5rem',
      borderRadius: '0.5rem',
      border: 'none',
      fontSize: '1rem',
      fontWeight: '500',
      cursor: 'pointer',
    },
    input: {
      flex: 1,
      border: '1px solid #d1d5db',
      borderRadius: '0.5rem',
      padding: '0.75rem 1rem',
      fontSize: '1rem',
    },
    inputGroup: {
      display: 'flex',
      gap: '0.5rem',
    },
    link: {
      textAlign: 'center' as const,
      marginTop: '2rem',
      color: '#047857',
      fontWeight: '500',
    },
  };

  return (
    <div style={styles.container}>
      <div className="container">
        <h1 style={styles.title}>🌱 PlantBook</h1>
        <p style={styles.subtitle}>
          Identify plants with AI • Discover species by location
        </p>

        <div style={styles.cardsContainer}>
          <div style={styles.card}>
            <div style={styles.cardHeader}>
              <span style={styles.icon}>📸</span>
              <div>
                <h2 style={styles.cardTitle}>Identify a Plant</h2>
                <p style={styles.cardDesc}>Take a photo or upload an image</p>
              </div>
            </div>
            <button style={styles.button} onClick={() => router.push('/identify')}>
              Start Identification
            </button>
          </div>

          <div style={styles.card}>
            <div style={styles.cardHeader}>
              <span style={styles.icon}>🗺️</span>
              <div>
                <h2 style={styles.cardTitle}>Discover by Location</h2>
                <p style={styles.cardDesc}>Find plants native to your area</p>
              </div>
            </div>
            <div style={styles.inputGroup}>
              <input
                style={styles.input}
                type="text"
                placeholder="Enter location (e.g., California, Europe)"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter' && location.trim()) {
                    router.push(`/plants?location=${encodeURIComponent(location)}`);
                  }
                }}
              />
              <button
                style={{...styles.button, width: 'auto'}}
                onClick={() => {
                  if (location.trim()) {
                    router.push(`/plants?location=${encodeURIComponent(location)}`);
                  }
                }}
              >
                Search
              </button>
            </div>
          </div>

          <div style={styles.card}>
            <div style={styles.cardHeader}>
              <span style={styles.icon}>📚</span>
              <div>
                <h2 style={styles.cardTitle}>Browse Field Guide</h2>
                <p style={styles.cardDesc}>Explore our plant database</p>
              </div>
            </div>
            <button style={styles.button} onClick={() => router.push('/plants')}>
              Browse Plants
            </button>
          </div>
        </div>

        <div style={styles.link}>
          <a href="/my-garden">View My Garden →</a>
        </div>
      </div>
    </div>
  );
}
