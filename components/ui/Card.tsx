import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/** Soft-ivory card with rounded corners and a soft shadow (e.g. location cards). */
export function Card({
  children,
  className,
  as: Tag = "div",
}: {
  children: ReactNode;
  className?: string;
  as?: "div" | "article" | "li";
}) {
  return (
    <Tag
      className={cn(
        "overflow-hidden rounded-xl border border-copper/15 bg-ivory shadow-[0_8px_24px_-12px_rgba(7,59,56,0.25)]",
        className,
      )}
    >
      {children}
    </Tag>
  );
}