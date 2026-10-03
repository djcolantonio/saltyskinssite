"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import SubscribeForm from "@/components/SubscribeForm";
import {
  photos,
  photoSrc,
  type MomentCategory,
  type RetreatPhoto,
} from "./photos";

const chapters = [
  { id: "yoga", label: "The practice" },
  { id: "poolside", label: "The exhale" },
  { id: "food", label: "The FOOD" },
  { id: "community", label: "The people" },
];
const categories: ("All moments" | MomentCategory)[] = [
  "All moments",
  "Yoga",
  "Coast",
  "Poolside",
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

export default function ItalyJournal() {
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
          src={photoSrc("dsc00768")}
          alt="The blue Amalfi coastline below the Italian cliffs"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/35 to-ink/10" />
        <div className="relative mx-auto w-full max-w-6xl px-6 pb-16 pt-28 md:pb-20">
          <p className="text-xs uppercase tracking-widest2 text-cream/85">
            The Italy journal · Salty Skins Retreats
          </p>
          <h1 className="mt-5 max-w-3xl font-serif text-6xl font-light leading-[0.95] md:text-8xl">
            A little Italy.
            <br />
            <span className="italic text-sandLight">A lot of soul.</span>
          </h1>
          <p className="mt-7 max-w-md text-base font-light leading-relaxed text-cream/85 md:text-lg">
            Mats with a view. Adventures above the sea. Food worth talking
            about. And the people who made it all matter.
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
        aria-label="Italy journal chapters"
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
        <p className="label-caps">Furore · Amalfi Coast · Italy</p>
        <h2 className="mt-5 font-serif text-4xl font-light leading-tight md:text-5xl">
          Some trips fill your camera roll.
          <br />
          <span className="italic text-sea">
            This one filled a little more.
          </span>
        </h2>
        <p className="mx-auto mt-6 max-w-2xl leading-relaxed text-ink/70">
          Our Italy retreat brought movement, adventure, rest, and really good
          food into the same beautiful week. Here is a little of what it felt
          like to be there, one shared moment at a time.
        </p>
      </section>

      <section
        id="yoga"
        className="scroll-mt-8 bg-sandLight/60 px-6 py-20 md:py-24"
      >
        <div className="mx-auto grid max-w-6xl items-center gap-10 md:grid-cols-2 md:gap-16">
          <div>
            <p className="label-caps">01 / The practice</p>
            <h2 className="mt-4 font-serif text-4xl font-light md:text-5xl">
              Meet yourself
              <br />
              <span className="italic text-sea">on the mat.</span>
            </h2>
            <p className="mt-6 max-w-md leading-relaxed text-ink/70">
              Yoga was one of the threads that brought us together. A terrace
              became our studio, the sea became our backdrop, and each practice
              offered space to move, breathe, and reconnect.
            </p>
            <p className="mt-4 max-w-md leading-relaxed text-ink/70">
              Some moments asked for energy. Others asked us to soften. There
              was room for both, and for a smile along the way.
            </p>
            <div className="mt-7 flex flex-wrap gap-2">
              <span className="border border-sand/60 px-3 py-2 text-xs text-sea">
                Movement
              </span>
              <span className="border border-sand/60 px-3 py-2 text-xs text-sea">
                Breath
              </span>
              <span className="border border-sand/60 px-3 py-2 text-xs text-sea">
                A view like this
              </span>
            </div>
          </div>
          <Photo
            onOpen={setActivePhoto}
            id="dsc00792"
            className="bg-cream p-3 pb-5 shadow-sm md:rotate-2"
          />
        </div>
        <div className="mx-auto mt-10 grid max-w-6xl gap-6 sm:grid-cols-3">
          <Photo onOpen={setActivePhoto} id="dsc01046" />
          <Photo onOpen={setActivePhoto} id="dsc00805" />
          <Photo onOpen={setActivePhoto} id="dsc01047" />
        </div>
      </section>

      <section
        id="poolside"
        className="scroll-mt-8 bg-sea px-6 py-20 text-cream md:py-24"
      >
        <div className="mx-auto max-w-6xl">
          <div className="mx-auto max-w-2xl text-center">
            <p className="label-caps text-sandLight">02 / The exhale</p>
            <h2 className="mt-4 font-serif text-4xl font-light md:text-5xl">
              Poolside wellness.
              <br />
              <span className="italic text-sandLight">
                Permission to pause.
              </span>
            </h2>
            <p className="mt-6 leading-relaxed text-cream/75">
              Wellness had room for the quiet moments, too. Poolside time meant
              slowing down, cooling off, and enjoying the company. Sometimes the
              best thing on the schedule was a little space.
            </p>
          </div>
          <div className="mt-12 grid items-start gap-8 md:grid-cols-2">
            <Photo
              onOpen={setActivePhoto}
              id="dsc00785"
              className="bg-cream p-3 pb-5 shadow-lg md:-rotate-2"
            />
            <Photo
              onOpen={setActivePhoto}
              id="dsc00780"
              className="bg-cream p-3 pb-5 shadow-lg md:mt-12 md:rotate-2"
            />
          </div>
        </div>
      </section>

      <section
        id="food"
        className="scroll-mt-8 bg-sandLight/50 px-6 py-20 md:py-28"
      >
        <div className="mx-auto max-w-6xl">
          <div className="grid items-end gap-8 md:grid-cols-2">
            <div>
              <p className="label-caps">03 / At the table</p>
              <h2 className="mt-4 font-serif text-5xl font-light md:text-7xl">
                And then,
                <br />
                <span className="italic text-sea">the FOOD.</span>
              </h2>
            </div>
            <div>
              <p className="leading-relaxed text-ink/70">
                Our chef made food a highlight all its own. Generous spreads,
                beautiful plates, and the kind of care you could see before you
                even took a bite.
              </p>
              <p className="mt-4 leading-relaxed text-ink/70">
                The table became another place to connect. To linger, pass a
                plate, and appreciate a very delicious part of the retreat.
              </p>
            </div>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-[2fr_1fr]">
            <Photo
              onOpen={setActivePhoto}
              id="dsc01060"
              imageClass="aspect-[4/3]"
            />
            <Photo
              onOpen={setActivePhoto}
              id="dsc00904"
              imageClass="aspect-[4/3] md:aspect-[3/4]"
            />
          </div>
          <div className="mt-8 grid gap-6 sm:grid-cols-3">
            <Photo onOpen={setActivePhoto} id="dsc00925" />
            <Photo onOpen={setActivePhoto} id="dsc00761" />
            <Photo onOpen={setActivePhoto} id="dsc00945" />
          </div>
          <div className="mt-10 border-y border-sand/40 py-7 text-center">
            <p className="font-serif text-3xl italic text-sea md:text-4xl">
              Come for the retreat. Remember the meals.
            </p>
          </div>
        </div>
      </section>

      <section id="community" className="scroll-mt-8 px-6 py-20 md:py-28">
        <div className="mx-auto max-w-6xl">
          <div className="mx-auto max-w-2xl text-center">
            <p className="label-caps">04 / The people</p>
            <h2 className="mt-4 font-serif text-4xl font-light md:text-5xl">
              The best part
              <br />
              <span className="italic text-sea">
                was who we shared it with.
              </span>
            </h2>
            <p className="mt-6 leading-relaxed text-ink/70">
              The scenery was beautiful. The connection made it personal. Shared
              practices, meals, conversations, and celebrations turned a trip
              into something we could carry home.
            </p>
          </div>
          <Photo
            onOpen={setActivePhoto}
            id="dsc01070"
            className="mt-12"
            imageClass="aspect-[4/3] md:aspect-[16/9]"
          />
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            <Photo onOpen={setActivePhoto} id="dsc00959" />
            <Photo onOpen={setActivePhoto} id="dsc01069" />
          </div>
        </div>
      </section>

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
        aria-label="Italy retreat photo viewer"
        aria-describedby="italy-photo-caption"
        className="fixed inset-0 m-auto h-[100dvh] max-h-none w-screen max-w-none bg-ink/95 p-4 text-cream backdrop:bg-ink/90 sm:p-8"
      >
        {activePhoto && (
          <div className="flex h-full flex-col">
            <div className="flex items-center justify-between">
              <p className="text-xs uppercase tracking-widest2 text-sandLight">
                {activePhoto.category} · Italy journal
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
                id="italy-photo-caption"
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
