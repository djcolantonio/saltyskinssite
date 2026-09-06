import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { getCrmSupabase } from "@/lib/crmSupabase";

const TO_EMAIL = "ssyogaretreats@gmail.com";
const FROM_EMAIL = "Salty Skins Website <notifications@ssyogaretreats.com>";

function dateKey(value: string | Date) {
  const d = typeof value === "string" ? new Date(value) : value;
  return d.toISOString().slice(0, 10);
}

function prettyDate(key: string) {
  // key is YYYY-MM-DD — parse as UTC noon so it can't roll back a day in
  // any local timezone this ever runs in.
  return new Date(`${key}T12:00:00Z`).toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });
}

// Runs once a day (see vercel.json) and covers both the "day before" and
// "day of" reminder in one pass: anything on the CRM Calendar tab for
// today or tomorrow gets grouped into a single digest email to Marci.
export async function GET(req: NextRequest) {
  const auth = req.headers.get("authorization");
  if (process.env.CRON_SECRET && auth !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const crm = getCrmSupabase();
  if (!crm) {
    return NextResponse.json({ error: "CRM not configured" }, { status: 500 });
  }

  const now = new Date();
  const todayKey = dateKey(now);
  const tomorrow = new Date(now);
  tomorrow.setUTCDate(now.getUTCDate() + 1);
  const tomorrowKey = dateKey(tomorrow);

  const [bookingsRes, attendeesRes, todosRes, eventsRes, retreatsRes] = await Promise.all([
    crm.from("ssr_private_bookings").select("*").in("preferred_date", [todayKey, tomorrowKey]),
    crm.from("ssr_attendees").select("*"),
    crm.from("ssr_todos").select("*").in("due_date", [todayKey, tomorrowKey]),
    crm.from("ssr_calendar_events").select("*").in("event_date", [todayKey, tomorrowKey]),
    crm.from("ssr_retreats").select("id, name"),
  ]);

  const firstError = [bookingsRes, attendeesRes, todosRes, eventsRes, retreatsRes].find(
    (r) => r.error
  );
  if (firstError) {
    console.error("[Cron] Failed to load calendar data:", firstError.error);
    return NextResponse.json({ error: firstError.error!.message }, { status: 500 });
  }

  const retreatName = (id: string | null) =>
    (retreatsRes.data || []).find((r) => r.id === id)?.name || "General";

  const byDay: Record<string, string[]> = { [todayKey]: [], [tomorrowKey]: [] };
  const add = (key: string | null, label: string) => {
    if (key && byDay[key]) byDay[key].push(label);
  };

  (bookingsRes.data || []).forEach((b) => {
    add(b.preferred_date, `Private session request: ${b.name} (${b.email})`);
  });
  (attendeesRes.data || []).forEach((a) => {
    if (a.arrival_datetime) {
      add(dateKey(a.arrival_datetime), `Arrival: ${a.name} — ${retreatName(a.retreat_id)}`);
    }
    if (a.departure_datetime) {
      add(dateKey(a.departure_datetime), `Departure: ${a.name} — ${retreatName(a.retreat_id)}`);
    }
  });
  (todosRes.data || []).forEach((t) => {
    add(t.due_date, `Task due: ${t.task}`);
  });
  (eventsRes.data || []).forEach((e) => {
    add(e.event_date, e.notes ? `${e.title} — ${e.notes}` : e.title);
  });

  const hasToday = byDay[todayKey].length > 0;
  const hasTomorrow = byDay[tomorrowKey].length > 0;

  if (!hasToday && !hasTomorrow) {
    return NextResponse.json({ ok: true, sent: false, reason: "Nothing scheduled" });
  }

  const sections: string[] = [];
  if (hasToday) {
    sections.push(`Today — ${prettyDate(todayKey)}\n${byDay[todayKey].map((l) => `  • ${l}`).join("\n")}`);
  }
  if (hasTomorrow) {
    sections.push(`Tomorrow — ${prettyDate(tomorrowKey)}\n${byDay[tomorrowKey].map((l) => `  • ${l}`).join("\n")}`);
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.log("[Resend] Not configured — reminder email not sent:\n" + sections.join("\n\n"));
    return NextResponse.json({ ok: true, sent: false, reason: "Resend not configured" });
  }

  try {
    const resend = new Resend(apiKey);
    await resend.emails.send({
      from: FROM_EMAIL,
      to: TO_EMAIL,
      subject: `Salty Skins reminders — ${hasToday ? "today" : ""}${hasToday && hasTomorrow ? " & " : ""}${hasTomorrow ? "tomorrow" : ""}`,
      text: sections.join("\n\n"),
    });
  } catch (err) {
    console.error("[Resend] Failed to send reminder email:", err);
    return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
  }

  return NextResponse.json({ ok: true, sent: true });
}
