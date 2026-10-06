"use client";

import React from "react";
import { MOMEN_ALBUMS, MomenPhoto } from "@/lib/data/galeriMomen";

interface GaleriMomenAlbumsProps {
  activeFilter: string;
  onSelectPhoto: (photo: MomenPhoto) => void;
}

export default function GaleriMomenAlbums({
  activeFilter,
  onSelectPhoto,
}: GaleriMomenAlbumsProps) {
  const visibleAlbums =
    activeFilter === "all"
      ? MOMEN_ALBUMS
      : MOMEN_ALBUMS.filter((a) => a.category === activeFilter);

  return (
    <div className="w-full space-y-0">
      {visibleAlbums.map((album) => {
        const isHut = album.category === "hut79";
        const isMomen = album.category === "momenpertama";

        return (
          <section
            key={album.category}
            data-album-category={album.category}
            className={`w-full py-12 album-container relative border-b border-bracket-border/15 ${
              isHut
                ? "bg-gradient-to-b from-[#FFF0F1] via-[#FFF8F8] to-[#FFF1F2]"
                : isMomen
                ? "bg-gradient-to-b from-[#FFF9F5] via-surface to-[#FFF5ED]"
                : "bg-gradient-to-b from-[#FFF5F5] via-surface to-[#FFF8F8]"
            }`}
          >
            {/* Album Header */}
            <div className="max-w-[1440px] mx-auto px-6 lg:px-12 flex flex-col md:flex-row md:items-end justify-between mb-6">
              <div>
                <h2 className="font-headline-xl text-headline-xl text-on-surface font-bold">
                  {album.title}
                </h2>
                <p className="font-body-md text-text-muted mt-1 max-w-3xl leading-relaxed">
                  {album.desc}
                </p>
              </div>
              <span className="text-xs font-semibold text-text-muted bg-white/80 px-3 py-1 rounded-full border border-surface-container-high mt-2 md:mt-0 self-start md:self-auto">
                {album.photos.length} Foto Dokumentasi
              </span>
            </div>

            {/* Photo Cards Grid / Scrollable Track */}
            <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 py-3">
                {album.photos.map((photo, pIdx) => (
                  <div
                    key={pIdx}
                    onClick={() => onSelectPhoto(photo)}
                    className="rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer hover:scale-105 bg-surface-container-lowest border border-surface-container-high flex flex-col group"
                  >
                    <div className="relative w-full aspect-[4/3] overflow-hidden bg-black/5">
                      <img
                        className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                        alt={photo.alt}
                        src={photo.src}
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <span className="w-10 h-10 rounded-full bg-surface-canvas text-bracket-border flex items-center justify-center shadow-lg">
                          <span translate="no" className="material-symbols-outlined notranslate text-[20px]">
                            zoom_in
                          </span>
                        </span>
                      </div>
                    </div>

                    <div className="p-4 flex-1 flex flex-col justify-between bg-surface-container-lowest">
                      <div>
                        <h3 className="font-headline-sm text-sm font-bold text-on-surface leading-snug group-hover:text-bracket-border transition-colors">
                          {photo.cardTitle}
                        </h3>
                        <p className="font-body-sm text-xs text-text-muted mt-1 line-clamp-2 leading-relaxed">
                          {photo.cardDesc}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        );
      })}
    </div>
  );
}
