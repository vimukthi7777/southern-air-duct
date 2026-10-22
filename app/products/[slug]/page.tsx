import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Navbar } from "@/components/layout/Navbar";
import { Contact } from "@/components/sections/Contact";
import { ProductGallery } from "@/components/product/ProductGallery";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { siteInfo } from "@/data/site";
import { getProductBySlug, products } from "@/data/products";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return {};
  return { title: `${product.name} | Southern Air Ducts`, description: product.shortDescription };
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  const whatsappUrl = `https://wa.me/${siteInfo.whatsapp}?text=${encodeURIComponent(
    `Hi, I'm interested in the ${product.name} (${product.sku}). Could you share more details?`,
  )}`;

  const related = products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4);

  return (
    <>
      <Navbar solid />
      <main className="bg-white pb-16 pt-32 md:pb-24 md:pt-40">
        <Container>
          <nav aria-label="Breadcrumb" className="col-span-4 mb-8 text-xs text-black/50 md:col-span-12">
            <Link href="/" className="hover:text-brand">Home</Link> /{" "}
            <Link href="/#products" className="hover:text-brand">Products</Link> /{" "}
            <span className="text-black">{product.name}</span>
          </nav>

          <div className="col-span-4 md:col-span-7">
            <ProductGallery images={product.images} name={product.name} />
          </div>

          <Reveal className="col-span-4 mt-8 md:col-span-5 md:mt-0">
            <p className="text-xs uppercase text-brand">{product.category}</p>
            <h1 className="mt-3 text-3xl leading-tight tracking-tight md:text-4xl">{product.name}</h1>
            <p className="mt-1 text-xs text-black/40">SKU: {product.sku}</p>
            <p className="mt-6 text-sm leading-relaxed text-black/70">{product.description}</p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Button href="#contact" arrow>
                Get More Details
              </Button>
              <Button href={whatsappUrl} variant="outline">
                Contact on WhatsApp
              </Button>
            </div>
          </Reveal>

          <Reveal className="col-span-4 mt-14 grid gap-10 md:col-span-12 md:mt-20 md:grid-cols-2">
            <div>
              <h2 className="text-lg">Key Features</h2>
              <ul className="mt-4 space-y-2 text-sm text-black/70">
                {product.keyFeatures.map((f) => (
                  <li key={f} className="flex gap-3">
                    <span className="mt-2 size-1.5 shrink-0 rounded-full bg-brand" />
                    {f}
                  </li>
                ))}
              </ul>

              <h2 className="mt-10 text-lg">Applications</h2>
              <ul className="mt-4 space-y-2 text-sm text-black/70">
                {product.applications.map((a) => (
                  <li key={a} className="flex gap-3">
                    <span className="mt-2 size-1.5 shrink-0 rounded-full bg-brand" />
                    {a}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="text-lg">Technical Specifications</h2>
              <dl className="mt-4 divide-y divide-black/10 border-y border-black/10 text-sm">
                {product.technicalSpecifications.map((s) => (
                  <div key={s.label} className="grid grid-cols-5 gap-4 py-3">
                    <dt className="col-span-2 text-black/50">{s.label}</dt>
                    <dd className="col-span-3">{s.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </Reveal>

          {related.length > 0 && (
            <div className="col-span-4 mt-16 md:col-span-12">
              <h2 className="text-lg">More in {product.category}</h2>
              <ul className="mt-4 flex flex-wrap gap-3">
                {related.map((p) => (
                  <li key={p.id}>
                    <Link href={`/products/${p.slug}`} className="inline-block rounded-full border border-black/10 px-4 py-1.5 text-xs text-black/60 transition-colors hover:border-brand hover:text-brand">
                      {p.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </Container>
      </main>
      <Contact />
    </>
  );
}
