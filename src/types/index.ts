export interface Plant {
  id: string;
  commonName: string;
  scientificName: string;
  family: string;
  description: string;
  careInstructions: CareInstructions;
  nativeRegions: NativeRegions;
  toxicity: string | null;
  imageUrl: string | null;
  plantType: string | null;
  careDifficulty: string | null;
  createdAt: Date;
}

export interface CareInstructions {
  water: string;
  sunlight: string;
  soil: string;
  temperature: string;
  humidity?: string;
  fertilizer?: string;
  pruning?: string;
}

export interface NativeRegions {
  regions: string[];
  hardinessZones?: string[];
  climate?: string;
}

export interface UserPlant {
  id: string;
  userId: string;
  plantId: string;
  notes: string | null;
  locationFound: { lat: number; lng: number } | null;
  photoUrl: string | null;
  identifiedAt: Date;
  plant?: Plant;
}

export interface Identification {
  id: string;
  userId: string | null;
  imageUrl: string;
  resultPlantId: string | null;
  confidence: number | null;
  location: { lat: number; lng: number } | null;
  resultData: IdentificationResult | null;
  createdAt: Date;
  resultPlant?: Plant | null;
}

export interface IdentificationResult {
  plantName: string;
  scientificName: string;
  confidence: number;
  description: string;
  matchedPlantId?: string;
  suggestions: PlantSuggestion[];
}

export interface PlantSuggestion {
  name: string;
  scientificName: string;
  confidence: number;
  plantId?: string;
}

export interface GeoLocation {
  lat: number;
  lng: number;
  accuracy?: number;
}
