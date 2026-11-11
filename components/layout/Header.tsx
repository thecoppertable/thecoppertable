"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { CloseIcon, MenuIcon } from "@/components/ui/Icons";
import { cn, site } from "@/lib/utils";
import { Navigation } from "./Navigation";

/* ------------------------------------------------------------------
   LOGO FILE: in /public. Set LOGO_WIDTH / LOGO_HEIGHT to the PNG's
   real size (Finder → Get Info → Dimensions) so it never stretches.
------------------------------------------------------------------- */
const LOGO_SRC = "/logo.png";
const LOGO_WIDTH = 500;
const LOGO_HEIGHT = 520;

/** Brand logo. Height is set per screen size; width adjusts automatically. */
export function Logo({ className = "h-11 sm:h-12 lg:h-[68px]" }: { className?: string }) {
  return (
    <Image
      src={LOGO_SRC}
      alt={site.name}
      width={LOGO_WIDTH}
      height={LOGO_HEIGHT}
      priority
      className={cn("w-auto object-contain", className)}
    />
  );
}

export function Header() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [open, setOpen] = useState(false);
  const [overHero, setOverHero] = useState(isHome);

  // Close the mobile menu when the page changes
  useEffect(() => setOpen(false), [pathname]);

  // Homepage: transparent header while the hero video fills the screen
  useEffect(() => {
    if (!isHome) {
      setOverHero(false);
      return;
    }
    const onScroll = () => {
      const hero = document.getElementById("hero");
      const limit = hero ? hero.offsetHeight - window.innerHeight : 0;
      setOverHero(window.scrollY < limit);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [isHome]);

  // Close with Escape and stop the page scrolling behind the open menu
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  // No site header inside the CMS (/studio)
  if (pathname.startsWith("/studio")) return null;

  const solid = !overHero || open;

  return (
    <header
      className={cn(
        "sticky top-0 z-40 border-b transition-[background-color,border-color,box-shadow] duration-300",
        solid
          ? "border-copper/20 bg-teal shadow-[0_6px_20px_-12px_rgba(0,0,0,0.5)]"
          : "border-transparent bg-transparent",
      )}
    >
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-4 focus:rounded focus:bg-ivory focus:px-4 focus:py-2 focus:text-teal"
      >
        Skip to content
      </a>

      <nav aria-label="Main" className="container-site flex h-16 items-center justify-between gap-8 lg:h-20">
        {/* Logo: fits inside the bar on every screen size */}
        <Link href="/" aria-label={`${site.name}, home`} className="flex shrink-0 items-center py-2">
          <Logo />
        </Link>

        {/* Desktop menu */}
        <div className="hidden lg:block">
          <Navigation />
        </div>

        {/* Mobile menu button */}
        <button
          type="button"
          className="-mr-2 inline-flex h-11 w-11 items-center justify-center rounded-full text-ivory transition-colors hover:bg-ivory/10 lg:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <CloseIcon size={24} /> : <MenuIcon size={24} />}
        </button>
      </nav>

      {/* Mobile menu panel */}
      <div
        id="mobile-menu"
        hidden={!open}
        className="fixed inset-x-0 top-16 bottom-0 overflow-y-auto border-t border-copper/20 bg-teal px-6 pt-4 pb-10 lg:hidden"
      >
        <Navigation vertical onNavigate={() => setOpen(false)} />
        <p className="mt-10 text-center font-display text-lg text-copper-light italic">
          French <span className="mx-1 text-copper">•</span> Italian <span className="mx-1 text-copper">•</span> Bistro
        </p>
      </div>
    </header>
  );
}