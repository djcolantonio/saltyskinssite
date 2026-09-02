import { NextRequest, NextResponse } from "next/server";
import { getCrmSupabaseAdmin } from "@/lib/crmSupabaseAdmin";

export async function GET(req: NextRequest) {
  const expectedKey = process.env.BLOG_EMAIL_ADMIN_KEY;
  if (!expectedKey) {
    return NextResponse.json({ error: "Not configured." }, { status: 503 });
  }

  const providedKey = req.nextUrl.searchParams.get("key");
  if (providedKey !== expectedKey) {
    return NextResponse.json({ error: "Invalid or missing key." }, { status: 401 });
  }

  const crm = getCrmSupabaseAdmin();
  if (!crm) {
    return NextResponse.json(
      { error: "CRM_SUPABASE_SERVICE_ROLE_KEY is not set in the environment." },
      { status: 503 }
    );
  }

  const { data, error } = await crm
    .from("ssr_subscribers")
    .select("email")
    .order("email", { ascending: true });

  if (error) {
    console.error("[Subscribers] Failed to load list:", error);
    return NextResponse.json({ error: "Failed to load subscriber list." }, { status: 500 });
  }

  const emails = (data || []).map((row) => row.email).filter(Boolean);
  return NextResponse.json({ emails });
}
