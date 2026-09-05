"use client";

import { useState } from "react";

const TIME_OPTIONS = [
  { value: "morning", label: "Morning (7–10am)" },
  { value: "midday", label: "Midday (10am–1pm)" },
  { value: "afternoon", label: "Afternoon (1–5pm)" },
  { value: "evening", label: "Evening (5–8pm)" },
  { value: "flexible", label: "I'm flexible" },
];

const HIGHLIGHTS = [
  "Tailored to your practice, goals, and experience level",
  "In-person sessions, scheduled around your calendar",
  "A personal reply from Marci within a day or two",
];

export default function PrivateClientsPage() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle"
  );
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    setErrorMsg("");
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    try {
      const res = await fetch("/api/private-clients", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error || "Request failed");
      }
      setStatus("sent");
      form.reset();
    } catch (err) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Something went wrong.");
    }
  }

  return (
    <div className="md:flex md:min-h-[calc(100vh-96px)]">
      {/* Left — its own dark, editorial panel so this reads as a distinct
          service rather than just another page in the site's usual
          cream/sand template. */}
      <div className="bg-ink px-6 py-20 text-cream md:flex md:w-1/2 md:items-center md:py-24 md:sticky md:top-0 md:h-[calc(100vh-96px)]">
        <div className="mx-auto max-w-md">
          <p className="text-xs tracking-widest2 uppercase text-sea-light" style={{ color: "#8fb8b3" }}>
            One-on-One Sessions
          </p>
          <h1 className="mt-4 font-serif text-4xl font-light leading-tight md:text-5xl">
            Private sessions
            <br />
            <span className="italic" style={{ color: "#8fb8b3" }}>with Marci</span>
          </h1>
          <p className="mt-6 max-w-sm text-cream/70">
            A dedicated hour built entirely around you — not a class,
            not a retreat, just focused one-on-one time on the mat.
          </p>
          <ul className="mt-10 space-y-4">
            {HIGHLIGHTS.map((item) => (
              <li key={item} className="flex gap-3 text-sm text-cream/80">
                <span className="mt-1 h-px w-5 shrink-0" style={{ background: "#8fb8b3" }} />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Right — the request form, raised on its own card so it feels like
          a distinct booking widget rather than a flat page form. */}
      <div className="flex items-center bg-sandLight px-6 py-16 md:w-1/2 md:py-24">
        <div className="mx-auto w-full max-w-md">
          {status === "sent" ? (
            <div className="rounded-2xl bg-white p-8 text-center shadow-xl md:p-10">
              <p className="text-xs tracking-widest2 uppercase" style={{ color: "#3f6863" }}>
                Request Sent
              </p>
              <h2 className="mt-4 font-serif text-3xl font-light">Thank you!</h2>
              <p className="mt-4 text-sm text-black/70">
                Marci has your preferred date and time and will follow up
                by email {"—"} and by text if you left a number {"—"} to
                confirm your session.
              </p>
            </div>
          ) : (
            <div className="rounded-2xl bg-white p-8 shadow-xl md:p-10">
              <h2 className="font-serif text-2xl font-light">Request a session</h2>
              <p className="mt-2 text-sm text-black/60">
                This sends a request, not a confirmed booking {"—"} Marci
                will reach back out to lock in the details.
              </p>

              <form onSubmit={handleSubmit} className="mt-8 space-y-5">
                <div className="grid gap-5 sm:grid-cols-2">
                  <Field label="Full name" name="name" required />
                  <Field label="Email" name="email" type="email" required />
                </div>

                <Field
                  label="Phone (optional, so Marci can text you)"
                  name="phone"
                  type="tel"
                />

                <div className="grid gap-5 sm:grid-cols-2">
                  <Field
                    label="Preferred date"
                    name="preferredDate"
                    type="date"
                    required
                  />
                  <Select
                    label="Preferred time"
                    name="preferredTime"
                    options={TIME_OPTIONS}
                    required
                  />
                </div>

                <TextArea
                  label="Anything Marci should know? (session type, location, experience level)"
                  name="message"
                />

                <button
                  type="submit"
                  className="w-full rounded-lg px-6 py-3 text-xs tracking-widest2 uppercase text-white transition-colors disabled:opacity-60"
                  style={{ background: "#3f6863" }}
                  disabled={status === "sending"}
                >
                  {status === "sending" ? "Sending..." : "Request a Session"}
                </button>

                {status === "error" && (
                  <p className="text-sm text-red-700">{errorMsg}</p>
                )}
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function Field({
  label,
  name,
  type = "text",
  required,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label className="mb-1 block text-xs tracking-widest2 uppercase text-black/60">
        {label}
      </label>
      <input
        type={type}
        name={name}
        required={required}
        className="w-full rounded-lg border border-black/10 bg-white px-4 py-3 text-sm outline-none focus:border-[#3f6863] focus:ring-1 focus:ring-[#3f6863]"
      />
    </div>
  );
}

function TextArea({
  label,
  name,
  required,
}: {
  label: string;
  name: string;
  required?: boolean;
}) {
  return (
    <div>
      <label className="mb-1 block text-xs tracking-widest2 uppercase text-black/60">
        {label}
      </label>
      <textarea
        name={name}
        required={required}
        rows={4}
        className="w-full rounded-lg border border-black/10 bg-white px-4 py-3 text-sm outline-none focus:border-[#3f6863] focus:ring-1 focus:ring-[#3f6863]"
      />
    </div>
  );
}

function Select({
  label,
  name,
  options,
  required,
}: {
  label: string;
  name: string;
  options: { value: string; label: string }[];
  required?: boolean;
}) {
  return (
    <div>
      <label className="mb-1 block text-xs tracking-widest2 uppercase text-black/60">
        {label}
      </label>
      <select
        name={name}
        required={required}
        defaultValue=""
        className="w-full rounded-lg border border-black/10 bg-white px-4 py-3 text-sm outline-none focus:border-[#3f6863] focus:ring-1 focus:ring-[#3f6863]"
      >
        <option value="" disabled>
          Select an option
        </option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}
