"use client";

import React, { useState, useMemo } from "react";
import {
  featuredArticle,
  articlesData,
  ArticleItem,
  getTopicHighlights,
} from "@/lib/data/articles";
import BlogHero from "./BlogHero";
import BlogFilters from "./BlogFilters";
import BlogHighlightShowcase from "./BlogHighlightShowcase";
import BlogGrid from "./BlogGrid";
import BlogPagination from "./BlogPagination";
import BlogReaderModal from "./BlogReaderModal";

const ITEMS_PER_PAGE = 6;

export default function BlogPageContent() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedArticle, setSelectedArticle] = useState<ArticleItem | null>(null);

  // Ambil 1 artikel sorotan per topik
  const highlightArticles = useMemo(() => {
    const list = getTopicHighlights();
    if (activeCategory === "all") return list;
    return list.filter((a) => a.categoryKey === activeCategory);
  }, [activeCategory]);

  // Filter articles based on category and search query
  const filteredArticles = useMemo(() => {
    let list = [featuredArticle, ...articlesData];

    // Filter by Category
    if (activeCategory !== "all") {
      list = list.filter((art) => art.categoryKey === activeCategory);
    }

    // Filter by Search Query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      list = list.filter(
        (art) =>
          art.title.toLowerCase().includes(q) ||
          art.desc.toLowerCase().includes(q) ||
          art.category.toLowerCase().includes(q)
      );
    }

    return list;
  }, [activeCategory, searchQuery]);

  // Calculate pagination
  const totalPages = Math.ceil(filteredArticles.length / ITEMS_PER_PAGE) || 1;
  const paginatedArticles = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredArticles.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredArticles, currentPage]);

  const handleSearchChange = (q: string) => {
    setSearchQuery(q);
    setCurrentPage(1);
  };

  const handleCategoryChange = (cat: string) => {
    setActiveCategory(cat);
    setCurrentPage(1);
  };

  const handleResetFilters = () => {
    setSearchQuery("");
    setActiveCategory("all");
    setCurrentPage(1);
  };

  // Tampilkan highlight jika tidak sedang mengetik search
  const showHighlights = !searchQuery.trim() && highlightArticles.length > 0;

  return (
    <div className="flex flex-col w-full bg-surface-canvas selection:bg-bracket-border selection:text-white">
      {/* 1. Hero with Cinematic Industrial Banner & Rotating Title */}
      <BlogHero />

      {/* 2. Interactive Search & Category Filter Controls */}
      <BlogFilters
        searchQuery={searchQuery}
        onSearchChange={handleSearchChange}
        activeCategory={activeCategory}
        onCategoryChange={handleCategoryChange}
        totalArticles={filteredArticles.length}
      />

      {/* 3. Sorotan Artikel per Topik (Gaya Sorotan Galeri: 1 Gambar, 1 Topik) */}
      {showHighlights && (
        <BlogHighlightShowcase
          articles={highlightArticles}
          onReadArticle={(art) => setSelectedArticle(art)}
        />
      )}

      {/* 4. 3-Column Responsive Article Grid */}
      <BlogGrid
        articles={paginatedArticles}
        onReadArticle={(art) => setSelectedArticle(art)}
        onResetFilters={handleResetFilters}
      />

      {/* 5. Pagination Controls */}
      <BlogPagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={(p) => {
          setCurrentPage(p);
          const gridEl = document.getElementById("article-search");
          if (gridEl) {
            gridEl.scrollIntoView({ behavior: "smooth", block: "start" });
          }
        }}
      />

      {/* 6. Interactive Article Reader Lightbox Modal */}
      <BlogReaderModal
        article={selectedArticle}
        onClose={() => setSelectedArticle(null)}
      />
    </div>
  );
}
