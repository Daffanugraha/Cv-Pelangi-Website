import React from "react";

export default function TaglineBanner() {
  return (
    <section className="w-full py-space-3xl relative overflow-hidden bg-surface-canvas">
      <div className="max-w-7xl mx-auto px-gutter">
        <div
          className="relative rounded-[40px] overflow-hidden p-space-2xl md:p-space-3xl shadow-2xl border border-bracket-border/20"
          style={{
            background:
              "linear-gradient(145deg, #2b3242 0%, #1f2330 50%, #26212b 100%)",
          }}
        >
          {/* Subtle glows (no murky photo) */}
          <div className="absolute inset-0 z-0 pointer-events-none">
            <div className="absolute -right-24 -top-20 w-80 h-80 rounded-full bg-bracket-border/20 blur-3xl pointer-events-none"></div>
            <div className="absolute -left-20 -bottom-20 w-72 h-72 rounded-full bg-accent-gold/15 blur-3xl pointer-events-none"></div>
          </div>

          <div className="max-w-4xl mx-auto text-center space-y-space-md relative z-10">
            <div className="inline-flex items-center gap-2 px-space-md py-1.5 rounded-full bg-white/10 border border-bracket-border/40 backdrop-blur-md shadow-lg">
              <span className="w-2 h-2 bg-bracket-border rounded-full animate-pulse"></span>
              <span className="font-label-meta text-label-meta uppercase tracking-widest text-bracket-border font-bold">
                Prinsip Kami
              </span>
              <span className="w-2 h-2 bg-bracket-border rounded-full animate-pulse"></span>
            </div>

            <h2 className="font-headline-lg text-headline-lg text-white font-bold leading-relaxed max-w-3xl mx-auto [text-shadow:0_2px_12px_rgba(0,0,0,0.7)]">
              &ldquo;Kami mengedepankan kualitas, dengan pengerjaan yang terjamin
              dan harga dapat bersaing.&rdquo;
            </h2>

            <div className="py-space-md px-space-xl rounded-full bg-black/40 backdrop-blur-md shadow-2xl inline-block max-w-2xl mx-auto border border-bracket-border/50 hover:border-bracket-border transition-all duration-300">
              <p
                translate="no"
                className="notranslate font-headline-xl text-headline-xl text-bracket-border font-black italic tracking-tight leading-none [text-shadow:0_0_20px_rgba(246,84,86,0.45)]"
              >
                &ldquo;When Quality Be A Priority&rdquo;
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
