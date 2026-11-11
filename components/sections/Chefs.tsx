"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ArrowRightIcon } from "@/components/ui/Icons";
import { cn } from "@/lib/utils";

/* PLACEHOLDER TEAM: replace names, text and photos with your real chefs. Moves to the CMS later. */
const chefs = [
  {
    id: "marco",
    name: "Chef Marco Bianchi",
    role: "Executive Chef",
    bio: "With over 15 years of experience in renowned kitchens across Europe, Chef Marco brings a refined touch to every dish at The Copper Table.",
    philosophy: "Simple ingredients. Extraordinary flavour.",
    image: "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&w=1000&q=80",
  },
  {
    id: "daniel",
    name: "Chef Daniel Rossi",
    role: "Sous Chef",
    bio: "Trained in Lyon and Milan, Daniel leads the kitchen line with calm precision, from fresh pasta to slow-braised bistro classics.",
    philosophy: "Respect the classics, then make them your own.",
    image: "https://images.unsplash.com/photo-1583394293214-28ded15ee548?auto=format&fit=crop&w=1000&q=80",
  },
  {
    id: "sofia",
    name: "Chef Sofia Moretti",
    role: "Pastry Chef",
    bio: "Sofia blends Parisian pâtisserie technique with Italian warmth, from crème brûlée to tiramisu, made fresh every day.",
    philosophy: "Every meal deserves a beautiful ending.",
    image: "https://images.unsplash.com/photo-1595257841889-eca2678454e2?auto=format&fit=crop&w=1000&q=80",
  },
];

const pad = (n: number) => String(n).padStart(2, "0");
const initials = (name: string) =>
  name
    .replace("Chef ", "")
    .split(" ")
    .map((w) => w[0])
    .join("");

/** Chef photo that falls back to a branded initials tile if the image can't load (never a broken icon). */
function ChefPhoto({ src, name, sizes, alt = "" }: { src: string; name: string; sizes: string; alt?: string }) {
  const [failed, setFailed] = useState(false);
  if (failed || !src) {
    return (
      <div
        role="img"
        aria-label={alt || `${name}, photo coming soon`}
        className="absolute inset-0 flex items-center justify-center bg-teal-dark"
      >
        <span className="font-display text-7xl text-copper-light/50 italic">{initials(name)}</span>
      </div>
    );
  }
  return <Image src={src} alt={alt} fill sizes={sizes} className="object-cover" onError={() => setFailed(true)} />;
}

