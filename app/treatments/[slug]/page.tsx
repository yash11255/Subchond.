import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { InfoDetail } from "@/components/InfoPageView";
import { TREATMENTS } from "@/lib/pages";

type Props = { params: Promise<{ slug: string }> };

export const generateStaticParams = () => TREATMENTS.map((t) => ({ slug: t.slug }));

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const page = TREATMENTS.find((t) => t.slug === slug);
  return page ? { title: `${page.title} | Dr. Manu Bora`, description: page.summary } : {};
}

export default async function TreatmentPage({ params }: Props) {
  const { slug } = await params;
  const page = TREATMENTS.find((t) => t.slug === slug);
  if (!page) notFound();
  return <InfoDetail page={page} eyebrow="Treatments" base="/treatments" />;
}
