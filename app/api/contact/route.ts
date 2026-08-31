import { NextRequest, NextResponse } from "next/server";

// TODO: wire this up to a real email service once Daniel picks one
// (Resend is a good free-tier fit for Next.js/Vercel — https://resend.com).
// For now this just validates the payload and logs it so nothing is lost
// while the email piece is being connected.
export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null);

  if (!body || !body.name || !body.email) {
    return NextResponse.json(
      { error: "Name and email are required." },
      { status: 400 }
    );
  }

  console.log("New contact form submission:", {
    name: body.name,
    email: body.email,
    message: body.message,
    receivedAt: new Date().toISOString(),
  });

  // Once an email service (e.g. Resend) is configured, send a notification to
  // ssyogaretreats@gmail.com here, and/or POST it into the CRM as a lead.

  return NextResponse.json({ ok: true });
}
