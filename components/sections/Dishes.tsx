import Image from "next/image";
import Link from "next/link";
import { ArrowRightIcon } from "@/components/ui/Icons";

/* Temporary dishes and sample photos. These move to Sanity CMS later. */
const favourites = [
  {
    slug: "truffle-mushroom-risotto",
    name: "Truffle Mushroom Risotto",
    blurb: "Rich, creamy and full of flavour.",
    image: "https://images.unsplash.com/photo-1476124369491-e7addf5db371?auto=format&fit=crop&w=900&q=80",
  },
  {
    slug: "grilled-angus-steak",
    name: "Grilled Angus Steak",
    blurb: "A timeless classic.",
    image: "https://images.unsplash.com/photo-1600891964092-4316c288032e?auto=format&fit=crop&w=900&q=80",
  },
  {
    slug: "prawn-linguine",
    name: "Prawn Linguine",
    blurb: "A Mediterranean favourite.",
    image: "https://images.unsplash.com/photo-1563379926898-05f4575a45d8?auto=format&fit=crop&w=900&q=80",
  },
  {
    slug: "chocolate-fondant",
    name: "Chocolate Fondant",
    blurb: "The perfect sweet ending.",
    image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=900&q=80",
  },
];

/** "Our Guest Favourites": four signature dishes on deep teal. */
export function Dishes() {
  return (
    <section aria-labelledby="favourites-title" className="bg-teal py-16 sm:py-20">
      <div className="container-site">
        {/* Heading */}
        <div className="mx-auto mb-10 max-w-2xl text-center sm:mb-12">
          <p className="eyebrow eyebrow-lines text-copper-light">A Taste to Remember</p>
          <h2
            id="favourites-title"
            className="mt-4 font-display text-4xl leading-tight font-medium text-ivory sm:text-5xl lg:text-6xl"
          >
            Our Guest <span className="text-copper-light italic">Favourites</span>
          </h2>
          <p className="mt-3 font-display text-xl text-cream/85 sm:text-2xl">
            Discover the dishes that bring everyone back to the table.
          </p>
        </div>

        {/* Dish cards */}
        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {favourites.map((dish) => (
            <li
              key={dish.slug}
              className="group flex flex-col overflow-hidden rounded-md border border-copper/25 bg-teal-dark transition-[border-color,transform] duration-300 hover:-translate-y-1 hover:border-copper/60"
            >
              {/* Photo, fading into the card */}
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={dish.image}
                  alt={dish.name}
                  fill
                  sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div
                  aria-hidden="true"
                  className="absolute inset-x-0 bottom-0 h-1/3 bg-linear-to-t from-teal-dark to-transparent"
                />
              </div>

              {/* Text */}
              <div className="flex flex-1 flex-col items-center px-5 pt-3 pb-7 text-center">
                <h3 className="font-display text-2xl text-ivory">{dish.name}</h3>
                <span aria-hidden="true" className="my-3 h-px w-12 bg-copper/70" />
                <p className="font-display text-lg text-cream/85">{dish.blurb}</p>
                <Link
                  href={`/menu#${dish.slug}`}
                  className="mt-5 inline-flex items-center gap-2 text-xs font-semibold tracking-[0.2em] text-copper-light uppercase transition-colors hover:text-ivory"
                  aria-label={`Explore dish: ${dish.name}`}
                >
                  Explore dish <ArrowRightIcon size={16} />
                </Link>
              </div>
            </li>
          ))}
        </ul>

        {/* Full menu button between lines */}
        <div className="mt-12 flex items-center gap-6">
          <span aria-hidden="true" className="h-px flex-1 bg-copper/50" />
          <Link
            href="/menu"
            className="inline-flex min-h-11 items-center gap-2.5 rounded-full border border-copper px-7 py-3 text-xs font-semibold tracking-[0.2em] text-copper-light uppercase transition-colors hover:bg-copper hover:text-teal sm:text-sm"
          >
            Explore full menu <ArrowRightIcon size={16} />
          </Link>
          <span aria-hidden="true" className="h-px flex-1 bg-copper/50" />
        </div>
      </div>
    </section>
  );
}