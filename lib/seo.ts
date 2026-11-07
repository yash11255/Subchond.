import type {Metadata} from "next";

export const SITE_URL = "https://subchond.com";
export const SITE_NAME = "Subchond";
export const ORGANIZATION_ID = `${SITE_URL}/#organization`;
export const WEBSITE_ID = `${SITE_URL}/#website`;
export const DOCTOR_ID = `${SITE_URL}/about#person`;

export type JsonLdNode = Record<string, unknown>;

export function absoluteUrl(path: string): string {
  return new URL(path, SITE_URL).toString();
}

export function pageMetadata({
  path,
  title,
  description,
  image = "/subchond_logo.png",
}: {
  path: string;
  title: string;
  description: string;
  image?: string;
}): Metadata {
  const url = absoluteUrl(path);
  const imageUrl = absoluteUrl(image);
  return {
    title,
    description,
    alternates: {canonical: url},
    openGraph: {type: "website", siteName: SITE_NAME, url, title, description, images: [{url: imageUrl}]},
    twitter: {card: "summary_large_image", title, description, images: [imageUrl]},
  };
}

export function breadcrumb(path: string, names: {name: string; path: string}[]): JsonLdNode {
  return {
    "@type": "BreadcrumbList",
    "@id": `${absoluteUrl(path)}#breadcrumb`,
    itemListElement: names.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function webPage(path: string, name: string, description: string, type = "WebPage"): JsonLdNode {
  return {
    "@type": type,
    "@id": `${absoluteUrl(path)}#webpage`,
    url: absoluteUrl(path),
    name,
    description,
    inLanguage: "en-IN",
    isPartOf: {"@id": WEBSITE_ID},
    ...(path === "/" ? {} : {breadcrumb: {"@id": `${absoluteUrl(path)}#breadcrumb`}}),
  };
}

export function itemList(path: string, items: {name: string; path: string}[]): JsonLdNode {
  return {
    "@type": "ItemList",
    "@id": `${absoluteUrl(path)}#items`,
    numberOfItems: items.length,
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      url: absoluteUrl(item.path),
    })),
  };
}
