import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { ArrowRightIcon } from "./Icons";

type Variant = "solid" | "outline" | "outline-light";

const base =
  "inline-flex min-h-11 items-center justify-center gap-2.5 rounded-full px-6 py-3 text-sm font-medium tracking-[0.12em] uppercase transition-colors duration-200 disabled:cursor-not-allowed disabled:opacity-60";

const variants: Record<Variant, string> = {
  // Copper pill, dark text (e.g. "Explore our menu", "Subscribe")
  solid: "bg-linear-to-r from-copper-light to-copper text-teal hover:from-copper hover:to-copper-deep hover:text-ivory",
  // Copper outline on light backgrounds (e.g. "View location", "Our story")
  outline: "border border-copper text-teal hover:bg-copper hover:text-teal",
  // Copper outline on teal backgrounds (e.g. "Reserve a table" in the header)
  "outline-light": "border border-copper text-copper-light hover:bg-copper hover:text-teal",
};

type Props = {
  children: ReactNode;
  variant?: Variant;
  /** Show the arrow after the text */
  arrow?: boolean;
  /** Custom icon after the text (replaces the arrow) */
  icon?: ReactNode;
  className?: string;
  href?: string;
  external?: boolean;
  type?: "button" | "submit";
  onClick?: () => void;
  disabled?: boolean;
  "aria-label"?: string;
};

/** One button for the whole site. Renders a link when `href` is set, otherwise a <button>. */
export function Button({
  children,
  variant = "solid",
  arrow = false,
  icon,
  className,
  href,
  external = false,
  type = "button",
  ...rest
}: Props) {
  const classes = cn(base, variants[variant], className);
  const content = (
    <>
      {children}
      {icon ?? (arrow && <ArrowRightIcon size={18} />)}
    </>
  );

  if (href && external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={classes} aria-label={rest["aria-label"]}>
        {content}
      </a>
    );
  }
  if (href) {
    return (
      <Link href={href} className={classes} aria-label={rest["aria-label"]}>
        {content}
      </Link>
    );
  }
  return (
    <button type={type} className={classes} {...rest}>
      {content}
    </button>
  );
}