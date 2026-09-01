import fs from "fs";
import path from "path";
import Image from "next/image";

function getPhotos() {
  const dir = path.join(process.cwd(), "public/images/el-salvador");
  const files = fs.readdirSync(dir);
  return files
    .filter((file) => /\.(jpe?g|png)$/i.test(file))
    .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }))
    .map((file) => `/images/el-salvador/${file}`);
}

export default function ElSalvadorRecapPage() {
  const photos = getPhotos();

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
      <div className="mt-16 grid grid-cols-2 gap-4 sm:grid-cols-3">
        {photos.map((src) => (
          <div key={src} className="relative aspect-square overflow-hidden">
            <Image
              src={src}
              alt="El Salvador retreat memory"
              fill
              sizes="(max-width: 640px) 50vw, 33vw"
              className="object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
