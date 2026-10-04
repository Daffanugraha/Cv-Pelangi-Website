import React from "react";
import { pillarsData } from "@/lib/data";

export default function PillarsSection() {
  const getIcon = (type: string) => {
    switch (type) {
      case "quality":
        return (
          <svg
            className="w-8 h-8 stroke-bracket-border fill-none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.75"
            viewBox="0 0 24 24"
          >
            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
            <circle cx="9" cy="7" r="4"></circle>
            <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
            <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
            <path d="m9 11 2 2 4-4"></path>
          </svg>
        );
      case "pricing":
        return (
          <svg
            className="w-8 h-8 stroke-bracket-border fill-none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.75"
            viewBox="0 0 24 24"
          >
            <line x1="12" x2="12" y1="1" y2="23"></line>
            <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
            <circle className="stroke-on-surface/20" cx="12" cy="12" r="9"></circle>
          </svg>
        );
      case "delivery":
        return (
          <svg
            className="w-8 h-8 stroke-bracket-border fill-none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.75"
            viewBox="0 0 24 24"
          >
            <rect height="13" width="15" x="1" y="3"></rect>
            <polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon>
            <circle cx="5.5" cy="18.5" r="2.5"></circle>
            <circle cx="18.5" cy="18.5" r="2.5"></circle>
          </svg>
        );
      default:
        return (
          <svg
            className="w-8 h-8 stroke-bracket-border fill-none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.75"
            viewBox="0 0 24 24"
          >
            <polygon points="12 2 2 7 12 12 22 7 12 2"></polygon>
            <polyline points="2 17 12 22 22 17"></polyline>
            <polyline points="2 12 12 17 22 12"></polyline>
          </svg>
        );
    }
  };

  return (
    <section className="w-full bg-surface-canvas pb-space-3xl relative">
      <div className="max-w-7xl mx-auto px-gutter">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-space-lg">
          {pillarsData.map((pillar, idx) => (
            <div
              key={idx}
              className="bg-surface-neutral-alt p-space-lg rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1"
            >
              <div className="w-14 h-14 rounded-2xl bg-surface-canvas flex items-center justify-center mb-space-md shadow-sm text-bracket-border">
                {getIcon(pillar.icon)}
              </div>
              <h3 className="font-headline-sm text-headline-sm text-on-surface font-bold">
                {pillar.title}
              </h3>
              <div className="w-10 h-1 bg-bracket-border rounded-full my-space-xs"></div>
              <p className="font-body-sm text-body-sm text-text-body leading-relaxed">
                {pillar.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
