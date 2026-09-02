import { createClient, type SanityClient } from "next-sanity";
import { apiVersion, dataset, projectId } from "../env";

// Sanity's real client throws synchronously if projectId is missing — and
// since that construction would otherwise happen at module-import time, a
// missing/misconfigured env var would crash the entire build for every page
// that imports this file, not just fail gracefully where it's used. Instead,
// only build the real client when we actually have a projectId, and defer
// the "not configured" failure to fetch-time, where callers already handle
// errors and fall back to an empty/"not found" state.
let realClient: SanityClient | null = null;
if (projectId) {
  realClient = createClient({ projectId, dataset, apiVersion, useCdn: true });
}

export const client = {
  fetch: async <T = unknown>(query: string, params?: Record<string, unknown>): Promise<T> => {
    if (!realClient) {
      throw new Error(
        "Sanity is not configured — set NEXT_PUBLIC_SANITY_PROJECT_ID and NEXT_PUBLIC_SANITY_DATASET."
      );
    }
    return realClient.fetch(query, params as any) as Promise<T>;
  },
};
