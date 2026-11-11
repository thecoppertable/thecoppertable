import type { Metadata } from "next";
import { Locations } from "@/components/sections/Locations";

export const metadata: Metadata = {
  title: "Our Locations",
  description:
    "Find The Copper Table Bistro in Sharjah, Umm Al Quwain, Abu Dhabi and Ras Al Khaimah. Opening hours, directions and contact details.",
  alternates: { canonical: "/locations" },
};

export default function LocationsPage() {
  return <Locations headingLevel="h1" />;
}