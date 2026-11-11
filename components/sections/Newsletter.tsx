"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";

/**
 * "Stay in the Know" strip above the footer.
 * Set NEXT_PUBLIC_NEWSLETTER_ACTION in .env.local to your Mailchimp/Brevo form URL to make it live.
 */
export function Newsletter() {
  const action = process.env.NEXT_PUBLIC_NEWSLETTER_ACTION;
  const [notice, setNotice] = useState("");

  return (
    <section aria-labelledby="newsletter-title" className="bg-cream py-14 sm:py-16">
      <div className="container-site text-center">
        <h2
          id="newsletter-title"
          className="eyebrow-lines font-display text-4xl font-medium text-teal normal-case before:!w-12 after:!w-12 sm:text-5xl sm:before:!w-48 sm:after:!w-48"
        >
          Stay in the Know
        </h2>
        <p className="mt-3 font-heading text-lg text-teal italic sm:text-xl">
          Be the first to hear about our latest dishes, events and more.
        </p>

        <form
          action={action || undefined}
          method="post"
          target="_blank"
          onSubmit={(e) => {
            if (!action) {
              e.preventDefault();
              setNotice("Newsletter sign-up is not connected yet.");
            }
          }}
          className="mx-auto mt-8 flex max-w-xl flex-col gap-3 sm:flex-row sm:gap-0"
        >
          <label htmlFor="newsletter-email" className="sr-only">
            Email address
          </label>
          <input
            id="newsletter-email"
            type="email"
            name="EMAIL"
            required
            autoComplete="email"
            placeholder="Your Email Address"
            className="min-h-12 flex-1 rounded-full border border-copper bg-ivory px-6 text-base text-charcoal placeholder:text-charcoal/50 focus:ring-2 focus:ring-copper/40 focus:outline-none sm:rounded-r-none sm:border-r-0"
          />
          <Button type="submit" arrow className="min-h-12 sm:-ml-6 sm:px-8">
            Subscribe
          </Button>
        </form>
        <p role="status" className="mt-3 min-h-5 text-sm text-copper-deep">
          {notice}
        </p>
      </div>
    </section>
  );
}