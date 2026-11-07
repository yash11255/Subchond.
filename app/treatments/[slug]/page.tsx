import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { InfoDetail } from "@/components/InfoPageView";
import { TREATMENTS } from "@/lib/pages";
import JsonLd from "@/components/JsonLd";
import {absoluteUrl, breadcrumb, pageMetadata, webPage} from "@/lib/seo";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const page = TREATMENTS.find((t) => t.slug === slug);
  return page ? pageMetadata({path: `/treatments/${slug}`, title: `${page.title} | Subchond`, description: page.summary, image: page.image}) : {};
}

export default async function TreatmentPage({ params }: Props) {
  const { slug } = await params;
  const page = TREATMENTS.find((t) => t.slug === slug);
  if (!page) notFound();
  const path = `/treatments/${slug}`;
  const entityId = `${absoluteUrl(path)}#procedure`;
  return <>
    <JsonLd nodes={[
      {...webPage(path, `${page.title} | Subchond`, page.summary, "MedicalWebPage"), mainEntity: {"@id": entityId}},
      {"@type": "MedicalProcedure", "@id": entityId, name: page.title, description: page.summary, url: absoluteUrl(path), mainEntityOfPage: absoluteUrl(path)},
      breadcrumb(path, [{name: "Home", path: "/"}, {name: "Treatments", path: "/treatments"}, {name: page.title, path}]),
    ]} />
    <InfoDetail page={page} eyebrow="Treatments" base="/treatments" />
  </>;
}
