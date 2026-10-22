"use client";

import { useRef } from "react";
import Image from "next/image";
import { gsap, useGSAP } from "@/lib/gsap";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Counter } from "@/components/ui/Counter";
import { heroStat } from "@/data/site";

export function Hero() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
        tl.from("[data-hero-bg]", { scale: 1.12, duration: 1.8, ease: "power2.out" }, 0)
          .from("[data-hero-line]", { yPercent: 110, duration: 1, stagger: 0.12 }, 0.2)
          .from("[data-hero-fade]", { opacity: 0, y: 24, duration: 0.8, stagger: 0.12 }, 0.7)
          .from("[data-hero-card]", { opacity: 0, y: 40, duration: 0.9 }, 1);
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} id="top" className="relative flex min-h-[100svh] items-end overflow-hidden text-white">
      <div data-hero-bg className="absolute inset-0">
        <Image src="/images/HeroBG.webp" alt="" fill priority sizes="100vw" className="object-cover" />
      </div>
      <div className="absolute inset-0 bg-black/50" />

      <Container className="relative pb-10 md:pb-14">
        <div className="col-span-4 md:col-span-7 lg:col-span-6">
          <h1 className="text-5xl font-medium leading-[1.05] tracking-tight md:text-6xl">
            {["Elevated Climate", "Comfort, Precisely", "Engineered"].map((line) => (
              <span key={line} className="block overflow-hidden pb-1">
                <span data-hero-line className="block">
                  {line}
                </span>
              </span>
            ))}
          </h1>
          <p data-hero-fade className="mt-6 max-w-sm text-sm font-medium leading-snug">
            Refined heating and cooling solutions designed for performance, discretion, and lasting quality.
          </p>
          <div data-hero-fade className="mt-6">
            <Button href="#contact" arrow>
              Get a Quote
            </Button>
          </div>
        </div>

        <div
          data-hero-card
          className="col-span-4 mt-10 flex items-center gap-4 rounded-xl border border-white/10 bg-white/15 p-3 backdrop-blur-md md:col-span-5 md:col-start-8 md:mt-0 md:self-end lg:col-span-4 lg:col-start-9"
        >
          <div className="relative size-28 shrink-0 overflow-hidden rounded-lg bg-white">
            <Image src="/images/ProductImg/SAD-AG-001.jpeg" alt="Louvered air grille" fill sizes="112px" className="object-cover" />
          </div>
          <div>
            <p className="text-sm font-medium leading-snug">{heroStat.text}</p>
            <p className="mt-3 text-4xl font-medium">
              <Counter to={heroStat.value} suffix={heroStat.suffix} />
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