/** "Meet the Chefs": sticky photo card + scrolling profiles on desktop, swipeable cards on mobile. */
export function Chefs() {
  const [active, setActive] = useState(0);
  const profileRefs = useRef<(HTMLElement | null)[]>([]);

  // Desktop: the profile closest to the centre of the screen is active (works scrolling up and down)
  useEffect(() => {
    let frame = 0;

    const update = () => {
      frame = 0;
      const middle = window.innerHeight / 2;
      let closest = 0;
      let closestDistance = Infinity;

      profileRefs.current.forEach((el, i) => {
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const distance = Math.abs(rect.top + rect.height / 2 - middle);
        if (distance < closestDistance) {
          closestDistance = distance;
          closest = i;
        }
      });

      setActive(closest);
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const goTo = (i: number) => profileRefs.current[i]?.scrollIntoView({ behavior: "smooth", block: "center" });

  return (
    <section aria-labelledby="chefs-title" className="bg-teal py-16 sm:py-20 lg:py-24">
      <div className="container-site">
        {/* Intro */}
        <div className="mb-10 max-w-xl lg:mb-6">
          <p className="flex items-center gap-4 text-xs font-semibold tracking-[0.25em] text-copper-light uppercase sm:text-sm">
            Our Culinary Team <span aria-hidden="true" className="h-px w-16 bg-copper" />
          </p>
          <h2 id="chefs-title" className="mt-3 font-display text-4xl leading-tight font-medium text-ivory sm:text-5xl">
            Meet the <span className="text-copper-light italic">Chefs</span>
          </h2>
          <p className="mt-3 font-display text-lg leading-relaxed text-cream/90 sm:text-xl">
            Passion, creativity and a shared love for French-Italian cuisine — brought to life by our exceptional team.
          </p>
        </div>

        {/* ---------- DESKTOP: sticky photo + scrolling profiles ---------- */}
        <div className="hidden gap-14 lg:grid lg:grid-cols-[5fr_6fr]">
          <div className="relative">
            <div className="sticky top-28 h-[min(72svh,600px)] overflow-hidden rounded-md border border-copper/30">
              {chefs.map((c, i) => (
                <div
                  key={c.id}
                  aria-hidden="true"
                  className={cn(
                    "absolute inset-0 transition-opacity duration-700",
                    i === active ? "opacity-100" : "opacity-0",
                  )}
                >
                  <ChefPhoto src={c.image} name={c.name} sizes="45vw" />
                </div>
              ))}

              {/* 01 / 02 / 03 indicator */}
              <ol className="absolute bottom-6 left-6 flex gap-5">
                {chefs.map((c, i) => (
                  <li key={c.id}>
                    <button
                      type="button"
                      onClick={() => goTo(i)}
                      aria-label={`Show ${c.name}`}
                      aria-current={i === active ? "true" : undefined}
                      className="flex flex-col items-start gap-1.5 text-base [text-shadow:0_2px_10px_rgba(0,0,0,0.7)]"
                    >
                      <span className={cn("transition-colors", i === active ? "text-ivory" : "text-ivory/55")}>
                        {pad(i + 1)}
                      </span>
                      <span
                        aria-hidden="true"
                        className={cn("h-px bg-ivory transition-all duration-500", i === active ? "w-10" : "w-0")}
                      />
                    </button>
                  </li>
                ))}
              </ol>
            </div>
          </div>

          <div>
            {chefs.map((c, i) => (
              <article
                key={c.id}
                id={`chef-${c.id}`}
                ref={(el) => {
                  profileRefs.current[i] = el;
                }}
                className="flex min-h-[min(72svh,600px)] flex-col justify-center py-10"
              >
                <p className="text-sm tracking-[0.2em] text-copper-light">{pad(i + 1)}</p>
                <h3 className="mt-2 font-display text-4xl text-ivory">{c.name}</h3>
                <p className="mt-1 font-display text-xl text-copper-light italic">{c.role}</p>
                <span aria-hidden="true" className="mt-4 block h-px w-28 bg-copper" />
                <p className="mt-5 max-w-lg font-display text-lg leading-relaxed text-cream/90">{c.bio}</p>
                <p className="mt-6 font-display text-xl text-copper-light italic">Culinary Philosophy</p>
                <p className="mt-1 font-display text-lg text-cream/90">{c.philosophy}</p>
              </article>
            ))}
          </div>
        </div>

        {/* ---------- MOBILE: swipeable chef cards ---------- */}
        <ul
          aria-label="Our chefs"
          className="-mx-5 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-3 [scrollbar-width:none] sm:-mx-8 sm:px-8 lg:hidden [&::-webkit-scrollbar]:hidden"
        >
          {chefs.map((c) => (
            <li
              key={c.id}
              className="w-[82%] shrink-0 snap-start overflow-hidden rounded-md border border-copper/30 bg-teal-dark sm:w-[60%]"
            >
              <div className="relative aspect-[4/5]">
                <ChefPhoto src={c.image} name={c.name} sizes="(min-width: 640px) 60vw, 82vw" alt={c.name} />
              </div>
              <div className="p-5">
                <h3 className="font-display text-2xl text-ivory">{c.name}</h3>
                <p className="font-display text-lg text-copper-light italic">{c.role}</p>
                <span aria-hidden="true" className="mt-3 block h-px w-16 bg-copper" />
                <p className="mt-3 font-display text-base leading-relaxed text-cream/90">{c.bio}</p>
                <p className="mt-3 font-display text-base text-copper-light italic">“{c.philosophy}”</p>
              </div>
            </li>
          ))}
        </ul>
        <p className="mt-3 text-center text-xs tracking-[0.2em] text-cream/60 uppercase lg:hidden">
          Swipe to meet the team →
        </p>

        {/* Discover more */}
        <div className="mt-8 text-center lg:mt-4 lg:text-left">
          <Link
            href="/about"
            className="inline-flex items-center gap-3 border-b border-copper pb-2 text-sm font-semibold tracking-[0.2em] text-copper-light uppercase transition-colors hover:text-ivory"
          >
            Discover more <ArrowRightIcon size={18} />
          </Link>
        </div>
      </div>
    </section>
  );
}