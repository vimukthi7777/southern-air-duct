import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { services } from "@/data/site";

export function Services() {
  return (
    <section id="services" className="bg-[#f5f6fa] py-16 md:py-24">
      <Container>
        <Reveal className="col-span-4 md:col-span-8">
          <SectionHeading
            label="Service we offer"
            title={<>Complete HVAC Solutions, Thoughtfully Engineered for Lasting Comfort</>}
          />
        </Reveal>

        <Reveal
          stagger={0.12}
          className="col-span-4 mt-12 grid grid-cols-2 border-x border-dotted border-black/40 lg:grid-cols-4 md:col-span-12 md:mt-16"
        >
          {services.map((s) => (
            <article
              key={s.title}
              className="flex min-h-56 flex-col justify-between gap-8 border-dotted border-black/40 bg-white p-4 transition-colors hover:bg-white/60 even:border-l nth-[n+3]:border-t sm:min-h-72 sm:p-6 lg:border-t-0 lg:border-l lg:first:border-l-0"
            >
              <Image src={s.icon} alt="" width={36} height={36} />
              <div>
                <h3 className="text-lg leading-snug">{s.title}</h3>
                <p className="mt-3 text-xs leading-relaxed text-black/40">{s.text}</p>
              </div>
            </article>
          ))}
        </Reveal>
      </Container>
    </section>
  );
}
