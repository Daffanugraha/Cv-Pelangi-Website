import { createBrowserClient } from "@supabase/ssr";

const DEFAULT_SUPABASE_URL = "https://tfntrvdgbrvcmtiilqbb.supabase.co";
const DEFAULT_SUPABASE_KEY = "sb_publishable_J3sVErGeq09pQtYPrFSHCg_xZgg8IfL";

export function createClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL || DEFAULT_SUPABASE_URL;
  const key =
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
    DEFAULT_SUPABASE_KEY;

  return createBrowserClient(url, key);
}
