import Image from "next/image";
import Link from "next/link";
import { AutoCarousel } from "@/components/ui/AutoCarousel";
import { ArrowRightIcon, PinIcon } from "@/components/ui/Icons";
import { getBranches } from "@/sanity/queries";

/* Faint paper grain for the section background (tiny inline SVG, no extra file) */
const paperGrain =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.08'/%3E%3C/svg%3E\")";

/* Soft shadow behind the words only, so text stays readable without tinting the photo */
const textShadow = "[text-shadow:0_2px_14px_rgba(0,0,0,0.8)]";

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

/** Fine copper wave lines for the card corners */
function Waves({ className = "" }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 200 60"
      fill="none"
      stroke="currentColor"
      strokeWidth="0.7"
      className={`pointer-events-none absolute bottom-0 w-2/3 text-copper-light/60 ${className}`}
    >
      <path d="M0 60 C60 42 120 52 200 8" />
      <path d="M25 60 C80 46 130 54 200 20" />
      <path d="M50 60 C100 50 145 56 200 32" />
      <path d="M75 60 C120 53 160 58 200 44" />
    </svg>
  );
}

/** "Our Locations": photo cards for each branch (managed in Sanity). Use headingLevel="h1" on the Locations page. */
export async function Locations({ headingLevel = "h2" }: { headingLevel?: "h1" | "h2" }) {
  const Heading = headingLevel;
  const branches = await getBranches();

  return (
    <section
      id="locations"
      aria-labelledby="locations-title"
      className="relative scroll-mt-16 overflow-hidden bg-[#ecdcc0] py-12 sm:py-16 lg:scroll-mt-20"
      style={{ backgroundImage: paperGrain }}
    >
      {/* Soft darker edges, like old paper */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_45%,rgba(120,70,35,0.15)_100%)]"
      />

      <div className="container-site relative">
        {/* Heading */}
        <div className="mb-8 text-center sm:mb-12">
          <Heading
            id="locations-title"
            className="eyebrow-lines font-display text-xl font-semibold tracking-[0.25em] text-teal uppercase sm:text-3xl"
          >
            Our Locations
          </Heading>
          <Ornament className="mt-3" />
        </div>

        {/* Branch cards: auto-sliding row on phones, grid on tablet/desktop */}
        <AutoCarousel
          label="Our branches"
          className="-mx-5 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-3 [scrollbar-width:none] sm:mx-0 sm:grid sm:grid-cols-2 sm:gap-6 sm:overflow-visible sm:px-0 sm:pb-0 lg:grid-cols-4 [&::-webkit-scrollbar]:hidden"
        >
          {branches.map((b) => {
            const place = [b.venue, b.area].filter(Boolean).join(", ");
            return (
              <li key={b.slug} className="w-[65%] shrink-0 snap-start sm:w-auto">
                {/* The whole card is one link; presses in slightly when tapped */}
                <Link
                  href={`/locations/${b.slug}`}
                  aria-label={`View the ${b.emirate} branch${place ? `, ${place}` : ""}`}
                  className="group relative block overflow-hidden rounded-xl border border-copper/40 bg-teal shadow-[0_14px_28px_-16px_rgba(40,30,10,0.6)] transition-[transform,box-shadow] duration-200 hover:-translate-y-1 hover:shadow-[0_26px_44px_-18px_rgba(40,30,10,0.7)] focus-visible:ring-2 focus-visible:ring-copper focus-visible:outline-none active:translate-y-0 active:scale-[0.98] sm:rounded-2xl"
                >
                  <div className="relative aspect-[3/4] sm:aspect-[2/3]">
                    {/* Photo (natural colours, no tint) */}
                    {b.image && (
                      <Image
                        src={b.image}
                        alt=""
                        fill
                        sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 65vw"
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    )}

                    {/* Brand at the top */}
                    <div
                      aria-hidden="true"
                      className={`absolute inset-x-0 top-4 flex flex-col items-center px-3 text-center sm:top-6 sm:px-4 ${textShadow}`}
                    >
                      <p className="flex w-full items-center justify-center gap-2 font-display text-[0.65rem] font-semibold tracking-[0.16em] text-ivory uppercase sm:gap-3 sm:text-[0.8rem] sm:tracking-[0.18em]">
                        <span className="h-px max-w-6 flex-1 bg-copper-light sm:max-w-8" />
                        The Copper Table
                        <span className="h-px max-w-6 flex-1 bg-copper-light sm:max-w-8" />
                      </p>
                      <p className="mt-1 text-[0.5rem] font-semibold tracking-[0.5em] text-copper-light uppercase sm:mt-1.5 sm:text-[0.6rem]">
                        Bistro
                      </p>
                    </div>

                    {/* Details at the bottom */}
                    <div
                      className={`absolute inset-x-0 bottom-0 flex flex-col items-center px-3 pb-5 text-center sm:px-5 sm:pb-8 ${textShadow}`}
                    >
                      <div aria-hidden="true" className="flex w-full items-center gap-2 text-copper-light sm:gap-3">
                        <span className="h-px flex-1 bg-copper-light/70" />
                        <PinIcon size={20} />
                        <span className="h-px flex-1 bg-copper-light/70" />
                      </div>

                      <h3 className="mt-2 font-display text-2xl leading-tight font-semibold text-ivory sm:mt-3 sm:text-3xl xl:text-4xl">
                        {b.emirate}
                      </h3>
                      {place && (
                        <p className="mt-0.5 font-display text-sm text-ivory italic sm:mt-1 sm:text-lg">{place}</p>
                      )}

                      {/* Looks like a button; the whole card is the link */}
                      <span
                        aria-hidden="true"
                        className="mt-3 inline-flex min-h-10 items-center gap-2 rounded-full border border-copper-light bg-black/25 px-4 py-2 text-[0.65rem] font-medium tracking-[0.18em] text-ivory uppercase backdrop-blur-sm transition-colors group-hover:border-copper group-hover:bg-copper group-hover:text-teal group-active:bg-copper group-active:text-teal sm:mt-5 sm:min-h-11 sm:gap-2.5 sm:px-6 sm:py-2.5 sm:text-xs sm:tracking-[0.2em]"
                      >
                        View location <ArrowRightIcon size={14} />
                      </span>
                    </div>

                    {/* Copper wave lines in the corners */}
                    <Waves className="right-0" />
                    <Waves className="left-0 -scale-x-100" />
                  </div>
                </Link>
              </li>
            );
          })}
        </AutoCarousel>

        {/* Swipe hint (phones only) */}
        <p className="mt-3 text-center text-[0.65rem] tracking-[0.25em] text-teal/70 uppercase sm:hidden">
          Swipe to see all branches →
        </p>
      </div>
    </section>
  );
}