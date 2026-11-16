import React from "react";
import Image from "next/image";
import {
  CLINIC_EMAIL,
  CLINIC_PHONE,
  CLINIC_PHONE_DISPLAY,
  GURUGRAM_ADDRESS,
  GURUGRAM_DIRECTIONS_URL,
  GURUGRAM_MAP_EMBED_URL,
} from "@/lib/contact";

export default function Footer() {
  return (
    <footer className="w-full bg-[#E8F1EF] text-[#1B2B2A] pt-14 pb-10 border-t border-[#0F766E]/20 font-sans-clean">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 space-y-8">
        
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-x-8 gap-y-6 items-start">
          
          {/* Brand & Specialty */}
          <div className="md:col-span-5 space-y-4">
            <Image
              src="/subchond_logo.png"
              alt="SUBCHOND™"
              width={200}
              height={50}
              className="h-10 w-auto"
            />

            <p className="text-xs sm:text-sm uppercase tracking-[0.14em] text-[#1B2B2A] font-bold leading-relaxed">
              ORTHOPAEDIC SURGEON &bull; SPORTS MEDICINE &bull; ARTHROSCOPY &bull; JOINT PRESERVATION
            </p>
            <p className="text-xs sm:text-sm text-[#4B5F5D] max-w-md leading-relaxed pt-2 font-medium">
              Pioneering advanced subchondral joint preservation, ACL reconstruction, and micro-arthroscopic techniques for long-term knee preservation.
            </p>
          </div>

          {/* Quick Navigation Links */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs sm:text-sm uppercase tracking-[0.16em] text-[#0F766E] font-bold">
              NAVIGATION
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm uppercase tracking-wider text-[#3F5452] font-normal">
              <li>
                <a href="/#approach" className="hover:text-[#0F766E] transition-colors">
                  THE APPROACH
                </a>
              </li>
              <li>
                <a href="/#imaging" className="hover:text-[#0F766E] transition-colors">
                  DIAGNOSTIC IMAGING
                </a>
              </li>
              <li>
                <a href="/#problem" className="hover:text-[#0F766E] transition-colors">
                  THE PROBLEM
                </a>
              </li>
              <li>
                <a href="/#research" className="hover:text-[#0F766E] transition-colors">
                  CLINICAL RESEARCH
                </a>
              </li>
              <li>
                <a href="/#stories" className="hover:text-[#0F766E] transition-colors">
                  PATIENT OUTCOMES
                </a>
              </li>
              <li>
                <a
                  href="/blog"
                  className="hover:text-[#0F766E] transition-colors"
                >
                  SUBCHOND BLOG
                </a>
              </li>
            </ul>
          </div>

          {/* Clinical Locations & Contact */}
          <div className="md:col-span-4 md:col-start-9 md:row-start-1 md:row-span-2 space-y-3">
            <h4 className="text-xs sm:text-sm uppercase tracking-[0.16em] text-[#0F766E] font-bold">
              CLINICAL CENTRES
            </h4>
            <div className="text-xs sm:text-sm text-[#1B2B2A] space-y-2 leading-relaxed font-medium">
              <p>
                <strong className="text-[#0F766E] font-bold">Gurugram / New Delhi / Mumbai</strong>
              </p>
              <p>Consultations by prior appointment only.</p>
              <address className="not-italic">
                <span className="block font-bold">Gurugram clinic:</span>
                <a href={GURUGRAM_DIRECTIONS_URL} target="_blank" rel="noopener noreferrer" className="hover:text-[#0F766E] hover:underline">
                  {GURUGRAM_ADDRESS}
                </a>
              </address>
              <p><a href={`tel:+${CLINIC_PHONE}`} className="font-bold text-[#0F766E] underline underline-offset-2 hover:text-[#C2410C]">Call: {CLINIC_PHONE_DISPLAY}</a></p>
              <p><a href={`mailto:${CLINIC_EMAIL}`} className="font-bold text-[#0F766E] underline underline-offset-2 hover:text-[#C2410C]">Email: {CLINIC_EMAIL}</a></p>
              <p className="text-[#9F1239] font-bold tracking-wider">
                Emergency Sports Injury Line Available
              </p>
            </div>
          </div>

          <div className="overflow-hidden rounded-xl border border-[#0F766E]/20 md:col-span-8 md:col-start-1 md:row-start-2">
            <iframe
              title="Map of the Subchond Gurugram clinic"
              src={GURUGRAM_MAP_EMBED_URL}
              loading="lazy"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
              className="block h-44 w-full border-0 sm:h-52"
            />
          </div>

        </div>

        {/* Bottom Legal & Copyright Bar */}
        <div className="pt-8 border-t border-[#0F766E]/15 flex flex-col md:flex-row items-center justify-between text-xs uppercase tracking-[0.16em] text-[#4B5F5D] font-medium gap-4">
          <p>&copy; {new Date().getFullYear()} DR. MANU BORA. ALL RIGHTS RESERVED.</p>
          <div className="flex items-center gap-6">
            <a href="/#" className="hover:text-[#0F766E] transition-colors">
              PRIVACY POLICY
            </a>
            <a href="/#" className="hover:text-[#0F766E] transition-colors">
              TERMS OF SERVICE
            </a>
            <a href="/#" className="hover:text-[#0F766E] transition-colors">
              MEDICAL DISCLAIMER
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
}
