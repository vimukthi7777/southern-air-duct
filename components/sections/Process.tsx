"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { processSteps } from "@/data/site";

export function Process() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const tl = gsap.timeline({ scrollTrigger: { trigger: "[data-steps]", start: "top 80%", once: true } });
        tl.from("[data-step]", { opacity: 0, y: 30, duration: 0.7, stagger: 0.25, ease: "power3.out" }, 0).from(
          "[data-line]",
          { scaleX: 0, transformOrigin: "left center", duration: 0.7, stagger: 0.25, ease: "power2.inOut" },
          0,
        );
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} id="process" className="bg-brand py-16 text-white md:py-24">
      <Container>
        <SectionHeading
          light
          label="How it works"
          title="From enquiry to installation in four simple steps."
          className="col-span-4 md:col-span-10"
        />

        <ol data-steps className="col-span-4 mt-12 grid grid-cols-2 gap-x-5 gap-y-10 md:col-span-12 md:mt-16 md:grid-cols-4">
          {processSteps.map((s, i) => (
            <li key={s.title} data-step className="group">
              <div className="flex items-center">
                <span
                  className={`grid size-10 shrink-0 place-items-center rounded-full border border-white text-sm ${
                    i === 0 ? "bg-white text-brand" : ""
                  }`}
                >
                  {i + 1}
                </span>
                <span data-line className="ml-2 h-px flex-1 bg-white/80 max-md:group-even:hidden md:ml-0" />
              </div>
              <h3 className="mt-6 text-lg">{s.title}</h3>
              <p className="mt-2 max-w-60 text-xs leading-relaxed text-white/80">{s.text}</p>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
