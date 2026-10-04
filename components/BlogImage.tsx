"use client";

import Image from "next/image";
import { useRef, useState } from "react";

type Props = { src: string; fullSrc: string; width: number; height: number; alt: string };

export default function BlogImage({ src, fullSrc, width, height, alt }: Props) {
  const dialog = useRef<HTMLDialogElement>(null);
  const [zoomed, setZoomed] = useState(false);
  const previousOverflow = useRef("");

  function open() {
    setZoomed(false);
    previousOverflow.current = document.body.style.overflow;
    dialog.current?.showModal();
    document.body.style.overflow = "hidden";
  }

  function close() {
    dialog.current?.close();
  }

  return (
    <figure className="my-8 w-full">
      <button type="button" onClick={open} className="block w-full cursor-zoom-in focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ink" aria-label={`Expand ${alt || "blog image"}`}>
        <Image src={src} alt={alt} width={width} height={height} sizes="(max-width: 768px) 100vw, 768px" className="h-auto w-full" />
      </button>
      <figcaption className="mt-3 text-center text-xs tracking-wide text-ink/60">Click or tap to enlarge</figcaption>
      <dialog ref={dialog} onClose={() => { document.body.style.overflow = previousOverflow.current; setZoomed(false); }} onClick={(event) => { if (event.target === event.currentTarget) close(); }} className="fixed inset-0 m-auto max-h-[95dvh] w-[96vw] max-w-6xl overflow-hidden border-0 bg-cream p-0 text-ink shadow-2xl backdrop:bg-black/75" aria-label="Expanded blog image">
        <div className="flex items-center justify-between gap-4 border-b border-ink/10 px-4 py-3">
          <button type="button" onClick={() => setZoomed(!zoomed)} className="rounded px-3 py-2 text-sm underline focus-visible:outline" aria-pressed={zoomed}>{zoomed ? "Fit to screen" : "Zoom in"}</button>
          <button type="button" onClick={close} autoFocus className="rounded px-3 py-2 text-sm focus-visible:outline" aria-label="Close expanded image">Close ×</button>
        </div>
        <div className="max-h-[calc(95dvh-4.5rem)] overflow-auto overscroll-contain p-2 sm:p-4">
          <div style={zoomed ? { width: Math.max(width, 1400) } : undefined}>
            <Image src={fullSrc} alt={alt} width={width} height={height} sizes={zoomed ? "2400px" : "(max-width: 1200px) 96vw, 1152px"} className="h-auto w-full max-w-none" />
          </div>
        </div>
      </dialog>
    </figure>
  );
}