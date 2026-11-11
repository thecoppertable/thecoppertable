import type { Metadata } from "next";
import { Button } from "@/components/ui/Button";
import { site } from "@/lib/utils";
import { whatsappLink } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with The Copper Table Bistro by phone, email or WhatsApp.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <section className="bg-cream py-24 text-center sm:py-32">
      <div className="container-site">
        <p className="eyebrow eyebrow-lines text-copper-deep">Get in touch</p>
        <h1 className="mt-4 font-display text-5xl text-teal sm:text-6xl">
          Contact <span className="text-copper-deep italic">Us</span>
        </h1>
        <p className="mx-auto mt-4 max-w-lg text-lg text-charcoal/80">
          Call us on {site.phone} or email {site.email}. We&apos;re also happy to help on WhatsApp.
        </p>
        <Button href={whatsappLink("Hello, I have a question.")} external arrow className="mt-8">Chat on WhatsApp</Button>
      </div>
    </section>
  );
}