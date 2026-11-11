import { isSanityConfigured, sanityFetch } from "./client";
import { branches as sampleBranches, type Branch } from "@/lib/utils";

/* ---------- Branches (Locations section) ---------- */

const branchesQuery = `
  *[_type == "location"] | order(order asc, emirate asc){
    "slug": slug.current,
    emirate,
    "venue": coalesce(venue, ""),
    "area": coalesce(area, ""),
    "mapQuery": coalesce(mapQuery, venue + ", " + area, emirate),
    "image": coalesce(image.asset->url, "")
  }
`;

/** Branches from Sanity. Falls back to the sample branches until real ones are published. */
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