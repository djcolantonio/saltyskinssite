"use client";

import { useCallback, useEffect, useState } from "react";
import type { TouchEvent } from "react";
import Image from "next/image";

export default function PhotoGallery({ photos }: { photos: string[] }) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);

  const close = useCallback(() => setActiveIndex(null), []);

  const showPrev = useCallback(() => {
    setActiveIndex((i) => (i === null ? null : (i - 1 + photos.length) % photos.length));
  }, [photos.length]);

  const showNext = useCallback(() => {
    setActiveIndex((i) => (i === null ? null : (i + 1) % photos.length));
  }, [photos.length]);

  useEffect(() => {
    if (activeIndex === null) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      else if (e.key === "ArrowLeft") showPrev();
      else if (e.key === "ArrowRight") showNext();
    };

    window.addEventListener("keydown", onKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [activeIndex, close, showPrev, showNext]);

  const onTouchStart = (e: TouchEvent) => setTouchStartX(e.touches[0].clientX);

  const onTouchEnd = (e: TouchEvent) => {
    if (touchStartX === null) return;
    const dx = e.changedTouches[0].clientX - touchStartX;
    if (Math.abs(dx) > 50) {
      if (dx > 0) showPrev();
      else showNext();
    }
    setTouchStartX(null);
  };

  return (
    <>
      <div className="mt-16 grid grid-cols-2 gap-4 sm:grid-cols-3">
        {photos.map((src, index) => (
          <button
            key={src}
            type="button"
            onClick={() => setActiveIndex(index)}
            className="group relative aspect-square overflow-hidden focus:outline-none focus-visible:ring-2 focus-visible:ring-sand"
            aria-label="View larger photo"
          >
            <Image
              src={src}
              alt="El Salvador retreat memory"
              fill
              sizes="(max-width: 640px) 50vw, 33vw"
              className="object-cover transition-transform duration-200 group-hover:scale-105"
            />
          </button>
        ))}
      </div>

      {activeIndex !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 px-4 py-8"
          onClick={close}
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
          role="dialog"
          aria-modal="true"
        >
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              close();
            }}
            className="absolute right-4 top-4 text-3xl leading-none text-white/80 transition-colors hover:text-white"
            aria-label="Close"
          >
            &times;
          </button>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              showPrev();
            }}
            className="absolute left-2 top-1/2 -translate-y-1/2 p-3 text-4xl leading-none text-white/70 transition-colors hover:text-white sm:left-6"
            aria-label="Previous photo"
          >
            &#8249;
          </button>

          <div
            className="relative h-full max-h-[85vh] w-full max-w-4xl"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={photos[activeIndex]}
              alt="El Salvador retreat memory, enlarged"
              fill
              sizes="100vw"
              className="object-contain"
              priority
            />
          </div>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              showNext();
            }}
            className="absolute right-2 top-1/2 -translate-y-1/2 p-3 text-4xl leading-none text-white/70 transition-colors hover:text-white sm:right-6"
            aria-label="Next photo"
          >
            &#8250;
          </button>

          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 font-mono text-xs text-white/60">
            {activeIndex + 1} / {photos.length}
          </div>
        </div>
      )}
    </>
  );
}
