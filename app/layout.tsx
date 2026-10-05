import type { Metadata } from "next";
import { Outfit, Inter } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import Navbar from "@/components/Navbar";
import WhatsAppReportModal from "@/components/WhatsAppReportModal";
import KneeChatbotModal from "@/components/KneeChatbotModal";

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700"],
  variable: "--font-outfit",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Dr. Manu Bora | Orthopaedic Surgeon & Joint Preservation Specialist",
  description:
    "Dr. Manu Bora is a world-renowned orthopaedic surgeon specialising in sports injuries, arthroscopy, ligament reconstruction, subchondral procedures, and joint preservation.",
  keywords: [
    "Dr. Manu Bora",
    "Orthopaedic Surgeon",
    "Sports Medicine",
    "Arthroscopy",
    "Joint Preservation",
    "Knee Pain",
    "Subchondral Bone Marrow",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${outfit.variable} ${inter.variable}`}>
      <body suppressHydrationWarning className="bg-[#F7FAF9] text-[#1B2B2A] antialiased selection:bg-[#0F766E] selection:text-white font-sans-clean font-normal text-base leading-relaxed">
        <SmoothScroll>
          <Navbar />
          {children}
          <WhatsAppReportModal />
          <KneeChatbotModal />
        </SmoothScroll>
      </body>
    </html>
  );
}
