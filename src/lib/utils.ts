import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getConfidenceColor(confidence: number): string {
  if (confidence >= 0.8) return "text-green-600";
  if (confidence >= 0.5) return "text-yellow-600";
  return "text-red-600";
}

export function getConfidenceLabel(confidence: number): string {
  if (confidence >= 0.8) return "High confidence";
  if (confidence >= 0.5) return "Moderate confidence";
  return "Low confidence";
}

export function formatDate(date: Date | string): string {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function getDifficultyColor(difficulty: string): string {
  switch (difficulty?.toLowerCase()) {
    case "easy": return "bg-green-100 text-green-800";
    case "moderate": return "bg-yellow-100 text-yellow-800";
    case "hard": return "bg-red-100 text-red-800";
    default: return "bg-gray-100 text-gray-800";
  }
}

export function regionMatchesLocation(
  nativeRegions: { regions: string[] },
  userRegion?: string
): boolean {
  if (!userRegion || !nativeRegions?.regions) return false;
  return nativeRegions.regions.some(
    (r) => r.toLowerCase().includes(userRegion.toLowerCase())
  );
}
