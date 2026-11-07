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
  updatedAt?: string;
  readingTime?: number;
  seo?: {metaTitle?: string; metaDescription?: string; ogImage?: string; noIndex?: boolean};
  body?: Record<string, unknown>[];
  faqs?: {question: string; answer: string}[];
  references?: {title: string; publisher?: string; url: string}[];
};

const BLOG_PROJECTION = `{
  "slug": slug.current,
  title,
  excerpt,
  "coverImage": coverImage { "url": asset->url, "alt": coalesce(alt, "") },
  "author": author->name,
  publishedAt,
  "updatedAt": _updatedAt,
  readingTime,
  seo { metaTitle, metaDescription, "ogImage": ogImage.asset->url, noIndex },
  body[] { ..., "url": asset->url },
  faqs[] { question, answer },
  references[] { title, publisher, url }
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

export function getSanitySitemapPosts(publication = "dr-manu-bora") {
  return sanityClient.fetch<{slug: string; updatedAt: string; image?: string}[]>(
    `*[_type == "article" && siteId == $publication && status == "published" && seo.noIndex != true && defined(slug.current)]{
      "slug": slug.current,
      "updatedAt": _updatedAt,
      "image": coverImage.asset->url
    }`,
    {publication},
    {cache: "no-store"},
  );
}
