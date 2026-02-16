"use client";

import { GeoLocation } from "@/types";

export function getCurrentLocation(): Promise<GeoLocation> {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error("Geolocation is not supported by your browser"));
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
          accuracy: position.coords.accuracy,
        });
      },
      (error) => {
        reject(error);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 300000,
      }
    );
  });
}

// Map coordinates to rough region
export function coordsToRegion(lat: number, lng: number): string {
  // Simplified region mapping
  if (lat >= 25 && lat <= 50 && lng >= -130 && lng <= -60) return "North America";
  if (lat >= -5 && lat <= 25 && lng >= -120 && lng <= -30) return "Central America";
  if (lat >= -60 && lat <= -5 && lng >= -85 && lng <= -30) return "South America";
  if (lat >= 35 && lat <= 72 && lng >= -25 && lng <= 45) return "Europe";
  if (lat >= -40 && lat <= 38 && lng >= -20 && lng <= 55) return "Africa";
  if (lat >= 0 && lat <= 55 && lng >= 45 && lng <= 150) return "Asia";
  if (lat >= 5 && lat <= 40 && lng >= 65 && lng <= 100) return "South Asia";
  if (lat >= -10 && lat <= 25 && lng >= 90 && lng <= 145) return "Southeast Asia";
  if (lat >= -50 && lat <= -10 && lng >= 110 && lng <= 180) return "Australia";
  return "Unknown";
}
