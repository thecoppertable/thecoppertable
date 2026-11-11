/** Join class names, skipping empty values. */
export function cn(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(" ");
}

/** Restaurant details used across the site. TODO: confirm phone + email before launch. */
export const site = {
  name: "The Copper Table Bistro",
  tagline: "A taste of France & Italy, crafted with passion.",
  description:
    "The Copper Table Bistro brings the charm of a French-Italian bistro to the UAE. Explore the menu, find your nearest branch and reserve a table.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  phone: "+971 50 123 4567",
  email: "hello@thecoppertablebistro.com",
  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "",
  currency: "AED",
  // Add each URL when ready. Empty ones are hidden.
  social: [
    { name: "Instagram", href: "", icon: "/icons/instagram.svg" },
    { name: "Facebook", href: "", icon: "/icons/facebook.svg" },
    { name: "TikTok", href: "", icon: "/icons/tiktok.svg" },
    { name: "TripAdvisor", href: "", icon: "/icons/tripadvisor.svg" },
    { name: "YouTube", href: "", icon: "/icons/youtube.svg" },
  ],
};

export const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/menu", label: "Menu" },
  { href: "/locations", label: "Our Locations" },
  { href: "/gallery", label: "Gallery" },
  { href: "/contact", label: "Contact" },
];

export type OpeningHours = { days: string; time: string };

export type Branch = {
  slug: string;
  emirate: string;
  venue: string;
  area: string;
  mapQuery: string;
  image: string;
  imageAlt?: string;
  address?: string;
  phone?: string;
  whatsapp?: string;
  hours?: OpeningHours[];
};

/** Sample branches, shown until real branches are published in Sanity. */
export const branches: Branch[] = [
  {
    slug: "sharjah",
    emirate: "Sharjah",
    venue: "City Centre Al Zahia",
    area: "Sharjah",
    mapQuery: "City Centre Al Zahia, Sharjah",
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1600&q=80",
  },
  {
    slug: "umm-al-quwain",
    emirate: "Umm Al Quwain",
    venue: "Mall of UAQ",
    area: "Umm Al Quwain",
    mapQuery: "Mall of UAQ, Umm Al Quwain",
    image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1600&q=80",
  },
  {
    slug: "abu-dhabi",
    emirate: "Abu Dhabi",
    venue: "The Galleria",
    area: "Al Maryah Island",
    mapQuery: "The Galleria, Al Maryah Island, Abu Dhabi",
    image: "https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&w=1600&q=80",
  },
  {
    slug: "ras-al-khaimah",
    emirate: "Ras Al Khaimah",
    venue: "RAK Mall",
    area: "Ras Al Khaimah",
    mapQuery: "RAK Mall, Ras Al Khaimah",
    image: "https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=1600&q=80",
  },
];

/** Google Maps link for directions (opens the Maps app on phones). */
export function mapsLink(query: string): string {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
}

/** Google Maps embed (no API key needed). */
export function mapEmbedUrl(query: string): string {
  return `https://www.google.com/maps?q=${encodeURIComponent(query)}&output=embed`;
}

/** Format a price, e.g. 92 -> "AED 92". */
export function formatPrice(value?: number | null): string {
  if (value === undefined || value === null) return "";
  return `${site.currency} ${Number.isInteger(value) ? value : value.toFixed(2)}`;
}