import { isSanityConfigured, sanityFetch } from "./client";
import { branches as sampleBranches, type Branch } from "@/lib/utils";

/* ---------- Branches ---------- */

const branchesQuery = `
  *[_type == "location" && defined(slug.current)] | order(order asc, emirate asc){
    "slug": slug.current,
    emirate,
    "venue": coalesce(venue, ""),
    "area": coalesce(area, ""),
    "mapQuery": coalesce(mapQuery, venue + ", " + area, emirate),
    "image": coalesce(image.asset->url, ""),
    "imageAlt": image.alt,
    address,
    phone,
    whatsapp,
    "hours": coalesce(hours[]{ days, time }, [])
  }
`;

/** All branches from Sanity. Falls back to the samples until real ones are published. */
export async function getBranches(): Promise<Branch[]> {
  if (!isSanityConfigured) return sampleBranches;
  try {
    const data = await sanityFetch<Branch[]>(branchesQuery, {}, ["location"]);
    return data && data.length > 0 ? data : sampleBranches;
  } catch (error) {
    console.error("[sanity] Could not load branches", error);
    return sampleBranches;
  }
}

/** One branch by its slug (e.g. "sharjah"), or null if it doesn't exist. */
export async function getBranch(slug: string): Promise<Branch | null> {
  const all = await getBranches();
  return all.find((b) => b.slug === slug) ?? null;
}