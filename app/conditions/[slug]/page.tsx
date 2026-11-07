import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { InfoDetail } from "@/components/InfoPageView";
import { CONDITIONS } from "@/lib/pages";
import JsonLd from "@/components/JsonLd";
import {absoluteUrl, breadcrumb, pageMetadata, webPage} from "@/lib/seo";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const page = CONDITIONS.find((t) => t.slug === slug);
  return page ? pageMetadata({path: `/conditions/${slug}`, title: `${page.title} | Subchond`, description: page.summary, image: page.image}) : {};
}

export default async function ConditionPage({ params }: Props) {
  const { slug } = await params;
  const page = CONDITIONS.find((t) => t.slug === slug);
  if (!page) notFound();
  const path = `/conditions/${slug}`;
  const entityId = `${absoluteUrl(path)}#condition`;
  return <>
    <JsonLd nodes={[
      {...webPage(path, `${page.title} | Subchond`, page.summary, "MedicalWebPage"), mainEntity: {"@id": entityId}},
      {"@type": "MedicalCondition", "@id": entityId, name: page.title, description: page.summary, url: absoluteUrl(path), mainEntityOfPage: absoluteUrl(path)},
      breadcrumb(path, [{name: "Home", path: "/"}, {name: "Conditions", path: "/conditions"}, {name: page.title, path}]),
    ]} />
    <InfoDetail page={page} eyebrow="Conditions" base="/conditions" />
  </>;
}
