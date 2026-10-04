import React from "react";
import { partnersData } from "@/lib/data";

export default function PartnersSection() {
  return (
    <section
      className="w-full relative overflow-hidden"
      id="partner"
      style={{ scrollMarginTop: "80px" }}
    >
      <div
        className="w-full relative bg-white text-on-surface py-space-2xl overflow-hidden"
        style={{
          borderTop: "2px solid",
          borderBottom: "2px solid",
          borderImage:
            "linear-gradient(90deg, rgb(230, 33, 41) 0%, rgb(254, 209, 0) 50%, rgb(0, 155, 76) 100%) 1 / 1 / 0 stretch",
        }}
      >
        <div className="absolute -right-24 -top-20 w-96 h-96 rounded-full bg-bracket-border/5 filter blur-3xl pointer-events-none"></div>
        <div className="absolute -left-24 -bottom-20 w-96 h-96 rounded-full bg-accent-gold/5 filter blur-3xl pointer-events-none"></div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 lg:px-16 text-center mb-8">
          <div className="inline-flex items-center justify-center gap-2 mb-2">
            <span className="w-2.5 h-1 bg-bracket-border rounded-full"></span>
            <span className="font-label-meta text-label-meta uppercase tracking-widest text-bracket-border font-bold">
              Kolaborasi Industri
            </span>
            <span className="w-2.5 h-1 bg-bracket-border rounded-full"></span>
          </div>
          <h2 className="font-headline-xl text-headline-xl text-navbar-black font-bold leading-tight">
            Partner Kami
          </h2>
          <p className="font-body-md text-body-md text-text-body mt-1.5 max-w-2xl mx-auto">
            Dipercaya oleh ratusan industri percetakan, offset packaging, dan
            brand terkemuka di seluruh Indonesia.
          </p>
        </div>

        {/* Marquee with left/right fade masks */}
        <div className="relative w-full overflow-hidden">
          <div className="absolute left-0 top-0 bottom-0 w-24 sm:w-36 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none"></div>
          <div className="absolute right-0 top-0 bottom-0 w-24 sm:w-36 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none"></div>

          <div className="partner-marquee-infinite items-center gap-6 sm:gap-8 py-4">
            {/* 2 repetitions for infinite scrolling */}
            {[...Array(2)].map((_, loopIdx) => (
              <div key={loopIdx} className="flex items-center gap-6 sm:gap-8">
                {partnersData.map((partner, idx) =>
                  partner.logo ? (
                    // Logo tanpa kotak / no background langsung
                    <div
                      key={idx}
                      className="h-20 px-4 sm:px-6 flex items-center justify-center transition-all duration-300 hover:scale-110 cursor-pointer group select-none shrink-0"
                      title={partner.name}
                    >
                      <img
                        src={partner.logo}
                        alt={partner.name || "Partner Logo"}
                        className="h-11 sm:h-14 w-auto object-contain max-w-[180px] sm:max-w-[210px] transition-transform duration-300 drop-shadow-sm"
                        loading="lazy"
                      />
                    </div>
                  ) : (
                    // Partner teks kartu di background putih
                    <div
                      key={idx}
                      className="h-20 px-6 sm:px-8 rounded-2xl bg-surface-neutral-alt border border-surface-container hover:border-bracket-border hover:bg-white flex items-center justify-center transition-all duration-300 hover:scale-105 cursor-pointer group shadow-sm hover:shadow-md select-none shrink-0"
                      title={partner.name}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          translate="no"
                          className={`notranslate w-10 h-10 rounded-xl bg-gradient-to-br ${partner.color} flex items-center justify-center text-white font-black text-xs sm:text-sm shadow-sm group-hover:rotate-6 transition-transform shrink-0`}
                        >
                          {partner.code}
                        </div>
                        <span
                          translate="no"
                          className="notranslate font-headline-sm text-sm sm:text-base font-extrabold tracking-wider text-navbar-black group-hover:text-bracket-border transition-colors uppercase whitespace-nowrap"
                        >
                          {partner.name}
                        </span>
                      </div>
                    </div>
                  )
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
