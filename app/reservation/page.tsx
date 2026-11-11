import type { Metadata } from "next";
import { Button } from "@/components/ui/Button";
import { site } from "@/lib/utils";
import { whatsappLink } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: "Reserve a Table",
  description: "Book a table at The Copper Table Bistro in Sharjah, Umm Al Quwain, Abu Dhabi or Ras Al Khaimah.",
  alternates: { canonical: "/reservation" },
};

export default function ReservationPage() {
  return (
    <section className="bg-cream py-24 text-center sm:py-32">
      <div className="container-site">
        <p className="eyebrow eyebrow-lines text-copper-deep">Reservations</p>
        <h1 className="mt-4 font-display text-5xl text-teal sm:text-6xl">
          Reserve a <span className="text-copper-deep italic">Table</span>
        </h1>
        <p className="mx-auto mt-4 max-w-lg text-lg text-charcoal/80">
          Our online booking form is coming soon. For now, reserve on WhatsApp or call {site.phone}.
        </p>
        <Button href={whatsappLink(`Hello ${site.name}, I would like to reserve a table.`)} external arrow className="mt-8">
          Reserve on WhatsApp
        </Button>
      </div>
    </section>
  );
}