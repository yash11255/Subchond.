import type { Metadata } from "next";
import KneeChatbotModal from "@/components/KneeChatbotModal";

export const metadata: Metadata = {
  title: "AI Knee Assistant — Upload Your MRI | Dr. Manu Bora",
  description: "Upload your knee MRI report or scan and get a free, instant plain-language explanation from Dr. Manu Bora's AI Knee Assistant.",
};

export default function KneeAssistantPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-[#F7FAF9] via-[#FAF8F4] to-[#F6F1E9] px-4 pb-10 pt-28 md:pt-32">
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
