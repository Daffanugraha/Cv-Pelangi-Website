import fs from "fs";
import path from "path";
import { createClient } from "@supabase/supabase-js";

// Read .env.local
const envPath = path.join(process.cwd(), ".env.local");
if (fs.existsSync(envPath)) {
  const content = fs.readFileSync(envPath, "utf-8");
  for (const line of content.split("\n")) {
    const match = line.match(/^\s*([\w.-]+)\s*=\s*(.*)?\s*$/);
    if (match) {
      let val = (match[2] || "").trim();
      if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
        val = val.slice(1, -1);
      }
      process.env[match[1]] = val;
    }
  }
}

const BASE_URL = "http://localhost:3001";
const results = [];

function logPass(title, details = "") {
  console.log(`✅ [PASS] ${title} ${details ? `(${details})` : ""}`);
  results.push({ title, status: "PASS", details });
}

function logFail(title, error = "") {
  console.error(`❌ [FAIL] ${title}: ${error}`);
  results.push({ title, status: "FAIL", error });
}

function logWarn(title, warning = "") {
  console.warn(`⚠️ [WARN] ${title}: ${warning}`);
  results.push({ title, status: "WARN", details: warning });
}

async function runTests() {
  console.log("=================================================================");
  console.log("🧪 MEMULAI TESTING MENYELURUH INPUT HINGGA DATABASE CV PELANGI UV");
  console.log("=================================================================\n");

  // -------------------------------------------------------------
  // TEST 1: KONEKTIVITAS SUPABASE CLOUD DATABASE
  // -------------------------------------------------------------
  console.log("--- TAHAP 1: KONEKSI SUPABASE DATABASE ---");
  const sbUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://tfntrvdgbrvcmtiilqbb.supabase.co";
  const sbKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

  let supabase = null;
  if (sbUrl && sbKey) {
    try {
      supabase = createClient(sbUrl, sbKey, { auth: { persistSession: false } });
      const { data, error } = await supabase.from("site_settings").select("key").limit(1);
      if (error) {
        logWarn("Supabase Table site_settings Check", `Error: ${error.message} (Code: ${error.code})`);
      } else {
        logPass("Koneksi Supabase DB Aktif", `URL: ${sbUrl}`);
      }

      // Check key tables
      const tablesToCheck = ["career_jobs", "job_applicants", "leads", "momen_albums", "blog_articles"];
      for (const table of tablesToCheck) {
        const { error: tErr, count } = await supabase.from(table).select("*", { count: "exact", head: true });
        if (tErr) {
          logWarn(`Cek Tabel Supabase '${table}'`, `${tErr.message}`);
        } else {
          logPass(`Tabel '${table}' Terverifikasi di Supabase`);
        }
      }
    } catch (err) {
      logFail("Koneksi Supabase Gagal", err.message);
    }
  } else {
    logWarn("Koneksi Supabase", "NEXT_PUBLIC_SUPABASE_URL atau Key tidak ditemukan di environment.");
  }

  // -------------------------------------------------------------
  // TEST 2: PUBLIC INPUT - FORM KONSULTASI / LEADS (/api/leads)
  // -------------------------------------------------------------
  console.log("\n--- TAHAP 2: TESTING FORMULIR KONSULTASI (LEADS) ---");
  let testLeadId = null;

  // 2A: Validasi input kosong (Harus ditolak 400)
  try {
    const res = await fetch(`${BASE_URL}/api/leads`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: "", phone: "" }),
    });
    if (res.status === 400) {
      logPass("Validasi Input Kosong Leads", "Ditolak HTTP 400 dengan benar");
    } else {
      logFail("Validasi Input Kosong Leads", `Respon tidak sesuai: ${res.status}`);
    }
  } catch (err) {
    logFail("Request Validasi Leads Gagal", err.message);
  }

  // 2B: Penginputan Leads Baru yang Valid
  const testLeadPayload = {
    name: "Testing QA System",
    company: "PT Percetakan Nusantara",
    phone: "081234567890",
    email: "qa-test@pelangiuv.com",
    service: "Spot UV Sand & Hot Stamping Foil",
    message: "Ini adalah pesan automated test penginputan formulir konsultasi website.",
  };

  try {
    const res = await fetch(`${BASE_URL}/api/leads`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(testLeadPayload),
    });
    const data = await res.json();
    if (res.status === 201 && data.ok && data.data?.id) {
      testLeadId = data.data.id;
      logPass("Input Form Konsultasi Berhasil Tersimpan", `ID: ${testLeadId}`);
    } else {
      logFail("Input Form Konsultasi Gagal", JSON.stringify(data));
    }
  } catch (err) {
    logFail("Request Submit Leads Gagal", err.message);
  }

  // -------------------------------------------------------------
  // TEST 3: PUBLIC INPUT - UPLOAD CV & LAMARAN KERJA
  // -------------------------------------------------------------
  console.log("\n--- TAHAP 3: TESTING UPLOAD FILE & FORMULIR LAMARAN KERJA (CAREER APPLY) ---");

  // 3A: Testing Upload File CV Disallowed Extension (.exe / .sh)
  try {
    const formBad = new FormData();
    const badBlob = new Blob(["dangerous script"], { type: "application/x-msdownload" });
    formBad.append("file", badBlob, "virus.exe");

    const res = await fetch(`${BASE_URL}/api/career-apply/upload`, {
      method: "POST",
      body: formBad,
    });
    if (res.status === 400) {
      logPass("Proteksi Keamanan Upload Berkas", "Ekstensi terlarang ditolak 400");
    } else {
      logFail("Proteksi Keamanan Upload Berkas", `File bahaya lolos dengan status ${res.status}`);
    }
  } catch (err) {
    logFail("Request Upload File Terlarang Gagal", err.message);
  }

  // 3B: Testing Upload File CV Valid (.pdf)
  let uploadedCvUrl = "";
  try {
    const formGood = new FormData();
    const goodBlob = new Blob(["%PDF-1.4 Mock CV Testing Data Content"], { type: "application/pdf" });
    formGood.append("file", goodBlob, "cv_test_pelamar.pdf");

    const res = await fetch(`${BASE_URL}/api/career-apply/upload`, {
      method: "POST",
      body: formGood,
    });
    const data = await res.json();
    if (res.status === 200 && data.ok && data.url) {
      uploadedCvUrl = data.url;
      logPass("Upload Berkas CV PDF Berhasil", `URL: ${uploadedCvUrl}`);
    } else {
      logFail("Upload Berkas CV PDF Gagal", JSON.stringify(data));
    }
  } catch (err) {
    logFail("Request Upload CV Valid Gagal", err.message);
  }

  // 3C: Testing Submit Lamaran Kerja Lengkap
  let testApplicantId = null;
  const testApplicantPayload = {
    jobId: "job-operator-foil",
    jobTitle: "Operator Mesin Hot Stamping Foil",
    name: "Budi Santoso Tester",
    birthPlaceDate: "Surabaya, 15 Januari 1995",
    maritalStatus: "Single",
    age: "29",
    phone: "08987654321",
    email: "budi.tester@example.com",
    address: "Jl. Industri Rungkut No. 88, Surabaya",
    education: "SMK / SMA",
    educationMajor: "Teknik Mesin Grafika",
    hasExperience: "yes",
    reference1: "Pak Joko - 0812334455 - Supervisor Finishing",
    reference2: "Ibu Maya - 0812998877 - HRD Percetakan",
    experience1: "2 Tahun di PT Maju Grafika sebagai operator foil stamping",
    experience: "Berpengalaman mengoperasikan mesin cetak dan finishing foil",
    readyNoWorkNoPay: "Ya",
    readyOvertime: "Ya",
    expectedSalary: "Rp 4.500.000",
    expectedFacilities: "BPJS Ketenagakerjaan & Kesehatan",
    threeWeaknesses: "Kadang terlalu perfeksionis terhadap detail",
    threeStrengths: "Cepat belajar, disiplin waktu, terbiasa target tinggi",
    fiveSkills: "Setting foil, kalibrasi suhu matres, perawatan mesin, QA hasil cetak",
    hasPortfolio: "no",
    cvUrl: uploadedCvUrl || "/uploads/cv/test.pdf",
    fileName: "cv_test_pelamar.pdf",
  };

  try {
    const res = await fetch(`${BASE_URL}/api/career-apply`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(testApplicantPayload),
    });
    const data = await res.json();
    if (res.status === 201 && data.ok && data.data?.id) {
      testApplicantId = data.data.id;
      logPass("Input Form Lamaran Kerja (20+ Fields) Berhasil", `ID: ${testApplicantId}`);
    } else {
      logFail("Input Form Lamaran Kerja Gagal", JSON.stringify(data));
    }
  } catch (err) {
    logFail("Request Submit Lamaran Kerja Gagal", err.message);
  }

  // -------------------------------------------------------------
  // TEST 4: CHATBOT AI ADVISOR & ANALYTICS
  // -------------------------------------------------------------
  console.log("\n--- TAHAP 4: TESTING CHATBOT AI ADVISOR & ANALYTICS ---");
  try {
    const res = await fetch(`${BASE_URL}/api/chat`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        message: "Halo, apa bedanya spot uv dan lamination doff?",
      }),
    });
    const data = await res.json();
    if (res.status === 200 && (data.html || data.reply || data.text)) {
      logPass("Chatbot Advisor Endpoint Berfungsi", `Respon: ${(data.html || data.reply || data.text).substring(0, 60)}...`);
    } else {
      logWarn("Chatbot Advisor Endpoint Respon Tidak Standar", JSON.stringify(data));
    }
  } catch (err) {
    logFail("Request Chatbot Gagal", err.message);
  }

  try {
    const res = await fetch(`${BASE_URL}/api/analytics/track`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        path: "/test-qa",
        referrer: "direct",
        screenWidth: 1920,
      }),
    });
    if (res.status === 200) {
      logPass("Analytics Tracking Berfungsi", "Status 200 OK");
    } else {
      logWarn("Analytics Tracking Status", `${res.status}`);
    }
  } catch (err) {
    logFail("Request Analytics Tracking Gagal", err.message);
  }

  // -------------------------------------------------------------
  // TEST 5: ADMIN AUTHENTICATION & SESSION
  // -------------------------------------------------------------
  console.log("\n--- TAHAP 5: TESTING ADMIN AUTH & KEAMANAN SESI ---");
  let adminCookie = "";

  // 5A: Wrong Password
  try {
    const res = await fetch(`${BASE_URL}/api/admin/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username: "admin", password: "password_salah_123" }),
    });
    if (res.status === 401) {
      logPass("Keamanan Login (Password Salah Ditolak)", "Status 401 Unauthorized");
    } else {
      logFail("Keamanan Login (Password Salah Ditolak)", `Status tidak sesuai: ${res.status}`);
    }
  } catch (err) {
    logFail("Request Login Password Salah Gagal", err.message);
  }

  // 5B: Valid Password
  try {
    const res = await fetch(`${BASE_URL}/api/admin/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username: "admin", password: process.env.ADMIN_PASSWORD || "pelangiuv2024" }),
    });
    if (res.status === 200) {
      const setCookie = res.headers.get("set-cookie");
      if (setCookie) {
        adminCookie = setCookie.split(";")[0];
        logPass("Login Admin Berhasil & Sesi Cookie Diterbitkan", adminCookie);
      } else {
        logWarn("Login Admin Berhasil tapi header set-cookie tidak terbaca", "Respon status 200");
      }
    } else {
      logFail("Login Admin Gagal", `Status: ${res.status}`);
    }
  } catch (err) {
    logFail("Request Login Admin Gagal", err.message);
  }

  // -------------------------------------------------------------
  // TEST 6: ADMIN DATA RETRIEVAL & VERIFIKASI INPUT SEBELUMNYA
  // -------------------------------------------------------------
  console.log("\n--- TAHAP 6: VERIFIKASI DATA TERSIMPAN DI ADMIN & DATABASE ---");
  const authHeaders = {
    "Content-Type": "application/json",
    Cookie: adminCookie,
  };

  // 6A: Verifikasi Leads Masuk
  try {
    const res = await fetch(`${BASE_URL}/api/admin/leads`, { headers: authHeaders });
    const leads = await res.json();
    if (Array.isArray(leads)) {
      const found = leads.find((l) => l.id === testLeadId || l.phone === "081234567890");
      if (found) {
        logPass("Verifikasi Lead di Backend Admin", `Ditemukan: ${found.name} (${found.company})`);
      } else {
        logWarn("Lead Tidak Ditemukan di Admin List", `ID dicari: ${testLeadId}`);
      }
    } else {
      logFail("Fetch Admin Leads Gagal", JSON.stringify(leads));
    }
  } catch (err) {
    logFail("Request Fetch Admin Leads Gagal", err.message);
  }

  // 6B: Verifikasi Pelamar Masuk
  try {
    const res = await fetch(`${BASE_URL}/api/admin/applicants`, { headers: authHeaders });
    const applicants = await res.json();
    if (Array.isArray(applicants)) {
      const found = applicants.find((a) => a.id === testApplicantId || a.phone === "08987654321");
      if (found) {
        logPass("Verifikasi Pelamar Kerja di Backend Admin", `Ditemukan: ${found.name} (${found.jobTitle})`);
      } else {
        logWarn("Pelamar Tidak Ditemukan di Admin List", `ID dicari: ${testApplicantId}`);
      }
    } else {
      logFail("Fetch Admin Applicants Gagal", JSON.stringify(applicants));
    }
  } catch (err) {
    logFail("Request Fetch Admin Applicants Gagal", err.message);
  }

  // -------------------------------------------------------------
  // TEST 7: ADMIN CRUD WORKFLOWS (JOBS, BLOG, MOMEN, GALLERY)
  // -------------------------------------------------------------
  console.log("\n--- TAHAP 7: TESTING CRUD LENGKAP ADMIN (JOBS, BLOG, MOMEN, GALLERY) ---");

  // 7A: Jobs CRUD
  let createdJobId = null;
  try {
    const createRes = await fetch(`${BASE_URL}/api/admin/jobs`, {
      method: "POST",
      headers: authHeaders,
      body: JSON.stringify({
        title: "Staff Quality Control Cetak & Finishing (QA Test)",
        division: "Produksi",
        type: "Full-Time (WFO)",
        location: "Bizpark C17-C19, Sidoarjo",
        isOpen: true,
        qualifications: ["Min SMK Grafika", "Teliti & detail"],
        responsibilities: ["Memeriksa hasil cetak spot UV", "Verifikasi register foil"],
      }),
    });
    const jobData = await createRes.json();
    if (createRes.status === 201 && jobData.id) {
      createdJobId = jobData.id;
      logPass("Admin POST Buat Lowongan Kerja Baru", `ID: ${createdJobId}`);

      // Update Job
      const updateRes = await fetch(`${BASE_URL}/api/admin/jobs`, {
        method: "PUT",
        headers: authHeaders,
        body: JSON.stringify({
          id: createdJobId,
          type: "Kontrak 1 Tahun",
        }),
      });
      if (updateRes.status === 200) {
        logPass("Admin PUT Update Lowongan Kerja", `ID: ${createdJobId}`);
      } else {
        logFail("Admin PUT Update Lowongan Kerja Gagal", `Status: ${updateRes.status}`);
      }

      // Delete Job
      const delRes = await fetch(`${BASE_URL}/api/admin/jobs?id=${createdJobId}`, {
        method: "DELETE",
        headers: authHeaders,
      });
      if (delRes.status === 200) {
        logPass("Admin DELETE Hapus Lowongan Kerja", `ID: ${createdJobId}`);
      } else {
        logFail("Admin DELETE Hapus Lowongan Kerja Gagal", `Status: ${delRes.status}`);
      }
    } else {
      logFail("Admin POST Lowongan Gagal", JSON.stringify(jobData));
    }
  } catch (err) {
    logFail("Alur Jobs CRUD Gagal", err.message);
  }

  // 7B: Blog Articles CRUD
  let createdBlogId = null;
  try {
    const createRes = await fetch(`${BASE_URL}/api/admin/blog`, {
      method: "POST",
      headers: authHeaders,
      body: JSON.stringify({
        title: "Panduan Teknis Uji Coba QA Finishing Pelangi UV",
        slug: "panduan-teknis-uji-coba-qa-finishing",
        category: "Edukasi Finishing",
        categoryKey: "edukasi-finishing",
        desc: "Ringkasan pengujian sistem dan optimasi hasil cetak spot uv berkualitas.",
        content: ["Paragraf konten pengujian sistem database dan form input."],
      }),
    });
    const blogData = await createRes.json();
    if (createRes.status === 201 && blogData.id) {
      createdBlogId = blogData.id;
      logPass("Admin POST Buat Artikel Blog Baru", `ID: ${createdBlogId}`);

      // Patch Blog
      const patchRes = await fetch(`${BASE_URL}/api/admin/blog`, {
        method: "PATCH",
        headers: authHeaders,
        body: JSON.stringify({
          id: createdBlogId,
          views: "100 Views",
        }),
      });
      if (patchRes.status === 200) {
        logPass("Admin PATCH Update Artikel Blog", `ID: ${createdBlogId}`);
      } else {
        logFail("Admin PATCH Update Artikel Blog Gagal", `Status: ${patchRes.status}`);
      }

      // Delete Blog
      const delRes = await fetch(`${BASE_URL}/api/admin/blog`, {
        method: "DELETE",
        headers: authHeaders,
        body: JSON.stringify({ id: createdBlogId }),
      });
      if (delRes.status === 200) {
        logPass("Admin DELETE Hapus Artikel Blog", `ID: ${createdBlogId}`);
      } else {
        logFail("Admin DELETE Hapus Artikel Blog Gagal", `Status: ${delRes.status}`);
      }
    } else {
      logFail("Admin POST Blog Gagal", JSON.stringify(blogData));
    }
  } catch (err) {
    logFail("Alur Blog CRUD Gagal", err.message);
  }

  // 7C: Momen CRUD
  let createdMomenId = null;
  try {
    const createRes = await fetch(`${BASE_URL}/api/admin/momen`, {
      method: "POST",
      headers: authHeaders,
      body: JSON.stringify({
        category: "qa-testing-event",
        title: "Dokumentasi QA Testing Pelangi UV",
        desc: "Dokumentasi kegiatan uji fungsionalitas sistem.",
        photos: [{ src: "/images/hero-1.webp", alt: "Testing" }],
      }),
    });
    const momenData = await createRes.json();
    if (createRes.status === 201 && (momenData.id || momenData.data?.id)) {
      createdMomenId = momenData.id || momenData.data?.id;
      logPass("Admin POST Buat Album Momen Baru", `ID: ${createdMomenId}`);

      // Delete Momen
      const delRes = await fetch(`${BASE_URL}/api/admin/momen?id=${createdMomenId}`, {
        method: "DELETE",
        headers: authHeaders,
      });
      if (delRes.status === 200) {
        logPass("Admin DELETE Hapus Album Momen", `ID: ${createdMomenId}`);
      } else {
        logFail("Admin DELETE Hapus Album Momen Gagal", `Status: ${delRes.status}`);
      }
    } else {
      logFail("Admin POST Momen Gagal", JSON.stringify(momenData));
    }
  } catch (err) {
    logFail("Alur Momen CRUD Gagal", err.message);
  }

  // 7D: Gallery CRUD
  let createdGalleryId = null;
  try {
    const createRes = await fetch(`${BASE_URL}/api/admin/gallery`, {
      method: "POST",
      headers: authHeaders,
      body: JSON.stringify({
        title: "Sampel Spot UV Doff Foil Gold QA",
        category: "Spot UV",
        technique: "Spot UV + Foil",
        imageUrl: "/images/gallery/test.jpg",
        fileName: "test.jpg",
        galleryType: "produk",
      }),
    });
    const galData = await createRes.json();
    if (createRes.status === 201 && galData.id) {
      createdGalleryId = galData.id;
      logPass("Admin POST Buat Galeri Produk Baru", `ID: ${createdGalleryId}`);

      // Delete Gallery
      const delRes = await fetch(`${BASE_URL}/api/admin/gallery?id=${createdGalleryId}`, {
        method: "DELETE",
        headers: authHeaders,
      });
      if (delRes.status === 200) {
        logPass("Admin DELETE Hapus Galeri Produk", `ID: ${createdGalleryId}`);
      } else {
        logFail("Admin DELETE Hapus Galeri Produk Gagal", `Status: ${delRes.status}`);
      }
    } else {
      logFail("Admin POST Gallery Gagal", JSON.stringify(galData));
    }
  } catch (err) {
    logFail("Alur Gallery CRUD Gagal", err.message);
  }

  // -------------------------------------------------------------
  // TEST 8: CLEANUP TEST DATA (LEADS & APPLICANTS)
  // -------------------------------------------------------------
  console.log("\n--- TAHAP 8: PEMBERSIHAN DATA TESTING (CLEANUP) ---");
  if (testLeadId) {
    try {
      const res = await fetch(`${BASE_URL}/api/admin/leads`, {
        method: "DELETE",
        headers: authHeaders,
        body: JSON.stringify({ id: testLeadId }),
      });
      if (res.status === 200) {
        logPass("Pembersihan Test Lead Selesai", `ID: ${testLeadId}`);
      }
    } catch (err) {
      logWarn("Gagal Membersihkan Test Lead", err.message);
    }
  }

  if (testApplicantId) {
    try {
      const res = await fetch(`${BASE_URL}/api/admin/applicants?id=${testApplicantId}`, {
        method: "DELETE",
        headers: authHeaders,
      });
      if (res.status === 200) {
        logPass("Pembersihan Test Applicant Selesai", `ID: ${testApplicantId}`);
      }
    } catch (err) {
      logWarn("Gagal Membersihkan Test Applicant", err.message);
    }
  }

  // -------------------------------------------------------------
  // SUMMARY REPORT
  // -------------------------------------------------------------
  console.log("\n=================================================================");
  console.log("📊 RINGKASAN HASIL PENGUJIAN DATABASE & PENGINPUTAN:");
  const passCount = results.filter((r) => r.status === "PASS").length;
  const failCount = results.filter((r) => r.status === "FAIL").length;
  const warnCount = results.filter((r) => r.status === "WARN").length;
  console.log(`TOTAL TEST: ${results.length}`);
  console.log(`LULUS (PASS): ${passCount}`);
  console.log(`GAGAL (FAIL): ${failCount}`);
  console.log(`PERINGATAN (WARN): ${warnCount}`);
  console.log("=================================================================");

  return { passCount, failCount, warnCount, results };
}

runTests().catch((err) => {
  console.error("Test runner encountered error:", err);
});
