import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";
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

/** Small card for Address / Hours / Contact */
function InfoCard({ icon, label, children }: { icon: ReactNode; label: string; children: ReactNode }) {
  return (
    <div className="rounded-xl border border-copper/25 bg-ivory p-5">
      <div className="flex items-center gap-3">
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-teal text-copper-light">
          {icon}
        </span>
        <h2 className="text-xs font-semibold tracking-[0.2em] text-copper-deep uppercase">{label}</h2>
      </div>
      <div className="mt-3 text-[0.95rem] leading-relaxed text-charcoal/85">{children}</div>
    </div>
  );
}

const textLink = "inline-flex items-center gap-1.5 font-medium text-teal underline-offset-4 hover:text-copper-deep hover:underline";

export default async function BranchPage({ params }: Props) {
  const { slug } = await params;
  const branch = await getBranch(slug);
  if (!branch) notFound();

  const others = (await getBranches()).filter((b) => b.slug !== branch.slug);
  const place = [branch.venue, branch.area].filter(Boolean).join(", ");
  const phone = branch.phone || site.phone;
  const tel = `tel:${phone.replace(/\s/g, "")}`;
  const hours = branch.hours ?? [];
  const directions = mapsLink(branch.mapQuery);
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
    <div className="bg-cream">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />

      {/* ---------- Title ---------- */}
      <section className="container-site pt-6 sm:pt-10">
        <Link
          href="/locations"
          className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.2em] text-copper-deep uppercase transition-colors hover:text-teal"
        >
          <ArrowRightIcon size={14} className="rotate-180" /> All locations
        </Link>

        <div className="mt-4 flex flex-col gap-5 sm:mt-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="eyebrow text-copper-deep">The Copper Table Bistro</p>
            <h1 className="mt-2 font-display text-4xl leading-none font-medium text-teal sm:text-6xl">{branch.emirate}</h1>
            {place && <p className="mt-2 font-display text-lg text-charcoal/80 italic sm:text-xl">{place}</p>}
          </div>

          {/* Desktop actions (phones use the bottom bar) */}
          <div className="hidden shrink-0 gap-3 sm:flex">
            <Button href={bookingLink} external icon={<CalendarIcon size={18} />}>
              Book a table
            </Button>
            <Button href={directions} external variant="outline" arrow>
              Directions
            </Button>
          </div>
        </div>
      </section>

      {/* ---------- Photo ---------- */}
      <div className="container-site mt-6 sm:mt-8">
        <div className="relative aspect-[4/3] overflow-hidden rounded-xl border border-copper/30 bg-teal sm:aspect-[21/9]">
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
            <div className="flex h-full items-center justify-center font-display text-xl text-copper-light/70 italic">
              Photo coming soon
            </div>
          )}
        </div>
      </div>

      {/* ---------- Info cards ---------- */}
      <section aria-label="Branch details" className="container-site mt-6 grid gap-4 sm:mt-8 sm:grid-cols-3 sm:gap-5">
        <InfoCard icon={<PinIcon size={18} />} label="Address">
          <p>{branch.address || place || branch.emirate}</p>
          <a href={directions} target="_blank" rel="noopener noreferrer" className={`mt-2 ${textLink}`}>
            Get directions <ArrowRightIcon size={14} />
          </a>
        </InfoCard>

        <InfoCard icon={<CalendarIcon size={18} />} label="Opening hours">
          {hours.length > 0 ? (
            <dl className="space-y-1.5">
              {hours.map((h) => (
                <div key={`${h.days}-${h.time}`} className="flex justify-between gap-4">
                  <dt>{h.days}</dt>
                  <dd className="font-medium whitespace-nowrap text-teal">{h.time}</dd>
                </div>
              ))}
            </dl>
          ) : (
            <p>Please call us for today&apos;s opening hours.</p>
          )}
        </InfoCard>

        <InfoCard icon={<PhoneIcon size={18} />} label="Contact">
          <a href={tel} className={textLink}>
            {phone}
          </a>
          <a href={bookingLink} target="_blank" rel="noopener noreferrer" className={`mt-1.5 block ${textLink}`}>
            Message us on WhatsApp
          </a>
        </InfoCard>
      </section>

      {/* ---------- Map ---------- */}
      <section aria-label={`Map of the ${branch.emirate} branch`} className="container-site mt-6 sm:mt-8">
        <div className="relative aspect-[4/3] overflow-hidden rounded-xl border border-copper/30 bg-teal-dark sm:aspect-[21/9]">
          <iframe
            title={`Map of The Copper Table Bistro, ${branch.emirate}`}
            src={mapEmbedUrl(branch.mapQuery)}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="absolute inset-0 h-full w-full border-0"
          />
        </div>
      </section>

      {/* ---------- Other branches ---------- */}
      {others.length > 0 && (
        <section aria-labelledby="other-title" className="container-site mt-12 pb-12 sm:mt-16 sm:pb-20">
          <h2 id="other-title" className="eyebrow eyebrow-lines text-copper-deep">
            Other locations
          </h2>
          <ul className="mt-6 grid gap-3 sm:grid-cols-3 sm:gap-5">
            {others.map((b) => (
              <li key={b.slug}>
                <Link
                  href={`/locations/${b.slug}`}
                  className="group flex items-center gap-4 rounded-xl border border-copper/25 bg-ivory p-3 transition-colors hover:border-copper"
                >
                  <span className="relative h-16 w-16 shrink-0 overflow-hidden rounded-lg bg-teal">
                    {b.image && <Image src={b.image} alt="" fill sizes="64px" className="object-cover" />}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block font-display text-xl leading-tight text-teal">{b.emirate}</span>
                    <span className="block truncate text-sm text-charcoal/70 italic">
                      {[b.venue, b.area].filter(Boolean).join(", ")}
                    </span>
                  </span>
                  <ArrowRightIcon
                    size={18}
                    className="shrink-0 text-copper-deep transition-transform group-hover:translate-x-1"
                  />
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* ---------- Phone action bar (stays at the bottom, stops before the footer) ---------- */}
      <div className="sticky bottom-0 z-30 border-t border-copper/30 bg-teal/95 px-4 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] backdrop-blur sm:hidden">
        <div className="flex gap-3">
          <a
            href={bookingLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-12 flex-1 items-center justify-center gap-2 rounded-full bg-linear-to-r from-copper-light to-copper text-xs font-semibold tracking-[0.15em] text-teal uppercase"
          >
            <CalendarIcon size={16} /> Book a table
          </a>
          <a
            href={tel}
            aria-label={`Call the ${branch.emirate} branch`}
            className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-copper-light text-copper-light"
          >
            <PhoneIcon size={18} />
          </a>
          <a
            href={directions}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Directions to the ${branch.emirate} branch`}
            className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-copper-light text-copper-light"
          >
            <PinIcon size={18} />
          </a>
        </div>
      </div>
    </div>
  );
}