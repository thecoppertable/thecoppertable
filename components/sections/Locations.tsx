import Image from "next/image";
import Link from "next/link";
import { ArrowRightIcon, PinIcon } from "@/components/ui/Icons";
import { getBranches } from "@/sanity/queries";

/* Faint paper grain for the old-school parchment look (tiny inline SVG, no extra file) */
const paperGrain =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.08'/%3E%3C/svg%3E\")";

/** Small vintage divider: line — ◆ — line */
function Ornament({ className = "" }: { className?: string }) {
  return (
    <div aria-hidden="true" className={`flex items-center justify-center gap-3 text-copper ${className}`}>
      <span className="h-px w-12 bg-linear-to-r from-transparent to-copper/70 sm:w-20" />
      <svg width="40" height="12" viewBox="0 0 40 12" fill="currentColor">
        <circle cx="6" cy="6" r="1.4" />
        <path d="M20 1l5 5-5 5-5-5z" />
        <circle cx="34" cy="6" r="1.4" />
      </svg>
      <span className="h-px w-12 bg-linear-to-l from-transparent to-copper/70 sm:w-20" />
    </div>
  );
}

/** Corner diamond for the outer frame */
function Corner({ className }: { className: string }) {
  return <span aria-hidden="true" className={`absolute h-2.5 w-2.5 rotate-45 border border-copper bg-[#ecdcc0] ${className}`} />;
}

/** "Our Locations": branches managed in Sanity. Use headingLevel="h1" on the Locations page. */
export async function Locations({ headingLevel = "h2" }: { headingLevel?: "h1" | "h2" }) {
  const Heading = headingLevel;
  const branches = await getBranches();

  return (
    <section
      id="locations"
      aria-labelledby="locations-title"
      className="relative scroll-mt-16 bg-[#ecdcc0] px-3 py-3 sm:px-5 sm:py-5 lg:scroll-mt-20"
      style={{ backgroundImage: paperGrain }}
    >
      {/* Soft darker edges, like old paper */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_45%,rgba(120,70,35,0.18)_100%)]"
      />

      {/* Double-line frame */}
      <div className="relative border border-copper/60 p-1.5">
        <Corner className="-top-[5px] -left-[5px]" />
        <Corner className="-top-[5px] -right-[5px]" />
        <Corner className="-bottom-[5px] -left-[5px]" />
        <Corner className="-right-[5px] -bottom-[5px]" />

        <div className="border border-copper/30 px-2 pt-10 pb-12 sm:pt-12 sm:pb-14">
          <div className="container-site">
            {/* Heading */}
            <div className="mb-8 text-center sm:mb-10">
              <Heading
                id="locations-title"
                className="eyebrow-lines font-display text-2xl font-semibold tracking-[0.25em] text-teal uppercase sm:text-3xl"
              >
                Our Locations
              </Heading>
              <Ornament className="mt-3" />
            </div>

            {/* Branch cards: the whole card is clickable */}
            <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-7">
              {branches.map((b) => (
                <li
                  key={b.slug}
                  className="group relative flex flex-col rounded-md border border-copper/50 bg-[#f7ecda] p-2 text-center shadow-[0_10px_24px_-14px_rgba(80,45,20,0.45)] transition-[transform,box-shadow] duration-300 focus-within:ring-2 focus-within:ring-copper hover:-translate-y-1 hover:shadow-[0_18px_32px_-16px_rgba(80,45,20,0.55)]"
                >
                  {/* Inner line: double border */}
                  <span aria-hidden="true" className="pointer-events-none absolute inset-1 rounded-[4px] border border-copper/25" />

                  {/* Framed photo with an old-photo tone (placeholder if none uploaded yet) */}
                  <div className="relative aspect-[3/2] overflow-hidden rounded-sm bg-teal">
                    {b.image ? (
                      <Image
                        src={b.image}
                        alt={b.imageAlt || `The Copper Table Bistro, ${b.emirate}`}
                        fill
                        sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                        className="object-cover [filter:sepia(0.45)_saturate(0.85)_contrast(1.05)] transition-[filter,transform] duration-500 group-hover:scale-105 group-hover:[filter:none]"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center font-display text-xl text-copper-light/70 italic">
                        Photo coming soon
                      </div>
                    )}
                  </div>

                  <div className="relative flex flex-1 flex-col items-center px-4 pt-9 pb-6">
                    {/* Pin badge */}
                    <span className="absolute -top-6 left-1/2 flex h-12 w-12 -translate-x-1/2 items-center justify-center rounded-full border border-copper/60 bg-[#f7ecda] text-copper-deep shadow-sm ring-4 ring-[#f7ecda]">
                      <PinIcon size={20} />
                    </span>

                    <h3 className="font-display text-2xl font-semibold tracking-wide text-teal uppercase">{b.emirate}</h3>
                    {(b.venue || b.area) && (
                      <p className="mt-1 font-heading text-[0.95rem] text-charcoal/85 italic">
                        {[b.venue, b.area].filter(Boolean).join(", ")}
                      </p>
                    )}

                    <Ornament className="my-4 scale-75" />

                    {/* One link per card, stretched to cover the whole card (after:inset-0) */}
                    <Link
                      href={`/locations/${b.slug}`}
                      aria-label={`View the ${b.emirate} branch`}
                      className="mt-auto inline-flex min-h-11 items-center justify-center gap-2.5 rounded-full border border-copper-deep px-6 py-3 text-sm font-medium tracking-[0.12em] text-teal uppercase transition-colors after:absolute after:inset-0 after:rounded-md after:content-[''] group-hover:bg-copper group-hover:text-teal focus-visible:outline-none"
                    >
                      View location <ArrowRightIcon size={18} />
                    </Link>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}