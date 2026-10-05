"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";

const NAV_ITEMS = [
  { label: "ABOUT DOCTOR", href: "#about" },
  { label: "THE PROBLEM", href: "#problem" },
  { label: "IMAGING", href: "#imaging" },
  { label: "TREATMENTS", href: "#procedure" },
  { label: "CLINICAL APPROACH", href: "#approach" },
  { label: "RESEARCH", href: "#research" },
  { label: "FAQS", href: "#faq" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    if (href.startsWith("#")) {
      e.preventDefault();
      setMobileMenuOpen(false);
      const target = document.querySelector(href);
      if (target) {
        if ((window as any).lenis) {
          (window as any).lenis.scrollTo(target);
        } else {
          target.scrollIntoView({ behavior: "smooth" });
        }
      }
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#F7FAF9]/95 backdrop-blur-md border-b border-[#0F766E]/15 py-3.5 shadow-sm text-[#1B2B2A]"
          : "bg-[#F7FAF9] border-b border-[#0F766E]/15 py-4 md:py-5 text-[#1B2B2A]"
      }`}
    >
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 flex items-center justify-between">
        {/* Brand Logo */}
        <a
          href="#"
          onClick={(e) => handleNavClick(e, "#top")}
          className="flex items-center focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#0F766E]"
          aria-label="SUBCHOND – home"
        >
          <Image
            src="/subchond_logo.png"
            alt="SUBCHOND™"
            width={160}
            height={40}
            priority
            className={`h-8 w-auto transition-opacity duration-200 hover:opacity-80 ${scrolled ? "h-7" : "h-8"}`}
          />
        </a>

        {/* Desktop Nav Items */}
        <nav className="hidden lg:flex items-center space-x-5 xl:space-x-7">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.label}
              href={item.href}
              onClick={(e) => handleNavClick(e, item.href)}
              className="text-xs xl:text-sm font-sans-clean uppercase tracking-[0.14em] text-[#1B2B2A] hover:text-[#0F766E] transition-colors duration-200 font-bold"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Right Action Button */}
        <div className="hidden md:block">
          <a
            href="#assess"
            onClick={(e) => handleNavClick(e, "#assess")}
            className="inline-flex items-center gap-2.5 text-xs xl:text-sm font-sans-clean uppercase tracking-[0.14em] bg-[#C2410C] hover:bg-[#EA580C] text-white px-5 py-2.5 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 font-bold border border-[#EA580C]/30"
          >
            <span>ASSESS MY KNEE</span>
            <span className="text-base">&rarr;</span>
          </a>
        </div>

        {/* Mobile Hamburger Toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle Navigation Menu"
          className="lg:hidden text-[#1B2B2A] p-2 focus:outline-none"
        >
          <svg
            className="w-7 h-7"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {mobileMenuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#F7FAF9] border-b border-[#0F766E]/15 px-6 py-6 space-y-4 shadow-xl">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.label}
              href={item.href}
              onClick={(e) => handleNavClick(e, item.href)}
              className="block text-sm font-sans-clean uppercase tracking-[0.14em] text-[#1B2B2A] hover:text-[#0F766E] py-2.5 font-bold border-b border-[#0F766E]/10"
            >
              {item.label}
            </a>
          ))}
          <div className="pt-3">
            <a
              href="#assess"
              onClick={(e) => handleNavClick(e, "#assess")}
              className="inline-block text-center text-sm font-sans-clean uppercase tracking-[0.14em] bg-[#C2410C] text-white w-full py-3.5 rounded-lg font-bold shadow-md"
            >
              ASSESS MY KNEE &rarr;
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
