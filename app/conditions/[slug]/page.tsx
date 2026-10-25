import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { InfoDetail } from "@/components/InfoPageView";
import { CONDITIONS } from "@/lib/pages";

type Props = { params: Promise<{ slug: string }> };

export const generateStaticParams = () => CONDITIONS.map((t) => ({ slug: t.slug }));

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const page = CONDITIONS.find((t) => t.slug === slug);
  return page ? { title: `${page.title} | Dr. Manu Bora`, description: page.summary } : {};
}

export default async function ConditionPage({ params }: Props) {
  const { slug } = await params;
  const page = CONDITIONS.find((t) => t.slug === slug);
  if (!page) notFound();
  return <InfoDetail page={page} eyebrow="Conditions" base="/conditions" />;
}
