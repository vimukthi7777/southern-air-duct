"use client";

import { useRef } from "react";
import type { ReactNode } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

type RevealProps = {
  children: ReactNode;
  delay?: number;
  y?: number;
  /** animate direct children one after another instead of the wrapper */
  stagger?: number;
  className?: string;
};

/** Fade + slide-up when scrolled into view. Plays once. */
export function Reveal({ children, delay = 0, y = 40, stagger, className = "" }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const targets = stagger ? Array.from(ref.current!.children) : ref.current;
        gsap.from(targets, {
          opacity: 0,
          y,
          duration: 0.9,
          delay,
          stagger: stagger ?? 0,
          ease: "power3.out",
          scrollTrigger: { trigger: ref.current, start: "top 85%", once: true },
        });
      });
    },
    { scope: ref },
  );

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
