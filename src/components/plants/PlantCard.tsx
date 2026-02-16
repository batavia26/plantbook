"use client";

import Link from "next/link";
import { MapPin, Droplets, Sun } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { getDifficultyColor } from "@/lib/utils";
import type { Plant } from "@/types";

interface PlantCardProps {
  plant: Plant;
}

export function PlantCard({ plant }: PlantCardProps) {
  const care = plant.careInstructions as any;
  const regions = plant.nativeRegions as any;

  return (
    <Link href={`/plants/${plant.id}`}>
      <Card className="group overflow-hidden transition-all duration-200 hover:shadow-md hover:-translate-y-0.5">
        <div className="relative aspect-[4/3] overflow-hidden bg-plant-100">
          {plant.imageUrl ? (
            <img
              src={plant.imageUrl}
              alt={plant.commonName}
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full items-center justify-center">
              <span className="text-4xl">🌿</span>
            </div>
          )}
          {plant.careDifficulty && (
            <span
              className={`absolute top-2 right-2 rounded-full px-2 py-0.5 text-xs font-medium ${getDifficultyColor(
                plant.careDifficulty
              )}`}
            >
              {plant.careDifficulty}
            </span>
          )}
        </div>
        <div className="p-4">
          <h3 className="font-semibold text-plant-900 group-hover:text-plant-600 transition-colors">
            {plant.commonName}
          </h3>
          <p className="text-sm italic text-gray-500">{plant.scientificName}</p>
          <div className="mt-2 flex flex-wrap gap-1">
            {regions?.regions?.slice(0, 2).map((region: string) => (
              <Badge key={region} variant="default" className="text-[10px]">
                <MapPin className="mr-1 h-3 w-3" />
                {region}
              </Badge>
            ))}
          </div>
          <div className="mt-3 flex items-center gap-3 text-xs text-gray-500">
            {care?.water && (
              <span className="flex items-center gap-1">
                <Droplets className="h-3 w-3 text-blue-500" />
                {care.water.split(" ").slice(0, 2).join(" ")}
              </span>
            )}
            {care?.sunlight && (
              <span className="flex items-center gap-1">
                <Sun className="h-3 w-3 text-yellow-500" />
                {care.sunlight.split(" ").slice(0, 2).join(" ")}
              </span>
            )}
          </div>
          {plant.toxicity && plant.toxicity !== "Non-toxic" && (
            <p className="mt-2 text-xs text-red-600">⚠️ {plant.toxicity}</p>
          )}
        </div>
      </Card>
    </Link>
  );
}
