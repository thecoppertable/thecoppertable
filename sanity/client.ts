import { createClient, type QueryParams } from "next-sanity";

export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "";
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";
export const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION ?? "2025-01-01";

/** False until a project ID is set; the site then keeps using its sample content. */
export const isSanityConfigured = Boolean(projectId);

export const client = createClient({
  projectId: projectId || "not-configured",
  dataset,
  apiVersion,
  useCdn: true,
});

/** Fetch from Sanity; pages refresh at most every 5 minutes after an edit is published. */
export function sanityFetch<T>(query: string, params: QueryParams = {}, tags: string[] = []): Promise<T> {
  return client.fetch<T>(query, params, { next: { revalidate: 300, tags } });
}