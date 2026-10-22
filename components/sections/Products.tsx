"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap, useGSAP } from "@/lib/gsap";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { products, productCategories } from "@/data/products";

export function Products() {
  const root = useRef<HTMLElement>(null);
  const [active, setActive] = useState("All");

  const [expanded, setExpanded] = useState(false);

  const filters = ["All", ...productCategories];
  const filtered = products.filter((p) => active === "All" || p.category === active);
  const LIMIT = 8;
  const visible = expanded ? filtered : filtered.slice(0, LIMIT);
  const canExpand = !expanded && filtered.length > LIMIT;

  // entrance on scroll, and re-animate cards when the filter changes
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from("[data-card]", {
          opacity: 0,
          y: 40,
          duration: 0.7,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: { trigger: "[data-grid]", start: "top 85%", once: true },
        });
      });
    },
    { scope: root },
  );

  const { contextSafe } = useGSAP({ scope: root });
  const select = contextSafe((f: string) => {
    setActive(f);
    setExpanded(false);
    requestAnimationFrame(() =>
      gsap.fromTo("[data-card]", { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.5, stagger: 0.07, ease: "power2.out", overwrite: true }),
    );
  });

  const expand = contextSafe(() => {
    setExpanded(true);
    requestAnimationFrame(() =>
      gsap.fromTo("[data-card]", { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.5, stagger: 0.04, ease: "power2.out", overwrite: true }),
    );
  });

  return (
    <section ref={root} id="products" className="bg-white py-16 md:py-24">
      <Container>
        <SectionHeading label="Product catalogue" title="Browse Our Duct Range" className="col-span-4 md:col-span-12" />

        <div className="col-span-4 mt-6 flex flex-wrap gap-2 md:col-span-12" role="tablist" aria-label="Filter products">
          {filters.map((f) => (
            <button
              key={f}
              role="tab"
              aria-selected={active === f}
              onClick={() => select(f)}
              className={`rounded-full border px-4 py-1.5 text-[11px] font-medium transition-colors ${
                active === f ? "border-brand bg-brand text-white" : "border-black/10 text-black/50 hover:border-brand hover:text-brand"
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        <ul data-grid className="col-span-4 mt-8 grid grid-cols-2 gap-3 sm:gap-5 md:col-span-12 lg:grid-cols-4">
          {visible.map((p) => (
            <li key={p.id} data-card>
              <Link href={`/products/${p.slug}`} className="group block">
                <div className="relative aspect-square overflow-hidden rounded-2xl bg-[#f5f7fb]">
                  <Image
                    src={p.image}
                    alt={p.name}
                    fill
                    sizes="(min-width:1024px) 22vw, 50vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <span className="absolute bottom-3 right-3 grid size-8 place-items-center rounded-full bg-brand text-white transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1">
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden>
                      <path d="M3 9L9 3M9 3H4M9 3V8" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                </div>
                <h3 className="mt-3 text-sm">{p.name}</h3>
                <p className="text-[11px] text-black/40">
                  {p.category}
                </p>
              </Link>
            </li>
          ))}
        </ul>

        {canExpand && (
          <div className="col-span-4 mt-12 flex justify-center md:col-span-12">
            <Button variant="outline" onClick={expand}>
              View All Products
            </Button>
          </div>
        )}
      </Container>
    </section>
  );
}
