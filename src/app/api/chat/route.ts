import { NextRequest, NextResponse } from "next/server";
import { getSmartAdvisorReply } from "@/lib/chatbotAdvisor";

interface HistoryMessage {
  sender?: string;
  text?: string;
}

/**
 * Mengonversi output teks dari LLM (Markdown) menjadi struktur HTML bersih
 * dengan dukungan:
 * - List tidak berurut (bullet points: * atau -) -> <ul class="..."><li>...</li></ul>
 * - List berurut (1. item) -> <ol class="..."><li>...</li></ol>
 * - Bold (**teks**) -> <strong>teks</strong>
 * - Italic (*teks*) -> <em>teks</em>
 * - Paragraf biasa -> <p class="...">...</p>
 */
function formatLlmResponseToHtml(raw: string): string {
  // Bersihkan block code markdown jika LLM membungkus outputnya
  let text = raw.replace(/```[a-z]*\n?/gi, "").trim();

  // Jika teks sudah berupa HTML lengkap dengan tag <p> atau <ul> atau <div>, jangan diubah berlebihan
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

    // Bold formatting: **text** atau __text__
    line = line.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
    line = line.replace(/__(.*?)__/g, "<strong>$1</strong>");

    // Italic formatting: *text* atau _text_ (pastikan tidak bentrok dengan sisa karakter)
    line = line.replace(/(^|[^*])\*(?!\s)([^*]+?)\*(?!\*)/g, "$1<em>$2</em>");
    line = line.replace(/(^|[^_])_(?!\s)([^_]+?)_(?!_)/g, "$1<em>$2</em>");

    // Check bullet list: * item atau - item atau • item
    if (/^[-*•]\s+/.test(line)) {
      if (inOl) {
        result.push("</ol>");
        inOl = false;
      }
      if (!inUl) {
        result.push('<ul class="my-2 space-y-1.5 pl-4 list-disc text-neutral-800">');
        inUl = true;
      }
      const itemContent = line.replace(/^[-*•]\s+/, "");
      result.push(`<li class="leading-relaxed">${itemContent}</li>`);
    }
    // Check numbered list: 1. item
    else if (/^\d+\.\s+/.test(line)) {
      if (inUl) {
        result.push("</ul>");
        inUl = false;
      }
      if (!inOl) {
        result.push('<ol class="my-2 space-y-1.5 pl-4 list-decimal text-neutral-800">');
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

      // Hindari membungkus ganda jika baris sudah diawali tag HTML block
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

    const systemPrompt = `Anda adalah "Pelangi Assistant", konsultan teknis finishing cetak & grosir bahan baku resmi dari CV Pelangi UV ("When Quality Be A Priority", berdiri sejak 2004).

DATABASE LENGKAP & PRICELIST RESMI DARI SELURUH HALAMAN WEBSITE CV PELANGI UV:
(Setiap kali pengguna menanyakan harga, layanan, atau bahan baku, SEBUTKAN DATA DAN ANGKA HARGA PASTI DI BAWAH INI secara langsung, jangan berbelit-belit atau bilang harga tidak ada!)

1. LOKASI, OPERASIONAL, & KONTAK RESMI:
   - Lokasi: Kompleks Pergudangan Bizpark Blok C17-C19, Jabon, Tambaksawah, Kec. Waru, Kabupaten Sidoarjo, Jawa Timur 61256 (akses strategis dekat Bandara Juanda & Tol Rungkut).
   - Jam Buka: Senin – Jumat: 07.30 – 15.30 WIB | Sabtu: 07.30 – 13.00 WIB | Minggu & Libur Nasional: Tutup (produksi shift jalan untuk pesanan besar).
   - WhatsApp Marketing/Konsultasi: 0822 3101 9363 (atau +62 822-3101-9363)
   - Telepon Kantor: (031) 866 7469 / (031) 867 7468
   - Email: info@pelangiuv.com

2. PRICELIST GROSIR BAHAN BAKU RESMI (READY STOCK BIZPARK SIDOARJO):
   A. BAHAN BAKU FOIL STAMPING (Halaman /produk/bahan-baku?category=foil):
      - Roll Foil Gold (120 Meter / 64cm x 120m): Rp 186.000 / roll
      - Roll Foil Silver (120 Meter / 64cm x 120m): Rp 186.000 / roll
      - Roll Foil Warna - Warni (Red, Blue, Green, Copper 120m): Rp 227.000 / roll
      - Roll Foil Gold & Silver Hologram Laser (120m): Rp 314.500 / roll
      - Roll Foil Transparan (Security Ghost Stamp 120m): Rp 360.500 / roll
      - Roll Foil Putih BO1 (Pigment White Stamp): Rp 398.000 / roll
      - Roll Foil White BO1 (Extra Width Roll Jumbo): Rp 815.500 / roll
      * Spesifikasi: Suhu transfer 100°C - 120°C, lepas rilis presisi tanpa serabut, tahan gesekan, tersedia juga panjang jumbo hingga 3.000 meter.

   B. FILM PLASTIK BOPP / THERMAL LAMINASI (Halaman /produk/bahan-baku?category=opp):
      - BOPP Glossy 20 mic: Rp 41.100 / roll
      - Glossy Waterbase 12 mic: Rp 46.500 / roll
      - OPP Glossy Waterbase 30 mic: Rp 47.500 / roll
      - Thermal Glossy 22, 24, 27 mic: Rp 48.000 / roll
      - Doff Waterbase 15 mic: Rp 49.000 / roll
      - Glossy Waterbase 12 mic (Spek Khusus): Rp 49.500 / roll
      - Thermal Glossy 4000m (Jumbo): Rp 52.000 / roll
      - Thermal Doff 4000m (Jumbo): Rp 53.000 / roll
      - Thermall Glossy 18 mic: Rp 56.000 / roll
      - Thermal Glossy 3000m (Jumbo): Rp 56.000 / roll
      - Thermall Doff 18 mic: Rp 57.000 / roll
      - PET Metalize: Rp 73.100 / roll
      * Fitur: Corona dyne ≥ 42 dynes/cm, FREE Slitting belah roll custom lebar 200 mm - 1200 mm akurasi ±0.5 mm.

   C. LEM WET & DRY LAMINATING LENGKAP (Halaman /produk/bahan-baku?category=lem):
      - Lem Wet Laminating (Waterbase Emulsion): Rp 45.000 / Pail atau Kg
      - Lem Dry / Lem Laminating A: Rp 40.000 / Pail atau Kg
      - Lem Dry / Lem Laminating B: Rp 45.000 / Pail atau Kg
      - Lem Polygum: Rp 37.000 / Pail atau Kg
      - Creasing Matrix: Rp 15.000 / Pcs strip rel pond
      - Hand Roll Stretch Film: Rp 91.500 / Roll

   D. TINTA & VARNISH SPOT UV LUMINEX (Halaman /produk/bahan-baku?category=spotuv):
      - WB Glossy (Waterbase Coat): Rp 35.200 / Kg atau Can
      - Tinta Tex 20 Varnish: Rp 40.500 / Kg atau Can
      - Tinta UV Full Varnish: Rp 95.000 / Kg atau Can
      - Tinta Spot UV Standard: Rp 165.000 / Kg atau Can
      - Tinta Spot UV Mix: Rp 168.000 / Kg atau Can
      - Bluish High Gloss Varnish: Rp 173.000 / Kg atau Can
      - Tinta Spot UV HG - 25 Cepat Kering: Rp 246.500 / Kg atau Can
      - Tinta Spot UV Matte (Doff): Rp 408.500 / Kg atau Can

3. TARIF JASA FINISHING LENGKAP (Halaman /layanan):
   - Jasa Hot Stamp Foil Gold / Silver: Rp 1,08 / cm² (Min. order Rp 300.000)
   - Jasa Hot Stamp Warna-Warni: Rp 1,7 / cm² (Min. order Rp 300.000)
   - Jasa Hot Stamp Hologram Prismatik: Rp 2,0 / cm² (Min. order Rp 300.000)
   - Jasa Cold Foil Silver/Gold: Rp 2,5 / cm² | Warna: Rp 2 / cm² | Hologram: Rp 2,5 / cm²
   - Jasa Spot UV Gloss: Rp 0,22 / cm² | Spot UV Matte: Rp 0,25 / cm² | Spot UV Pasir: Rp 0,25 / cm² (Min. order Rp 300.000)
   - Jasa Laminating Doff Halus: Rp 0,24 / cm² | Laminating Gloss Bening: Rp 0,163 / cm² | Hologram: Rp 0,31 / cm²
   - Jasa Laminating Window Mika: 12 mic: Rp 0,17/cm² | 20 mic: Rp 0,21/cm² | 25 mic: Rp 0,22/cm² | 30 mic: Rp 0,24/cm²
   - Jasa Pond & Die-Cut: Plong Otomatis Rp 80/lembar (Min Rp 500k) | Plong Manual Rp 80/lembar (Min Rp 200k)
   - Jasa Micro Emboss: Rp 270 / lembar (Min order Rp 500k) | Pembuatan Plat Klise Micro Emboss: Rp 3.000.000 / plat
   - Jasa Emboss & Deboss: Emboss Manual Rp 90/lembar (Min Rp 200k) | Emboss Otomatis Rp 100/lembar (Min Rp 300k)
   - Jasa Transfer Metalized: Silver Rp 0,403/cm² | Gold Rp 0,53/cm² | Rainbow Rp 0,46/cm²
   - Jasa Transfer PET: Silver Rp 0,26/cm² | Gold Rp 0,43/cm² | Rainbow Rp 0,46/cm²
   - Jasa Rewinding Foil Roll: Rp 50.000 / roll
   - Jasa Potong Foil (Slitting Custom): Rp 50.000 / roll (atau Free Slitting untuk pembelian bahan baku roll jumbo tertentu)

4. FASILITAS & LOGISTIK UNGGULAN:
   - Antar-Jemput Plano Cetakan GRATIS se-Jawa Timur (Surabaya, Sidoarjo, Gresik, Mojokerto, Pasuruan, Malang) armada truk boks mandiri.
   - 35+ Mesin Otomatis, kapasitas 200.000+ lembar/hari.
   - Swatch Sample Kit Fisik GRATIS dikirim ke workshop mitra.

ATURAN PERCAKAPAN (SANGAT KETAT):
1. JIKA USER TANYA HARGA (Contoh: "harga foilnya berapa aja ya"):
   - JAWAB LANGSUNG DENGAN DAFTAR HARGA LENGKAP YANG TERCANTUM DI ATAS!
   - Pisahkan antara harga bahan baku roll (Rp 186.000 untuk Gold/Silver 120m, dst.) dan tarif jasa hot stamp per cm² (Rp 1,08/cm²).
   - Format dalam bentuk bullet points yang rapi dan terstruktur: **Nama Varian:** Harga satuan.
   - JANGAN PERNAH mengatakan "harga bervariasi dan tidak ada satu harga tetap" tanpa menyebutkan nominal harga yang ada di database web! Tampilkan harganya terlebih dahulu dengan bangga dan transparan.
2. MEMORI NAMA & MULTI-TURN CONTEXT:
   - Jika di history user minta dipanggil "Daffa", panggil selalu "Pak Daffa" atau "Daffa".
   - Pertahankan topik yang sedang dibicarakan.
   - Dilarang sapaan alay seperti "hai kak", gunakan bahasa profesional, lugas, dan terpercaya.`;

    // 1. Prioritas Utama: Groq API (Qwen 3.8 / LLaMA berkecepatan tinggi)
    if (groqApiKey) {
      try {
        // 0. Keamanan Input: Pindai Pesan dengan meta-llama/llama-prompt-guard-2-22m
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

            // Jika skor ancaman > 0.85 (indikasi prompt injection / jailbreak berbahaya)
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

        // Sertakan hingga 10 pesan riwayat terakhir agar bot mengingat nama dan alur percakapan
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
              temperature: 0.2,
              max_tokens: 750,
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
              `Halo Tim Marketing CV Pelangi UV, saya ingin order/konsultasi harga: ${message.slice(
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

    // 2. Alternatif: Gemini LLM jika diatur
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
                temperature: 0.2,
                maxOutputTokens: 750,
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
