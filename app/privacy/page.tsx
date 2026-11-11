import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How The Copper Table Bistro collects, uses and protects your personal information.",
  alternates: { canonical: "/privacy" },
};

const PRIVACY_EMAIL = "info@thecoppertablebistro.com";
const LAST_UPDATED = "11 November 2026";

const Email = () => (
  <a href={`mailto:${PRIVACY_EMAIL}`} className="text-copper-deep underline underline-offset-4 hover:text-teal">
    {PRIVACY_EMAIL}
  </a>
);

const sections: { title: string; body: ReactNode }[] = [
  {
    title: "What information do we collect?",
    body: (
      <>
        <p>
          When you make a reservation, send us an enquiry, contact us on WhatsApp or by phone, or subscribe to our
          newsletter, we collect the personal information you give us, such as your name, phone number, email
          address, and booking details (branch, date, time, number of guests and any special requests).
        </p>
        <p>
          When you browse our website, we also automatically receive technical information such as your internet
          protocol (IP) address, browser type, device and the pages you visit. This helps us understand how the
          website is used and improve it.
        </p>
        <p>
          Email marketing (if applicable): with your permission, we may send you emails about our restaurants, new
          dishes, events and other updates.
        </p>
      </>
    ),
  },
  {
    title: "How do we use your information?",
    body: (
      <ul className="list-disc space-y-2 pl-6">
        <li>To confirm and manage your reservations and respond to your enquiries.</li>
        <li>To send you news and offers, only if you have agreed to receive them.</li>
        <li>To understand how our website is used and improve it.</li>
        <li>To keep our website secure and meet our legal obligations.</li>
      </ul>
    ),
  },
  {
    title: "Consent",
    body: (
      <>
        <h3 className="font-display text-xl text-teal">How do you get my consent?</h3>
        <p>
          When you provide us with personal information to make a reservation or send an enquiry, we imply that you
          consent to our collecting it and using it for that specific reason only.
        </p>
        <p>
          If we ask for your personal information for a secondary reason, like marketing, we will either ask you
          directly for your expressed consent, or provide you with an opportunity to say no.
        </p>
        <h3 className="pt-2 font-display text-xl text-teal">How do I withdraw my consent?</h3>
        <p>
          If, after you opt in, you change your mind, you may withdraw your consent for us to contact you, or for the
          continued collection, use or disclosure of your information, at any time, by contacting us at <Email />.
        </p>
      </>
    ),
  },
  {
    title: "Disclosure",
    body: (
      <p>
        We do not sell your personal information. We may disclose your personal information if we are required by law
        to do so or if you violate our Terms &amp; Conditions.
      </p>
    ),
  },
  {
    title: "Service providers",
    body: (
      <>
        <p>
          We use trusted third-party services to run this website. They only receive the information needed to
          provide their service to us:
        </p>
        <ul className="list-disc space-y-2 pl-6">
          <li><strong className="font-semibold text-teal">Vercel</strong>: hosts our website.</li>
          <li><strong className="font-semibold text-teal">Sanity</strong>: stores our website content (menus, photos, branch details).</li>
          <li><strong className="font-semibold text-teal">Google Analytics</strong>: helps us understand website visits (if enabled).</li>
          <li><strong className="font-semibold text-teal">Google Maps</strong>: shows our branch locations.</li>
          <li><strong className="font-semibold text-teal">WhatsApp</strong>: used when you choose to contact us or book through WhatsApp.</li>
        </ul>
        <p>
          These providers have their own privacy policies, and some may process information in other countries. We
          recommend reading their policies to understand how they handle your information.
        </p>
        <p>We do not take online payments on this website.</p>
      </>
    ),
  },
  {
    title: "Links",
    body: (
      <p>
        When you click on links on our website, they may direct you away from our site. We are not responsible for the
        privacy practices of other sites and encourage you to read their privacy statements. Once you leave our website,
        you are no longer governed by this Privacy Policy.
      </p>
    ),
  },
  {
    title: "Security",
    body: (
      <p>
        To protect your personal information, we take reasonable precautions and follow industry best practices to make
        sure it is not inappropriately lost, misused, accessed, disclosed, altered or destroyed. Our website uses a
        secure (HTTPS/SSL) connection. Although no method of transmission over the Internet or electronic storage is
        100% secure, we work to protect your information.
      </p>
    ),
  },
  {
    title: "Cookies",
    body: (
      <>
        <p>
          Cookies are small files stored in your browser. We use them only to understand how our website is used
          (Google Analytics, if enabled) and to display maps (Google Maps). We do not use cookies to store payment or
          shopping information.
        </p>
        <p>You can block or delete cookies at any time in your browser settings. The website will still work.</p>
      </>
    ),
  },
  {
    title: "Age of consent",
    body: (
      <p>
        By using this site, you represent that you are at least the age of majority in your country of residence, or
        that you are the age of majority and have given us your consent to allow any of your minor dependents to use
        this site.
      </p>
    ),
  },
  {
    title: "Changes to this Privacy Policy",
    body: (
      <>
        <p>
          We reserve the right to modify this Privacy Policy at any time, so please review it frequently. Changes and
          clarifications will take effect immediately upon their posting on the website. If we make material changes,
          we will update the date at the top of this page.
        </p>
        <p>
          If our business is acquired or merged with another company, your information may be transferred to the new
          owners so that we may continue to serve you.
        </p>
      </>
    ),
  },
  {
    title: "Questions and contact information",
    body: (
      <p>
        If you would like to access, correct, amend or delete any personal information we have about you, register a
        complaint, or simply want more information, contact our Privacy Compliance Officer at <Email />.
      </p>
    ),
  },
];

export default function PrivacyPage() {
  return (
    <>
      {/* Title band */}
      <section className="bg-teal py-14 text-center sm:py-16">
        <div className="container-site">
          <p className="eyebrow eyebrow-lines text-copper-light">Legal</p>
          <h1 className="mt-4 font-display text-5xl font-medium text-ivory sm:text-6xl">
            Privacy <span className="text-copper-light italic">Policy</span>
          </h1>
          <p className="mt-3 text-sm tracking-wide text-cream/70">Last updated: {LAST_UPDATED}</p>
        </div>
      </section>

      {/* Policy text */}
      <article className="bg-cream py-14 sm:py-20">
        <div className="container-site max-w-3xl">
          <p className="text-lg text-charcoal/90">
            This site is owned and operated by <strong className="font-semibold text-teal">The Copper Table Bistro</strong>.
            This Privacy Policy explains what information we collect, how we use it, and your choices.
          </p>

          <ol className="mt-10 space-y-10">
            {sections.map((s, i) => (
              <li key={s.title} className="border-t border-copper/25 pt-8">
                <h2 className="flex items-baseline gap-3 font-display text-3xl text-teal">
                  <span className="text-base font-sans font-semibold tracking-[0.2em] text-copper-deep">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {s.title}
                </h2>
                <div className="mt-4 space-y-4 text-base leading-relaxed text-charcoal/85">{s.body}</div>
              </li>
            ))}
          </ol>
        </div>
      </article>
    </>
  );
}