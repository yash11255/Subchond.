"use client";

import { useEffect, useRef, useState } from "react";
import { Check, ChevronDown, Globe2 } from "lucide-react";

const LANGUAGES = [
  { code: "en", label: "English" },
  { code: "hi", label: "हिन्दी" },
  { code: "bn", label: "বাংলা" },
  { code: "mr", label: "मराठी" },
  { code: "ta", label: "தமிழ்" },
  { code: "te", label: "తెలుగు" },
] as const;

type GoogleTranslateWindow = Window & {
  google?: {
    translate?: {
      TranslateElement?: new (
        options: { pageLanguage: string; includedLanguages: string; autoDisplay: boolean },
        elementId: string
      ) => void;
    };
  };
  googleTranslateElementInit?: () => void;
};

function selectedLanguage() {
  const value = document.cookie.match(/(?:^|;\s*)googtrans=([^;]+)/)?.[1];
  const language = value?.split("/").at(-1);
  return LANGUAGES.some((item) => item.code === language) ? language! : "en";
}

export default function LanguageSwitcher() {
  const [language, setLanguage] = useState("en");
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;

    function closeOnOutsideClick(event: PointerEvent) {
      if (!containerRef.current?.contains(event.target as Node)) setOpen(false);
    }
    function closeOnEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
        triggerRef.current?.focus();
      }
    }

    document.addEventListener("pointerdown", closeOnOutsideClick);
    document.addEventListener("keydown", closeOnEscape);
    return () => {
      document.removeEventListener("pointerdown", closeOnOutsideClick);
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, [open]);

  useEffect(() => {
    setLanguage(selectedLanguage());

    const translateWindow = window as GoogleTranslateWindow;
    translateWindow.googleTranslateElementInit = () => {
      const TranslateElement = translateWindow.google?.translate?.TranslateElement;
      if (TranslateElement && !document.querySelector("#google_translate_element .goog-te-combo")) {
        new TranslateElement(
          { pageLanguage: "en", includedLanguages: LANGUAGES.map((item) => item.code).join(","), autoDisplay: false },
          "google_translate_element"
        );
      }
    };

    if (translateWindow.google?.translate?.TranslateElement) {
      translateWindow.googleTranslateElementInit();
    } else if (!document.querySelector('script[data-google-translate="true"]')) {
      const script = document.createElement("script");
      script.src = "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
      script.async = true;
      script.dataset.googleTranslate = "true";
      document.head.appendChild(script);
    }

    return () => {
      delete translateWindow.googleTranslateElementInit;
    };
  }, []);

  function changeLanguage(nextLanguage: string) {
    setOpen(false);
    if (nextLanguage === language) return;
    setLanguage(nextLanguage);
    if (nextLanguage === "en") {
      document.cookie = "googtrans=; Max-Age=0; Path=/; SameSite=Lax";
      document.cookie = `googtrans=; Max-Age=0; Path=/; Domain=.${location.hostname}; SameSite=Lax`;
    } else {
      document.cookie = `googtrans=/en/${nextLanguage}; Path=/; SameSite=Lax`;
    }
    window.location.reload();
  }

  return (
    <div ref={containerRef} className="notranslate relative shrink-0" translate="no">
      <div id="google_translate_element" className="google-translate-source" aria-hidden="true" />
      <button
        ref={triggerRef}
        type="button"
        aria-label="Translate this page with Google"
        aria-haspopup="menu"
        aria-expanded={open}
        aria-controls="language-menu"
        onClick={() => setOpen((current) => !current)}
        className={`group flex h-10 items-center gap-1.5 rounded-lg border bg-white px-2.5 text-[#1B2B2A] shadow-sm transition-all duration-200 hover:border-[#0F766E]/50 hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0F766E] sm:px-3 ${open ? "border-[#0F766E] shadow-md" : "border-[#0F766E]/20"}`}
      >
        <Globe2 size={16} className="shrink-0 text-[#0F766E] transition-transform duration-300 group-hover:rotate-12" aria-hidden="true" />
        <span className="text-xs font-bold">{LANGUAGES.find((item) => item.code === language)?.label ?? "English"}</span>
        <ChevronDown size={13} className={`ml-0.5 text-[#0F766E] transition-transform duration-200 ${open ? "rotate-180" : ""}`} aria-hidden="true" />
      </button>
      {open && (
        <div
          id="language-menu"
          role="menu"
          aria-label="Choose a language"
          className="absolute right-0 top-full z-[60] mt-2 w-44 overflow-hidden rounded-xl border border-[#0F766E]/20 bg-[#F7FAF9] p-1.5 shadow-[0_16px_40px_-12px_rgba(27,43,42,0.3)]"
        >
          {LANGUAGES.map((item) => (
            <button
              key={item.code}
              type="button"
              role="menuitemradio"
              aria-checked={language === item.code}
              onClick={() => changeLanguage(item.code)}
              className={`flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-left text-sm font-semibold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#0F766E] ${language === item.code ? "bg-[#E2F2ED] text-[#0F766E]" : "text-[#1B2B2A] hover:bg-[#EAF2F7] hover:text-[#0F766E]"}`}
            >
              <span>{item.label}</span>
              {language === item.code && <Check size={15} aria-hidden="true" />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
