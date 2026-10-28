"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { gsap, useGSAP } from "@/lib/gsap";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { faqs } from "@/data/site";

export function Faq() {
  const [open, setOpen] = useState<number | null>(null);
  const root = useRef<HTMLElement>(null);

  // animate answer height + plus/minus icon whenever the open item changes
  useGSAP(
    () => {
      gsap.utils.toArray<HTMLElement>("[data-answer]").forEach((el, i) => {
        gsap.to(el, { height: open === i ? "auto" : 0, opacity: open === i ? 1 : 0, duration: 0.4, ease: "power2.out" });
      });
      gsap.utils.toArray<HTMLElement>("[data-vbar]").forEach((el, i) => {
        gsap.to(el, { scaleY: open === i ? 0 : 1, duration: 0.3, ease: "power2.out" });
      });
    },
    { scope: root, dependencies: [open] },
  );

  return (
    <section ref={root} id="faq" className="bg-white py-16 md:py-24">
      <Container>
        <Reveal className="col-span-4 md:col-span-6">
          <SectionHeading
            label="Frequently asked questions"
            title={<>Everything You Need to Know Before Getting Started</>}
          />

          <ul className="mt-10 divide-y divide-black/10 border-b border-black/10">
            {faqs.map((f, i) => (
              <li key={f.q}>
                <h3>
                  <button
                    type="button"
                    aria-expanded={open === i}
                    aria-controls={`faq-${i}`}
                    onClick={() => setOpen(open === i ? null : i)}
                    className="flex w-full items-center justify-between gap-4 py-4 text-left text-sm"
                  >
                    {f.q}
                    <span className="relative size-3 shrink-0" aria-hidden>
                      <span className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-black" />
                      <span data-vbar className="absolute inset-y-0 left-1/2 w-px -translate-x-1/2 bg-black" />
                    </span>
                  </button>
                </h3>
                <div id={`faq-${i}`} data-answer role="region" className="h-0 overflow-hidden opacity-0">
                  <p className="pb-4 pr-8 text-xs leading-relaxed text-black/60">{f.a}</p>
                </div>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={0.15} className="col-span-4 mt-12 md:col-span-5 md:col-start-8 md:mt-0">
          <div className="relative aspect-[1.25] overflow-hidden rounded-lg">
            <Image src="/images/faqImg.png" alt="Modern HVAC rooftop installation" fill sizes="(min-width:768px) 40vw, 100vw" className="object-cover" />
          </div>
          <p className="mt-5 text-sm">Modern HVAC for home upgrade</p>
          <p className="mt-1 text-xs text-black/40">Engineered systems designed to elevate everyday living</p>
        </Reveal>
      </Container>
    </section>
  );
}
