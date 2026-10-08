"use client";

import React from "react";
import type { BlogArticleItem } from "@/lib/admin/db";

interface BlogArticleCardProps {
  article: BlogArticleItem;
  onEdit: (article: BlogArticleItem) => void;
  onDelete: (id: string, title: string) => void;
}

export default function BlogArticleCard({
  article,
  onEdit,
  onDelete,
}: BlogArticleCardProps) {
  return (
    <div className="bg-white rounded-2xl border border-gray-200/90 shadow-xs hover:border-[#F65456]/30 hover:shadow-md transition-all duration-200 overflow-hidden flex flex-col justify-between group">
      <div>
        {/* Thumbnail Image Container */}
        <div className="aspect-[16/9] bg-gray-100 relative overflow-hidden">
          {article.img ? (
            <img
              src={article.img}
              alt={article.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              loading="lazy"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-400">
              <span className="material-symbols-outlined text-4xl">newspaper</span>
            </div>
          )}

          {/* Badges on Thumbnail */}
          <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between gap-1.5 pointer-events-none">
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-white/90 backdrop-blur-sm text-gray-900 border border-gray-200 shadow-xs">
              {article.category || "Berita"}
            </span>
            {article.isFeatured && (
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-400 text-black shadow-xs flex items-center gap-1">
                <span className="material-symbols-outlined text-xs">star</span>
                Sorotan
              </span>
            )}
          </div>
        </div>

        {/* Content Details */}
        <div className="p-4 sm:p-5 space-y-2.5">
          <div className="flex items-center gap-2 text-[11px] text-gray-400 font-mono">
            <span>{article.date || "Terbit"}</span>
            <span>•</span>
            <span>{article.readTime || "4 Menit"}</span>
            <span>•</span>
            <span>{article.views || "0 Views"}</span>
          </div>

          <h3
            className="font-heading font-black text-base text-gray-900 group-hover:text-[#F65456] transition-colors line-clamp-2 leading-snug"
            title={article.title}
          >
            {article.title}
          </h3>

          <p className="text-xs text-gray-500 line-clamp-3 leading-relaxed font-sans">
            {article.desc}
          </p>

          <div className="pt-2 flex items-center gap-2 text-xs text-gray-600">
            <span className="material-symbols-outlined text-sm text-gray-400">person</span>
            <span className="font-semibold text-gray-700">{article.author || "Admin Pelangi UV"}</span>
          </div>
        </div>
      </div>

      {/* Action Footer */}
      <div className="p-3 bg-gray-50/80 border-t border-gray-100 flex items-center justify-between gap-2">
        <a
          href={`/blog#${article.slug}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-xs font-semibold text-gray-600 hover:text-gray-900 px-2.5 py-1.5 rounded-lg hover:bg-gray-200/60 transition"
        >
          <span className="material-symbols-outlined text-sm">open_in_new</span>
          <span>Lihat Publik</span>
        </a>

        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={() => onEdit(article)}
            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl border border-gray-200 hover:border-[#F65456] hover:text-[#F65456] bg-white text-xs font-bold text-gray-700 transition cursor-pointer shadow-2xs"
          >
            <span className="material-symbols-outlined text-sm">edit</span>
            <span>Edit</span>
          </button>
          <button
            type="button"
            onClick={() => onDelete(article.id, article.title)}
            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl border border-red-200 hover:bg-red-50 text-xs font-bold text-red-600 transition cursor-pointer shadow-2xs"
          >
            <span className="material-symbols-outlined text-sm">delete</span>
            <span>Hapus</span>
          </button>
        </div>
      </div>
    </div>
  );
}
