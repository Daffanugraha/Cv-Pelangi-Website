import { Pool } from "pg";

/**
 * PostgreSQL Connection Pool
 * Aktif otomatis jika DATABASE_URL ada di environment (.env / .env.local).
 * Jika belum disetel, sistem otomatis fallback ke file JSON lokal tanpa error.
 */

let pool: Pool | null = null;

export function isPostgresConfigured(): boolean {
  return Boolean(process.env.DATABASE_URL && process.env.DATABASE_URL.trim().length > 0);
}

export function getPool(): Pool | null {
  if (!isPostgresConfigured()) {
    return null;
  }

  if (!pool) {
    pool = new Pool({
      connectionString: process.env.DATABASE_URL,
      ssl: process.env.DATABASE_URL?.includes("localhost")
        ? false
        : { rejectUnauthorized: false }, // Aman untuk cloud database (Supabase, Neon, Render, dll)
      max: 10,
      idleTimeoutMillis: 30000,
      connectionTimeoutMillis: 5000,
    });

    pool.on("error", (err) => {
      console.warn("[PostgreSQL Pool Error]:", err.message);
    });
  }

  return pool;
}

export async function query<T = any>(
  text: string,
  params?: any[]
): Promise<T[] | null> {
  const p = getPool();
  if (!p) return null;

  try {
    const res = await p.query(text, params);
    return res.rows as T[];
  } catch (err: any) {
    console.warn(`[PostgreSQL Query Failed: "${text.substring(0, 40)}..."]`, err.message);
    return null;
  }
}
