"use client";

import React, { useState, useMemo } from "react";
import {
  featuredArticle,
  articlesData,
  ArticleItem,
} from "@/lib/data/articles";
import BlogHero from "./BlogHero";
import BlogFilters from "./BlogFilters";
import BlogFeaturedCard from "./BlogFeaturedCard";
import BlogGrid from "./BlogGrid";
import BlogPagination from "./BlogPagination";
import BlogReaderModal from "./BlogReaderModal";

const ITEMS_PER_PAGE = 6;

export default function BlogPageContent() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedArticle, setSelectedArticle] = useState<ArticleItem | null>(null);

  // Filter articles based on category and search query
  const filteredArticles = useMemo(() => {
    let list = [...articlesData];

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
          art.category.toLowerCase().includes(q) ||
          (art.technicalChips &&
            art.technicalChips.some((chip) => chip.toLowerCase().includes(q)))
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

  // Determine if featured card should be shown
  const showFeaturedCard =
    !searchQuery.trim() &&
    (activeCategory === "all" || activeCategory === featuredArticle.categoryKey);

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
        totalArticles={filteredArticles.length + (showFeaturedCard ? 1 : 0)}
      />

      {/* 3. Featured Article Highlight of the Month */}
      {showFeaturedCard && (
        <BlogFeaturedCard
          article={featuredArticle}
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
