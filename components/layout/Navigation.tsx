"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn, navLinks } from "@/lib/utils";

/** Main menu links, used in the desktop header and the mobile menu. */
export function Navigation({
  vertical = false,
  onNavigate,
}: {
  vertical?: boolean;
  onNavigate?: () => void;
}) {
  const pathname = usePathname();

  return (
    <ul className={cn("flex", vertical ? "flex-col" : "items-center gap-8 xl:gap-12")}>
      {navLinks.map(({ href, label }) => {
        const active = href === "/" ? pathname === "/" : pathname.startsWith(href);
        return (
          <li key={href}>
            <Link
              href={href}
              onClick={onNavigate}
              aria-current={active ? "page" : undefined}
              className={cn(
                "uppercase transition-colors hover:text-copper-light",
                active ? "text-copper-light" : "text-ivory",
                vertical
                  ? "block border-b border-ivory/10 py-4 text-base tracking-[0.15em]"
                  : cn(
                      "border-b-2 py-2 text-sm tracking-[0.08em]",
                      active ? "border-copper-light" : "border-transparent",
                    ),
              )}
            >
              {label}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}