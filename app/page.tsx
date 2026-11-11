import type { Metadata } from "next";
import { About } from "@/components/sections/About";
import { Chefs } from "@/components/sections/Chefs";
import { Dishes } from "@/components/sections/Dishes";
import { Hero } from "@/components/sections/Hero";
import { Locations } from "@/components/sections/Locations";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <Locations />
      <About />
      <Dishes />
      <Chefs />
    </>
  );
}