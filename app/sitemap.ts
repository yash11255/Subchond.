import type {MetadataRoute} from "next";
import {getSanityBlogPosts} from "@/lib/sanity";
import {absoluteUrl} from "@/lib/seo";
import {CONDITIONS, TREATMENTS} from "@/lib/pages";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getSanityBlogPosts();
  const staticPaths = [
    "/",
    "/about",
    "/conditions",
    "/treatments",
    "/blog",
    "/knee-assistant",
    ...CONDITIONS.map((page) => `/conditions/${page.slug}`),
    ...TREATMENTS.map((page) => `/treatments/${page.slug}`),
  ];

  return [
    ...staticPaths.map((path) => ({url: absoluteUrl(path)})),
    ...posts.filter((post) => post.slug && !post.seo?.noIndex).map((post) => ({
      url: absoluteUrl(`/blog/${post.slug}`),
      ...(post.updatedAt ? {lastModified: post.updatedAt} : {}),
      ...(post.coverImage?.url ? {images: [post.coverImage.url]} : {}),
    })),
  ];
}
