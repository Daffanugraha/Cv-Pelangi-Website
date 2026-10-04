"use client";

import React, { useEffect } from "react";
import Script from "next/script";

declare global {
  interface Window {
    google?: {
      translate?: {
        TranslateElement: new (
          options: {
            pageLanguage: string;
            includedLanguages?: string;
            autoDisplay?: boolean;
            layout?: unknown;
          },
          elementId: string
        ) => unknown;
      };
    };
    googleTranslateElementInit?: () => void;
    protectTechnicalTerms?: () => void;
    restoreOriginalLanguage?: () => void;
  }
}

export default function GoogleTranslator() {
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
    if (typeof window !== "undefined" && window.protectTechnicalTerms) {
      window.protectTechnicalTerms();
    }
  }, []);

  return (
    <>
      <div
        id="google_translate_element"
        style={{
          display: "none",
          position: "absolute",
          top: "-9999px",
          left: "-9999px",
        }}
        aria-hidden="true"
      />
      {mounted && (
        <>
          <Script
            id="google-translate-init"
            strategy="lazyOnload"
            dangerouslySetInnerHTML={{
              __html: `
                function protectAllIcons() {
                  var els = document.querySelectorAll('.material-symbols-outlined, .material-symbols-rounded, .material-symbols-sharp, .material-icons, [class*="material-symbols"]');
                  for (var i = 0; i < els.length; i++) {
                    els[i].setAttribute('translate', 'no');
                    if (!els[i].classList.contains('notranslate')) {
                      els[i].classList.add('notranslate');
                    }
                  }
                }

                function protectTechnicalTerms() {
                  protectAllIcons();
                }
                window.protectTechnicalTerms = protectTechnicalTerms;

                window.restoreOriginalLanguage = function() {
                  var combo = document.querySelector('.goog-te-combo');
                  if (combo) {
                    combo.value = '';
                    combo.dispatchEvent(new Event('change'));
                  }
                };

                function googleTranslateElementInit() {
                  protectAllIcons();
                  if (window.google && window.google.translate) {
                    new window.google.translate.TranslateElement({
                      pageLanguage: 'id',
                      includedLanguages: 'en',
                      autoDisplay: false
                    }, 'google_translate_element');
                  }
                }
                window.googleTranslateElementInit = googleTranslateElementInit;
              `,
            }}
          />
          <Script
            id="google-translate-script"
            strategy="lazyOnload"
            src="https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
          />
        </>
      )}
    </>
  );
}
