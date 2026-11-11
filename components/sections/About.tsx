import Image from "next/image";
import { Button } from "@/components/ui/Button";

/* Temporary sample photo, replace later with your own. */
const ABOUT_IMAGE =
  "https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&w=1200&q=80";

type Props = {
  /** Use "h1" on the About page, "h2" on the homepage. */
  headingLevel?: "h1" | "h2";
  /** Button under the text. */
  cta?: { href: string; label: string };
};

/** Compact split section on deep teal: photo with a curved copper edge, story beside it. */
export function About({ headingLevel = "h2", cta = { href: "/about", label: "Our story" } }: Props) {
  const Heading = headingLevel;

  return (
    <section aria-labelledby="about-title" className="overflow-hidden bg-teal">
      <div className="grid lg:grid-cols-[2fr_3fr]">
        {/* Photo: straight on mobile, curved copper edge on desktop */}
        <div className="relative aspect-[16/10] overflow-hidden border-b-4 border-copper lg:aspect-auto lg:min-h-[460px] lg:border-r-[5px] lg:border-b-0 lg:[border-top-right-radius:18%_50%] lg:[border-bottom-right-radius:18%_50%]">
          <Image
            src={ABOUT_IMAGE}
            alt="The dining room at The Copper Table Bistro"
            fill
            sizes="(min-width: 1024px) 40vw, 100vw"
            className="object-cover"
          />
        </div>

        {/* Story */}
        <div className="flex items-center px-5 py-14 sm:px-8 lg:px-14 lg:py-16 xl:px-20">
          <div className="max-w-xl">
            <p className="eyebrow eyebrow-lines text-copper-light">About The Copper Table</p>

            <Heading
              id="about-title"
              className="mt-6 font-display text-4xl leading-[0.95] font-medium text-ivory sm:text-5xl lg:text-6xl"
            >
              A Taste of
              <span className="block pb-2 text-copper-light italic">France &amp; Italy</span>
            </Heading>

            <div className="mt-5 space-y-4 text-base text-cream/90 lg:text-lg">
              <p>
                The Copper Table Bistro brings the charm of a traditional French-Italian bistro to the UAE — a place
                where timeless recipes, quality ingredients and warm hospitality come together.
              </p>
              <p>
                From classic favourites to modern creations, every dish is crafted with passion, offering an
                unforgettable dining experience for all occasions.
              </p>
            </div>

            <Button href={cta.href} variant="outline-light" arrow className="mt-7">
              {cta.label}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}