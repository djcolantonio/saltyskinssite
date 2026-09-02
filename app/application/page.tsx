"use client";

import { useState } from "react";

const RETREATS = [
  { value: "upstate-ny", label: "Upstate, NY — Date TBA" },
  { value: "el-salvador-2027", label: "El Salvador — Feb 6–11, 2027" },
  { value: "other", label: "Not sure yet / future retreat" },
];

export default function ApplicationPage() {
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
      const res = await fetch("/api/application", {
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
        <p className="label-caps">Application Received</p>
        <h1 className="mt-4 font-serif text-4xl font-light">
          Thank you for applying!
        </h1>
        <p className="mt-6 text-black">
          We&rsquo;ve received your application and will be in touch within
          48 hours with next steps, including how to secure your spot with a
          deposit.
        </p>
      </div>
      </div>
    );
  }

  return (
    <div className="bg-sandLight">
    <div className="mx-auto max-w-2xl px-6 py-24">
      <p className="label-caps text-center">Ready to Go Deeper?</p>
      <h1 className="mt-4 text-center font-serif text-4xl font-light md:text-5xl">
        Retreat Application
      </h1>
      <p className="mx-auto mt-6 max-w-xl text-center text-black">
        Tell us a bit about yourself. Submitting this application doesn&rsquo;t
        charge you anything — we&rsquo;ll follow up with availability and a
        link to secure your spot with a deposit.
      </p>

      <form onSubmit={handleSubmit} className="mt-14 space-y-6">
        <div className="grid gap-6 sm:grid-cols-2">
          <Field label="Full name" name="fullName" required />
          <Field label="Email" name="email" type="email" required />
        </div>
        <div className="grid gap-6 sm:grid-cols-2">
          <Field label="Phone" name="phone" type="tel" required />
          <Field label="Instagram handle" name="instagram" />
        </div>

        <Select
          label="Which retreat are you applying for?"
          name="retreat"
          options={RETREATS}
          required
        />

        <Select
          label="Room preference"
          name="roomPreference"
          options={[
            { value: "single", label: "Single occupancy" },
            { value: "double", label: "Double occupancy (shared)" },
            { value: "no-preference", label: "No preference" },
          ]}
        />

        <Field
          label="Yoga / movement experience"
          name="experienceLevel"
          placeholder="e.g. beginner, intermediate, teacher — all levels welcome"
        />

        <TextArea
          label="Dietary restrictions or allergies"
          name="dietary"
        />

        <div className="grid gap-6 sm:grid-cols-2">
          <Field label="Emergency contact name" name="emergencyContactName" required />
          <Field
            label="Emergency contact phone"
            name="emergencyContactPhone"
            type="tel"
            required
          />
        </div>

        <Field
          label="How did you hear about us?"
          name="referralSource"
        />

        <TextArea
          label="Anything else you'd like us to know?"
          name="notes"
        />

        <label className="flex items-start gap-3 text-sm text-black">
          <input
            type="checkbox"
            name="waiverAcknowledged"
            required
            className="mt-1 h-4 w-4 border-black/30"
          />
          <span>
            I understand this is an application, not a confirmed reservation.
            I acknowledge that a signed liability waiver will be required to
            finalize my spot on the retreat.
          </span>
        </label>

        <button
          type="submit"
          className="btn-solid w-full sm:w-auto"
          disabled={status === "sending"}
        >
          {status === "sending" ? "Submitting..." : "Submit Application"}
        </button>

        {status === "error" && (
          <p className="text-sm text-red-700">{errorMsg}</p>
        )}
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
  placeholder,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  placeholder?: string;
}) {
  return (
    <div>
      <label className="mb-1 block text-xs tracking-widest2 uppercase text-black">
        {label}
        {required ? " (required)" : ""}
      </label>
      <input
        type={type}
        name={name}
        required={required}
        placeholder={placeholder}
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
        {required ? " (required)" : ""}
      </label>
      <textarea
        name={name}
        required={required}
        rows={3}
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
        {required ? " (required)" : ""}
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
