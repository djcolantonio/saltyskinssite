import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { getCrmSupabase } from "@/lib/crmSupabase";

const TO_EMAIL = "ssyogaretreats@gmail.com";
const FROM_EMAIL = "Salty Skins Website <notifications@ssyogaretreats.com>";

const REQUIRED_FIELDS = [
  "fullName",
  "email",
  "phone",
  "dateOfBirth",
  "instagram",
  "retreat",
  "roomPreference",
  "experienceLevel",
  "dietary",
  "emergencyContactName",
  "emergencyContactPhone",
  "referralSource",
  "notes",
  "primaryMotivation",
  "experienceGoals",
  "alcoholPlans",
  "cultureAcknowledged",
  "waiverAcknowledged",
];

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null);

  if (!body) {
    return NextResponse.json({ error: "Invalid submission." }, { status: 400 });
  }

  const missing = REQUIRED_FIELDS.filter((field) => !body[field]);
  if (missing.length > 0) {
    return NextResponse.json(
      { error: `Missing required fields: ${missing.join(", ")}` },
      { status: 400 }
    );
  }

  console.log("New retreat application:", {
    fullName: body.fullName,
    email: body.email,
    retreat: body.retreat,
    receivedAt: new Date().toISOString(),
  });

  // Save into the CRM as an application — independent of the email
  // notification below, so one failing doesn't block the other.
  const crm = getCrmSupabase();
  if (crm) {
    const { error } = await crm.from("ssr_applications").insert({
      full_name: body.fullName,
      email: body.email,
      phone: body.phone,
      date_of_birth: body.dateOfBirth,
      instagram: body.instagram,
      retreat: body.retreat,
      room_preference: body.roomPreference,
      experience_level: body.experienceLevel,
      dietary: body.dietary,
      emergency_contact_name: body.emergencyContactName,
      emergency_contact_phone: body.emergencyContactPhone,
      referral_source: body.referralSource,
      notes: body.notes,
      primary_motivation: body.primaryMotivation,
      experience_goals: body.experienceGoals,
      alcohol_plans: body.alcoholPlans,
      culture_acknowledged: Boolean(body.cultureAcknowledged),
      waiver_acknowledged: Boolean(body.waiverAcknowledged),
    });
    if (error) console.error("[CRM] Failed to save application:", error);
  } else {
    console.log("[CRM] Not configured yet — application not saved to CRM.");
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.log("[Resend] Not configured yet — email not sent, application logged above only.");
    return NextResponse.json({ ok: true });
  }

  try {
    const resend = new Resend(apiKey);
    await resend.emails.send({
      from: FROM_EMAIL,
      to: TO_EMAIL,
      replyTo: body.email,
      subject: `New retreat application from ${body.fullName}`,
      text: [
        `Name: ${body.fullName}`,
        `Email: ${body.email}`,
        `Phone: ${body.phone}`,
        `Date of birth: ${body.dateOfBirth}`,
        `Instagram: ${body.instagram}`,
        `Retreat: ${body.retreat}`,
        `Room preference: ${body.roomPreference}`,
        `Experience level: ${body.experienceLevel}`,
        `Dietary restrictions: ${body.dietary}`,
        `Emergency contact: ${body.emergencyContactName} — ${body.emergencyContactPhone}`,
        `Heard about us via: ${body.referralSource}`,
        `\nNotes:\n${body.notes}`,
        `\nLooking forward to: ${body.primaryMotivation}`,
        `What they hope to get out of it: ${body.experienceGoals}`,
        `Plans to drink alcohol: ${body.alcoholPlans}`,
        `Acknowledged retreat culture/values: ${body.cultureAcknowledged ? "Yes" : "No"}`,
      ]
        .filter(Boolean)
        .join("\n"),
    });
  } catch (err) {
    // Don't fail the request just because the notification email failed —
    // the application is already logged and saved to the CRM above.
    console.error("[Resend] Failed to send application notification:", err);
  }

  return NextResponse.json({ ok: true });
}
