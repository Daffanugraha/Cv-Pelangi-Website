import { NextRequest, NextResponse } from "next/server";
import { getSmartAdvisorReply } from "@/lib/chatbotAdvisor";

interface HistoryMessage {
  sender?: string;
  text?: string;
}

/**
 * Mengonversi output teks dari LLM (Markdown) menjadi struktur HTML bersih:
 * - List (bullet / angka) -> <ul>/<ol>
 * - Bold (**teks**) -> <strong>teks</strong>
 * - Italic (*teks*) -> <em>teks</em>
 * - Paragraf biasa -> <p>
 */
function formatLlmResponseToHtml(raw: string): string {
  let text = raw.replace(/```[a-z]*\n?/gi, "").trim();

  if (/<(p|ul|ol|div|li)[^>]*>/i.test(text) && !text.includes("* ") && !text.includes("- ")) {
    return text;
  }

  const lines = text.split("\n");
  const result: string[] = [];
  let inUl = false;
  let inOl = false;

  for (let i = 0; i < lines.length; i++) {
    let line = lines[i].trim();

    if (!line) {
      if (inUl) {
        result.push("</ul>");
        inUl = false;
      }
      if (inOl) {
        result.push("</ol>");
        inOl = false;
      }
      continue;
    }

    line = line.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
    line = line.replace(/__(.*?)__/g, "<strong>$1</strong>");
    line = line.replace(/(^|[^*])\*(?!\s)([^*]+?)\*(?!\*)/g, "$1<em>$2</em>");
    line = line.replace(/(^|[^_])_(?!\s)([^_]+?)_(?!_)/g, "$1<em>$2</em>");

    if (/^[-*•]\s+/.test(line)) {
      if (inOl) {
        result.push("</ol>");
        inOl = false;
      }
      if (!inUl) {
        result.push('<ul class="my-2 space-y-1 pl-4 list-disc text-neutral-800">');
        inUl = true;
      }
      const itemContent = line.replace(/^[-*•]\s+/, "");
      result.push(`<li class="leading-relaxed">${itemContent}</li>`);
    } else if (/^\d+\.\s+/.test(line)) {
      if (inUl) {
        result.push("</ul>");
        inUl = false;
      }
      if (!inOl) {
        result.push('<ol class="my-2 space-y-1 pl-4 list-decimal text-neutral-800">');
        inOl = true;
      }
      const itemContent = line.replace(/^\d+\.\s+/, "");
      result.push(`<li class="leading-relaxed">${itemContent}</li>`);
    } else {
      if (inUl) {
        result.push("</ul>");
        inUl = false;
      }
      if (inOl) {
        result.push("</ol>");
        inOl = false;
      }

      if (/^<(p|h\d|div|ul|ol|table|blockquote)/i.test(line)) {
        result.push(line);
      } else {
        result.push(`<p class="mb-2 leading-relaxed text-neutral-800">${line}</p>`);
      }
    }
  }

  if (inUl) result.push("</ul>");
  if (inOl) result.push("</ol>");

  return result.join("");
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { message, conversationHistory } = body as {
      message?: string;
      conversationHistory?: HistoryMessage[];
    };

    if (!message || typeof message !== "string") {
      return NextResponse.json(
        { error: "Pesan tidak boleh kosong" },
        { status: 400 }
      );
    }

    const groqApiKey = process.env.GROQ_API_KEY;
    const groqModel = process.env.GROQ_MODEL || "qwen/qwen3.8-27b";
    const geminiApiKey = process.env.GEMINI_API_KEY;

    const systemPrompt = `Anda adalah "Pelangi Assistant", konsultan teknis AI resmi dari CV Pelangi UV ("When Quality Be A Priority", berdiri sejak 2004 di Bizpark Sidoarjo).

KNOWLEDGE BASE LENGKAP DARI SELURUH HALAMAN WEBSITE CV PELANGI UV:
1. INFORMASI PERUSAHAAN & LOGISTIK:
   - Alamat Pabrik: Kompleks Pergudangan Bizpark Blok C17-C19, Jabon, Tambaksawah, Kec. Waru, Kabupaten Sidoarjo, Jawa Timur 61256.
   - Jam Buka: Senin–Jumat 07.30–15.30 WIB, Sabtu 07.30–13.00 WIB.
   - WhatsApp Marketing: 0822 3101 9363 | Telepon: (031) 866 7469 / (031) 867 7468 | Email: info@pelangiuv.com.
   - Layanan Logistik: Antar-Jemput Plano Cetakan GRATIS se-Jawa Timur (Surabaya, Sidoarjo, Gresik, Mojokerto, Pasuruan, Malang) armada truk boks tertutup mandiri.
   - Kapasitas: 35+ unit mesin otomatis (mampu s/d 200.000+ lembar/hari).
   - Sample Kit: Swatch Sample Kit fisik GRATIS dikirim ke workshop rekanan.

2. DATABASE HARGA RESMI WEBSITE:
   A. GROSIR FOIL (Halaman /produk/bahan-baku?category=foil):
      - Roll Foil Gold / Silver (120m, 64cm): Rp 186.000 / roll
      - Warna-Warni (Merah, Biru, Hijau, Tembaga 120m): Rp 227.000 / roll
      - Hologram Laser Gold/Silver (120m): Rp 314.500 / roll
      - Transparan Security Stamp (120m): Rp 360.500 / roll
      - Putih BO1: Rp 398.000 / roll | White BO1 Jumbo: Rp 815.500 / roll
   B. JASA HOT STAMP FOIL & FINISHING (Halaman /layanan):
      - Jasa Hot Stamp Foil Gold / Silver: Rp 1,08 / cm² (Min. order Rp 300.000)
      - Jasa Hot Stamp Warna: Rp 1,7 / cm² | Hologram: Rp 2,0 / cm²
      - Cold Foil Inline: Rp 2,5 / cm²
      - Spot UV Gloss: Rp 0,22 / cm² | Matte / Pasir: Rp 0,25 / cm²
      - Laminating Doff: Rp 0,24 / cm² | Gloss: Rp 0,163 / cm² | Window Mika: mulai Rp 0,17 / cm²
      - Pond Die-Cut: Rp 80 / lembar | Micro Emboss: Rp 270 / lembar (Plat klise Rp 3.000.000) | Emboss 3D: Rp 90-100 / lembar
   C. FILM BOPP & THERMAL (Halaman /produk/bahan-baku?category=opp):
      - BOPP Glossy: Rp 41.100 - Rp 56.000 / roll | Doff: Rp 49.000 - Rp 57.000 / roll | PET Metalize: Rp 73.100 / roll (Free Slitting lebar 200-1200mm).
   D. LEM & VARNISH (Halaman /produk/bahan-baku):
      - Lem Wet & Dry: Rp 40.000 - Rp 45.000 / pail atau kg
      - Tinta Spot UV: mulai Rp 35.200 (WB Glossy) s/d Rp 165.000 - Rp 246.500 / can

CARA MENJAWAB SEBAGAI AI KONSULTAN PINTAR (SANGAT PENTING):
1. JAWABAN SINGKAT, CERDAS, DAN ADAPTIF (BUKAN TEMPLATE / BUKAN DAFTAR PANJANG MEMBOSANKAN):
   - Jawab secara ringkas, luwes, dan padat (1-2 paragraf singkat atau 2-4 poin inti yang paling relevan dengan pertanyaan).
   - JANGAN meng-copy paste seluruh katalog atau membuat list panjang lebar kecuali user secara spesifik meminta "sebutkan semua harganya".
   - Jika user bertanya harga secara umum (misal: "harga foilnya berapa aja ya"), sebutkan gambaran rentang harga intinya dan varian terpopuler dengan to the point:
     Contoh alur cerdas:
     Sebutkan langsung bahwa untuk bahan baku roll foil (120m), varian Gold & Silver mulai dari Rp 186.000/roll, Warna-warni Rp 227.000, hingga Hologram Rp 314.500/roll. Sedangkan untuk jasa aplikasinya per cm² adalah Rp 1,08/cm² (Gold/Silver). Lalu tanya kebutuhan spesifiknya apakah butuh bahan baku roll atau jasa pengerjaannya.
2. MEMAHAMI KONTEKS DAN RELEVANSI PERCAKAPAN (MULTI-TURN MEMORY):
   - Ingat percakapan sebelumnya dan informasi pengguna. Jika user memperkenalkan diri (misal namanya Daffa), sapa dengan sopan "Pak Daffa" atau "Daffa".
   - Jika percakapan sebelumnya membahas kemasan rokok, kaitkan rekomendasi dengan kemasan rokok tanpa harus mengulang penjelasan dari nol.
   - Pahami setiap isi website secara organik, diskusikan seperti konsultan ahli percetakan manusia yang cerdas, bukan bot kaku penjawab keyword.
3. LARANGAN:
   - DILARANG menggunakan sapaan alay seperti "hai kak", "halo kak".
   - DILARANG memberikan jawaban generik menghindar seperti "harga bervariasi dan tidak ada harga pasti". Anda punya data harga resmi website, berikan angka riilnya secara ringkas!`;

    // 1. Prioritas Utama: Groq API
    if (groqApiKey) {
      try {
        // Keamanan Input dengan prompt guard
        try {
          const guardRes = await fetch(
            "https://api.groq.com/openai/v1/chat/completions",
            {
              method: "POST",
              headers: {
                Authorization: `Bearer ${groqApiKey}`,
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                model: "meta-llama/llama-prompt-guard-2-22m",
                messages: [{ role: "user", content: message }],
                max_tokens: 1,
              }),
            }
          );

          if (guardRes.ok) {
            const guardData = await guardRes.json();
            const guardScoreRaw = guardData.choices?.[0]?.message?.content;
            const guardScore = parseFloat(guardScoreRaw);

            if (!isNaN(guardScore) && guardScore > 0.85) {
              return NextResponse.json({
                html: `<p class="text-neutral-800 leading-relaxed">Pertanyaan yang diajukan tidak dapat diproses. Mohon ajukan pertanyaan seputar layanan finishing cetak, spesifikasi teknis, atau bahan baku CV Pelangi UV.</p>`,
                chips: [
                  "Layanan Finishing Cetak",
                  "Pricelist Bahan Baku",
                  "Alamat Pabrik & Jam Buka",
                  "Kontak WhatsApp Marketing",
                ],
              });
            }
          }
        } catch (guardErr) {
          console.warn("Prompt guard check failed, proceeding safely:", guardErr);
        }

        const groqMessages: { role: string; content: string }[] = [
          { role: "system", content: systemPrompt },
        ];

        if (Array.isArray(conversationHistory)) {
          for (const msg of conversationHistory.slice(-10)) {
            if (!msg.text || !msg.text.trim()) continue;
            groqMessages.push({
              role: msg.sender === "user" ? "user" : "assistant",
              content: msg.text.trim(),
            });
          }
        }

        groqMessages.push({ role: "user", content: message });

        const groqRes = await fetch(
          "https://api.groq.com/openai/v1/chat/completions",
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${groqApiKey}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              model: groqModel,
              messages: groqMessages,
              temperature: 0.4,
              max_tokens: 450,
            }),
          }
        );

        if (groqRes.ok) {
          const groqData = await groqRes.json();
          const generatedText: string | undefined =
            groqData.choices?.[0]?.message?.content;

          if (generatedText) {
            let cleanHtml = formatLlmResponseToHtml(generatedText);

            const waUrl = `https://wa.me/6282231019363?text=${encodeURIComponent(
              `Halo Tim Marketing CV Pelangi UV, saya ingin tanya/konsultasi: ${message.slice(
                0,
                80
              )}`
            )}`;

            cleanHtml += `
              <div class="pt-2 flex flex-wrap gap-2">
                <a href="${waUrl}" target="_blank" class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-neutral-900 hover:bg-black text-white text-[11px] font-medium transition-all shadow-xs">
                  <span class="w-1.5 h-1.5 rounded-full bg-[#25D366]"></span>
                  <span>Hubungi Marketing via WhatsApp</span>
                  <span class="material-symbols-outlined text-[13px] text-neutral-400">arrow_forward</span>
                </a>
              </div>
            `;

            return NextResponse.json({
              html: cleanHtml,
              chips: [
                "Cek Stok Roll Foil Gold/Silver",
                "Harga Jasa Hot Stamp Foil",
                "Pricelist Film BOPP Thermal",
                "Minta Swatch Sample Kit Gratis",
              ],
            });
          }
        }
      } catch (err) {
        console.error("Groq API error, attempting fallback:", err);
      }
    }

    // 2. Alternatif Gemini LLM
    if (geminiApiKey) {
      try {
        const contents: { role: string; parts: { text: string }[] }[] = [];

        if (Array.isArray(conversationHistory)) {
          for (const msg of conversationHistory.slice(-10)) {
            if (!msg.text || !msg.text.trim()) continue;
            contents.push({
              role: msg.sender === "user" ? "user" : "model",
              parts: [{ text: msg.text.trim() }],
            });
          }
        }

        contents.push({
          role: "user",
          parts: [{ text: message }],
        });

        const response = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${geminiApiKey}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              contents,
              systemInstruction: {
                parts: [{ text: systemPrompt }],
              },
              generationConfig: {
                temperature: 0.4,
                maxOutputTokens: 450,
              },
            }),
          }
        );

        if (response.ok) {
          const data = await response.json();
          const generatedText: string | undefined =
            data.candidates?.[0]?.content?.parts?.[0]?.text;

          if (generatedText) {
            let cleanHtml = formatLlmResponseToHtml(generatedText);

            const waUrl = `https://wa.me/6282231019363?text=${encodeURIComponent(
              `Halo Tim Marketing CV Pelangi UV, saya ingin konsultasi teknis: ${message.slice(
                0,
                80
              )}`
            )}`;

            cleanHtml += `
              <div class="pt-2 flex flex-wrap gap-2">
                <a href="${waUrl}" target="_blank" class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-neutral-900 hover:bg-black text-white text-[11px] font-medium transition-all shadow-xs">
                  <span class="w-1.5 h-1.5 rounded-full bg-[#25D366]"></span>
                  <span>Hubungi Marketing via WhatsApp</span>
                  <span class="material-symbols-outlined text-[13px] text-neutral-400">arrow_forward</span>
                </a>
              </div>
            `;

            return NextResponse.json({
              html: cleanHtml,
              chips: [
                "Cek Stok Roll Foil Gold/Silver",
                "Harga Jasa Hot Stamp Foil",
                "Pricelist Film BOPP Thermal",
                "Minta Swatch Sample Kit Gratis",
              ],
            });
          }
        }
      } catch (err) {
        console.error("Gemini API Error, falling back to local advisor:", err);
      }
    }

    // 3. Fallback: Menggunakan Local Expert Advisor Engine Pelangi UV
    const advisorResult = getSmartAdvisorReply(message);
    return NextResponse.json(advisorResult);
  } catch (error) {
    console.error("Chat API error:", error);
    const fallback = getSmartAdvisorReply("halo");
    return NextResponse.json(fallback);
  }
}
