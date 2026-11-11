import Image from "next/image";
import { Button } from "@/components/ui/Button";

/* Temporary sample photo, replace later with your own. */
const ABOUT_IMAGE =
  "https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&w=1200&q=80";
const ABOUT_ALT = "The dining room at The Copper Table Bistro";

type Props = {
  /** Use "h1" on the About page, "h2" on the homepage. */
  headingLevel?: "h1" | "h2";
  /** Button under the text. */
  cta?: { href: string; label: string };
};

/** About section on deep green: arch photo on mobile, curved-edge photo beside the story on desktop. */
export function About({ headingLevel = "h2", cta = { href: "/about", label: "Our story" } }: Props) {
  const Heading = headingLevel;

  return (
    <section aria-labelledby="about-title" className="overflow-hidden bg-teal">
      <div className="grid lg:grid-cols-[2fr_3fr]">
        {/* ---------- Desktop photo with curved copper edge ---------- */}
        <div className="relative hidden overflow-hidden border-r-[5px] border-copper lg:block lg:min-h-[460px] lg:[border-top-right-radius:18%_50%] lg:[border-bottom-right-radius:18%_50%]">
          <Image src={ABOUT_IMAGE} alt={ABOUT_ALT} fill sizes="40vw" className="object-cover" />
        </div>

        {/* ---------- Story ---------- */}
        <div className="flex items-center px-5 py-14 sm:px-8 sm:py-16 lg:px-14 lg:py-16 xl:px-20">
          <div className="w-full max-w-xl">
            {/* Label, left-aligned with a copper line */}
            <p className="flex items-center gap-4 text-xs font-semibold tracking-[0.25em] text-copper-light uppercase sm:text-sm">
              About The Copper Table
              <span aria-hidden="true" className="h-px w-12 bg-copper sm:w-16" />
            </p>

            <Heading
              id="about-title"
              className="mt-4 font-display text-4xl leading-[0.95] font-medium text-ivory sm:text-5xl lg:mt-6 lg:text-6xl"
            >
              A Taste of
              <span className="block pb-1 text-copper-light italic">France &amp; Italy</span>
            </Heading>

            {/* Mobile/tablet photo: an arch, like a bistro window, with a fine copper outline */}
            <div className="relative mx-auto mt-9 w-full max-w-sm lg:hidden">
              <div aria-hidden="true" className="absolute -inset-2 rounded-t-full border border-copper/50" />
              <div className="relative aspect-[4/5] overflow-hidden rounded-t-full">
                <Image
                  src={ABOUT_IMAGE}
                  alt={ABOUT_ALT}
                  fill
                  sizes="(min-width: 640px) 384px, 90vw"
                  className="object-cover"
                />
              </div>
            </div>

            <div className="mt-9 space-y-4 text-[0.95rem] leading-relaxed text-cream/90 lg:mt-5 lg:text-lg">
              <p>
                The Copper Table Bistro brings the charm of a traditional French-Italian bistro to the UAE — a place
                where timeless recipes, quality ingredients and warm hospitality come together.
              </p>
              <p>
                From classic favourites to modern creations, every dish is crafted with passion, offering an
                unforgettable dining experience for all occasions.
              </p>
            </div>

            <Button href={cta.href} variant="outline-light" arrow className="mt-8 w-full sm:w-auto lg:mt-7">
              {cta.label}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}