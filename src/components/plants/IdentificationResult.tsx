"use client";

import { Check, AlertTriangle, ChevronRight, Droplets, Sun, Thermometer } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { getConfidenceColor, getConfidenceLabel } from "@/lib/utils";
import Link from "next/link";

interface IdentificationResultProps {
  result: {
    plantName: string;
    scientificName: string;
    family: string;
    confidence: number;
    description: string;
    careInstructions: {
      water: string;
      sunlight: string;
      soil: string;
      temperature: string;
    };
    toxicity: string;
    suggestions: Array<{
      name: string;
      scientificName: string;
      confidence: number;
    }>;
    matchedPlantId?: string;
  };
  imageUrl: string;
}

export function IdentificationResult({ result, imageUrl }: IdentificationResultProps) {
  const confidencePercent = Math.round(result.confidence * 100);

  return (
    <div className="space-y-4">
      {/* Main result */}
      <Card className="overflow-hidden">
        <div className="relative">
          <img
            src={imageUrl}
            alt={result.plantName}
            className="h-48 w-full object-cover"
          />
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
            <h2 className="text-2xl font-bold text-white">{result.plantName}</h2>
            <p className="text-sm italic text-white/80">{result.scientificName}</p>
          </div>
        </div>

        <CardContent className="pt-4 space-y-4">
          {/* Confidence */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <span className="text-sm font-medium text-gray-600">Confidence</span>
              <span className={`text-sm font-bold ${getConfidenceColor(result.confidence)}`}>
                {confidencePercent}%
              </span>
            </div>
            <div className="h-2 rounded-full bg-gray-100 overflow-hidden">
              <div
                className="confidence-bar h-full rounded-full bg-plant-500"
                style={{ "--confidence": `${confidencePercent}%` } as any}
              />
            </div>
            <p className={`text-xs mt-1 ${getConfidenceColor(result.confidence)}`}>
              {getConfidenceLabel(result.confidence)}
            </p>
          </div>

          {/* Info badges */}
          <div className="flex flex-wrap gap-2">
            <Badge variant="info">{result.family}</Badge>
            {result.toxicity && (
              <Badge variant={result.toxicity === "Non-toxic" ? "success" : "danger"}>
                {result.toxicity === "Non-toxic" ? (
                  <><Check className="mr-1 h-3 w-3" /> Safe</>
                ) : (
                  <><AlertTriangle className="mr-1 h-3 w-3" /> {result.toxicity}</>
                )}
              </Badge>
            )}
          </div>

          {/* Description */}
          <p className="text-sm text-gray-600 leading-relaxed">{result.description}</p>

          {/* Care instructions */}
          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-xl bg-blue-50 p-3">
              <div className="flex items-center gap-1 text-xs font-medium text-blue-700 mb-1">
                <Droplets className="h-3 w-3" /> Water
              </div>
              <p className="text-xs text-blue-600">{result.careInstructions.water}</p>
            </div>
            <div className="rounded-xl bg-yellow-50 p-3">
              <div className="flex items-center gap-1 text-xs font-medium text-yellow-700 mb-1">
                <Sun className="h-3 w-3" /> Sunlight
              </div>
              <p className="text-xs text-yellow-600">{result.careInstructions.sunlight}</p>
            </div>
            <div className="rounded-xl bg-orange-50 p-3">
              <div className="flex items-center gap-1 text-xs font-medium text-orange-700 mb-1">
                <Thermometer className="h-3 w-3" /> Temperature
              </div>
              <p className="text-xs text-orange-600">{result.careInstructions.temperature}</p>
            </div>
            <div className="rounded-xl bg-green-50 p-3">
              <div className="flex items-center gap-1 text-xs font-medium text-green-700 mb-1">
                🌱 Soil
              </div>
              <p className="text-xs text-green-600">{result.careInstructions.soil}</p>
            </div>
          </div>

          {result.matchedPlantId && (
            <Link href={`/plants/${result.matchedPlantId}`}>
              <Button variant="outline" className="w-full">
                View Full Plant Details
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          )}
        </CardContent>
      </Card>

      {/* Alternative suggestions */}
      {result.suggestions && result.suggestions.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Other Possibilities</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {result.suggestions.map((suggestion, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between rounded-xl border border-plant-100 p-3"
                >
                  <div>
                    <p className="text-sm font-medium text-plant-900">
                      {suggestion.name}
                    </p>
                    <p className="text-xs italic text-gray-500">
                      {suggestion.scientificName}
                    </p>
                  </div>
                  <span
                    className={`text-sm font-bold ${getConfidenceColor(
                      suggestion.confidence
                    )}`}
                  >
                    {Math.round(suggestion.confidence * 100)}%
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
