import type { Metadata } from "next";
import { InfoIndex } from "@/components/InfoPageView";
import { CONDITIONS } from "@/lib/pages";

export const metadata: Metadata = {
  title: "Knee Conditions | Dr. Manu Bora",
  description: "Knee osteoarthritis, bone marrow edema, meniscus and ACL tears explained by Dr. Manu Bora.",
};

export default function ConditionsPage() {
  return (
    <InfoIndex eyebrow="Conditions" title="Common knee conditions"
      intro="Understand what is causing your knee pain and what your MRI terms mean."
      base="/conditions" pages={CONDITIONS} />
  );
}
