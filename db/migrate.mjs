/**
 * Script Migrasi Otomatis ke Supabase / PostgreSQL
 * Menjalankan schema.sql dan memigrasikan data dari JSON ke Supabase
 *
 * Cara pakai:
 * 1. Pastikan DATABASE_URL sudah terisi di .env.local atau environment
 * 2. Jalankan: node db/migrate.mjs
 */

import fs from "fs";
import path from "path";
import pg from "pg";
const { Pool } = pg;

// Baca .env.local secara manual jika ada
const envPath = path.join(process.cwd(), ".env.local");
if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, "utf-8");
  for (const line of envContent.split("\n")) {
    const match = line.match(/^\s*([\w.-]+)\s*=\s*(.*)?\s*$/);
    if (match) {
      const key = match[1];
      let value = match[2] || "";
      if (value.startsWith('"') && value.endsWith('"')) value = value.slice(1, -1);
      if (value.startsWith("'") && value.endsWith("'")) value = value.slice(1, -1);
      if (!process.env[key]) {
        process.env[key] = value.trim();
      }
    }
  }
}

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl || databaseUrl.trim().length === 0) {
  console.error("❌ ERROR: DATABASE_URL belum diatur di .env.local!");
  console.log("\nPanduan:");
  console.log("1. Buka Supabase (supabase.com) > Project Settings > Database");
  console.log("2. Salin Connection String URI (mode Session / Pooler port 65432/5432)");
  console.log("3. Tempel di file .env.local: DATABASE_URL=\"postgresql://...\"");
  console.log("4. Jalankan kembali: node db/migrate.mjs\n");
  process.exit(1);
}

console.log("🚀 Menghubungkan ke Supabase PostgreSQL...");

const pool = new Pool({
  connectionString: databaseUrl,
  ssl: databaseUrl.includes("localhost") ? false : { rejectUnauthorized: false },
});

async function run() {
  const client = await pool.connect();
  try {
    console.log("✓ Terhubung ke database Supabase!");

    // 1. Eksekusi db/schema.sql
    const schemaPath = path.join(process.cwd(), "db", "schema.sql");
    if (!fs.existsSync(schemaPath)) {
      throw new Error("File db/schema.sql tidak ditemukan!");
    }

    console.log("⏳ Menjalankan db/schema.sql...");
    const schemaSql = fs.readFileSync(schemaPath, "utf-8");
    await client.query(schemaSql);
    console.log("✓ Tabel-tabel berhasil dibuat di Supabase!");

    // 2. Migrasi Data Pelamar dari data/admin/applicants.json
    const applicantsPath = path.join(process.cwd(), "data", "admin", "applicants.json");
    if (fs.existsSync(applicantsPath)) {
      const applicants = JSON.parse(fs.readFileSync(applicantsPath, "utf-8"));
      if (Array.isArray(applicants) && applicants.length > 0) {
        console.log(`⏳ Memigrasikan ${applicants.length} data pelamar ke Supabase...`);
        for (const app of applicants) {
          await client.query(
            `INSERT INTO job_applicants (
              id, job_id, job_title, name, birth_place_date, marital_status, age,
              phone, email, address, education, education_major, has_experience,
              experience, experience1, experience2, experience3,
              reference1, reference2, reference_phone, reference_relation,
              ready_no_work_no_pay, ready_overtime, expected_salary, expected_facilities,
              three_weaknesses, three_strengths, five_skills, strengths, weaknesses,
              has_portfolio, portfolio_url, cv_url, file_name, status, created_at
            ) VALUES (
              $1, $2, $3, $4, $5, $6, $7,
              $8, $9, $10, $11, $12, $13,
              $14, $15, $16, $17,
              $18, $19, $20, $21,
              $22, $23, $24, $25,
              $26, $27, $28, $29, $30,
              $31, $32, $33, $34, $35, $36
            ) ON CONFLICT (id) DO NOTHING`,
            [
              app.id,
              app.jobId || null,
              app.jobTitle,
              app.name,
              app.birthPlaceDate || null,
              app.maritalStatus || "Single",
              app.age ? String(app.age) : null,
              app.phone,
              app.email || "-",
              app.address,
              app.education || null,
              app.educationMajor || null,
              app.hasExperience || "yes",
              app.experience || null,
              app.experience1 || null,
              app.experience2 || null,
              app.experience3 || null,
              app.reference1 || null,
              app.reference2 || null,
              app.referencePhone || null,
              app.referenceRelation || null,
              app.readyNoWorkNoPay || "Ya",
              app.readyOvertime || "Ya",
              app.expectedSalary || null,
              app.expectedFacilities || null,
              app.threeWeaknesses || null,
              app.threeStrengths || null,
              app.fiveSkills || null,
              app.strengths || null,
              app.weaknesses || null,
              app.hasPortfolio || "no",
              app.portfolioUrl || null,
              app.cvUrl || null,
              app.fileName || null,
              app.status || "new",
              new Date(app.createdAt || Date.now()),
            ]
          );
        }
        console.log(`✓ Data pelamar berhasil disinkronkan ke Supabase!`);
      }
    }

    console.log("\n🎉 MIGRASI SUKSES! Database Anda sekarang 100% menggunakan Supabase PostgreSQL.");
  } finally {
    client.release();
    await pool.end();
  }
}

run().catch((err) => {
  console.error("❌ Migrasi gagal:", err);
  process.exit(1);
});
