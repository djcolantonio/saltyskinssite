"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const RECAPS = [
  { href: "/el-salvador-recap", label: "El Salvador Recap" },
  { href: "/italy-recap", label: "Italy Recap" },
];

export default function RecapsDropdown() {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;

    function onClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }

    document.addEventListener("mousedown", onClickOutside);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onClickOutside);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <div
      ref={containerRef}
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-1 hover:text-sand transition-colors"
        aria-expanded={open}
        aria-haspopup="true"
      >
        Recaps
        <svg
          width="10"
          height="10"
          viewBox="0 0 10 10"
          fill="none"
          aria-hidden="true"
          className={`mt-px transition-transform ${open ? "rotate-180" : ""}`}
        >
          <path
            d="M1.5 3.5L5 7L8.5 3.5"
            stroke="currentColor"
            strokeWidth="1.3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      {open && (
        <div className="absolute left-0 top-full z-20 pt-3">
          <div className="min-w-[190px] rounded-sm border border-black/10 bg-cream py-2 shadow-lg">
            {RECAPS.map((recap) => (
              <Link
                key={recap.href}
                href={recap.href}
                className="block px-4 py-2 text-sm text-ink hover:bg-sandLight hover:text-sand"
                onClick={() => setOpen(false)}
              >
                {recap.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
