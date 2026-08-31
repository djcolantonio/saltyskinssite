import { NextRequest, NextResponse } from "next/server";

// TODO: wire this up to a real mailing list provider once Daniel picks one
// (Resend Audiences, Mailchimp, ConvertKit, etc. all work fine here).
// For now this validates the email and logs it so no signups are lost while
// that piece is being connected.
export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null);
  const email = typeof body?.email === "string" ? body.email.trim() : "";

  const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  if (!isValidEmail) {
    return NextResponse.json(
      { error: "A valid email address is required." },
      { status: 400 }
    );
  }

  console.log("New newsletter signup:", {
    email,
    receivedAt: new Date().toISOString(),
  });

  // Once a mailing list provider is configured, add the subscriber here.

  return NextResponse.json({ ok: true });
}
