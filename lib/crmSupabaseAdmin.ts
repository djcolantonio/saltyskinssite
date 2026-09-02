import { createClient } from "@supabase/supabase-js";

// Privileged, server-only Supabase client for the Salty Skins CRM project.
// Uses the service_role key, which bypasses Row Level Security entirely —
// unlike lib/crmSupabase.ts (the anon key, insert-only via RLS), this one
// can read and delete rows. Never import this into any client component,
// never log the key, and never widen it beyond the ssr_ tables — the same
// Supabase project also hosts an unrelated business's data.
export function getCrmSupabaseAdmin() {
  const url = process.env.CRM_SUPABASE_URL;
  const serviceRoleKey = process.env.CRM_SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !serviceRoleKey) return null;
  return createClient(url, serviceRoleKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  });
}
