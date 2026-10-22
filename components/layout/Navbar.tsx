"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { navLinks, siteInfo } from "@/data/site";

const whatsappUrl = `https://wa.me/${siteInfo.whatsapp}`;

const linkClass =
  "relative text-sm font-semibold text-white after:absolute after:inset-x-0 after:-bottom-1 after:h-px after:origin-left after:scale-x-0 after:bg-white after:transition-transform after:duration-300 hover:after:scale-x-100 focus-visible:after:scale-x-100";

export function Navbar({ solid = false }: { solid?: boolean }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const dark = solid || scrolled || open;

  return (
    <header className="fixed inset-x-0 top-5 z-50">
      <nav
        aria-label="Main"
        className={`mx-5 rounded-xl border px-5 py-3 shadow-lg shadow-black/10 backdrop-blur-xl transition-colors duration-500 md:mx-10 lg:mx-20 ${
          dark ? "border-white/10 bg-black/80" : "border-white/20 bg-white/15"
        }`}
      >
        <div className="flex items-center justify-between">
          <Link href="/" aria-label="Southern Air Ducts home" className="shrink-0">
            <Image src="/images/navlogo.svg" alt="Southern Air Ducts" width={71} height={52} unoptimized priority className="h-9 w-auto" />
          </Link>

          <ul className="hidden items-center gap-8 md:flex">
            {navLinks.map((l) => (
              <li key={l.href}>
                <a href={l.href} className={linkClass}>
                  {l.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-5">
            <a href={`tel:${siteInfo.phoneRaw}`} className="hidden items-center gap-2 text-xs font-medium text-white lg:flex">
              <PhoneIcon />
              {siteInfo.phone}
            </a>
            <div className="hidden md:block">
              <Button href={whatsappUrl} icon={<WhatsAppIcon />}>
                Contact Now
              </Button>
            </div>

            <button
              type="button"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              aria-controls="mobile-menu"
              onClick={() => setOpen((o) => !o)}
              className="relative size-9 md:hidden"
            >
              <span className={`absolute left-1.5 h-0.5 w-6 rounded bg-white transition-all duration-300 ${open ? "top-[17px] rotate-45" : "top-[11px]"}`} />
              <span className={`absolute left-1.5 top-[17px] h-0.5 w-6 rounded bg-white transition-opacity duration-200 ${open ? "opacity-0" : "opacity-100"}`} />
              <span className={`absolute left-1.5 h-0.5 w-6 rounded bg-white transition-all duration-300 ${open ? "top-[17px] -rotate-45" : "top-[23px]"}`} />
            </button>
          </div>
        </div>

        <div
          id="mobile-menu"
          className={`grid transition-[grid-template-rows] duration-500 md:hidden ${open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}
        >
          <div className="overflow-hidden">
            <ul className="flex flex-col gap-5 pb-2 pt-6">
              {navLinks.map((l) => (
                <li key={l.href}>
                  <a href={l.href} onClick={() => setOpen(false)} tabIndex={open ? 0 : -1} className={`${linkClass} inline-block text-base`}>
                    {l.label}
                  </a>
                </li>
              ))}
              <li className="flex items-center justify-between gap-4">
                <a href={`tel:${siteInfo.phoneRaw}`} tabIndex={open ? 0 : -1} className="flex items-center gap-2 text-sm text-white">
                  <PhoneIcon />
                  {siteInfo.phone}
                </a>
                <span onClick={() => setOpen(false)}>
                  <Button href={whatsappUrl} icon={<WhatsAppIcon />}>
                    Contact Now
                  </Button>
                </span>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}

function PhoneIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M6.6 10.8a15.1 15.1 0 006.6 6.6l2.2-2.2a1 1 0 011-.25 11.4 11.4 0 003.6.57 1 1 0 011 1V20a1 1 0 01-1 1A17 17 0 013 4a1 1 0 011-1h3.5a1 1 0 011 1c0 1.25.2 2.45.57 3.57a1 1 0 01-.25 1z" />
    </svg>
  );
}

function WhatsAppIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M3 21l1.6-4.7A9 9 0 1 1 8 19.6L3 21z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
      <path transform="translate(6.5 6.5) scale(0.46)" fill="currentColor" d="M6.6 10.8a15.1 15.1 0 006.6 6.6l2.2-2.2a1 1 0 011-.25 11.4 11.4 0 003.6.57 1 1 0 011 1V20a1 1 0 01-1 1A17 17 0 013 4a1 1 0 011-1h3.5a1 1 0 011 1c0 1.25.2 2.45.57 3.57a1 1 0 01-.25 1z" />
    </svg>
  );
}
