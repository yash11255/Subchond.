import {createClient} from "@sanity/client";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "jh6479ac";
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";

export const sanityClient = createClient({
  projectId,
  dataset,
  apiVersion: "2026-01-01",
  useCdn: true,
  perspective: "published",
});

export type BlogPost = {
  slug: string;
  title: string;
  excerpt?: string;
  coverImage?: {url?: string; alt?: string};
  author?: string;
  publishedAt?: string;
  readingTime?: number;
  body?: {children?: {text?: string}[]}[];
};

const BLOG_PROJECTION = `{
  "slug": slug.current,
  title,
  excerpt,
  "coverImage": coverImage { "url": asset->url, "alt": coalesce(alt, "") },
  "author": author->name,
  publishedAt,
  readingTime,
  body[] { children[] { text } }
}`;

export async function getSanityBlogPosts(publication = "dr-manu-bora") {
  try {
    return await sanityClient.fetch<BlogPost[]>(
      `*[_type == "article" && siteId == $publication && status == "published"] | order(publishedAt desc)${BLOG_PROJECTION}`,
      {publication},
      {cache: "no-store"},
    );
  } catch {
    return [];
  }
}

export async function getSanityBlogPost(slug: string, publication = "dr-manu-bora") {
  try {
    return await sanityClient.fetch<BlogPost | null>(
      `*[_type == "article" && siteId == $publication && slug.current == $slug && status == "published"][0]${BLOG_PROJECTION}`,
      {publication, slug},
      {cache: "no-store"},
    );
  } catch {
    return null;
  }
}
