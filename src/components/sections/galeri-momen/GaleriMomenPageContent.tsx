"use client";

import React, { useState, useMemo, useEffect } from "react";
import GaleriMomenHero from "./GaleriMomenHero";
import GaleriMomenFilters from "./GaleriMomenFilters";
import GaleriMomenHighlightShowcase from "./GaleriMomenHighlightShowcase";
import GaleriMomenAlbums from "./GaleriMomenAlbums";
import GaleriMomenLightboxModal from "./GaleriMomenLightboxModal";
import { MOMEN_ALBUMS, MOMEN_FILTERS, MOMEN_HIGHLIGHTS, MomenAlbum, MomenHighlight, MomenPhoto } from "@/lib/data/galeriMomen";
import type { MomenAlbumItem } from "@/lib/admin/db";

interface GaleriMomenPageContentProps {
  initialAlbums?: MomenAlbumItem[];
}

export default function GaleriMomenPageContent({ initialAlbums }: GaleriMomenPageContentProps) {
  const [albums, setAlbums] = useState<MomenAlbumItem[]>(initialAlbums || (MOMEN_ALBUMS as MomenAlbumItem[]));
  const [activeFilter, setActiveFilter] = useState("all");
  const [selectedPhoto, setSelectedPhoto] = useState<MomenPhoto | null>(null);

  // Client-side fetch to ensure live sync with admin changes
  useEffect(() => {
    async function fetchLiveMomen() {
      try {
        const res = await fetch("/api/momen");
        if (res.ok) {
          const data = await res.json();
          if (data?.albums && Array.isArray(data.albums)) {
            setAlbums(data.albums);
          }
        }
      } catch (err) {
        console.warn("Using initial momen data:", err);
      }
    }
    fetchLiveMomen();
  }, []);

  // Compute dynamic filters based on current albums and presets
  const dynamicFilters = useMemo(() => {
    const existingKeys = new Set(MOMEN_FILTERS.map((f) => f.key));
    const filters = [...MOMEN_FILTERS];

    albums.forEach((album) => {
      if (album.category && !existingKeys.has(album.category)) {
        existingKeys.add(album.category);
        filters.push({
          key: album.category,
          label: album.title,
        });
      }
    });

    return filters;
  }, [albums]);

  // Compute dynamic highlights from albums (highlight-marked or first photo of each album)
  const dynamicHighlights = useMemo<MomenHighlight[]>(() => {
    const customHighlights: MomenHighlight[] = [];
    const seenCategories = new Set<string>();

    albums.forEach((album) => {
      if (album.isHighlight !== false && album.photos?.length > 0 && !seenCategories.has(album.category)) {
        seenCategories.add(album.category);
        const firstPhoto = album.photos[0];
        customHighlights.push({
          filterKey: album.category,
          title: album.title,
          desc: album.desc,
          img: firstPhoto.src,
          caption: firstPhoto.caption || album.desc,
          photos: album.photos || [],
        });
      }
    });

    return customHighlights.length > 0 ? customHighlights : MOMEN_HIGHLIGHTS;
  }, [albums]);

  // Flat list of all photos for seamless cycling in Lightbox
  const allPhotos = useMemo(() => {
    return albums.flatMap((album) => album.photos || []);
  }, [albums]);

  const currentPhotoIndex = useMemo(() => {
    if (!selectedPhoto) return -1;
    return allPhotos.findIndex((p) => p.src === selectedPhoto.src);
  }, [selectedPhoto, allPhotos]);

  const handlePrevPhoto = () => {
    if (currentPhotoIndex === -1 || allPhotos.length === 0) return;
    const prevIdx = (currentPhotoIndex - 1 + allPhotos.length) % allPhotos.length;
    setSelectedPhoto(allPhotos[prevIdx]);
  };

  const handleNextPhoto = () => {
    if (currentPhotoIndex === -1 || allPhotos.length === 0) return;
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
        filters={dynamicFilters}
      />

      {/* 3. Dark Minimalist Highlight Showcase */}
      <GaleriMomenHighlightShowcase
        onSelectPhoto={setSelectedPhoto}
        onFilterChange={setActiveFilter}
        highlights={dynamicHighlights}
      />

      {/* 4. Full Albums Showcase */}
      <GaleriMomenAlbums
        activeFilter={activeFilter}
        onSelectPhoto={setSelectedPhoto}
        albums={albums}
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
