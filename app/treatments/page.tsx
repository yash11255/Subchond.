import type { Metadata } from "next";
import { InfoIndex } from "@/components/InfoPageView";
import { TREATMENTS } from "@/lib/pages";

export const metadata: Metadata = {
  title: "Knee Treatments | Dr. Manu Bora",
  description: "Subchond injection, adipocyte therapy, ACL reconstruction and arthroscopy by Dr. Manu Bora.",
};

export default function TreatmentsPage() {
  return (
    <InfoIndex eyebrow="Treatments" title="Joint-preserving knee treatments"
      intro="From a single Subchond injection to keyhole ligament surgery — options aimed at keeping your natural knee."
      base="/treatments" pages={TREATMENTS} />
  );
}
