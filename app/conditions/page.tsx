import type { Metadata } from "next";
import { InfoIndex } from "@/components/InfoPageView";
import { CONDITIONS } from "@/lib/pages";
import JsonLd from "@/components/JsonLd";
import {breadcrumb, itemList, pageMetadata, webPage} from "@/lib/seo";

const title = "Knee Conditions | Subchond";
const description = "Knee osteoarthritis, bone marrow oedema, meniscus tears and ACL injuries explained by Subchond.";

export const metadata: Metadata = pageMetadata({path: "/conditions", title, description});

export default function ConditionsPage() {
  return (
    <>
    <JsonLd nodes={[
      {...webPage("/conditions", title, description, "CollectionPage"), mainEntity: {"@id": "https://subchond.com/conditions#items"}},
      itemList("/conditions", CONDITIONS.map((page) => ({name: page.title, path: `/conditions/${page.slug}`}))),
      breadcrumb("/conditions", [{name: "Home", path: "/"}, {name: "Conditions", path: "/conditions"}]),
    ]} />
    <InfoIndex eyebrow="Conditions" title="Common knee conditions"
      intro="Understand what is causing your knee pain and what your MRI terms mean."
      base="/conditions" pages={CONDITIONS} />
    </>
  );
}
