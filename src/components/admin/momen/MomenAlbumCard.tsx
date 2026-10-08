"use client";

import React from "react";
import type { MomenAlbumItem } from "@/lib/admin/db";

interface MomenAlbumCardProps {
  album: MomenAlbumItem;
  onEdit: (album: MomenAlbumItem) => void;
  onDelete: (album: MomenAlbumItem) => void;
}

export default function MomenAlbumCard({
  album,
  onEdit,
  onDelete,
}: MomenAlbumCardProps) {
  return (
    <div className="bg-white border border-gray-200/80 rounded-2xl p-5 sm:p-6 shadow-xs hover:border-[#F65456]/30 transition-all flex flex-col justify-between group">
      <div>
        {/* Card Header: Title, Category Badge, Action Buttons */}
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 pb-4 border-b border-gray-100">
          <div className="space-y-1">
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="text-lg font-heading font-black text-gray-900 group-hover:text-[#F65456] transition-colors">
                {album.title}
              </h2>
              <span className="text-[11px] font-mono px-2.5 py-0.5 rounded-full bg-gray-100 text-gray-700 border border-gray-200">
                #{album.category}
              </span>
              {album.isHighlight && (
                <span className="text-[11px] font-mono px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-700 border border-amber-200 flex items-center gap-1">
                  <span className="material-symbols-outlined text-xs">star</span> Highlight
                </span>
              )}
            </div>
            <p className="text-xs text-gray-500 font-sans line-clamp-2 leading-relaxed">
              {album.desc}
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0 self-end sm:self-auto">
            <button
              type="button"
              onClick={() => onEdit(album)}
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl border border-gray-200 hover:border-[#F65456] hover:text-[#F65456] bg-gray-50 hover:bg-red-50/50 text-xs font-semibold text-gray-700 transition cursor-pointer"
            >
              <span className="material-symbols-outlined text-sm">edit</span>
              <span>Edit</span>
            </button>
            <button
              type="button"
              onClick={() => onDelete(album)}
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl border border-red-200 hover:bg-red-50 text-xs font-semibold text-red-600 transition cursor-pointer"
            >
              <span className="material-symbols-outlined text-sm">delete</span>
              <span>Hapus</span>
            </button>
          </div>
        </div>

        {/* Photo Thumbnails Preview */}
        <div className="pt-4">
          <div className="flex items-center justify-between mb-3">
            <p className="text-xs font-bold text-gray-700 uppercase tracking-wider font-mono">
              Daftar Foto ({album.photos?.length || 0} Foto)
            </p>
            <span className="text-[11px] text-gray-400">
              Klik Edit untuk menambah/mengubah foto & caption
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-3">
            {album.photos?.slice(0, 6).map((photo, pIdx) => (
              <div
                key={pIdx}
                className="relative group/thumb rounded-xl overflow-hidden border border-gray-200 bg-gray-50 aspect-video shadow-2xs"
              >
                <img
                  src={photo.src}
                  alt={photo.alt || photo.title || "Foto momen"}
                  className="w-full h-full object-cover group-hover/thumb:scale-105 transition-transform duration-300"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover/thumb:opacity-100 transition-opacity p-2 flex flex-col justify-end text-white text-[10px]">
                  <p className="font-bold truncate">{photo.cardTitle || photo.title}</p>
                  <p className="text-gray-300 line-clamp-1 text-[9px]">{photo.caption}</p>
                </div>
              </div>
            ))}
            {album.photos && album.photos.length > 6 && (
              <button
                type="button"
                onClick={() => onEdit(album)}
                className="rounded-xl border border-dashed border-gray-300 bg-gray-50 flex flex-col items-center justify-center p-2 text-center aspect-video cursor-pointer hover:bg-red-50/50 hover:border-[#F65456] transition"
              >
                <span className="text-xs font-bold text-gray-600">
                  +{album.photos.length - 6} Lainnya
                </span>
                <span className="text-[10px] text-gray-400">Lihat semua</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
