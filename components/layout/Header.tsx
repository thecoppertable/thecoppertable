"use client";

import { AnimatePresence, MotionConfig, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { CalendarIcon, CloseIcon, MenuIcon, PhoneIcon, PinIcon } from "@/components/ui/Icons";
import { cn, navLinks, site } from "@/lib/utils";
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
  const close = () => setOpen(false);
  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  return (
    <MotionConfig reducedMotion="user">
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
          {/* Logo */}
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

        {/* ---------- Mobile menu ---------- */}
        <AnimatePresence>
          {open && (
            <motion.div
              id="mobile-menu"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-x-0 top-16 bottom-0 flex flex-col overflow-y-auto bg-teal px-6 pt-8 pb-[max(2rem,env(safe-area-inset-bottom))] lg:hidden"
            >
              {/* Links */}
              <nav aria-label="Mobile">
                <ul className="space-y-1">
                  {navLinks.map((link, i) => {
                    const active = isActive(link.href);
                    return (
                      <motion.li
                        key={link.href}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.05 + i * 0.04, duration: 0.25 }}
                      >
                        <Link
                          href={link.href}
                          onClick={close}
                          aria-current={active ? "page" : undefined}
                          className="group flex items-baseline gap-4 py-2"
                        >
                          <span className="w-6 text-[0.7rem] font-medium tracking-[0.2em] text-copper/80">
                            {String(i + 1).padStart(2, "0")}
                          </span>
                          <span
                            className={cn(
                              "font-display text-[2.4rem] leading-tight transition-colors",
                              active ? "text-copper-light italic" : "text-ivory group-hover:text-copper-light",
                            )}
                          >
                            {link.label}
                          </span>
                        </Link>
                      </motion.li>
                    );
                  })}
                </ul>
              </nav>

              {/* Bottom: actions + tagline */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.3 }}
                className="mt-auto pt-10"
              >
                <Link
                  href="/reservation"
                  onClick={close}
                  className="flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-linear-to-r from-copper-light to-copper text-xs font-semibold tracking-[0.18em] text-teal uppercase"
                >
                  <CalendarIcon size={18} /> Reserve a table
                </Link>

                <div className="mt-3 grid grid-cols-2 gap-3">
                  <a
                    href={`tel:${site.phone.replace(/\s/g, "")}`}
                    className="flex min-h-12 items-center justify-center gap-2 rounded-full border border-ivory/20 text-sm text-cream transition-colors hover:border-copper-light hover:text-copper-light"
                  >
                    <PhoneIcon size={16} /> Call us
                  </a>
                  <Link
                    href="/locations"
                    onClick={close}
                    className="flex min-h-12 items-center justify-center gap-2 rounded-full border border-ivory/20 text-sm text-cream transition-colors hover:border-copper-light hover:text-copper-light"
                  >
                    <PinIcon size={16} /> Find us
                  </Link>
                </div>

                <p className="mt-8 text-center font-display text-lg text-copper-light/90 italic">
                  French <span className="mx-1 text-copper">•</span> Italian{" "}
                  <span className="mx-1 text-copper">•</span> Bistro
                </p>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </MotionConfig>
  );
}