import React from "react";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="w-full bg-[#E8F1EF] text-[#1B2B2A] pt-16 pb-12 border-t border-[#0F766E]/20 font-sans-clean">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 space-y-12">
        
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          
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
            <ul className="space-y-2 text-xs sm:text-sm uppercase tracking-wider text-[#1B2B2A] font-bold">
              <li>
                <a href="#approach" className="hover:text-[#0F766E] transition-colors">
                  THE APPROACH
                </a>
              </li>
              <li>
                <a href="#imaging" className="hover:text-[#0F766E] transition-colors">
                  DIAGNOSTIC IMAGING
                </a>
              </li>
              <li>
                <a href="#problem" className="hover:text-[#0F766E] transition-colors">
                  THE PROBLEM
                </a>
              </li>
              <li>
                <a href="#research" className="hover:text-[#0F766E] transition-colors">
                  CLINICAL RESEARCH
                </a>
              </li>
              <li>
                <a href="#stories" className="hover:text-[#0F766E] transition-colors">
                  PATIENT OUTCOMES
                </a>
              </li>
            </ul>
          </div>

          {/* Clinical Locations & Contact */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="text-xs sm:text-sm uppercase tracking-[0.16em] text-[#0F766E] font-bold">
              CLINICAL CENTRES
            </h4>
            <div className="text-xs sm:text-sm text-[#1B2B2A] space-y-2 leading-relaxed font-medium">
              <p>
                <strong className="text-[#0F766E] font-bold">Gurugram / New Delhi / Mumbai</strong>
              </p>
              <p>Consultations by prior appointment only.</p>
              <p className="text-[#1B2B2A] font-bold">Email: info@drmanubora.com</p>
              <p className="text-[#9F1239] font-bold tracking-wider">
                Emergency Sports Injury Line Available
              </p>
            </div>
          </div>

        </div>

        {/* Bottom Legal & Copyright Bar */}
        <div className="pt-8 border-t border-[#0F766E]/15 flex flex-col md:flex-row items-center justify-between text-xs uppercase tracking-[0.16em] text-[#4B5F5D] font-medium gap-4">
          <p>&copy; {new Date().getFullYear()} DR. MANU BORA. ALL RIGHTS RESERVED.</p>
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-[#0F766E] transition-colors">
              PRIVACY POLICY
            </a>
            <a href="#" className="hover:text-[#0F766E] transition-colors">
              TERMS OF SERVICE
            </a>
            <a href="#" className="hover:text-[#0F766E] transition-colors">
              MEDICAL DISCLAIMER
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
}
