/**
 * Script Migrasi Otomatis dari JSON Lokal ke PostgreSQL
 * Cara pakai:
 *   1. Masukkan DATABASE_URL di file .env.local
 *   2. Jalankan perintah di terminal: node scripts/migrate-to-postgres.js
 */

const fs = require("fs");
const path = require("path");
const { Pool } = require("pg");

// Load .env.local
const envPath = path.join(__dirname, "..", ".env.local");
if (fs.existsSync(envPath)) {
  const content = fs.readFileSync(envPath, "utf-8");
  content.split("\n").forEach((line) => {
    const match = line.match(/^\s*([\w.-]+)\s*=\s*(.*)?\s*$/);
    if (match) {
      const key = match[1];
      let value = match[2] || "";
      if (value.startsWith('"') && value.endsWith('"')) value = value.slice(1, -1);
      process.env[key] = value;
    }
  });
}

const DATABASE_URL = process.env.DATABASE_URL;

if (!DATABASE_URL) {
  console.error("❌ ERROR: DATABASE_URL belum diatur di .env.local!");
  console.log("Contoh format di .env.local:");
  console.log("DATABASE_URL=postgresql://postgres:password@ep-sample.neon.tech/neondb?sslmode=require");
  process.exit(1);
}

const pool = new Pool({
  connectionString: DATABASE_URL,
  ssl: DATABASE_URL.includes("localhost") ? false : { rejectUnauthorized: false },
});

async function runMigration() {
  console.log("🚀 Menghubungkan ke PostgreSQL...");
  const client = await pool.connect();

  try {
    // 1. Eksekusi Skema SQL
    console.log("📄 Menerapkan tabel dari db/schema.sql...");
    const schemaSql = fs.readFileSync(path.join(__dirname, "..", "db", "schema.sql"), "utf-8");
    await client.query(schemaSql);
    console.log("✅ Struktur tabel PostgreSQL berhasil dibuat!");

    // Helper baca JSON
    const dataDir = path.join(__dirname, "..", "data", "admin");
    const readJSON = (name) => {
      const p = path.join(dataDir, `${name}.json`);
      if (!fs.existsSync(p)) return [];
      try {
        return JSON.parse(fs.readFileSync(p, "utf-8"));
      } catch {
        return [];
      }
    };

    // 2. Migrasi Lowongan Kerja (jobs.json)
    const jobs = readJSON("jobs");
    console.log(`💼 Memigrasikan ${jobs.length} lowongan pekerjaan...`);
    for (const job of jobs) {
      await client.query(
        `INSERT INTO career_jobs (id, title, division, type, location, qualifications, responsibilities, is_open)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
         ON CONFLICT (id) DO UPDATE SET
           title = EXCLUDED.title,
           division = EXCLUDED.division,
           type = EXCLUDED.type,
           location = EXCLUDED.location,
           qualifications = EXCLUDED.qualifications,
           responsibilities = EXCLUDED.responsibilities,
           is_open = EXCLUDED.is_open`,
        [
          job.id,
          job.title,
          job.division,
          job.type || "Full-Time (WFO)",
          job.location || "Sidoarjo",
          JSON.stringify(job.qualifications || []),
          JSON.stringify(job.responsibilities || []),
          Boolean(job.isOpen),
        ]
      );
    }

    // 3. Migrasi Pelamar (applicants.json)
    const applicants = readJSON("applicants");
    console.log(`📋 Memigrasikan ${applicants.length} berkas pelamar kerja...`);
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
          app.address || "-",
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
          app.createdAt ? new Date(app.createdAt) : new Date(),
        ]
      );
    }

    // 4. Migrasi Leads (leads.json)
    const leads = readJSON("leads");
    console.log(`✉️ Memigrasikan ${leads.length} data formulir leads...`);
    for (const lead of leads) {
      await client.query(
        `INSERT INTO leads (id, name, company, phone, email, service, message, status, created_at)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
         ON CONFLICT (id) DO NOTHING`,
        [
          lead.id,
          lead.name,
          lead.company || null,
          lead.phone,
          lead.email || null,
          lead.service || null,
          lead.message || null,
          lead.status || "new",
          lead.createdAt ? new Date(lead.createdAt) : new Date(),
        ]
      );
    }

    console.log("🎉 SEMUA DATA BERHASIL DIMIGRASIKAN KE POSTGRESQL!");
  } catch (err) {
    console.error("❌ Terjadi kesalahan saat migrasi:", err);
  } finally {
    client.release();
    await pool.end();
  }
}

runMigration();
