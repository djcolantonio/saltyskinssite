import { createClient } from "@supabase/supabase-js";

// Talks directly to the Salty Skins CRM's Supabase project. That project
// also hosts an unrelated business's data (Safe Haven), kept isolated by
// table-name prefixing (ssr_...) and per-table Row Level Security policies —
// this file must only ever reference ssr_leads / ssr_subscribers and never
// any other table in that project.
export function getCrmSupabase() {
  const url = process.env.CRM_SUPABASE_URL;
  const anonKey = process.env.CRM_SUPABASE_ANON_KEY;
  if (!url || !anonKey) return null;
  return createClient(url, anonKey);
}
