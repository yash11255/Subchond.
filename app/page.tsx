import Hero from "@/components/Hero";
import TrustBar from "@/components/TrustBar";
import CartilageSection from "@/components/CartilageSection";
import ImagingSection from "@/components/ImagingSection";
import DoctorIntro from "@/components/DoctorIntro";
import TreatmentIndications from "@/components/TreatmentIndications";
import ClinicalApproach from "@/components/ClinicalApproach";
import AclSubchondralSection from "@/components/AclSubchondralSection";
import ProcedureSection from "@/components/ProcedureSection";
import OtGallerySection from "@/components/OtGallerySection";
import AnatomySection from "@/components/AnatomySection";
import ExpectationsSection from "@/components/ExpectationsSection";
import ResearchSection from "@/components/ResearchSection";
import PatientStoriesSection from "@/components/PatientStoriesSection";
import FaqSection from "@/components/FaqSection";
import AppointmentSection from "@/components/AppointmentSection";
import RehabSection from "@/components/RehabSection";
import Footer from "@/components/Footer";
import type {Metadata} from "next";
import JsonLd from "@/components/JsonLd";
import {absoluteUrl, DOCTOR_ID, ORGANIZATION_ID, pageMetadata, SITE_URL, WEBSITE_ID, webPage} from "@/lib/seo";

const homeTitle = "Subchond | Knee Preservation with Dr. Manu Bora";
const homeDescription = "Explore knee conditions, imaging, joint preservation and treatment options with orthopaedic surgeon Dr. Manu Bora.";

export const metadata: Metadata = pageMetadata({path: "/", title: homeTitle, description: homeDescription});

export default function Home() {
  return (
    <main className="w-full bg-[#F7FAF9] text-[#1B2B2A]">
      <JsonLd nodes={[
        {
          "@type": "Organization",
          "@id": ORGANIZATION_ID,
          name: "Subchond",
          url: SITE_URL,
          logo: absoluteUrl("/subchond_logo.png"),
          description: homeDescription,
          areaServed: ["Gurugram", "New Delhi", "Mumbai"],
        },
        {
          "@type": "WebSite",
          "@id": WEBSITE_ID,
          url: SITE_URL,
          name: "Subchond",
          inLanguage: "en-IN",
          publisher: {"@id": ORGANIZATION_ID},
        },
        {...webPage("/", homeTitle, homeDescription), about: {"@id": DOCTOR_ID}},
      ]} />
      {/* 01 — HERO */}
      <Hero />

      {/* TRUST & CREDENTIALS BAR */}
      <TrustBar />

      {/* 02 — THE PROBLEM / CARTILAGE & SUBCHONDRAL ANATOMY */}
      <CartilageSection />

      <DoctorIntro />

      {/* PATIENT STORIES — social proof early */}
      <PatientStoriesSection />

      {/* 03 — DIAGNOSTIC IMAGING (X-RAY VS MRI) */}
      <ImagingSection />

      {/* 04 — DOCTOR PROFILE & AUTHORITY */}


      {/* 05 — TREATMENT INDICATIONS & CARE PATHS */}
      <TreatmentIndications />

      {/* 06 — CLINICAL APPROACH PROTOCOL */}
      <ClinicalApproach />

      {/* 06.5 — HOW A SUBCHONDRAL INJECTION WORKS (SCROLL ANIMATION) */}
      <ProcedureSection />

      {/* 07 — ACL & SPORTS INJURY PRESERVATION */}
      <AclSubchondralSection />

      {/* 08 — OPERATING THEATRE & SURGICAL GALLERY */}
      <OtGallerySection />

      {/* 09 — THE PROGRAMME & CARE TEAM */}
      <AnatomySection />

      {/* 10 — EXPECTATIONS & RECOVERY TIMELINE */}
      <ExpectationsSection />

      {/* 11 — RESEARCH & CLINICAL EVIDENCE */}
      <ResearchSection />

      {/* 11 — PATIENT EDUCATION & FAQS */}
      <FaqSection />

      {/* 12 — CONSULTATION & SECOND OPINION APPOINTMENT FORM */}
      <AppointmentSection />

      {/* 13 — CLOSING REHABILITATION BANNER */}
      <RehabSection />

      {/* 14 — FOOTER */}
      <Footer />
    </main>
  );
}
