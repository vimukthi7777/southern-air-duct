import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Counter } from "@/components/ui/Counter";
import { Reveal } from "@/components/ui/Reveal";
import { ScrollText } from "@/components/ui/ScrollText";
import { aboutStats } from "@/data/site";

export function About() {
  return (
    <section id="about" className="bg-white py-16 md:py-24">
      <Container>
        <p className="col-span-4 text-xs uppercase md:col-span-2">About us</p>

        <ScrollText
          className="col-span-4 mt-4 text-2xl leading-snug md:col-span-7 md:mt-0 md:text-[28px]"
          segments={[
            { text: "Southern", color: "#0B45B5" },
            { text: "Air Ducts" },
            {
              text: "delivers reliable HVAC solutions tailored to your space, needs, and budget serving homes and large-scale commercial projects with a focus on performance, efficiency, and lasting value.",
            },
          ]}
        />

        <Reveal className="col-span-4 mt-10 flex gap-10 md:col-span-3 md:mt-0 md:block md:space-y-6 lg:pl-8" stagger={0.12}>
          {aboutStats.map((s) => (
            <div key={s.label}>
              <p className="text-2xl">
                {s.value !== null ? <Counter to={s.value} suffix={s.suffix} /> : s.text}
              </p>
              <p className="text-[10px] text-black/40">{s.label}</p>
            </div>
          ))}
        </Reveal>

        <Reveal className="relative col-span-4 mt-14 aspect-[4/3] overflow-hidden rounded-lg md:col-span-8 md:aspect-[1.15]">
          <Image src="/images/AboutImg.jpg" alt="Rooftop HVAC ductwork installation" fill sizes="(min-width:768px) 62vw, 100vw" className="object-cover" />
        </Reveal>
        <Reveal delay={0.15} className="relative col-span-4 mt-5 aspect-[4/3] overflow-hidden rounded-lg md:col-span-4 md:mt-14 md:aspect-auto">
          <Image src="/images/AboutUsImg002.jpg" alt="Industrial facility with ductwork" fill sizes="(min-width:768px) 33vw, 100vw" className="object-cover" />
        </Reveal>
      </Container>
    </section>
  );
}
