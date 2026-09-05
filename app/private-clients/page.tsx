"use client";

import { useState } from "react";

const TIME_OPTIONS = [
  { value: "morning", label: "Morning (7–10am)" },
  { value: "midday", label: "Midday (10am–1pm)" },
  { value: "afternoon", label: "Afternoon (1–5pm)" },
  { value: "evening", label: "Evening (5–8pm)" },
  { value: "flexible", label: "I'm flexible" },
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

  if (status === "sent") {
    return (
      <div className="bg-sandLight">
        <div className="mx-auto max-w-2xl px-6 py-32 text-center">
          <p className="label-caps">Request Sent</p>
          <h1 className="mt-4 font-serif text-4xl font-light">
            Thank you!
          </h1>
          <p className="mt-6 text-black">
            Marci has your preferred date and time and will follow up by
            email {"—"} and by text if you left a number {"—"} to
            confirm your session.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-sandLight">
      <div className="mx-auto max-w-2xl px-6 py-24">
        <p className="label-caps text-center">One-on-One Sessions</p>
        <h1 className="mt-4 text-center font-serif text-4xl font-light md:text-5xl">
          Private Clients
        </h1>
        <p className="mx-auto mt-6 max-w-xl text-center text-black">
          Private yoga sessions with Marci, tailored to you. Choose a date
          and time that works for you below {"—"} Marci will follow up
          by email or text to confirm your session.
        </p>

        <form onSubmit={handleSubmit} className="mt-14 space-y-6">
          <div className="grid gap-6 sm:grid-cols-2">
            <Field label="Full name" name="name" required />
            <Field label="Email" name="email" type="email" required />
          </div>

          <Field
            label="Phone (optional, so Marci can text you)"
            name="phone"
            type="tel"
          />

          <div className="grid gap-6 sm:grid-cols-2">
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
            className="btn-solid w-full sm:w-auto"
            disabled={status === "sending"}
          >
            {status === "sending" ? "Sending..." : "Request a Session"}
          </button>

          {status === "error" && (
            <p className="text-sm text-red-700">{errorMsg}</p>
          )}

          <p className="text-xs text-black/50">
            This sends a request, not a confirmed booking {"—"} Marci
            will reach back out to lock in the details.
          </p>
        </form>
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
      <label className="mb-1 block text-xs tracking-widest2 uppercase text-black">
        {label}
      </label>
      <input
        type={type}
        name={name}
        required={required}
        className="w-full border border-black/15 bg-white px-4 py-3 text-sm outline-none focus:border-sand"
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
      <label className="mb-1 block text-xs tracking-widest2 uppercase text-black">
        {label}
      </label>
      <textarea
        name={name}
        required={required}
        rows={4}
        className="w-full border border-black/15 bg-white px-4 py-3 text-sm outline-none focus:border-sand"
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
      <label className="mb-1 block text-xs tracking-widest2 uppercase text-black">
        {label}
      </label>
      <select
        name={name}
        required={required}
        defaultValue=""
        className="w-full border border-black/15 bg-white px-4 py-3 text-sm outline-none focus:border-sand"
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
