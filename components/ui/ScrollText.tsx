"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

type Segment = { text: string; className?: string; color?: string };

type ScrollTextProps = {
  segments: Segment[];
  /** word color before it is revealed */
  from?: string;
  /** word color after it is revealed (per-segment `color` overrides) */
  to?: string;
  className?: string;
};

/** Scroll-scrubbed reveal: each word goes from a light color to its dark color. */
export function ScrollText({
  segments,
  from = "#c7ccd6",
  to = "#1a1a1a",
  className = "",
}: ScrollTextProps) {
  const ref = useRef<HTMLParagraphElement>(null);

  useGSAP(
    () => {
      const words = gsap.utils.toArray<HTMLElement>("[data-word]", ref.current);
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        words.forEach((w) => (w.style.color = from));
        words.forEach((w, i) => {
          gsap.to(w, {
            color: w.dataset.color || to,
            ease: "none",
            scrollTrigger: {
              trigger: ref.current,
              start: `top+=${(i / words.length) * 60}% 80%`,
              end: `top+=${((i + 1) / words.length) * 60 + 10}% 55%`,
              scrub: true,
            },
          });
        });
      });

      mm.add("(prefers-reduced-motion: reduce)", () => {
        words.forEach((w) => (w.style.color = w.dataset.color || to));
      });
    },
    { scope: ref },
  );

  return (
    <p ref={ref} className={className}>
      {segments.flatMap((seg, si) =>
        seg.text
          .split(" ")
          .filter(Boolean)
          .map((word, wi) => (
            <span
              key={`${si}-${wi}`}
              data-word
              data-color={seg.color}
              className={seg.className}
              style={{ color: seg.color || to }}
            >
              {word}{" "}
            </span>
          )),
      )}
    </p>
  );
}
