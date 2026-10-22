import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { ContactForm } from "@/components/sections/ContactForm";
import { navLinks, siteInfo } from "@/data/site";

export function Contact() {
  return (
    <footer id="contact" className="relative bg-black text-white">
      <div className="absolute inset-x-0 top-0 h-72 md:h-80">
        <Image src="/images/footerTopImg.webp" alt="" fill sizes="100vw" className="object-cover" />
        <div className="absolute inset-0 bg-black/40" />
      </div>

      <Container className="relative pt-40 md:pt-48">
        <Reveal className="col-span-4 grid gap-10 rounded-xl bg-brand p-6 md:col-span-12 md:grid-cols-2 md:p-10">
          <div className="flex flex-col justify-between gap-16">
            <h2 className="text-4xl font-medium leading-[1.1] tracking-tight md:text-6xl">
              Raise smart. Grow fast. Let&rsquo;s start today!
            </h2>

            <div>
              <div className="grid gap-8 text-sm sm:grid-cols-2">
                <div>
                  <h3 className="font-medium">Location</h3>
                  <address className="mt-5 text-xs not-italic leading-relaxed">
                    {siteInfo.address.map((l) => (
                      <span key={l} className="block">
                        {l}
                      </span>
                    ))}
                  </address>
                </div>
                <div>
                  <h3 className="font-medium">Contact</h3>
                  <p className="mt-5 text-xs leading-relaxed">
                    <a href={`mailto:${siteInfo.email}`} className="block hover:underline">
                      {siteInfo.email}
                    </a>
                    <a href={`tel:${siteInfo.mobile.replace(/\s/g, "")}`} className="block hover:underline">
                      {siteInfo.mobile}
                    </a>
                  </p>
                </div>
              </div>

              <ul className="mt-10 flex flex-wrap gap-x-5 gap-y-2 text-xs">
                {navLinks.map((l) => (
                  <li key={l.href}>
                    <a href={l.href} className="relative after:absolute after:inset-x-0 after:-bottom-0.5 after:h-px after:origin-left after:scale-x-0 after:bg-white after:transition-transform hover:after:scale-x-100">
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <ContactForm />
        </Reveal>

        <div className="col-span-4 mt-5 flex items-center justify-between md:col-span-12">
          <div className="flex gap-3">
            <a href="#" aria-label="Facebook" className="grid size-9 place-items-center rounded-full bg-white/10 transition-colors hover:bg-brand">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                <path d="M13.5 21v-7.5h2.6l.4-3h-3V8.6c0-.9.3-1.5 1.5-1.5h1.6V4.4c-.3 0-1.2-.1-2.3-.1-2.3 0-3.8 1.4-3.8 3.9v2.3H8v3h2.5V21h3z" />
              </svg>
            </a>
            <a href="#" aria-label="Instagram" className="grid size-9 place-items-center rounded-full bg-white/10 transition-colors hover:bg-brand">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
                <rect x="3" y="3" width="18" height="18" rx="5" />
                <circle cx="12" cy="12" r="4" />
                <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
              </svg>
            </a>
          </div>
          <p className="text-xs">&copy; 2026 Copyright - Southern air ducts</p>
        </div>

        <div className="col-span-4 mt-10 flex items-end gap-6 overflow-hidden md:col-span-12">
          <Image src="/images/footerLogo.svg" alt="" width={352} height={206} unoptimized className="h-auto w-1/3 max-w-xs" />
          <Image src="/images/footerNameLogo.svg" alt="Southern Air Ducts Pvt Ltd" width={400} height={120} unoptimized className="h-auto w-1/2 max-w-md" />
        </div>
      </Container>
    </footer>
  );
}
