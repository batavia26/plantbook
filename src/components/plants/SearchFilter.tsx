"use client";

import { useState } from "react";
import { Search, MapPin, SlidersHorizontal, X } from "lucide-react";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";

interface SearchFilterProps {
  onSearch: (query: string) => void;
  onFilterRegion: (region: string) => void;
  onFilterType: (type: string) => void;
  onFilterDifficulty: (difficulty: string) => void;
  currentRegion?: string;
}

const regions = [
  "All Regions",
  "North America",
  "Europe",
  "Asia",
  "South America",
  "Africa",
  "Australia",
  "Southeast Asia",
  "South Asia",
];

const plantTypes = [
  "All Types",
  "Flowering",
  "Succulent",
  "Tree",
  "Shrub",
  "Fern",
  "Herb",
  "Grass",
  "Vine",
  "Aquatic",
];

const difficulties = ["All", "Easy", "Moderate", "Hard"];

export function SearchFilter({
  onSearch,
  onFilterRegion,
  onFilterType,
  onFilterDifficulty,
  currentRegion,
}: SearchFilterProps) {
  const [showFilters, setShowFilters] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRegion, setSelectedRegion] = useState(currentRegion || "All Regions");
  const [selectedType, setSelectedType] = useState("All Types");
  const [selectedDifficulty, setSelectedDifficulty] = useState("All");

  return (
    <div className="space-y-3">
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <Input
            placeholder="Search plants..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              onSearch(e.target.value);
            }}
            className="pl-10"
          />
          {searchQuery && (
            <button
              onClick={() => { setSearchQuery(""); onSearch(""); }}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
        <Button
          variant={showFilters ? "primary" : "outline"}
          size="icon"
          onClick={() => setShowFilters(!showFilters)}
        >
          <SlidersHorizontal className="h-4 w-4" />
        </Button>
      </div>

      {showFilters && (
        <div className="rounded-xl border border-plant-100 bg-white p-4 space-y-3">
          <div>
            <label className="text-xs font-medium text-gray-600 mb-1 block">
              <MapPin className="inline h-3 w-3 mr-1" />
              Region
            </label>
            <div className="flex flex-wrap gap-1.5">
              {regions.map((region) => (
                <button
                  key={region}
                  onClick={() => {
                    setSelectedRegion(region);
                    onFilterRegion(region === "All Regions" ? "" : region);
                  }}
                  className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${
                    selectedRegion === region
                      ? "bg-plant-600 text-white"
                      : "bg-plant-50 text-plant-700 hover:bg-plant-100"
                  }`}
                >
                  {region}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="text-xs font-medium text-gray-600 mb-1 block">Plant Type</label>
            <div className="flex flex-wrap gap-1.5">
              {plantTypes.map((type) => (
                <button
                  key={type}
                  onClick={() => {
                    setSelectedType(type);
                    onFilterType(type === "All Types" ? "" : type);
                  }}
                  className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${
                    selectedType === type
                      ? "bg-earth-500 text-white"
                      : "bg-earth-50 text-earth-700 hover:bg-earth-100"
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="text-xs font-medium text-gray-600 mb-1 block">Care Difficulty</label>
            <div className="flex gap-1.5">
              {difficulties.map((d) => (
                <button
                  key={d}
                  onClick={() => {
                    setSelectedDifficulty(d);
                    onFilterDifficulty(d === "All" ? "" : d);
                  }}
                  className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${
                    selectedDifficulty === d
                      ? "bg-plant-600 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {d}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
