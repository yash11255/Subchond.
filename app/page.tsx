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

export default function Home() {
  return (
    <main className="w-full bg-[#F7FAF9] text-[#1B2B2A]">
      {/* 01 — HERO */}
      <Hero />

      {/* TRUST & CREDENTIALS BAR */}
      <TrustBar />

      {/* 02 — THE PROBLEM / CARTILAGE & SUBCHONDRAL ANATOMY */}
      <CartilageSection />

      <DoctorIntro />

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

      {/* 10 — PATIENT STORIES & TESTIMONIALS */}
      <PatientStoriesSection />

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
