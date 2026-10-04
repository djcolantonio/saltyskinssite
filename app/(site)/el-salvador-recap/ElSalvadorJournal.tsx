"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import SubscribeForm from "@/components/SubscribeForm";
import PhotoGallery from "./PhotoGallery";
import {
  photos,
  photoSrc,
  type MomentCategory,
  type RetreatPhoto,
} from "./photos";

const chapters = [
  {
    id: "yoga",
    label: "The practice",
    title: "Find your flow.",
    accent: "Feel a little more you.",
    body: "Yoga brought us back to the body. A shared studio, a mat of our own, and time to breathe, stretch, and find our rhythm together.",
    note: "From focused movement to the smiles between poses, the practice made room for energy and ease.",
    photos: ["DSC00295", "DSC00567", "DSC00306", "DSC00555"],
  },
  {
    id: "surf",
    label: "The waves",
    title: "A little courage.",
    accent: "A lot of ocean.",
    body: "Surfing brought a different kind of movement. We started on the sand, found our feet on the boards, and took the experience into the Pacific.",
    note: "Trying something together is a memory all its own. The beach became another place to learn, play, and cheer each other on.",
    photos: ["DSC00638", "DSC00631", "DSC00633", "DSC00640"],
  },
  {
    id: "rest",
    label: "The exhale",
    title: "Slow down.",
    accent: "You are already here.",
    body: "A hammock in the shade. A pool surrounded by greenery. Conversations that had room to wander. Rest was part of the experience, too.",
    note: "Between the planned moments, there was space to simply enjoy being here.",
    photos: ["DSC00118", "DSC00452", "DSC00140-rotated", "DSC00128"],
  },
  {
    id: "coast",
    label: "The coast",
    title: "Bare feet.",
    accent: "Wide-open horizons.",
    body: "The Pacific gave us a beautiful backdrop for beach walks, quiet moments by the water, and sunsets worth stopping for.",
    note: "We made time to take it in together. The sea, the sky, and the simple pleasure of being outside.",
    photos: ["DSC00466", "DSC00345-rotated", "DSC00461", "DSC00202"],
  },
  {
    id: "food",
    label: "At the table",
    title: "Pass a plate.",
    accent: "Stay a little longer.",
    body: "Shared meals gave us another reason to gather. Fresh drinks, tropical color, and good company turned time at the table into part of the retreat.",
    note: "Some of the best conversations happened between bites, long after the practice was over.",
    photos: ["DSC00099", "DSC00603", "DSC00444", "DSC00749"],
  },
  {
    id: "community",
    label: "The people",
    title: "Come for the coast.",
    accent: "Remember the connection.",
    body: "The setting was beautiful. The people made it personal. Shared practices, surf sessions, beach time, and evenings together gave us plenty of ways to connect.",
    note: "And yes, there was dancing. A little more movement, a little less taking ourselves seriously, and a lot of joy.",
    photos: ["DSC00744", "DSC00692-rotated", "DSC00718-rotated", "DSC00367"],
  },
];
const categories: ("All moments" | MomentCategory)[] = [
  "All moments",
  "Yoga",
  "Surf",
  "Slow moments",
  "Coast",
  "At the table",
  "Together",
];
function Photo({
  id,
  className = "",
  imageClass = "aspect-[4/3]",
  caption = true,
  onOpen,
}: {
  id: string;
  className?: string;
  imageClass?: string;
  caption?: boolean;
  onOpen: (photo: RetreatPhoto) => void;
}) {
  const photo = photos.find((item) => item.id === id)!;
  return (
    <figure className={className}>
      <button
        type="button"
        onClick={() => onOpen(photo)}
        aria-label={`Enlarge photo: ${photo.caption}`}
        className={`group relative block w-full overflow-hidden bg-sandLight focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sea ${imageClass}`}
      >
        <Image
          src={photoSrc(id)}
          alt={photo.caption}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover transition-transform duration-500 motion-reduce:transition-none group-hover:scale-[1.03]"
        />
        <span
          aria-hidden="true"
          className="absolute bottom-3 right-3 flex h-8 w-8 items-center justify-center rounded-full bg-cream/90 text-lg text-ink opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100"
        >
          +
        </span>
      </button>
      {caption && (
        <figcaption className="mt-3 text-sm leading-relaxed text-ink/65">
          {photo.caption}
        </figcaption>
      )}
    </figure>
  );
}

