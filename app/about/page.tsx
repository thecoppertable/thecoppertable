import type { Metadata } from "next";
import { About } from "@/components/sections/About";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "The Copper Table Bistro brings the charm of a traditional French-Italian bistro to the UAE: timeless recipes, quality ingredients and warm hospitality.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return <About headingLevel="h1" cta={{ href: "/menu", label: "Explore our menu" }} />;
}