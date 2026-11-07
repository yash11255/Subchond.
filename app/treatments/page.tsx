import type { Metadata } from "next";
import { InfoIndex } from "@/components/InfoPageView";
import { TREATMENTS } from "@/lib/pages";
import JsonLd from "@/components/JsonLd";
import {breadcrumb, itemList, pageMetadata, webPage} from "@/lib/seo";

const title = "Knee Treatments | Subchond";
const description = "Explore Subchond Injection, biologic therapies, ACL reconstruction and arthroscopy with Dr. Manu Bora.";

export const metadata: Metadata = pageMetadata({path: "/treatments", title, description});

export default function TreatmentsPage() {
  return (
    <>
    <JsonLd nodes={[
      {...webPage("/treatments", title, description, "CollectionPage"), mainEntity: {"@id": "https://subchond.com/treatments#items"}},
      itemList("/treatments", TREATMENTS.map((page) => ({name: page.title, path: `/treatments/${page.slug}`}))),
      breadcrumb("/treatments", [{name: "Home", path: "/"}, {name: "Treatments", path: "/treatments"}]),
    ]} />
    <InfoIndex eyebrow="Treatments" title="Joint-preserving knee treatments"
      intro="From a single Subchond injection to keyhole ligament surgery — options aimed at keeping your natural knee."
      base="/treatments" pages={TREATMENTS} />
    </>
  );
}
