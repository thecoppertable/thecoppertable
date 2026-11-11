"use client";

import { useEffect, useRef, type ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
  label: string;
  /** Time between slides in milliseconds */
  interval?: number;
};

/**
 * Horizontal list that auto-advances on phones only.
 * Pauses when touched, when off-screen, when the tab is hidden, and for reduced-motion users.
 */
export function AutoCarousel({ children, className, label, interval = 3500 }: Props) {
  const ref = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const list = ref.current;
    if (!list) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const isPhone = window.matchMedia("(max-width: 639px)");
    let pausedUntil = 0;
    let onScreen = false;

    const pause = () => {
      pausedUntil = Date.now() + 6000;
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        onScreen = entry.isIntersecting;
      },
      { threshold: 0.5 },
    );
    observer.observe(list);

    const tick = () => {
      if (!isPhone.matches || !onScreen || document.hidden || Date.now() < pausedUntil) return;
      const items = Array.from(list.children) as HTMLElement[];
      if (items.length < 2) return;

      const atEnd = list.scrollLeft + list.clientWidth >= list.scrollWidth - 8;
      if (atEnd) {
        list.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        const step = items[1].offsetLeft - items[0].offsetLeft;
        list.scrollBy({ left: step, behavior: "smooth" });
      }
    };

    const timer = window.setInterval(tick, interval);
    list.addEventListener("pointerdown", pause, { passive: true });
    list.addEventListener("touchstart", pause, { passive: true });
    list.addEventListener("wheel", pause, { passive: true });
    list.addEventListener("focusin", pause);

    return () => {
      window.clearInterval(timer);
      observer.disconnect();
      list.removeEventListener("pointerdown", pause);
      list.removeEventListener("touchstart", pause);
      list.removeEventListener("wheel", pause);
      list.removeEventListener("focusin", pause);
    };
  }, [interval]);

  return (
    <ul ref={ref} aria-label={label} className={className}>
      {children}
    </ul>
  );
}