"use client";

import { useState } from "react";

export default function ContactPage() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle"
  );

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Request failed");
      setStatus("sent");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  return (
    <div className="mx-auto max-w-5xl px-6 py-24">
      <p className="label-caps text-center">We&rsquo;d Love to Hear From You</p>
      <h1 className="mt-4 text-center font-serif text-4xl font-light md:text-5xl">
        Say Hello
      </h1>
      <p className="mx-auto mt-6 max-w-xl text-center text-ink/80">
        Questions about a retreat, pricing, or just want to connect? We&rsquo;ll
        get back to you within 48 hours.
      </p>

      <div className="mt-16 grid gap-16 md:grid-cols-2">
        <div className="space-y-8">
          <InfoBlock label="Email" value="ssyogaretreats@gmail.com" />
          <InfoBlock label="Instagram" value="@ssyogaretreats" />
          <InfoBlock
            label="Based In"
            value="Rockville Centre, NY — Retreating worldwide"
          />
          <InfoBlock label="Response Time" value="Within 48 hours" />
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <h2 className="font-serif text-2xl">Send a Message</h2>
          <Field label="Name" name="name" required />
          <Field label="Email" name="email" type="email" required />
          <div>
            <label className="mb-1 block text-xs tracking-widest2 uppercase text-ink/60">
              Message
            </label>
            <textarea
              name="message"
              rows={5}
              className="w-full border border-black/15 bg-white px-4 py-3 text-sm outline-none focus:border-sand"
            />
          </div>
          <button type="submit" className="btn-solid" disabled={status === "sending"}>
            {status === "sending" ? "Sending..." : "Contact Us"}
          </button>
          {status === "sent" && (
            <p className="text-sm text-sea">Thanks — we&rsquo;ll be in touch soon!</p>
          )}
          {status === "error" && (
            <p className="text-sm text-red-700">
              Something went wrong. Please email us directly.
            </p>
          )}
        </form>
      </div>
    </div>
  );
}

function InfoBlock({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs tracking-widest2 uppercase text-sandDark">
        {label}
      </p>
      <p className="mt-1 text-ink">{value}</p>
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
      <label className="mb-1 block text-xs tracking-widest2 uppercase text-ink/60">
        {label}
        {required ? " (required)" : ""}
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
