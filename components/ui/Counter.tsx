"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

type CounterProps = {
  to: number;
  suffix?: string;
  duration?: number;
  className?: string;
};

/** Counts from 0 to `to` once, when scrolled into view. */
export function Counter({ to, suffix = "", duration = 2, className = "" }: CounterProps) {
  const ref = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      const el = ref.current!;
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const state = { val: 0 };
        el.textContent = `0${suffix}`;
        gsap.to(state, {
          val: to,
          duration,
          ease: "power2.out",
          snap: { val: 1 },
          onUpdate: () => {
            el.textContent = `${state.val}${suffix}`;
          },
          scrollTrigger: { trigger: el, start: "top 90%", once: true },
        });
      });
    },
    { scope: ref },
  );

  return (
    <span ref={ref} className={className}>
      {to}
      {suffix}
    </span>
  );
}
