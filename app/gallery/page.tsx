import type { Metadata } from "next";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Gallery",
  description: "Photos of our dishes, dining rooms and events at The Copper Table Bistro.",
  alternates: { canonical: "/gallery" },
};

export default function GalleryPage() {
  return (
    <section className="bg-cream py-24 text-center sm:py-32">
      <div className="container-site">
        <p className="eyebrow eyebrow-lines text-copper-deep">Coming soon</p>
        <h1 className="mt-4 font-display text-5xl text-teal sm:text-6xl">
          Our <span className="text-copper-deep italic">Gallery</span>
        </h1>
        <p className="mx-auto mt-4 max-w-lg text-lg text-charcoal/80">A look inside The Copper Table is coming soon.</p>
        <Button href="/" variant="outline" arrow className="mt-8">Back to home</Button>
      </div>
    </section>
  );
}