/**
 * @file src/lib/data.ts
 * Modular Data Architecture:
 * Data previously in this single 900+ line file is now cleanly separated
 * into domain modules under src/lib/data/:
 * - navigation.ts: Navbar links & navigation structures
 * - hero.ts: Hero testimonials
 * - stats.ts: Company statistics
 * - about.ts: About slides, pillars, and why choose us
 * - journey.ts: Milestone timeline phases and gallery
 * - products.ts: Finishing services and raw materials
 * - partners.ts: Client and partner logos & configurations
 * - gallery.ts: Instagram reels & application videos
 * - articles.ts: Blog articles and guides
 * - faq.ts: Frequently asked questions
 * - search.ts: Search modal catalog data
 * - chatbot.ts: Chatbot quick responses & knowledge
 * - contact.ts: Marketing team members & client testimonials
 *
 * This file re-exports everything from src/lib/data/index for full backward compatibility.
 */

export * from "./data/index";
