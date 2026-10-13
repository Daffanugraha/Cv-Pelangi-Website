import { createClient } from "@supabase/supabase-js";

const DEFAULT_SUPABASE_URL = "https://tfntrvdgbrvcmtiilqbb.supabase.co";
const DEFAULT_SUPABASE_KEY = "sb_publishable_J3sVErGeq09pQtYPrFSHCg_xZgg8IfL";

/**
 * Supabase Admin / Server Client
 * Menggunakan SUPABASE_SERVICE_ROLE_KEY atau ANON / PUBLISHABLE_KEY
 */
export function getSupabaseAdmin() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || DEFAULT_SUPABASE_URL;
  const supabaseKey =
    process.env.SUPABASE_SERVICE_ROLE_KEY ||
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
    DEFAULT_SUPABASE_KEY;

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
