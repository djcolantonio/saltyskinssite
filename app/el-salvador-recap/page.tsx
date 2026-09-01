import Image from "next/image";

const photos = [
  "DSC00054-1",
  "DSC00057",
  "DSC00079",
  "DSC00091",
  "DSC00098",
  "DSC00107",
  "DSC00116",
  "DSC00120",
  "DSC00130",
  "DSC00136",
  "DSC00147",
  "DSC00155",
];

export default function ElSalvadorRecapPage() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-24 text-center">
      <p className="label-caps">El Salvador Recap</p>
      <h1 className="mt-4 font-serif text-4xl font-light md:text-5xl">
        Memories from the Coast
      </h1>
      <p className="mx-auto mt-6 max-w-2xl text-ink/80">
        Every retreat is a unique experience shaped by the people who come
        together for it. These moments capture the connection, growth, and
        energy that unfold throughout the journey. From quiet reflection to
        shared laughter and everything in between, take a look at some of the
        memories from our El Salvador retreat below!
      </p>
      {/* This is a curated sample from the full album — more photos can be
          added the same way once the rest are ready to migrate over. */}
      <div className="mt-16 grid grid-cols-2 gap-4 sm:grid-cols-3">
        {photos.map((name) => (
          <div key={name} className="relative aspect-square overflow-hidden">
            <Image
              src={`/images/el-salvador/${name}.jpg`}
              alt="El Salvador retreat memory"
              fill
              className="object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
