"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { gsap, useGSAP } from "@/lib/gsap";

export function ProductGallery({ images, name }: { images: string[]; name: string }) {
  const [active, setActive] = useState(0);
  const main = useRef<HTMLDivElement>(null);
  const first = useRef(true);

  // soft cross-fade whenever a thumbnail is chosen
  useGSAP(
    () => {
      if (first.current) {
        first.current = false;
        return;
      }
      gsap.fromTo(main.current, { opacity: 0.2, scale: 0.98 }, { opacity: 1, scale: 1, duration: 0.5, ease: "power2.out" });
    },
    { dependencies: [active], scope: main },
  );

  return (
    <div className="flex flex-col gap-3 md:flex-row-reverse md:gap-4">
      <div ref={main} className="relative aspect-square w-full overflow-hidden rounded-2xl bg-[#f5f7fb]">
        <Image
          src={images[active]}
          alt={`${name} – image ${active + 1} of ${images.length}`}
          fill
          priority
          sizes="(min-width:768px) 45vw, 100vw"
          className="object-cover"
        />
      </div>

      {images.length > 1 && (
        <ul className="flex gap-3 md:w-20 md:flex-col md:gap-4" aria-label="Product images">
          {images.map((src, i) => (
            <li key={src} className="w-16 md:w-full">
              <button
                type="button"
                onClick={() => setActive(i)}
                aria-label={`Show image ${i + 1}`}
                aria-pressed={active === i}
                className={`relative block aspect-square w-full overflow-hidden rounded-lg border-2 bg-[#f5f7fb] transition-colors ${
                  active === i ? "border-brand" : "border-transparent opacity-70 hover:opacity-100"
                }`}
              >
                <Image src={src} alt="" fill sizes="80px" className="object-cover" />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
