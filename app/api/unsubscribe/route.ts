import { NextRequest, NextResponse } from "next/server";
import { verifyEmailSignature } from "@/lib/emailAuth";
import { getCrmSupabaseAdmin } from "@/lib/crmSupabaseAdmin";

function htmlPage(message: string) {
  return `<!doctype html>
<html>
  <head><meta charset="utf-8" /><title>Salty Skins Retreats</title></head>
  <body style="font-family: Georgia, serif; max-width: 480px; margin: 80px auto; text-align: center; color: #2a2a2a;">
    <p>${message}</p>
  </body>
</html>`;
}

export async function GET(req: NextRequest) {
  const email = req.nextUrl.searchParams.get("email") || "";
  const sig = req.nextUrl.searchParams.get("sig") || "";

  if (!email || !sig || !verifyEmailSignature(email, sig)) {
    return new NextResponse(htmlPage("This unsubscribe link is invalid or has expired."), {
      status: 400,
      headers: { "Content-Type": "text/html" },
    });
  }

  const crm = getCrmSupabaseAdmin();
  if (crm) {
    const { error } = await crm
      .from("ssr_subscribers")
      .delete()
      .eq("email", email.trim().toLowerCase());
    if (error) {
      console.error("[Unsubscribe] Failed to remove subscriber:", error);
    }
  }

  return new NextResponse(
    htmlPage("You've been unsubscribed and won't receive any more emails from us. Sorry to see you go!"),
    { headers: { "Content-Type": "text/html" } }
  );
}
