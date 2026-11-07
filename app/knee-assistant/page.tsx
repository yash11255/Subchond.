import type { Metadata } from "next";
import KneeChatbotModal from "@/components/KneeChatbotModal";
import JsonLd from "@/components/JsonLd";
import {absoluteUrl, breadcrumb, ORGANIZATION_ID, pageMetadata, webPage} from "@/lib/seo";

const title = "AI Knee Assistant | Subchond";
const description = "Upload a knee MRI report for a plain-language AI explanation and share it with Dr. Bora for clinical review.";

export const metadata: Metadata = pageMetadata({path: "/knee-assistant", title, description});

export default function KneeAssistantPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-[#F7FAF9] via-[#FAF8F4] to-[#F6F1E9] px-4 pb-10 pt-28 md:pt-32">
      <JsonLd nodes={[
        {...webPage("/knee-assistant", title, description), mainEntity: {"@id": `${absoluteUrl("/knee-assistant")}#app`}},
        {"@type": "WebApplication", "@id": `${absoluteUrl("/knee-assistant")}#app`, name: "AI Knee Assistant", url: absoluteUrl("/knee-assistant"), description, applicationCategory: "HealthApplication", operatingSystem: "Web", provider: {"@id": ORGANIZATION_ID}},
        breadcrumb("/knee-assistant", [{name: "Home", path: "/"}, {name: "AI Knee Assistant", path: "/knee-assistant"}]),
      ]} />
      <div className="mx-auto mb-6 max-w-3xl text-center font-sans-clean">
        <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#0F766E]">Free · Instant · Private</span>
        <h1 className="font-serif-display mt-2 text-3xl font-bold text-[#1B2B2A] md:text-4xl">AI Knee Assistant</h1>
        <p className="mt-2 text-sm text-[#4B5F5D] md:text-base">
          Upload your MRI report or scan (📎) and get a clear explanation in seconds. Download it as a PDF or share it with Dr. Bora on WhatsApp.
        </p>
      </div>
      <KneeChatbotModal fullPage />
    </main>
  );
}
