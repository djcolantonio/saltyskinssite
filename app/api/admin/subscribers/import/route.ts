import { NextRequest, NextResponse } from "next/server";
import { getCrmSupabaseAdmin } from "@/lib/crmSupabaseAdmin";

// Reusable bulk-import endpoint for the newsletter subscriber list — lets
// Daniel bring in a batch of {email, name} pairs (e.g. from an old Mailchimp
// export) at once, any time, rather than one signup at a time through the
// public form. Upserts on email, so re-running with an overlapping list is
// safe: existing subscribers just get their name filled/updated.

type ImportRow = { email?: string; name?: string };

export async function POST(req: NextRequest) {
  const expectedKey = process.env.NEXT_PUBLIC_BLOG_EMAIL_ADMIN_KEY;
  if (!expectedKey) {
    return NextResponse.json({ error: "Not configured." }, { status: 503 });
  }

  const body = await req.json().catch(() => ({}));
  if (body.key !== expectedKey) {
    return NextResponse.json({ error: "Invalid or missing key." }, { status: 401 });
  }

  const rows: ImportRow[] = Array.isArray(body.subscribers) ? body.subscribers : [];
  if (rows.length === 0) {
    return NextResponse.json({ error: "No subscribers provided." }, { status: 400 });
  }

  const isValidEmail = (e: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);

  const seen = new Set<string>();
  const valid: { email: string; name: string | null }[] = [];
  const skipped: string[] = [];

  for (const row of rows) {
    const email = (row.email || "").trim().toLowerCase();
    const name = (row.name || "").trim();
    if (!email || !isValidEmail(email) || seen.has(email)) {
      skipped.push(row.email || "(blank)");
      continue;
    }
    seen.add(email);
    valid.push({ email, name: name || null });
  }

  const crm = getCrmSupabaseAdmin();
  if (!crm) {
    return NextResponse.json(
      { error: "CRM_SUPABASE_SERVICE_ROLE_KEY is not set in the environment." },
      { status: 503 }
    );
  }

  // Upsert in chunks so one oversized request doesn't hit any payload limits.
  const CHUNK_SIZE = 200;
  let imported = 0;
  const errors: string[] = [];

  for (let i = 0; i < valid.length; i += CHUNK_SIZE) {
    const chunk = valid.slice(i, i + CHUNK_SIZE);
    const { error } = await crm
      .from("ssr_subscribers")
      .upsert(chunk, { onConflict: "email", ignoreDuplicates: false });
    if (error) {
      console.error("[import-subscribers] Chunk failed:", error);
      errors.push(error.message);
    } else {
      imported += chunk.length;
    }
  }

  return NextResponse.json({
    done: true,
    totalProvided: rows.length,
    imported,
    skipped,
    errors,
  });
}