export default function ElSalvadorJournal({
  allPhotos,
}: {
  allPhotos: string[];
}) {
  const [activePhoto, setActivePhoto] = useState<RetreatPhoto | null>(null);
  const [category, setCategory] =
    useState<(typeof categories)[number]>("All moments");
  const dialogRef = useRef<HTMLDialogElement>(null);
  const touchStart = useRef<number | null>(null);
  const visiblePhotos =
    category === "All moments"
      ? photos
      : photos.filter((photo) => photo.category === category);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog || !activePhoto) return;
    if (!dialog.open) dialog.showModal();
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [activePhoto]);

  function closePhoto() {
    dialogRef.current?.close();
    setActivePhoto(null);
  }

  function stepPhoto(direction: number) {
    setActivePhoto((current) => {
      if (!current) return null;
      const sequence = visiblePhotos.some((photo) => photo.id === current.id)
        ? visiblePhotos
        : photos;
      const index = sequence.findIndex((photo) => photo.id === current.id);
      return sequence[(index + direction + sequence.length) % sequence.length];
    });
  }

  return (
    <div>
      <section className="relative isolate flex min-h-[78svh] items-end overflow-hidden bg-sea text-cream">
        <Image
          src={photoSrc("DSC00173")}
          alt="The Pacific coastline in El Salvador"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/35 to-ink/10" />
        <div className="relative mx-auto w-full max-w-6xl px-6 pb-16 pt-28 md:pb-20">
          <p className="text-xs uppercase tracking-widest2 text-cream/85">
            The El Salvador journal · Salty Skins Retreats
          </p>
          <h1 className="mt-5 max-w-3xl font-serif text-6xl font-light leading-[0.95] md:text-8xl">
            Salt in the air.
            <br />
            <span className="italic text-sandLight">Joy in the body.</span>
          </h1>
          <p className="mt-7 max-w-md text-base font-light leading-relaxed text-cream/85 md:text-lg">
            Yoga, waves, and time to slow down. Shared meals, Pacific sunsets, and the people who made it all matter.
          </p>
          <a
            href="#journal"
            className="mt-8 inline-flex items-center gap-4 border-b border-cream/50 pb-2 text-xs uppercase tracking-widest2 hover:text-sandLight"
          >
            Step inside the retreat <span aria-hidden="true">↓</span>
          </a>
        </div>
      </section>

      <nav
        aria-label="El Salvador journal chapters"
        className="border-b border-sand/30 bg-cream"
      >
        <div className="mx-auto flex max-w-6xl flex-wrap justify-center gap-x-7 gap-y-3 px-6 py-6">
          {chapters.map((chapter, index) => (
            <a
              key={chapter.id}
              href={`#${chapter.id}`}
              className="text-xs uppercase tracking-[0.12em] text-ink/65 transition-colors hover:text-sea"
            >
              <span className="mr-2 text-sandDark">0{index + 1}</span>
              {chapter.label}
            </a>
          ))}
        </div>
      </nav>

      <section
        id="journal"
        className="mx-auto max-w-4xl px-6 py-20 text-center md:py-28"
      >
        <p className="label-caps">Pacific Coast · El Salvador</p>
        <h2 className="mt-5 font-serif text-4xl font-light leading-tight md:text-5xl">
          Some trips fill your camera roll.
          <br />
          <span className="italic text-sea">
            This one filled a little more.
          </span>
        </h2>
        <p className="mx-auto mt-6 max-w-2xl leading-relaxed text-ink/70">
          Our El Salvador retreat brought movement, ocean time, rest, and good
          food into the same beautiful week. Here is a little of what it felt
          like to be there, one shared moment at a time.
        </p>
      </section>

      {chapters.map((chapter, index) => (
        <section
          key={chapter.id}
          id={chapter.id}
          className={`scroll-mt-8 px-6 py-20 md:py-24 ${index === 2 ? "bg-sea text-cream" : index % 2 === 0 ? "bg-sandLight/50" : "bg-cream"}`}
        >
          <div className="mx-auto max-w-6xl">
            <div className="grid items-center gap-10 md:grid-cols-2 md:gap-16">
              <div className={index % 2 ? "md:order-2" : ""}>
                <p
                  className={`label-caps ${index === 2 ? "text-sandLight" : ""}`}
                >
                  0{index + 1} / {chapter.label}
                </p>
                <h2 className="mt-4 font-serif text-4xl font-light md:text-5xl">
                  {chapter.title}
                  <br />
                  <span
                    className={`italic ${index === 2 ? "text-sandLight" : "text-sea"}`}
                  >
                    {chapter.accent}
                  </span>
                </h2>
                <p
                  className={`mt-6 max-w-md leading-relaxed ${index === 2 ? "text-cream/75" : "text-ink/70"}`}
                >
                  {chapter.body}
                </p>
                <p
                  className={`mt-4 max-w-md leading-relaxed ${index === 2 ? "text-cream/75" : "text-ink/70"}`}
                >
                  {chapter.note}
                </p>
              </div>
              <Photo
                onOpen={setActivePhoto}
                id={chapter.photos[0]}
                className={`bg-cream p-3 pb-5 shadow-sm ${index % 2 ? "md:-rotate-2" : "md:rotate-2"}`}
              />
            </div>
            <div className="mt-10 grid gap-6 sm:grid-cols-3">
              {chapter.photos.slice(1).map((id) => (
                <Photo
                  key={id}
                  onOpen={setActivePhoto}
                  id={id}
                  className={index === 2 ? "bg-cream p-3 pb-4" : ""}
                />
              ))}
            </div>
          </div>
        </section>
      ))}
      <section className="border-t border-sand/30 bg-sandLight/40 px-6 py-20">
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="label-caps">The camera roll</p>
              <h2 className="mt-3 font-serif text-4xl font-light">
                More little moments.
              </h2>
              <p className="mt-3 text-sm text-ink/60">
                Choose a chapter, then tap a photo to open the full memory.
              </p>
            </div>
            <p className="text-sm text-ink/50">
              {visiblePhotos.length} memories
            </p>
          </div>
          <div
            className="mt-8 flex flex-wrap gap-2"
            role="group"
            aria-label="Filter retreat photos"
          >
            {categories.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => setCategory(item)}
                aria-pressed={category === item}
                className={`border px-4 py-2 text-sm transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sea ${category === item ? "border-sea bg-sea text-cream" : "border-sand/50 bg-cream text-ink/70 hover:border-sea"}`}
              >
                {item}
              </button>
            ))}
          </div>
          <div className="mt-8 grid items-start gap-x-5 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
            {visiblePhotos.map((photo, index) => (
              <Photo
                onOpen={setActivePhoto}
                key={photo.id}
                id={photo.id}
                imageClass={index % 5 === 1 ? "aspect-[4/5]" : "aspect-[4/3]"}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-sand/30 px-6 py-16">
        <details className="mx-auto max-w-6xl">
          <summary className="cursor-pointer font-serif text-3xl text-sea">
            The full camera roll{" "}
            <span className="font-sans text-sm text-ink/50">
              ({allPhotos.length} photos)
            </span>
          </summary>
          <p className="mt-4 text-sm text-ink/60">
            Every original memory, including the candid moments between the
            highlights. Tap a photo to enlarge it.
          </p>
          <PhotoGallery photos={allPhotos} />
        </details>
      </section>
      <section className="bg-ink px-6 py-24 text-center text-cream">
        <div className="mx-auto max-w-2xl">
          <p className="label-caps">Your next chapter</p>
          <h2 className="mt-4 font-serif text-4xl font-light md:text-6xl">
            Wish you were here?
            <br />
            <span className="italic text-sandLight">
              Start with what comes next.
            </span>
          </h2>
          <p className="mx-auto mt-6 max-w-lg leading-relaxed text-cream/70">
            Our 2027 retreats are coming soon. Join the community to hear about
            new destinations, dates, and your next chance to come along.
          </p>
          <SubscribeForm />
          <Link
            href="/contact"
            className="mt-7 inline-block border-b border-sand/50 pb-1 text-sm text-sandLight hover:text-white"
          >
            Have a question? Talk to us
          </Link>
        </div>
      </section>

      <dialog
        ref={dialogRef}
        onCancel={() => setActivePhoto(null)}
        onClose={() => setActivePhoto(null)}
        onClick={(event) => {
          if (event.target === event.currentTarget) closePhoto();
        }}
        onKeyDown={(event) => {
          if (event.key === "ArrowLeft") {
            event.preventDefault();
            stepPhoto(-1);
          }
          if (event.key === "ArrowRight") {
            event.preventDefault();
            stepPhoto(1);
          }
        }}
        aria-label="El Salvador retreat photo viewer"
        aria-describedby="salvador-photo-caption"
        className="fixed inset-0 m-auto h-[100dvh] max-h-none w-screen max-w-none bg-ink/95 p-4 text-cream backdrop:bg-ink/90 sm:p-8"
      >
        {activePhoto && (
          <div className="flex h-full flex-col">
            <div className="flex items-center justify-between">
              <p className="text-xs uppercase tracking-widest2 text-sandLight">
                {activePhoto.category} · El Salvador journal
              </p>
              <button
                autoFocus
                type="button"
                onClick={closePhoto}
                aria-label="Close photo viewer"
                className="flex h-11 w-11 items-center justify-center text-3xl hover:text-sand"
              >
                ×
              </button>
            </div>
            <div
              className="relative mt-4 min-h-0 flex-1"
              onTouchStart={(event) => {
                touchStart.current = event.touches[0].clientX;
              }}
              onTouchEnd={(event) => {
                if (touchStart.current !== null) {
                  const delta =
                    event.changedTouches[0].clientX - touchStart.current;
                  if (Math.abs(delta) > 50) stepPhoto(delta > 0 ? -1 : 1);
                  touchStart.current = null;
                }
              }}
            >
              <Image
                src={photoSrc(activePhoto.id)}
                alt={activePhoto.caption}
                fill
                sizes="100vw"
                className="object-contain"
              />
            </div>
            <div className="mx-auto mt-5 flex w-full max-w-4xl items-center justify-between gap-4">
              <button
                type="button"
                onClick={() => stepPhoto(-1)}
                aria-label="Previous photo"
                className="h-12 w-12 shrink-0 border border-cream/30 text-3xl hover:border-sand"
              >
                ‹
              </button>
              <p
                id="salvador-photo-caption"
                aria-live="polite"
                className="max-w-xl text-center text-sm leading-relaxed text-cream/85"
              >
                {activePhoto.caption}
              </p>
              <button
                type="button"
                onClick={() => stepPhoto(1)}
                aria-label="Next photo"
                className="h-12 w-12 shrink-0 border border-cream/30 text-3xl hover:border-sand"
              >
                ›
              </button>
            </div>
          </div>
        )}
      </dialog>
    </div>
  );
}
