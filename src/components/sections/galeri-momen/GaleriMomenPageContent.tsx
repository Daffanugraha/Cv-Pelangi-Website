"use client";

import React, { useState, useMemo } from "react";
import GaleriMomenHero from "./GaleriMomenHero";
import GaleriMomenFilters from "./GaleriMomenFilters";
import GaleriMomenHighlightShowcase from "./GaleriMomenHighlightShowcase";
import GaleriMomenAlbums from "./GaleriMomenAlbums";
import GaleriMomenLightboxModal from "./GaleriMomenLightboxModal";
import { MOMEN_ALBUMS, MomenPhoto } from "@/lib/data/galeriMomen";

export default function GaleriMomenPageContent() {
  const [activeFilter, setActiveFilter] = useState("all");
  const [selectedPhoto, setSelectedPhoto] = useState<MomenPhoto | null>(null);

  // Flat list of all photos for seamless cycling in Lightbox
  const allPhotos = useMemo(() => {
    return MOMEN_ALBUMS.flatMap((album) => album.photos);
  }, []);

  const currentPhotoIndex = useMemo(() => {
    if (!selectedPhoto) return -1;
    return allPhotos.findIndex((p) => p.src === selectedPhoto.src);
  }, [selectedPhoto, allPhotos]);

  const handlePrevPhoto = () => {
    if (currentPhotoIndex === -1) return;
    const prevIdx = (currentPhotoIndex - 1 + allPhotos.length) % allPhotos.length;
    setSelectedPhoto(allPhotos[prevIdx]);
  };

  const handleNextPhoto = () => {
    if (currentPhotoIndex === -1) return;
    const nextIdx = (currentPhotoIndex + 1) % allPhotos.length;
    setSelectedPhoto(allPhotos[nextIdx]);
  };

  return (
    <div className="w-full bg-surface min-h-[calc(100vh-80px)] pt-0 font-body-md text-body antialiased selection:bg-bracket-border selection:text-white">
      {/* 1. Hero Section */}
      <GaleriMomenHero />

      {/* 2. Filter Pills Track */}
      <GaleriMomenFilters
        activeFilter={activeFilter}
        onFilterChange={setActiveFilter}
      />

      {/* 3. Dark Minimalist Highlight Showcase */}
      <GaleriMomenHighlightShowcase
        onSelectPhoto={setSelectedPhoto}
        onFilterChange={setActiveFilter}
      />

      {/* 4. Full Albums Showcase */}
      <GaleriMomenAlbums
        activeFilter={activeFilter}
        onSelectPhoto={setSelectedPhoto}
      />

      {/* 5. Lightbox Modal */}
      <GaleriMomenLightboxModal
        photo={selectedPhoto}
        onClose={() => setSelectedPhoto(null)}
        onPrev={handlePrevPhoto}
        onNext={handleNextPhoto}
      />
    </div>
  );
}
