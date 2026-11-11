"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ChevronDownIcon, PauseIcon, PlayIcon } from "@/components/ui/Icons";

/* ------------------------------------------------------------------
   HERO VIDEO: change these two lines when the final video is ready.
------------------------------------------------------------------- */
const HERO_VIDEO = "/videos/hero.mp4";
const HERO_POSTER = "/images/hero-poster.jpg";

/* Opening words shown on the small video card. Placeholder copy, change freely. */
const INTRO_EYEBROW = "Bienvenue • Benvenuti";
const INTRO_QUOTE = "“Discover a beautiful blend of French elegance and Italian warmth. From thoughtfully crafted dishes to moments shared around the table, every visit is an experience worth savouring.”";

/* Soft shadow behind the words only, so text stays readable without tinting the video */
const textShadow = "[text-shadow:0_2px_18px_rgba(0,0,0,0.55)]";

const ease = [0.22, 1, 0.36, 1] as const;

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(true);
  const reduce = useReducedMotion();

  /* 0 = top of the hero, 1 = end of the hero scroll */
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end end"] });

  // Card grows to full screen during the first half of the scroll
  const clipPath = useTransform(
    scrollYProgress,
    [0, 0.5],
    ["inset(16% 12% 16% 12% round 20px)", "inset(0% 0% 0% 0% round 0px)"],
  );
  // Welcome quote fades out quickly
  const introOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const introY = useTransform(scrollYProgress, [0, 0.2], [0, -30]);
  // Main title fades in once the card is nearly full screen
  const mainOpacity = useTransform(scrollYProgress, [0.35, 0.6], [0, 1]);
  const mainY = useTransform(scrollYProgress, [0.35, 0.6], [40, 0]);
  const mainPointer = useTransform(mainOpacity, (v) => (v > 0.5 ? "auto" : "none"));

  /* Reduced motion: pause the video */
  useEffect(() => {
    if (reduce) {
      videoRef.current?.pause();
      setPlaying(false);
    }
  }, [reduce]);

  const toggleVideo = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      video.play().catch(() => {});
      setPlaying(true);
    } else {
      video.pause();
      setPlaying(false);
    }
  };

  const mainStyle = reduce ? undefined : { opacity: mainOpacity, y: mainY, pointerEvents: mainPointer };
  const linkClass = `text-xs font-medium tracking-[0.3em] text-ivory uppercase transition-colors hover:text-copper-light sm:text-sm ${textShadow}`;

  return (
    <section
      id="hero"
      ref={sectionRef}
      aria-labelledby="hero-title"
      className={`relative z-10 -mt-20 bg-teal lg:-mt-24 ${reduce ? "h-svh min-h-[560px]" : "h-[220svh]"}`}
    >
      {/* Stays pinned to the screen while the hero scrolls */}
      <div className="sticky top-0 h-svh min-h-[560px] overflow-hidden">
        {/* Video card → full screen (no overlay, natural colours) */}
        <motion.div className="absolute inset-0 overflow-hidden" style={reduce ? undefined : { clipPath }}>
          <motion.video
            ref={videoRef}
            className="h-full w-full object-cover"
            initial={reduce ? false : { scale: 1.2 }}
            animate={{ scale: 1 }}
            transition={{ duration: 2.4, ease }}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            poster={HERO_POSTER}
            aria-hidden="true"
          >
            <source src={HERO_VIDEO} type="video/mp4" />
          </motion.video>
        </motion.div>

        {/* Stage 1: welcome quote on the small card */}
        {!reduce && (
          <motion.div
            style={{ opacity: introOpacity, y: introY }}
            className={`pointer-events-none absolute inset-0 flex items-center justify-center px-10 text-center sm:px-24 ${textShadow}`}
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.6, ease }}
            >
              <p className="font-heading text-lg text-copper-light italic sm:text-xl">{INTRO_EYEBROW}</p>
              <p className="mx-auto mt-4 max-w-3xl font-display text-3xl leading-snug tracking-wide text-ivory sm:text-5xl">
                {INTRO_QUOTE}
              </p>
            </motion.div>
          </motion.div>
        )}

        {/* Stage 2: main title on the full-screen video */}
        <motion.div
          style={mainStyle}
          className={`absolute inset-0 flex flex-col items-center justify-center px-6 text-center ${textShadow}`}
        >
          <p className="eyebrow text-ivory">
            French <span className="mx-2 text-copper-light">•</span> Italian{" "}
            <span className="mx-2 text-copper-light">•</span> Bistro
          </p>
          <h1
            id="hero-title"
            className="mt-6 font-display text-5xl leading-[0.95] font-medium text-ivory sm:text-7xl lg:text-8xl"
          >
            A Taste of
            <span className="block pb-2 text-copper-light italic">France &amp; Italy</span>
          </h1>
          <p className="mt-5 max-w-lg text-lg text-ivory sm:text-xl">
            Indulge in timeless flavours, crafted with passion in an elegant setting.
          </p>
        </motion.div>

        {/* Stage 2: links at the bottom */}
        <motion.nav
          aria-label="Hero"
          style={mainStyle}
          className="absolute inset-x-0 bottom-10 flex items-center justify-center gap-6 sm:bottom-12 sm:gap-8"
        >
          <Link href="/menu" className={linkClass}>
            View menu
          </Link>
          <span aria-hidden="true" className="h-6 w-px bg-copper-light" />
          <Link href="/reservation" className={linkClass}>
            Book a table
          </Link>
        </motion.nav>

        {/* Stage 1: scroll hint */}
        {!reduce && (
          <motion.div
            style={{ opacity: introOpacity }}
            aria-hidden="true"
            className={`pointer-events-none absolute inset-x-0 bottom-8 flex flex-col items-center gap-2 text-ivory ${textShadow}`}
          >
            <span className="text-xs tracking-[0.3em] uppercase">Scroll</span>
            <ChevronDownIcon size={18} className="animate-bounce" />
          </motion.div>
        )}

        {/* Pause / play: required for accessibility on moving backgrounds */}
        <button
          type="button"
          onClick={toggleVideo}
          aria-label={playing ? "Pause background video" : "Play background video"}
          className="absolute right-5 bottom-8 flex h-11 w-11 items-center justify-center rounded-full border border-ivory/60 bg-black/20 text-ivory backdrop-blur-sm transition-colors hover:border-copper hover:text-copper-light sm:right-8"
        >
          {playing ? <PauseIcon size={18} /> : <PlayIcon size={18} />}
        </button>
      </div>
    </section>
  );
}