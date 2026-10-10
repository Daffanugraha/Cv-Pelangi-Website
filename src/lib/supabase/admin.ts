import { createClient } from "@supabase/supabase-js";

/**
 * Supabase Admin Client
 * Menggunakan SUPABASE_SERVICE_ROLE_KEY (atau fallback ANON_KEY)
 * Digunakan untuk operasi server-side admin yang membutuhkan bypass RLS
 */
export function getSupabaseAdmin() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://tfntrvdgbrvcmtiilqbb.supabase.co";
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseKey) {
    return null;
  }

  return createClient(supabaseUrl, supabaseKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });
}
