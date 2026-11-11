"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Newsletter } from "@/components/sections/Newsletter";
import { branches, site } from "@/lib/utils";
import { whatsappLink } from "@/lib/whatsapp";
import { Logo } from "./Header";

/* Tagline in the cream band. Change freely. */
const TAGLINE = ".";

/** Shows the current year. Worked out in the browser so it never goes stale. */
function CurrentYear() {
  const [year, setYear] = useState(2026);
  useEffect(() => setYear(new Date().getFullYear()), []);
  return <>{year}</>;
}

type FooterLink = { label: string; href: string; external?: boolean };

const heading = "mb-6 font-sans text-sm font-bold tracking-[0.18em] text-copper-light uppercase";
const linkClass =
  "font-display text-xl leading-snug text-cream/90 transition-colors hover:text-copper-light focus-visible:text-copper-light";

function Column({ title, links }: { title: string; links: FooterLink[] }) {
  return (
    <nav aria-label={title}>
      <h2 className={heading}>{title}</h2>
      <ul className="space-y-2.5">
        {links.map((l) => (
          <li key={l.label}>
            {l.external ? (
              <a href={l.href} target="_blank" rel="noopener noreferrer" className={linkClass}>
                {l.label}
              </a>
            ) : (
              <Link href={l.href} className={linkClass}>
                {l.label}
              </Link>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
}

export function Footer() {
  const pathname = usePathname();
  if (pathname.startsWith("/studio")) return null;

  const socials: FooterLink[] = site.social
    .filter((s) => s.href)
    .map((s) => ({ label: s.name, href: s.href, external: true }));

  const columns: { title: string; links: FooterLink[] }[] = [
    {
      title: "The Copper Table",
      links: [
        { label: "About Us", href: "/about" },
        { label: "Gallery", href: "/gallery" },
        { label: "Contact", href: "/contact" },
      ],
    },
    {
      title: "Dine With Us",
      links: [
        { label: "Menu", href: "/menu" },
        { label: "Reserve a Table", href: "/reservation" },
        { label: "Our Locations", href: "/locations" },
      ],
    },
    {
      title: "Our Locations",
      links: branches.map((b) => ({ label: b.emirate, href: `/locations#${b.slug}` })),
    },
    {
      title: "Contact Us",
      links: [
        { label: site.phone, href: `tel:${site.phone.replace(/\s/g, "")}`, external: true },
        { label: "WhatsApp", href: whatsappLink(), external: true },
        { label: "Email Us", href: `mailto:${site.email}`, external: true },
        ...socials,
      ],
    },
    {
      title: "Legal",
      links: [
        { label: "Privacy Policy", href: "/privacy" },
        { label: "Terms & Conditions", href: "/terms" },
      ],
    },
  ];

  return (
    <>
      <Newsletter />

      {/* Cream band with the big tagline */}
      <div className="bg-cream">
        <div className="container-site flex justify-end pt-4 pb-12 sm:pb-16">
          <p className="font-display text-4xl font-semibold text-copper-deep italic sm:text-6xl lg:text-7xl">
            {TAGLINE}
          </p>
        </div>
      </div>

      <footer className="relative bg-teal text-cream">
        {/* Logo badge overlapping the cream/teal line */}
        <div className="container-site relative">
          <Link
            href="/"
            aria-label={`${site.name}, home`}
            className="absolute top-0 left-5 -translate-y-1/2 drop-shadow-[0_10px_20px_rgba(0,0,0,0.25)] sm:left-8"
          >
            <Logo className="h-28 w-auto sm:h-36 lg:h-40" />
          </Link>
        </div>

        {/* Link columns */}
        <div className="container-site grid gap-x-10 gap-y-12 pt-28 pb-16 sm:grid-cols-2 sm:pt-32 lg:grid-cols-5 lg:pt-36 lg:pb-20">
          {columns.map((c) => (
            <Column key={c.title} title={c.title} links={c.links} />
          ))}
        </div>

        {/* Bottom bar */}
        <div className="bg-teal-dark">
          <div className="container-site flex flex-col items-center gap-1 py-6 text-center">
            <p className="font-display text-lg text-cream/90">
              French <span className="mx-1.5 text-copper">•</span> Italian <span className="mx-1.5 text-copper">•</span>{" "}
              Bistro
            </p>
            <p className="text-xs tracking-wide text-cream/60">
              © <CurrentYear /> {site.name}. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}