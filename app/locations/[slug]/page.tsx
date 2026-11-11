import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { ArrowRightIcon, CalendarIcon, PhoneIcon, PinIcon } from "@/components/ui/Icons";
import { mapEmbedUrl, mapsLink, site } from "@/lib/utils";
import { whatsappLink } from "@/lib/whatsapp";
import { getBranch, getBranches } from "@/sanity/queries";

type Props = { params: Promise<{ slug: string }> };

/** Pre-build a page for every branch. */
export async function generateStaticParams() {
  const branches = await getBranches();
  return branches.map((b) => ({ slug: b.slug }));
}

/** Unique title + description for each branch (SEO). */
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const branch = await getBranch(slug);
  if (!branch) return { title: "Location not found" };
  const place = [branch.venue, branch.area].filter(Boolean).join(", ");
  return {
    title: `${branch.emirate} Branch`,
    description: `Visit The Copper Table Bistro in ${branch.emirate}${place ? ` at ${place}` : ""}. Opening hours, directions, phone and table reservations.`,
    alternates: { canonical: `/locations/${branch.slug}` },
    openGraph: branch.image ? { images: [branch.image] } : undefined,
  };
}

export default async function BranchPage({ params }: Props) {
  const { slug } = await params;
  const branch = await getBranch(slug);
  if (!branch) notFound();

  const others = (await getBranches()).filter((b) => b.slug !== branch.slug);
  const place = [branch.venue, branch.area].filter(Boolean).join(", ");
  const phone = branch.phone || site.phone;
  const hours = branch.hours ?? [];
  const bookingLink = whatsappLink(
    `Hello ${site.name}, I would like to reserve a table at the ${branch.emirate} branch.`,
    branch.whatsapp,
  );

  // Google "Restaurant" data for this branch
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    name: `${site.name}, ${branch.emirate}`,
    url: `${site.url}/locations/${branch.slug}`,
    image: branch.image || undefined,
    telephone: phone,
    servesCuisine: ["French", "Italian"],
    acceptsReservations: true,
    address: {
      "@type": "PostalAddress",
      streetAddress: branch.address || place || branch.emirate,
      addressLocality: branch.area || branch.emirate,
      addressRegion: branch.emirate,
      addressCountry: "AE",
    },
    openingHours: hours.map((h) => `${h.days} ${h.time}`),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />

      {/* Title band */}
      <section className="bg-teal pt-10 pb-24 text-center sm:pt-14 sm:pb-28">
        <div className="container-site">
          <nav aria-label="Breadcrumb" className="text-xs tracking-[0.2em] text-cream/70 uppercase">
            <Link href="/locations" className="transition-colors hover:text-copper-light">
              Our Locations
            </Link>
            <span aria-hidden="true" className="mx-2 text-copper">/</span>
            <span aria-current="page" className="text-copper-light">{branch.emirate}</span>
          </nav>
          <h1 className="mt-5 font-display text-5xl font-medium tracking-wide text-ivory uppercase sm:text-6xl lg:text-7xl">
            {branch.emirate}
          </h1>
          {place && <p className="mt-2 font-display text-xl text-copper-light italic sm:text-2xl">{place}</p>}
        </div>
      </section>

      {/* Photo, overlapping the band */}
      <div className="bg-cream">
        <div className="container-site -mt-16 sm:-mt-20">
          <div className="relative aspect-[16/9] overflow-hidden rounded-md border border-copper/40 bg-teal-dark shadow-[0_24px_48px_-24px_rgba(0,0,0,0.5)] sm:aspect-[21/9]">
            {branch.image ? (
              <Image
                src={branch.image}
                alt={branch.imageAlt || `The Copper Table Bistro, ${branch.emirate}`}
                fill
                priority
                sizes="(min-width: 1280px) 1200px, 100vw"
                className="object-cover"
              />
            ) : (
              <div className="flex h-full items-center justify-center font-display text-2xl text-copper-light/70 italic">
                Photo coming soon
              </div>
            )}
          </div>
        </div>

        {/* Details + map */}
        <section aria-labelledby="visit-title" className="container-site grid gap-10 pt-12 pb-16 sm:pt-14 sm:pb-20 lg:grid-cols-[2fr_3fr] lg:gap-14">
          <div>
            <h2 id="visit-title" className="eyebrow text-copper-deep">Visit us</h2>

            <dl className="mt-6 space-y-7">
              <div>
                <dt className="flex items-center gap-2 font-display text-2xl text-teal">
                  <PinIcon size={20} className="text-copper" /> Address
                </dt>
                <dd className="mt-1 text-charcoal/85">{branch.address || place || branch.emirate}</dd>
              </div>

              <div>
                <dt className="flex items-center gap-2 font-display text-2xl text-teal">
                  <CalendarIcon size={20} className="text-copper" /> Opening hours
                </dt>
                <dd className="mt-2">
                  {hours.length > 0 ? (
                    <ul className="divide-y divide-copper/20">
                      {hours.map((h) => (
                        <li key={`${h.days}-${h.time}`} className="flex justify-between gap-6 py-2 text-charcoal/85">
                          <span>{h.days}</span>
                          <span className="font-medium text-teal">{h.time}</span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-charcoal/85">Please call us for today&apos;s opening hours.</p>
                  )}
                </dd>
              </div>

              <div>
                <dt className="flex items-center gap-2 font-display text-2xl text-teal">
                  <PhoneIcon size={20} className="text-copper" /> Phone
                </dt>
                <dd className="mt-1">
                  <a href={`tel:${phone.replace(/\s/g, "")}`} className="text-charcoal/85 underline-offset-4 hover:text-copper-deep hover:underline">
                    {phone}
                  </a>
                </dd>
              </div>
            </dl>

            <div className="mt-9 flex flex-wrap gap-3">
              <Button href={bookingLink} external icon={<CalendarIcon size={18} />}>
                Book a table
              </Button>
              <Button href={mapsLink(branch.mapQuery)} external variant="outline" arrow>
                Get directions
              </Button>
            </div>
          </div>

          {/* Map (loads only when scrolled to) */}
          <div className="relative aspect-[4/3] overflow-hidden rounded-md border border-copper/40 bg-teal-dark lg:aspect-auto lg:min-h-[440px]">
            <iframe
              title={`Map of The Copper Table Bistro, ${branch.emirate}`}
              src={mapEmbedUrl(branch.mapQuery)}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="absolute inset-0 h-full w-full border-0"
            />
          </div>
        </section>
      </div>

      {/* Other branches */}
      {others.length > 0 && (
        <section aria-labelledby="other-title" className="bg-teal py-14 sm:py-16">
          <div className="container-site">
            <h2 id="other-title" className="eyebrow eyebrow-lines text-copper-light">
              Other locations
            </h2>
            <ul className="mt-8 grid gap-4 sm:grid-cols-3">
              {others.map((b) => (
                <li key={b.slug}>
                  <Link
                    href={`/locations/${b.slug}`}
                    className="group flex items-center justify-between rounded-md border border-copper/30 px-5 py-4 transition-colors hover:border-copper hover:bg-teal-dark"
                  >
                    <span>
                      <span className="block font-display text-2xl tracking-wide text-ivory uppercase">{b.emirate}</span>
                      <span className="font-display text-cream/75 italic">{[b.venue, b.area].filter(Boolean).join(", ")}</span>
                    </span>
                    <ArrowRightIcon size={20} className="text-copper-light transition-transform group-hover:translate-x-1" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}
    </>
  );
}